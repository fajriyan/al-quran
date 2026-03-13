import { useEffect, useState } from "react";

const PRAYERS = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

function getNextPrayer(times) {
  const now = new Date();

  for (const prayer of PRAYERS) {
    const [hour, minute] = times[prayer].split(":").map(Number);

    const prayerTime = new Date();
    prayerTime.setHours(hour, minute, 0, 0);

    if (now < prayerTime) {
      return { name: prayer, time: times[prayer] };
    }
  }

  return { name: "Fajr", time: times.Fajr };
}

function Adzan() {
  const [state, setState] = useState({
    nextPrayer: null,
    timings: null,
    locationName: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    const today = new Date().toLocaleDateString();

    const savedData = localStorage.getItem("prayerTimes");
    const savedDate = localStorage.getItem("prayerDate");
    const savedLocation = localStorage.getItem("locationName");

    if (savedData && savedDate === today && savedLocation) {
      const data = JSON.parse(savedData);

      setState({
        nextPrayer: getNextPrayer(data.timings),
        timings: data.timings,
        locationName: savedLocation,
        error: null,
        loading: false,
      });

      return;
    }

    if (!navigator.geolocation) {
      setState((prev) => ({
        ...prev,
        error: "Geolocation tidak didukung oleh browser",
        loading: false,
      }));
      return;
    }

    navigator.geolocation.getCurrentPosition(fetchPrayerData, handleGeoError);
  }, []);

  const fetchPrayerData = async (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const today = new Date().toLocaleDateString();

    try {
      const [prayerRes, locRes] = await Promise.all([
        fetch(
          `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=2`,
        ),
        fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`,
        ),
      ]);

      const prayerData = await prayerRes.json();
      const locData = await locRes.json();

      if (prayerData.code !== 200) {
        throw new Error("Gagal mengambil jadwal salat");
      }

      const displayLocation =
        locData.address?.village ||
        locData.address?.town ||
        locData.address?.suburb ||
        locData.address?.city ||
        locData.address?.county ||
        locData.display_name;

      localStorage.setItem("prayerTimes", JSON.stringify(prayerData.data));
      localStorage.setItem("prayerDate", today);
      localStorage.setItem("locationName", displayLocation);

      setState({
        nextPrayer: getNextPrayer(prayerData.data.timings),
        timings: prayerData.data.timings,
        locationName: displayLocation,
        error: null,
        loading: false,
      });
    } catch (err) {
      setState((prev) => ({
        ...prev,
        error: err.message,
        loading: false,
      }));
    }
  };

  const handleGeoError = (err) => {
    let message = "Gagal mendapatkan lokasi";

    if (err.code === err.PERMISSION_DENIED) {
      message = "Izin lokasi ditolak. Aktifkan izin di browser.";
    }

    setState((prev) => ({
      ...prev,
      error: message,
      loading: false,
    }));
  };

  const { nextPrayer, timings, locationName, error, loading } = state;

  if (loading) return null;

  return (
    <div>
      {error && <p className="text-red-400 text-sm">{error}</p>}

      {nextPrayer && timings && (
        <div className="relative group w-max">
          <div className="border px-3 py-1.5 rounded-xl bg-white/20 group-hover:bg-white/30 backdrop-blur-sm cursor-pointer">
            <p className="font-semibold text-xs sm:text-sm">
              {nextPrayer.name} : {nextPrayer.time}
            </p>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 -bottom-[130px] mb-2 opacity-0 group-hover:opacity-100 transition pointer-events-none">
            <div className="bg-black text-white text-xs rounded-lg p-3 space-y-1 whitespace-nowrap">
              {PRAYERS.map((prayer) => (
                <div key={prayer} className="flex justify-between gap-4">
                  <span>{prayer}</span>
                  <span>{timings[prayer]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {locationName && (
        <p className="text-[11px] text-white text-center mt-1">
          {locationName}
        </p>
      )}
    </div>
  );
}

export default Adzan;
