import { Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./Components/About";
import Quran from "./Components/Quran";
import SingleSurat from "./Components/SingleSurat";
import NotFound from "./Components/NotFound";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Quran />} />
        <Route path="/surat" element={<Quran />} />
        <Route path="/surat/:idsurat" element={<SingleSurat />} />
        <Route path="/about" element={<About />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
