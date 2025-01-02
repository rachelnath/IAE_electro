import axios from "axios"; // Mengimpor library axios untuk melakukan permintaan HTTP
import Cookies from "js-cookie"; // Mengimpor library js-cookie untuk mengelola cookie di browser
const url = "http://localhost:3000"; // URL dasar untuk API

// Fungsi untuk mengambil data transaksi
export const getTransaction = async () => {
  const token = Cookies.get("authToken"); // Mengambil token otentikasi dari cookie

  try {
    // Mengirim permintaan GET untuk mengambil daftar transaksi
    const response = await axios.get(`${url}/transaction`, {
      headers: {
        Authorization: `Bearer ${token}`, // Menambahkan token ke header permintaan untuk otentikasi
      },
    });

    return response.data; // Mengembalikan data transaksi
  } catch (error) {
    console.error(error); // Menampilkan kesalahan di konsol jika terjadi
  }
};

// Fungsi untuk memperbarui status transaksi
export const updateStatusTransaction = async (id, status) => {
  const token = Cookies.get("authToken"); // Mengambil token otentikasi dari cookie

  try {
    // Mengirim permintaan PATCH untuk memperbarui status transaksi berdasarkan ID
    const response = await axios.patch(
      `${url}/transaction/status`,
      {
        id: id, // ID transaksi yang akan diperbarui
        status: status, // Status baru untuk transaksi
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Menambahkan token ke header permintaan untuk otentikasi
        },
      }
    );

    return response; // Mengembalikan respons dari server
  } catch (error) {
    console.error(error); // Menampilkan kesalahan di konsol jika terjadi
  }
};
