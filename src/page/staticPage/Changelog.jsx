import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const SkeletonRow = () => (
  <tr>
    {[0, 1, 2, 3].map((i) => (
      <td key={i} className="border px-2 py-1">
        <div className="h-7 bg-gray-200 rounded animate-pulse"></div>
      </td>
    ))}
  </tr>
);

const Changelog = () => {
  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://api.github.com/repos/fajriyan/al-quran/commits")
      .then((res) => {
        if (!res.ok) throw new Error("Gagal fetch commit dari GitHub");
        return res.json();
      })
      .then((data) => {
        setCommits(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (error) return <p className="text-center py-5 text-red-500">{error}</p>;

  return (
    <>
      {/* Helmet Start  */}
      <Helmet>
        <meta charSet="utf-8" />
        <title>Changelog Website Al-Quran</title>
        <link rel="canonical" href={"https://al-quran.pages.dev/changelog"} />
      </Helmet>

      {/* Helmet End  */}
      <div className="container mx-auto py-5 px-3 md:px-0 min-h-screen">
        <div className="flex items-center gap-3">
          <Link to={"/"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-arrow-left-short hover:scale-110"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"
              />
              <path
                fill-rule="evenodd"
                d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"
              />
            </svg>
          </Link>
          <h1 className="font-bold text-lg">Changelog Al Quran Digital</h1>
        </div>

        <div className="mt-3">
          <div class="">
            <table className="w-full mt-5 mb-10 border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100 text-sm">
                  <th className="border px-2 py-1 w-[10%]">SHA</th>
                  <th className="border px-2 py-1 w-[10%]">Tanggal</th>
                  <th className="border px-2 py-1">Keterangan</th>
                  <th className="border px-2 py-1 w-[10%]">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {loading
                  ? Array.from({ length: 20 }).map((_, i) => (
                      <SkeletonRow key={i} />
                    ))
                  : commits.map((commit) => (
                      <tr key={commit.sha} className="text-sm">
                        <td className="border px-2 py-1 text-center">
                          {commit.sha.substring(0, 7)}
                        </td>
                        <td className="border px-2 py-1 text-center">
                          {new Date(
                            commit.commit.author.date
                          ).toLocaleDateString()}
                        </td>
                        <td className="border px-2 py-1">
                          {commit.commit.message}
                        </td>
                        <td className="border px-2 py-1 text-center">
                          <button
                            onClick={() =>
                              window.open(
                                `https://github.com/fajriyan/toolsz/commit/${commit.sha}`,
                                "_blank"
                              )
                            }
                            className="bg-black py-1 px-3 rounded-lg text-xs font-semibold text-white hover:bg-cyan-800"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>

          <div className="mt-3 mb-6">
            <a
              href="https://github.com/fajriyan/al-quran/issues/new"
              className="px-5 py-2 rounded-md bg-slate-800 hover:bg-slate-900 font-medium text-white "
            >
              Report Bug
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Changelog;
