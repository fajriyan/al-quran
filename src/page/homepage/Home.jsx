import { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import HomeView from "./HomeView";
import ProgresContext from "@/lib/ProgresContext";
import numbertosurah from "@/data/numbertosurah.json";
import Fuse from "fuse.js";
import { useSurah } from "@/hooks/global";
import { apiGetSurah, apiGetTafsir } from "@/lib/api";
import { useSearchParams } from "react-router-dom";

const Home = () => {
   const [_, setProgressBar] = useContext(ProgresContext);
   const [searchParams, setSearchParams] = useSearchParams();
   const [querySearch, setQuerySearch] = useState(searchParams.get("q") || "");
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

   const [lanjutBaca, setLanjutBaca] = useState([
      {
         surat: localStorage.getItem("namaSurat"),
         url: localStorage.getItem("url"),
         ayat: localStorage.getItem("ayat"),
      },
   ]);

   const [downloadingAll, setDownloadingAll] = useState(false);
   const [downloadProgress, setDownloadProgress] = useState({
      current: 0,
      total: 114,
   });
   const [isOnline, setIsOnline] = useState(typeof navigator !== "undefined" ? navigator.onLine : true);

   const downloadAllSurahForOffline = async () => {
      if (downloadingAll) return;

      setDownloadingAll(true);
      setDownloadProgress({ current: 0, total: 114 });

      const toastId = toast.loading("Sedang mengunduh semua surah...", {
         duration: Infinity,
      });

      try {
         const ids = Array.from({ length: 114 }, (_, i) => i + 1);
         const batchSize = 8;

         for (let i = 0; i < ids.length; i += batchSize) {
            const batch = ids.slice(i, i + batchSize);

            await Promise.all(
               batch.map(async (surahId) => {
                  await Promise.all([apiGetSurah({ id: surahId }), apiGetTafsir({ number: surahId })]);

                  setDownloadProgress((prev) => ({
                     current: prev.current + 1,
                     total: prev.total,
                  }));
               }),
            );

            toast.loading(`Mengunduh surah ${Math.min(i + batchSize, 114)}/${114}...`, { id: toastId });
         }

         toast.success("Semua surah berhasil diunduh untuk penggunaan offline!", {
            id: toastId,
         });
      } catch (error) {
         console.error(error);
         toast.error("Gagal mengunduh semua surah. Coba lagi nanti.", {
            id: toastId,
         });
      } finally {
         setDownloadingAll(false);
      }
   };

   const audioRefs = useRef([]);
   const searchInputRef = useRef(null);
   const [audioInfo, setAudioInfo] = useState(
      filteredDatas.map(() => ({
         currentTime: 0,
         duration: 0,
         isPlaying: false,
      })),
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
      // {
      //    surah: "Do'a Harian",
      //    url: "doa-harian",
      //    ex: "nosurah",
      //    alertFriday: false,
      // },
   ];

   const { loading: Loading, dataSurah: dataSurat } = useSurah();

   useEffect(() => {
      const updateConnectionStatus = () => {
         setIsOnline(navigator.onLine);
      };

      updateConnectionStatus();
      window.addEventListener("online", updateConnectionStatus);
      window.addEventListener("offline", updateConnectionStatus);

      return () => {
         window.removeEventListener("online", updateConnectionStatus);
         window.removeEventListener("offline", updateConnectionStatus);
      };
   }, []);

   const removeBookmark = () => {
      localStorage.removeItem("ayat");
      localStorage.removeItem("url");
      localStorage.removeItem("namaSurat");
      setLanjutBaca([{ surat: null, url: null, ayat: null }]);
      toast("Bookmark Berhasil diHapus!", {
         icon: "🗑",
      });
   };

   useEffect(() => {
      if (querySearch.trim()) {
         setSearchParams({ q: querySearch });
      } else {
         setSearchParams({});
      }
   }, [querySearch]);

   function scrollFunction() {
      if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
         setShowBT(true);
      } else {
         setShowBT(false);
      }
   }

   window.onscroll = function () {
      scrollFunction();
   };

   useEffect(() => {
      const handleKeyDown = (event) => {
         if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
            event.preventDefault();
            if (searchInputRef.current) {
               searchInputRef.current.focus();
            }
         }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
   }, []);

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
         const resToday = await fetch("https://api.aladhan.com/v1/timingsByCity?city=Jakarta&country=Indonesia");
         const todayData = await resToday.json();
         const hijriToday = todayData.data.date.hijri;

         let hijriYear = parseInt(hijriToday.year);
         const today = new Date();

         const getRamadanDate = async (year) => {
            const res = await fetch(`https://api.aladhan.com/v1/hToG?date=1-9-${year}`);
            const data = await res.json();

            const greg = data.data.gregorian.date;
            const hijr = data.data.hijri.date;

            const [d, m, y] = greg.split("-").map(Number);
            const ramadanDate = new Date(y, m - 1, d);

            return { greg, hijr, ramadanDate };
         };

         let { greg, hijr, ramadanDate } = await getRamadanDate(hijriYear);

         let diffDays = Math.ceil((ramadanDate - today) / (1000 * 60 * 60 * 24));

         // kalau sudah lewat, ambil Ramadan tahun depan
         if (diffDays < 0) {
            hijriYear += 1;

            const nextRamadan = await getRamadanDate(hijriYear);
            greg = nextRamadan.greg;
            hijr = nextRamadan.hijr;
            ramadanDate = nextRamadan.ramadanDate;

            diffDays = Math.ceil((ramadanDate - today) / (1000 * 60 * 60 * 24));
         }

         const isRamadhan = hijriToday.month.number === 9;

         setRamadhanInfo({
            ramadhanGregorian: greg,
            ramadhanHijri: hijr,
            hijriYear,
            gregorianYear: today.getFullYear(),
            timeLeft: isRamadhan ? null : diffDays,
            ramadhanDay: isRamadhan ? parseInt(hijriToday.day) : null,
            isRamadhan,
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
            audio.addEventListener("loadstart", () => {
               setLoadingIndex(i);
            });

            audio.addEventListener("canplaythrough", () => {
               setLoadingIndex(null);
            });

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
            searchInputRef={searchInputRef}
            toggleAudio={toggleAudio}
            loadingIndex={loadingIndex}
            isFriday={isFriday()}
            ramadhanInfo={ramadhanInfo}
            downloadAllSurahForOffline={downloadAllSurahForOffline}
            downloadingAll={downloadingAll}
            downloadProgress={downloadProgress}
            isOnline={isOnline}
         />
      </>
   );
};
export default Home;