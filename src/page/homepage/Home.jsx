import { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import HomeView from "./HomeView";
import ProgresContext from "../../lib/ProgresContext";
import numbertosurah from "../../data/numbertosurah.json";
import Fuse from "fuse.js";

const Home = () => {
  const [Loading, setLoading] = useState(false);
  const [_, setProgressBar] = useContext(ProgresContext);
  const [dataSurat, setSurat] = useState([]);
  const skeletonLoad = [1, 2, 3, 4, 5, 6];
  const [querySearch, setQuerySearch] = useState("");
  const [showBT, setShowBT] = useState("");
  const [filteredDatas, setFilteredData] = useState([]);

  const getSurah = async () => {
    const Req = await fetch("https://equran.id/api/surat");
    const Res = await Req.json();
    setLoading(true);
    setSurat(Res);
    // setFilteredData(data); 
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
    { surah: "Al Matsurat", url: "matsurat", ex: "nosurah" },
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

  useEffect(() => {
    if (!querySearch) {
      setFilteredData(dataSurat);
    } else {
      const fuse = new Fuse(dataSurat, {
        keys: ["nama_latin", "arti", "nama"],
        threshold: 0.3,
      });
      const results = fuse.search(querySearch);
      setFilteredData(results.map((r) => r.item));
    }
  }, [querySearch, dataSurat]);

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

  // const filteredData = dataSurat.filter((QF) => {
  //   if (!querySearch) {
  //     return QF;
  //   } else if (
  //     QF.nama_latin.toLowerCase().includes(querySearch.toLowerCase())
  //   ) {
  //     return QF;
  //   }
  // });

  const [playingIndex, setPlayingIndex] = useState(null);

  const [audioInfo, setAudioInfo] = useState(
    filteredDatas.map(() => ({ currentTime: 0, duration: 0, isPlaying: false }))
  );

  const audioRefs = useRef([]);

  const toggleAudio = (index) => {
    const audio = audioRefs.current[index];
    if (audio) {
      if (audio.paused) {
        audio.play();
        setPlayingIndex(index);
      } else {
        audio.pause();
        setPlayingIndex(null);
      }
    }
  };

  const handleTimeUpdate = (index) => {
    const audio = audioRefs.current[index];
    if (audio) {
      const updatedAudioInfo = [...audioInfo];
      updatedAudioInfo[index] = {
        ...updatedAudioInfo[index],
        currentTime: audio.currentTime,
      };
      setAudioInfo(updatedAudioInfo);
    }
  };

  const handleLoadedMetadata = (index) => {
    const audio = audioRefs.current[index];
    if (audio) {
      const updatedAudioInfo = [...audioInfo];
      updatedAudioInfo[index] = {
        ...updatedAudioInfo[index],
        duration: audio.duration,
      };
      setAudioInfo(updatedAudioInfo);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <>
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
        filteredData={filteredDatas}
        numbertosurah={numbertosurah}
        audioInfo={audioInfo}
        audioRefs={audioRefs}
        formatTime={formatTime}
        handleLoadedMetadata={handleLoadedMetadata}
        handleTimeUpdate={handleTimeUpdate}
        playingIndex={playingIndex}
        setAudioInfo={setAudioInfo}
        setPlayingIndex={setPlayingIndex}
        toggleAudio={toggleAudio}
      />
    </>
  );
};
export default Home;
