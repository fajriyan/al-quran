import { Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./Components/About";
import Quran from "./Components/Quran";
import SingleSurat from "./Components/SingleSurat";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Quran />} />
        <Route path="/surat" element={<Quran />} />
        <Route path="/surat/:idsurat" element={<SingleSurat />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
