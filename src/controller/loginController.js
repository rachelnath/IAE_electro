import axios from "axios"; // Mengimpor library axios untuk melakukan permintaan HTTP
import Cookies from "js-cookie"; // Mengimpor library js-cookie untuk mengelola cookie di browser

const url = "http://localhost:3000"; // URL dasar untuk API

// Fungsi untuk melakukan login
export const Login = async (loginData, password, navigate) => {
  const requestData = {
    loginData: loginData, // Data login (username/email)
    password: password, // Password pengguna
  };

  // Mengirim permintaan POST untuk login
  const response = await axios.post(`${url}/login`, requestData);

  if (response.status == 200) {
    // Memeriksa apakah status respons adalah 200 (OK)
    // Menyimpan token dan ID akun ke cookie dengan masa berlaku 1 hari
    Cookies.set("authToken", response.data.token, { expires: 1 });
    Cookies.set("accountId", response.data.accountId, { expires: 1 });
    console.log(response.data); // Menampilkan data respons di konsol

    // Mengarahkan pengguna ke dashboard yang sesuai berdasarkan tipe pengguna
    if (response.data.type == "customer") {
      navigate("/dashboard"); // Menuju ke dashboard pelanggan
    } else {
      navigate("/saler/dashboard"); // Menuju ke dashboard penjual
    }
  }
};

// Fungsi untuk melakukan registrasi
export const Register = async (username, email, password, type, navigate) => {
  const requestData = {
    username: username, // Nama pengguna
    email: email, // Alamat email
    password: password, // Password pengguna
    type: type, // Tipe pengguna (customer/saler)
  };

  // Mengirim permintaan POST untuk registrasi
  const response = await axios.post(`${url}/account`, requestData);

  if (response.status == 200) {
    // Memeriksa apakah status respons adalah 200 (OK)
    console.log("Berhasil register"); // Menampilkan pesan sukses di konsol
    navigate("/"); // Mengarahkan pengguna kembali ke halaman utama
  }
};

// Fungsi untuk mengubah password
export const ChangePassword = async (password, loginData) => {
  if (password) {
    // Memastikan password tidak kosong
    try {
      // Mengirim permintaan PATCH untuk mengubah password
      const response = await axios.patch(`${url}/forgetPassword`, {
        password: password, // Password baru
        loginData: loginData, // Data login (username/email)
      });
      if (response.status == 200) {
        // Memeriksa apakah status respons adalah 200 (OK)
        console.log("Berhasil ganti password"); // Menampilkan pesan sukses di konsol
      }
    } catch (error) {
      console.error(error); // Menampilkan kesalahan di konsol jika terjadi
    }
  }
};
