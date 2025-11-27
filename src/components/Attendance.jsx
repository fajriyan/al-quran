import { useEffect, useState } from "react";

// Fungsi format tanggal lokal YYYY-MM-DD
const getDateString = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Format bulan sebagai key lokal: YYYY-MM
const getMonthKey = (date = new Date()) => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}`;
};

// Dapatkan jumlah hari dalam bulan
const getDaysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate(); // Bulan: 1-12
};

const Attendance = ({ isFriday }) => {
  const [absensi, setAbsensi] = useState({});
  const [monthKey, setMonthKey] = useState(getMonthKey());
  const [daysInMonth, setDaysInMonth] = useState([]);

  useEffect(() => {
    const today = new Date();
    const currentMonthKey = getMonthKey(today);
    const todayStr = getDateString(today);

    // Inisialisasi array tanggal dalam bulan ini
    const totalDays = getDaysInMonth(today.getFullYear(), today.getMonth() + 1);
    const datesArray = [];
    for (let i = 1; i <= totalDays; i++) {
      const d = new Date(today.getFullYear(), today.getMonth(), i);
      datesArray.push(getDateString(d));
    }
    setDaysInMonth(datesArray);

    // Ambil dari localStorage
    const stored = JSON.parse(localStorage.getItem("absensi")) || {};
    const storedMonth = stored.month || null;
    let history = stored.history || {};

    // Reset jika bulan berbeda
    if (storedMonth !== currentMonthKey) {
      history = {};
    }

    // Tandai absensi hari ini
    if (!history[todayStr]) {
      history[todayStr] = true;
    }

    const updatedData = {
      month: currentMonthKey,
      history,
    };

    localStorage.setItem("absensi", JSON.stringify(updatedData));
    setAbsensi(updatedData);
    setMonthKey(currentMonthKey);
  }, []);

  // Tampilkan nama bulan dalam bahasa Indonesia
  const getMonthName = () => {
    const [year, month] = monthKey.split("-");
    const date = new Date(`${year}-${month}-01`);
    return date.toLocaleDateString("id-ID", { month: "long", year: "numeric" });
  };

  return (
    <div className="bg-white border border-slate-200 border-dashed dark:border-gray-600 p-4 rounded-lg  dark:bg-gray-800/50">
      <div className="flex flex-wrap gap-1 w-full">
        {daysInMonth.map((dateStr, index) => (
          <div
            key={dateStr}
            className={`w-6 h-6 text-[10px] flex items-center justify-center rounded-sm font-medium ${
              absensi?.history?.[dateStr]
                ? ` ${isFriday ? "bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-200 dark:from-indigo-200 dark:via-red-100 dark:to-yellow-100 text-gray-900" : "bg-slate-900 text-white dark:bg-green-900 dark:text-white"}`
                : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-white"
            }`}
            title={dateStr}
          >
            {index + 1}
          </div>
        ))}
        <div className="text-xs mt-1 text-slate-700 dark:text-gray-300 flex gap-1">
          {" "}
          <span className="hidden xl:block">Absensi Bulan</span>{" "}
          <span className="xl:font-semibold">{getMonthName()}</span>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
