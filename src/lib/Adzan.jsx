import React, { useEffect, useState } from "react";

function Adzan() {
  const [nextPrayer, setNextPrayer] = useState(null);
  const [locationName, setLocationName] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      const savedData = localStorage.getItem("prayerTimes");
      const savedDate = localStorage.getItem("prayerDate");
      const savedLocation = localStorage.getItem("locationName");
      const today = new Date().toLocaleDateString();

      if (savedData && savedDate === today && savedLocation) {
        const data = JSON.parse(savedData);
        const upcoming = getNextPrayer(data.timings);
        setNextPrayer(upcoming);
        setLocationName(savedLocation);
      } else {
        if (!navigator.geolocation) {
          setError("Geolocation tidak didukung oleh browser.");
          return;
        }

        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            try {
              // 1. Ambil waktu salat
              const response = await fetch(
                `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=2`
              );
              const data = await response.json();

              // 2. Ambil nama lokasi dari koordinat
              const locRes = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
              );
              const locData = await locRes.json();

              const displayLocation =
                locData.address?.village ||
                locData.address?.town ||
                locData.address?.suburb ||
                locData.address?.city ||
                locData.address?.county ||
                locData.display_name;

              if (data.code === 200) {
                localStorage.setItem("prayerTimes", JSON.stringify(data.data));
                localStorage.setItem("prayerDate", today);
                localStorage.setItem("locationName", displayLocation);
                setLocationName(displayLocation);

                const upcoming = getNextPrayer(data.data.timings);
                setNextPrayer(upcoming);
              } else {
                setError("Gagal mengambil jadwal salat");
              }
            } catch (e) {
              setError("Terjadi kesalahan saat mengambil data API");
            }
          },
          (err) => {
            if (err.code === err.PERMISSION_DENIED) {
              setError(
                "Izin lokasi ditolak. Aktifkan izin di pengaturan browser."
              );
            } else {
              setError("Gagal mendapatkan lokasi: " + err.message);
            }
          }
        );
      }
    };

    fetchData();
  }, []);

  function getNextPrayer(times) {
    const now = new Date();
    const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

    for (let prayer of prayers) {
      const [hour, minute] = times[prayer].split(":");
      const prayerTime = new Date();
      prayerTime.setHours(parseInt(hour));
      prayerTime.setMinutes(parseInt(minute));
      prayerTime.setSeconds(0);

      if (now < prayerTime) {
        return { name: prayer, time: times[prayer] };
      }
    }

    return { name: "Fajr", time: times.Fajr };
  }

  return (
    <div className="">
      {error && (
        <div className="relative group">
          <div className="text-red-400 animate-pulse">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-compass"
              viewBox="0 0 16 16"
            >
              <path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016m6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0" />
              <path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z" />
            </svg>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max p-2 bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity">
            Lokasi tidak diizinkan
          </div>
        </div>
      )}

      {nextPrayer && (
        <>
          <div className="border w-max px-3 py-1.5 rounded-xl bg-white/20 backdrop-blur-sm">
            <p className="font-semibold text-xs sm:text-sm">
              {nextPrayer.name} : {nextPrayer.time}
            </p>
          </div>
          <div>
            {locationName && (
              <p className="text-[11px] text-white text-center mt-1">
                {locationName}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Adzan;
