import { useState, useEffect } from "react";
import { apiGetChangelog, apiGetSurah, apiGetTafsir } from "../lib/api";

export function useSurah() {
  const [loading, setLoading] = useState(true);
  const [dataSurah, setDataSurah] = useState([]);

  const getSurah = async () => {
    const cache = localStorage.getItem("surahData");
    const cacheTime = localStorage.getItem("surahDataTime");
    const cacheDuration = 20 * 24 * 60 * 60 * 1000; // 20 hari

    if (cache && cacheTime && Date.now() - cacheTime < cacheDuration) {
      setDataSurah(JSON.parse(cache));
      setLoading(true);
      return;
    }

    const data = await apiGetSurah({ id: null });
    setDataSurah(data);
    setLoading(true);

    localStorage.setItem("surahData", JSON.stringify(data));
    localStorage.setItem("surahDataTime", Date.now());
  };

  useEffect(() => {
    getSurah();
  }, []);

  return { loading, dataSurah };
}

export function useAyat({ surahNumber }) {
  const [loading, setLoading] = useState(true);
  const [progressBar, setProgressBar] = useState(false);
  const [dataSurah, setDataSurah] = useState(null);
  const [dataTafsir, setDataTafsir] = useState(null);

  useEffect(() => {
    if (!surahNumber) return;

    const getAyat = async () => {
      setProgressBar(true);
      setLoading(true);

      const cacheKey = `surahData_${surahNumber}`;
      const cacheTimeKey = `surahDataTime_${surahNumber}`;
      const cacheDuration = 10 * 24 * 60 * 60 * 1000; // 10 hari

      const cachedData = localStorage.getItem(cacheKey);
      const cachedTime = localStorage.getItem(cacheTimeKey);

      if (cachedData && cachedTime && Date.now() - cachedTime < cacheDuration) {
        const { dataSurah, dataTafsir } = JSON.parse(cachedData);
        setTimeout(() => {
          setDataSurah(dataSurah);
          setDataTafsir(dataTafsir);
          setLoading(false);
          setProgressBar(false);
        }, 100);
        return;
      }

      try {
        window.scrollTo({ top: 0 });
        const [resSurah, resTafsir] = await Promise.all([
          apiGetSurah({ id: surahNumber }),
          apiGetTafsir({ number: surahNumber }),
        ]);

        setDataSurah(resSurah);
        setDataTafsir(resTafsir);

        // simpan ke cache
        localStorage.setItem(
          cacheKey,
          JSON.stringify({ dataSurah: resSurah, dataTafsir: resTafsir })
        );
        localStorage.setItem(cacheTimeKey, Date.now());
      } catch (err) {
        console.error("Failed to fetch surah detail:", err);
      } finally {
        setLoading(false);
        setProgressBar(false);
      }
    };

    getAyat();
  }, [surahNumber]);

  return {
    loading,
    progressBar,
    dataSurah,
    dataTafsir,
  };
}

export function useChangelog({ first = false }) {
  const [loading, setLoading] = useState(true);
  const [dataChangelog, setData] = useState([]);

  const getChangelog = async () => {
    setLoading(true);
    const data = await apiGetChangelog({ first: first });
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    getChangelog();
  }, []);

  return { loading, dataChangelog };
}
