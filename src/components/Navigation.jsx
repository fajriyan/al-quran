import LinkProgresBars from "../lib/LinkProgresBars";
import { useContext, useEffect, useState } from "react";
import ThemeContext from "../lib/ThemeContext";
import numbertosurah from "../data/numbertosurah.json";

const Navigation = (props) => {
  const [theme, setTheme] = useContext(ThemeContext);
  const root = window.document.documentElement;
  let storageTheme = JSON.parse(localStorage.getItem("theme"));
  const [open, setOpen] = useState(false);

  const handleTheme = () => {
    if (storageTheme.theme == "light") {
      setTheme("dark");
      localStorage.setItem(
        "theme",
        JSON.stringify({
          theme: "dark",
          key: "201273891793871263120",
        })
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
        })
      );
      root.classList.remove("dark");
      root.classList.add("light");
    }
  };

  return (
    <div className="backdrop-blur-md bg-white/85 dark:bg-gray-800/60 border-b dark:border-gray-900 sticky top-0 z-[100]">
      <div className="navbar container mx-auto flex justify-between lg:p-0">
        <div className="flex gap-4 md:gap-5">
          <LinkProgresBars
            to="/"
            className="flex items-center rounded-md font-semibold py-3 text-sm px-3.5 gap-2  bg-gradient-to-r from-slate-700 to-slate-800 focus:ring-2 ring-offset-2 ring-slate-800 text-slate-200 relative group overflow-hidden"
          >
            <div className="absolute right-0 w-0 h-full bg-gradient-to-t from-slate-800 to-slate-900 group-hover:w-full duration-500"></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-left-square-fill fill-white dark:fill-slate-200 relative"
              viewBox="0 0 16 16"
            >
              <path d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1z" />
            </svg>
            <span className="hidden md:block text-white dark:text-slate-200 relative">
              Kembali
            </span>
          </LinkProgresBars>

          {props.loadP == false ? (
            <>
              <div className="nunito text-xl">
                <h1 className="hidden">
                  Al quran Online | Baca Quran Praktis Tanpa Install Aplikasi
                </h1>
                <h2 className="-mb-2 font-bold">{props.suratP}</h2>
                <span className="label-text-alt text-slate-500 capitalize">
                  {props.artiP} | {props.jumlahP} | {props.turunP}
                </span>
              </div>
            </>
          ) : (
            <div className="animate-pulse ml-2 md:ml-7">
              <div className="h-2 bg-slate-300 rounded"></div>
              <div className="grid grid-cols-3 gap-2 mt-1">
                <div className="h-2 w-7 bg-slate-200 rounded col-span-1"></div>
                <div className="h-2 w-7 bg-slate-200 rounded col-span-1"></div>
                <div className="h-2 w-7 bg-slate-200 rounded col-span-1"></div>
              </div>
            </div>
          )}
        </div>
        <div className="flex-none">
          <ul className="flex gap-2 items-center">
            <li>
              <button className="border p-2 rounded-md border-slate-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={handleTheme}>
                {theme == "dark" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23"
                    height="23"
                    fill="currentColor"
                    className="bi bi-moon-stars-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278" />
                    <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.73 1.73 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.73 1.73 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.73 1.73 0 0 0 1.097-1.097zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23"
                    height="23"
                    fill="currentColor"
                    className="bi bi-brightness-high-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708" />
                  </svg>
                )}
              </button>
            </li>
            <div className="relative inline-block text-left">
              {/* Tombol */}
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-1 px-3 py-2 border dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span>Ayat</span>
                <svg
                  className={`w-5 h-5 duration-500 transition-transform ${
                    open ? "rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </button>

              {/* Dropdown */}
              {open && (
                <ul className="absolute mt-2 z-20 w-20 p-2 max-h-[300px] overflow-y-auto rounded-md border dark:border-gray-700 shadow-lg bg-white dark:bg-gray-800/90">
                  {props.singleSP?.ayat?.map((sp) => (
                    <li key={sp.nomor}>
                      <a
                        href={`/surah/${numbertosurah[sp.surah]}#surahke${
                          sp.nomor
                        }`}
                        className="block w-full text-center border rounded-md py-1.5 text-sm font-medium mb-2 dark:border-gray-700 border-slate-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setOpen(false)}
                      >
                        {sp.nomor}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Navigation;
