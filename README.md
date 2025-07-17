# 📊 Fullstack Engineer Task – CSV Upload & Graph API

Aplikasi fullstack menggunakan **NestJS (backend)**, **MongoDB**, dan **Next.js (frontend)** yang memiliki fitur:

- Upload file `.csv` dan menyimpannya ke MongoDB
- Menampilkan grafik berdasarkan data yang telah di-upload

---

## 🧱 Tech Stack

- Backend: **NestJS** + **Mongoose (MongoDB)**
- Frontend: **Next.js 14** + **Tailwind CSS**
- Chart: **React Chart.js 2**
- HTTP Client: **Axios**

---

## 🚀 Fitur

### ✅ Backend (NestJS)

- `POST /raw-data/upload`
  Upload file `.csv` (via `form-data`, field: `files`)

- `GET /raw-data/graph`
  Query params:

  - `enodebId` (string)
  - `cellId` (string)

  Response: Array of objek `{ resultTime, availability }`

### ✅ Frontend (Next.js)

- Halaman Upload File CSV
- Halaman Input Parameter & Menampilkan Grafik Availability

---

## 📦 Cara Menjalankan

### 🔧 Persiapan MongoDB

Pastikan MongoDB berjalan secara lokal ataupun online, contoh DB_URL:

```
mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.cfoocbq.mongodb.net/
```

---

## 📁 Backend (NestJS)

### 1. Masuk ke direktori backend

```bash
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Jalankan server NestJS

```bash
npm run start
```

> Port default: `http://localhost:4000`

---

## 💻 Frontend (Next.js)

### 1. Masuk ke direktori frontend

```bash
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Jalankan server frontend

```bash
npm run dev
```

> Port default: `http://localhost:3001`

---

## 🔗 Struktur API Endpoint

| Method | Endpoint         | Deskripsi                            |
| ------ | ---------------- | ------------------------------------ |
| POST   | /raw-data/upload | Upload file CSV                      |
| GET    | /raw-data/graph  | Ambil data grafik berdasarkan filter |

---

## 🛡️ Validasi & Keamanan

- Validasi tanggal dan input form di frontend
- Validasi format CSV dan parsing di backend
- Duplikasi dicegah dengan `upsert` berdasarkan `enodebId`, `cellId`, `resultTime`

---

## 🧪 Contoh Query GET

```
GET http://localhost:4000/raw-data/graph?enodebId=1044010&cellId=22
```

---
