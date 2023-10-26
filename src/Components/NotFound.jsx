import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <h1>Halaman yang Anda Akses Tidak ditemukan</h1>
      <p>Error 404 | Silahkan Kembali ke Branda, atau Hubungi Admin</p>
      <Link style={{ textDecoration: "underline" }} to="/">
        Kembali ke Beranda
      </Link>
    </div>
  );
};

export default NotFound;
