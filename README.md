# Audy Al Vasyah — Portfolio

Situs portofolio pribadi: **Next.js 15 (App Router)** + Tailwind CSS + shadcn/ui, dengan tema **neobrutalisme** — latar krem, border hitam tebal, shadow offset keras tanpa blur, aksen kuning & pink, dan family font Space Grotesk + IBM Plex (Sans & Mono).

Catatan: terdapat patch kecil untuk `buffer-equal-constant-time` (dependency tidak langsung dari Google Auth) agar kompatibel dengan Node 26 — dipasang otomatis lewat `patch-package` saat `npm install`.

Fitur:

- **Tools AI yang bisa dicoba** — inspeksi kondisi ban dari foto (Genkit + Google Gemini) dan Tanya-Jawab sistem penjadwalan ML. Flow di `src/ai/flows/`.
- **Form kontak kirim email** via [Resend](https://resend.com).
- **Counter kunjungan** di footer (Firebase Realtime Database, increment sekali per sesi peramban).

## Cara jalan

```bash
npm install
npm run dev        # http://localhost:3000
```

## Environment

Gayakan file .env dari contoh:

```bash
cp .env.example .env.local
```

| Kebutuhan | Keterangan |
| --- | --- |
| `NEXT_PUBLIC_FIREBASE_*` | Firebase project + Realtime Database URL (counter kunjungan) |
| `RESEND_API_KEY` | Kirim email dari form kontak |
| `GOOGLE_GENAI_API_KEY` | Gemini — dipakai Genkit untuk tools AI |
| `NEXT_PUBLIC_SITE_URL` | Domain produksi (untuk metadata & sitemap) |

## Skrip

| Perintah | Keterangan |
| --- | --- |
| `npm run dev` | Turbopack dev server |
| `npm run build` | Build produksi |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run genkit:dev` | Genkit developer UI untuk flow AI |

## Deploy

Konfigurasi `apphosting.yaml` ditujukan ke Firebase App Hosting. Kredensial rahasia (`RESEND_API_KEY`, `GOOGLE_GENAI_API_KEY`) diatur lewat dashboard, bukan lewat file.
