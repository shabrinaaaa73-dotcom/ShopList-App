# ShopList App - Pemrograman Mobile Pertemuan 6

## Nama & NIM
- Nama: [Shabrina Yuspiana]
- NIM:  [243303621210t]

## Deskripsi Aplikasi
**TechShop** adalah aplikasi katalog produk gadget & teknologi yang dibangun menggunakan React Native + Expo. Menampilkan 16 produk dummy dari berbagai kategori lengkap dengan fitur pencarian, filter, sorting, toggle tampilan, dan detail produk interaktif.

## Fitur yang Diimplementasikan
- [x] FlatList dengan 16 produk (melebihi minimum 12)
- [x] Custom ProductCard component (file terpisah: `components/ProductCard.js`)
- [x] keyExtractor dengan ID unik (menggunakan `item.id`)
- [x] ListEmptyComponent (empty state dengan emoji, pesan, hint, dan tombol reset)
- [x] Search / Filter real-time (update langsung setiap karakter diketik)
- [x] Pull-to-Refresh (animasi refresh + shuffle data)
- [x] Filter Kategori (E1) — 9 kategori dengan chip horizontal scrollable
- [x] Toggle List/Grid View (E2) — toggle 1 kolom ↔ 2 kolom
- [x] SectionList Mode (E3) — tampilan dikelompokkan per kategori
- [x] Sort Produk (E4) — Relevan, Termurah, Termahal, Rating Tertinggi

## Fitur Tambahan (Beyond Requirements)
- [x] **Gambar Produk Real** — setiap produk menggunakan foto asli dari Unsplash
- [x] **Product Detail Modal** — bottom sheet interaktif saat produk ditekan, berisi:
  - Foto produk ukuran besar
  - Informasi stok dengan indikator warna (hijau/kuning/merah)
  - Progress bar ketersediaan stok
  - Grid info: Rating, Terjual, Stok
  - Tombol **Tambahkan ke Keranjang** dan **Beli Sekarang**
  - Tombol disabled otomatis saat stok habis
- [x] **Badge Produk** — label visual Best Seller / Hot / New / Premium
- [x] **Stock Indicator** — warna dinamis berdasarkan jumlah stok tersisa

## Screenshot
### Tampilan Utama (List Produk)
<img width="709" height="1600" alt="list produk" src="https://github.com/user-attachments/assets/3183bf11-5bef-46ab-98b0-c2152b63294e" />


### Tampilan Search — saat ada hasil
<img width="709" height="1600" alt="ada hasil" src="https://github.com/user-attachments/assets/79d28566-9030-4dc5-a4c3-5264a30e4774" />


### Tampilan Empty State — saat tidak ada hasil
<img width="709" height="1600" alt="tidak ada hasil" src="https://github.com/user-attachments/assets/a334024c-82cc-4aa4-b17d-ec8f3e851631" />


### Tampilan Detail Produk (Modal)
<img width="709" height="1600" alt="detail produk" src="https://github.com/user-attachments/assets/cad9e8cf-b88e-4f37-abea-8aab16b1a3cd" />


## Cara Menjalankan
1. Clone repo  : git clone [url-repo-kamu]
2. Install deps: npm install
3. Jalankan    : npx expo start
4. Scan QR Code dengan Expo Go di HP
