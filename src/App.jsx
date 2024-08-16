import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./page/homepage/Home";
import About from "./page/about/About";
import DetailSurah from "./page/detailSurah/DetailSurah";
import Changelog from "./page/staticPage/Changelog";
import NotFound from "./page/staticPage/NotFound";
import { useEffect, useState, useContext } from "react";
import TopBarProgress from "react-topbar-progress-indicator";
import ProgresContext from "./lib/ProgresContext";
import ThemeContext from "./lib/ThemeContext";
import Matsurat from "./page/matsurat/Matsurat";

function App() {
  const progresBarState = useState(true);
  const theme = useState('light');
  const root = window.document.documentElement;
  let storageTheme = JSON.parse(localStorage.getItem("theme"))

  useEffect(()=>{
    if (storageTheme===null){
      theme[1]("light");
      localStorage.setItem("theme", JSON.stringify({theme:"light", key:"231273891793871263123"}))
    }

    try {
      if(storageTheme.theme == "light"){
        theme[1]("light");
        root.classList.remove("dark");
        root.classList.add("light");
      } else if (storageTheme.theme == "dark") {
        theme[1]("dark");
        root.classList.remove("light");
        root.classList.add("dark");
      }
    } catch (error) {
      console.log(error)
    }
  }, [storageTheme?.theme])

  const CustomRoutes = ({ children }) => {
    // const [progress, setProgress] = useState(false);
    const [prevLoc, setPrevLoc] = useState("");
    const location = useLocation();

    return (
      <>
        {progresBarState[0] && <TopBarProgress />}
        <Routes>{children}</Routes>;
      </>
    );
  };

  return (
    <BrowserRouter>
    <ThemeContext.Provider value={theme}>
      <ProgresContext.Provider value={progresBarState}>
        <CustomRoutes>
          {/* <Routes> */}
          <Route path="/" element={<Home />} />
          <Route path="/surah" element={<Home />} />
          <Route path="/surah/:id" element={<DetailSurah />} />
          <Route path="/about" element={<About />} />
          <Route path="/changelog" element={<Changelog />} />
          <Route path="/matsurat" element={<Matsurat />} />
          <Route path="/*" element={<NotFound />} />
          {/* </Routes> */}
        </CustomRoutes>
      </ProgresContext.Provider>
    </ThemeContext.Provider>
    </BrowserRouter>
  );
}

export default App;
