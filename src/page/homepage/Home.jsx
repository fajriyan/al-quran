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
  const [ramadhanInfo, setRamadhanInfo] = useState({
    ramadhanGregorian: null,
    ramadhanHijri: null,
    hijriYear: null,
    gregorianYear: null,
    timeLeft: null,
    isRamadhan: false,
  });

  const audioRefs = useRef([]);
  const [audioInfo, setAudioInfo] = useState(
    filteredDatas.map(() => ({ currentTime: 0, duration: 0, isPlaying: false }))
  );

  const RekomendationSurah = [
    { surah: "Al Kahf", url: "18", alertFriday: true },
    {
      surah: "Al Matsurat",
      url: "matsurat",
      ex: "nosurah",
      alertFriday: false,
    },
    { surah: "Al Mulk", url: "67", alertFriday: false },
    { surah: "Yasin", url: "36", alertFriday: false },
    { surah: "Quiz", url: "quiz", ex: "nosurah", alertFriday: false },
    { surah: "Do'a Harian", url: "doa-harian", ex: "nosurah", alertFriday: false },
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

  const isFriday = () => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();

    const thursdayEvening = day === 4 && hour >= 15;
    const fridayAllDay = day === 5;

    return thursdayEvening || fridayAllDay;
  };

  const fetchRamadhanData = async () => {
    try {
      const resToday = await fetch(
        "https://api.aladhan.com/v1/timingsByCity?city=Jakarta&country=Indonesia"
      );
      const todayData = await resToday.json();
      const hijriToday = todayData.data.date.hijri;

      const hijriYear = parseInt(hijriToday.year);

      const resRamadan = await fetch(
        `https://api.aladhan.com/v1/hToG?date=1-9-${hijriYear}`
      );
      const ramadanData = await resRamadan.json();

      const greg = ramadanData.data.gregorian.date; // "28-02-2025"
      const hijr = ramadanData.data.hijri.date; // "1-9-1446"

      const [d, m, y] = greg.split("-").map(Number);
      const ramadanDate = new Date(y, m - 1, d);
      const today = new Date();

      const diffMs = ramadanDate - today;
      const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

      const isRamadhan = hijriToday.month.number === 9; // bulan 9 = Ramadan

      setRamadhanInfo({
        ramadhanGregorian: greg,
        ramadhanHijri: hijr,
        hijriYear: hijriYear,
        gregorianYear: today.getFullYear(),
        timeLeft: diffDays,
        isRamadhan: isRamadhan,
      });
    } catch (error) {
      console.error("Ramadhan fetch error:", error);
    }
  };

  useEffect(() => {
    if (!querySearch) {
      setFilteredData(dataSurat);
      fetchRamadhanData();
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
        isFriday={isFriday()}
        ramadhanInfo={ramadhanInfo}
      />
    </>
  );
};
export default Home;
