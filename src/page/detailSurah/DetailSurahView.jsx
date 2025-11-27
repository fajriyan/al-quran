import { Helmet } from "react-helmet";
import Navigation from "../../components/Navigation";
import CopyToClipboard from "react-copy-to-clipboard";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const DetailSurahView = ({
  bookStats,
  Loading,
  dataDetails,
  dataTafsir,
  saveAyat,
  handleClickScroll,
  font,
  setFont,
  numbertosurah,
  currentBookmark,
  isFriday
}) => {
  function toArabicNumber(num) {
    const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    return num
      .toString()
      .split("")
      .map((d) => arabicDigits[d])
      .join("");
  }

  const [activeMenu, setActiveMenu] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const setAudioDuration = () => setDuration(audio.duration || 0);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", setAudioDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", setAudioDuration);
    };
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="robots" content="index, follow" />
        <title>
          {dataDetails?.nama_latin
            ? dataDetails?.nama_latin + " | Al Quran Digital"
            : "Loading.."}{" "}
        </title>
        <link
          rel="canonical"
          href={"https://al-quran.pages.dev/surah/" + dataDetails?.nomor}
        />
      </Helmet>

      {bookStats == true ? (
        <div>
          <button
            className="btn-scroll hidden"
            id="scrollNoww"
            ref={() => document.getElementById("scrollNoww").click()}
            onClick={() => handleClickScroll()}
          >
            Lanjutkan Membaca
          </button>
        </div>
      ) : null}

      <Navigation
        suratP={dataDetails?.nama_latin}
        turunP={dataDetails?.tempat_turun}
        jumlahP={dataDetails?.jumlah_ayat}
        artiP={dataDetails?.arti}
        loadP={Loading}
        singleSP={dataDetails}
      />
      <div className="container mx-auto selection:bg-blue-200 min-h-[90vh]">
        <div className="px-3 lg:px-0 flex flex-wrap overflow-x-auto hidescroll gap-2 border-b border-slate-300 dark:border-slate-800 py-3 items-end">
          <div className="relative max-w-xs">
            <select
              defaultValue={"25"}
              className="select select-bordered border-slate-700 select-sm w-full text-slate-800 dark:text-gray-200 dark:border-gray-700 bg-white dark:bg-slate-700 pl-10"
              onChange={(f1) => setFont({ arab: f1.target.value })}
            >
              <option value="20">Kecil</option>
              <option value="25">Default</option>
              <option value="30">Besar</option>
              <option value="33">Sangat Besar</option>
            </select>
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-300 text-sm">
              🕌
            </span>
          </div>
          <div className="relative max-w-xs">
            <select
              defaultValue={"16"}
              className="select select-bordered border-slate-700 select-sm w-full text-slate-800dark:bg-slate-900 dark:border-gray-800 bg-white dark:bg-slate-700 pl-10"
              onChange={(f2) => setFont({ idn: f2.target.value })}
            >
              <option value="14">Kecil</option>
              <option value="16">Default</option>
              <option value="20">Besar</option>
              <option value="25">Sangat Besar</option>
            </select>
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-300 text-sm">
              📖
            </span>
          </div>
          <label
            htmlFor="my-modal-3"
            className="btn btn-outline border-slate-700 dark:border-slate-700 btn-sm text-slate-800 dark:text-slate-300 bg-white dark:bg-slate-800"
          >
            Deskripsi Surah
          </label>
          <div className="w-[250px]">
            <div className="relative flex border border-slate-700  bg-white dark:bg-slate-900 dark:border-gray-700 rounded-xl py-1 btn-sm uppercase overflow-hidden">
              {/* Indicator yang geser */}
              <span
                className="absolute inset-0 w-1/2 bg-slate-900 dark:bg-slate-600 rounded-lg shadow transition-transform duration-300"
                style={{ transform: `translateX(${activeTab * 100}%)` }}
              />

              {/* Tombol */}
              <button
                onClick={() => setActiveTab(0)}
                className={`flex-1 z-10 py-0.5 font-medium transition-colors ${
                  activeTab === 0
                    ? "text-white"
                    : "text-slate-700 dark:text-slate-300"
                }`}
              >
                Terjemahan
              </button>
              <button
                onClick={() => setActiveTab(1)}
                className={`flex-1 z-10 px-4 py-0.5 font-medium transition-colors ${
                  activeTab === 1
                    ? "text-white"
                    : "text-slate-700 dark:text-slate-300"
                }`}
              >
                Membaca
              </button>
            </div>
          </div>

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
                Deskripsi Surat {dataDetails?.nama_latin}{" "}
                <b className="font-serif">{dataDetails?.nama}</b>
              </h2>
              <div
                className="py-4"
                dangerouslySetInnerHTML={{ __html: dataDetails?.deskripsi }}
              ></div>
            </div>
          </div>
          {/* -- Modal Description Surah */}
        </div>

        <div className="mt-6 min-h-screen px-3 lg:px-0 mb-10">
          {activeTab === 0 && (
            <div className="p-4 bg-gray-50/50 dark:bg-gray-900 dark:border-gray-800 border border-slate-200 rounded-xl">
              {Loading == false ? (
                dataDetails?.ayat?.map((single) => (
                  <div
                    key={single.nomor + single.surah}
                    className="flex flex-wrap justify-end md:h-full md:items-center border-b dark:border-gray-800 border-slate-300 last:border-gray-50 pt-14 pb-5 md:py-9 relative"
                    id={"surahke" + single.nomor}
                  >
                    {/* Menu Control Start */}
                    <div className="text-xl flex justify-between md:block gap-1 px-3 top-2 w-full mb-3 md:w-fit md:mb-0 md:px-0 absolute left-0 border-b border-dashed border-slate-200 dark:border-gray-700 pb-2 md:border-0">
                      <div className="flex md:block w-full gap-2">
                        {/* Nomer & Surat */}
                        <div className={` w-auto border rounded-md text-sm px-1 lg:mt-3 nunito font-semibold ${
                              isFriday ? " border-yellow-800 dark:border-yellow-600" : " md:border-slate-200 dark:border-gray-400 "
                            }`}>
                          {single.surah} {" : "}
                          {single.nomor}
                        </div>
                        {/* Copy Surat */}
                        <div className="dropdown w-8 md:w-full dropdown-bottom md:mt-1">
                          <button
                            tabIndex={0}
                            className={`border border-slate-200 w-full dark:border-gray-400 rounded-md flex justify-center hover:bg-slate-100 dark:hover:bg-gray-700 `}
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
                            className="dropdown-content menu p-1 text-[15px] shadow-md border rounded-md w-[150px] bg-white dark:bg-slate-800/60 backdrop-blur-md dark:border-gray-700"
                          >
                            <li>
                              <CopyToClipboard
                                onCopy={() => {
                                  toast.success("Copy Ayat Berhasil");
                                }}
                                text={single.ar}
                              >
                                <span className="p-0 px-1">
                                  Copy Ayat Ke : {single.nomor}
                                </span>
                              </CopyToClipboard>
                            </li>
                            <li>
                              <CopyToClipboard
                                onCopy={() => {
                                  toast.success("Copy Terjemahan Berhasil");
                                }}
                                text={single.idn}
                              >
                                <span className="p-0 px-1">
                                  Copy Terjemahan
                                </span>
                              </CopyToClipboard>
                            </li>
                            <li>
                              <label
                                htmlFor={`tafsir-modal-${single.nomor}`}
                                id="btn-modal-4"
                                className="p-0 px-1 cursor-pointer"
                                onClick={(e) => e.stopPropagation()} // <-- penting
                              >
                                Tafsir Ayat ke : {single.nomor}
                              </label>
                            </li>
                          </ul>
                        </div>

                        {/* Put this part before </body> tag */}
                      </div>
                      {/* Bookmark */}
                      <button
                        onClick={() =>
                          saveAyat(
                            single.surah,
                            single.nomor,
                            dataDetails.nama_latin
                          )
                        }
                        className="md:border w-6 md:w-full rounded-md border-slate-200 dark:border-gray-400 flex justify-center items-center md:h-9 hover:bg-slate-100 dark:hover:bg-gray-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-bookmark"
                          viewBox="0 0 16 16"
                        >
                          {currentBookmark === single.nomor ? (
                            <path d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5m8.854-9.646a.5.5 0 0 0-.708-.708L7.5 7.793 6.354 6.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z" />
                          ) : (
                            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
                          )}
                        </svg>
                      </button>
                    </div>
                    {/* Menu Control End */}

                    <div
                      className="arab px-3 lg:pl-2 w-full md:w-[90%] lg:w-[94%]"
                      style={{ fontSize: font.arab + "px" }}
                    >
                      {single.ar}
                      {"  "}
                      <span className="relative inline-flex items-center justify-center min-w-7 px-1 h-7 text-[14px] font-arabic">
                        <span className="absolute inset-0 border border-slate-700 dark:border-gray-400 rounded-lg"></span>
                        <span className="absolute inset-1 border border-slate-700 dark:border-gray-400 rounded-lg"></span>
                        <span className={`relative z-10 text-[16px] ${isFriday ? "text-yellow-800 dark:text-yellow-200" :"text-green-800 dark:text-green-200"}`}>
                          {toArabicNumber(single.nomor)}
                        </span>
                      </span>
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
                  {(() => {
                    const items = [];
                    for (let i = 0; i < 5; i++) {
                      items.push(
                        <div className="border-b py-5 px-3" key={i}>
                          <div className="animate-pulse flex space-x-4">
                            <div className="flex-1 py-1">
                              <div className="flex justify-end mt-2">
                                <div className="h-12 w-full bg-slate-200 rounded-md"></div>
                              </div>
                              <div className="grid grid-cols-3 gap-2 mt-9">
                                <div className="h-3 bg-slate-200 rounded col-span-2"></div>
                                <div className="h-3 bg-slate-200 rounded col-span-3"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return items;
                  })()}
                </>
              )}
            </div>
          )}
          {activeTab === 1 && (
            <div className="p-4 bg-gray-50/50 dark:bg-gray-900 dark:border-gray-800 border border-slate-200 rounded-xl relative">
              <div
                className="arab px-3 lg:px-4 w-full leading-loose"
                style={{
                  fontSize: font.arab + "px",
                  textAlign: "justify",
                  direction: "rtl",
                }}
              >
                {dataDetails?.ayat?.map((single) => (
                  <span
                    key={single.nomor + single.surah}
                    className="relative cursor-pointer hover:bg-slate-100 dark:hover:bg-gray-800 border border-gray-50/50 dark:border-gray-900 dark:hover:border-slate-800 pr-2 hover:border-slate-200 rounded-md"
                    onClick={() =>
                      setActiveMenu(
                        activeMenu === single.nomor ? null : single.nomor
                      )
                    }
                  >
                    {/* Teks Ayat + Nomor */}
                    {single.ar}{" "}
                    <span className="relative inline-flex items-center justify-center min-w-7 px-1 h-7 text-[14px] font-arabic mx-1">
                      <span className="absolute inset-0 border border-slate-700 dark:border-slate-400 rounded-full"></span>
                      <span className="absolute inset-1 border border-slate-700 dark:border-slate-400 rounded-full"></span>
                      <span className={`relative z-10 text-[16px] ${isFriday ? "text-yellow-800 dark:text-yellow-200" :"text-green-800 dark:text-green-200"}`}>
                        {toArabicNumber(single.nomor)}
                      </span>
                    </span>
                    {/* Menu muncul saat ayat diklik */}
                    {activeMenu === single.nomor && (
                      <div className="absolute right-0 flex flex-row-reverse gap-2 top-[45px] bg-white dark:bg-slate-800 border rounded-md shadow-md text-sm w-max h-[40px] px-1 py-0.5 z-50">
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer rounded-md">
                          <CopyToClipboard
                            onCopy={() => copySurat("Ayat")}
                            text={single.ar}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-save-all-icon lucide-save-all"
                            >
                              <path d="M10 2v3a1 1 0 0 0 1 1h5" />
                              <path d="M18 18v-6a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6" />
                              <path d="M18 22H4a2 2 0 0 1-2-2V6" />
                              <path d="M8 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9.172a2 2 0 0 1 1.414.586l2.828 2.828A2 2 0 0 1 22 6.828V16a2 2 0 0 1-2.01 2z" />
                            </svg>
                          </CopyToClipboard>
                        </button>
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer rounded-md">
                          <CopyToClipboard
                            onCopy={() => copySurat("Terjemahan")}
                            text={single.idn}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-scan-text-icon lucide-scan-text"
                            >
                              <path d="M3 7V5a2 2 0 0 1 2-2h2" />
                              <path d="M17 3h2a2 2 0 0 1 2 2v2" />
                              <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                              <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
                              <path d="M7 8h8" />
                              <path d="M7 12h10" />
                              <path d="M7 16h6" />
                            </svg>
                          </CopyToClipboard>
                        </button>
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer rounded-md flex justify-center items-center">
                          <label
                            htmlFor={`tafsir-modal-${single.nomor}`}
                            id="btn-modal-4"
                            className="cursor-pointer"
                            onClick={(e) => e.stopPropagation()} // <-- penting
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              className="lucide lucide-messages-square-icon lucide-messages-square"
                            >
                              <path d="M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                              <path d="M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1" />
                            </svg>
                          </label>
                        </button>
                      </div>
                    )}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {dataDetails?.ayat?.map((single) => (
          <div key={single.nomor}>
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
                <h3 className="text-lg font-bold">
                  Tafsir {dataDetails.nama_latin} Ayat ke : {single.nomor}
                </h3>
                <p className="py-1 text-[16px] leading-[25px] text-justify">
                  {dataTafsir?.data?.tafsir[parseInt(single?.nomor)]?.teks}
                </p>
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-between w-max p-2 gap-2 border border-slate-200 shadow-md rounded-xl mb-3 fixed z-[99] bottom-0 left-1/2 -translate-x-1/2 backdrop-blur-md bg-white/85 dark:bg-gray-800/50 dark:border-gray-700">
          {(() => {
            if (dataDetails?.surat_sebelumnya !== false) {
              return (
                <Link
                  to={
                    "/surah/" +
                    numbertosurah[dataDetails?.surat_sebelumnya?.nomor]
                  }
                  className="flex gap-2 px-2 sm:py-2.5 sm:px-3 text-xs items-center font-semibold rounded-xl text-white bg-gradient-to-r hover:bg-gradient-to-t from-slate-900 to-slate-700 dark:from-slate-800 dark:to-slate-600 border-none focus:ring-2 ring-offset-2 ring-slate-900"
                >
                  <span className="hidden sm:block">
                    {dataDetails?.surat_sebelumnya?.nama_latin ?? "Memuat Data"}
                  </span>
                  <svg
                    className="w-5 h-5 text-white block sm:hidden"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m15 19-7-7 7-7"
                    />
                  </svg>
                </Link>
              );
              // eslint-disable-next-line eqeqeq
            } else if (dataDetails?.surat_sebelumnya == false) {
              return <div></div>;
            }
          })()}

          <div className="border border-slate-200 pl-3 pr-1 rounded-lg bg-white dark:bg-gray-800/50 dark:border-gray-700 flex gap-2 items-center">
            <div className="">
              <p className="text-sm text-center font-medium">
                {dataDetails?.nama_latin ?? "Memuat Data"}
              </p>
              <div className="text-xs text-center">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>
            <audio ref={audioRef} src={dataDetails?.audio} preload="metadata" />

            <button
              onClick={togglePlay}
              className="p-1 rounded-md bg-gradient-to-r hover:bg-gradient-to-t from-slate-800 to-slate-700 border-none hover:shadow-lg focus:ring-2 ring-offset-2 ring-slate-800"
            >
              {isPlaying ? (
                <svg
                  className="w-5 h-5 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H8Zm7 0a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1Z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.6 5.2A1 1 0 0 0 7 6v12a1 1 0 0 0 1.6.8l8-6a1 1 0 0 0 0-1.6l-8-6Z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </div>
          {(() => {
            if (dataDetails?.surat_selanjutnya !== false) {
              return (
                <Link
                  to={
                    "/surah/" +
                    numbertosurah[dataDetails?.surat_selanjutnya?.nomor]
                  }
                  className="flex gap-2 px-2 sm:py-2.5 sm:px-3 text-xs items-center font-semibold rounded-xl text-white bg-gradient-to-r hover:bg-gradient-to-t from-slate-900 to-slate-700 dark:from-slate-800 dark:to-slate-600 border-none focus:ring-2 ring-offset-2 ring-slate-900"
                >
                  <span className="hidden sm:block">
                    {dataDetails?.surat_selanjutnya?.nama_latin ??
                      "Memuat Data"}
                  </span>
                  <svg
                    className="w-5 h-5 text-white block sm:hidden"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m9 5 7 7-7 7"
                    />
                  </svg>
                </Link>
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
