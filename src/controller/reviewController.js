import axios from "axios"; // Mengimpor library axios untuk melakukan permintaan HTTP
import Cookies from "js-cookie"; // Mengimpor library js-cookie untuk mengelola cookie di browser
const url = "http://localhost:3000"; // URL dasar untuk API

// Fungsi untuk mengambil semua ulasan
export const getReview = async () => {
  const token = Cookies.get("authToken"); // Mengambil token otentikasi dari cookie

  try {
    // Mengirim permintaan GET untuk mengambil daftar ulasan
    const response = await axios.get(`${url}/review`, {
      headers: {
        Authorization: `Bearer ${token}`, // Menambahkan token ke header permintaan untuk otentikasi
      },
    });

    return response.data; // Mengembalikan data ulasan
  } catch (error) {
    console.error(error); // Menampilkan kesalahan di konsol jika terjadi
  }
};

// Fungsi untuk mengirim tanggapan terhadap ulasan
export const sendResponse = async (id, reviewResponse) => {
  const token = Cookies.get("authToken"); // Mengambil token otentikasi dari cookie

  try {
    // Mengirim permintaan PATCH untuk memperbarui tanggapan ulasan berdasarkan ID
    const response = await axios.patch(
      `${url}/review/response/${id}`,
      {
        reviewResponse: reviewResponse, // Tanggapan terhadap ulasan
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Menambahkan token ke header permintaan untuk otentikasi
        },
      }
    );
    if (response.status == 200) {
      // Memeriksa apakah status respons adalah 200 (OK)
      console.log(response); // Menampilkan respons di konsol
    }
  } catch (error) {
    console.error(error); // Menampilkan kesalahan di konsol jika terjadi
  }
};

// Fungsi untuk menghapus tanggapan terhadap ulasan
export const removeResponse = async (id) => {
  const token = Cookies.get("authToken"); // Mengambil token otentikasi dari cookie

  try {
    // Mengirim permintaan PATCH untuk menghapus tanggapan ulasan berdasarkan ID
    const response = await axios.patch(
      `${url}/review/response/${id}`,
      {
        reviewResponse: "", // Mengosongkan tanggapan
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Menambahkan token ke header permintaan untuk otentikasi
        },
      }
    );
    if (response.status == 200) {
      // Memeriksa apakah status respons adalah 200 (OK)
      console.log(response); // Menampilkan respons di konsol
    }
  } catch (error) {
    console.error(error); // Menampilkan kesalahan di konsol jika terjadi
  }
};

// Fungsi untuk menambahkan ulasan baru
export const addReview = async (reviewText, reviewSkor, productId) => {
  const token = Cookies.get("authToken"); // Mengambil token otentikasi dari cookie
  const accountId = Cookies.get("accountId"); // Mengambil ID akun dari cookie

  try {
    // Mengirim permintaan POST untuk menambahkan ulasan baru
    const response = await axios.post(
      `${url}/review`,
      {
        reviewText: reviewText, // Teks ulasan
        reviewSkor: reviewSkor, // Skor ulasan
        productId: productId, // ID produk yang diulas
        accountId: accountId, // ID akun pengguna
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Menambahkan token ke header permintaan untuk otentikasi
        },
      }
    );

    if (response.status == 200) {
      // Memeriksa apakah status respons adalah 200 (OK)
      console.log("Berhasil kirim review"); // Menampilkan pesan sukses di konsol
    }
  } catch (error) {
    console.error(error); // Menampilkan kesalahan di konsol jika terjadi
  }
};
