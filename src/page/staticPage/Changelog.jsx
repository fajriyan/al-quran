import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const Changelog = () => {
  const dataChangelog = [
    {
      id: "C192009",
      author: "fajriyan",
      date: "19/04/2024",
      version: "1.7.0",
      description: "clean up folder structure and code",
    },
    {
      id: "C192008",
      author: "fajriyan",
      date: "15/01/2024",
      version: "1.6.9",
      description: "create page changelog and fixing error",
    },
    {
      id: "C192007",
      author: "fajriyan",
      date: "15/01/2024",
      version: "1.6.5",
      description: "add tafsir per ayat",
    },
    {
      id: "C192006",
      author: "fajriyan",
      date: "15/01/2024",
      version: "1.6.2",
      description: "update some function page home and single surah",
    },
    {
      id: "C192005",
      author: "fajriyan",
      date: "15/01/2024",
      version: "1.6.0",
      description: " fix error and layout tablet",
    },
    {
      id: "C192004",
      author: "fajriyan",
      date: "15/01/2024",
      version: "1.5.9",
      description: "Improve UI and fix some error in console",
    },
    {
      id: "C192003",
      author: "fajriyan",
      date: "15/01/2024",
      version: "1.5.5",
      description: " Fixing structure folder",
    },
    {
      id: "C192002",
      author: "fajriyan",
      date: "15/01/2024",
      version: "1.5.2",
      description: "Improve SEO and update ui mobile",
    },
    {
      id: "C192001",
      author: "fajriyan",
      date: "15/01/2024",
      version: "1.5.0",
      description: " Migrate to Vite and fix 9 vulnerabilities",
    },
  ];

  return (
    <>
      {/* Helmet Start  */}
      <Helmet>
        <meta charSet="utf-8" />
        <title>Changelog Website Al-Quran</title>
        <link rel="canonical" href={"https://al-quran.pages.dev/changelog"} />
      </Helmet>

      {/* Helmet End  */}
      <div className="container mx-auto py-5 px-3 md:px-0">
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
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead class="text-left">
                <tr>
                  <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    ID
                  </th>
                  <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Author
                  </th>
                  <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Date
                  </th>
                  <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Version
                  </th>
                  <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Description
                  </th>
                </tr>
              </thead>

              <tbody class="divide-y divide-gray-200">
                {dataChangelog.map((data, i) => (
                  <tr key={Math.random(19) + data.id}>
                    <td class="px-4 py-2 font-medium text-gray-900">
                      {data.id}
                    </td>
                    <td class="px-4 py-2 text-gray-700">{data.author}</td>
                    <td class="px-4 py-2 text-gray-700">{data.date}</td>
                    <td class="px-4 py-2 text-gray-700">{data.version}</td>
                    <td class="px-4 py-2 text-gray-700">{data.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6">
            <a
              href="https://github.com/fajriyan/al-quran/issues/new"
              className="px-5 py-2 rounded-md bg-slate-800 hover:bg-slate-900 font-medium text-white "
            >
              Tambah Fitur
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Changelog;
