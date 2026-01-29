import { useNavigate, useLocation, Link } from "react-router-dom";
import { memo, useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import ProgresContext from "../../lib/ProgresContext";
import LinkProgresBars from "../../lib/LinkProgresBars";
import data from "../../data/matsurat/index";

const Matsurat = () => {
  const [_, setProgressBar] = useContext(ProgresContext);
  const navigate = useNavigate();
  const location = useLocation();

  const getCurrentTabIndex = () => {
    const params = new URLSearchParams(location.search);
    const tabParam = params.get("baca");
    return tabParam === "sore" ? 1 : 0;
  };

  const [activeTab, setActiveTab] = useState(getCurrentTabIndex());
  const [option, setOption] = useState({ ar: "25", id: "14" });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    params.set("baca", activeTab === 0 ? "pagi" : "sore");
    navigate({ search: params.toString() });
    setProgressBar(false);
    window.scrollTo({ top: 0 });
  }, [activeTab, navigate]);

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen pb-10">
      <img
        src="https://images.unsplash.com/photo-1664270009142-7c264e0dbe02?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className="h-2 w-full object-cover"
        alt=""
      />
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="robots" content="index,follow" />
        <title>Dzikir Al Matsurat | Al Quran Digital</title>
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
          <h1 className="text-3xl font-semibold">Dzikir Al Matsurat </h1>
          <p className="text-xs w-[85%] md:w-[40%] mt-1">
            Melansir buku karya Hasan al-Banna yang berjudul Al-Ma'tsurat
            bahwasanya baca dari Al Matsurat yang shahih dan berasal dari Nabi
            SAW ini sangat bagus jika dilakukan secara bersama-sama.
          </p>
        </div>

        <div className="flex gap-2 relative justify-center mt-5">
          <div className="">
            <p className="text-xs mb-1">Ukuran Arab</p>
            <select
              defaultValue={option.ar}
              className="border border-slate-400 px-1 rounded-md bg-white"
              onChange={(ar) => setOption({ ar: ar.target.value })}
            >
              <option value="20">Kecil</option>
              <option value="25">Default</option>
              <option value="30">Besar</option>
              <option value="35">Paling Besar</option>
            </select>
          </div>
          <div className="">
            <p className="text-xs mb-1">Ukuran Arti</p>
            <select
              defaultValue={option.id}
              className="border border-slate-400 px-1 rounded-md bg-white"
              onChange={(id) => setOption({ id: id.target.value })}
            >
              <option value="14">Kecil</option>
              <option value="16">Default</option>
              <option value="20">Besar</option>
            </select>
          </div>
        </div>

        <div className="mt-5 px-5 flex flex-wrap justify-end md:h-full md:items-center rounded-lg border border-slate-300 dark:border-slate-400/80 pt-14 pb-5 md:py-9 relative">
          <div className="text-xl md:ml-5 flex justify-between md:block gap-1 px-3 top-2 w-full mb-3 md:w-fit md:mb-0 md:px-0 absolute left-0 border-b border-dashed border-slate-200 pb-2 md:border-0">
            <div className="flex md:block w-full gap-2">
              <div className="w-auto border md:border-slate-200 rounded-md text-sm px-1 lg:mt-3 nunito font-semibold">
                Taawudz
              </div>
            </div>
          </div>

          <div
            className="arab w-full"
            style={{ fontSize: option.ar + "px" }}
          >
            أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ{" "}
            <span className="relative"> ۝</span>
          </div>
          <p
            className="w-full text-left mt-2 text-[15px] lg:mt-7 nunito"
            style={{ fontSize: option.id + "px" }}
          >
            Aku berlindung kepada Allah yang Maha Mendengar lagi Maha Mengetahui
            dari godaan syetan yang terkutuk.
          </p>
        </div>

        <section className="mt-10">
          {/* Control Tab */}
          <div className="flex border-b border-gray-300 dark:border-slate-500">
            <button
              onClick={() => setActiveTab(0)}
              className={`py-2 px-4 border-b-2 focus:outline-none ${
                activeTab === 0
                  ? "border-gray-700 text-gray-700 dark:border-gray-200 dark:text-gray-200"
                  : "border-transparent text-gray-500"
              }`}
            >
              Pagi Hari
            </button>
            <button
              onClick={() => setActiveTab(1)}
              className={`py-2 px-4 border-b-2 focus:outline-none ${
                activeTab === 1
                  ? "border-gray-700 text-gray-700 dark:border-gray-200 dark:text-gray-200"
                  : "border-transparent text-gray-500"
              }`}
            >
              Sore Hari
            </button>
          </div>

          {/* Content Tab */}
          <div className="">
            {activeTab === 0 && (
              <div className="pagi hari">
                <section>
                  <div className="flex flex-col items-center mt-10 mb-2 font-semibold">
                    <span className="border border-slate-400 px-3 py-1 rounded-md">
                      Surat Al Fatihah - 1X
                    </span>
                  </div>

                  <div className="border border-slate-300 rounded-lg overflow-hidden">
                    {data.alfatihah.map((surat) => (
                      <div
                        className="px-5 flex flex-wrap justify-end md:h-full md:items-center [&:not(:last-child)]:border-b border-slate-300 dark:border-slate-400/80 pt-14 pb-5 md:py-9 relative"
                        key={Math.random(20)}
                      >
                        <div className="text-xl md:ml-5 flex justify-between md:block gap-1 px-3 top-2 w-full mb-3 md:w-fit md:mb-0 md:px-0 absolute left-0 border-b border-dashed border-slate-200 pb-2 md:border-0">
                          <div className="flex md:block w-full gap-2">
                            <div className="w-auto border md:border-slate-200 rounded-md text-sm px-1 lg:mt-3 nunito font-semibold">
                              Al Fatihah : {surat.nomor}
                            </div>
                          </div>
                        </div>

                        <div
                          className="arab w-full lg:mt-5"
                          style={{ fontSize: option.ar + "px" }}
                        >
                          {surat.ar}
                          <span className="relative"> ۝</span>
                        </div>
                        <p
                          className="w-full text-left mt-2 text-[15px] lg:mt-7 nunito"
                          style={{ fontSize: option.id + "px" }}
                        >
                          {surat.idn}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <div className="flex flex-col items-center mt-10 mb-2 font-semibold">
                    <span className="border border-slate-400 px-3 py-1 rounded-md">
                      Surat Al Baqarah (1-5) - 1X
                    </span>
                    <span
                      className="arab"
                      style={{ fontSize: option.ar + "px" }}
                    >
                      بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                    </span>
                  </div>

                  <div className="border border-slate-300 rounded-lg overflow-hidden">
                    {data.albaqarah15.map((surat) => (
                      <div
                        className="px-5 flex flex-wrap justify-end md:h-full md:items-center [&:not(:last-child)]:border-b border-slate-300 dark:border-slate-400/80 pt-14 pb-5 md:py-9 relative"
                        key={Math.random(20)}
                      >
                        <div className="text-xl md:ml-5 flex justify-between md:block gap-1 px-3 top-2 w-full mb-3 md:w-fit md:mb-0 md:px-0 absolute left-0 border-b border-dashed border-slate-200 pb-2 md:border-0">
                          <div className="flex md:block w-full gap-2">
                            <div className="w-auto border md:border-slate-200 rounded-md text-sm px-1 lg:mt-3 nunito font-semibold">
                              Al Baqarah : {surat.nomor}
                            </div>
                          </div>
                        </div>

                        <div
                          className="arab w-full lg:mt-5"
                          style={{ fontSize: option.ar + "px" }}
                        >
                          {surat.ar}
                          <span className="relative"> ۝</span>
                        </div>
                        <p
                          className="w-full text-left mt-2 text-[15px] lg:mt-7 nunito"
                          style={{ fontSize: option.id + "px" }}
                        >
                          {surat.idn}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <div className="flex flex-col items-center mt-10 mb-2 font-semibold">
                    <span className="border border-slate-400 px-3 py-1 rounded-md">
                      Surat Al Baqarah (255-257) - 1X
                    </span>
                  </div>

                  <div className="border border-slate-300 rounded-lg overflow-hidden">
                    {data.albaqarah255_257.map((surat) => (
                      <div
                        className="px-5 flex flex-wrap justify-end md:h-full md:items-center [&:not(:last-child)]:border-b border-slate-300 dark:border-slate-400/80 pt-14 pb-5 md:py-9 relative"
                        key={Math.random(20)}
                      >
                        <div className="text-xl md:ml-5 flex justify-between md:block gap-1 px-3 top-2 w-full mb-3 md:w-fit md:mb-0 md:px-0 absolute left-0 border-b border-dashed border-slate-200 pb-2 md:border-0">
                          <div className="flex md:block w-full gap-2">
                            <div className="w-auto border md:border-slate-200 rounded-md text-sm px-1 lg:mt-3 nunito font-semibold">
                              Al Baqarah : {surat.nomor}
                            </div>
                          </div>
                        </div>

                        <div
                          className="arab w-full lg:mt-5"
                          style={{ fontSize: option.ar + "px" }}
                        >
                          {surat.ar}
                          <span className="relative"> ۝</span>
                        </div>
                        <p
                          className="w-full text-left mt-2 text-[15px] lg:mt-7 nunito"
                          style={{ fontSize: option.id + "px" }}
                        >
                          {surat.idn}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <div className="flex flex-col items-center mt-10 mb-2 font-semibold">
                    <span className="border border-slate-400 px-3 py-1 rounded-md">
                      Surat Al Baqarah (284-286) - 1X
                    </span>
                  </div>

                  <div className="border border-slate-300 rounded-lg overflow-hidden">
                    {data.albaqarah284_286.map((surat) => (
                      <div
                        className="px-5 flex flex-wrap justify-end md:h-full md:items-center [&:not(:last-child)]:border-b border-slate-300 dark:border-slate-400/80 pt-14 pb-5 md:py-9 relative"
                        key={Math.random(20)}
                      >
                        <div className="text-xl md:ml-5 flex justify-between md:block gap-1 px-3 top-2 w-full mb-3 md:w-fit md:mb-0 md:px-0 absolute left-0 border-b border-dashed border-slate-200 pb-2 md:border-0">
                          <div className="flex md:block w-full gap-2">
                            <div className="w-auto border md:border-slate-200 rounded-md text-sm px-1 lg:mt-3 nunito font-semibold">
                              Al Baqarah : {surat.nomor}
                            </div>
                          </div>
                        </div>

                        <div
                          className="arab w-full lg:mt-5"
                          style={{ fontSize: option.ar + "px" }}
                        >
                          {surat.ar}
                          <span className="relative"> ۝</span>
                        </div>
                        <p
                          className="w-full text-left mt-2 text-[15px] lg:mt-7 nunito"
                          style={{ fontSize: option.id + "px" }}
                        >
                          {surat.idn}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <div className="flex flex-col items-center mt-10 mb-2 font-semibold">
                    <span className="border border-slate-400 px-3 py-1 rounded-md">
                      Surat Al Ikhlas (1-4) - 3X
                    </span>
                    <span
                      className="arab"
                      style={{ fontSize: option.ar + "px" }}
                    >
                      بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                    </span>
                  </div>

                  <div className="border border-slate-300 rounded-lg overflow-hidden">
                    {data.alikhlas.map((surat) => (
                      <div
                        className="px-5 flex flex-wrap justify-end md:h-full md:items-center [&:not(:last-child)]:border-b border-slate-300 dark:border-slate-400/80 pt-14 pb-5 md:py-9 relative"
                        key={Math.random(20)}
                      >
                        <div className="text-xl md:ml-5 flex justify-between md:block gap-1 px-3 top-2 w-full mb-3 md:w-fit md:mb-0 md:px-0 absolute left-0 border-b border-dashed border-slate-200 pb-2 md:border-0">
                          <div className="flex md:block w-full gap-2">
                            <div className="w-auto border md:border-slate-200 rounded-md text-sm px-1 lg:mt-3 nunito font-semibold">
                              Al Ikhlas : {surat.nomor}
                            </div>
                          </div>
                        </div>

                        <div
                          className="arab w-full lg:mt-5"
                          style={{ fontSize: option.ar + "px" }}
                        >
                          {surat.ar}
                          <span className="relative"> ۝</span>
                        </div>
                        <p
                          className="w-full text-left mt-2 text-[15px] lg:mt-7 nunito"
                          style={{ fontSize: option.id + "px" }}
                        >
                          {surat.idn}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <div className="flex flex-col items-center mt-10 mb-2 font-semibold">
                    <span className="border border-slate-400 px-3 py-1 rounded-md">
                      Surat Al Falaq (1-5) - 3X
                    </span>
                    <span
                      className="arab"
                      style={{ fontSize: option.ar + "px" }}
                    >
                      بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                    </span>
                  </div>

                  <div className="border border-slate-300 rounded-lg overflow-hidden">
                    {data.alfalaq.map((surat) => (
                      <div
                        className="px-5 flex flex-wrap justify-end md:h-full md:items-center [&:not(:last-child)]:border-b border-slate-300 dark:border-slate-400/80 pt-14 pb-5 md:py-9 relative"
                        key={Math.random(20)}
                      >
                        <div className="text-xl md:ml-5 flex justify-between md:block gap-1 px-3 top-2 w-full mb-3 md:w-fit md:mb-0 md:px-0 absolute left-0 border-b border-dashed border-slate-200 pb-2 md:border-0">
                          <div className="flex md:block w-full gap-2">
                            <div className="w-auto border md:border-slate-200 rounded-md text-sm px-1 lg:mt-3 nunito font-semibold">
                              Al Falaq : {surat.nomor}
                            </div>
                          </div>
                        </div>

                        <div
                          className="arab w-full lg:mt-5"
                          style={{ fontSize: option.ar + "px" }}
                        >
                          {surat.ar}
                          <span className="relative"> ۝</span>
                        </div>
                        <p
                          className="w-full text-left mt-2 text-[15px] lg:mt-7 nunito"
                          style={{ fontSize: option.id + "px" }}
                        >
                          {surat.idn}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <div className="flex flex-col items-center mt-10 mb-2 font-semibold">
                    <span className="border border-slate-400 px-3 py-1 rounded-md">
                      Surat An Nas (1-6) - 3X
                    </span>
                    <span
                      className="arab"
                      style={{ fontSize: option.ar + "px" }}
                    >
                      بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                    </span>
                  </div>

                  <div className="border border-slate-300 rounded-lg overflow-hidden">
                    {data.annas.map((surat) => (
                      <div
                        className="px-5 flex flex-wrap justify-end md:h-full md:items-center [&:not(:last-child)]:border-b border-slate-300 dark:border-slate-400/80 pt-14 pb-5 md:py-9 relative"
                        key={Math.random(20)}
                      >
                        <div className="text-xl md:ml-5 flex justify-between md:block gap-1 px-3 top-2 w-full mb-3 md:w-fit md:mb-0 md:px-0 absolute left-0 border-b border-dashed border-slate-200 pb-2 md:border-0">
                          <div className="flex md:block w-full gap-2">
                            <div className="w-auto border md:border-slate-200 rounded-md text-sm px-1 lg:mt-3 nunito font-semibold">
                              An Nas : {surat.nomor}
                            </div>
                          </div>
                        </div>

                        <div
                          className="arab w-full lg:mt-5"
                          style={{ fontSize: option.ar + "px" }}
                        >
                          {surat.ar}
                          <span className="relative"> ۝</span>
                        </div>
                        <p
                          className="w-full text-left mt-2 text-[15px] lg:mt-7 nunito"
                          style={{ fontSize: option.id + "px" }}
                        >
                          {surat.idn}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {data.almatsurat.map((surat) => (
                  <section key={Math.random(20)}>
                    <div className="flex flex-col items-center mt-10 mb-2 font-semibold">
                      <span className="border border-slate-400 px-3 py-1 rounded-md">
                        {surat.heading}
                      </span>
                    </div>

                    <div className="border border-slate-300 rounded-lg overflow-hidden">
                      <div className="px-5 flex flex-wrap justify-end md:h-full md:items-center [&:not(:last-child)]:border-b border-slate-300 dark:border-slate-400/80 pt-14 pb-5 md:py-9 relative">
                        <div className="text-xl md:ml-5 flex justify-between md:block gap-1 px-3 top-2 w-full mb-3 md:w-fit md:mb-0 md:px-0 absolute left-0 border-b border-dashed border-slate-200 pb-2 md:border-0">
                          <div className="flex md:block w-full gap-2">
                            <div className="w-auto border md:border-slate-200 rounded-md text-sm px-1 lg:mt-3 nunito font-semibold">
                              Al-Matsurat
                            </div>
                          </div>
                        </div>

                        <div
                          className="arab w-full lg:mt-5"
                          style={{ fontSize: option.ar + "px" }}
                        >
                          {surat.ar}
                          <span className="relative"> ۝</span>
                        </div>
                        <p
                          className="w-full text-left mt-2 text-[15px] lg:mt-7 nunito"
                          style={{ fontSize: option.id + "px" }}
                        >
                          {surat.idn}
                        </p>
                      </div>
                    </div>
                  </section>
                ))}

                <section>
                  <div className="flex flex-col items-center mt-10 mb-2 font-semibold">
                    <span className="border border-slate-400 px-3 py-1 rounded-md">
                      Surat Ali Imron (26-27) - 1X
                    </span>
                  </div>

                  <div className="border border-slate-300 rounded-lg overflow-hidden">
                    {data.aliimron.map((surat) => (
                      <div
                        className="px-5 flex flex-wrap justify-end md:h-full md:items-center [&:not(:last-child)]:border-b border-slate-300 dark:border-slate-400/80 pt-14 pb-5 md:py-9 relative"
                        key={Math.random(20)}
                      >
                        <div className="text-xl md:ml-5 flex justify-between md:block gap-1 px-3 top-2 w-full mb-3 md:w-fit md:mb-0 md:px-0 absolute left-0 border-b border-dashed border-slate-200 pb-2 md:border-0">
                          <div className="flex md:block w-full gap-2">
                            <div className="w-auto border md:border-slate-200 rounded-md text-sm px-1 lg:mt-3 nunito font-semibold">
                              Ali Imron : {surat.nomor}
                            </div>
                          </div>
                        </div>

                        <div
                          className="arab w-full lg:mt-5"
                          style={{ fontSize: option.ar + "px" }}
                        >
                          {surat.ar}
                          <span className="relative"> ۝</span>
                        </div>
                        <p
                          className="w-full text-left mt-2 text-[15px] lg:mt-7 nunito"
                          style={{ fontSize: option.id + "px" }}
                        >
                          {surat.idn}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
                <section>
                  <div className="flex flex-col items-center mt-10 mb-2 font-semibold">
                    <span className="border border-slate-400 px-3 py-1 rounded-md">
                      Do'a Robithoh - 3X
                    </span>
                  </div>

                  <div className="border border-slate-300 rounded-lg overflow-hidden">
                    {data.robithoh.map((surat) => (
                      <div
                        className="px-5 flex flex-wrap justify-end md:h-full md:items-center [&:not(:last-child)]:border-b border-slate-300 dark:border-slate-400/80 pt-14 pb-5 md:py-9 relative"
                        key={Math.random(20)}
                      >
                        <div className="text-xl md:ml-5 flex justify-between md:block gap-1 px-3 top-2 w-full mb-3 md:w-fit md:mb-0 md:px-0 absolute left-0 border-b border-dashed border-slate-200 pb-2 md:border-0">
                          <div className="flex md:block w-full gap-2">
                            <div className="w-auto border md:border-slate-200 rounded-md text-sm px-1 lg:mt-3 nunito font-semibold">
                              Do'a Robithoh
                            </div>
                          </div>
                        </div>

                        <div
                          className="arab w-full lg:mt-5"
                          style={{ fontSize: option.ar + "px" }}
                        >
                          {surat.ar}
                          <span className="relative"> ۝</span>
                        </div>
                        <p
                          className="w-full text-left mt-2 text-[15px] lg:mt-7 nunito"
                          style={{ fontSize: option.id + "px" }}
                        >
                          {surat.idn}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}
            {activeTab === 1 && (
              <div className="sore hari">
                <section>
                  <div className="flex flex-col items-center mt-10 mb-2 font-semibold">
                    <span className="border border-slate-400 px-3 py-1 rounded-md">
                      Surat Al Fatihah - 1X
                    </span>
                  </div>

                  <div className="border border-slate-300 rounded-lg overflow-hidden">
                    {data.alfatihah.map((surat) => (
                      <div
                        className="px-5 flex flex-wrap justify-end md:h-full md:items-center [&:not(:last-child)]:border-b border-slate-300 dark:border-slate-400/80 pt-14 pb-5 md:py-9 relative"
                        key={Math.random(20)}
                      >
                        <div className="text-xl md:ml-5 flex justify-between md:block gap-1 px-3 top-2 w-full mb-3 md:w-fit md:mb-0 md:px-0 absolute left-0 border-b border-dashed border-slate-200 pb-2 md:border-0">
                          <div className="flex md:block w-full gap-2">
                            <div className="w-auto border md:border-slate-200 rounded-md text-sm px-1 lg:mt-3 nunito font-semibold">
                              Al Fatihah : {surat.nomor}
                            </div>
                          </div>
                        </div>

                        <div
                          className="arab w-full lg:mt-5"
                          style={{ fontSize: option.ar + "px" }}
                        >
                          {surat.ar}
                          <span className="relative"> ۝</span>
                        </div>
                        <p
                          className="w-full text-left mt-2 text-[15px] lg:mt-7 nunito"
                          style={{ fontSize: option.id + "px" }}
                        >
                          {surat.idn}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <div className="flex flex-col items-center mt-10 mb-2 font-semibold">
                    <span className="border border-slate-400 px-3 py-1 rounded-md">
                      Surat Al Baqarah (1-5) - 1X
                    </span>
                    <span
                      className="arab"
                      style={{ fontSize: option.ar + "px" }}
                    >
                      بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                    </span>
                  </div>

                  <div className="border border-slate-300 rounded-lg overflow-hidden">
                    {data.albaqarah15.map((surat) => (
                      <div
                        className="px-5 flex flex-wrap justify-end md:h-full md:items-center [&:not(:last-child)]:border-b border-slate-300 dark:border-slate-400/80 pt-14 pb-5 md:py-9 relative"
                        key={Math.random(20)}
                      >
                        <div className="text-xl md:ml-5 flex justify-between md:block gap-1 px-3 top-2 w-full mb-3 md:w-fit md:mb-0 md:px-0 absolute left-0 border-b border-dashed border-slate-200 pb-2 md:border-0">
                          <div className="flex md:block w-full gap-2">
                            <div className="w-auto border md:border-slate-200 rounded-md text-sm px-1 lg:mt-3 nunito font-semibold">
                              Al Baqarah : {surat.nomor}
                            </div>
                          </div>
                        </div>

                        <div
                          className="arab w-full lg:mt-5"
                          style={{ fontSize: option.ar + "px" }}
                        >
                          {surat.ar}
                          <span className="relative"> ۝</span>
                        </div>
                        <p
                          className="w-full text-left mt-2 text-[15px] lg:mt-7 nunito"
                          style={{ fontSize: option.id + "px" }}
                        >
                          {surat.idn}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <div className="flex flex-col items-center mt-10 mb-2 font-semibold">
                    <span className="border border-slate-400 px-3 py-1 rounded-md">
                      Surat Al Baqarah (255-257) - 1X
                    </span>
                  </div>

                  <div className="border border-slate-300 rounded-lg overflow-hidden">
                    {data.albaqarah255_257.map((surat) => (
                      <div
                        className="px-5 flex flex-wrap justify-end md:h-full md:items-center [&:not(:last-child)]:border-b border-slate-300 dark:border-slate-400/80 pt-14 pb-5 md:py-9 relative"
                        key={Math.random(20)}
                      >
                        <div className="text-xl md:ml-5 flex justify-between md:block gap-1 px-3 top-2 w-full mb-3 md:w-fit md:mb-0 md:px-0 absolute left-0 border-b border-dashed border-slate-200 pb-2 md:border-0">
                          <div className="flex md:block w-full gap-2">
                            <div className="w-auto border md:border-slate-200 rounded-md text-sm px-1 lg:mt-3 nunito font-semibold">
                              Al Baqarah : {surat.nomor}
                            </div>
                          </div>
                        </div>

                        <div
                          className="arab w-full lg:mt-5"
                          style={{ fontSize: option.ar + "px" }}
                        >
                          {surat.ar}
                          <span className="relative"> ۝</span>
                        </div>
                        <p
                          className="w-full text-left mt-2 text-[15px] lg:mt-7 nunito"
                          style={{ fontSize: option.id + "px" }}
                        >
                          {surat.idn}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <div className="flex flex-col items-center mt-10 mb-2 font-semibold">
                    <span className="border border-slate-400 px-3 py-1 rounded-md">
                      Surat Al Baqarah (284-286) - 1X
                    </span>
                  </div>

                  <div className="border border-slate-300 rounded-lg overflow-hidden">
                    {data.albaqarah284_286.map((surat) => (
                      <div
                        className="px-5 flex flex-wrap justify-end md:h-full md:items-center [&:not(:last-child)]:border-b border-slate-300 dark:border-slate-400/80 pt-14 pb-5 md:py-9 relative"
                        key={Math.random(20)}
                      >
                        <div className="text-xl md:ml-5 flex justify-between md:block gap-1 px-3 top-2 w-full mb-3 md:w-fit md:mb-0 md:px-0 absolute left-0 border-b border-dashed border-slate-200 pb-2 md:border-0">
                          <div className="flex md:block w-full gap-2">
                            <div className="w-auto border md:border-slate-200 rounded-md text-sm px-1 lg:mt-3 nunito font-semibold">
                              Al Baqarah : {surat.nomor}
                            </div>
                          </div>
                        </div>

                        <div
                          className="arab w-full lg:mt-5"
                          style={{ fontSize: option.ar + "px" }}
                        >
                          {surat.ar}
                          <span className="relative"> ۝</span>
                        </div>
                        <p
                          className="w-full text-left mt-2 text-[15px] lg:mt-7 nunito"
                          style={{ fontSize: option.id + "px" }}
                        >
                          {surat.idn}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <div className="flex flex-col items-center mt-10 mb-2 font-semibold">
                    <span className="border border-slate-400 px-3 py-1 rounded-md">
                      Surat Al Ikhlas (1-4) - 3X
                    </span>
                    <span
                      className="arab"
                      style={{ fontSize: option.ar + "px" }}
                    >
                      بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                    </span>
                  </div>

                  <div className="border border-slate-300 rounded-lg overflow-hidden">
                    {data.alikhlas.map((surat) => (
                      <div
                        className="px-5 flex flex-wrap justify-end md:h-full md:items-center [&:not(:last-child)]:border-b border-slate-300 dark:border-slate-400/80 pt-14 pb-5 md:py-9 relative"
                        key={Math.random(20)}
                      >
                        <div className="text-xl md:ml-5 flex justify-between md:block gap-1 px-3 top-2 w-full mb-3 md:w-fit md:mb-0 md:px-0 absolute left-0 border-b border-dashed border-slate-200 pb-2 md:border-0">
                          <div className="flex md:block w-full gap-2">
                            <div className="w-auto border md:border-slate-200 rounded-md text-sm px-1 lg:mt-3 nunito font-semibold">
                              Al Ikhlas : {surat.nomor}
                            </div>
                          </div>
                        </div>

                        <div
                          className="arab w-full lg:mt-5"
                          style={{ fontSize: option.ar + "px" }}
                        >
                          {surat.ar}
                          <span className="relative"> ۝</span>
                        </div>
                        <p
                          className="w-full text-left mt-2 text-[15px] lg:mt-7 nunito"
                          style={{ fontSize: option.id + "px" }}
                        >
                          {surat.idn}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <div className="flex flex-col items-center mt-10 mb-2 font-semibold">
                    <span className="border border-slate-400 px-3 py-1 rounded-md">
                      Surat Al Falaq (1-5) - 3X
                    </span>
                    <span
                      className="arab"
                      style={{ fontSize: option.ar + "px" }}
                    >
                      بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                    </span>
                  </div>

                  <div className="border border-slate-300 rounded-lg overflow-hidden">
                    {data.alfalaq.map((surat) => (
                      <div
                        className="px-5 flex flex-wrap justify-end md:h-full md:items-center [&:not(:last-child)]:border-b border-slate-300 dark:border-slate-400/80 pt-14 pb-5 md:py-9 relative"
                        key={Math.random(20)}
                      >
                        <div className="text-xl md:ml-5 flex justify-between md:block gap-1 px-3 top-2 w-full mb-3 md:w-fit md:mb-0 md:px-0 absolute left-0 border-b border-dashed border-slate-200 pb-2 md:border-0">
                          <div className="flex md:block w-full gap-2">
                            <div className="w-auto border md:border-slate-200 rounded-md text-sm px-1 lg:mt-3 nunito font-semibold">
                              Al Falaq : {surat.nomor}
                            </div>
                          </div>
                        </div>

                        <div
                          className="arab w-full lg:mt-5"
                          style={{ fontSize: option.ar + "px" }}
                        >
                          {surat.ar}
                          <span className="relative"> ۝</span>
                        </div>
                        <p
                          className="w-full text-left mt-2 text-[15px] lg:mt-7 nunito"
                          style={{ fontSize: option.id + "px" }}
                        >
                          {surat.idn}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <div className="flex flex-col items-center mt-10 mb-2 font-semibold">
                    <span className="border border-slate-400 px-3 py-1 rounded-md">
                      Surat An Nas (1-6) - 3X
                    </span>
                    <span
                      className="arab"
                      style={{ fontSize: option.ar + "px" }}
                    >
                      بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                    </span>
                  </div>

                  <div className="border border-slate-300 rounded-lg overflow-hidden">
                    {data.annas.map((surat) => (
                      <div
                        className="px-5 flex flex-wrap justify-end md:h-full md:items-center [&:not(:last-child)]:border-b border-slate-300 dark:border-slate-400/80 pt-14 pb-5 md:py-9 relative"
                        key={Math.random(20)}
                      >
                        <div className="text-xl md:ml-5 flex justify-between md:block gap-1 px-3 top-2 w-full mb-3 md:w-fit md:mb-0 md:px-0 absolute left-0 border-b border-dashed border-slate-200 pb-2 md:border-0">
                          <div className="flex md:block w-full gap-2">
                            <div className="w-auto border md:border-slate-200 rounded-md text-sm px-1 lg:mt-3 nunito font-semibold">
                              An Nas : {surat.nomor}
                            </div>
                          </div>
                        </div>

                        <div
                          className="arab w-full lg:mt-5"
                          style={{ fontSize: option.ar + "px" }}
                        >
                          {surat.ar}
                          <span className="relative"> ۝</span>
                        </div>
                        <p
                          className="w-full text-left mt-2 text-[15px] lg:mt-7 nunito"
                          style={{ fontSize: option.id + "px" }}
                        >
                          {surat.idn}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {data.almatsuratsore.map((surat) => (
                  <section key={Math.random(20)}>
                    <div className="flex flex-col items-center mt-10 mb-2 font-semibold">
                      <span className="border border-slate-400 px-3 py-1 rounded-md">
                        {surat.heading}
                      </span>
                    </div>

                    <div className="border border-slate-300 rounded-lg overflow-hidden">
                      <div className="px-5 flex flex-wrap justify-end md:h-full md:items-center [&:not(:last-child)]:border-b border-slate-300 dark:border-slate-400/80 pt-14 pb-5 md:py-9 relative">
                        <div className="text-xl md:ml-5 flex justify-between md:block gap-1 px-3 top-2 w-full mb-3 md:w-fit md:mb-0 md:px-0 absolute left-0 border-b border-dashed border-slate-200 pb-2 md:border-0">
                          <div className="flex md:block w-full gap-2">
                            <div className="w-auto border md:border-slate-200 rounded-md text-sm px-1 lg:mt-3 nunito font-semibold">
                              Al-Matsurat
                            </div>
                          </div>
                        </div>

                        <div
                          className="arab w-full lg:mt-5"
                          style={{ fontSize: option.ar + "px" }}
                        >
                          {surat.ar}
                          <span className="relative"> ۝</span>
                        </div>
                        <p
                          className="w-full text-left mt-2 text-[15px] lg:mt-7 nunito"
                          style={{ fontSize: option.id + "px" }}
                        >
                          {surat.idn}
                        </p>
                      </div>
                    </div>
                  </section>
                ))}

                <section>
                  <div className="flex flex-col items-center mt-10 mb-2 font-semibold">
                    <span className="border border-slate-400 px-3 py-1 rounded-md">
                      Surat Ali Imron (26-27) - 1X
                    </span>
                  </div>

                  <div className="border border-slate-300 rounded-lg overflow-hidden">
                    {data.aliimron.map((surat) => (
                      <div
                        className="px-5 flex flex-wrap justify-end md:h-full md:items-center [&:not(:last-child)]:border-b border-slate-300 dark:border-slate-400/80 pt-14 pb-5 md:py-9 relative"
                        key={Math.random(20)}
                      >
                        <div className="text-xl md:ml-5 flex justify-between md:block gap-1 px-3 top-2 w-full mb-3 md:w-fit md:mb-0 md:px-0 absolute left-0 border-b border-dashed border-slate-200 pb-2 md:border-0">
                          <div className="flex md:block w-full gap-2">
                            <div className="w-auto border md:border-slate-200 rounded-md text-sm px-1 lg:mt-3 nunito font-semibold">
                              Ali Imron : {surat.nomor}
                            </div>
                          </div>
                        </div>

                        <div
                          className="arab w-full lg:mt-5"
                          style={{ fontSize: option.ar + "px" }}
                        >
                          {surat.ar}
                          <span className="relative"> ۝</span>
                        </div>
                        <p
                          className="w-full text-left mt-2 text-[15px] lg:mt-7 nunito"
                          style={{ fontSize: option.id + "px" }}
                        >
                          {surat.idn}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <div className="flex flex-col items-center mt-10 mb-2 font-semibold">
                    <span className="border border-slate-400 px-3 py-1 rounded-md">
                      Do'a Robithoh - 3X
                    </span>
                  </div>

                  <div className="border border-slate-300 rounded-lg overflow-hidden">
                    {data.robithohsore.map((surat) => (
                      <div
                        className="px-5 flex flex-wrap justify-end md:h-full md:items-center [&:not(:last-child)]:border-b border-slate-300 dark:border-slate-400/80 pt-14 pb-5 md:py-9 relative"
                        key={Math.random(20)}
                      >
                        <div className="text-xl md:ml-5 flex justify-between md:block gap-1 px-3 top-2 w-full mb-3 md:w-fit md:mb-0 md:px-0 absolute left-0 border-b border-dashed border-slate-200 pb-2 md:border-0">
                          <div className="flex md:block w-full gap-2">
                            <div className="w-auto border md:border-slate-200 rounded-md text-sm px-1 lg:mt-3 nunito font-semibold">
                              Do'a Robithoh
                            </div>
                          </div>
                        </div>

                        <div
                          className="arab w-full lg:mt-5"
                          style={{ fontSize: option.ar + "px" }}
                        >
                          {surat.ar}
                          <span className="relative"> ۝</span>
                        </div>
                        <p
                          className="w-full text-left mt-2 text-[15px] lg:mt-7 nunito"
                          style={{ fontSize: option.id + "px" }}
                        >
                          {surat.idn}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default memo(Matsurat);
