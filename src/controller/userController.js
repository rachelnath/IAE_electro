import axios from "axios"; // Mengimpor library axios untuk melakukan permintaan HTTP
import Cookies from "js-cookie"; // Mengimpor library js-cookie untuk mengelola cookie di browser
const url = "http://localhost:3000"; // URL dasar untuk API

// Fungsi untuk mengambil data pengguna berdasarkan ID akun
export const getUserdata = async () => {
  const token = Cookies.get("authToken"); // Mengambil token otentikasi dari cookie
  const accountId = Cookies.get("accountId"); // Mengambil ID akun dari cookie

  if (token) {
    // Memastikan token ada sebelum melakukan permintaan
    // Mengirim permintaan GET untuk mengambil data pengguna berdasarkan ID akun
    const response = await axios.get(`${url}/account/${accountId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Menambahkan token ke header permintaan untuk otentikasi
      },
    });

    if (response.status === 200) {
      // Memeriksa apakah status respons adalah 200 (OK)
      return response.data; // Mengembalikan data pengguna
    }
  } else {
    console.error("Token required"); // Menampilkan pesan kesalahan jika token tidak ada
  }
};
