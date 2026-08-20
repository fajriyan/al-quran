import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import LinkProgresBars from "@/lib/LinkProgresBars";
import Adzan from "@/components/Adzan";
import Attendance from "@/components/Attendance";
import { memo, useContext } from "react";
import ThemeContext from "@/lib/ThemeContext";

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
   isFriday,
   ramadhanInfo,
   downloadAllSurahForOffline,
   downloadingAll,
   downloadProgress,
   isOnline,
   searchInputRef,
}) => {
   const [theme, setTheme] = useContext(ThemeContext);
   const root = window.document.documentElement;
   let storageTheme = JSON.parse(localStorage.getItem("theme"));
   const handleTheme = () => {
      if (storageTheme.theme == "light") {
         setTheme("dark");
         localStorage.setItem(
            "theme",
            JSON.stringify({
               theme: "dark",
               key: "201273891793871263120",
            }),
         );
         root.classList.remove("light");
         root.classList.add("dark");
      } else if (storageTheme.theme == "dark") {
         setTheme("light");
         localStorage.setItem(
            "theme",
            JSON.stringify({
               theme: "light",
               key: "231273891793871263123",
            }),
         );
         root.classList.remove("dark");
         root.classList.add("light");
      }
   };

   try {
      return (
         <>
            <div className="min-h-screen dark:bg-slate-950 sm:px-5 2xl:px-0">
               {localStorage.removeItem("fromBookmark", false)}

               <Helmet>
                  <meta charSet="utf-8" />
                  <meta name="robots" content="index,follow" />
                  <title>Al Quran Digital | Baca Al Quran Mudah Tanpa Install</title>
                  <link rel="canonical" href="https://al-quran.pages.dev/" />
               </Helmet>

               {/* Start Sticky Search */}
               <div
                  className={`fixed top-0 left-0 z-99 bg-white/70 backdrop-blur-md dark:bg-gray-800/50 duration-500 w-full border-b border-gray-300 border-dashed  ${showBT ? "translate-y-0" : "-translate-y-20"}`}
               >
                  <div className="container mx-auto py-3">
                     <input
                        type="text"
                        onChange={(e) => setQuerySearch(e.target.value.replace(" ", "-"))}
                        value={querySearch.replace("-", " ")}
                        placeholder="Surah Apa yang ingin Anda Baca?"
                        className="py-2 px-3 rounded-md focus-within:outline-none border border-gray-300 font-serif text-slate-600  w-full focus:ring-4 focus:ring-blue-400 bg-white/70 dark:bg-gray-900 dark:border-gray-600 backdrop-blur-md"
                     />
                  </div>
               </div>
               {/* End Sticky Search */}

               <button className="fixed bottom-[54px] bg-gray-900 left-0 w-[73px] hover:w-[158px] overflow-hidden duration-500 text-left p-2 border text-sm group flex gap-1.5 items-center border-slate-200 dark:border-gray-900 backdrop-blur-md rounded-r-full z-10">
                  <svg className="w-5 h-5 text-green-200 flex-none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                     <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 21a9 9 0 0 1-.5-17.986V3c-.354.966-.5 1.911-.5 3a9 9 0 0 0 9 9c.239 0 .254.018.488 0A9.004 9.004 0 0 1 12 21Z"
                     />
                  </svg>

                  <div className="text-green-200">
                     {ramadhanInfo.isRamadhan ? (
                        <div>
                           <div className="overflow-hidden min-w-max h-0 group-hover:h-[20px] opacity-0 group-hover:opacity-100 duration-500">Ramadhan ke : </div>
                           <b className="text-green-200">{ramadhanInfo.ramadhanDay}</b>
                        </div>
                     ) : (
                        <div>
                           <b className="text-green-200">
                              {ramadhanInfo.timeLeft} <span className="opacity-0 group-hover:opacity-100 duration-500">Hari</span>
                           </b>
                           <div className="overflow-hidden min-w-max h-0 group-hover:h-[15px] opacity-0 text-xs group-hover:opacity-100 duration-500">menuju Ramadhan</div>
                        </div>
                     )}
                  </div>

                  {/* <div className="text-xs">{ramadhanInfo.ramadhanGregorian}</div> */}
               </button>

               <button className="fixed bottom-24 right-0 rounded-l-full z-10 bg-gray-900 hover:bg-emerald-900 p-2 duration-500 group cursor-pointer" onClick={handleTheme}>
                  {theme == "dark" ? (
                     <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-gray-300 group-hover:-rotate-20 duration-700" viewBox="0 0 16 16">
                        <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278" />
                        <path
                           d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.73 1.73 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.73 1.73 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.73 1.73 0 0 0 1.097-1.097zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z"
                           className="group-hover:-translate-y-1 group-hover:rotate-12 duration-700"
                        />
                     </svg>
                  ) : (
                     <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-gray-300 group-hover:rotate-45 duration-700" viewBox="0 0 16 16">
                        <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708" />
                     </svg>
                  )}
               </button>

               <div className="fixed bottom-3 left-0 z-10 flex flex-col items-start gap-2">
                  <button
                     type="button"
                     onClick={downloadAllSurahForOffline}
                     disabled={downloadingAll}
                     className="rounded-r-full bg-gray-900 hover:bg-emerald-90 group relative w-[40px] hover:w-[140px] duration-500 text-white p-2 pr-3 text-sm font-semibold shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                     {downloadingAll ? (
                        `${downloadProgress.current}/${downloadProgress.total}`
                     ) : (
                        <span className="flex gap-2 items-center text-xs ">
                           <svg
                              className="w-5 h-5 text-white flex-none"
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
                                 d="M12 11H4m15.5 5a.5.5 0 0 0 .5-.5V8a1 1 0 0 0-1-1h-3.75a1 1 0 0 1-.829-.44l-1.436-2.12a1 1 0 0 0-.828-.44H8a1 1 0 0 0-1 1M4 9v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-3.75a1 1 0 0 1-.829-.44L9.985 8.44A1 1 0 0 0 9.157 8H5a1 1 0 0 0-1 1Z"
                              />
                           </svg>
                           <span className="overflow-hidden min-w-max opacity-0 group-hover:opacity-100 duration-500 ">Simpan Offline</span>
                        </span>
                     )}
                  </button>
               </div>

               <button
                  className={`fixed bottom-12 right-0 rounded-l-full z-10 bg-gray-900 hover:bg-emerald-900 p-2 duration-500 cursor-pointer group ${showBT ? "translate-x-0" : "translate-x-11"}`}
                  onClick={() => {
                     document.body.scrollTop = 0;
                     document.documentElement.scrollTop = 0;
                  }}
               >
                  <svg
                     className="w-6 h-6 text-white group-hover:-translate-y-1 duration-300"
                     aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg"
                     width="24"
                     height="24"
                     fill="none"
                     viewBox="0 0 24 24"
                  >
                     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m16 17-4-4-4 4m8-6-4-4-4 4" />
                  </svg>
               </button>

               <div className="container mx-auto sm:py-5">
                  <div
                     className="hero min-h-[200px] rounded-none sm:rounded-xl flex flex-wrap relative bg-cover overflow-hidden"
                     style={{
                        backgroundImage: `url("https://images.unsplash.com/photo-1588194200910-af009d36fc75?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
                     }}
                  >
                     <div
                        className={`rounded-full px-2 py-1 text-xs font-semibold shadow-2xl border backdrop-blur-md z-10 absolute top-3 left-3 ${isOnline ? "bg-emerald-600/95 text-white border-emerald-300" : "bg-rose-600/95 text-white border-rose-300"}`}
                     >
                        <span className="inline-flex items-center gap-2 duration-300 ">
                           <span className={`h-2.5 w-2.5 rounded-full animate-pulse ${isOnline ? "bg-emerald-200" : "bg-white"}`} />
                           <span className="overflow-hidden duration-500 hidden sm:block ">{isOnline ? "Online" : "Offline"}</span>
                        </span>
                     </div>
                     <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-4 text-white">
                        <Adzan />
                     </div>
                     <div className="absolute w-full h-full z-2 bg-slate-700/50 dark:bg-gray-900/60 dark:backdrop-brightness-95"></div>
                     <div className=" py-10 px-4 sm:px-7 overflow-hidden text-white relative z-3">
                        <div className="md:w-[70%] mx-auto">
                           <div className="w-full mt-7 xl:mt-3">
                              <span className={`text-3xl mb-3 lg:text-4xl sm:text-md font-bold  ${isFriday ? "text-yellow-50" : ""}`}>Al Qur'an Digital</span>
                              <h1 className="hidden">Al Qur'an Digital | Baca Quran Praktis Tanpa Install Aplikasi</h1>

                              <p className="mb-5 mt-2 text-xs md:text-sm">
                                 Diriwayatkan dari Abu Umamah al-Bahili, Rasulullah SAW bersabda, "Bacalah Al Quran, maka sesungguhnya ia akan datang di hari kiamat memberi syafaat
                                 kepada pembacanya".
                              </p>
                           </div>

                           {/* Start Search */}
                           <div className="relative flex gap-2 items-center">
                              <div className="relative w-full">
                                 <input
                                    ref={searchInputRef}
                                    type="text"
                                    id="search"
                                    onChange={(e) => setQuerySearch(e.target.value.replace(" ", "-"))}
                                    value={querySearch.replace("-", " ")}
                                    placeholder="Surah Apa yang ingin Anda Baca?"
                                    className="py-2.5 px-4 text-slate-600 rounded-md border-white w-full focus:ring-4 focus:ring-emerald-500 bg-slate-100 dark:bg-gray-200 font-serif font-thin"
                                 />

                                 <label
                                    htmlFor="search"
                                    className="absolute hidden text-xs top-3.5 right-4 sm:flex gap-1 border text-gray-400 border-gray-400 rounded-xl px-2 items-center"
                                 >
                                    <span className="">⌘</span>
                                    <span className="DocSearch-Button-Key">K</span>
                                 </label>
                              </div>

                              <Link to={"/quote"} className="bg-gray-100 dark:bg-gray-200 hover:bg-gray-200 p-[11px] rounded-lg">
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
                           <span className="label-text-alt text-white px-2 text-xs py-1">
                              Hasil pencarian tentang : {querySearch ? <b className="capitalize font-serif">{querySearch}</b> : <b>Nama Surat</b>}
                           </span>
                           <div className="mt-2 flex flex-nowrap gap-2 overflow-x-scroll no-scrollbars">
                              {RekomendationSurah.map((rs) => (
                                 <LinkProgresBars
                                    key={rs.surah}
                                    to={rs.ex == "nosurah" ? "/" + rs.url : "/surah/" + numbertosurah[rs.url]}
                                    className={`min-w-max md:min-w-0 px-2 md:px-3 py-1 rounded-lg ${rs.alertFriday && isFriday ? "bg-linear-to-r from-indigo-200 via-red-100 to-yellow-100" : "bg-slate-100 dark:bg-gray-200"}  hover:bg-slate-200 text-slate-700 font-medium text-[13px] md:text-sm`}
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
               <section className="px-5 xl:px-0 relative pb-20 min-h-screen">
                  <div className="container mx-auto flex flex-col md:flex-row gap-5 mb-5">
                     <div className="w-full md:w-[50%]">
                        {/* Bookmark Start  */}
                        {lanjutBaca[0].ayat ? (
                           <div className="h-full">
                              <div
                                 type="button"
                                 onClick={() => localStorage.setItem("fromBookmark", true)}
                                 className="relative w-full bg-white dark:bg-slate-900 h-full rounded-xl border-dashed dark:border-gray-600 shadow-xs group hover:border-slate-600 border border-slate-300 overflow-hidden"
                              >
                                 <div className="text-left p-3 flex flex-col justify-center">
                                    <div className="font-semibold text-lg font-serif mt-1">{lanjutBaca[0].surat}</div>
                                    <div className="">
                                       Ayat ke : <span>{lanjutBaca[0].ayat}</span>{" "}
                                    </div>
                                    <Link
                                       to={`/surah/${lanjutBaca[0].url}`}
                                       className={`mt-2 px-2.5 py-1.5 text-xs rounded-lg border border-gray-400 w-max
                                          transition-all duration-200 ease-out
                                          shadow-[0_1px_2px_rgba(0,0,0,0.06),0_4px_8px_rgba(0,0,0,0.0.9),inset_0_1px_0_rgba(255,255,255,0.3)]
                                          hover:shadow-[inset_0_2px_6px_rgba(0,0,0,0.15),inset_0_1px_2px_rgba(0,0,0,0.1)]
                                          hover:translate-y-px
                                          active:shadow-[inset_0_3px_8px_rgba(0,0,0,0.25)]
                                          active:translate-y-[1.5px]
                                          focus:ring-2 ring-offset-2 ring-gray-700
                                          ${
                                             isFriday
                                                ? "bg-linear-to-r from-indigo-200 via-red-100 to-yellow-200 dark:from-indigo-200 dark:via-red-100 dark:to-yellow-200 text-gray-900"
                                                : "bg-linear-to-r from-slate-800 to-slate-700 text-white fill-white"
                                          }`}
                                    >
                                       Lanjutkan Baca
                                    </Link>
                                 </div>
                                 <button
                                    type="button"
                                    onClick={() => removeBookmark()}
                                    className="absolute top-2 right-2 p-2 cursor-pointer rounded-lg border bg-slate-200 dark:bg-gray-700 dark:border-gray-600 group"
                                 >
                                    <svg
                                       xmlns="http://www.w3.org/2000/svg"
                                       width="15"
                                       height="15"
                                       fill="currentColor"
                                       className="bi bi-trash hover:scale-105 duration-300"
                                       viewBox="0 0 16 16"
                                    >
                                       <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                       <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                    </svg>
                                 </button>
                              </div>
                           </div>
                        ) : (
                           <div className="border border-slate-200 dark:bg-gray-800/50 dark:border-gray-600 shadow-xs border-dashed rounded-lg p-3 flex items-center gap-2 h-full">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark" viewBox="0 0 16 16">
                                 <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
                              </svg>
                              <span>
                                 Tidak ada <span className="font-semibold"> Bookmark</span> yang Tersimpan
                              </span>
                           </div>
                        )}
                        {/* Bookmark End  */}
                     </div>
                     <div className="w-full md:w-[50%]">
                        <Attendance isFriday={isFriday} />
                     </div>
                  </div>

                  <div className={`container mx-auto grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 lg:gap-4 sm:gap-4 gap-4`}>
                     {Loading ? (
                        skeletonLoad.map((L) => (
                           <div
                              className="card w-full shadow-xs border-dashed border border-slate-300 dark:border-slate-500 hover:border-slate-800 dark:hover:border-slate-100 bg-white bg-linear-to-bl dark:from-slate-800 dark:to-gray-900  "
                              key={Math.random()}
                           >
                              <div className="p-5 md:p-6 flex flex-col gap-2 animate-pulse text-black/0">
                                 <p className="mb-0 w-72 bg-slate-400 rounded-md">...</p>
                                 <p className="text-left font-serif  w-52 bg-slate-400 rounded-md">...</p>
                                 <p className="w-28 bg-slate-400 rounded-md">...</p>

                                 <div className="card-actions justify-start ">
                                    <button className="w-52 btn btn-sm bg-linear-to-r hover:bg-linear-to-t from-slate-800 to-slate-700 border-none hover:shadow-lg focus:ring-2 ring-offset-2 ring-slate-800 text-slate-200"></button>
                                 </div>
                              </div>
                           </div>
                        ))
                     ) : filteredData.length === 0 ? (
                        <div className="py-20 col-span-full border border-dashed border-slate-300 dark:border-slate-500 rounded-xl w-full text-md flex flex-col items-center justify-center">
                           <img src="/empty.png" className="w-40" alt="" />
                           <div className="font-serif font-semibold text-lg">
                              Maaf, Surah <span className="border border-emerald-600 text-emerald-800 px-1 mx-0.5">{querySearch}</span> tidak ditemukan,
                           </div>
                           <div className="text-sm">silahkan periksa kembali pencarian anda.</div>
                        </div>
                     ) : (
                        filteredData.map((s, index) => (
                           <LinkProgresBars
                              to={"/surah/" + numbertosurah[s.nomor]}
                              className="relative rounded-lg w-full shadow-xs border-dashed border border-slate-300 dark:border-slate-600 hover:border-slate-800 dark:hover:border-slate-100 bg-white dark:bg-gray-800/50 "

                              key={s.nama_latin + "-" + s.arti}
                           >
                              <div className="absolute right-3 top-0 border-l border-b border-r border-dashed rounded-b-lg border-slate-400 px-2 pb-1 flex gap-2 font-serif z-2">
                                 {s?.nomor}
                              </div>

                              <div className="p-4 relative overflow-hidden">
                                 <h2 className={`font-semibold mb-0 text-lg font-serif relative z-2 ${isFriday ? "text-yellow-900 dark:text-yellow-50" : ""}`} key={s.nama_latin}>
                                    {s.nama_latin.replace("-", " ")} <span className="arab-0">({s.nama})</span>
                                 </h2>
                                 <p className="text-left text-[15px] poppins relative z-2 mt-1">{s.arti}</p>

                                 <div className="flex gap-3 items-center justify-between border-t border-r-slate-300 dark:border-gray-700 mt-4 pt-2">
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

                                          {s.tempat_turun == "mekah" ? "Makkiyah" : "Madaniyah"}
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
                                    <div key={index} className="flex gap-2 items-center border border-slate-500 sm:pl-2 rounded-lg overflow-hidden z-2">
                                       <audio
                                          ref={(el) => (audioRefs.current[index] = el)}
                                          src={s.audio}
                                          onTimeUpdate={() => handleTimeUpdate(index)}
                                          onLoadedMetadata={() => handleLoadedMetadata(index)}
                                          preload="none"
                                          className="hidden"
                                       ></audio>

                                       <div className="text-xs hidden sm:block">
                                          {audioInfo[index]?.currentTime
                                             ? formatTime(audioInfo[index]?.currentTime) + " / " + formatTime(audioInfo[index]?.duration)
                                             : s.nama_latin}
                                       </div>
                                       <button
                                          onClick={(e) => {
                                             e.preventDefault();
                                             e.stopPropagation();
                                             toggleAudio(index);
                                          }}
                                          className={`px-2 py-2 rounded-l-md  border-none hover:shadow-lg focus:ring-2 ring-offset-2 ring-slate-800 ${isFriday ? "bg-linear-to-r from-indigo-200 via-red-200 to-yellow-200 dark:from-indigo-200 dark:via-red-100 dark:to-yellow-200 text-gray-900" : "bg-linear-to-r hover:bg-linear-to-t from-slate-800 to-slate-700 text-white fill-white"}`}
                                       >
                                          {loadingIndex === index ? (
                                             <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                                             </svg>
                                          ) : playingIndex === index ? (
                                             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="fill-white" viewBox="0 0 16 16">
                                                <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5" />
                                             </svg>
                                          ) : (
                                             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="" viewBox="0 0 16 16">
                                                <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
                                             </svg>
                                          )}
                                       </button>
                                    </div>
                                 </div>
                              </div>
                           </LinkProgresBars>
                        ))
                     )}
                  </div>
               </section>
               {/* End Main Content */}

               <Footer />
            </div>
         </>
      );
   } catch (error) {
      console.log("Home View Error = " + error);
   }
};

export default memo(HomeView);
