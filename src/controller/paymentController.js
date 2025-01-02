import axios from "axios"; // Mengimpor library axios untuk melakukan permintaan HTTP
import Cookies from "js-cookie"; // Mengimpor library js-cookie untuk mengelola cookie di browser

// Fungsi untuk menghasilkan URL pembayaran
export const generatePaymentUrl = async (item, orderDetail) => {
  const url = "http://localhost:3000"; // URL dasar untuk API
  const token = Cookies.get("authToken"); // Mengambil token otentikasi dari cookie
  const accountId = Cookies.get("accountId"); // Mengambil ID akun dari cookie

  if (token) {
    // Memastikan token ada sebelum melakukan permintaan
    // Mengirim permintaan POST untuk menghasilkan URL pembayaran
    const response = await axios.post(
      `${url}/payment`, // Endpoint untuk pembayaran
      {
        item: item, // Item yang akan dibayar
        accountId: accountId, // ID akun pengguna
        orderDetail: orderDetail, // Detail pesanan
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Menambahkan token ke header permintaan untuk otentikasi
        },
      }
    );

    console.log(response); // Menampilkan respons di konsol

    // Memeriksa apakah respons mengandung URL pengalihan
    if (response.data.redirect_url) {
      Cookies.set("orderId", response.data.order_id, { expires: 1 }); // Menyimpan ID pesanan ke cookie dengan masa berlaku 1 hari
      window.location.href = response.data.redirect_url; // Mengalihkan pengguna ke URL pembayaran
      return response; // Mengembalikan respons
    }
  } else {
    console.error("Token is required"); // Menampilkan pesan kesalahan jika token tidak ada
  }
};
