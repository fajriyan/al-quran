import { Route, Routes } from "react-router-dom";
import Home from "./page/homepage/Home";
import About from "./page/about/About";
import DetailSurah from "./page/detailSurah/DetailSurah";
import Changelog from "./page/staticPage/Changelog";
import NotFound from "./page/staticPage/NotFound";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/surah" element={<Home />} />
        <Route path="/surah/:id" element={<DetailSurah />} />
        <Route path="/about" element={<About />} />
        <Route path="/changelog" element={<Changelog />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
