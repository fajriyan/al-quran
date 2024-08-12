import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import HomeView from "./HomeView";
import ProgresContext from "../../lib/ProgresContext";
import datasurah from "../../data/datasurah";
import ThemeContext from "../../lib/ThemeContext";

const Home = () => {
  const [Loading, setLoading] = useState(false);
  const [_, setProgressBar] = useContext(ProgresContext);
  const [dataSurat, setSurat] = useState([]);
  const skeletonLoad = [1, 2, 3, 4, 5];
  const [querySearch, setQuerySearch] = useState("");
  const [showBT, setShowBT] = useState("");

  const getSurah = async () => {
    const Req = await fetch("https://equran.id/api/surat");
    const Res = await Req.json();
    setLoading(true);
    setSurat(Res);
  };

  const removeBookmark = () => {
    localStorage.removeItem("ayat");
    localStorage.removeItem("url");
    localStorage.removeItem("namaSurat");
    toast("Bookmark Berhasil diHapus!", {
      icon: "🗑",
    });
  };

  const RekomendationSurah = [
    { surah: "Al Kahf", url: "18" },
    { surah: "Al Mulk", url: "67" },
    { surah: "Yasin", url: "36" },
  ];

  const lanjutBaca = [
    {
      surat: localStorage.getItem("namaSurat"),
      url: localStorage.getItem("url"),
      ayat: localStorage.getItem("ayat"),
    },
  ];

  useEffect(() => {
    getSurah()
      .then(setProgressBar(false))
      .finally(window.scrollTo({ top: 0 }));
  }, []);

  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 300 ||
      document.documentElement.scrollTop > 300
    ) {
      setShowBT(true);
    } else {
      setShowBT(false);
    }
  }

  const filteredData = dataSurat.filter((QF) => {
    if (!querySearch) {
      return QF;
    } else if (
      QF.nama_latin.toLowerCase().includes(querySearch.toLowerCase())
    ) {
      return QF;
    }
  });

  return (
    <>
      {/* <LinkChange ></LinkChange> */}
      <HomeView
        Loading={Loading}
        RekomendationSurah={RekomendationSurah}
        dataSurat={dataSurat}
        lanjutBaca={lanjutBaca}
        querySearch={querySearch}
        setQuerySearch={setQuerySearch}
        removeBookmark={removeBookmark}
        showBT={showBT}
        skeletonLoad={skeletonLoad}
        filteredData={filteredData}
      />
    </>
  );
};
export default Home;
