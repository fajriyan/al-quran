import { useEffect, useState, useContext } from "react";
import ProgresContext from "../../lib/ProgresContext";

// Import semua kuis
import quiz1 from "../../data/quiz/quiz1.json";
import quiz2 from "../../data/quiz/quiz2.json";
import quiz3 from "../../data/quiz/quiz3.json";
import LinkProgresBars from "../../lib/LinkProgresBars";

const allQuizzes = { quiz1, quiz2, quiz3 };

export default function Quiz() {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [_, setProgressBar] = useContext(ProgresContext);

  const [timeLeft, setTimeLeft] = useState(25 * 60);

  function shuffleArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  useEffect(() => {
    setProgressBar(false);

    if (!selectedQuiz) return;

    const data = allQuizzes[selectedQuiz];
    const shuffledQuestions = shuffleArray(data).map((q) => ({
      ...q,
      options: shuffleArray(q.options),
    }));
    setQuestions(shuffledQuestions);
    setTimeLeft(25 * 60);
  }, [selectedQuiz]);

  // Timer countdown
  useEffect(() => {
    if (!selectedQuiz || showResult) return;

    if (timeLeft <= 0) {
      setShowResult(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, selectedQuiz, showResult]);

  function handleSelect(option) {
    setSelected(option);
  }

  function handleNext() {
    const current = questions[currentIndex];
    const isCorrect = selected === current.correct;
    if (isCorrect) setScore((prev) => prev + 1);

    setAnswers((prev) => [
      ...prev,
      {
        question: current.question,
        ayat: current.ayat,
        correct: current.correct,
        selected,
        surah: current.surah,
        verse: current.verse,
        isCorrect,
      },
    ]);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelected(null);
    } else {
      setShowResult(true);
    }
  }

  function resetQuiz() {
    setSelectedQuiz(null);
    setCurrentIndex(0);
    setSelected(null);
    setScore(0);
    setShowResult(false);
    setAnswers([]);
    setTimeLeft(20 * 60);
  }

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  if (!selectedQuiz) {
    return (
      <div className="">
        <div className="max-w-xl mx-auto p-6 text-center space-y-4">
          <img
            src="https://images.unsplash.com/photo-1743055029574-4ab052c7e3e7?q=80&w=927&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="h-[280px] sm:h-[300px] w-full object-cover rounded-lg mb-4 border-2 border-slate-700"
          />
          <h2 className="text-2xl font-bold">Pilih Latihan Soal</h2>
          <div className="grid sm:grid-cols-3 gap-3">
            {Object.keys(allQuizzes).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedQuiz(key)}
                className="btn btn-sm bg-gradient-to-r min-h-10 from-slate-800 to-slate-700 text-white border-none hover:shadow-md"
              >
                {key.replace("quiz", "Soal ")}
              </button>
            ))}
          </div>
          <LinkProgresBars
            to="/"
            className="flex gap-2 items-center text-sm border border-slate-400 px-3 py-1 rounded-md hover:bg-slate-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-book"
              viewBox="0 0 16 16"
            >
              <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783" />
            </svg>{" "}
            Buka Al Quran
          </LinkProgresBars>
        </div>
      </div>
    );
  }

  if (questions.length === 0)
    return <p className="text-center mt-10">Memuat soal...</p>;

  const current = questions[currentIndex];

  if (showResult) {
    const percentage = ((score / questions.length) * 100).toFixed(0);
    let grade = "Cukup";
    if (percentage >= 90) grade = "Sempurna";
    else if (percentage >= 75) grade = "Bagus";
    else if (percentage >= 60) grade = "Lumayan";

    return (
      <div className="max-w-2xl mx-auto p-4">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-2">🎉 Hasil Kuis</h2>
          <p className="text-lg">
            Skor: <span className="font-semibold">{score}</span> /{" "}
            {questions.length} (
            <span className="text-blue-600 font-semibold">{percentage}%</span>)
          </p>
          <p className="text-sm text-gray-500 italic">Kategori: {grade}</p>
        </div>

        <div className="space-y-4">
          {answers.map((ans, idx) => (
            <div
              key={idx}
              className={`border rounded p-3 ${
                ans.isCorrect
                  ? "border-green-500 bg-green-50"
                  : "border-red-500 bg-red-50"
              }`}
            >
              <div className="text-sm text-gray-500 mb-1">
                Surah {ans.surah} : {ans.verse}
              </div>
              <p className="text-md font-medium mb-1">{ans.question}</p>
              <p className="arab-0 text-xl mb-2">{ans.ayat}</p>
              <p>
                Jawabanmu:{" "}
                <span
                  className={`font-semibold ${
                    ans.isCorrect ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {ans.selected}
                </span>{" "}
                {ans.isCorrect ? "✅" : "❌"}
              </p>
              {!ans.isCorrect && (
                <p>
                  Jawaban benar:{" "}
                  <span className="font-semibold text-green-700">
                    {ans.correct}
                  </span>
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <button
            className="btn btn-sm bg-gradient-to-r hover:bg-gradient-to-t from-slate-800 to-slate-700 border-none hover:shadow-lg focus:ring-2 ring-offset-2 ring-slate-800 text-white"
            onClick={resetQuiz}
          >
            Kembali ke Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <img
        src="https://images.unsplash.com/photo-1664270009142-7c264e0dbe02?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className="h-2 w-full object-cover"
        alt=""
      />
      <div className="max-w-2xl mx-auto p-5">
        <div className="flex justify-between mb-2">
          <h2 className="text-xl font-semibold">{current.question}</h2>
        </div>
        <p className="text-2xl mb-4 arab-0">{current.ayat}</p>
        <div className="grid gap-2">
          {current.options.map((opt) => (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              className={`px-4 py-2 border rounded text-left hover:bg-slate-100 arab-0 ${
                selected === opt ? "border-slate-700 bg-slate-100" : ""
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
        <div className="mt-4 text-right flex gap-2 items-center justify-between flex-wrap">
          <span className="text-sm font-mono text-white bg-slate-800 px-2 py-1 rounded">
            ⏱ {formatTime(timeLeft)}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">
              Soal {currentIndex + 1} dari {questions.length}
            </span>
            <button
              onClick={handleNext}
              disabled={!selected}
              className="btn btn-sm bg-gradient-to-r hover:bg-gradient-to-t from-slate-800 to-slate-700 border-none hover:shadow-lg focus:ring-2 ring-offset-2 ring-slate-800 text-white disabled:opacity-50"
            >
              {currentIndex + 1 < questions.length
                ? "Selanjutnya"
                : "Lihat Hasil"}
            </button>
          </div>
        </div>
        <LinkProgresBars
          to="/"
          className="flex gap-2 items-center text-sm text-slate-500 underline py-1 w-max rounded-md"
        >
          Buka Al Quran
        </LinkProgresBars>
      </div>
    </div>
  );
}
