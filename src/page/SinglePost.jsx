import { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { useParams } from "react-router-dom";
import Navigation from "../component/Navigation";
import { Toaster, toast } from "react-hot-toast";
import { Helmet } from "react-helmet";

const SinglePost = () => {
  const Params = useParams();
  const [Loading, setLoading] = useState(false);

  const [dataSingleSurat, setSingleSurat] = useState([]);
  const [decSurat, setDec] = useState([]);
  const [font1, setFont1] = useState("25");
  const [font2, setFont2] = useState("16");

  const getAyat = async () => {
    const Req = await fetch("https://equran.id/api/surat/" + Params.id);
    const Res = await Req.json();
    window.scrollTo({ top: 0 });
    setSingleSurat(Res["ayat"]);
    setDec(Res);
    setLoading(true);
  };

  const SkeletonLoading = [1, 2, 3, 4];

  const copySurat = () => {
    toast.success("Copy Berhasil");
  };

  const saveAyat = (url, ayat, namaSurat) => {
    toast.success("Simpan Berhasil");
    localStorage.setItem("url", url);
    localStorage.setItem("ayat", ayat);
    localStorage.setItem("namaSurat", namaSurat);
  };

  const lanjutBaca = [
    {
      surat: localStorage.getItem("namaSurat"),
      url: localStorage.getItem("url"),
      ayat: localStorage.getItem("ayat"),
      fromBookmark: localStorage.getItem("fromBookmark"),
    },
  ];

  const handleClickScroll = () => {
    const element = document.getElementById("surahke" + lanjutBaca[0].ayat);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const clickButtonss = () => {
    document.getElementById("scrollNoww").click();
  };

  const [bookStats, setBStats] = useState(false);
  const checkingStatus = () => {
    if (
      lanjutBaca[0].url === Params.id &&
      lanjutBaca[0].fromBookmark === "true"
    ) {
      console.log(lanjutBaca[0].fromBookmark);
      toast(`Melanjutkan membaca Surah`, {
        icon: "📑",
      });
      setBStats(true);
    } else {
      // console.log("Bookmark Anchor Error "); //FOR DEBUG
      setBStats(false);
    }
  };
  useEffect(() => {
    checkingStatus();
    getAyat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Helmet Start  */}
      <Helmet>
        <meta charSet="utf-8" />
        <title>{decSurat.nama_latin}</title>
        <link
          rel="canonical"
          href={"https://al-quran.pages.dev/surah/" + decSurat.nomor}
        />
      </Helmet>

      {/* Helmet End  */}

      {bookStats ? (
        <div>
          <button
            className="btn-scroll hidden"
            id="scrollNoww"
            ref={clickButtonss}
            onClick={() => handleClickScroll()}
          >
            Lanjutkan Membaca
          </button>
        </div>
      ) : null}

      <Navigation
        suratP={decSurat.nama_latin}
        turunP={decSurat.tempat_turun}
        jumlahP={decSurat.jumlah_ayat}
        artiP={decSurat.arti}
        loadP={Loading}
        singleSP={dataSingleSurat}
      />
      <Toaster />
      <div className="container mx-auto selection:bg-blue-200">
        <div className="px-3 lg:px-0 flex flex-wrap gap-2 border-b border-slate-300 pb-2 items-end">
          {/* Arab Control */}
          <div>
            <label className="label">
              <span className="label-text">Ukuran Arab</span>
            </label>
            <select
              defaultValue={"25"}
              className="select select-bordered select-sm w-full max-w-xs"
              onChange={(f1) => setFont1(f1.target.value)}
            >
              <option value="20">Kecil</option>
              <option value="25">Default</option>
              <option value="30">Besar</option>
              <option value="33">Sangat Besar</option>
            </select>
          </div>
          {/* Terjemah Control */}
          <div>
            <label className="label">
              <span className="label-text">Ukuran Terjemah</span>
            </label>
            <select
              defaultValue={"16"}
              className="select select-bordered select-sm w-full max-w-xs"
              onChange={(f2) => setFont2(f2.target.value)}
            >
              <option value="14">Kecil</option>
              <option value="16">Default</option>
              <option value="20">Besar</option>
              <option value="25">Sangat Besar</option>
            </select>
          </div>

          {/* The button to open modal */}
          <label htmlFor="my-modal-3" className="btn btn-outline btn-sm">
            Deskripsi
          </label>

          {/* Put this part before </body> tag */}
          <input type="checkbox" id="my-modal-3" className="modal-toggle" />
          <div className="modal md:items-start md:pt-10 px-3">
            <div className="modal-box w-full max-w-4xl">
              <label
                htmlFor="my-modal-3"
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </label>
              <h2 className="text-lg font-bold">
                Deskripsi Surat {decSurat.nama_latin}{" "}
                <b className="font-serif">{decSurat.nama}</b>
              </h2>
              <div
                className="py-4"
                dangerouslySetInnerHTML={{ __html: decSurat.deskripsi }}
              ></div>
            </div>
          </div>
        </div>
        {Loading ? (
          dataSingleSurat.map((single) => (
            <div
              key={single.nomor + single.surah}
              className="flex flex-wrap justify-end md:h-full md:items-center border-b border-slate-300 pt-14 pb-5 md:py-9 relative"
              id={"surahke" + single.nomor}
            >
              {/* Menu Control Start */}
              <div className="text-xl flex justify-between md:block gap-1 px-3 top-2 w-full mb-3 md:w-fit md:mb-0 md:px-0 absolute left-0 border-b border-dashed border-slate-200 pb-2 md:border-0">
                <div className="flex md:block w-full gap-2">
                  {/* Nomer & Surat */}
                  <div className="w-auto border md:border-slate-200 rounded-md text-sm px-1 lg:mt-3 nunito font-semibold">
                    {single.surah} {" : "}
                    {single.nomor}
                  </div>
                  {/* Copy Surat */}
                  <div className="dropdown w-8 md:w-full dropdown-bottom md:mt-1">
                    <button
                      tabIndex={0}
                      className="border border-slate-200 w-full rounded-md flex justify-center hover:bg-slate-100"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-three-dots"
                        viewBox="0 0 16 16"
                      >
                        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                      </svg>
                    </button>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu p-1 text-[15px] shadow-md border rounded-md bg-base-100 w-[150px] "
                    >
                      <li>
                        <CopyToClipboard onCopy={copySurat} text={single.ar}>
                          <span className="p-0 px-1">
                            Copy Ayat Ke : {single.nomor}
                          </span>
                        </CopyToClipboard>
                      </li>
                      <li>
                        <CopyToClipboard onCopy={copySurat} text={single.idn}>
                          <span className="p-0 px-1">Copy Terjemahan</span>
                        </CopyToClipboard>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* Bookmark */}
                <button
                  onClick={() =>
                    saveAyat(single.surah, single.nomor, decSurat.nama_latin)
                  }
                  className="md:border w-6 md:w-full rounded-md border-slate-200 flex justify-center items-center md:h-9 hover:bg-slate-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-bookmark"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
                  </svg>
                </button>
              </div>
              {/* Menu Control End */}

              <div
                className="arab px-3 lg:pl-2 w-full md:w-[90%] lg:w-[94%]"
                style={{ fontSize: font1 + "px" }}
              >
                {single.ar} <span className="relative">۝</span>
              </div>
              <p
                className="w-full px-3 text-left mt-2 text-[15px] lg:w-[94%] lg:mt-7 nunito lg:pr-2"
                style={{ fontSize: font2 + "px" }}
              >
                {single.idn}
              </p>
            </div>
          ))
        ) : (
          <>
            {SkeletonLoading.map((loadSkeleton) => (
              <div className="border-b py-5" key={Math.random()}>
                <div className="animate-pulse flex space-x-4">
                  <div className="rounded-full bg-slate-200 w-10"></div>
                  <div className="flex-1 py-1 ">
                    <div className="flex justify-end mt-2">
                      <div className="h-12 w-1/2 bg-slate-200 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-10">
                      <div className="h-3 bg-slate-200 rounded col-span-2"></div>
                      <div className="h-3 bg-slate-200 rounded col-span-3"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
        <div className="flex justify-between my-5 px-3 md:px-0">
          {(() => {
            if (decSurat.surat_sebelumnya !== false) {
              return (
                <a
                  href={"/surah/" + decSurat.surat_sebelumnya?.nomor}
                  className="btn gap-2 bg-gradient-to-r hover:bg-gradient-to-t from-slate-900 to-slate-700 border-none hover:shadow-xl focus:ring-2 ring-offset-2 ring-slate-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-left-square-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1z" />
                  </svg>
                  {decSurat.surat_sebelumnya?.nama_latin}
                </a>
              );
              // eslint-disable-next-line eqeqeq
            } else if (decSurat.surat_sebelumnya == false) {
              return <div></div>;
            }
          })()}

          {(() => {
            if (decSurat.surat_selanjutnya !== false) {
              return (
                <a
                  href={"/surah/" + decSurat.surat_selanjutnya?.nomor}
                  className="btn gap-2 bg-gradient-to-r hover:bg-gradient-to-t from-slate-900 to-slate-700 border-none hover:shadow-xl focus:ring-2 ring-offset-2 ring-slate-900"
                >
                  {decSurat.surat_selanjutnya?.nama_latin}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-right-square-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v12zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1z" />
                  </svg>
                </a>
              );
            }
          })()}
        </div>
      </div>
      {/* Container */}
    </>
  );
};
export default SinglePost;
