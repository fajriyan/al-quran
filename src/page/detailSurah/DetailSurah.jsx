import { useContext, useEffect, useState, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import DetailSurahView from "./DetailSurahView";
import ProgresContext from "../../lib/ProgresContext";
import surahtonumber from "../../data/surahtonumber.json";
import numbertosurah from "../../data/numbertosurah.json";
import { useAyat } from "../../hooks/global";

const DetailSurah = () => {
  const { id } = useParams();
  const surahNumber = surahtonumber[id];
  const [, setProgressBar] = useContext(ProgresContext);
  const [currentBookmark, setCurrentBookmark] = useState(null);
  const [font, setFont] = useState({ arab: "25", idn: "16" });
  const [bookStats, setBStats] = useState(false);

  const lanjutBaca = useMemo(
    () => ({
      surat: localStorage.getItem("namaSurat"),
      url: localStorage.getItem("url"),
      ayat: localStorage.getItem("ayat"),
      fromBookmark: localStorage.getItem("fromBookmark"),
    }),
    []
  );

  const saveAyat = useCallback(
    (url, ayat, namaSurat) => {
      localStorage.setItem("url", numbertosurah[url]);
      localStorage.setItem("ayat", ayat);
      localStorage.setItem("namaSurat", namaSurat);

      const newBookmark = id === currentBookmark ? null : ayat;
      setCurrentBookmark(newBookmark);

      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-3 flex items-start">
            <img className="w-9 rounded-full" src="/favicon.ico" alt="icon" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">
                Ayat Berhasil Disimpan
              </p>
              <p className="text-xs text-gray-500">
                {namaSurat} : Ayat {ayat}
              </p>
            </div>
          </div>
        </div>
      ));
    },
    [id, currentBookmark]
  );

  const checkingStatus = useCallback(() => {
    const { url, fromBookmark } = lanjutBaca;
    const isBookmark = url === id && fromBookmark === "true";

    if (isBookmark) {
      toast("Melanjutkan membaca Surah", { icon: "📑" });
    }

    setBStats(isBookmark);
  }, [lanjutBaca, id]);

  const handleClickScroll = useCallback(() => {
    const element = document.getElementById("surahke" + lanjutBaca.ayat);
    element?.scrollIntoView({ behavior: "smooth" });
  }, [lanjutBaca]);

  useEffect(() => {
    checkingStatus();
    setProgressBar(false);

    const storedAyah = localStorage.getItem("ayat");
    const storedSurah = localStorage.getItem("url")?.toLowerCase();

    if (storedAyah && storedSurah === id) {
      setCurrentBookmark(JSON.parse(storedAyah));
    }
  }, [checkingStatus, id, setProgressBar]);

  const { loading, dataSurah, dataTafsir } = useAyat({ surahNumber });

  return (
    <DetailSurahView
      dataDetails={dataSurah}
      dataTafsir={dataTafsir}
      Loading={loading}
      bookStats={bookStats}
      saveAyat={saveAyat}
      handleClickScroll={handleClickScroll}
      font={font}
      setFont={setFont}
      numbertosurah={numbertosurah}
      currentBookmark={currentBookmark}
    />
  );
};

export default DetailSurah;
