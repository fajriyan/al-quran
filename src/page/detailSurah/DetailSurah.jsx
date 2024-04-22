import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import DetailSurahView from "./DetailSurahView";

const DetailSurah = () => {
  const { id } = useParams();
  const SkeletonLoading = [1, 2, 3, 4];
  const [Loading, setLoading] = useState(false);
  const [modalAyat, setModalAyat] = useState(false);
  const [dataDetails, setDataDetails] = useState([]);
  const [dataTafsir, setDataTafsir] = useState([]);
  const [font, setFont] = useState({ arab: "25", idn: "16" });

  const getAyat = async () => {
    const Req = await fetch("https://equran.id/api/surat/" + id);
    const Res = await Req.json();
    window.scrollTo({ top: 0 });
    setDataDetails(Res);
    setLoading(true);
  };

  const getTafsir = async () => {
    const Req = await fetch("https://equran.id/api/tafsir/" + id);
    const Res = await Req.json();
    setDataTafsir(Res);
  };

  useEffect(() => {
    checkingStatus();
    getAyat();
    getTafsir();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const copySurat = () => {
    toast.success("Copy Berhasil");
  };

  const saveAyat = (url, ayat, namaSurat) => {
    toast.success("Simpan Berhasil");
    localStorage.setItem("url", url);
    localStorage.setItem("ayat", ayat);
    localStorage.setItem("namaSurat", namaSurat);
  };

  const lanjutBaca = [
    {
      surat: localStorage.getItem("namaSurat"),
      url: localStorage.getItem("url"),
      ayat: localStorage.getItem("ayat"),
      fromBookmark: localStorage.getItem("fromBookmark"),
    },
  ];

  const handleClickScroll = () => {
    const element = document.getElementById("surahke" + lanjutBaca[0].ayat);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const clickButtonss = () => {
    document.getElementById("scrollNoww").click();
  };

  const [bookStats, setBStats] = useState(false);
  const checkingStatus = () => {
    if (lanjutBaca[0].url === id && lanjutBaca[0].fromBookmark === "true") {
      toast(`Melanjutkan membaca Surah`, {
        icon: "📑",
      });
      setBStats(true);
    } else {
      setBStats(false);
    }
  };

  return (
    <DetailSurahView
      dataDetails={dataDetails}
      dataTafsir={dataTafsir}
      Loading={Loading}
      bookStats={bookStats}
      SkeletonLoading={SkeletonLoading}
      copySurat={copySurat}
      modalAyat={modalAyat}
      saveAyat={saveAyat}
      handleClickScroll={handleClickScroll}
      clickButtonss={clickButtonss}
      setModalAyat={setModalAyat}
      font={font}
      setFont={setFont}
    />
  );
};
export default DetailSurah;
