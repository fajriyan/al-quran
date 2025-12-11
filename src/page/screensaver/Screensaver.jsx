import { useState, useEffect, useRef, useContext } from "react";
import html2canvas from "html2canvas";
import ProgresContext from "../../lib/ProgresContext";

const verses = [
  {
    arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    translation: "Sesungguhnya bersama kesulitan ada kemudahan.",
    source: "QS. Al-Insyirah [94]: 6",
  },
  {
    arabic: "اللَّهُ نُورُ السَّمَاوَاتِ وَالْأَرْضِ",
    translation: "Allah adalah cahaya langit dan bumi.",
    source: "QS. An-Nur [24]: 35",
  },
  {
    arabic: "فَاذْكُرُونِي أَذْكُرْكُمْ",
    translation: "Ingatlah kepada-Ku, niscaya Aku ingat kepadamu.",
    source: "QS. Al-Baqarah [2]: 152",
  },
  {
    arabic: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
    translation: "Sesungguhnya Allah bersama orang-orang yang sabar.",
    source: "QS. Al-Baqarah [2]: 153",
  },
  {
    arabic: "وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ",
    translation:
      "Tidak ada keberhasilan bagiku kecuali dengan pertolongan Allah.",
    source: "QS. Hud [11]: 88",
  },
  {
    arabic: "لَا تَقْنَطُوا مِنْ رَحْمَةِ اللَّهِ",
    translation: "Janganlah kamu berputus asa dari rahmat Allah.",
    source: "QS. Az-Zumar [39]: 53",
  },
  {
    arabic: "وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
    translation: "Dan Dia Maha Kuasa atas segala sesuatu.",
    source: "QS. Al-Mulk [67]: 1",
  },
  {
    arabic: "إِنَّ رَبِّي قَرِيبٌ مُجِيبٌ",
    translation: "Sesungguhnya Tuhanku dekat dan Maha Mengabulkan.",
    source: "QS. Hud [11]: 61",
  },
];

const gradients = [
  "from-indigo-900 via-purple-900 to-slate-900",
  "from-emerald-800 via-teal-700 to-sky-800",
  "from-rose-900 via-pink-800 to-orange-800",
  "from-blue-900 via-indigo-800 to-purple-900",
  "from-slate-900 via-gray-800 to-slate-700",
  "from-amber-800 via-orange-700 to-red-800",
  "from-teal-900 via-green-800 to-lime-700",
  "from-fuchsia-900 via-purple-800 to-violet-700",
  "from-cyan-900 via-sky-800 to-indigo-900",
  "from-red-900 via-rose-800 to-pink-700",
];

export default function Screensaver() {
  const [index, setIndex] = useState(0);
  const [_, setProgressBar] = useContext(ProgresContext);
  const [isAutoplay, setAutoplay] = useState(true);
  const [isFullscreen, setFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const verseRef = useRef(null);
  const intervalRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(null);

  const nextVerse = () => setIndex((prev) => (prev + 1) % verses.length);
  const prevVerse = () =>
    setIndex((prev) => (prev - 1 + verses.length) % verses.length);

  useEffect(() => {
    setProgressBar(false);
    if (isAutoplay) {
      intervalRef.current = setInterval(nextVerse, 8000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isAutoplay]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setFullscreen(true);
    } else {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };

  const saveAsImage = async () => {
    const element = document.querySelector("#screensaver-wrapper");
    const controls = document.querySelector("#controls");

    if (controls) controls.style.display = "none"; // sembunyikan sementara

    if (element) {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
      });

      const link = document.createElement("a");
      link.download = `${verses[index].source}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    }

    if (controls) controls.style.display = "";
  };

  const gradientClass = gradients[index % gradients.length];

  useEffect(() => {
    setProgress(0); // reset progress di awal autoplay cycle

    if (isAutoplay) {
      let start = Date.now();
      const duration = 8000; // 8 detik

      progressRef.current = setInterval(() => {
        const diff = Date.now() - start;
        const percentage = Math.min((diff / duration) * 100, 100);
        setProgress(percentage);

        if (percentage >= 100) {
          start = Date.now(); // reset progress untuk next slide
        }
      }, 50);
    } else {
      clearInterval(progressRef.current);
      setProgress(0);
    }

    return () => clearInterval(progressRef.current);
  }, [isAutoplay, index]);

  return (
    <div
      id="screensaver-wrapper"
      className={`w-full h-screen bg-gradient-to-br ${gradientClass} text-white flex items-center justify-center relative overflow-hidden transition-all duration-1000 px-5 xl:px-0`}
    >
      <div
        ref={verseRef}
        className="text-center p-8 rounded-2xl backdrop-blur-lg bg-white/5 border border-slate-300/50 max-w-2xl transition-all duration-500"
      >
        <p className="text-5xl md:text-6xl mb-8 reem-kufi-fun">
          {verses[index].arabic}
        </p>
        <p className="text-lg md:text-xl text-gray-200 mb-2 italic">
          “{verses[index].translation}”
        </p>
        <p className="text-sm text-gray-400">{verses[index].source}</p>
      </div>

      {/* Controls */}
      {showControls && (
        <div
          data-html2canvas-ignore="true"
          className="absolute bottom-6 flex gap-3 flex-wrap justify-center transition-opacity"
        >
          <button
            onClick={prevVerse}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm backdrop-blur transition"
          >
            Prev
          </button>
          <button
            onClick={nextVerse}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm backdrop-blur transition"
          >
            Next
          </button>
          <button
            onClick={() => setAutoplay(!isAutoplay)}
            className={`px-4 py-2 rounded-xl text-sm backdrop-blur transition relative overflow-hidden ${
              isAutoplay
                ? "bg-white/10 hover:bg-white/20"
                : "bg-white/10 hover:bg-white/20"
            }`}
          >
            {isAutoplay ? "Stop" : "Autoplay"}
            {isAutoplay && (
              <div
                className="absolute left-0 bottom-0 h-[3px] bg-white/70 transition-all"
                style={{ width: `${progress}%` }}
              ></div>
            )}
          </button>
          <button
            onClick={toggleFullscreen}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm backdrop-blur transition"
          >
            {isFullscreen ? " Exit Fullscreen" : "⛶ Fullscreen"}
          </button>
          <button
            onClick={saveAsImage}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm transition"
          >
            Save as Image
          </button>
          <button
            onClick={() => setShowControls(false)}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm transition"
          >
            Hide Controls
          </button>
        </div>
      )}

      {!showControls && (
        <button
          data-html2canvas-ignore="true"
          onClick={() => setShowControls(true)}
          className="absolute bottom-4 right-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm backdrop-blur transition overflow-hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-gear"
            viewBox="0 0 16 16"
          >
            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0" />
            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z" />
          </svg>
          {isAutoplay && (
            <div
              className="absolute left-0 bottom-0 h-[3px] bg-white/70 transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          )}
        </button>
      )}
    </div>
  );
}
