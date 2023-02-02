import { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { useParams } from "react-router-dom";
import Navigation from "./Navigation";

const SingleSurat = () => {
  const Params = useParams();
  const [Loading, setLoading] = useState(false);

  const [dataSingleSurat, setSingleSurat] = useState([]);
  const [decSurat, setDec] = useState([]);
  const [font1, setFont1] = useState("30");
  const [font2, setFont2] = useState("18");

  const getAPIsinglesurat = async () => {
    const ResponAPI2 = await fetch(
      "https://equran.id/api/surat/" + Params.idsurat
    );
    const dataAPI2 = await ResponAPI2.json();
    setLoading(true);
    setSingleSurat(dataAPI2["ayat"]);
    setDec(dataAPI2);
  };

  useEffect(() => {
    getAPIsinglesurat();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Navigation
        suratP={decSurat.nama_latin}
        turunP={decSurat.tempat_turun}
        jumlahP={decSurat.jumlah_ayat}
        artiP={decSurat.arti}
        loadP={Loading}
        singleSP={dataSingleSurat}
      />

      <div className="container mx-auto">
        <div className="px-3 lg:px-0 flex flex-wrap gap-4 border-b-[1px] border-slate-300 pb-2 items-end">
          <div>
            <label className="label">
              <span className="label-text">Font Size Arab</span>
            </label>
            <select
              className="select select-bordered select-sm w-full max-w-xs"
              onChange={(f1) => setFont1(f1.target.value)}
            >
              <option value="20">Small</option>
              <option value="30" defaultValue>
                Default
              </option>
              <option value="40">Large</option>
              <option value="50">Extra Large</option>
            </select>
          </div>
          <div>
            <label className="label">
              <span className="label-text">Font Size Terjemahan</span>
            </label>
            <select
              className="select select-bordered select-sm w-full max-w-xs"
              onChange={(f2) => setFont2(f2.target.value)}
            >
              <option value="16">Small</option>
              <option value="18" defaultValue>
                Default
              </option>
              <option value="22">Large</option>
              <option value="27">Extra Large</option>
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
              <h3 className="text-lg font-bold">
                Deskripsi Surat {decSurat.nama_latin}{" "}
                <b className="font-serif">{decSurat.nama}</b>
              </h3>
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
              key={single.nomor}
              className="flex flex-wrap justify-end border-b-[1px] border-slate-300 py-14"
              id={single.nomor}
            >
              <div className="text-xl px-3 w-full mb-3 lg:w-fit lg:mb-0 lg:px-0">
                <div className="border border-slate-200 w-fit rounded-md text-sm px-2 lg:mt-3 nunito font-semibold">
                  {single.surah} {" : "}
                  {single.nomor}
                </div>
                <div className="dropdown dropdown-bottom mt-1">
                  <button
                    tabIndex={0}
                    className="px-3 border border-slate-200 rounded-md "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="19"
                      height="19"
                      fill="currentColor"
                      className="bi bi-three-dots"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                    </svg>
                  </button>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu p-1 text-[15px] shadow bg-base-100 w-[95px] "
                  >
                    <li>
                      <CopyToClipboard text={single.ar}>
                        <a className="p-0 px-1">Copy Arab</a>
                      </CopyToClipboard>
                    </li>
                    <li>
                      <CopyToClipboard text={single.idn}>
                        <a className="p-0 px-1">Copy Indo</a>
                      </CopyToClipboard>
                    </li>
                  </ul>
                </div>
              </div>
              <div
                className="arab px-3 lg:pl-2 w-full lg:w-[94%]"
                style={{ fontSize: font1 + "px" }}
              >
                {single.ar} ۝
              </div>
              <h6
                className="w-full px-3 text-left mt-2 text-[15px] lg:w-[94%] lg:mt-7 nunito lg:pr-2"
                style={{ fontSize: font2 + "px" }}
              >
                {single.idn}
              </h6>
            </div>
          ))
        ) : (
          <div className="h-screen flex justify-center items-center">
            <progress className="progress w-56"></progress>
          </div>
        )}

        <div className="flex justify-between my-5 px-3 md:px-0">
          {(() => {
            if (decSurat.surat_sebelumnya !== false) {
              return (
                <a
                  href={"/surat/" + decSurat.surat_sebelumnya?.nomor}
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
            } else if (decSurat.surat_sebelumnya == false) {
              return <div></div>;
            }
          })()}

          {(() => {
            if (decSurat.surat_selanjutnya !== false) {
              return (
                <a
                  href={"/surat/" + decSurat.surat_selanjutnya?.nomor}
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
export default SingleSurat;
