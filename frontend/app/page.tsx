
"use client";
import React, { useState, useEffect } from "react";

const SHAPE_COUNT = 8;
const SHAPE_ELEMENTS = Array.from({ length: SHAPE_COUNT }, (_, i) => i);

export default function Home() {

  const [amplitude, setAmplitude] = useState(0.5); // 0-1 arası, default orta
  const [micError, setMicError] = useState("");

  useEffect(() => {
    let audioContext: AudioContext | undefined;
    let analyser: AnalyserNode | undefined;
    let dataArray: Uint8Array;
    let source: MediaStreamAudioSourceNode | undefined;
    let stream: MediaStream | undefined;
    let rafId: number | undefined;

    const getMic = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        audioContext = new AudioCtx();
        analyser = audioContext.createAnalyser();
        source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);
        analyser.fftSize = 256;
        dataArray = new Uint8Array(analyser.frequencyBinCount);

        const update = () => {
          if (analyser && dataArray) {
            analyser.getByteTimeDomainData(dataArray);
            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) {
              const val = dataArray[i] - 128;
              sum += val * val;
            }
            const rms = Math.sqrt(sum / dataArray.length);
            setAmplitude(Math.min(1, rms / 20));
          }
          rafId = requestAnimationFrame(update);
        };
        update();
      } catch (e) {
        setMicError("Mikrofon erişimi reddedildi veya desteklenmiyor.");
      }
    };
    getMic();
    return () => {
      if (audioContext) audioContext.close();
      if (stream) stream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Küre büyüklüğünü ve border kalınlığını amplitude ile değiştir
  const shapeScale = 1 + amplitude * 0.5;
  const borderWidth = 0.15 + amplitude * 0.5;

  return (
    <>
      <style>{`
*{margin: 0; padding: 0; box-sizing: border-box;}
:root{
    font-family: 'Courier New', Courier, monospace;
    font-size: 100%;
}
body{ 
    width: 100%;
    height: 100%;
    margin: 0em auto;
    background: black;
}
.wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
}
.scene{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60rem;
    height: 60rem;
    transform-style: preserve-3d;
    perspective: 10000px;
    transform: rotateX(45deg) rotateY(32deg); 
    background-color: transparent;
}
.shape{
    position: relative;
    list-style: none;
    width: 40rem;
    height: 40rem;
    margin: 0 auto;
    transform-style: preserve-3d;
    transform-origin: 40% 60%;
    animation: turn 6s 0.6s infinite linear;
}
.shapeElementStyle{
    position: absolute;
    padding: 4rem;
    width: 32rem;
    height: 32rem;
    border: ${borderWidth}rem dotted white;
    border-radius: 50%;
    animation-timing-function: ease;
    animation: turn 6s 0.6s infinite alternate-reverse;
    box-shadow: 0 0 40px 10px #fff2;
    transition: border-width 0.3s, box-shadow 0.3s;
}
@keyframes turn {
    to{
      transform: rotateX(360deg) rotateY(360deg);
    }
}
.audio-upload {
    position: absolute;
    top: 2rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    background: #111a;
    padding: 1rem 2rem;
    border-radius: 1rem;
    box-shadow: 0 0 10px #000a;
    color: #fff;
    font-family: inherit;
}
.audio-upload input[type="file"] {
    background: #222;
    color: #fff;
    border: 1px solid #444;
    border-radius: 8px;
    padding: 8px 16px;
    font-size: 1rem;
    margin-bottom: 12px;
}
.audio-upload label {
    color: #fff;
    font-size: 1.1rem;
    margin-bottom: 8px;
}
      `}</style>
      <div className="wrapper">
        <div className="scene">
          <ul className="shape" style={{ transform: `scale(${shapeScale})` }}>
            {SHAPE_ELEMENTS.map((i) => (
              <li
                key={i}
                className="shapeElementStyle"
                style={{
                  transform: `rotateY(${(i * 360) / SHAPE_COUNT}deg) translateZ(12rem)`
                }}
              />
            ))}
          </ul>
        </div>
        {micError && (
          <div className="audio-upload" style={{ color: 'red', fontWeight: 'bold' }}>{micError}</div>
        )}
      </div>
    </>
  );
}
