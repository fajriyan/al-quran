import { Helmet } from "react-helmet";
import Navigation from "../../components/Navigation";
import CopyToClipboard from "react-copy-to-clipboard";

const DetailSurahView = ({
  bookStats,
  Loading,
  dataDetails,
  SkeletonLoading,
  copySurat,
  modalAyat,
  dataTafsir,
  saveAyat,
  handleClickScroll,
  clickButtonss,
  setModalAyat,
  font,
  setFont,
  numbertosurah,
  currentBookmark,
}) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="robots" content="index,follow" />
        <title>
          {dataDetails?.nama_latin
            ? dataDetails?.nama_latin + " | Al Quran Digital"
            : "Loading.."}{" "}
        </title>
        <link
          rel="canonical"
          href={"https://al-quran.pages.dev/surah/" + dataDetails.nomor}
        />
      </Helmet>

      {bookStats == true ? (
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
        suratP={dataDetails.nama_latin}
        turunP={dataDetails.tempat_turun}
        jumlahP={dataDetails.jumlah_ayat}
        artiP={dataDetails.arti}
        loadP={Loading}
        singleSP={dataDetails}
      />

      <div className="container mx-auto selection:bg-blue-200 min-h-[90vh]">
        <div className="px-3 lg:px-0 flex flex-nowrap overflow-x-auto hidescroll gap-2 border-b border-slate-300 dark:border-slate-400/80 pb-2 items-end">
          {/* ++ Control Font */}
          <div>
            <label className="label">
              <span className="label-text">Ukuran Arab</span>
            </label>
            <select
              defaultValue={"25"}
              className="select select-bordered border-slate-700 dark:border-slate-400 select-sm w-full max-w-xs text-slate-800 dark:text-slate-300 bg-white dark:bg-slate-700 min-w-max"
              onChange={(f1) => setFont({ arab: f1.target.value })}
            >
              <option value="20">Kecil</option>
              <option value="25">Default</option>
              <option value="30">Besar</option>
              <option value="33">Sangat Besar</option>
            </select>
          </div>
          <div>
            <label className="label">
              <span className="label-text">Ukuran Terjemah</span>
            </label>
            <select
              defaultValue={"16"}
              className="select select-bordered border-slate-700 dark:border-slate-400 select-sm w-full max-w-xs text-slate-800 dark:text-slate-300 bg-white dark:bg-slate-700 min-w-max"
              onChange={(f2) => setFont({ idn: f2.target.value })}
            >
              <option value="14">Kecil</option>
              <option value="16">Default</option>
              <option value="20">Besar</option>
              <option value="25">Sangat Besar</option>
            </select>
          </div>
          {/* -- Control Font  */}

          {/* ++ Modal Description Surah */}
          <label
            htmlFor="my-modal-3"
            className="btn btn-outline border-slate-700 dark:border-slate-400 btn-sm text-slate-800 dark:text-slate-300 bg-white dark:bg-slate-700"
          >
            Deskripsi Surah
          </label>

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
                Deskripsi Surat {dataDetails.nama_latin}{" "}
                <b className="font-serif">{dataDetails.nama}</b>
              </h2>
              <div
                className="py-4"
                dangerouslySetInnerHTML={{ __html: dataDetails.deskripsi }}
              ></div>
            </div>
          </div>
          {/* -- Modal Description Surah */}
        </div>

        {Loading == false ? (
          dataDetails?.ayat?.map((single) => (
            <div
              key={single.nomor + single.surah}
              className="flex flex-wrap justify-end md:h-full md:items-center border-b border-slate-300 dark:border-slate-400/80 pt-14 pb-5 md:py-9 relative"
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
                      className="dropdown-content menu p-1 text-[15px] shadow-md border rounded-md w-[150px] bg-white dark:bg-slate-800"
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
                      <li>
                        <label
                          htmlFor={`tafsir-modal-${single.nomor}`}
                          id="btn-modal-4"
                          className="p-0 px-1"
                        >
                          Tafsir Ayat ke : {single.nomor}
                        </label>
                      </li>
                    </ul>
                  </div>

                  {/* Put this part before </body> tag */}
                  <input
                    type="checkbox"
                    id={`tafsir-modal-${single.nomor}`}
                    className="modal-toggle"
                  />
                  <div className="modal md:items-start md:pt-10 px-3">
                    <div className="modal-box w-full max-w-7xl bg-white dark:bg-slate-800">
                      <label
                        htmlFor={`tafsir-modal-${single.nomor}`}
                        className="btn btn-sm btn-circle absolute right-2 top-2"
                      >
                        ✕
                      </label>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold">
                          Tafsir {dataDetails.nama_latin} Ayat ke :{" "}
                          {single.nomor}
                        </h3>
                        <input
                          type="checkbox"
                          className="toggle toggle-sm"
                          checked={modalAyat}
                          onChange={() => setModalAyat(!modalAyat)}
                        />
                      </div>

                      {modalAyat ? (
                        <div
                          className="arab text-left w-full border-b border-slate-500 border-dashed pb-2 mb-1"
                          style={{ fontSize: font.arab + "px" }}
                        >
                          {single.ar} <span className="relative">۝</span>
                        </div>
                      ) : null}
                      <p className="py-1 text-[16px] leading-[25px] text-justify">
                        {dataTafsir["tafsir"]?.[parseInt(single.nomor)]?.tafsir}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Bookmark */}
                <button
                  onClick={() =>
                    saveAyat(single.surah, single.nomor, dataDetails.nama_latin)
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
                    {currentBookmark === single.nomor ? <path d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5m8.854-9.646a.5.5 0 0 0-.708-.708L7.5 7.793 6.354 6.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z"/> :  <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />}
                  </svg>
                </button>
              </div>
              {/* Menu Control End */}

              <div
                className="arab px-3 lg:pl-2 w-full md:w-[90%] lg:w-[94%]"
                style={{ fontSize: font.arab + "px" }}
              >
                {single.ar} <span className="relative">۝</span>
              </div>
              <p
                className="w-full px-3 text-left mt-2 text-[15px] lg:w-[94%] lg:mt-7 nunito lg:pr-2"
                style={{ fontSize: font.idn + "px" }}
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
            if (dataDetails.surat_sebelumnya !== false) {
              return (
                <a
                  href={
                    "/surah/" +
                    numbertosurah[dataDetails.surat_sebelumnya?.nomor]
                  }
                  className="btn text-white gap-2 bg-gradient-to-r hover:bg-gradient-to-t from-slate-900 to-slate-700 border-none focus:ring-2 ring-offset-2 ring-slate-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-left-square-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                  </svg>
                  {dataDetails.surat_sebelumnya?.nama_latin}
                </a>
              );
              // eslint-disable-next-line eqeqeq
            } else if (dataDetails.surat_sebelumnya == false) {
              return <div></div>;
            }
          })()}

          {(() => {
            if (dataDetails.surat_selanjutnya !== false) {
              return (
                <a
                  href={
                    "/surah/" +
                    numbertosurah[dataDetails.surat_selanjutnya?.nomor]
                  }
                  className="btn gap-2 text-white bg-gradient-to-r hover:bg-gradient-to-t from-slate-900 to-slate-700 border-none focus:ring-2 ring-offset-2 ring-slate-900"
                >
                  {dataDetails.surat_selanjutnya?.nama_latin}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-right-square-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
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

export default DetailSurahView;
