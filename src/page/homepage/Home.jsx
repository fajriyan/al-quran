import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import HomeView from "./HomeView";

const Home = () => {
  const [Loading, setLoading] = useState(false);

  const [dataSurat, setSurat] = useState([]);
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
    getSurah();
  });

  const skeletonLoad = [1, 2, 3, 4, 5];
  const [querySearch, setQuerySearch] = useState("");

  window.onscroll = function () {
    scrollFunction();
  };

  const [showBT, setShowBT] = useState("");
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

  return (
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
    />
  );
};
export default Home;
