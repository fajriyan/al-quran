import { Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./page/About";
import NotFound from "./page/NotFound";
import Home from "./page/Home";
import SinglePost from "./page/SinglePost";
import Changelog from "./page/Changelog";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/surah" element={<Home />} />
        <Route path="/surah/:id" element={<SinglePost />} />
        <Route path="/about" element={<About />} />
        <Route path="/changelog" element={<Changelog />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
