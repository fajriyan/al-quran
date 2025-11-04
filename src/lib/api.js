const BASE_URL = "https://equran.id/api/";

export async function apiGetSurah({ id = null }) {
  const url = id ? `${BASE_URL}/surat/${id}` : `${BASE_URL}/surat`;
  const request = await fetch(url);
  const data = await request.json();
  return data;
}

export async function apiGetTafsir({ number = null }) {
  const url = `${BASE_URL}/v2/tafsir/${number}`;
  const request = await fetch(url);
  const data = await request.json();
  return data;
}

export async function apiGetChangelog({ first = false }) {
  const request = await fetch(
    "https://api.github.com/repos/fajriyan/al-quran/commits"
  );
  const data = await request.json();
  if (data && first) {
    return data[0];
  } else {
    return data;
  }
}
