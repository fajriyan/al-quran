import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import DetailSurahView from "./DetailSurahView";
import ProgresContext from "../../lib/ProgresContext";
import surahtonumber from "../../data/surahtonumber.json";
import numbertosurah from "../../data/numbertosurah.json";

const DetailSurah = () => {
  const { id } = useParams();
  const surahNumber = surahtonumber[id];

  const [progressBar, setProgressBar] = useContext(ProgresContext);
  const [currentBookmark, setCurrentBookmark] = useState(null);
  let propertyStorage = JSON.parse(localStorage.getItem("property")) || [];

  const [state, setState] = useState({
    stateLoading: false,
    stateModal: false,
  });
  const [data, setData] = useState({
    dataSkeleton: [1, 2, 3, 4, 5],
    dataDetailAyat: [],
    dataTafsir: [],
  });
  const [font, setFont] = useState({ arab: "25", idn: "16" });

  const setProperty = ({ size, id }) => {
    const fontMapping = {
      "77239472384723879917": "arab",
      "77239472384723879920": "idn",
    };
    const font = fontMapping[id];
    const updatedProperties = propertyStorage.map((item) =>
      item.id === id ? { ...item, font, size } : item
    );
    if (!updatedProperties.some((item) => item.id === id)) {
      updatedProperties.push({ id, font, size });
    }
    localStorage.setItem("property", JSON.stringify(updatedProperties));
  };

  const getAyat = async () => {
    setProgressBar(true);
    setState({ ...state, stateLoading: true });
    const Req = await fetch("https://equran.id/api/surat/" + surahNumber);
    const Res = await Req.json();
    window.scrollTo({ top: 0 });

    const ReqTafsir = await fetch(
      "https://equran.id/api/tafsir/" + surahNumber
    );
    const ResTafsir = await ReqTafsir.json();
    setData({ ...data, dataDetailAyat: Res, dataTafsir: ResTafsir });
    if (ReqTafsir) {
      setState({ ...state, stateLoading: false });
    }
  };

  const initProperty = () => {
    localStorage.setItem(
      "property",
      JSON.stringify([
        {
          id: "77239472384723879917",
          font: "arab",
          size: "25",
        },
        {
          id: "77239472384723879920",
          font: "idn",
          size: "16",
        },
      ])
    );
  };

  useEffect(() => {
    initProperty();
    checkingStatus();
    getAyat().finally(setProgressBar(false));

    const storedAyah = JSON.parse(localStorage.getItem("ayat"));
    const storedSurah = localStorage.getItem("url")?.toLowerCase();
    if (storedAyah && storedSurah== id) {
      setCurrentBookmark(storedAyah);
    }
  }, []);

  const copySurat = () => {
    toast.success("Copy Berhasil");
  };

  const saveAyat = (url, ayat, namaSurat) => {
    localStorage.setItem("url", numbertosurah[url]);
    localStorage.setItem("ayat", ayat);
    localStorage.setItem("namaSurat", namaSurat);

    const newBookmark = id === currentBookmark ? null : ayat;
    setCurrentBookmark(newBookmark);
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-3">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <img
                className=" w-9 rounded-full"
                src="/public/favicon.ico"
                alt=""
              />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                Ayat Berhasil di Simpan
              </p>
              <p className=" text-xs text-gray-500">
                {namaSurat} : Ayat {ayat}
              </p>
            </div>
          </div>
        </div>
      </div>
    ))
  };

  const lanjutBaca = [
    {
      surat: localStorage.getItem("namaSurat"),
      url: localStorage.getItem("url"),
      ayat: localStorage.getItem("ayat"),
      fromBookmark: localStorage.getItem("fromBookmark"),
    },
  ];

  const [bookStats, setBStats] = useState(false);
  const checkingStatus = () => {
    if (lanjutBaca[0].url === id && lanjutBaca[0].fromBookmark === "true") {
      setState({ ...state, stateBookmarkz: true });

      toast(`Melanjutkan membaca Surah`, {
        icon: "📑",
      });
      setBStats(true);
    } else {
      setState({ ...state, stateBookmarkz: false });
      setBStats(false);
    }
  };

  const handleClickScroll = () => {
    const element = document.getElementById("surahke" + lanjutBaca[0].ayat);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const clickButtonss = () => {
    document.getElementById("scrollNoww").click();
  };

  return (
    <>
      <DetailSurahView
        dataDetails={data.dataDetailAyat}
        dataTafsir={data.dataTafsir}
        SkeletonLoading={data.dataSkeleton}
        Loading={state.stateLoading}
        modalAyat={state.stateModal}
        bookStats={bookStats}
        setModalAyat={() =>
          setState({ ...state, stateModal: !state.stateModal })
        }
        copySurat={copySurat}
        saveAyat={saveAyat}
        handleClickScroll={handleClickScroll}
        clickButtonss={clickButtonss}
        font={font}
        setFont={setFont}
        property={propertyStorage}
        setProperty={setProperty}
        numbertosurah={numbertosurah}
        currentBookmark={currentBookmark}
      />
    </>
  );
};
export default DetailSurah;
