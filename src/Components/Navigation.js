const Navigation = (props) => {
  return (
    <div className="backdrop-blur-sm bg-white/80 border-b-2 sticky top-0 drop-shadow-md z-[100]">
      <div className="navbar container mx-auto  ">
        <div className="flex-1">
          <a
            href="/"
            className="btn gap-2 btn-md border-none bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-sky-400 to-blue-800 hover:bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] hover:from-sky-300 hover:to-blue-700 focus:ring-2 ring-offset-2 ring-blue-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-left-square-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1z" />
            </svg>
            Kembali
          </a>

          {props.loadP ? (
            <>
              <div className="ml-2 md:ml-7 nunito text-xl">
                <h1 className="-mb-2 font-bold">{props.suratP}</h1>
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
          <ul className="menu menu-horizontal">
            <li tabIndex={0}>
              <a>
                Ayat
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </a>

              <ul className="p-2 backdrop-blur-sm bg-white/90 border-b-2 overflow-y-scroll max-h-[350px] min-w-[100px]">
                {props.singleSP.map((sp) => (
                  <li key={sp.nomor}>
                    <a href={"/surat/" + sp.surah + "#" + sp.nomor}>
                      {sp.nomor}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Navigation;
