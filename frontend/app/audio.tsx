

import React, { useState, useEffect } from "react";

const SHAPE_COUNT = 8;
const SHAPE_ELEMENTS = Array.from({ length: SHAPE_COUNT }, (_, i) => i);

export default function AudioVisualizer() {
  const [amplitude, setAmplitude] = useState(0.5); // 0-1 arası, default orta
  const [micError, setMicError] = useState("");

  useEffect(() => {
    let audioContext: AudioContext | undefined;
    let processor: ScriptProcessorNode | undefined;
    let source: MediaStreamAudioSourceNode | undefined;
    // Mikrofon ve ses işleme kodu buraya gelecek (varsa)
    // ...
    // Temizleyici fonksiyon döndürülmeli (isteğe bağlı)
    return () => {
      // Temizlik kodu (ör. audioContext.close())
    };
  }, []);

  return (
    <>
      <style>{`
  body {
    min-height: 100vh;
    background: linear-gradient(120deg, #1a2980 0%, #26d0ce 100%);
    background-size: 400% 400%;
    animation: bgmove 12s ease-in-out infinite;
    font-family: 'Inter', 'Segoe UI', Arial, sans-serif;

      `}</style>
      <div className="modern-container">
        <div className="modern-title">Canlı Sesle 3D Küre Görselleştirici</div>
        <div className="mic-bar">
          <div className="mic-bar-inner" style={{ width: `${Math.round(amplitude * 100)}%` }} />
        </div>
        <div className="modern-sphere-3d">
          <div className="modern-sphere" style={{ transform: `scale(${1 + amplitude * 0.5})` }}>
            <div className="modern-sphere-dot" />
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="modern-sphere-ring"
                style={{
                  borderWidth: `${2 + i * 1.2 + amplitude * 2}px`,
                  width: `${80 + i * 40 + amplitude * 40}px`,
                  height: `${80 + i * 40 + amplitude * 40}px`,
                  transform: `translate(-50%, -50%) rotateY(${i * 60}deg) rotateX(${i * 30}deg)`
                }}
              />
            ))}
          </div>
        </div>
        <div className="modern-desc">
          Mikrofona konuş, ses şiddetine göre küre ve halkalar büyüyüp parlasın!<br/>
          <span style={{fontSize:'0.95em',opacity:0.7}}>Yüksek sesle dene, etkileşimi gör!</span>
        </div>

        {micError && (
          <div style={{ color: '#ff0033', fontWeight: 'bold', marginTop: 16 }}>{micError}</div>
        )}
      </div>
    </>
  );
}
    animation: rotate3d 6s linear infinite;
    filter: drop-shadow(0 0 40px #00eaff88) drop-shadow(0 0 24px #ff00cc88);
  }
  .modern-sphere-dot {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 70px;
    height: 70px;
    margin-left: -35px;
    margin-top: -35px;
    border-radius: 50%;
    background: radial-gradient(circle at 60% 40%, #fff 0%, #00eaff 60%, #ff00cc 100%);
    box-shadow: 0 0 80px 30px #00eaff44, 0 0 60px 20px #ff00cc44;
    filter: blur(0.5px);
    opacity: 0.93;
    animation: dotPulse 1.5s infinite alternate;
  }
  @keyframes dotPulse {
    0% { filter: blur(0.5px) brightness(1); }
    100% { filter: blur(2px) brightness(1.2); }
  }
  .modern-sphere-ring {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 3px solid #fff4;
    box-shadow: 0 0 32px 8px #00eaff44, 0 0 16px 4px #ff00cc44;
    opacity: 0.8;
    transform-origin: 50% 50%;
    animation: ringAnim 2.2s linear infinite alternate;
  }
  @keyframes rotate3d {
    0% { transform: rotateX(0deg) rotateY(0deg); }
    100% { transform: rotateX(360deg) rotateY(360deg); }
  }
  @keyframes ringAnim {
    0% { opacity: 0.7; }
    100% { opacity: 1; }
  }
  .modern-desc {
    color: #fff;
    font-size: 1.1rem;
    margin-top: 2.5rem;
    text-align: center;
    text-shadow: 0 2px 8px #000a;
    letter-spacing: 0.01em;
    opacity: 0.85;
  }
  @media (max-width: 600px) {
    .modern-title { font-size: 1.3rem; }
    .modern-sphere-3d { width: 95vw; height: 95vw; }
    .modern-desc { font-size: 0.95rem; }
  }
        `}</style>
        <div className="modern-container">
          <div className="modern-title">Canlı Sesle 3D Küre Görselleştirici</div>
          <div className="mic-bar">
            <div className="mic-bar-inner" style={{ width: `${Math.round(amplitude * 100)}%` }} />
          </div>
          <div className="modern-sphere-3d">
            <div className="modern-sphere" style={{ transform: `scale(${1 + amplitude * 0.5})` }}>
              <div className="modern-sphere-dot" />
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="modern-sphere-ring"
                  style={{
                    borderWidth: `${2 + i * 1.2 + amplitude * 2}px`,
                    width: `${80 + i * 40 + amplitude * 40}px`,
                    height: `${80 + i * 40 + amplitude * 40}px`,
                    transform: `translate(-50%, -50%) rotateY(${i * 60}deg) rotateX(${i * 30}deg)`
                  }}
                />
              ))}
            </div>
          </div>
          {micError && (
            <div style={{ color: '#ff0033', fontWeight: 'bold', marginTop: 16 }}>{micError}</div>
          )}
        </div>
      </>

