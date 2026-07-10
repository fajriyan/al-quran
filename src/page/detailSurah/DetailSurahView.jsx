import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import CopyToClipboard from "react-copy-to-clipboard";
import { useEffect, useMemo, useState, useRef, memo } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import html2canvas from "html2canvas";

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
  isFriday,
  toArabicNumber,
  togglePlay,
  formatTime,
  audioRef,
  activeTab,
  currentTime,
  duration,
  isPlaying,
  setActiveTab,
  activeMenu,
}) => {
  const [sideMenu, setSideMenu] = useState(false);
  const [shareState, setShareState] = useState({
    open: false,
    loading: false,
    ayat: null,
    imageUrl: "",
  });
  const shareCardRef = useRef(null);

  const shareAyat = useMemo(
    () => dataDetails?.ayat?.find((item) => item.nomor === shareState.ayat),
    [dataDetails?.ayat, shareState.ayat],
  );

  const openShareCard = async (single) => {
    setShareState((prev) => ({ ...prev, open: true, loading: true, ayat: single.nomor, imageUrl: "" }));

    requestAnimationFrame(() => {
      requestAnimationFrame(async () => {
        try {
          const node = shareCardRef.current;
          if (!node) {
            throw new Error("Card element not found");
          }

          const canvas = await html2canvas(node, {
            backgroundColor: null,
            scale: 2,
            useCORS: true,
          });

          const imageUrl = canvas.toDataURL("image/png");
          setShareState((prev) => ({ ...prev, loading: false, imageUrl }));
        } catch (error) {
          console.error(error);
          toast.error("Gagal membuat share card");
          setShareState((prev) => ({ ...prev, loading: false }));
        }
      });
    });
  };

  const downloadShareCard = async () => {
    if (!shareState.imageUrl) return;

    const link = document.createElement("a");
    link.href = shareState.imageUrl;
    link.download = `${dataDetails?.nama_latin || "ayat"}-${shareState.ayat}.png`;
    link.click();
    toast.success("Share card berhasil diunduh");
  };

  const handleNativeShare = async () => {
    if (!shareState.imageUrl) return;

    try {
      const response = await fetch(shareState.imageUrl);
      const blob = await response.blob();
      const file = new File(
        [blob],
        `${dataDetails?.nama_latin || "ayat"}-${shareState.ayat}.png`,
        {
          type: "image/png",
        },
      );

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: `${dataDetails?.nama_latin || "Al Quran Digital"}`,
          text: `Ayat ${shareState.ayat} dari ${dataDetails?.nama_latin}`,
          files: [file],
        });
        toast.success("Share card berhasil dibagikan");
        return;
      }

      throw new Error("Native share is not supported");
    } catch (error) {
      console.error(error);
      toast.error("Perangkat ini belum mendukung share file langsung");
    }
  };

  const closeShareModal = () => {
    setShareState({
      open: false,
      loading: false,
      ayat: null,
      imageUrl: "",
    });
  };

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
        <div
          className={`fixed bg-white border border-slate-400 z-[9999] top-[35%] p-3 rounded-l-xl w-[170px] duration-500 ${sideMenu ? "right-0" : "-right-[170px]"}`}
        >
          <button
            onClick={() => setSideMenu(!sideMenu)}
            className="absolute -left-[33px] top-[35%] z-10 bg-white border border-slate-400 p-0.5 rounded-l-full hover:bg-gray-100"
          >
            <svg
              className={`w-8 h-8 text-gray-800 dark:text-white duration-500 ${sideMenu ? "rotate-180" : ""}`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M13.729 5.575c1.304-1.074 3.27-.146 3.27 1.544v9.762c0 1.69-1.966 2.618-3.27 1.544l-5.927-4.881a2 2 0 0 1 0-3.088l5.927-4.88Z"
                clipRule="evenodd"
              />
            </svg>
          </button>

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
          <div className="relative max-w-xs mt-2">
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
            className="btn btn-outline w-full mt-2 border-slate-700 dark:border-slate-700 btn-sm text-slate-800 dark:text-slate-300 bg-white dark:bg-slate-800"
          >
            Deskripsi
          </label>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => setActiveTab(0)}
              className={`flex-1 rounded-xl border font-medium transition-colors flex justify-center ${
                activeTab === 0
                  ? "bg-slate-900 text-white dark:bg-slate-600 border-slate-900 dark:border-slate-600"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-700"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30px"
                height="30px"
                viewBox="0 0 16 16"
              >
                <title xmlns="">alphabet</title>
                <path
                  fill="currentColor"
                  d="M2.204 11.078c.767 0 1.201-.356 1.406-.737h.059V11h1.216V7.519c0-1.314-.947-1.783-2.11-1.783C1.355 5.736.75 6.42.69 7.27h1.216c.064-.323.313-.552.84-.552s.864.249.864.771v.464H2.346C1.145 7.953.5 8.568.5 9.496c0 .977.693 1.582 1.704 1.582m.42-.947c-.44 0-.845-.235-.845-.718c0-.395.269-.684.84-.684h.991v.538c0 .503-.444.864-.986.864m5.593.937c1.216 0 1.948-.869 1.948-2.31v-.702c0-1.44-.727-2.305-1.929-2.305c-.742 0-1.328.347-1.499.889h-.063V3.983h-1.29V11h1.27v-.791h.064c.21.532.776.86 1.499.86Zm-.43-1.025c-.66 0-1.113-.518-1.113-1.28V8.12c0-.825.42-1.343 1.098-1.343c.684 0 1.075.518 1.075 1.416v.45c0 .888-.386 1.401-1.06 1.401Zm2.834-1.328c0 1.47.87 2.378 2.305 2.378c1.416 0 2.139-.777 2.158-1.763h-1.186c-.06.425-.313.732-.933.732c-.66 0-1.05-.512-1.05-1.352v-.625c0-.81.371-1.328 1.045-1.328c.635 0 .879.425.918.776h1.187c-.02-.986-.787-1.806-2.14-1.806c-1.41 0-2.304.918-2.304 2.338z"
                />
              </svg>
            </button>

            <button
              onClick={() => setActiveTab(1)}
              className={`flex-1 rounded-xl border font-medium transition-colors flex justify-center ${
                activeTab === 1
                  ? "bg-slate-900 text-white dark:bg-slate-600 border-slate-900 dark:border-slate-600"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-700"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30px"
                height="30px"
                viewBox="0 0 20 20"
              >
                <title xmlns="">italic-arab-teh</title>
                <path
                  fill="currentColor"
                  d="m8.5 16l.37-2.28c1.34 0 2.5-.04 3.5-.12c.99-.07 1.8-.2 2.45-.34a3.54 3.54 0 0 0 1.43-.62c.33-.27.49-.6.49-.99c0-.48-.09-1.04-.25-1.68a18 18 0 0 0-.62-2.01l2.12-.66a19 19 0 0 1 .85 2.9c.1.49.16.95.16 1.37a3.8 3.8 0 0 1-.52 2.03a3.8 3.8 0 0 1-1.74 1.37c-.8.35-1.88.61-3.25.78S10.55 16 8.5 16m0 0c-1.3 0-2.57-.1-3.5-.29a6.9 6.9 0 0 1-2.26-.81c-.6-.36-1.03-.8-1.32-1.32A3.64 3.64 0 0 1 1 11.8a10.8 10.8 0 0 1 .35-2.3l.29-1.06l2.05.5l-.18.74a18 18 0 0 0-.17.77a5 5 0 0 0-.06.72c0 .54.17 1 .5 1.39q.525.585 1.74.87c.82.2 1.92.29 3.33.29l.39 1.66zm3.06-8.58a1.2 1.2 0 0 1-.86-.35a1.2 1.2 0 0 1-.34-.85a1.2 1.2 0 0 1 .34-.85c.24-.25.52-.37.86-.37c.32 0 .6.12.83.37a1.2 1.2 0 0 1 .34.85a1.2 1.2 0 0 1-.34.85a1.13 1.13 0 0 1-.84.35ZM8.47 7.4a1.22 1.22 0 0 1-.87-.35a1.14 1.14 0 0 1-.35-.83a1.2 1.2 0 0 1 .35-.85c.23-.25.52-.37.87-.37c.32 0 .6.12.83.37a1.2 1.2 0 0 1 .35.85c0 .32-.12.6-.35.83s-.5.35-.83.35"
                />
              </svg>
            </button>
          </div>

          <input type="checkbox" id="my-modal-3" className="modal-toggle" />
          <div className="modal md:items-start md:pt-10 px-3 mt-10">
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

        <div className="mt-4 min-h-screen px-3 lg:px-0 mb-10">
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
                        <div
                          className={` w-auto border rounded-md text-sm px-1 lg:mt-3 nunito font-semibold ${
                            isFriday
                              ? " border-yellow-800 dark:border-yellow-600"
                              : " md:border-slate-200 dark:border-gray-400 "
                          }`}
                        >
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
                              <button
                                className="p-0 px-1 text-left w-full"
                                onClick={() => openShareCard(single)}
                              >
                                Share Card Ayat
                              </button>
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
                            dataDetails.nama_latin,
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
                      className="arab sm:px-3 lg:pl-2 w-full md:w-[90%] lg:w-[94%]"
                      style={{ fontSize: font.arab + "px" }}
                    >
                      {single.ar}
                      {"  "}
                      <span className="relative inline-flex items-center justify-center min-w-7 px-1 h-7 text-[14px] font-arabic">
                        <span className="absolute inset-0 border border-slate-700 dark:border-gray-400 rounded-lg"></span>
                        <span className="absolute inset-1 border border-slate-700 dark:border-gray-400 rounded-lg"></span>
                        <span
                          className={`relative z-10 text-[16px] ${
                            isFriday
                              ? "text-yellow-800 dark:text-yellow-200"
                              : "text-green-800 dark:text-green-200"
                          }`}
                        >
                          {toArabicNumber(single.nomor)}
                        </span>
                      </span>
                    </div>

                    <p
                      className="w-full sm:px-3 text-left mt-2 text-[15px] lg:w-[94%] lg:mt-7 nunito lg:pr-2"
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
                        </div>,
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
                        activeMenu === single.nomor ? null : single.nomor,
                      )
                    }
                  >
                    {/* Teks Ayat + Nomor */}
                    {single.ar}{" "}
                    <span className="relative inline-flex items-center justify-center min-w-7 px-1 h-7 text-[14px] font-arabic mx-1">
                      <span className="absolute inset-0 border border-slate-700 dark:border-slate-400 rounded-full"></span>
                      <span className="absolute inset-1 border border-slate-700 dark:border-slate-400 rounded-full"></span>
                      <span
                        className={`relative z-10 text-[16px] ${
                          isFriday
                            ? "text-yellow-800 dark:text-yellow-200"
                            : "text-green-800 dark:text-green-200"
                        }`}
                      >
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

        <div className="fixed -left-[9999px] top-0 pointer-events-none opacity-0">
          <div
            ref={shareCardRef}
            className="w-[1080px] min-h-[1350px] bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white p-16 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl tracking-[0.35em] uppercase text-emerald-200/80">
                    Al Quran Digital
                  </p>
                  <h2 className="mt-4 text-5xl font-bold">
                    {dataDetails?.nama_latin || "Surah"}
                  </h2>
                  <p className="mt-2 text-xl text-slate-200">
                    Ayat {shareState.ayat || "-"}{" "}
                    {dataDetails?.arti ? `- ${dataDetails.arti}` : ""}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm uppercase tracking-[0.4em] text-emerald-200/80">
                    Share Card
                  </p>
                  <p className="mt-3 text-4xl font-arabic">
                    {shareAyat ? toArabicNumber(shareAyat.nomor) : ""}
                  </p>
                </div>
              </div>

              <div className="mt-16 rounded-[2rem] border border-white/10 bg-white/8 backdrop-blur-md p-12 shadow-2xl">
                <p className="text-right text-[54px] leading-[2.2] font-arabic text-white">
                  {shareAyat?.ar || " "}
                </p>
                <div className="mt-10 border-t border-white/10 pt-8">
                  <p className="text-2xl leading-[1.8] text-slate-100">
                    {shareAyat?.idn || "Pilih ayat untuk membuat share card."}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-end justify-between gap-8">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-emerald-200/70">
                  Dibagikan dari
                </p>
                <p className="mt-3 text-2xl font-semibold">
                  {window.location.origin}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-300">Bismillah</p>
                <p className="text-lg text-emerald-200">
                  {dataDetails?.tempat_turun || ""}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={`modal ${shareState.open ? "modal-open" : ""}`}>
          <div className="modal-box w-full max-w-5xl bg-white dark:bg-slate-900">
            <button
              type="button"
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={closeShareModal}
            >
              ✕
            </button>

            <h3 className="text-lg font-bold">
              Share Card Ayat {shareState.ayat || "-"}
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              {dataDetails?.nama_latin}
            </p>

            <div className="mt-4 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-950">
              {shareState.loading ? (
                <div className="h-[420px] flex items-center justify-center text-white">
                  Sedang menyiapkan kartu...
                </div>
              ) : shareState.imageUrl ? (
                <img
                  src={shareState.imageUrl}
                  alt="Share card ayat"
                  className="w-full h-auto"
                />
              ) : (
                <div className="h-[420px] flex items-center justify-center text-white">
                  Klik share pada menu ayat untuk membuat kartu.
                </div>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-2 justify-end">
              <button
                type="button"
                className="btn btn-outline"
                onClick={downloadShareCard}
                disabled={!shareState.imageUrl}
              >
                Download PNG
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleNativeShare}
                disabled={!shareState.imageUrl}
              >
                Share
              </button>
            </div>
          </div>
        </div>

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
    </>
  );
};

export default memo(DetailSurahView);
