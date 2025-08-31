import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import LinkProgresBars from "../../lib/LinkProgresBars";
import Adzan from "../../lib/Adzan";
import Attendance from "../../components/Attendance";
import { useEffect, useRef, useState } from "react";

const HomeView = ({
  showBT,
  querySearch,
  setQuerySearch,
  Loading,
  RekomendationSurah,
  lanjutBaca,
  removeBookmark,
  skeletonLoad,
  filteredData,
  numbertosurah,
  playingIndex,
  audioInfo,
  audioRefs,
  toggleAudio,
  handleTimeUpdate,
  handleLoadedMetadata,
  formatTime,
  loadingIndex,
  dataChangelog,
}) => {
  try {
    const iframeRef = useRef(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = () => {
        new window.YT.Player(iframeRef.current, {
          events: {
            onReady: () => setIsReady(true),
          },
        });
      };
    }, []);

    return (
      <div className="min-h-screen">
        {localStorage.removeItem("fromBookmark", false)}

        <Helmet>
          <meta charSet="utf-8" />
          <meta name="robots" content="index,follow" />
          <title>Al Quran Digital | Baca Al Quran Mudah Tanpa Install</title>
          <link rel="canonical" href="https://al-quran.pages.dev/" />
        </Helmet>

        {/* Start Sticky Search */}
        <div className="sticky top-0 z-[99] bg-white border-b">
          <div
            className={
              showBT
                ? "container mx-auto p-4  opacity-100 transition-opacity duration-500"
                : "h-0 opacity-0 transition-opacity duration-300"
            }
          >
            <input
              type="text"
              onChange={(e) => setQuerySearch(e.target.value.replace(" ", "-"))}
              value={querySearch.replace("-", " ")}
              placeholder="Surah Apa yang ingin Anda Baca?"
              className="input text-slate-600 border-slate-400 w-full focus:ring-4 focus:ring-blue-400 bg-white"
            />
          </div>
        </div>
        {/* End Sticky Search */}

        {showBT ? (
          <button
            className="fixed bottom-11 right-4 rounded-full z-10 bg-white border border-slate-500 border-dashed p-2 shadow-2xl hover:bg-slate-100 sca group"
            onClick={() => {
              document.body.scrollTop = 0;
              document.documentElement.scrollTop = 0;
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-arrow-up group-hover:scale-x-125"
              viewBox="0 0 15 14"
            >
              <path
                fillRule="evenodd"
                d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
              />
            </svg>
          </button>
        ) : null}

        <div className="container mx-auto xl:my-5">
          <div
            className="hero min-h-[200px] rounded-none xl:rounded-xl flex flex-wrap relative overflow-hidden mb-5"
            style={{
              backgroundImage: `url("https://images.unsplash.com/photo-1588194200910-af009d36fc75?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
            }}
          >
            <iframe
              ref={iframeRef}
              src="https://www.youtube.com/embed/BMX8xVs_GfY?controls=0&autoplay=1&mute=1&loop=1&playlist=BMX8xVs_GfY&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&enablejsapi=1"
              width="100%"
              height="100%"
              allow="autoplay; encrypted-media"
              title="YouTube Video"
              className={`absolute z-[1] scale-[250%] sm:scale-[180%] lg:scale-[170%] xl:scale-[250%] transition-opacity duration-700 ${
                isReady ? "opacity-100" : "opacity-0"
              }`}
              style={{ pointerEvents: "none" }}
            ></iframe>
            <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-[4] text-white">
              <Adzan />
            </div>
            <div className="absolute w-full h-full z-[2] bg-slate-700/50"></div>
            <div className=" py-10 px-4 xl:rounded-xl overflow-hidden text-white relative z-[3]">
              <div className="md:w-[70%] mx-auto">
                <div className="w-full">
                  <div className="flex gap-2">
                    <div className="mb-2 text-xs w-[60%] sm:w-max flex items-center px-2 py-1 gap-2 xl:rounded-md bg-white/70 text-slate-700 line-clamp-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="17"
                        fill="currentColor"
                        className="bi bi-plus-square-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0" />
                      </svg>
                      <Link to={"/changelog"} className="line-clamp-1">
                        {/* <span className="font-semibold">New in v1.8.1</span>{" "}
                        Update Fitur Audio Surah */}
                        <div className="">
                          {(dataChangelog?.commit?.author?.name || "fajriyan") +
                            " : "}
                          <span className="capitalize">
                            {dataChangelog?.commit?.message || "loading"}
                          </span>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <span className="text-5xl mb-3 lg:text-5xl sm:text-md font-bold">
                    Al Qur'an Digital
                  </span>
                  <h1 className="hidden">
                    Al Qur'an Digital | Baca Quran Praktis Tanpa Install
                    Aplikasi
                  </h1>

                  <p className="mb-5 mt-2">
                    Diriwayatkan dari Abu Umamah al-Bahili, Rasulullah SAW
                    bersabda, "Bacalah Al Quran, maka sesungguhnya ia akan
                    datang di hari kiamat memberi syafaat kepada pembacanya".
                  </p>
                </div>

                {/* Start Search */}
                <div className="relative">
                  <input
                    type="text"
                    onChange={(e) =>
                      setQuerySearch(e.target.value.replace(" ", "-"))
                    }
                    value={querySearch.replace("-", " ")}
                    placeholder="Surah Apa yang ingin Anda Baca?"
                    className="input text-slate-600 border-white w-full focus:ring-4 focus:ring-blue-400 bg-slate-100"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="#000000"
                    className="bi bi-search absolute top-4 right-4 md:right-6 hover:cursor-pointer"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                </div>

                {/* End Search  */}
                <span className="label-text-alt text-white px-2 py-1">
                  Hasil pencarian tentang :{" "}
                  {querySearch ? (
                    <b className="capitalize font-serif">{querySearch}</b>
                  ) : (
                    <b>Nama Surat</b>
                  )}
                </span>
                <div className="mt-2 flex flex-nowrap gap-2 overflow-x-scroll no-scrollbars">
                  {RekomendationSurah.map((rs) => (
                    <LinkProgresBars
                      key={rs.surah}
                      to={
                        rs.ex == "nosurah"
                          ? "/" + rs.url
                          : "/surah/" + numbertosurah[rs.url]
                      }
                      className="min-w-max md:min-w-0 px-2 md:px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-[13px] md:text-sm"
                    >
                      {rs.ex == "nosurah" ? "" : "Surah "}
                      {rs.surah}
                    </LinkProgresBars>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Start Main Content */}
        <section className="px-5 xl:px-0">
          <div className="container mx-auto flex flex-col md:flex-row gap-5 mb-5">
            <div className="w-full md:w-[50%] xl:w-[33%]">
              <Attendance />
            </div>

            <div className="w-full md:w-[50%] xl:w-[68%]">
              {/* Bookmark Start  */}
              {lanjutBaca[0].ayat ? (
                <div className="container mx-auto h-full">
                  <div
                    type="button"
                    onClick={() => localStorage.setItem("fromBookmark", true)}
                    className="card flex flex-row w-full bg-white dark:bg-slate-900 h-full
               shadow-sm hover:border-slate-600 border border-slate-300 overflow-hidden"
                  >
                    <Link
                      to={`/surah/${lanjutBaca[0].url}`}
                      className="flex justify-between w-full gap-0 !p-4"
                    >
                      <div className="flex items-center">
                        <div className="text-left">
                          <div className="card-title font-serif mt-1">
                            {lanjutBaca[0].surat}
                          </div>
                          <div>
                            Ayat ke : <span>{lanjutBaca[0].ayat}</span>{" "}
                          </div>
                        </div>
                      </div>
                    </Link>
                    <div className="flex">
                      <button
                        type="button"
                        onClick={() => removeBookmark()}
                        className="px-5 border bg-slate-200 group"
                      >
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
              ) : (
                <div className="border border-slate-200 dark:border-slate-400 shadow-sm border-dashed rounded-lg p-3 flex items-center gap-2 h-full">
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
                  <span>
                    Tidak ada <span className="font-semibold"> Bookmark</span>{" "}
                    yang Tersimpan
                  </span>
                </div>
              )}
              {/* Bookmark End  */}
            </div>
          </div>

          <div
            className={`container mx-auto grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 lg:gap-4 sm:gap-4 gap-4 mb-14`}
          >
            {Loading ? (
              filteredData.length === 0 ? (
                <div className="p-4 col-span-3 border border-dashed border-slate-400 dark:border-slate-500 w-full text-md md:flex gap-1 items-center rounded-md h-min">
                  Maaf, Surah{" "}
                  <span className="font-semibold underline">{querySearch}</span>{" "}
                  tidak ditemukan, silahkan periksa kembali pencarian anda.{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="13"
                    fill="currentColor"
                    className="bi bi-info-circle-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
                  </svg>
                </div>
              ) : (
                filteredData.map((s, index) => (
                  <div
                    className="card relative w-full shadow-sm border-dashed border-[1px] border-slate-300 dark:border-slate-500 hover:border-slate-800 dark:hover:border-slate-100 bg-white bg-gradient-to-bl dark:from-slate-800 dark:to-gray-900  "
                    key={s.nama_latin + "-" + s.arti}
                  >
                    <div className="absolute right-3 top-0 border-l border-b border-r border-dashed rounded-b-lg border-slate-400 px-2 pb-1 flex gap-2 font-serif z-[2]">
                      {s?.nomor}
                    </div>

                    {/* Component Audio +++ */}
                    <div
                      key={index}
                      className="absolute bottom-6 right-3 flex gap-2 items-center border border-slate-500 pl-2 rounded-lg overflow-hidden z-[2]"
                    >
                      <audio
                        ref={(el) => (audioRefs.current[index] = el)} // Dynamically assigning ref
                        src={s.audio} // Assuming each item has an audioUrl
                        onTimeUpdate={() => handleTimeUpdate(index)}
                        onLoadedMetadata={() => handleLoadedMetadata(index)}
                        preload="none"
                        className="hidden"
                      ></audio>

                      <div className="text-xs">
                        {audioInfo[index]?.currentTime
                          ? formatTime(audioInfo[index]?.currentTime) +
                            " / " +
                            formatTime(audioInfo[index]?.duration)
                          : s.nama_latin}
                      </div>
                      {/* <button
                        onClick={() => toggleAudio(index)}
                        className="px-2 py-2 rounded-l-md bg-gradient-to-r hover:bg-gradient-to-t from-slate-800 to-slate-700 border-none hover:shadow-lg focus:ring-2 ring-offset-2 ring-slate-800"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          className="fill-white"
                          viewBox="0 0 16 16"
                        >
                          {playingIndex === index ? (
                            <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5" />
                          ) : (
                            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
                          )}
                        </svg>
                      </button> */}
                      <button
                        onClick={() => toggleAudio(index)}
                        className="px-2 py-2 rounded-l-md bg-gradient-to-r hover:bg-gradient-to-t from-slate-800 to-slate-700 border-none hover:shadow-lg focus:ring-2 ring-offset-2 ring-slate-800"
                      >
                        {loadingIndex === index ? (
                          // Icon Loading (spinner)
                          <svg
                            className="animate-spin h-4 w-4 text-white"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            />
                          </svg>
                        ) : playingIndex === index ? (
                          // Pause icon
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            className="fill-white"
                            viewBox="0 0 16 16"
                          >
                            <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5" />
                          </svg>
                        ) : (
                          // Play icon
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            className="fill-white"
                            viewBox="0 0 16 16"
                          >
                            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
                          </svg>
                        )}
                      </button>
                    </div>
                    {/* Component Audio --- */}

                    <div className="p-5 md:p-6 relative overflow-hidden">
                      <img
                        src="/kaligrafi.webp"
                        className="absolute w-[20%] -top-[60px] sm:-top-[60px] right-[50px] z-0 opacity-10"
                        alt="kaligrafi"
                        width="auto"
                        height="auto"
                        title="kaligrafi"
                        loading="lazy"
                      />
                      <img
                        src="/kaligrafi.webp"
                        className="absolute w-[20%] bottom-[30%] -left-[93px] z-0 opacity-10"
                        alt="kaligrafi"
                        width="auto"
                        height="auto"
                        title="kaligrafi"
                        loading="lazy"
                      />
                      <h2
                        className="card-title mb-0 font-serif relative z-[2]"
                        key={s.nama_latin}
                      >
                        {s.nama_latin.replace("-", " ")}{" "}
                        <span className="arab-0">({s.nama})</span>
                      </h2>
                      <p className="text-left text-[15px] poppins relative z-[2]">
                        {s.arti} | {s.jumlah_ayat} Ayat
                      </p>

                      <p className="flex items-center gap-2 capitalize text-[15px] poppins">
                        {" "}
                        {s.tempat_turun == "mekah" ? (
                          <>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 36 36"
                              aria-hidden="true"
                              role="img"
                              className="iconify iconify--twemoji"
                              preserveAspectRatio="xMidYMid meet"
                            >
                              <path
                                d="M18 0L0 5v29l18 2l18-2V5z"
                                fill="#000000"
                              />
                              <path fill="#292F33" d="M18 36l18-2V5L18 0z" />
                              <path
                                fill="#FFD983"
                                d="M22.454 14.507v3.407l4.229.612V15.22zm7 1.181v3.239l3.299.478v-3.161zM18 13.756v3.513l1.683.244V14.04zm18 3.036l-.539-.091v3.096l.539.078z"
                              />
                              <path
                                fill="#FFAC33"
                                d="M0 16.792v3.083l.539-.078v-3.096zm16.317-2.752v3.473L18 17.269v-3.513zm-13.07 2.204v3.161l3.299-.478v-3.239zm6.07-1.024v3.306l4.229-.612v-3.407z"
                              />
                              <path
                                fill="#FFD983"
                                d="M21.389 15.131v-.042c0-.421-.143-.763-.32-.763c-.177 0-.32.342-.32.763v.042c-.208.217-.355.621-.355 1.103c0 .513.162.949.393 1.152c.064.195.163.33.282.33s.218-.135.282-.33c.231-.203.393-.639.393-1.152c-.001-.482-.147-.886-.355-1.103zm6.999 1.069v-.042c0-.421-.143-.763-.32-.763c-.177 0-.32.342-.32.763v.042c-.208.217-.355.621-.355 1.103c0 .513.162.949.393 1.152c.064.195.163.33.282.33s.218-.135.282-.33c.231-.203.393-.639.393-1.152c0-.481-.147-.885-.355-1.103zm6.017 1.03v-.039c0-.393-.134-.712-.299-.712c-.165 0-.299.319-.299.712v.039c-.194.203-.331.58-.331 1.03c0 .479.151.886.367 1.076c.059.182.152.308.263.308s.203-.126.263-.308c.215-.189.367-.597.367-1.076c0-.45-.136-.827-.331-1.03z"
                              />
                              <path
                                fill="#FFAC33"
                                d="M14.611 15.131v-.042c0-.421.143-.763.32-.763s.32.342.32.763v.042c.208.217.355.621.355 1.103c0 .513-.162.949-.393 1.152c-.064.195-.163.33-.282.33s-.218-.135-.282-.33c-.231-.203-.393-.639-.393-1.152c.001-.482.147-.886.355-1.103zM7.612 16.2v-.042c0-.421.143-.763.32-.763s.32.342.32.763v.042c.208.217.355.621.355 1.103c0 .513-.162.949-.393 1.152c-.064.195-.163.33-.282.33s-.218-.135-.282-.33c-.231-.203-.393-.639-.393-1.152c0-.481.147-.885.355-1.103zm-6.017 1.03v-.039c0-.393.134-.712.299-.712s.299.319.299.712v.039c.194.203.331.58.331 1.03c0 .479-.151.886-.367 1.076c-.059.182-.152.308-.263.308s-.204-.127-.264-.308c-.215-.189-.367-.597-.367-1.076c.001-.45.137-.827.332-1.03zM0 11.146v3.5l18-3.268V7.614z"
                              />
                              <path
                                fill="#FFD983"
                                d="M18 7.614v3.764l18 3.268v-3.5z"
                              />
                            </svg>
                            {s.tempat_turun}
                          </>
                        ) : (
                          <>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 128 128"
                              aria-hidden="true"
                              role="img"
                              className="iconify iconify--noto"
                              preserveAspectRatio="xMidYMid meet"
                            >
                              <path
                                fill="#eebf72"
                                d="M10.43 124.25l.15-44.32l1.71-1.34h102.89l2.1.96l-.08 44.7z"
                              />
                              <path
                                d="M10.72 75.91c-.42.14-.16 4.45-.16 4.45l106.75-.21s.73-4.21.17-4.77c-.56-.55-106.76.53-106.76.53z"
                                fill="#cf701d"
                              />
                              <path
                                d="M94.66 21.59l.06 13.12l-4.95.05s-.07 5.72.1 5.78c.37.12 11.56 2.65 11.56 2.65l14.25-2.52l.17-5.62l-5.03-.05l.11-14.19l-11.3-.79l-4.97 1.57z"
                                fill="#fbdaa6"
                              />
                              <path
                                fill="#fbdaa6"
                                d="M93.84 45.2l-.14 78.98h17.03l.86-79.98z"
                              />
                              <path
                                d="M42.52 66.3s-1.63 3.14-1.63 3.37c0 .23.35 54.7.35 54.7h45.39s1.16-54.46.81-54.93c-.35-.46-44.92-3.14-44.92-3.14z"
                                fill="#fbdaa6"
                              />
                              <path
                                d="M17.23 21.36l-.03 13.46l-4.88-.01s-.23 5.62.12 5.93c.52.46 14.94 2.69 14.94 2.69s10.57-2.14 10.81-2.71c.15-.36.19-5.54.19-5.54l-5.2-.05l.08-14.33l-9.66-.89l-6.37 1.45z"
                                fill="#fbdaa6"
                              />
                              <path
                                fill="#fbdaa6"
                                d="M16.67 45.76l.6 78.49h16.98l-.05-79.16z"
                              />
                              <path
                                fill="#eebf72"
                                d="M12.41 40.71H38.2l-4 5.49l-17.53.11z"
                              />
                              <path
                                fill="#eebf72"
                                d="M16.82 67.46l17.31-.13l.07 5.62l-17.32.06z"
                              />
                              <path
                                fill="#eebf72"
                                d="M23.24 118.77h4.91V82.91l-2.19-2.9l-2.39 2.84z"
                              />
                              <path
                                fill="#eebf72"
                                d="M100.02 119.78l4.59-.06l.25-37.08l-2.39-3.23l-2.32 3.23z"
                              />
                              <path
                                fill="#eebf72"
                                d="M93.95 66.1l-.07 5.75h17.25l.07-5.81z"
                              />
                              <path
                                fill="#eebf72"
                                d="M93.82 46.46l17.76-.06l4.1-5.73l-25.87-.15z"
                              />
                              <path
                                fill="#cf701d"
                                d="M40.97 85.06l-.06-5.45l46.53-.09l-.07 5.58z"
                              />
                              <path
                                fill="#b7885a"
                                d="M97.79 24.07l3.79.01l-.03 10.02l-3.79.03z"
                              />
                              <path
                                fill="#b7885a"
                                d="M104.38 24.1H108l-.03 10.03l-3.65.03z"
                              />
                              <path
                                fill="#b7885a"
                                d="M20.04 24.06h3.68l-.03 10.02l-3.68.04z"
                              />
                              <path
                                fill="#b7885a"
                                d="M26.62 24.09h3.63l-.03 10.03l-3.66.03z"
                              />
                              <path
                                d="M47.79 70.38c-4.96 0-4.55 5.77-4.55 5.77l8.82-.06c-.01 0 .45-5.71-4.27-5.71z"
                                fill="#b7885a"
                              />
                              <path
                                d="M54.13 76.15s-.52-5.65 4.55-5.77c4.73-.11 4.27 5.71 4.27 5.71l-8.82.06z"
                                fill="#b7885a"
                              />
                              <path
                                d="M85.73 75.91s.98-5.59-4.44-5.7c-5.2-.11-4.6 5.76-4.6 5.76l9.04-.06z"
                                fill="#b7885a"
                              />
                              <path
                                d="M74.37 75.97s.98-5.82-4.44-5.7c-5.14.12-4.6 5.76-4.6 5.76l9.04-.06z"
                                fill="#b7885a"
                              />
                              <path
                                d="M79.05 124.37l.13-14.7l2.52-3.08s-2.63-1.2-2.64-4.15c-.02-3.98 4.1-6.61 4.1-6.61s4 2.35 3.93 6.75c-.04 2.6-2.65 4.06-2.65 4.06l2.49 3.2s-.22 14.49-.3 14.55c-.09.05-7.58-.02-7.58-.02z"
                                fill="#b7885a"
                              />
                              <path
                                d="M41.07 124.37c-.1-.03.05-14.93.05-14.93l2.6-2.79s-2.5-1.7-2.58-4.01c-.2-5.4 3.99-6.82 3.99-6.82s4.18 2.3 3.83 6.75c-.21 2.72-2.55 4.05-2.55 4.05l2.52 3l-.13 14.78s-7.63 0-7.73-.03z"
                                fill="#b7885a"
                              />
                              <path
                                d="M64.32 88.06s-11.29 3.52-10.84 12.74c.2 4.04 3.13 5.81 3.13 5.81l-2.9 3.05l-.11 14.7l20.73.02l.06-14.76l-2.79-2.96s2.79-1.73 2.91-6.15c.21-8.76-10.19-12.45-10.19-12.45z"
                                fill="#966737"
                              />
                              <path
                                d="M40.89 69.68l46.55-.23s2.48-2.96 2-10.18c-.45-6.73-4.79-10.84-4.79-10.84l-28.64.49l-13-.11s-3.61 3.97-3.93 10.66c-.27 5.96 1.81 10.21 1.81 10.21z"
                                fill="#ffa828"
                              />
                              <path
                                d="M64.11 34.26s-8.47 3.1-15.1 8.49c-5.04 4.11-6.46 6.67-6.46 6.67s-1.73 17.83 21.61 18.29c20.63.41 20.51-19.28 20.51-19.28s-4.23-5.03-8.71-7.78c-5.95-3.64-11.85-6.39-11.85-6.39z"
                                fill="#fcc11a"
                              />
                              <path
                                d="M67.26 33.53c0-1.73-1.4-3.13-3.12-3.13c-1.72 0-3.17 1.07-3.28 2.79c-.15 2.18 1.21 3.55 3.21 3.54c1.72.01 3.19-1.47 3.19-3.2z"
                                fill="#ffa828"
                              />
                              <path
                                d="M54.43 15.99l-2.38 3.36s-.74 12.86 12.25 12.86c11.72 0 12.57-11.27 11.78-11.78c-.39-.26-5.49 5.84-5.72 5.9c-.23.06-9.18-.63-9.41-.92c-.22-.3-6.52-9.42-6.52-9.42z"
                                fill="#ffa828"
                              />
                              <path
                                d="M64.19 12.65c-.37.32.9 4.12.9 4.12s-1.99 2.97-1.7 3.44s3.23.23 3.23.23s2.37 2.42 3 2.31c.63-.12 1.33-3.17 1.33-3.17s3.41-.92 3.46-1.5c.06-.58-2.99-2.64-2.99-2.64s.22-3.42-.07-3.65c-.29-.24-3.35 1.72-3.35 1.72s-3.35-1.27-3.81-.86z"
                                fill="#fcc11a"
                              />
                              <path
                                d="M67.19 8.66c.04.46-6.06 1.56-7.16 6.93c-1.12 5.49 1.96 9.18 7.68 9.52c5.71.35 6.75-5.48 8.37-4.73c.54.25-1.67 9.18-11.72 8.95c-8.9-.2-12.2-6.74-12.29-9.35c-.23-6.35 3.58-10.22 7.45-11.66c3.51-1.31 7.55-1.04 7.67.34z"
                                fill="#fcc11a"
                              />
                              <path
                                d="M94.38 21.82c.41.25 16.54.25 16.78.06c.24-.19.49-2.67.52-3.75c.1-3.39-.74-4.95-.74-4.95s-15.83-.33-16.21.06c-.39.39-.76 2.17-.81 4.45c-.04 2.5.22 3.98.46 4.13z"
                                fill="#ffa828"
                              />
                              <path
                                d="M17.09 21.47c.32.27 16.16.25 16.31.06c.15-.19.72-2.63.66-4.23c-.08-2.23-.49-3.08-.79-3.66c-.62-1.21-15.36-1.62-15.8-.79s-1.03 2.59-1.05 4.7c-.02 1.62.33 3.63.67 3.92z"
                                fill="#ffa828"
                              />
                              <path
                                d="M27.95 4.12c0 1.45-1.35 2.81-2.81 2.81s-2.62-1.32-2.62-2.76s1.26-2.81 2.72-2.81c1.46 0 2.71 1.31 2.71 2.76z"
                                fill="#fcc11a"
                              />
                              <path
                                d="M105.6 4.11c0 1.46-1.19 2.6-2.68 2.6s-2.66-1.18-2.66-2.64s1.18-2.64 2.66-2.64s2.68 1.22 2.68 2.68z"
                                fill="#fcc11a"
                              />
                              <path
                                d="M94.47 13.69s1.04 4.73 8.06 4.98c7.56.27 8.48-5.39 8.48-5.39s-1.09-2.23-2.73-4.02c-1.74-1.91-4.4-3.67-5.43-3.67c-.95 0-3.69 1.5-5.49 3.48c-1.98 2.17-2.89 4.4-2.89 4.62z"
                                fill="#fcc11a"
                              />
                              <path
                                d="M25.23 5.36c-.45 0-3.67 2.27-4.99 3.75c-1.92 2.17-2.77 3.73-2.77 3.73s.51 5.63 7.53 5.78c7.55.16 8.28-4.97 8.28-4.97s-1.24-2.39-3.23-4.56c-2.1-2.29-4.82-3.73-4.82-3.73z"
                                fill="#fcc11a"
                              />
                            </svg>
                            {s.tempat_turun}
                          </>
                        )}
                      </p>

                      <div className="card-actions justify-start mt-5 relative z-[2]">
                        <LinkProgresBars
                          to={"/surah/" + numbertosurah[s.nomor]}
                          className="btn btn-sm bg-gradient-to-r hover:bg-gradient-to-t from-slate-800 to-slate-700 border-none hover:shadow-lg focus:ring-2 ring-offset-2 ring-slate-800 text-slate-200"
                        >
                          Baca Surah {s.nama_latin.replace("-", " ")}
                        </LinkProgresBars>
                      </div>
                    </div>
                  </div>
                ))
              )
            ) : (
              skeletonLoad.map((L) => (
                <div
                  className="card w-full shadow-sm border-dashed border-[1px] border-slate-300 dark:border-slate-500 hover:border-slate-800 dark:hover:border-slate-100 bg-white bg-gradient-to-bl dark:from-slate-800 dark:to-gray-900  "
                  key={Math.random()}
                >
                  <div className="p-5 md:p-6 flex flex-col gap-2 animate-pulse text-black/0">
                    <p className="mb-0 w-72 bg-slate-400 rounded-md">...</p>
                    <p className="text-left font-serif  w-52 bg-slate-400 rounded-md">
                      ...
                    </p>
                    <p className="w-28 bg-slate-400 rounded-md">...</p>

                    <div className="card-actions justify-start ">
                      <button className="w-52 btn btn-sm bg-gradient-to-r hover:bg-gradient-to-t from-slate-800 to-slate-700 border-none hover:shadow-lg focus:ring-2 ring-offset-2 ring-slate-800 text-slate-200"></button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
        {/* End Main Content */}

        <Footer />
      </div>
    );
  } catch (error) {
    console.log("Home View Error = " + error);
  }
};

export default HomeView;
