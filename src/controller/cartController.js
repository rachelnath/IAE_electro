import axios from "axios"; // Library untuk mengakses API
import Cookies from "js-cookie"; // Library untuk menyimpan data di Cookie website
const url = "http://localhost:3000"; // URL dasar untuk API

// Mengambil data Cart dari API
export const getCart = async () => {
  const token = Cookies.get("authToken"); // Mengambil token otentikasi dari cookie
  const response = await axios.get(`${url}/cart`, {
    // Mengirim permintaan GET untuk mengambil data keranjang
    headers: {
      Authorization: `Bearer ${token}`, // Menambahkan token ke header permintaan
    },
  });
  if (response.status === 200) {
    // Memeriksa apakah permintaan berhasil
    return response.data; // Mengembalikan data keranjang
  }
};

// Menambah data cart dari API
export const addCart = async (productId, quantity) => {
  const token = Cookies.get("authToken"); // Mengambil token otentikasi dari cookie
  const accountId = Cookies.get("accountId"); // Mengambil ID akun dari cookie
  if (token) {
    // Memastikan token ada
    const response = await axios.post(
      `${url}/cart`, // Mengirim permintaan POST untuk menambahkan item ke keranjang
      {
        productId: productId, // ID produk yang akan ditambahkan
        quantity: quantity, // Jumlah produk yang akan ditambahkan
        accountId: accountId, // ID akun pengguna
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Menambahkan token ke header permintaan
        },
      }
    );
    if (response.status === 200) {
      // Memeriksa apakah permintaan berhasil
      return response.data; // Mengembalikan data respons
    } else {
      console.error("Error adding product to cart"); // Menampilkan pesan kesalahan jika gagal
    }
  }
};

// Memperbarui item dalam keranjang
export const updateCart = async (cartId, quantity, productId) => {
  const token = Cookies.get("authToken"); // Mengambil token otentikasi dari cookie
  if (token) {
    // Memastikan token ada
    const response = await axios.patch(
      `${url}/cart/${cartId}`, // Mengirim permintaan PATCH untuk memperbarui item dalam keranjang
      {
        quantity: quantity, // Jumlah baru untuk item
        productId: productId, // ID produk yang akan diperbarui
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Menambahkan token ke header permintaan
        },
      }
    );
    if (response.status == 200) {
      // Memeriksa apakah permintaan berhasil
      return response.data; // Mengembalikan data respons
    }
  }
};

// Menghapus item dari keranjang
export const deleteCart = async (cartId) => {
  const token = Cookies.get("authToken"); // Mengambil token otentikasi dari cookie
  if (token) {
    // Memastikan token ada
    const response = await axios.delete(`${url}/cart/${cartId}`, {
      // Mengirim permintaan DELETE untuk menghapus item dari keranjang
      headers: {
        Authorization: `Bearer ${token}`, // Menambahkan token ke header permintaan
      },
    });
    if (response.status == 200) {
      // Memeriksa apakah permintaan berhasil
      return response.data; // Mengembalikan data respons
    }
  }
};

// Menghapus semua item dalam keranjang
export const cleanCart = async () => {
  const token = Cookies.get("authToken"); // Mengambil token otentikasi dari cookie
  if (token) {
    // Memastikan token ada
    const response = await axios.delete(`${url}/clean`, {
      // Mengirim permintaan DELETE untuk membersihkan keranjang
      headers: {
        Authorization: `Bearer ${token}`, // Menambahkan token ke header permintaan
      },
    });
    console.log(response); // Menampilkan respons di konsol
  }
};
