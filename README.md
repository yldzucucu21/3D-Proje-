<<<<<<< HEAD
# 3D Proje — Sesle Reaksiyonlu Görselleştirici

Bu proje Next.js (frontend) ve FastAPI (backend) kullanılarak yapılmış bir sesle reaksiyonlu görselleştiricidir.

Bu rehber Git ve GitHub kullanmayı az bilenler için adım adım nasıl yükleme (push) yapılacağını ve projeyi çalıştıracağını açıklar.

1) Yerel Git deposu oluştur

Powershell'de proje kök dizinine gidin:

```powershell
cd C:\Users\Yıldız\Desktop\3dproje
git init
git add .
git commit -m "Initial commit: 3D proje"
```

2) GitHub'da yeni bir repo oluşturun


3) Uzak repo ekleyip push edin

```powershell
git remote add origin https://github.com/<kullanici>/<repo>.git
git branch -M main
git push -u origin main
```

4) Backend çalıştırma (FastAPI)

Varsa `backend_venv` sanal ortamını aktifleştirin veya yeni bir venv oluşturun.

```powershell
cd backend
python -m venv backend_venv
.\backend_venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

5) Frontend çalıştırma (Next.js)

```powershell
cd frontend
npm install
npm run dev
```

6) Paylaşılabilir bağlantı

GitHub'daki repoyu paylaşıp başkalarının kopyalaması için URL'yi kullanabilirsiniz:

https://github.com/<kullanici>/<repo>

7) Notlar
=======
# 3D-Proje-
>>>>>>> 6d812e38236a1624441dac3f1ea25546a5d1531f
