import { useState, useEffect } from "react";
import { apiGetChangelog, apiGetSurah } from "../lib/api";

export function useSurah() {
  const [loading, setLoading] = useState(false);
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
