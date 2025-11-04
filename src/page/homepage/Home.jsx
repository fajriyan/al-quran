import { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import HomeView from "./HomeView";
import ProgresContext from "../../lib/ProgresContext";
import numbertosurah from "../../data/numbertosurah.json";
import Fuse from "fuse.js";
import { useChangelog, useSurah } from "../../hooks/global";

const Home = () => {
  const [_, setProgressBar] = useContext(ProgresContext);
  const [querySearch, setQuerySearch] = useState("");
  const [showBT, setShowBT] = useState("");
  const [filteredDatas, setFilteredData] = useState([]);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [loadingIndex, setLoadingIndex] = useState(null);
  const audioRefs = useRef([]);
  const [audioInfo, setAudioInfo] = useState(
    filteredDatas.map(() => ({ currentTime: 0, duration: 0, isPlaying: false }))
  );
  const RekomendationSurah = [
    { surah: "Al Kahf", url: "18" },
    { surah: "Al Matsurat", url: "matsurat", ex: "nosurah" },
    { surah: "Al Mulk", url: "67" },
    { surah: "Yasin", url: "36" },
    { surah: "Quiz", url: "quiz", ex: "nosurah" },
  ];

  const lanjutBaca = [
    {
      surat: localStorage.getItem("namaSurat"),
      url: localStorage.getItem("url"),
      ayat: localStorage.getItem("ayat"),
    },
  ];

  const { loading: Loading, dataSurah: dataSurat } = useSurah();
  const { dataChangelog } = useChangelog({
    first: true,
  });

  const removeBookmark = () => {
    localStorage.removeItem("ayat");
    localStorage.removeItem("url");
    localStorage.removeItem("namaSurat");
    toast("Bookmark Berhasil diHapus!", {
      icon: "🗑",
    });
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

  window.onscroll = function () {
    scrollFunction();
  };

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

  useEffect(() => {
    const audios = audioRefs.current;
    audios.forEach((audio, i) => {
      if (audio) {
        // Saat mulai load
        audio.addEventListener("loadstart", () => {
          setLoadingIndex(i);
        });

        // Saat sudah bisa dimainkan
        audio.addEventListener("canplaythrough", () => {
          setLoadingIndex(null);
        });

        // Pastikan audio lain pause saat satu diputar
        audio.addEventListener("play", () => {
          audios.forEach((a) => {
            if (a !== audio) a.pause();
          });
        });
      }
    });
    setProgressBar(false);
  }, [filteredDatas]);

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
        skeletonLoad={[1, 2, 3, 4, 5, 6]}
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
        loadingIndex={loadingIndex}
        dataChangelog={dataChangelog}
      />
    </>
  );
};
export default Home;
