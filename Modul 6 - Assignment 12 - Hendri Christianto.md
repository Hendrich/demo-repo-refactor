Refactor login sudah selesai:

- Komponen login dipisah ke LoginForm agar modular dan lebih bersih.
- Logic login dipindahkan ke fungsi khusus di halaman utama.
- Ditambahkan console.time untuk cek performa request login.

Catatan sebelum refactor:

- Validasi dan logic login tercampur di satu file.
- Tidak ada pengukuran performa.

Catatan sesudah refactor:

- Komponen login lebih modular dan mudah di-maintain.
- Performa login bisa diukur dengan console.time.
- Struktur kode lebih jelas dan scalable.
