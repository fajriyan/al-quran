const About = () => {
  return (
    <>
      <div className="container mx-auto selection:bg-red-300">
        <div className="hero min-h-screen">
          <div className="hero-content flex-col lg:flex-row">
            <div className="mockup-window border bg-base-300">
              <div className="flex justify-center px-4 py-16 bg-base-200">
                <div>
                  <h1 className="text-3xl md:text-5xl font-bold">
                    Project{" "}
                    <a
                      href="/"
                      className="font-serif underline p-1  decoration-sky-600 hover:decoration-slate-800"
                    >
                      Al Qur'an
                    </a>
                  </h1>
                  <span className="label-text-alt ">
                    Built with ✨React by fajriyan
                  </span>
                  <p className="py-6 w-full lg:w-[90%]">
                    Ini adalah sebuah project yang dimulai dari keinginan untuk
                    bisa melakukan <i>copy</i> ayat{" "}
                    <a className="underline decoration-wavy decoration-indigo-600">
                      Al-Qur'an
                    </a>{" "}
                    dengan mudah, dari gagasan ide itu kemudian dikembangkan
                    menjadi sebuah website full front end dengan menggunaan
                    Library{" "}
                    <a className="underline decoration-wavy decoration-pink-600">
                      React JS
                    </a>{" "}
                    + TailwindCSS dengan bantuan{" "}
                    <a className="underline decoration-wavy decoration-sky-600">
                      API
                    </a>
                    . Project ini tentunya tidak lepas dari banyak pihak yang
                    sudah membantu, sebagai berikut :
                  </p>
                  <a
                    href="#thanks"
                    className="btn hover:bg-slate-900 shadow-lg"
                  >
                    Lihat Lebih
                  </a>
                  <a
                    href="http://linkedin.com/in/fajriyan/"
                    target="_blank"
                    className="btn btn-outline ml-3"
                  >
                    Hubungi saya
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section id="thanks">
          <h1 className="text-center mb-8 mt-3 font-bold text-2xl font-serif">
            Thanks to
          </h1>
          <div className="grid grid-cols-1 px-3 lg:grid-cols-3 gap-4 mb-10">
            <div className="card w-full bg-white shadow-xl border-dashed border-[1px] ">
              <div className="card-body">
                <p className="text-left font-serif">Built using</p>
                <h2 className="card-title mb-0 font-serif -mt-[7px]">
                  ✨ React JS
                </h2>

                <div className="flex gap-1">
                  <div className="badge badge-outline">Javascript</div>
                  <div className="badge badge-outline capitalize">Library</div>
                </div>

                <div className="card-actions justify-start">
                  <a
                    href="https://reactjs.org/"
                    className="btn btn-sm"
                    target="_blank"
                  >
                    reactjs.org
                  </a>
                </div>
              </div>
            </div>
            <div className="card w-full bg-white shadow-xl border-dashed border-[1px] ">
              <div className="card-body">
                <p className="text-left font-serif">Hosting at</p>
                <h2 className="card-title mb-0 font-serif -mt-[7px]">
                  ⛅ Cloudflare
                </h2>

                <div className="flex gap-1">
                  <div className="badge badge-outline">Pages</div>
                  <div className="badge badge-outline capitalize">Security</div>
                </div>

                <div className="card-actions justify-start">
                  <a
                    href="https://www.cloudflare.com/"
                    className="btn btn-sm"
                    target="_blank"
                  >
                    cloudflare
                  </a>
                </div>
              </div>
            </div>
            <div className="card w-full bg-white shadow-xl border-dashed border-[1px]">
              <div className="card-body">
                <p className="text-left font-serif">
                  A utility-first CSS framework
                </p>
                <h2 className="card-title mb-0 font-serif -mt-[7px]">
                  🔆 Tailwind CSS
                </h2>
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
                  >
                    tailwindcss
                  </a>
                </div>
              </div>
            </div>
            <div className="card w-full bg-white shadow-xl border-dashed border-[1px]">
              <div className="card-body">
                <p className="text-left font-serif">UI components</p>
                <h2 className="card-title mb-0 font-serif -mt-[7px]">
                  🎊 daisyUI
                </h2>

                <div className="flex gap-1">
                  <div className="badge badge-outline">UI</div>
                  <div className="badge badge-outline capitalize">CSS</div>
                </div>

                <div className="card-actions justify-start">
                  <a
                    href="https://daisyui.com/"
                    target="_blank"
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
                <h2 className="card-title mb-0 font-serif -mt-[7px]">
                  📖 EQuran.id
                </h2>

                <div className="flex gap-1">
                  <div className="badge badge-outline">API</div>
                  <div className="badge badge-outline capitalize">OPEN API</div>
                </div>

                <div className="card-actions justify-start">
                  <a
                    href="https://equran.id/apidev"
                    className="btn btn-sm"
                    target="_blank"
                  >
                    equran.id
                  </a>
                </div>
              </div>
            </div>
            <div className="card w-full bg-white shadow-xl border-dashed border-[1px]">
              <div className="card-body">
                <p className="text-left font-serif">Arabic font used</p>
                <h2 className="card-title mb-0 font-serif -mt-[7px]">
                  💬 LPMQ
                </h2>

                <div className="flex gap-1">
                  <div className="badge badge-outline">FONT</div>
                </div>

                <div className="card-actions justify-start">
                  <a
                    href="https://lajnah.kemenag.go.id/unduhan/category/1-keputusan-menteri-agama.html"
                    className="btn btn-sm"
                    target="_blank"
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
