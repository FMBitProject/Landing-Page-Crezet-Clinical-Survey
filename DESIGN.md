# DESIGN.md — Panduan Survei Klinis Crezet 2026

Arah: **klinis, tenang, terpercaya**. Navy farmasi sebagai warna utama, teal sebagai satu-satunya aksen.
Diambil dari brand yang sudah ada di proyek (logo Daewoong, palet `pharma` di `index.html`), bukan dari referensi situs lain.

## Warna (token Tailwind di `index.html`)

| Token | Nilai | Peran |
|---|---|---|
| `pharma-950` | `#111d45` | Latar section gelap (hero, kartu ID, footer) |
| `pharma-900` | `#1a2f66` | Teks judul |
| `pharma-800` | `#1a3480` | Tombol aktif / tab aktif |
| `pharma-600` | `#2550cc` | Primary: tombol, link |
| `pharma-50/100` | `#f0f5ff` / `#e0ebff` | Latar section terang, chip, border |
| `teal-400/500` | `#2dd4bf` / `#14b8a6` | Aksen: status, highlight di latar gelap |
| `gray-500/600` | Tailwind | Teks isi (≥ 4.5:1 di putih) |
| amber `#92400e` on `#fef3c7` | | Peringatan / wajib |
| red `#dc2626` | | Error, kontraindikasi, AE/SAE |
| orange `#ea580c` | | Hanya strip brand Daewoong di footer |

Tidak ada dark mode.

## Tipografi

- Judul: **DM Sans** 700 (`font-display`). Isi: **Inter** 400/500/600. Kode subjek: **DM Mono**.
- Skala: 12 / 14 / 16 / 18 / 24 / 30–36 (h2: `text-3xl md:text-4xl`) / 48–72 (h1 hero).
- Isi minimal 16px untuk paragraf utama, 14px untuk teks kartu. Lebar paragraf `max-w-xl`.
- Label section: `.badge` — 12px, uppercase, letter-spacing 0.06em, warna `pharma-500`.

## Spasi & layout

- Skala 4px Tailwind. Section `py-20 md:py-24`, konten `max-w-6xl px-6`.
- Section berganti latar putih / `pharma-50` agar ritme terbaca.

## Bentuk & kedalaman

- Radius: 8 (chip) · 12 (`rounded-xl`, tombol, input) · 16 (`rounded-2xl`, kartu) · 24 (`rounded-3xl`, panel besar).
- Bayangan: `shadow-sm` default kartu; `.card-hover` (0 12px 40px rgba(26,52,128,.14)) saat hover.

## Komponen

- **Tombol primary**: `bg-pharma-600` → hover `pharma-700`, teks putih, `rounded-xl`, `px-6 py-3`.
- **Tombol sekunder (di latar gelap)**: border `white/25`, teks putih, hover `white/10`.
- **Fokus**: semua elemen interaktif memakai outline 2px teal (`:focus-visible` di `style.css`).
- **Kartu**: putih atau `pharma-50`, border `pharma-100`, radius 16.
- **Callout wajib**: latar amber muda, border amber, label "Wajib".
- **Tab**: kontainer putih, tab aktif `pharma-800`; scroll horizontal di layar sempit.

## Ikon & gambar

- Satu set ikon garis (gaya Feather/Lucide, stroke 1.8–2), inline SVG. **Tidak memakai emoji sebagai ikon.**
- Foto produk hanya untuk kemasan Crezet (bagian dosis).
- Hindari teks bergradasi pada judul.
