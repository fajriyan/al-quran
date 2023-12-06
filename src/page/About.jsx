import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      {window.scrollTo({ top: 0 })}
      {/* Helmet Start  */}
      <Helmet>
        <meta charSet="utf-8" />
        <title>Tentang Quran Digital</title>
        <link rel="canonical" href={"https://al-quran.pages.dev/about"} />
      </Helmet>

      {/* Helmet End  */}

      <div className="container mx-auto selection:bg-red-300">
        <div className="hero min-h-screen flex flex-wrap gap-1 justify-center content-center">
          <div className="px-3 md:px-0 w-full">
            <div className="border bg-base-300 rounded-lg">
              <div className="py-3 px-2">
                <Link
                  to="/"
                  className="flex gap-1 items-center w-max border border-slate-500 px-2 py-1 rounded-lg hover:bg-slate-200 hover:shadow-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="19"
                    fill="currentColor"
                    className="bi bi-caret-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M9.636 13.5a.5.5 0 0 1-.5.5H2.5A1.5 1.5 0 0 1 1 12.5v-10A1.5 1.5 0 0 1 2.5 1h10A1.5 1.5 0 0 1 14 2.5v6.636a.5.5 0 0 1-1 0V2.5a.5.5 0 0 0-.5-.5h-10a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h6.636a.5.5 0 0 1 .5.5"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M5 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1H6.707l8.147 8.146a.5.5 0 0 1-.708.708L6 6.707V10.5a.5.5 0 0 1-1 0z"
                    />
                  </svg>
                  Kembali ke Al Qur'an
                </Link>
              </div>
              <div className="flex flex-wrap md:flex-nowrap justify-start md:justify-center px-4 py-10 md:py-16 bg-base-200 gap-5">
                <div className="w-32 md:w-96">
                  <img
                    src="/public/favicon.png"
                    alt="Logo Website Al Qur'an"
                    className="hover:shadow-xl rounded-full"
                  />
                </div>
                <div>
                  <h1 className="hidden">
                    Al quran Online | Baca Quran Praktis Tanpa Install Aplikasi
                  </h1>
                  <h2 className="text-3xl md:text-5xl font-bold">
                    Project Al Qur'an
                  </h2>
                  <p className="py-6 w-full lg:w-[90%]">
                    Ini adalah sebuah project yang dimulai dari keinginan untuk
                    bisa melakukan <i>copy</i> ayat{" "}
                    <span className="underline decoration-wavy decoration-indigo-600">
                      Al-Qur'an
                    </span>{" "}
                    dengan mudah, dari gagasan ide itu kemudian dikembangkan
                    menjadi sebuah website full front end dengan menggunaan
                    Library{" "}
                    <span className="underline decoration-wavy decoration-pink-600">
                      React JS
                    </span>{" "}
                    + TailwindCSS dengan bantuan{" "}
                    <span className="underline decoration-wavy decoration-sky-600">
                      API
                    </span>
                    . Project ini tentunya tidak lepas dari banyak pihak yang
                    sudah membantu, sebagai berikut :
                  </p>
                  <div className="button-gr">
                    <a
                      href="http://linkedin.com/in/fajriyan/"
                      className="btn hover:bg-slate-900 shadow-lg"
                    >
                      Hubungi saya
                    </a>
                    <a
                      href="https://saweria.co/fajriyan"
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-outline ml-3"
                    >
                      Donasi
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center mt-10">
            <a
              href="#thanks"
              className="border rounded-full p-2 border-slate-500 hover:scroll-auto scale-100 hover:scale-110 ease-in-out duration-100 animate-bounce"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 16 16"
                stroke="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </a>
          </div>
        </div>

        <section className="h-[90vh] pt-5" id="thanks">
          <h2 className="text-center mb-8 mt-3 font-bold text-2xl font-serif">
            Thanks to
          </h2>
          <div className="grid grid-cols-1 px-3 lg:grid-cols-3 gap-4 mb-10">
            <div className="card w-full bg-white shadow-xl border-dashed border-[1px] ">
              <div className="card-body">
                <p className="text-left font-serif">Built using</p>
                <h3 className="card-title mb-0 font-serif -mt-[7px]">
                  ✨ React JS (CRA)
                </h3>

                <div className="flex gap-1">
                  <div className="badge badge-outline">Javascript</div>
                  <div className="badge badge-outline capitalize">Library</div>
                </div>

                <div className="card-actions justify-start">
                  <a
                    href="https://reactjs.org/"
                    className="btn btn-sm"
                    target="_blank"
                    rel="noreferrer"
                  >
                    reactjs.org
                  </a>
                </div>
              </div>
            </div>
            {/* <div className="card w-full bg-white shadow-xl border-dashed border-[1px] ">
              <div className="card-body">
                <p className="text-left font-serif">Hosting at</p>
                <h3 className="card-title mb-0 font-serif -mt-[7px]">
                  ⛅ Cloudflare
                </h3>

                <div className="flex gap-1">
                  <div className="badge badge-outline">Pages</div>
                  <div className="badge badge-outline capitalize">Security</div>
                </div>

                <div className="card-actions justify-start">
                  <a
                    href="https://www.cloudflare.com/"
                    className="btn btn-sm"
                    target="_blank"
                    rel="noreferrer"
                  >
                    cloudflare
                  </a>
                </div>
              </div>
            </div> */}
            <div className="card w-full bg-white shadow-xl border-dashed border-[1px]">
              <div className="card-body">
                <p className="text-left font-serif">
                  A utility-first CSS framework
                </p>
                <h3 className="card-title mb-0 font-serif -mt-[7px]">
                  🔆 Tailwind CSS
                </h3>
                <div className="flex gap-1">
                  <div className="badge badge-outline capitalize">
                    CSS framework
                  </div>
                </div>

                <div className="card-actions justify-start">
                  <a
                    href="https://tailwindcss.com/"
                    className="btn btn-sm"
                    target="_blank"
                    rel="noreferrer"
                  >
                    tailwindcss
                  </a>
                </div>
              </div>
            </div>
            <div className="card w-full bg-white shadow-xl border-dashed border-[1px]">
              <div className="card-body">
                <p className="text-left font-serif">UI components</p>
                <h3 className="card-title mb-0 font-serif -mt-[7px]">
                  🎊 daisyUI
                </h3>

                <div className="flex gap-1">
                  <div className="badge badge-outline">UI</div>
                  <div className="badge badge-outline capitalize">CSS</div>
                </div>

                <div className="card-actions justify-start">
                  <a
                    href="https://daisyui.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-sm"
                  >
                    daisyui
                  </a>
                </div>
              </div>
            </div>
            <div className="card w-full bg-white shadow-xl border-dashed border-[1px]">
              <div className="card-body">
                <p className="text-left font-serif">Source API from</p>
                <h3 className="card-title mb-0 font-serif -mt-[7px]">
                  📖 EQuran.id
                </h3>

                <div className="flex gap-1">
                  <div className="badge badge-outline">API</div>
                  <div className="badge badge-outline capitalize">OPEN API</div>
                </div>

                <div className="card-actions justify-start">
                  <a
                    href="https://equran.id/apidev"
                    className="btn btn-sm"
                    target="_blank"
                    rel="noreferrer"
                  >
                    equran.id
                  </a>
                </div>
              </div>
            </div>
            <div className="card w-full bg-white shadow-xl border-dashed border-[1px]">
              <div className="card-body">
                <p className="text-left font-serif">Arabic font used</p>
                <h3 className="card-title mb-0 font-serif -mt-[7px]">
                  💬 LPMQ
                </h3>

                <div className="flex gap-1">
                  <div className="badge badge-outline">FONT</div>
                </div>

                <div className="card-actions justify-start">
                  <a
                    href="https://lajnah.kemenag.go.id/unduhan/category/1-keputusan-menteri-agama.html"
                    className="btn btn-sm"
                    target="_blank"
                    rel="noreferrer"
                  >
                    kemenag
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
export default About;
