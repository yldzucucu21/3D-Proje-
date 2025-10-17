# 3D Proje — Sesle Reaksiyonlu Görselleştirici

Bu proje, Next.js tabanlı bir frontend ve FastAPI tabanlı bir backend içerir. Amaç, ses verisini analiz ederek 3D görselleştirme ile etkileşimli bir kullanıcı deneyimi sunmaktır.

## Proje Yapısı

- `backend/` : FastAPI ile yazılmış Python backend kodları. Ana dosya: `main.py`. Ses analizi için: `audio_analysis.py`.
- `frontend/` : Next.js ile yazılmış React tabanlı arayüz. Ana dosyalar: `app/audio.tsx`, `app/page.tsx`, `app/layout.tsx`.
- `backend/requirements.txt` : Backend bağımlılıkları (ör. fastapi, numpy, scipy, pydantic, uvicorn).
- `backend/package.json` ve `frontend/package.json` : Gerekli npm paketleri ve scriptler.

## Kurulum ve Çalıştırma

### Backend (FastAPI)

Varsa `backend_venv` sanal ortamını aktifleştirin veya yeni bir venv oluşturun.

```powershell
cd backend
python -m venv backend_venv
.\backend_venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

### Frontend (Next.js)

```powershell
cd frontend
npm install
npm run dev
```

## Koddan Örnekler

### Backend: Basit API endpoint

```python
from fastapi import FastAPI
app = FastAPI()

@app.get("/ping")
def ping():
    return {"message": "pong"}
```

### Frontend: Ses dosyası yükleme ve görselleştirme

```tsx
// app/audio.tsx
import React from "react";
export default function Audio() {
  // Ses dosyası yükleme ve analiz kodları burada
  return <div>Ses dosyası yükle ve görselleştir</div>;
}
```

## Notlar

- `backend/requirements.txt` yoksa `pip freeze > requirements.txt` ile oluşturabilirsiniz.
- Hassas bilgileri (API anahtarları, parolalar) repo'ya eklemeyin.
