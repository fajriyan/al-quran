import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Error 404 | Page Not Found</title>
        <link rel="canonical" href="*" />
      </Helmet>
      <div className="container mx-auto h-screen flex items-center px-3 md:px-0">
        <div className="">
          <h1 className="text-xl md:text-3xl font-bold">
            Halaman yang Anda Akses Tidak ditemukan.
          </h1>
          <p className="text-sm md:text-md pb-5 pt-1 w-[80%]">
            Error 404, Silahkan Kembali ke Beranda atau Hubungi Admin
          </p>
          <Link
            className="btn btn-sm bg-gradient-to-r hover:bg-gradient-to-t from-slate-800 to-slate-700 border-none hover:shadow-lg focus:ring-2 ring-offset-2 ring-slate-800"
            to="/"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
