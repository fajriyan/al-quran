import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import LinkProgresBars from "../../lib/LinkProgresBars";
import Adzan from "../../components/Adzan";
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
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "#ffffff",
            backgroundImage: `
        radial-gradient(
          circle at top right,
          rgba(70, 130, 180, 0.2),
          transparent 30%
        )
      `,
            filter: "blur(80px)",
            backgroundRepeat: "no-repeat",
          }}
        />
        {localStorage.removeItem("fromBookmark", false)}

        <Helmet>
          <meta charSet="utf-8" />
          <meta name="robots" content="index,follow" />
          <title>Al Quran Digital | Baca Al Quran Mudah Tanpa Install</title>
          <link rel="canonical" href="https://al-quran.pages.dev/" />
        </Helmet>

        {/* Start Sticky Search */}
        <div className="sticky top-0 z-[99] bg-white/70 backdrop-blur-md border-b">
          <div
            className={
              showBT
                ? "container mx-auto p-4 opacity-100 transition-opacity duration-500"
                : "h-0 opacity-0 transition-opacity duration-300"
            }
          >
            <input
              type="text"
              onChange={(e) => setQuerySearch(e.target.value.replace(" ", "-"))}
              value={querySearch.replace("-", " ")}
              placeholder="Surah Apa yang ingin Anda Baca?"
              className="input text-slate-600 border-slate-400 w-full focus:ring-4 focus:ring-blue-400 bg-white/70 backdrop-blur-md"
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
                    <div className="mb-2 text-xs w-[60%] sm:w-max flex items-center px-2 py-1 gap-2 rounded-md bg-white/70 text-slate-700 line-clamp-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="17"
                        fill="currentColor"
                        className="bi bi-plus-square-fill hidden sm:block"
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
                <div className="relative flex gap-2 items-center">
                  <div className="relative w-full">
                    <input
                      type="text"
                      onChange={(e) =>
                        setQuerySearch(e.target.value.replace(" ", "-"))
                      }
                      value={querySearch.replace("-", " ")}
                      placeholder="Surah Apa yang ingin Anda Baca?"
                      className="input text-slate-600 border-white w-full focus:ring-4 focus:ring-blue-400 bg-slate-100"
                    />
                  </div>

                  <Link
                    to={"/quote"}
                    className="bg-gray-100 hover:bg-gray-200 p-[11px] rounded-lg"
                  >
                    <svg
                      className="w-6 h-6 text-cyan-800"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M17.44 3a1 1 0 0 1 .707.293l2.56 2.56a1 1 0 0 1 0 1.414L18.194 9.78 14.22 5.806l2.513-2.513A1 1 0 0 1 17.44 3Zm-4.634 4.22-9.513 9.513a1 1 0 0 0 0 1.414l2.56 2.56a1 1 0 0 0 1.414 0l9.513-9.513-3.974-3.974ZM6 6a1 1 0 0 1 1 1v1h1a1 1 0 0 1 0 2H7v1a1 1 0 1 1-2 0v-1H4a1 1 0 0 1 0-2h1V7a1 1 0 0 1 1-1Zm9 9a1 1 0 0 1 1 1v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 1 1 0-2h1v-1a1 1 0 0 1 1-1Z"
                        clipRule="evenodd"
                      />
                      <path d="M19 13h-2v2h2v-2ZM13 3h-2v2h2V3Zm-2 2H9v2h2V5ZM9 3H7v2h2V3Zm12 8h-2v2h2v-2Zm0 4h-2v2h2v-2Z" />
                    </svg>
                  </Link>
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
        <section className="px-5 xl:px-0 relative">
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
                  <LinkProgresBars
                    to={"/surah/" + numbertosurah[s.nomor]}
                    className="relative rounded-lg w-full shadow-sm border-dashed border-[1px] border-slate-300 dark:border-slate-500 hover:border-slate-800 dark:hover:border-slate-100 bg-white bg-gradient-to-bl dark:from-slate-800 dark:to-gray-900  "
                    key={s.nama_latin + "-" + s.arti}
                  >
                    <div className="absolute right-3 top-0 border-l border-b border-r border-dashed rounded-b-lg border-slate-400 px-2 pb-1 flex gap-2 font-serif z-[2]">
                      {s?.nomor}
                    </div>

                    <div className="p-4 relative overflow-hidden">
                      <img
                        src="/kaligrafi.webp"
                        className="absolute w-[20%] -top-[60px] sm:-top-[60px] right-[50px] z-0 opacity-10"
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
                      <p className="text-left text-[15px] poppins relative z-[2] mt-1">
                        {s.arti}
                      </p>

                      <div className="flex gap-3 items-center justify-between border-t border-r-slate-300 mt-4 pt-2">
                        <div className="flex gap-3 items-center">
                          <p className="flex items-center gap-1 capitalize text-sm poppins">
                            <svg
                              className="w-4 h-4 text-gray-600"
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
                                d="M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0 0v6M9.5 9A2.5 2.5 0 0 1 12 6.5"
                              />
                            </svg>

                            {s.tempat_turun}
                          </p>
                          <p className="flex items-center gap-1 capitalize text-sm poppins">
                            <svg
                              className="w-4 h-4 text-gray-600"
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
                                d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4"
                              />
                            </svg>
                            {s.jumlah_ayat} Ayat
                          </p>
                        </div>
                        <div
                          key={index}
                          className="flex gap-2 items-center border border-slate-500 sm:pl-2 rounded-lg overflow-hidden z-[2]"
                        >
                          <audio
                            ref={(el) => (audioRefs.current[index] = el)} // Dynamically assigning ref
                            src={s.audio} // Assuming each item has an audioUrl
                            onTimeUpdate={() => handleTimeUpdate(index)}
                            onLoadedMetadata={() => handleLoadedMetadata(index)}
                            preload="none"
                            className="hidden"
                          ></audio>

                          <div className="text-xs hidden sm:block">
                            {audioInfo[index]?.currentTime
                              ? formatTime(audioInfo[index]?.currentTime) +
                                " / " +
                                formatTime(audioInfo[index]?.duration)
                              : s.nama_latin}
                          </div>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleAudio(index);
                            }}
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
                      </div>
                    </div>
                  </LinkProgresBars>
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
