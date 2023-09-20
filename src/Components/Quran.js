import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const Quran = () => {
  const [Loading, setLoading] = useState(false);

  const [dataSurat, setSurat] = useState([]);
  const getAPIsurat = async () => {
    const ResponAPI1 = await fetch("https://equran.id/api/surat");
    const dataAPI1 = await ResponAPI1.json();
    setLoading(true);
    setSurat(dataAPI1);
  };

  const lanjutBaca = [
    {
      surat: localStorage.getItem("namaSurat"),
      url: localStorage.getItem("url"),
      ayat: localStorage.getItem("ayat"),
    },
  ];

  useEffect(() => {
    getAPIsurat();
  });

  const skeletonLoad = [1, 2, 3, 4, 5];
  const [querySearch, setQuerySearch] = useState("");

  return (
    <>
      <div className="container mx-auto my-5 px-3">
        <div
          className="hero min-h-[200px] rounded-xl lg:rounded-xl flex flex-wrap"
          style={{
            backgroundImage: `url("https://images.pexels.com/photos/8164567/pexels-photo-8164567.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`,
          }}
        >
          <div className="hero-overlay bg-opacity-60 py-10 px-5 rounded-xl lg:rounded-xl text-white">
            <div className="md:w-[70%] mx-auto">
              <div className="w-full">
                <span className="text-5xl mb-3 lg:text-5xl sm:text-md font-bold">
                  Al Qur'an
                </span>
                <h1 className="hidden">
                  Al quran Online | Baca Quran Praktis Tanpa Install Aplikasi
                </h1>

                <p className="mb-5 mt-2">
                  Diriwayatkan dari Abu Umamah al-Bahili, Rasulullah SAW
                  bersabda, "Bacalah Alquran, maka sesungguhnya ia akan datang
                  di hari kiamat memberi syafaat kepada pembacanya". 📌
                  Informasi mengenai situs dan donasi{" "}
                  <Link
                    to={"/about"}
                    className="btn btn-xs text-slate-800 bg-white hover:bg-slate-700 hover:text-white"
                  >
                    disini
                  </Link>
                </p>
              </div>
              <input
                type="text"
                onChange={(e) =>
                  setQuerySearch(e.target.value.replace(" ", "-"))
                }
                placeholder="🔎 Cari surat Al Qur'an disini"
                className="input text-slate-600 capitalize font-serif border-white w-full focus:ring-4 focus:ring-blue-400"
              />
              <span className="label-text-alt text-white px-2 py-1">
                Hasil pencarian tentang :{" "}
                {querySearch ? (
                  <b className="capitalize font-serif">{querySearch}</b>
                ) : (
                  <b>Nama Surat</b>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto my-5 px-3">
        <div className="card flex flex-row w-full bg-base-100 shadow-md hover:border-slate-600 border-dashed border-[1px] overflow-hidden">
          <div className="card-body gap-0">
            <h2 className="text-sm">Penanda : </h2>
            <p className="card-title font-serif">{lanjutBaca[0].surat}</p>
            <p>
              Ayat ke : <span>{lanjutBaca[0].ayat}</span>{" "}
            </p>
            {/* <div className="card-actions justify-start mt-4">
              <Link
                to={`/surat/${lanjutBaca[0].url}#${lanjutBaca[0].ayat}`}
                className="btn btn-sm bg-gradient-to-r hover:bg-gradient-to-t from-slate-800 to-slate-700 border-none hover:shadow-lg focus:ring-2 ring-offset-2 ring-slate-800"
              >
                Lanjutkan Membaca
              </Link>
            </div> */}
          </div>
          <div className="flex">
            <button className="px-5 border bg-slate-100 group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-trash group-hover:scale-[120%] duration-300"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className=" grid grid-cols-1 gap-4 px-3 lg:grid-cols-3 lg:gap-4 sm:grid-cols-2 sm:gap-4 container mx-auto mb-14">
        {Loading
          ? dataSurat
              // eslint-disable-next-line array-callback-return
              .filter((QF) => {
                if (!querySearch) {
                  return QF;
                } else if (
                  QF.nama_latin
                    .toLowerCase()
                    .includes(querySearch.toLowerCase())
                ) {
                  return QF;
                }
              })
              .map((s) => (
                <div className="card w-full bg-base-100 shadow-md hover:border-slate-600 border-dashed border-[1px]">
                  <div className="card-body">
                    <h2
                      className="card-title mb-0 font-serif"
                      key={s.nama_latin}
                    >
                      {s.nama_latin.replace("-", " ")}
                    </h2>
                    <p className="text-left font-serif -mt-[20px]">
                      {s.arti} |{" "}
                      <span className="arab text-[5px]">{s.nama}</span>
                    </p>

                    <div className="flex gap-1">
                      <div className="badge badge-outline">{s.jumlah_ayat}</div>
                      <div className="badge badge-outline capitalize">
                        {s.tempat_turun}
                      </div>
                    </div>

                    <div className="card-actions justify-start">
                      <Link
                        to={"/surat/" + s.nomor}
                        className="btn btn-sm bg-gradient-to-r hover:bg-gradient-to-t from-slate-800 to-slate-700 border-none hover:shadow-lg focus:ring-2 ring-offset-2 ring-slate-800"
                      >
                        baca sekarang!
                      </Link>
                    </div>
                  </div>
                </div>
              ))
          : // <div className="h-40 flex justify-center items-center">
            //   <progress className="progress w-56"></progress>
            // </div>
            skeletonLoad.map((L) => (
              <div className="card w-96 bg-base-100 shadow-md ">
                <div className="card-body">
                  <div className="h-7 bg-gray-200 rounded-md dark:bg-gray-700 w-40 mb-1 animate-pulse"></div>
                  <div className="h-2.5 bg-gray-200 rounded-md dark:bg-gray-700 w-48 mb-4 animate-pulse"></div>

                  <div className="flex gap-1">
                    <div className="badge badge-outline animate-pulse bg-gray-50">
                      <div className="w-5"></div>
                    </div>
                    <div className="badge badge-outline animate-pulse bg-gray-50">
                      <div className="w-9"></div>
                    </div>
                  </div>

                  <div className="card-actions justify-start animate-pulse">
                    <button className="btn btn-sm w-32"></button>
                  </div>
                </div>
              </div>
            ))}
      </div>
      <Footer />
    </>
  );
};
export default Quran;
