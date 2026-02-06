import React, { useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import LinkProgresBars from "../../lib/LinkProgresBars";
import { useDoa } from "../../hooks/global";
import ProgresContext from "../../lib/ProgresContext";

const DailyPrayer = () => {
  const { loading: Loading, dataDoa: dataDoa } = useDoa();
  const [, setProgressBar] = useContext(ProgresContext);
  useEffect(() => {
    setProgressBar(false);
  }, []);

  function cleaner(text) {
    if (!text) return "";

    return text.replace(/sumber\s*:.*$/i, "").trim();
  }

  return (
    <>
      <div className="bg-white dark:bg-slate-900 min-h-screen pb-10">
        <img
          src="https://images.unsplash.com/photo-1757043007816-7d4b1327a3d1?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="h-2 w-full object-cover object-top"
          alt=""
        />
        <Helmet>
          <meta charSet="utf-8" />
          <meta name="robots" content="index,follow" />
          <title>Kumpulan Doa Harian | Al Quran Digital</title>
          <link rel="canonical" href="https://al-quran.pages.dev/matsurat" />
        </Helmet>
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2  z-10 bg-white dark:bg-gray-700  shadow-md rounded-full">
          <LinkProgresBars
            to="/"
            className="flex gap-2 items-center text-sm border border-slate-300 dark:border-gray-700 px-3 py-1 rounded-full hover:bg-slate-100 dark:hover:bg-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-book"
              viewBox="0 0 16 16"
            >
              <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783" />
            </svg>{" "}
            Buka Al Quran
          </LinkProgresBars>
        </div>

        <div className="container mx-auto text-slate-800 dark:text-slate-200 px-5 lg:px-0">
          <div className="pt-[80px] text-center flex items-center flex-col">
            <h1 className="text-3xl font-semibold">Kumpulan Doa Harian </h1>
            <p className="text-xs w-[80%] md:w-[50%] xl:w-[30%] mt-3">
              Kumpulan doa Islam untuk keseharian yang disajikan dengan teks
              Arab, panduan transliterasi, serta terjemahan bahasa Indonesia
            </p>
          </div>
          <div className="mt-10 container mx-auto grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 lg:gap-4 sm:gap-4 gap-4 mb-14">
            {!Loading
              ? dataDoa.data?.map((doa) => (
                  <label
                    htmlFor={`tafsir-modal-${doa.id}`}
                    className="relative rounded-lg w-full shadow-sm border-dashed border-[1px] border-slate-300 dark:border-slate-600 hover:border-slate-800 dark:hover:border-slate-100 bg-white dark:bg-gray-800/50 overflow-hidden cursor-pointer"
                    key={doa.id}
                  >
                    <div className="absolute right-3 top-0 border-l border-b border-r border-dashed rounded-b-lg border-slate-400 px-2 pb-1 flex gap-2 font-serif z-[2]">
                      {doa.id}
                    </div>

                    <div className="p-4 relative overflow-hidden h-full">
                      <img
                        src="https://png.pngtree.com/png-clipart/20230516/original/pngtree-islamic-corner-frame-png-image_9162616.png"
                        className="absolute w-32 top-0 left-0 z-0 opacity-20"
                        alt="kaligrafi"
                        width="auto"
                        height="auto"
                        title="kaligrafi"
                        loading="lazy"
                      />
                      <h2
                        className={`card-title mb-0 font-serif relative z-[2] !text-lg line-clamp-1`}
                      >
                        {doa.nama}
                      </h2>
                      <p className="text-left text-sm poppins relative z-[2] mt-1 line-clamp-3 min-h-[60px]">
                        {cleaner(doa.tentang)}
                      </p>

                      <div className="flex gap-3 items-center justify-between border-t border-r-slate-300 dark:border-gray-700 mt-4 pt-2">
                        <div className="flex gap-3 items-center">
                          {doa.tag.map((tag) => (
                            <p
                              key={tag}
                              className="flex items-center gap-1 capitalize text-sm poppins"
                            >
                              {tag}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </label>
                ))
              : Array.from({ length: 12 }).map((_, index) => (
                  <div
                    className="card w-full shadow-sm border-dashed border-[1px] border-slate-300 dark:border-slate-500 hover:border-slate-800 dark:hover:border-slate-100 bg-white bg-gradient-to-bl dark:from-slate-800 dark:to-gray-900"
                    key={index}
                  >
                    <div className="p-5 md:p-6 flex flex-col gap-2 animate-pulse text-black/0">
                      <p className="mb-0 w-72 bg-slate-400 rounded-md">...</p>
                      <p className="text-left font-serif w-52 bg-slate-400 rounded-md">
                        ...
                      </p>
                      <p className="w-28 bg-slate-400 rounded-md">...</p>

                      <div className="card-actions justify-start">
                        <button className="w-52 btn btn-sm bg-gradient-to-r hover:bg-gradient-to-t from-slate-800 to-slate-700 border-none hover:shadow-lg focus:ring-2 ring-offset-2 ring-slate-800 text-slate-200"></button>
                      </div>
                    </div>
                  </div>
                ))}
          </div>

          {dataDoa.data?.map((modal) => (
            <div key={modal.id}>
              <input
                type="checkbox"
                id={`tafsir-modal-${modal.id}`}
                className="modal-toggle"
              />
              <div className="modal md:items-start md:pt-10 px-3">
                <div className="modal-box w-full max-w-7xl bg-white dark:bg-slate-800">
                  <label
                    htmlFor={`tafsir-modal-${modal.id}`}
                    className="btn btn-sm btn-circle absolute right-2 top-2"
                  >
                    ✕
                  </label>

                  <div className="px-6 pt-5 ">
                    <div className="text-lg font-serif font-semibold flex items-center gap-2">
                      <svg
                        className="w-6 h-6 text-gray-800"
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

                      {modal.nama}
                    </div>
                    <div className="arab !text-[25px] ">{modal.ar}</div>
                    <div className="mt-7 border-t border-slate-400 pt-8 relative">
                      <div className="mt-2 flex gap-2 items-center flex-wrap absolute -top-[23px] bg-white pr-2">
                        {modal.tag.map((tag) => (
                          <span
                            key={tag}
                            className="border block border-slate-300 px-3 text-sm capitalize py-0.5 rounded-lg text-slate-700 dark:border-slate-700 dark:text-gray-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <p className="text-lg font-semibold mb-1">
                        Terjemahan Doa :
                      </p>
                      <div className="text-sm">{modal.idn}</div>
                    </div>

                    <div className="mt-5">
                      <p className="text-lg font-semibold mb-1">
                        Tentang Doa :
                      </p>
                      <div className="text-sm">{cleaner(modal.tentang)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DailyPrayer;
