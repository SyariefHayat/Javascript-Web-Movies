1.  trim();

Contoh:
const inputValue = document.getElementById("search").value.trim();

Penjelasan:
Method trim() dalam javascript di gunakan untuk menghapus spasi kosong
di awal dan akhir dari sebuah string. Ini berguna ketika kita ingin membersihkan
input pengguna dari spasi ekstra yang tidak di inginkan sebelum melakukan
pemrosesan lebih lanjut.

Contoh:
Jika user memasukkan spasi sebelum atau setelah teks saat mengisi formulir

2. preventDefault();

Contoh:
event.preventDefault();

Penjelasan:
Di gunakan untuk mencegah tindakan bawaan pada peristiwa tertentu,
seperti mengklik tautan akan membuka URL yang ditautkan, atau mengirim formulir akan
memuat ulang halaman atau mengirim permintaan ke server.

3.  keyup, keydown, keypress;

Contoh:
document.getElementById("search").addEventListener("keypress", function (event) {});

Penjelasan:
Tiga jenis peristiwa kunci dalam JAVASCRIPT yang terjadi saat pengguna menekan atau
melepaskan tombol pada keyboard.

Detail:

- keyup:

  - Peristiwa keyup terjadi saat pengguna melepaskan sebuah tombol yang sebelumnya ditekan.
  - Ini dipicu setelah tombol dilepaskan.
  - Biasanya digunakan untuk menanggapi saat pengguna selesai menekan sebuah tombol.
  - Berguna untuk melacak ketika sebuah input selesai dimasukkan, atau untuk
    menanggapi perubahan yang berkaitan dengan keadaan tombol seperti penggunaan tombol pengontrol (misalnya tombol panah) atau tombol modifikasi (misalnya tombol Shift).

- keydown:

  - Peristiwa keydown terjadi saat pengguna menekan sebuah tombol pada keyboard.
  - Peristiwa ini dipicu sebelum karakter yang sesuai dengan tombol yang ditekan
    dimasukkan ke dalam elemen input.
  - Biasanya digunakan untuk menanggapi saat pengguna memulai menekan sebuah tombol.

- keypress:

  - Peristiwa keypress terjadi saat sebuah karakter dihasilkan oleh tombol keyboard yang
    ditekan.
  - Ini mencakup karakter seperti huruf, angka, dan simbol, tetapi tidak termasuk kunci
    spesial seperti tombol panah, tombol fungsi, dll.
  - Peristiwa ini dipicu setelah karakter dikirim ke elemen input.
  - keypress digunakan secara luas dalam hal-hal seperti validasi input karakter khusus
    atau memicu tindakan saat karakter tertentu dimasukkan.

4. try{}catch{};

Contoh:
try {
const response = await fetch(apiUrl);
const data = await response.json();

    // Memeriksa apakah response memiliki status ok (200)
    if (response.ok) {
      // Memeriksa apakah request berhasil (True)
      if (data.Response === "True") {
        const poster = data.Search[0].Poster;

        updateUi(poster);
      } else {
        // Jika request gagal (False)
        throw new Error(`HTTP error! Status: ${response.status} Message : ${data.Error}`);
      }
    } else {
      // Jika response tidak memiliki status ok (404)
      throw new Error(`HTTP error! Status: ${response.status} Message : ${data.Error}`);
    }

}
catch (error) {
console.error('Error:', error.message);
}

Penjelasan:
try{} dan catch{} adalah bagian dari struktur kontrol yang di gunakan untuk menangani
error ketika melakukan request API.

- try: blok kode yang mungkin menghasilkan error
- catch: blok kode yang menangkap error yang di hasilkan oleh blok try
- throw: blok kode yang secara manual melempar suatu objeck error. Ketika throw digunakan
  dalam sebuah blok try, itu akan langsung menghentikan
  eksekusi dari blok try, dan eksekusi akan beralih ke blok catch
- parameter pada catch: variabel yang digunakan untuk menangkap atau mereferensikan objek
  error yang dihasilkan oleh throw dalam blok try

5. sort();

Contoh:
movies.sort((a, b) => new Date(b.Year) - new Date(a.Year));

Penjelasan:
sort() merupakan sebuah method array yang di gunakan untuk melakukan penyortiran data.

- sort() default mengurutkan array berdasarkan abjad (a-z)
- reverse() membalikkan elemen pada array
- sort() reverse() mengurutkan array secara menurun (z-a)
- fungsi bandingkan mengurutkan array berdasarkan string (1-100)
  - Fungsi perbandingan harus mengembalikan nilai negatif, nol, atau positif, bergantung
    pada argumennya:
  - Jika hasilnya negatif, adiurutkan sebelumnya b.
  - Jika hasilnya positif, bdiurutkan sebelumnya a.
  - Jika hasilnya 0, tidak ada perubahan yang dilakukan pada urutan kedua nilai tersebut.

6. new date();

Contoh:
movies.sort((a, b) => new Date(b.Year) - new Date(a.Year));

Penjelasan:
Secara default, JavaScript akan menggunakan zona waktu browser dan menampilkan tanggal
sebagai string teks lengkap.

Format pembuatan date terdiri dari 7 angka yang menentukan tahun, bulan, hari, jam, menit,
detik, dan milidetik (dalam urutan itu)

dalam contoh new date di gunakan untuk mempermudah melakukan perbandingan
