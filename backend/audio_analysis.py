
import numpy as np
from fastapi import APIRouter, File, UploadFile, WebSocket, WebSocketDisconnect
from scipy.io import wavfile
import io

router = APIRouter()

@router.post("/analyze-audio/")
async def analyze_audio(file: UploadFile = File(...)):
    audio_bytes = await file.read()
    sample_rate, data = wavfile.read(io.BytesIO(audio_bytes))
    if len(data.shape) > 1:
        data = data[:, 0]
    fft_data = np.abs(np.fft.rfft(data))
    freqs = np.fft.rfftfreq(len(data), 1 / sample_rate)
    max_idx = np.argmax(fft_data)
    max_freq = freqs[max_idx]
    max_amp = float(fft_data[max_idx])
    return {"max_freq": float(max_freq), "max_amp": max_amp}

@router.websocket("/ws-audio/")
async def websocket_audio(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_bytes()
            audio = np.frombuffer(data, dtype=np.float32)
            rms = float(np.sqrt(np.mean(audio ** 2)))
            if len(audio) > 0:
                fft_data = np.abs(np.fft.rfft(audio))
                freqs = np.fft.rfftfreq(len(audio), 1/44100)
                max_idx = np.argmax(fft_data)
                max_freq = float(freqs[max_idx])
                max_amp = float(fft_data[max_idx])
            else:
                max_freq = 0.0
                max_amp = 0.0
            await websocket.send_json({"rms": rms, "max_freq": max_freq, "max_amp": max_amp})
    except WebSocketDisconnect:
        pass
