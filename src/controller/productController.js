import axios from "axios"; // Mengimpor library axios untuk melakukan permintaan HTTP
import Cookies from "js-cookie"; // Mengimpor library js-cookie untuk mengelola cookie di browser
const url = "http://localhost:3000"; // URL dasar untuk API

// Mengambil data dari tabel produk -> Digunakan pada halaman dashboard, store, dan produk
export const getProduct = async () => {
  const token = Cookies.get("authToken"); // Mengambil token otentikasi dari cookie
  const response = await axios.get(`${url}/product`, {
    // Mengirim permintaan GET untuk mengambil daftar produk
    responseType: "json", // Menentukan tipe respons yang diharapkan
    headers: {
      Authorization: `Bearer ${token}`, // Menambahkan token ke header permintaan untuk otentikasi
    },
  });
  if (response.status == 200) {
    // Memeriksa apakah status respons adalah 200 (OK)
    return response.data; // Mengembalikan data produk
  }
};

// Mengambil data dari tabel produk berdasarkan ID -> Digunakan pada halaman produk
export const getProductById = async (id) => {
  const token = Cookies.get("authToken"); // Mengambil token otentikasi dari cookie
  try {
    const response = await axios.get(`${url}/product/${id}`, {
      // Mengirim permintaan GET untuk mengambil produk berdasarkan ID
      headers: {
        Authorization: `Bearer ${token}`, // Menambahkan token ke header permintaan untuk otentikasi
      },
    });
    if (response.status == 200) {
      // Memeriksa apakah status respons adalah 200 (OK)
      return response.data; // Mengembalikan data produk
    }
  } catch (error) {
    console.error(error); // Menampilkan kesalahan di konsol jika terjadi
  }
};

// Menambahkan produk baru ke tabel produk -> Digunakan pada halaman produk
export const AddProduct = async (
  productName,
  productDescription,
  productPrice,
  productStock,
  productImage,
  categoryId
) => {
  const token = Cookies.get("authToken"); // Mengambil token otentikasi dari cookie
  const accountId = Cookies.get("accountId"); // Mengambil ID akun dari cookie
  try {
    const formData = new FormData(); // Membuat objek FormData untuk mengirim data multipart
    formData.append("productName", productName); // Menambahkan nama produk
    formData.append("productDescription", productDescription); // Menambahkan deskripsi produk
    formData.append("productPrice", productPrice); // Menambahkan harga produk
    formData.append("productStock", productStock); // Menambahkan stok produk
    formData.append("productImage", productImage); // Menambahkan gambar produk
    formData.append("categoryId", categoryId); // Menambahkan ID kategori
    formData.append("accountId", accountId); // Menambahkan ID akun

    // Mengirim permintaan POST untuk menambahkan produk
    const response = await axios.post(`${url}/product`, formData, {
      "Content-Type": "multipart/form-data", // Menentukan tipe konten sebagai multipart/form-data
      headers: {
        Authorization: `Bearer ${token}`, // Menambahkan token ke header permintaan untuk otentikasi
      },
    });
    console.log({ status: "success", message: "Data berhasil dikirim" }); // Menampilkan pesan sukses di konsol
  } catch (error) {
    console.error(error); // Menampilkan kesalahan di konsol jika terjadi
  }
};

// Mengedit produk yang sudah ada -> Digunakan pada halaman produk
export const editProduct = async (
  id,
  productName,
  productDescription,
  productPrice,
  productStock,
  productImage,
  categoryId
) => {
  const token = Cookies.get("authToken"); // Mengambil token otentikasi dari cookie
  const formData = new FormData(); // Membuat objek FormData untuk mengirim data multipart
  formData.append("productName", productName); // Menambahkan nama produk
  formData.append("productDescription", productDescription); // Menambahkan deskripsi produk
  formData.append("productPrice", productPrice); // Menambahkan harga produk
  formData.append("productStock", productStock); // Menambahkan stok produk
  if (productImage) formData.append("productImage", productImage); // Menambahkan gambar produk jika ada
  formData.append("categoryId", categoryId); // Menambahkan ID kategori

  try {
    // Mengirim permintaan PATCH untuk memperbarui produk berdasarkan ID
    const response = await axios.patch(`${url}/product/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Menentukan tipe konten sebagai multipart/form-data
        Authorization: `Bearer ${token}`, // Menambahkan token ke header permintaan untuk otentikasi
      },
    });

    if (response.status == 200) {
      // Memeriksa apakah status respons adalah 200 (OK)
      return response; // Mengembalikan respons jika berhasil
    }
  } catch (error) {
    console.error(error); // Menampilkan kesalahan di konsol jika terjadi
  }
};

// Menghapus produk berdasarkan ID -> Digunakan pada halaman produk
export const DeleteProduct = async (id) => {
  const token = Cookies.get("authToken"); // Mengambil token otentikasi dari cookie
  try {
    // Mengirim permintaan DELETE untuk menghapus produk berdasarkan ID
    const response = await axios.delete(`${url}/product/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Menambahkan token ke header permintaan untuk otentikasi
      },
    });

    if (response.status == 200) {
      // Memeriksa apakah status respons adalah 200 (OK)
      console.log("Data berhasil dihapus"); // Menampilkan pesan sukses di konsol
    }
  } catch (error) {
    console.error(error); // Menampilkan kesalahan di konsol jika terjadi
  }
};
