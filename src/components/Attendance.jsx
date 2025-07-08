import { useEffect, useState } from "react";

// Fungsi untuk ambil nama hari dari date
const getDayName = (date) => {
  return date.toLocaleDateString("id-ID", { weekday: "long" }); 
};

// Fungsi untuk dapatkan awal minggu (Senin)
const getStartOfWeek = (date = new Date()) => {
  const day = date.getDay(); // 0 (Minggu) - 6 (Sabtu)
  const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Geser ke Senin
  const startOfWeek = new Date(date.setDate(diff));
  return startOfWeek.toISOString().split("T")[0]; // Format: "2025-07-01"
};

const Attendance = () => {
  const [absensi, setAbsensi] = useState({});

  useEffect(() => {
    const today = new Date();
    const todayName = getDayName(today);
    const thisWeekStart = getStartOfWeek(today);

    // Ambil dari localStorage
    const stored = JSON.parse(localStorage.getItem("absensi")) || {};
    const storedWeek = stored.weekStart || null;
    let history = stored.history || {};

    // Jika minggu berbeda, reset history
    if (storedWeek !== thisWeekStart) {
      history = {};
    }

    if (!history[todayName]) {
      history[todayName] = true;
    }

    const updatedData = {
      weekStart: thisWeekStart,
      history,
    };

    localStorage.setItem("absensi", JSON.stringify(updatedData));
    setAbsensi(updatedData);
  }, []);

  return (
    <div className="bg-white border border-slate-200 p-6 rounded-lg">
      <ul className="flex justify-between">
        {["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Ahad"].map(
          (day) => (
            <li key={day} className="">
              <div
                className={
                  absensi?.history?.[day] ? "text-red-500" : "text-red-500"
                }
              >
                {absensi?.history?.[day] ? (
                  <>
                    <svg
                      className="w-6 h-6"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.597 3.2A1 1 0 0 0 7.04 4.289a3.49 3.49 0 0 1 .057 1.795 3.448 3.448 0 0 1-.84 1.575.999.999 0 0 0-.077.094c-.596.817-3.96 5.6-.941 10.762l.03.049a7.73 7.73 0 0 0 2.917 2.602 7.617 7.617 0 0 0 3.772.829 8.06 8.06 0 0 0 3.986-.975 8.185 8.185 0 0 0 3.04-2.864c1.301-2.2 1.184-4.556.588-6.441-.583-1.848-1.68-3.414-2.607-4.102a1 1 0 0 0-1.594.757c-.067 1.431-.363 2.551-.794 3.431-.222-2.407-1.127-4.196-2.224-5.524-1.147-1.39-2.564-2.3-3.323-2.788a8.487 8.487 0 0 1-.432-.287Z" />
                    </svg>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-6 h-6"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M18.122 17.645a7.185 7.185 0 0 1-2.656 2.495 7.06 7.06 0 0 1-3.52.853 6.617 6.617 0 0 1-3.306-.718 6.73 6.73 0 0 1-2.54-2.266c-2.672-4.57.287-8.846.887-9.668A4.448 4.448 0 0 0 8.07 6.31 4.49 4.49 0 0 0 7.997 4c1.284.965 6.43 3.258 5.525 10.631 1.496-1.136 2.7-3.046 2.846-6.216 1.43 1.061 3.985 5.462 1.754 9.23Z"
                      />
                    </svg>
                  </>
                )}
              </div>
              <div className="text-xs text-slate-700 mt-1.5">{day}</div>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default Attendance;
