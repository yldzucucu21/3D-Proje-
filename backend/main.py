
from fastapi import FastAPI
from audio_analysis import router as audio_router


app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI!"}

# Ses analizi ve websocket endpointlerini ekle
app.include_router(audio_router, prefix="")
