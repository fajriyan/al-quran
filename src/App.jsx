import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./page/homepage/Home";
import About from "./page/about/About";
import DetailSurah from "./page/detailSurah/DetailSurah";
import Changelog from "./page/staticPage/Changelog";
import NotFound from "./page/staticPage/NotFound";
import { useEffect, useState } from "react";
import TopBarProgress from "react-topbar-progress-indicator";
import ProgresContext from "./lib/ProgresContext";

function App() {
  const progresBarState = useState(true);

  const CustomRoutes = ({ children }) => {
    // const [progress, setProgress] = useState(false);
    const [prevLoc, setPrevLoc] = useState("");
    const location = useLocation();

    // useEffect(() => {
    //   setPrevLoc(location.pathname);
    //   progresBarState[1](true);
    //   if (location.pathname === prevLoc) {
    //     setPrevLoc("");
    //   }
    // }, []);

    return (
      <>
        {progresBarState[0] && <TopBarProgress />}
        <Routes>{children}</Routes>;
      </>
    );
  };

  return (
    <BrowserRouter>
      <ProgresContext.Provider value={progresBarState}>
        <CustomRoutes>
          {/* <Routes> */}
          <Route path="/" element={<Home />} />
          <Route path="/surah" element={<Home />} />
          <Route path="/surah/:id" element={<DetailSurah />} />
          <Route path="/about" element={<About />} />
          <Route path="/changelog" element={<Changelog />} />
          <Route path="/*" element={<NotFound />} />
          {/* </Routes> */}
        </CustomRoutes>
      </ProgresContext.Provider>
    </BrowserRouter>
  );
}

export default App;
