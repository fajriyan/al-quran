import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import DetailSurahView from "./DetailSurahView";

const DetailSurah = () => {
  const Params = useParams();
  const [Loading, setLoading] = useState(false);

  const [dataSingleSurat, setSingleSurat] = useState([]);
  const [decSurat, setDec] = useState([]);
  const [font1, setFont1] = useState("25");
  const [font2, setFont2] = useState("16");

  const getAyat = async () => {
    const Req = await fetch("https://equran.id/api/surat/" + Params.id);
    const Res = await Req.json();
    window.scrollTo({ top: 0 });
    setSingleSurat(Res["ayat"]);
    setDec(Res);
    setLoading(true);
  };

  const [dTF, setTF] = useState([]);
  const getTafsir = async () => {
    const Req = await fetch("https://equran.id/api/tafsir/" + Params.id);
    const Res = await Req.json();
    setTF(Res);
  };

  useEffect(() => {
    checkingStatus();
    getAyat();
    getTafsir();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const SkeletonLoading = [1, 2, 3, 4];

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
    if (
      lanjutBaca[0].url === Params.id &&
      lanjutBaca[0].fromBookmark === "true"
    ) {
      toast(`Melanjutkan membaca Surah`, {
        icon: "📑",
      });
      setBStats(true);
    } else {
      setBStats(false);
    }
  };

  const [modalAyat, setModalAyat] = useState(false);

  return (
    <DetailSurahView
      bookStats={bookStats}
      decSurat={decSurat}
      Loading={Loading}
      dataSingleSurat={dataSingleSurat}
      SkeletonLoading={SkeletonLoading}
      copySurat={copySurat}
      modalAyat={modalAyat}
      dTF={dTF}
      font1={font1}
      font2={font2}
      saveAyat={saveAyat}
      handleClickScroll={handleClickScroll}
      clickButtonss={clickButtonss}
      setFont1={setFont1}
      setFont2={setFont2}
      setModalAyat={setModalAyat}
    />
  );
};
export default DetailSurah;
