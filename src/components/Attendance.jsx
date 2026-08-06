import { useEffect, useState } from "react";

const STORAGE_KEY = "absensi";
const MONTHS_ID = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

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

const parseMonthKey = (monthKey) => {
  const [year, month] = monthKey.split("-").map(Number);
  return { year, month };
};

// Dapatkan jumlah hari dalam bulan
const getDaysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate(); // Bulan: 1-12
};

const buildDaysForMonth = (monthKey) => {
  const { year, month } = parseMonthKey(monthKey);
  const totalDays = getDaysInMonth(year, month);
  const datesArray = [];

  for (let i = 1; i <= totalDays; i++) {
    const d = new Date(year, month - 1, i);
    datesArray.push(getDateString(d));
  }

  return datesArray;
};

const getMonthLabel = (monthKey) => {
  const { year, month } = parseMonthKey(monthKey);
  return new Date(year, month - 1, 1).toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric",
  });
};

const loadAttendanceData = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

    // Migrasi format lama: { month, history }
    if (stored.month && stored.history) {
      return {
        months: {
          ...(stored.months || {}),
          [stored.month]: { history: stored.history },
        },
      };
    }

    return {
      months: stored.months || {},
    };
  } catch {
    return { months: {} };
  }
};

const Attendance = ({ isFriday }) => {
  const today = new Date();
  const currentMonthKey = getMonthKey(today);
  const currentYear = today.getFullYear();
  const currentMonthIndex = today.getMonth();

  const [absensi, setAbsensi] = useState({ months: {} });
  const [selectedMonthKey, setSelectedMonthKey] = useState(currentMonthKey);

  useEffect(() => {
    const now = new Date();
    const monthKey = getMonthKey(now);
    const todayStr = getDateString(now);
    const stored = loadAttendanceData();
    const months = { ...(stored.months || {}) };

    const currentMonthData = {
      history: { ...(months[monthKey]?.history || {}) },
    };
    if (!currentMonthData.history[todayStr]) {
      currentMonthData.history[todayStr] = true;
    }

    months[monthKey] = currentMonthData;

    const updatedData = { months };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
    setAbsensi(updatedData);
    setSelectedMonthKey(monthKey);
  }, []);

  const selectedMonthData = absensi.months?.[selectedMonthKey] || { history: {} };
  const daysInMonth = buildDaysForMonth(selectedMonthKey);

  const handleMonthClick = (monthKey, isDisabled) => {
    if (isDisabled) return;
    setSelectedMonthKey(monthKey);
  };

  return (
    <div className="bg-white border border-slate-200 border-dashed dark:border-gray-600 p-4 rounded-lg dark:bg-gray-800/50">
      <div className="flex flex-wrap gap-1 w-full">
        {daysInMonth.map((dateStr, index) => (
          <div
            key={dateStr}
            className={`w-6 h-6 text-[10px] flex items-center justify-center rounded-xs font-medium ${
              selectedMonthData?.history?.[dateStr]
                ? ` ${isFriday ? "bg-linear-to-r from-indigo-200 via-red-200 to-yellow-200 dark:from-indigo-200 dark:via-red-100 dark:to-yellow-100 text-gray-900" : "bg-slate-900 text-white dark:bg-green-900 dark:text-white"}`
                : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-white"
            }`}
            title={dateStr}
          >
            {index + 1}
          </div>
        ))}

        {/* <div className="w-full text-xs mt-1 text-slate-700 dark:text-gray-300 flex gap-1">
          <span className="hidden xl:block">Absensi Bulan</span>
          <span className="xl:font-semibold">{getMonthLabel(selectedMonthKey)}</span>
        </div> */}

        <div className="w-full mt-3">
          <div className="flex flex-nowrap overflow-x-scroll hidescroll  gap-2">
            {Array.from({ length: 12 }, (_, monthIndex) => {
              const monthKey = `${currentYear}-${String(monthIndex + 1).padStart(
                2,
                "0"
              )}`;
              const isFutureMonth = monthIndex > currentMonthIndex;
              const isActive = monthKey === selectedMonthKey;

              return (
                <button
                  key={monthKey}
                  type="button"
                  onClick={() => handleMonthClick(monthKey, isFutureMonth)}
                  disabled={isFutureMonth}
                  aria-pressed={isActive}
                  aria-label={`Lihat absensi ${MONTHS_ID[monthIndex]} ${currentYear}`}
                  className={`flex items-center justify-center rounded-lg border px-2 py-1 text-[10px] font-semibold transition-colors ${
                    isActive
                      ? "border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900"
                      : isFutureMonth
                        ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400 opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-500"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-400 hover:text-slate-900 dark:border-gray-700 dark:bg-gray-900/40 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:text-white"
                  }`}
                  title={
                    isFutureMonth
                      ? `Bulan ${MONTHS_ID[monthIndex]} belum bisa dipilih`
                      : `Lihat absensi ${MONTHS_ID[monthIndex]} ${currentYear}`
                  }
                >
                  {MONTHS_ID[monthIndex]}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
