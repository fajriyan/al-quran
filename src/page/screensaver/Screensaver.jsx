import React, { useState, useEffect, useRef, useContext } from "react";
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
];

// daftar gradasi yang berganti tiap ayat
const gradients = [
  "from-indigo-900 via-purple-900 to-slate-900",
  "from-emerald-800 via-teal-700 to-sky-800",
  "from-rose-900 via-pink-800 to-orange-800",
  "from-blue-900 via-indigo-800 to-purple-900",
  "from-slate-900 via-gray-800 to-slate-700",
];

export default function Screensaver() {
  const [index, setIndex] = useState(0);
  const [_, setProgressBar] = useContext(ProgresContext);
  const [isAutoplay, setAutoplay] = useState(false);
  const [isFullscreen, setFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const verseRef = useRef(null);
  const intervalRef = useRef(null);

  const nextVerse = () => setIndex((prev) => (prev + 1) % verses.length);
  const prevVerse = () =>
    setIndex((prev) => (prev - 1 + verses.length) % verses.length);

  // autoplay
  useEffect(() => {
    setProgressBar(false);
    if (isAutoplay) {
      intervalRef.current = setInterval(nextVerse, 8000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isAutoplay]);

  // fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setFullscreen(true);
    } else {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };

  // save as image
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

    if (controls) controls.style.display = ""; // tampilkan kembali
  };

  // gradasi aktif
  const gradientClass = gradients[index % gradients.length];

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
            className={`px-4 py-2 rounded-xl text-sm backdrop-blur transition ${
              isAutoplay
                ? "bg-white/10 hover:bg-white/20"
                : "bg-white/10 hover:bg-white/20"
            }`}
          >
            {isAutoplay ? "Stop" : "Autoplay"}
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
          className="absolute bottom-4 right-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm backdrop-blur transition"
        >
          Show Controls
        </button>
      )}
    </div>
  );
}
