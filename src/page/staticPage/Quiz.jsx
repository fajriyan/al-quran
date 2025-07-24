import { useEffect, useState, useContext } from "react";
import ProgresContext from "../../lib/ProgresContext";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]); // simpan jawaban pengguna
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [_, setProgressBar] = useContext(ProgresContext);

  useEffect(() => {
    fetch("/src/data/quiz1.json")
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .then(setProgressBar(false))
      .catch((err) => console.error("Gagal load soal:", err));
  }, []);

  if (questions.length === 0)
    return <p className="text-center mt-10">Memuat soal...</p>;

  const current = questions[currentIndex];

  function handleSelect(option) {
    setSelected(option);
  }

  function handleNext() {
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
    setCurrentIndex(0);
    setSelected(null);
    setScore(0);
    setShowResult(false);
    setAnswers([]);
  }

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
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={resetQuiz}
          >
            Ulangi Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-5">
      <h2 className="text-xl font-semibold mb-2">{current.question}</h2>
      <p className="text-2xl mb-4 arab-0">{current.ayat}</p>
      <div className="grid gap-2">
        {current.options.map((opt) => (
          <button
            key={opt}
            onClick={() => handleSelect(opt)}
            className={`px-4 py-2 border rounded text-left hover:bg-blue-50 arab-0 ${
              selected === opt ? "border-blue-600 bg-blue-100" : ""
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
      <div className="mt-4 text-right">
        <button
          onClick={handleNext}
          disabled={!selected}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          {currentIndex + 1 < questions.length ? "Selanjutnya" : "Lihat Hasil"}
        </button>
      </div>
    </div>
  );
}
