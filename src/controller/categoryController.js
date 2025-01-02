import axios from "axios"; // Mengimpor library axios untuk melakukan permintaan HTTP
import Cookies from "js-cookie"; // Mengimpor library js-cookie untuk mengelola cookie di browser
const url = "http://localhost:3000"; // URL dasar untuk API

// Fungsi untuk mengambil data kategori dari API
export const getCategory = async () => {
  const token = Cookies.get("authToken"); // Mengambil token otentikasi dari cookie

  if (token) {
    // Memastikan token ada sebelum melakukan permintaan
    const response = await axios.get(`${url}/category`, {
      // Mengirim permintaan GET ke endpoint kategori
      headers: {
        Authorization: `Bearer ${token}`, // Menambahkan token ke header permintaan untuk otentikasi
      },
    });
    if (response.status === 200) {
      // Memeriksa apakah status respons adalah 200 (OK)
      return response.data; // Mengembalikan data kategori yang diterima dari respons
    }
  }
};
