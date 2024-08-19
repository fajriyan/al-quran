import { useNavigate, useLocation, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import ProgresContext from "../../lib/ProgresContext";
import LinkProgresBars from "../../lib/LinkProgresBars";

const Matsurat = () => {
  const [_, setProgressBar] = useContext(ProgresContext);

  const alfatihah = [
    {
      id: 1,
      surah: 1,
      nomor: 1,
      ar: "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ",
      tr: "bismillāhir-raḥmānir-raḥīm(i).",
      idn: "Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.",
    },
    {
      id: 2,
      surah: 1,
      nomor: 2,
      ar: "اَلْحَمْدُ لِلّٰهِ رَبِّ الْعٰلَمِيْنَۙ",
      tr: "al-ḥamdu lillāhi rabbil-‘ālamīn(a).",
      idn: "Segala puji bagi Allah, Tuhan seluruh alam,",
    },
    {
      id: 3,
      surah: 1,
      nomor: 3,
      ar: "الرَّحْمٰنِ الرَّحِيْمِۙ",
      tr: "ar-raḥmānir-raḥīm(i).",
      idn: "Yang Maha Pengasih, Maha Penyayang,",
    },
    {
      id: 4,
      surah: 1,
      nomor: 4,
      ar: "مٰلِكِ يَوْمِ الدِّيْنِۗ",
      tr: "māliki yaumid-dīn(i).",
      idn: "Pemilik hari pembalasan.",
    },
    {
      id: 5,
      surah: 1,
      nomor: 5,
      ar: "اِيَّاكَ نَعْبُدُ وَاِيَّاكَ نَسْتَعِيْنُۗ",
      tr: "iyyāka na‘budu wa iyyāka nasta‘īn(u),",
      idn: "Hanya kepada Engkaulah kami menyembah dan hanya kepada Engkaulah kami mohon pertolongan.",
    },
    {
      id: 6,
      surah: 1,
      nomor: 6,
      ar: "اِهْدِنَا الصِّرَاطَ الْمُسْتَقِيْمَۙ",
      tr: "ihdinaṣ-ṣirāṭal-mustaqīm(a).",
      idn: "Tunjukilah kami jalan yang lurus,",
    },
    {
      id: 7,
      surah: 1,
      nomor: 7,
      ar: "صِرَاطَ الَّذِيْنَ اَنْعَمْتَ عَلَيْهِمْ ەۙ غَيْرِ الْمَغْضُوْبِ عَلَيْهِمْ وَلَا الضَّاۤلِّيْنَ ࣖ",
      tr: "Ṣirāṭal-lażīna an‘amta ‘alaihim, gairil-magḍūbi ‘alaihim wa laḍ-ḍāllīn(a).",
      idn: "(yaitu) jalan orang-orang yang telah Engkau beri nikmat kepadanya; bukan (jalan) mereka yang dimurkai, dan bukan (pula jalan) mereka yang sesat.",
    },
  ];
  const albaqarah15 = [
    {
      id: 8,
      surah: 2,
      nomor: 1,
      ar: "الۤمّۤ ۚ",
      tr: "alif lām mīm.",
      idn: "Alif Lam Mim.",
    },
    {
      id: 9,
      surah: 2,
      nomor: 2,
      ar: "ذٰلِكَ الْكِتٰبُ لَا رَيْبَ ۛ فِيْهِ ۛ هُدًى لِّلْمُتَّقِيْنَۙ",
      tr: "Żālikal-kitābu lā raiba fīh(i), hudal lil-muttaqīn(a).",
      idn: "Kitab (Al-Qur'an) ini tidak ada keraguan padanya; petunjuk bagi mereka yang bertakwa,",
    },
    {
      id: 10,
      surah: 2,
      nomor: 3,
      ar: "الَّذِيْنَ يُؤْمِنُوْنَ بِالْغَيْبِ وَيُقِيْمُوْنَ الصَّلٰوةَ وَمِمَّا رَزَقْنٰهُمْ يُنْفِقُوْنَ ۙ",
      tr: "al-lażīna yu'minūna bil-gaibi wa yuqīmūnaṣ-ṣalāta wa mimmā razaqnāhum yunfiqūn(a).",
      idn: "(yaitu) mereka yang beriman kepada yang gaib, melaksanakan salat, dan menginfakkan sebagian rezeki yang Kami berikan kepada mereka,",
    },
    {
      id: 11,
      surah: 2,
      nomor: 4,
      ar: "وَالَّذِيْنَ يُؤْمِنُوْنَ بِمَآ اُنْزِلَ اِلَيْكَ وَمَآ اُنْزِلَ مِنْ قَبْلِكَ ۚ وَبِالْاٰخِرَةِ هُمْ يُوْقِنُوْنَۗ",
      tr: "wal-lażīna yu'minūna bimā unzila ilaika wa mā unzila min qablik(a), wabil-ākhirati hum yūqinūn(a).",
      idn: "dan mereka yang beriman kepada (Al-Qur'an) yang diturunkan kepadamu (Muhammad) dan (kitab-kitab) yang telah diturunkan sebelum engkau, dan mereka yakin akan adanya akhirat.",
    },
    {
      id: 12,
      surah: 2,
      nomor: 5,
      ar: "اُولٰۤىِٕكَ عَلٰى هُدًى مِّنْ رَّبِّهِمْ ۙ وَاُولٰۤىِٕكَ هُمُ الْمُفْلِحُوْنَ",
      tr: "ulā'ika ‘alā hudam mir rabbihim wa ulā'ika humul-mufliḥūn(a).",
      idn: "Merekalah yang mendapat petunjuk dari Tuhannya, dan mereka itulah orang-orang yang beruntung.",
    },
  ];
  const albaqarah255_257 = [
    {
      id: 262,
      surah: 2,
      nomor: 255,
      ar: "اَللّٰهُ لَآ اِلٰهَ اِلَّا هُوَۚ اَلْحَيُّ الْقَيُّوْمُ ەۚ لَا تَأْخُذُهٗ سِنَةٌ وَّلَا نَوْمٌۗ  لَهٗ مَا فِى السَّمٰوٰتِ وَمَا فِى الْاَرْضِۗ مَنْ ذَا الَّذِيْ يَشْفَعُ عِنْدَهٗٓ اِلَّا بِاِذْنِهٖۗ يَعْلَمُ مَا بَيْنَ اَيْدِيْهِمْ وَمَا خَلْفَهُمْۚ وَلَا يُحِيْطُوْنَ بِشَيْءٍ مِّنْ عِلْمِهٖٓ اِلَّا بِمَا شَاۤءَۚ وَسِعَ كُرْسِيُّهُ السَّمٰوٰتِ وَالْاَرْضَۚ وَلَا يَـُٔوْدُهٗ حِفْظُهُمَاۚ وَهُوَ الْعَلِيُّ الْعَظِيْمُ",
      tr: "allāhu lā ilāha illā huw(a), al-ḥayyul-qayyūm(u), lā ta'khużuhū sinatuw wa lā naum(un), lahū mā fis-samāwāti wa mā fil-arḍ(i), man żal-lażī yasyfa‘u ‘indahū illā bi'iżnih(ī), ya‘lamu mā baina aidīhim wa mā khalfahum, wa lā yuḥīṭūna bisyai'im min ‘ilmihī illā bimā syā'(a), wasi‘a kursiyyuhus-samāwāti wal-arḍ(a), wa lā ya'ūduhū ḥifẓuhumā, wa huwal-‘aliyyul-‘aẓīm(u).",
      idn: "Allah, tidak ada tuhan selain Dia. Yang Mahahidup, Yang terus menerus mengurus (makhluk-Nya), tidak mengantuk dan tidak tidur. Milik-Nya apa yang ada di langit dan apa yang ada di bumi. Tidak ada yang dapat memberi syafaat di sisi-Nya tanpa izin-Nya. Dia mengetahui apa yang di hadapan mereka dan apa yang di belakang mereka, dan mereka tidak mengetahui sesuatu apa pun tentang ilmu-Nya melainkan apa yang Dia kehendaki. Kursi-Nya meliputi langit dan bumi. Dan Dia tidak merasa berat memelihara keduanya, dan Dia Mahatinggi, Mahabesar.",
    },
    {
      id: 263,
      surah: 2,
      nomor: 256,
      ar: "لَآ اِكْرَاهَ فِى الدِّيْنِۗ  قَدْ تَّبَيَّنَ الرُّشْدُ مِنَ الْغَيِّ ۚ فَمَنْ يَّكْفُرْ بِالطَّاغُوْتِ وَيُؤْمِنْۢ بِاللّٰهِ فَقَدِ اسْتَمْسَكَ بِالْعُرْوَةِ الْوُثْقٰى لَا انْفِصَامَ لَهَا ۗوَاللّٰهُ سَمِيْعٌ عَلِيْمٌ",
      tr: "lā ikrāha fid-dīn(i), qat tabayyanar-rusydu minal-gayy(i), famay yakfur biṭ-ṭāgūti wa yu'mim billāhi fa qadistamsaka bil-‘urwatil-wuṡqā, lanfiṣāma lahā, wallāhu samī‘un ‘alīm(un).",
      idn: "Tidak ada paksaan dalam (menganut) agama (Islam), sesungguhnya telah jelas (perbedaan) antara jalan yang benar dengan jalan yang sesat. Barang siapa ingkar kepada Tagut dan beriman kepada Allah, maka sungguh, dia telah berpegang (teguh) pada tali yang sangat kuat yang tidak akan putus. Allah Maha Mendengar, Maha Mengetahui.",
    },
    {
      id: 264,
      surah: 2,
      nomor: 257,
      ar: "اَللّٰهُ وَلِيُّ الَّذِيْنَ اٰمَنُوْا يُخْرِجُهُمْ مِّنَ الظُّلُمٰتِ اِلَى النُّوْرِۗ وَالَّذِيْنَ كَفَرُوْٓا اَوْلِيَاۤؤُهُمُ الطَّاغُوْتُ يُخْرِجُوْنَهُمْ مِّنَ النُّوْرِ اِلَى الظُّلُمٰتِۗ  اُولٰۤىِٕكَ اَصْحٰبُ النَّارِۚ هُمْ فِيْهَا خٰلِدُوْنَ ࣖ",
      tr: "allāhu waliyyul-lażīna āmanū yukhrijuhum minaẓ-ẓulumāti ilan-nūr(i), wal-lażīna kafarū auliyā'uhumuṭ-ṭāgūtu yukhrijuhum minan-nūri ilaẓ-ẓulumāt(i), ulā'ika aṣḥābun-nār(i), hum fīhā khālidūn(a).",
      idn: "Allah pelindung orang yang beriman. Dia mengeluarkan mereka dari kegelapan kepada cahaya (iman). Dan orang-orang yang kafir, pelindung-pelindungnya adalah setan, yang mengeluarkan mereka dari cahaya kepada kegelapan. Mereka adalah penghuni neraka. Mereka kekal di dalamnya.",
    },
  ];
  const albaqarah284_286 = [
    {
      id: 291,
      surah: 2,
      nomor: 284,
      ar: " لِلّٰهِ مَا فِى السَّمٰوٰتِ وَمَا فِى الْاَرْضِ ۗ وَاِنْ تُبْدُوْا مَا فِيْٓ اَنْفُسِكُمْ اَوْ تُخْفُوْهُ يُحَاسِبْكُمْ بِهِ اللّٰهُ ۗ فَيَغْفِرُ لِمَنْ يَّشَاۤءُ وَيُعَذِّبُ مَنْ يَّشَاۤءُ ۗ وَاللّٰهُ عَلٰى كُلِّ شَيْءٍ قَدِيْرٌ",
      tr: "lillāhi mā fis-samāwāti wa mā fil-arḍ(i), wa in tubdū mā fī anfusikum au tukhfūhu yuḥāsibkum bihillāh(u), fayagfiru limay yasyā'u wa yu‘ażżibu may yasyā'(u), wallāhu ‘alā kulli syai'in qadīr(un).",
      idn: "Milik Allah-lah apa yang ada di langit dan apa yang ada di bumi. Jika kamu nyatakan apa yang ada di dalam hatimu atau kamu sembunyikan, niscaya Allah memperhitungkannya (tentang perbuatan itu) bagimu. Dia mengampuni siapa yang Dia kehendaki dan mengazab siapa yang Dia kehendaki. Allah Mahakuasa atas segala sesuatu.",
    },
    {
      id: 292,
      surah: 2,
      nomor: 285,
      ar: "اٰمَنَ الرَّسُوْلُ بِمَآ اُنْزِلَ اِلَيْهِ مِنْ رَّبِّهٖ وَالْمُؤْمِنُوْنَۗ  كُلٌّ اٰمَنَ بِاللّٰهِ وَمَلٰۤىِٕكَتِهٖ وَكُتُبِهٖ وَرُسُلِهٖۗ  لَا نُفَرِّقُ بَيْنَ اَحَدٍ مِّنْ رُّسُلِهٖ ۗ وَقَالُوْا سَمِعْنَا وَاَطَعْنَا غُفْرَانَكَ رَبَّنَا وَاِلَيْكَ الْمَصِيْرُ",
      tr: "Āmanar-rasūlu bimā unzila ilaihi mir rabbihī wal-mu'minūn(a), kullun āmana billāhi wa malā'ikatihī wa kutubihī wa rusulih(ī), lā nufarriqu baina aḥadim mir rusulih(ī), wa qālū sami‘nā wa aṭa‘nā, gufrānaka rabbanā wa ilaikal-maṣīr(u).",
      idn: "Rasul (Muhammad) beriman kepada apa yang diturunkan kepadanya (Al-Qur'an) dari Tuhannya, demikian pula orang-orang yang beriman. Semua beriman kepada Allah, malaikat-malaikat-Nya, kitab-kitab-Nya dan rasul-rasul-Nya. (Mereka berkata), “Kami tidak membeda-bedakan seorang pun dari rasul-rasul-Nya.” Dan mereka berkata, “Kami dengar dan kami taat. Ampunilah kami Ya Tuhan kami, dan kepada-Mu tempat (kami) kembali.”",
    },
    {
      id: 293,
      surah: 2,
      nomor: 286,
      ar: "لَا يُكَلِّفُ اللّٰهُ نَفْسًا اِلَّا وُسْعَهَا ۗ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ ۗ رَبَّنَا لَا تُؤَاخِذْنَآ اِنْ نَّسِيْنَآ اَوْ اَخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَآ اِصْرًا كَمَا حَمَلْتَهٗ عَلَى الَّذِيْنَ مِنْ قَبْلِنَا ۚ رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهٖۚ وَاعْفُ عَنَّاۗ وَاغْفِرْ لَنَاۗ وَارْحَمْنَا ۗ اَنْتَ مَوْلٰىنَا فَانْصُرْنَا عَلَى الْقَوْمِ الْكٰفِرِيْنَ ࣖ",
      tr: "lā yukallifullāhu nafsan illā wus‘ahā, lahā mā kasabat wa ‘alaihā maktasabat, rabbanā lā tu'ākhiżnā in nasīnā au akhṭa'nā, rabbanā wa lā taḥmil ‘alainā iṣran kamā ḥamaltahū ‘alal-lażīna min qablinā, rabbanā wa lā tuḥammilnā mā lā ṭāqata lanā bih(ī), wa‘fu ‘annā, wagfir lanā, warḥamnā, anta maulānā fanṣurnā ‘alal qaumil-kāfirīn(a).",
      idn: "Allah tidak membebani seseorang melainkan sesuai dengan kesanggupannya. Dia mendapat (pahala) dari (kebajikan) yang dikerjakannya dan dia mendapat (siksa) dari (kejahatan) yang diperbuatnya. (Mereka berdoa), “Ya Tuhan kami, janganlah Engkau hukum kami jika kami lupa atau kami melakukan kesalahan. Ya Tuhan kami, janganlah Engkau bebani kami dengan beban yang berat sebagaimana Engkau bebankan kepada orang-orang sebelum kami. Ya Tuhan kami, janganlah Engkau pikulkan kepada kami apa yang tidak sanggup kami memikulnya. Maafkanlah kami, ampunilah kami, dan rahmatilah kami. Engkaulah pelindung kami, maka tolonglah kami menghadapi orang-orang kafir.”",
    },
  ];
  const alikhlas = [
    {
      id: 6222,
      surah: 112,
      nomor: 1,
      ar: "قُلْ هُوَ اللّٰهُ اَحَدٌۚ",
      tr: "qul huwallāhu aḥad(un).",
      idn: "Katakanlah (Muhammad), “Dialah Allah, Yang Maha Esa.",
    },
    {
      id: 6223,
      surah: 112,
      nomor: 2,
      ar: "اَللّٰهُ الصَّمَدُۚ",
      tr: "allāhuṣ-ṣamad(u).",
      idn: "Allah tempat meminta segala sesuatu.",
    },
    {
      id: 6224,
      surah: 112,
      nomor: 3,
      ar: "لَمْ يَلِدْ وَلَمْ يُوْلَدْۙ",
      tr: "lam yalid wa lam yūlad.",
      idn: "(Allah) tidak beranak dan tidak pula diperanakkan.",
    },
    {
      id: 6225,
      surah: 112,
      nomor: 4,
      ar: "وَلَمْ يَكُنْ لَّهٗ كُفُوًا اَحَدٌ ࣖ",
      tr: "wa lam yakul lahū kufuwan aḥad(un).",
      idn: "Dan tidak ada sesuatu yang setara dengan Dia.”",
    },
  ];
  const alfalaq = [
    {
      id: 6226,
      surah: 113,
      nomor: 1,
      ar: "قُلْ اَعُوْذُ بِرَبِّ الْفَلَقِۙ",
      tr: "qul a‘ūżu birabbil-falaq(i).",
      idn: "Katakanlah, “Aku berlindung kepada Tuhan yang menguasai subuh (fajar),",
    },
    {
      id: 6227,
      surah: 113,
      nomor: 2,
      ar: "مِنْ شَرِّ مَا خَلَقَۙ",
      tr: "min syarri mā khalaq(a).",
      idn: "dari kejahatan (makhluk yang) Dia ciptakan,",
    },
    {
      id: 6228,
      surah: 113,
      nomor: 3,
      ar: "وَمِنْ شَرِّ غَاسِقٍ اِذَا وَقَبَۙ",
      tr: "wa min syarri gāsiqin iżā waqab(a).",
      idn: "dan dari kejahatan malam apabila telah gelap gulita,",
    },
    {
      id: 6229,
      surah: 113,
      nomor: 4,
      ar: "وَمِنْ شَرِّ النَّفّٰثٰتِ فِى الْعُقَدِۙ",
      tr: "wa min syarrin-naffāṡāti fil-‘uqad(i).",
      idn: "dan dari kejahatan (perempuan-perempuan) penyihir yang meniup pada buhul-buhul (talinya),",
    },
    {
      id: 6230,
      surah: 113,
      nomor: 5,
      ar: "وَمِنْ شَرِّ حَاسِدٍ اِذَا حَسَدَ ࣖ",
      tr: "wa min syarri ḥāsidin iżā ḥasad(a).",
      idn: "dan dari kejahatan orang yang dengki apabila dia dengki.”",
    },
  ];
  const annas = [
    {
      id: 6231,
      surah: 114,
      nomor: 1,
      ar: "قُلْ اَعُوْذُ بِرَبِّ النَّاسِۙ",
      tr: "qul a‘ūżu birabbin-nās(i).",
      idn: "Katakanlah, “Aku berlindung kepada Tuhannya manusia,",
    },
    {
      id: 6232,
      surah: 114,
      nomor: 2,
      ar: "مَلِكِ النَّاسِۙ",
      tr: "malikin-nās(i).",
      idn: "Raja manusia,",
    },
    {
      id: 6233,
      surah: 114,
      nomor: 3,
      ar: "اِلٰهِ النَّاسِۙ",
      tr: "ilāhin-nās(i).",
      idn: "sembahan manusia,",
    },
    {
      id: 6234,
      surah: 114,
      nomor: 4,
      ar: "مِنْ شَرِّ الْوَسْوَاسِ ەۙ الْخَنَّاسِۖ",
      tr: "min syarril-waswāsil-khannās(i).",
      idn: "dari kejahatan (bisikan) setan yang bersembunyi,",
    },
    {
      id: 6235,
      surah: 114,
      nomor: 5,
      ar: "الَّذِيْ يُوَسْوِسُ فِيْ صُدُوْرِ النَّاسِۙ",
      tr: "allażī yuwaswisu fī ṣudūrin-nās(i).",
      idn: "yang membisikkan (kejahatan) ke dalam dada manusia,",
    },
    {
      id: 6236,
      surah: 114,
      nomor: 6,
      ar: "مِنَ الْجِنَّةِ وَالنَّاسِ ࣖ ",
      tr: "minal jinnati wan-nās(i).",
      idn: "dari (golongan) jin dan manusia.”",
    },
  ];
  const almatsurat = [
    {
      id: 172010,
      nomor: 1,
      heading: "Do'a Al-Matsurat - 3X",
      ar: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلّهَِ وَالْحَمْدُ لِلّهَِ لاَ شَرِيكَ لَهُ، لاَ إِلهَ إِلَّا هُوَ وَإِلَيْهِ النُّشُوْرُ",
      idn: "Kami berpagi hari dan berpagi hari pula kerjaan milik Allah. Segala puji bagi Allah, tiada sekutu bagi-Nya, tiada Tuhan melainkan Dia dan kepada-Nya tempat kembali.",
    },
    {
      id: 172012,
      nomor: 2,
      heading: "Do'a Al-Matsurat - 3X",
      ar: "أَصْبَحْنَا عَلَى فِطْرَةِ اْلإِسْلاَمِ وَعَلَى كَلِمَةِ اْلإِخْلاَصِ وَعَلَى دِيْنِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ وَعَلَى مِلَّةِ أَبِيْنَا إِبْرَاهِيْمَ حَنِيْفًا مُسْلِمًا وَمَا كَانَ مِنَ الْمُشْرِكِيْنَ",
      idn: "Di waktu pagi (sore) kami memegang agama Islam, kalimat ikhlas, agama Nabi kita Muhammad shallallahu ‘alaihi wa sallam, dan agama ayah kami Ibrahim, yang berdiri di atas jalan yang lurus, muslim dan tidak tergolong orang-orang musyrik.",
    },
    {
      id: 172013,
      nomor: 3,
      heading: "Do'a Al-Matsurat - 3X",
      ar: "اللَّهُمَّ إِنِّي أَصْبَحْتُ مِنْكَ فِي نِعْمَةٍ وَعَافِيَةٍ وَسِتْر فَأَتِمَّ عَلَيَّ نِعْمَتَكَ وَعَافِيَتَكَ وَسِتْرَكَ فِي الدُّنْيَا وَالآخِرَة",
      idn: "Ya Allah, sesungguhnya aku berpagi hari dari-Mu dalam kenikmatan, kesehatan dan perlindungan. Maka sempurnakannlah untukku kenikmatan, kesehatan dan perlindungan-Mu itu di dunia dan akhirat.",
    },
    {
      id: 172014,
      nomor: 4,
      heading: "Do'a Al-Matsurat - 3X",
      ar: "اللَّهُمَّ مَا أَصْبَحَ بِيْ مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لاَ شَرِيْكَ لَكَ فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ",
      idn: "Ya Allah, kenikmatan yang aku atau salah seorang dari makhluk-Mu berpagi hari dengannya adalah dari-Mu semata; tiada sekutu bagi-Mu. Maka bagi-Mu segala puji dan rasa syukur.",
    },
    {
      id: 172015,
      nomor: 5,
      heading: "Do'a Al-Matsurat - 3X",
      ar: "يَا رَبِّي لَكَ الْحَمْدُ كَمَا يَنْبَغِي لِجَلَالِ وَجْهِكَ وَلِعَظِيمِ سُلْطَانِكَ",
      idn: "Ya Tuhanku, Segala puji bagiMu sebagaimana seyogyanya kemuliaan wajahMu dan keagungan kekuasaanMu.",
    },
    {
      id: 172016,
      nomor: 6,
      heading: "Do'a Al-Matsurat - 3X",
      ar: "رَضِيتُ بِاللَّهِ رَبًّا وَبِالْإِسْلَامِ دِينًا وَبِمُحَمَّدٍ نَبِيًّا وَرَسُولًا",
      idn: "Aku ridha Allah sebagai Rabb, Islam sebagai agama, dan Muhammad sebagai Rasul.",
    },
    {
      id: 172017,
      nomor: 7,
      heading: "Do'a Al-Matsurat - 3X",
      ar: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ عَدَدَ خَلْقِهِ وَرِضَا نَفْسِهِ وَزِنَةَ عَرْشِهِ وَمِدَادَ كَلِمَاتِهِ",
      idn: "Maha Suci Allah dan Segala Puji bagiNya, sebanyak bilangan makhlukNya, seridha diriNya, setimbangan ‘arsy-Nya, dan sebanyak tinta dari kata-kataNya.",
    },
    {
      id: 172018,
      nomor: 8,
      heading: "Do'a Al-Matsurat - 3X",
      ar: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
      idn: "Dengan nama Allah Yang bersama NamaNya sesuatu apa pun tidak akan celaka baik di bumi dan di langit. Dialah Maha Medengar lagi maha Mengetahui.",
    },
    {
      id: 172019,
      nomor: 9,
      heading: "Do'a Al-Matsurat - 3X",
      ar: "اللَّهُمَّ إِنَّا نَعُوذُ بِكَ مِنْ أَنْ نُشْرِكَ بِكَ شَيْئًا نَعْلَمُهُ وَنَسْتَغْفِرُكَ لِمَا لَا نَعْلَمُه",
      idn: "Ya Allah sesungguhnya kami berlindung kepadaMu dari menyekutukanMu dengan sesuatu yang kami ketahui, dan kami memohon ampunanMu dari apa-apa yang tidak kami ketahui.",
    },
    {
      id: 1720100,
      nomor: 10,
      heading: "Do'a Al-Matsurat - 3X",
      ar: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
      idn: "Aku berlindung dengan kalimat Allah yang sempurna dari keburukan apa-apa yang Dia ciptakan.",
    },
    {
      id: 1720110,
      nomor: 11,
      heading: "Do'a Al-Matsurat - 3X",
      ar: "اَللَّهُمَّ إِنِّي أَعُوْذُ بِكَ مِنَ الهَمِّ وَالْحَزَنِ وَأَعُوْذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ وَأَعُوْذُ بِكَ مِنَ الْجُبْنِ وَالبُخْلِ وَأَعُوْذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ",
      idn: "Ya Allah, aku berlindung kepada-Mu dari rasa gelisah dan sedih, dari kelemahan dan kemalasan, dari sifat pengecut dan bakhil, dan dari lilitan hutang dan kesewenang-wenangan orang.",
    },
    {
      id: 1720120,
      nomor: 12,
      heading: "Do'a Al-Matsurat - 3X",
      ar: "اَللَّهُمَّ عَافِنِي فِي بَدَنِي اَللَّهُمَّ عَافِنِي فِي سَمْعِي اَللَّهُمَّ عَافِنِي فِي بَصَرِي",
      idn: "Ya Allah berikanlah kesehatan bagi badanku, bagi pendengaranku, bagi penglihatanku.",
    },
    {
      id: 1720130,
      nomor: 13,
      heading: "Do'a Al-Matsurat - 3X",
      ar: "اَللَّهُمَّ إِنِّي أَعُوْذُ بِكَ مِنَ الْكُفْرِ وَالْفَقْرِوَأَعُوْذُ بِكَ مِنْ عَذَابِ الْقَبْرِلاَ إِلهَ إِلاَّ أَنْتَ",
      idn: "Ya Allah sungguh aku berlindung kepadaMu dari kekufuran dan kefaqiran, Ya Allah sungguh aku berlindung kepadaMu dari azab kubur, tidak ada Ilah kecuali Engkau.",
    },
    {
      id: 1720140,
      nomor: 14,
      heading: "Do'a Al-Matsurat - 3X",
      ar: "اَللّهُمَّ أَنْتَ رَبِّي لَا إلهَ إِلاَّ أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ أَعُوْذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ أَبُوْءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوْءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لاَ يَغْفِرُ الذُّنُوْبَ إِلاَّ أَنْتَ",
      idn: "Ya Allah, Engkau Tuhanku, tiada Tuhan kecuali Engkau. Engkau ciptakan aku dan aku adalah hamba-Mu. Aku berada di atas janjiMu, semampuku. Aku berlindung kepadaMu dari keburukan perbuatanku. Aku mengakui banyaknya nikmat (yang Engkau anugerahkan) kepadaku dan aku mengakui dosa-dosaku, maka ampunilah aku. Karena sesungguhnya tiada yang mengampuni dosa-dosa melainkan Engkau.",
    },
    {
      id: 1720150,
      nomor: 15,
      heading: "Do'a Al-Matsurat - 3X",
      ar: "أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إلهَ إِلَّا هُوَ الْحَيَّ الْقَيُّومَ وَأَتُوبُ إِلَيْهِ",
      idn: "Aku memohon ampunan Allah Yang Tiada Tuhan melainkan Dia, Yang Maha Hidup dan Maha Mengurus (makhluk-Nya).",
    },
    {
      id: 1720160,
      nomor: 16,
      heading: "Do'a Al-Matsurat - 10X",
      ar: "اَللّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ كَمَا صَلَّــيْتَ عَـلَى سَيِّدِنَا إِبْرَاهِيْمَ وَعَلَى آلِ سَيِّدِنَا إِبْـرَاهِيْمَ وبَارِكْ عَـلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ كَمَا بَارَكْتَ عَـلَى سَيِّدِنَا إِبْرَاهِيْمَ وَعَــلَى آلِ سَيـِّدِنَا إِبْـرَاهِيْمَ فِي الْعَالَمِيْنَ إِنَّكَ حَمِيْدٌ مَجِيْدٌ",
      idn: "Ya Allah berikanlah shalawat kepada Nabi Muhammad dan keluarga Nabi Muhammad, sebagaimana telah Engkau berikan kepada Nabi Ibrahim dan keluarga Nabi Ibrahim. Berikanlah barakah kepada Nabi Muhammad dan keluarga Nabi Muhammad, sebagaimana telah Engkau berikan kepada Nabi Ibrahim dan keluarga Nabi Ibrahim. Di alam Engkaulah Yang Maha Terpuji lagi Maha Mulia.",
    },
    {
      id: 1720160,
      nomor: 16,
      heading: "Do'a Al-Matsurat - 100X",
      ar: "سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ",
      idn: "Maha Suci Allah, segala puji bagi Allah, tiada Tuhan melainkan Allah dan Allah Maha Besar.",
    },
    {
      id: 1720170,
      nomor: 17,
      heading: "Do'a Al-Matsurat - 10X",
      ar: "لاَ إلهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيْكَ لَهُ ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيْرٌ",
      idn: "Tiada Tuhan melainkan Allah semata, yang tiada sekutu bagi-Nya, bagi-Nya kerajaan dan bagi-Nya segala puji, dan Dia berkuasa ata segala sesuatu.",
    },
    {
      id: 1720180,
      nomor: 18,
      heading: "Do'a Al-Matsurat - 3X",
      ar: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ أَشْهَدُ أَنْ لَّا إلهَ إِلَّا أَنْتَ أَسْتَغْفِرُكَ وَأَتُوْبُ إِلَيْكَ",
      idn: "Maha suci Engkau ya Allah, dan segala puji bagi-Mu. Aku bersaksi bahwa tiada Tuhan melainkan Engkau, aku memohon ampunan dan bertaubat kepada-Mu.",
    },
    {
      id: 1720190,
      nomor: 19,
      heading: "Do'a Al-Matsurat - 3X",
      ar: "اَللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ عَبْدِكَ وَرَسُوْلِكَ النَّبِيِّ الأُمِّيِّ وَعَلَى آلِهِ وَصَحْبِهِ وَسَلِّمْ تَسْلِيْمًا عَدَدَ مَا أَحَاطَ بِهِ عِلْمُكَ وَخَطَّ بِهِ قَلَمُكَ وَأَحْصَاهُ كِتَابُكَ، وَارْضَ اللَّهُمَّ عَنْ سَادَاتِنَا أَبِيْ بَكْرٍ وَعُمَرَ وَعُثْمَانَ وَعَلِيْ، وَعَنِ الصَّحَابَةِ أَجْمَعِيْنَ، وَعَنِ التَّابِعِيْنَ وَتَابِعِيْهِمْ بِإِحْسَانٍ إِلَى يَوْمِ الدِّيْن سُبْحَانَ رَبِّك رَبِّ العِزَّةِ عَمَّا يَصِفُوْنَ، وَسَلَامٌ عَلَى المُرْسَلِيْنَ، وَالحَمْدُ لِلَّهِ رَبِّ العَالَمِيْنَ",
      idn: "Ya Allah berikanlah shalawat kepada Nabi Muhammad; hamba-Mu, nabi-Mu, dan Rasul-Mu; Nabi yang ummi. Juga kepada keluarga dan para sahabatnya serta berilah keselamatan sebanyak yang terjangkau oleh ilmu-Mu yang tergores oleh pena-Mu, dan yang terangkum oleh kitab-Mu. Ridhailah ya Allah para pemimpin kami, Abu Bakar, Umar, Utsman, dan Ali, semua sahabat, semua tabi’in dan orang-orang yang mengikuti mereka sampai hari pembalasan. Maha suci Tuhanmu; Tuhan kemuliaan, dari apa-apa yang mereka sifatkan. Keselamatan semoga tercurah kepada para utusan dan segala puji bagi Allah, Tuhan semesta alam.",
    },
  ];
  const almatsuratsore = [
    {
      id: 172010,
      nomor: 1,
      heading: "Do'a Al-Matsurat - 3X",
      ar: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلّهَِ وَالْحَمْدُ لِلّهَِ لاَ شَرِيكَ لَهُ، لاَ إِلهَ إِلَّا هُوَ وَإِلَيْهِ الْمَصِيْرُ",
      idn: "Kami bersore hari dan bersore hari pula kerjaan milik Allah. Segala puji bagi Allah, tiada sekutu bagi-Nya, tiada Tuhan melainkan Dia dan kepada-Nya tempat kembali.",
    },
    {
      id: 172012,
      nomor: 2,
      heading: "Do'a Al-Matsurat - 3X",
      ar: "أَمْسَيْنَا عَلَى فِطْرَةِ اْلإِسْلاَمِ وَعَلَى كَلِمَةِ اْلإِخْلاَصِ وَعَلَى دِيْنِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ وَعَلَى مِلَّةِ أَبِيْنَا إِبْرَاهِيْمَ حَنِيْفًا مُسْلِمًا وَمَا كَانَ مِنَ الْمُشْرِكِيْنَ",
      idn: "Di waktu sore kami memegang agama Islam, kalimat ikhlas, agama Nabi kita Muhammad shallallahu ‘alaihi wa sallam, dan agama ayah kami Ibrahim, yang berdiri di atas jalan yang lurus, muslim dan tidak tergolong orang-orang musyrik.",
    },
    {
      id: 172013,
      nomor: 3,
      heading: "Do'a Al-Matsurat - 3X",
      ar: "اللَّهُمَّ إِنِّي أَمْسَيتُ مِنْكَ فِي نِعْمَةٍ وَعَافِيَةٍ وَسِتْر فَأَتِمَّ عَلَيَّ نِعْمَتَكَ وَعَافِيَتَكَ وَسِتْرَكَ فِي الدُّنْيَا وَالآخِرَة",
      idn: "Ya Allah, sesungguhnya aku berpagi hari (bersore hari) dari-Mu dalam kenikmatan, kesehatan dan perlindungan. Maka sempurnakannlah untukku kenikmatan, kesehatan dan perlindungan-Mu itu di dunia dan akhirat.",
    },
    {
      id: 172014,
      nomor: 4,
      heading: "Do'a Al-Matsurat - 3X",
      ar: "اللَّهُمَّ مَا أَمْسَ بِيْ مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لاَ شَرِيْكَ لَكَ فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ",
      idn: "Ya Allah, kenikmatan yang aku atau salah seorang dari makhluk-Mu bersore hari dengannya adalah dari-Mu semata; tiada sekutu bagi-Mu. Maka bagi-Mu segala puji dan rasa syukur.",
    },
    {
      id: 172015,
      nomor: 5,
      heading: "Do'a Al-Matsurat - 3X",
      ar: "يَا رَبِّي لَكَ الْحَمْدُ كَمَا يَنْبَغِي لِجَلَالِ وَجْهِكَ وَلِعَظِيمِ سُلْطَانِكَ",
      idn: "Ya Tuhanku, Segala puji bagiMu sebagaimana seyogyanya kemuliaan wajahMu dan keagungan kekuasaanMu.",
    },
    {
      id: 172016,
      nomor: 6,
      heading: "Do'a Al-Matsurat - 3X",
      ar: "رَضِيتُ بِاللَّهِ رَبًّا وَبِالْإِسْلَامِ دِينًا وَبِمُحَمَّدٍ نَبِيًّا وَرَسُولًا",
      idn: "Aku ridha Allah sebagai Rabb, Islam sebagai agama, dan Muhammad sebagai Rasul.",
    },
    {
      id: 172017,
      nomor: 7,
      heading: "Do'a Al-Matsurat - 3X",
      ar: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ عَدَدَ خَلْقِهِ وَرِضَا نَفْسِهِ وَزِنَةَ عَرْشِهِ وَمِدَادَ كَلِمَاتِهِ",
      idn: "Maha Suci Allah dan Segala Puji bagiNya, sebanyak bilangan makhlukNya, seridha diriNya, setimbangan ‘arsy-Nya, dan sebanyak tinta dari kata-kataNya.",
    },
    {
      id: 172018,
      nomor: 8,
      heading: "Do'a Al-Matsurat - 3X",
      ar: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
      idn: "Dengan nama Allah Yang bersama NamaNya sesuatu apa pun tidak akan celaka baik di bumi dan di langit. Dialah Maha Medengar lagi maha Mengetahui.",
    },
    {
      id: 172019,
      nomor: 9,
      heading: "Do'a Al-Matsurat - 3X",
      ar: "اللَّهُمَّ إِنَّا نَعُوذُ بِكَ مِنْ أَنْ نُشْرِكَ بِكَ شَيْئًا نَعْلَمُهُ وَنَسْتَغْفِرُكَ لِمَا لَا نَعْلَمُه",
      idn: "Ya Allah sesungguhnya kami berlindung kepadaMu dari menyekutukanMu dengan sesuatu yang kami ketahui, dan kami memohon ampunanMu dari apa-apa yang tidak kami ketahui.",
    },
    {
      id: 1720100,
      nomor: 10,
      heading: "Do'a Al-Matsurat - 3X",
      ar: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
      idn: "Aku berlindung dengan kalimat Allah yang sempurna dari keburukan apa-apa yang Dia ciptakan.",
    },
    {
      id: 1720110,
      nomor: 11,
      heading: "Do'a Al-Matsurat - 3X",
      ar: "اَللَّهُمَّ إِنِّي أَعُوْذُ بِكَ مِنَ الهَمِّ وَالْحَزَنِ وَأَعُوْذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ وَأَعُوْذُ بِكَ مِنَ الْجُبْنِ وَالبُخْلِ وَأَعُوْذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ",
      idn: "Ya Allah, aku berlindung kepada-Mu dari rasa gelisah dan sedih, dari kelemahan dan kemalasan, dari sifat pengecut dan bakhil, dan dari lilitan hutang dan kesewenang-wenangan orang.",
    },
    {
      id: 1720120,
      nomor: 12,
      heading: "Do'a Al-Matsurat - 3X",
      ar: "اَللَّهُمَّ عَافِنِي فِي بَدَنِي اَللَّهُمَّ عَافِنِي فِي سَمْعِي اَللَّهُمَّ عَافِنِي فِي بَصَرِي",
      idn: "Ya Allah berikanlah kesehatan bagi badanku, bagi pendengaranku, bagi penglihatanku.",
    },
    {
      id: 1720130,
      nomor: 13,
      heading: "Do'a Al-Matsurat - 3X",
      ar: "اَللَّهُمَّ إِنِّي أَعُوْذُ بِكَ مِنَ الْكُفْرِ وَالْفَقْرِوَأَعُوْذُ بِكَ مِنْ عَذَابِ الْقَبْرِلاَ إِلهَ إِلاَّ أَنْتَ",
      idn: "Ya Allah sungguh aku berlindung kepadaMu dari kekufuran dan kefaqiran, Ya Allah sungguh aku berlindung kepadaMu dari azab kubur, tidak ada Ilah kecuali Engkau.",
    },
    {
      id: 1720140,
      nomor: 14,
      heading: "Do'a Al-Matsurat - 3X",
      ar: "اَللّهُمَّ أَنْتَ رَبِّي لَا إلهَ إِلاَّ أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ أَعُوْذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ أَبُوْءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوْءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لاَ يَغْفِرُ الذُّنُوْبَ إِلاَّ أَنْتَ",
      idn: "Ya Allah, Engkau Tuhanku, tiada Tuhan kecuali Engkau. Engkau ciptakan aku dan aku adalah hamba-Mu. Aku berada di atas janjiMu, semampuku. Aku berlindung kepadaMu dari keburukan perbuatanku. Aku mengakui banyaknya nikmat (yang Engkau anugerahkan) kepadaku dan aku mengakui dosa-dosaku, maka ampunilah aku. Karena sesungguhnya tiada yang mengampuni dosa-dosa melainkan Engkau.",
    },
    {
      id: 1720150,
      nomor: 15,
      heading: "Do'a Al-Matsurat - 3X",
      ar: "أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إلهَ إِلَّا هُوَ الْحَيَّ الْقَيُّومَ وَأَتُوبُ إِلَيْهِ",
      idn: "Aku memohon ampunan Allah Yang Tiada Tuhan melainkan Dia, Yang Maha Hidup dan Maha Mengurus (makhluk-Nya).",
    },
    {
      id: 1720160,
      nomor: 16,
      heading: "Do'a Al-Matsurat - 10X",
      ar: "اَللّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ كَمَا صَلَّــيْتَ عَـلَى سَيِّدِنَا إِبْرَاهِيْمَ وَعَلَى آلِ سَيِّدِنَا إِبْـرَاهِيْمَ وبَارِكْ عَـلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ كَمَا بَارَكْتَ عَـلَى سَيِّدِنَا إِبْرَاهِيْمَ وَعَــلَى آلِ سَيـِّدِنَا إِبْـرَاهِيْمَ فِي الْعَالَمِيْنَ إِنَّكَ حَمِيْدٌ مَجِيْدٌ",
      idn: "Ya Allah berikanlah shalawat kepada Nabi Muhammad dan keluarga Nabi Muhammad, sebagaimana telah Engkau berikan kepada Nabi Ibrahim dan keluarga Nabi Ibrahim. Berikanlah barakah kepada Nabi Muhammad dan keluarga Nabi Muhammad, sebagaimana telah Engkau berikan kepada Nabi Ibrahim dan keluarga Nabi Ibrahim. Di alam Engkaulah Yang Maha Terpuji lagi Maha Mulia.",
    },
    {
      id: 1720160,
      nomor: 16,
      heading: "Do'a Al-Matsurat - 100X",
      ar: "سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ",
      idn: "Maha Suci Allah, segala puji bagi Allah, tiada Tuhan melainkan Allah dan Allah Maha Besar.",
    },
    {
      id: 1720170,
      nomor: 17,
      heading: "Do'a Al-Matsurat - 10X",
      ar: "لاَ إلهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيْكَ لَهُ ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيْرٌ",
      idn: "Tiada Tuhan melainkan Allah semata, yang tiada sekutu bagi-Nya, bagi-Nya kerajaan dan bagi-Nya segala puji, dan Dia berkuasa ata segala sesuatu.",
    },
    {
      id: 1720180,
      nomor: 18,
      heading: "Do'a Al-Matsurat - 3X",
      ar: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ أَشْهَدُ أَنْ لَّا إلهَ إِلَّا أَنْتَ أَسْتَغْفِرُكَ وَأَتُوْبُ إِلَيْكَ",
      idn: "Maha suci Engkau ya Allah, dan segala puji bagi-Mu. Aku bersaksi bahwa tiada Tuhan melainkan Engkau, aku memohon ampunan dan bertaubat kepada-Mu.",
    },
    {
      id: 1720190,
      nomor: 19,
      heading: "Do'a Al-Matsurat - 3X",
      ar: "اَللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ عَبْدِكَ وَرَسُوْلِكَ النَّبِيِّ الأُمِّيِّ وَعَلَى آلِهِ وَصَحْبِهِ وَسَلِّمْ تَسْلِيْمًا عَدَدَ مَا أَحَاطَ بِهِ عِلْمُكَ وَخَطَّ بِهِ قَلَمُكَ وَأَحْصَاهُ كِتَابُكَ، وَارْضَ اللَّهُمَّ عَنْ سَادَاتِنَا أَبِيْ بَكْرٍ وَعُمَرَ وَعُثْمَانَ وَعَلِيْ، وَعَنِ الصَّحَابَةِ أَجْمَعِيْنَ، وَعَنِ التَّابِعِيْنَ وَتَابِعِيْهِمْ بِإِحْسَانٍ إِلَى يَوْمِ الدِّيْن سُبْحَانَ رَبِّك رَبِّ العِزَّةِ عَمَّا يَصِفُوْنَ، وَسَلَامٌ عَلَى المُرْسَلِيْنَ، وَالحَمْدُ لِلَّهِ رَبِّ العَالَمِيْنَ",
      idn: "Ya Allah berikanlah shalawat kepada Nabi Muhammad; hamba-Mu, nabi-Mu, dan Rasul-Mu; Nabi yang ummi. Juga kepada keluarga dan para sahabatnya serta berilah keselamatan sebanyak yang terjangkau oleh ilmu-Mu yang tergores oleh pena-Mu, dan yang terangkum oleh kitab-Mu. Ridhailah ya Allah para pemimpin kami, Abu Bakar, Umar, Utsman, dan Ali, semua sahabat, semua tabi’in dan orang-orang yang mengikuti mereka sampai hari pembalasan. Maha suci Tuhanmu; Tuhan kemuliaan, dari apa-apa yang mereka sifatkan. Keselamatan semoga tercurah kepada para utusan dan segala puji bagi Allah, Tuhan semesta alam.",
    },
  ];
  const aliimron = [
    {
      id: 201701,
      nomor: 26,
      ar: "قُلِ ٱللَّهُمَّ مَٰلِكَ ٱلۡمُلۡكِ تُؤۡتِي ٱلۡمُلۡكَ مَن تَشَآءُ وَتَنزِعُ ٱلۡمُلۡكَ مِمَّن تَشَآءُ وَتُعِزُّ مَن تَشَآءُ وَتُذِلُّ مَن تَشَآءُۖ بِيَدِكَ ٱلۡخَيۡرُۖ إِنَّكَ عَلَىٰ كُلِّ شَيۡءٖ قَدِيرٞ",
      idn: 'Katakanlah: "Wahai Tuhan Yang mempunyai kerajaan, Engkau berikan kerajaan kepada orang yang Engkau kehendaki dan Engkau cabut kerajaan dari orang yang Engkau kehendaki. Engkau muliakan orang yang Engkau kehendaki dan Engkau hinakan orang yang Engkau kehendaki. Di tangan Engkaulah segala kebajikan.Sesungguhnya Engkau Maha Kuasa atas segala sesuatu.',
    },
    {
      id: 201702,
      nomor: 27,
      ar: "تُولِجُ ٱلَّيۡلَ فِي ٱلنَّهَارِ وَتُولِجُ ٱلنَّهَارَ فِي ٱلَّيۡلِۖ وَتُخۡرِجُ ٱلۡحَيَّ مِنَ ٱلۡمَيِّتِ وَتُخۡرِجُ ٱلۡمَيِّتَ مِنَ ٱلۡحَيِّۖ وَتَرۡزُقُ مَن تَشَآءُ بِغَيۡرِ حِسَابٖ",
      idn: "Engkau masukkan malam ke dalam siang dan Engkau masukkan siang ke dalam malam. Engkau keluarkan yang hidup dari yang mati, dan Engkau keluarkan yang mati dari yang hidup. Dan Engkau beri rezeki siapa yang Engkau kehendaki tanpa hisab (batas).",
    },
  ];
  const robithoh = [
    {
      id: 201737,
      nomor: 1,
      ar: "اَللَّهُمَّ إِنَّ هَذَا إِقْبَالُ نَهَارِكَ وَإِدْبَارُ لَيْلِكَ وَأَصْوَاتُ دُعَاتِكَ فَاغْفِرْلِي",
      idn: "Ya Allah, sesungguhnya ini adalah siang-Mu yang telah menjelang dan siang-Mu yang tengah berlalu serta suara-suara penyeru-Mu, maka ampunilah aku.",
    },
    {
      id: 201738,
      nomor: 2,
      ar: "اَللّهُمَّ إِنَّكَ تَعْلَمُ أَنَّ هَذِهِ الْقُلُوْبَ، قَدِ اجْتَمَعَتْ عَلَى مَحَبَّتِكَ وَالْتَقَتْ عَلَى طَاعَتِكَ، وَتَوَحَّدَتْ عَلَى دَعْوَتِكَ وَتَعَاهَدَتْ عَلَى نُصْرَةِ شَرِيْعَتِكَ فَوَثِّقِ اللَّهُمَّ رَابِطَتَهَا، وَأَدِمْ وُدَّهَا، وَاهْدِهَا سُبُلَهَا وَامْلَأَهَا بِنُوْرِكَ الَّذِيْ لاَ يَخْبُوْا وَاشْرَحْ صُدُوْرَهَا بِفَيْضِ الْإِيْمَانِ بِكَ، وَجَمِيْلِ التَّوَكُّلِ عَلَيْكَ وَاَحْيِهَا بِمَعْرِفَتِكَ، وَأَمِتْهَا عَلَى الشَّهَادَةِ فِي سَبِيْلِكَ إِنَّكَ نِعْمَ الْمَوْلَى وَنِعْمَ النَّصِيْرِ. اَللَّهُمَّ أَمِيْنَ. وَصَلِّ اللَّهُمَّ عَلَى سَيِّدَنَا مُحَمَّدٍ وَعَلَى آلِهِ وَصَحْبِهِ وَسَلِّمَ",
      idn: "Ya Allah, sesungguhnya Engkau Maha Mengetahui bahawa hati-hati ini, telah berhimpun di atas dasar kecintaan terhadapmu, bertemu di atas ketaatan kepada-Mu dan bersatu bagi memikul beban dakwah-Mu, hati-hati ini telah mengikat persetiaan untuk menolong meninggikan syariat-Mu. Oleh itu, Ya Allah, Engkau perkukuhkan ikatannya dan Engkau kekalkan kemesraan hati-hati ini, tunjukilah hati-hati ini akan jalan yang sebenar,  serta penuhkanlah (piala) hati-hati ini dengan cahaya Rabbani-Mu yang tidak kunjung redup, lapangkanlah hati-hati dengan limpahan keimanan serta keindahan tawakkal kepada-Mu, hidup suburkanlah hati-hati ini dengan makrifat (pengenalan yang sebenarnya) tentang-Mu.  (Jika Engkau takdirkan kami mati) maka matikanlah hati-hati ini sebagai para syuhada dalam perjuangan agama-Mu. Sesungguhnya Engkau sebaik-baik pelindung dan sebaik-baik penolong.  Ya Allah perkenankanlah doa kami. Dan semoga shalawat serta salam selalu tercurah kepada Nabi Muhammad, keluarganya dan kepada semua sahabatnya.",
    },
  ];
  const robithohsore = [
    {
      id: 201737,
      nomor: 1,
      ar: "اَللَّهُمَّ إِنَّ هَذَا إِقْبَالُ لَيْلِكَ وَإِدْبَارُ نَهَارِكَ وَأَصْوَاتُ دُعَاتِكَ فَاغْفِرْلِي",
      idn: "Ya Allah, sesungguhnya ini adalah malam-Mu yang telah menjelang dan malam-Mu yang tengah berlalu serta suara-suara penyeru-Mu, maka ampunilah aku.",
    },
    {
      id: 201738,
      nomor: 2,
      ar: "اَللّهُمَّ إِنَّكَ تَعْلَمُ أَنَّ هَذِهِ الْقُلُوْبَ، قَدِ اجْتَمَعَتْ عَلَى مَحَبَّتِكَ وَالْتَقَتْ عَلَى طَاعَتِكَ، وَتَوَحَّدَتْ عَلَى دَعْوَتِكَ وَتَعَاهَدَتْ عَلَى نُصْرَةِ شَرِيْعَتِكَ فَوَثِّقِ اللَّهُمَّ رَابِطَتَهَا، وَأَدِمْ وُدَّهَا، وَاهْدِهَا سُبُلَهَا وَامْلَأَهَا بِنُوْرِكَ الَّذِيْ لاَ يَخْبُوْا وَاشْرَحْ صُدُوْرَهَا بِفَيْضِ الْإِيْمَانِ بِكَ، وَجَمِيْلِ التَّوَكُّلِ عَلَيْكَ وَاَحْيِهَا بِمَعْرِفَتِكَ، وَأَمِتْهَا عَلَى الشَّهَادَةِ فِي سَبِيْلِكَ إِنَّكَ نِعْمَ الْمَوْلَى وَنِعْمَ النَّصِيْرِ. اَللَّهُمَّ أَمِيْنَ. وَصَلِّ اللَّهُمَّ عَلَى سَيِّدَنَا مُحَمَّدٍ وَعَلَى آلِهِ وَصَحْبِهِ وَسَلِّمَ",
      idn: "Ya Allah, sesungguhnya Engkau Maha Mengetahui bahawa hati-hati ini, telah berhimpun di atas dasar kecintaan terhadapmu, bertemu di atas ketaatan kepada-Mu dan bersatu bagi memikul beban dakwah-Mu, hati-hati ini telah mengikat persetiaan untuk menolong meninggikan syariat-Mu. Oleh itu, Ya Allah, Engkau perkukuhkan ikatannya dan Engkau kekalkan kemesraan hati-hati ini, tunjukilah hati-hati ini akan jalan yang sebenar,  serta penuhkanlah (piala) hati-hati ini dengan cahaya Rabbani-Mu yang tidak kunjung redup, lapangkanlah hati-hati dengan limpahan keimanan serta keindahan tawakkal kepada-Mu, hidup suburkanlah hati-hati ini dengan makrifat (pengenalan yang sebenarnya) tentang-Mu.  (Jika Engkau takdirkan kami mati) maka matikanlah hati-hati ini sebagai para syuhada dalam perjuangan agama-Mu. Sesungguhnya Engkau sebaik-baik pelindung dan sebaik-baik penolong.  Ya Allah perkenankanlah doa kami. Dan semoga shalawat serta salam selalu tercurah kepada Nabi Muhammad, keluarganya dan kepada semua sahabatnya.",
    },
  ];

  const navigate = useNavigate();
  const location = useLocation();

  const getCurrentTabIndex = () => {
    const params = new URLSearchParams(location.search);
    const tabParam = params.get("baca");
    return tabParam === "sore" ? 1 : 0;
  };

  const [activeTab, setActiveTab] = useState(getCurrentTabIndex());

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    params.set("baca", activeTab === 0 ? "pagi" : "sore");
    navigate({ search: params.toString() });
    setProgressBar(false);
  }, [activeTab, navigate]);

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen">
      <img
        src="https://images.unsplash.com/photo-1664270009142-7c264e0dbe02?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className="h-2 w-full object-cover"
        alt=""
      />
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="robots" content="index,follow" />
        <title>Dzikir Al Matsurat | Al Quran Digital</title>
        <link rel="canonical" href="https://al-quran.pages.dev/matsurat" />
      </Helmet>
      <div className="absolute top-10 left-3 md:left-7">
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
      <div className="container mx-auto text-slate-800 dark:text-slate-200">
        <div className="pt-[100px] text-center flex items-center flex-col">
          <h1 className="text-2xl font-semibold">Dzikir Al Matsurat </h1>
          <p className="text-xs w-[85%] md:w-[40%] mt-1">
            Melansir buku karya Hasan al-Banna yang berjudul Al-Ma'tsurat
            bahwasanya baca dari Al Matsurat yang shahih dan berasal dari Nabi
            SAW ini sangat bagus jika dilakukan secara bersama-sama.
          </p>
        </div>

        <div className="mt-5 flex flex-wrap justify-end md:h-full md:items-center [&:not(:last-child)]:border-b border-slate-300 dark:border-slate-400/80 pt-14 pb-5 md:py-9 relative">
          <div className="text-xl flex justify-between md:block gap-1 px-3 top-2 w-full mb-3 md:w-fit md:mb-0 md:px-0 absolute left-0 border-b border-dashed border-slate-200 pb-2 md:border-0">
            <div className="flex md:block w-full gap-2">
              <div className="w-auto border md:border-slate-200 rounded-md text-sm px-1 lg:mt-3 nunito font-semibold">
                Taawudz
              </div>
            </div>
          </div>

          <div className="arab px-3 lg:pl-2 w-full md:w-[90%] lg:w-[94%]">
            أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ{" "}
            <span className="relative"> ۝</span>
          </div>
          <p className="w-full px-3 text-left mt-2 text-[15px] lg:w-[94%] lg:mt-7 nunito lg:pr-2">
            Aku berlindung kepada Allah yang Maha Mendengar lagi Maha Mengetahui
            dari godaan syetan yang terkutuk.
          </p>
        </div>

        <section className="mt-10">
          <div className="flex border-b border-gray-300 dark:border-slate-500">
            <button
              onClick={() => setActiveTab(0)}
              className={`py-2 px-4 border-b-2 focus:outline-none ${
                activeTab === 0
                  ? "border-blue-500 text-blue-500 dark:text-blue-400"
                  : "border-transparent text-gray-500"
              }`}
            >
              Pagi Hari
            </button>
            <button
              onClick={() => setActiveTab(1)}
              className={`py-2 px-4 border-b-2 focus:outline-none ${
                activeTab === 1
                  ? "border-blue-500 text-blue-500 dark:text-blue-400"
                  : "border-transparent text-gray-500"
              }`}
            >
              Sore Hari
            </button>
          </div>
          <div className="">
            {activeTab === 0 && (
              <div className="pagi hari">
                <section>
                  <div className="flex flex-col items-center mt-10 mb-2 font-semibold">
                    <span className="border border-slate-400 px-3 py-1 rounded-md">
                      Surat Al Fatihah - 1X
                    </span>
                  </div>

                  <div className="border border-slate-300 rounded-lg overflow-hidden">
                    {alfatihah.map((surat) => (
                      <div
                        className="px-5 flex flex-wrap justify-end md:h-full md:items-center [&:not(:last-child)]:border-b border-slate-300 dark:border-slate-400/80 pt-14 pb-5 md:py-9 relative"
                        key={Math.random(20)}
                      >
                        <div className="text-xl md:ml-5 flex justify-between md:block gap-1 px-3 top-2 w-full mb-3 md:w-fit md:mb-0 md:px-0 absolute left-0 border-b border-dashed border-slate-200 pb-2 md:border-0">
                          <div className="flex md:block w-full gap-2">
                            <div className="w-auto border md:border-slate-200 rounded-md text-sm px-1 lg:mt-3 nunito font-semibold">
                              Al Fatihah : {surat.nomor}
                            </div>
                          </div>
                        </div>

                        <div className="arab px-3 lg:pl-2 w-full md:w-[90%] lg:w-[94%]">
                          {surat.ar}
                          <span className="relative"> ۝</span>
                        </div>
                        <p className="w-full px-3 text-left mt-2 text-[15px] lg:w-[94%] lg:mt-7 nunito lg:pr-2">
                          {surat.idn}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <div className="flex flex-col items-center mt-10 mb-2 font-semibold">
                    <span className="border border-slate-400 px-3 py-1 rounded-md">
                      Surat Al Baqarah (1-5) - 1X
                    </span>
                    <span className="arab">
                      بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                    </span>
                  </div>

                  <div className="border border-slate-300 rounded-lg overflow-hidden">
                    {albaqarah15.map((surat) => (
                      <div
                        className="px-5 flex flex-wrap justify-end md:h-full md:items-center [&:not(:last-child)]:border-b border-slate-300 dark:border-slate-400/80 pt-14 pb-5 md:py-9 relative"
                        key={Math.random(20)}
                      >
                        <div className="text-xl md:ml-5 flex justify-between md:block gap-1 px-3 top-2 w-full mb-3 md:w-fit md:mb-0 md:px-0 absolute left-0 border-b border-dashed border-slate-200 pb-2 md:border-0">
                          <div className="flex md:block w-full gap-2">
                            <div className="w-auto border md:border-slate-200 rounded-md text-sm px-1 lg:mt-3 nunito font-semibold">
                              Al Baqarah : {surat.nomor}
                            </div>
                          </div>
                        </div>

                        <div className="arab px-3 lg:pl-2 w-full md:w-[90%] lg:w-[94%]">
                          {surat.ar}
                          <span className="relative"> ۝</span>
                        </div>
                        <p className="w-full px-3 text-left mt-2 text-[15px] lg:w-[94%] lg:mt-7 nunito lg:pr-2">
                          {surat.idn}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <div className="flex flex-col items-center mt-10 mb-2 font-semibold">
                    <span className="border border-slate-400 px-3 py-1 rounded-md">
                      Surat Al Baqarah (255-257) - 1X
                    </span>
                  </div>

                  <div className="border border-slate-300 rounded-lg overflow-hidden">
                    {albaqarah255_257.map((surat) => (
                      <div
                        className="px-5 flex flex-wrap justify-end md:h-full md:items-center [&:not(:last-child)]:border-b border-slate-300 dark:border-slate-400/80 pt-14 pb-5 md:py-9 relative"
                        key={Math.random(20)}
                      >
                        <div className="text-xl md:ml-5 flex justify-between md:block gap-1 px-3 top-2 w-full mb-3 md:w-fit md:mb-0 md:px-0 absolute left-0 border-b border-dashed border-slate-200 pb-2 md:border-0">
                          <div className="flex md:block w-full gap-2">
                            <div className="w-auto border md:border-slate-200 rounded-md text-sm px-1 lg:mt-3 nunito font-semibold">
                              Al Baqarah : {surat.nomor}
                            </div>
                          </div>
                        </div>

                        <div className="arab px-3 lg:pl-2 w-full md:w-[90%] lg:w-[94%]">
                          {surat.ar}
                          <span className="relative"> ۝</span>
                        </div>
                        <p className="w-full px-3 text-left mt-2 text-[15px] lg:w-[94%] lg:mt-7 nunito lg:pr-2">
                          {surat.idn}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <div className="flex flex-col items-center mt-10 mb-2 font-semibold">
                    <span className="border border-slate-400 px-3 py-1 rounded-md">
                      Surat Al Baqarah (284-286) - 1X
                    </span>
                  </div>

                  <div className="border border-slate-300 rounded-lg overflow-hidden">
                    {albaqarah284_286.map((surat) => (
                      <div
                        className="px-5 flex flex-wrap justify-end md:h-full md:items-center [&:not(:last-child)]:border-b border-slate-300 dark:border-slate-400/80 pt-14 pb-5 md:py-9 relative"
                        key={Math.random(20)}
                      >
                        <div className="text-xl md:ml-5 flex justify-between md:block gap-1 px-3 top-2 w-full mb-3 md:w-fit md:mb-0 md:px-0 absolute left-0 border-b border-dashed border-slate-200 pb-2 md:border-0">
                          <div className="flex md:block w-full gap-2">
                            <div className="w-auto border md:border-slate-200 rounded-md text-sm px-1 lg:mt-3 nunito font-semibold">
                              Al Baqarah : {surat.nomor}
                            </div>
                          </div>
                        </div>

                        <div className="arab px-3 lg:pl-2 w-full md:w-[90%] lg:w-[94%]">
                          {surat.ar}
                          <span className="relative"> ۝</span>
                        </div>
                        <p className="w-full px-3 text-left mt-2 text-[15px] lg:w-[94%] lg:mt-7 nunito lg:pr-2">
                          {surat.idn}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <div className="flex flex-col items-center mt-10 mb-2 font-semibold">
                    <span className="border border-slate-400 px-3 py-1 rounded-md">
                      Surat Al Ikhlas (1-4) - 3X
                    </span>
                    <span className="arab">
                      بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                    </span>
                  </div>

                  <div className="border border-slate-300 rounded-lg overflow-hidden">
                    {alikhlas.map((surat) => (
                      <div
                        className="px-5 flex flex-wrap justify-end md:h-full md:items-center [&:not(:last-child)]:border-b border-slate-300 dark:border-slate-400/80 pt-14 pb-5 md:py-9 relative"
                        key={Math.random(20)}
                      >
                        <div className="text-xl md:ml-5 flex justify-between md:block gap-1 px-3 top-2 w-full mb-3 md:w-fit md:mb-0 md:px-0 absolute left-0 border-b border-dashed border-slate-200 pb-2 md:border-0">
                          <div className="flex md:block w-full gap-2">
                            <div className="w-auto border md:border-slate-200 rounded-md text-sm px-1 lg:mt-3 nunito font-semibold">
                              Al Ikhlas : {surat.nomor}
                            </div>
                          </div>
                        </div>

                        <div className="arab px-3 lg:pl-2 w-full md:w-[90%] lg:w-[94%]">
                          {surat.ar}
                          <span className="relative"> ۝</span>
                        </div>
                        <p className="w-full px-3 text-left mt-2 text-[15px] lg:w-[94%] lg:mt-7 nunito lg:pr-2">
                          {surat.idn}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <div className="flex flex-col items-center mt-10 mb-2 font-semibold">
                    <span className="border border-slate-400 px-3 py-1 rounded-md">
                      Surat Al Falaq (1-5) - 3X
                    </span>
                    <span className="arab">
                      بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                    </span>
                  </div>

                  <div className="border border-slate-300 rounded-lg overflow-hidden">
                    {alfalaq.map((surat) => (
                      <div
                        className="px-5 flex flex-wrap justify-end md:h-full md:items-center [&:not(:last-child)]:border-b border-slate-300 dark:border-slate-400/80 pt-14 pb-5 md:py-9 relative"
                        key={Math.random(20)}
                      >
                        <div className="text-xl md:ml-5 flex justify-between md:block gap-1 px-3 top-2 w-full mb-3 md:w-fit md:mb-0 md:px-0 absolute left-0 border-b border-dashed border-slate-200 pb-2 md:border-0">
                          <div className="flex md:block w-full gap-2">
                            <div className="w-auto border md:border-slate-200 rounded-md text-sm px-1 lg:mt-3 nunito font-semibold">
                              Al Falaq : {surat.nomor}
                            </div>
                          </div>
                        </div>

                        <div className="arab px-3 lg:pl-2 w-full md:w-[90%] lg:w-[94%]">
                          {surat.ar}
                          <span className="relative"> ۝</span>
                        </div>
                        <p className="w-full px-3 text-left mt-2 text-[15px] lg:w-[94%] lg:mt-7 nunito lg:pr-2">
                          {surat.idn}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <div className="flex flex-col items-center mt-10 mb-2 font-semibold">
                    <span className="border border-slate-400 px-3 py-1 rounded-md">
                      Surat An Nas (1-6) - 3X
                    </span>
                    <span className="arab">
                      بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                    </span>
                  </div>

                  <div className="border border-slate-300 rounded-lg overflow-hidden">
                    {annas.map((surat) => (
                      <div
                        className="px-5 flex flex-wrap justify-end md:h-full md:items-center [&:not(:last-child)]:border-b border-slate-300 dark:border-slate-400/80 pt-14 pb-5 md:py-9 relative"
                        key={Math.random(20)}
                      >
                        <div className="text-xl md:ml-5 flex justify-between md:block gap-1 px-3 top-2 w-full mb-3 md:w-fit md:mb-0 md:px-0 absolute left-0 border-b border-dashed border-slate-200 pb-2 md:border-0">
                          <div className="flex md:block w-full gap-2">
                            <div className="w-auto border md:border-slate-200 rounded-md text-sm px-1 lg:mt-3 nunito font-semibold">
                              An Nas : {surat.nomor}
                            </div>
                          </div>
                        </div>

                        <div className="arab px-3 lg:pl-2 w-full md:w-[90%] lg:w-[94%]">
                          {surat.ar}
                          <span className="relative"> ۝</span>
                        </div>
                        <p className="w-full px-3 text-left mt-2 text-[15px] lg:w-[94%] lg:mt-7 nunito lg:pr-2">
                          {surat.idn}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {almatsurat.map((surat) => (
                  <section key={Math.random(20)}>
                    <div className="flex flex-col items-center mt-10 mb-2 font-semibold">
                      <span className="border border-slate-400 px-3 py-1 rounded-md">
                        {surat.heading}
                      </span>
                    </div>

                    <div className="border border-slate-300 rounded-lg overflow-hidden">
                      <div className="px-5 flex flex-wrap justify-end md:h-full md:items-center [&:not(:last-child)]:border-b border-slate-300 dark:border-slate-400/80 pt-14 pb-5 md:py-9 relative">
                        <div className="text-xl md:ml-5 flex justify-between md:block gap-1 px-3 top-2 w-full mb-3 md:w-fit md:mb-0 md:px-0 absolute left-0 border-b border-dashed border-slate-200 pb-2 md:border-0">
                          <div className="flex md:block w-full gap-2">
                            <div className="w-auto border md:border-slate-200 rounded-md text-sm px-1 lg:mt-3 nunito font-semibold">
                              Al-Matsurat
                            </div>
                          </div>
                        </div>

                        <div className="arab px-3 lg:pl-2 w-full md:w-[90%] lg:w-[94%]">
                          {surat.ar}
                          <span className="relative"> ۝</span>
                        </div>
                        <p className="w-full px-3 text-left mt-2 text-[15px] lg:w-[94%] lg:mt-7 nunito lg:pr-2">
                          {surat.idn}
                        </p>
                      </div>
                    </div>
                  </section>
                ))}

                <section>
                  <div className="flex flex-col items-center mt-10 mb-2 font-semibold">
                    <span className="border border-slate-400 px-3 py-1 rounded-md">
                      Surat Ali Imron (26-27) - 1X
                    </span>
                  </div>

                  <div className="border border-slate-300 rounded-lg overflow-hidden">
                    {aliimron.map((surat) => (
                      <div
                        className="px-5 flex flex-wrap justify-end md:h-full md:items-center [&:not(:last-child)]:border-b border-slate-300 dark:border-slate-400/80 pt-14 pb-5 md:py-9 relative"
                        key={Math.random(20)}
                      >
                        <div className="text-xl md:ml-5 flex justify-between md:block gap-1 px-3 top-2 w-full mb-3 md:w-fit md:mb-0 md:px-0 absolute left-0 border-b border-dashed border-slate-200 pb-2 md:border-0">
                          <div className="flex md:block w-full gap-2">
                            <div className="w-auto border md:border-slate-200 rounded-md text-sm px-1 lg:mt-3 nunito font-semibold">
                              Ali Imron : {surat.nomor}
                            </div>
                          </div>
                        </div>

                        <div className="arab px-3 lg:pl-2 w-full md:w-[90%] lg:w-[94%]">
                          {surat.ar}
                          <span className="relative"> ۝</span>
                        </div>
                        <p className="w-full px-3 text-left mt-2 text-[15px] lg:w-[94%] lg:mt-7 nunito lg:pr-2">
                          {surat.idn}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
                <section>
                  <div className="flex flex-col items-center mt-10 mb-2 font-semibold">
                    <span className="border border-slate-400 px-3 py-1 rounded-md">
                      Do'a Robithoh - 3X
                    </span>
                  </div>

                  <div className="border border-slate-300 rounded-lg overflow-hidden">
                    {robithoh.map((surat) => (
                      <div
                        className="px-5 flex flex-wrap justify-end md:h-full md:items-center [&:not(:last-child)]:border-b border-slate-300 dark:border-slate-400/80 pt-14 pb-5 md:py-9 relative"
                        key={Math.random(20)}
                      >
                        <div className="text-xl md:ml-5 flex justify-between md:block gap-1 px-3 top-2 w-full mb-3 md:w-fit md:mb-0 md:px-0 absolute left-0 border-b border-dashed border-slate-200 pb-2 md:border-0">
                          <div className="flex md:block w-full gap-2">
                            <div className="w-auto border md:border-slate-200 rounded-md text-sm px-1 lg:mt-3 nunito font-semibold">
                              Do'a Robithoh
                            </div>
                          </div>
                        </div>

                        <div className="arab px-3 lg:pl-2 w-full md:w-[90%] lg:w-[94%]">
                          {surat.ar}
                          <span className="relative"> ۝</span>
                        </div>
                        <p className="w-full px-3 text-left mt-2 text-[15px] lg:w-[94%] lg:mt-7 nunito lg:pr-2">
                          {surat.idn}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}
            {activeTab === 1 && (
              <div className="sore hari">
                <section>
                  <div className="flex flex-col items-center mt-10 mb-2 font-semibold">
                    <span className="border border-slate-400 px-3 py-1 rounded-md">
                      Surat Al Fatihah - 1X
                    </span>
                  </div>

                  <div className="border border-slate-300 rounded-lg overflow-hidden">
                    {alfatihah.map((surat) => (
                      <div
                        className="px-5 flex flex-wrap justify-end md:h-full md:items-center [&:not(:last-child)]:border-b border-slate-300 dark:border-slate-400/80 pt-14 pb-5 md:py-9 relative"
                        key={Math.random(20)}
                      >
                        <div className="text-xl md:ml-5 flex justify-between md:block gap-1 px-3 top-2 w-full mb-3 md:w-fit md:mb-0 md:px-0 absolute left-0 border-b border-dashed border-slate-200 pb-2 md:border-0">
                          <div className="flex md:block w-full gap-2">
                            <div className="w-auto border md:border-slate-200 rounded-md text-sm px-1 lg:mt-3 nunito font-semibold">
                              Al Fatihah : {surat.nomor}
                            </div>
                          </div>
                        </div>

                        <div className="arab px-3 lg:pl-2 w-full md:w-[90%] lg:w-[94%]">
                          {surat.ar}
                          <span className="relative"> ۝</span>
                        </div>
                        <p className="w-full px-3 text-left mt-2 text-[15px] lg:w-[94%] lg:mt-7 nunito lg:pr-2">
                          {surat.idn}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <div className="flex flex-col items-center mt-10 mb-2 font-semibold">
                    <span className="border border-slate-400 px-3 py-1 rounded-md">
                      Surat Al Baqarah (1-5) - 1X
                    </span>
                    <span className="arab">
                      بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                    </span>
                  </div>

                  <div className="border border-slate-300 rounded-lg overflow-hidden">
                    {albaqarah15.map((surat) => (
                      <div
                        className="px-5 flex flex-wrap justify-end md:h-full md:items-center [&:not(:last-child)]:border-b border-slate-300 dark:border-slate-400/80 pt-14 pb-5 md:py-9 relative"
                        key={Math.random(20)}
                      >
                        <div className="text-xl md:ml-5 flex justify-between md:block gap-1 px-3 top-2 w-full mb-3 md:w-fit md:mb-0 md:px-0 absolute left-0 border-b border-dashed border-slate-200 pb-2 md:border-0">
                          <div className="flex md:block w-full gap-2">
                            <div className="w-auto border md:border-slate-200 rounded-md text-sm px-1 lg:mt-3 nunito font-semibold">
                              Al Baqarah : {surat.nomor}
                            </div>
                          </div>
                        </div>

                        <div className="arab px-3 lg:pl-2 w-full md:w-[90%] lg:w-[94%]">
                          {surat.ar}
                          <span className="relative"> ۝</span>
                        </div>
                        <p className="w-full px-3 text-left mt-2 text-[15px] lg:w-[94%] lg:mt-7 nunito lg:pr-2">
                          {surat.idn}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <div className="flex flex-col items-center mt-10 mb-2 font-semibold">
                    <span className="border border-slate-400 px-3 py-1 rounded-md">
                      Surat Al Baqarah (255-257) - 1X
                    </span>
                  </div>

                  <div className="border border-slate-300 rounded-lg overflow-hidden">
                    {albaqarah255_257.map((surat) => (
                      <div
                        className="px-5 flex flex-wrap justify-end md:h-full md:items-center [&:not(:last-child)]:border-b border-slate-300 dark:border-slate-400/80 pt-14 pb-5 md:py-9 relative"
                        key={Math.random(20)}
                      >
                        <div className="text-xl md:ml-5 flex justify-between md:block gap-1 px-3 top-2 w-full mb-3 md:w-fit md:mb-0 md:px-0 absolute left-0 border-b border-dashed border-slate-200 pb-2 md:border-0">
                          <div className="flex md:block w-full gap-2">
                            <div className="w-auto border md:border-slate-200 rounded-md text-sm px-1 lg:mt-3 nunito font-semibold">
                              Al Baqarah : {surat.nomor}
                            </div>
                          </div>
                        </div>

                        <div className="arab px-3 lg:pl-2 w-full md:w-[90%] lg:w-[94%]">
                          {surat.ar}
                          <span className="relative"> ۝</span>
                        </div>
                        <p className="w-full px-3 text-left mt-2 text-[15px] lg:w-[94%] lg:mt-7 nunito lg:pr-2">
                          {surat.idn}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <div className="flex flex-col items-center mt-10 mb-2 font-semibold">
                    <span className="border border-slate-400 px-3 py-1 rounded-md">
                      Surat Al Baqarah (284-286) - 1X
                    </span>
                  </div>

                  <div className="border border-slate-300 rounded-lg overflow-hidden">
                    {albaqarah284_286.map((surat) => (
                      <div
                        className="px-5 flex flex-wrap justify-end md:h-full md:items-center [&:not(:last-child)]:border-b border-slate-300 dark:border-slate-400/80 pt-14 pb-5 md:py-9 relative"
                        key={Math.random(20)}
                      >
                        <div className="text-xl md:ml-5 flex justify-between md:block gap-1 px-3 top-2 w-full mb-3 md:w-fit md:mb-0 md:px-0 absolute left-0 border-b border-dashed border-slate-200 pb-2 md:border-0">
                          <div className="flex md:block w-full gap-2">
                            <div className="w-auto border md:border-slate-200 rounded-md text-sm px-1 lg:mt-3 nunito font-semibold">
                              Al Baqarah : {surat.nomor}
                            </div>
                          </div>
                        </div>

                        <div className="arab px-3 lg:pl-2 w-full md:w-[90%] lg:w-[94%]">
                          {surat.ar}
                          <span className="relative"> ۝</span>
                        </div>
                        <p className="w-full px-3 text-left mt-2 text-[15px] lg:w-[94%] lg:mt-7 nunito lg:pr-2">
                          {surat.idn}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <div className="flex flex-col items-center mt-10 mb-2 font-semibold">
                    <span className="border border-slate-400 px-3 py-1 rounded-md">
                      Surat Al Ikhlas (1-4) - 3X
                    </span>
                    <span className="arab">
                      بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                    </span>
                  </div>

                  <div className="border border-slate-300 rounded-lg overflow-hidden">
                    {alikhlas.map((surat) => (
                      <div
                        className="px-5 flex flex-wrap justify-end md:h-full md:items-center [&:not(:last-child)]:border-b border-slate-300 dark:border-slate-400/80 pt-14 pb-5 md:py-9 relative"
                        key={Math.random(20)}
                      >
                        <div className="text-xl md:ml-5 flex justify-between md:block gap-1 px-3 top-2 w-full mb-3 md:w-fit md:mb-0 md:px-0 absolute left-0 border-b border-dashed border-slate-200 pb-2 md:border-0">
                          <div className="flex md:block w-full gap-2">
                            <div className="w-auto border md:border-slate-200 rounded-md text-sm px-1 lg:mt-3 nunito font-semibold">
                              Al Ikhlas : {surat.nomor}
                            </div>
                          </div>
                        </div>

                        <div className="arab px-3 lg:pl-2 w-full md:w-[90%] lg:w-[94%]">
                          {surat.ar}
                          <span className="relative"> ۝</span>
                        </div>
                        <p className="w-full px-3 text-left mt-2 text-[15px] lg:w-[94%] lg:mt-7 nunito lg:pr-2">
                          {surat.idn}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <div className="flex flex-col items-center mt-10 mb-2 font-semibold">
                    <span className="border border-slate-400 px-3 py-1 rounded-md">
                      Surat Al Falaq (1-5) - 3X
                    </span>
                    <span className="arab">
                      بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                    </span>
                  </div>

                  <div className="border border-slate-300 rounded-lg overflow-hidden">
                    {alfalaq.map((surat) => (
                      <div
                        className="px-5 flex flex-wrap justify-end md:h-full md:items-center [&:not(:last-child)]:border-b border-slate-300 dark:border-slate-400/80 pt-14 pb-5 md:py-9 relative"
                        key={Math.random(20)}
                      >
                        <div className="text-xl md:ml-5 flex justify-between md:block gap-1 px-3 top-2 w-full mb-3 md:w-fit md:mb-0 md:px-0 absolute left-0 border-b border-dashed border-slate-200 pb-2 md:border-0">
                          <div className="flex md:block w-full gap-2">
                            <div className="w-auto border md:border-slate-200 rounded-md text-sm px-1 lg:mt-3 nunito font-semibold">
                              Al Falaq : {surat.nomor}
                            </div>
                          </div>
                        </div>

                        <div className="arab px-3 lg:pl-2 w-full md:w-[90%] lg:w-[94%]">
                          {surat.ar}
                          <span className="relative"> ۝</span>
                        </div>
                        <p className="w-full px-3 text-left mt-2 text-[15px] lg:w-[94%] lg:mt-7 nunito lg:pr-2">
                          {surat.idn}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <div className="flex flex-col items-center mt-10 mb-2 font-semibold">
                    <span className="border border-slate-400 px-3 py-1 rounded-md">
                      Surat An Nas (1-6) - 3X
                    </span>
                    <span className="arab">
                      بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                    </span>
                  </div>

                  <div className="border border-slate-300 rounded-lg overflow-hidden">
                    {annas.map((surat) => (
                      <div
                        className="px-5 flex flex-wrap justify-end md:h-full md:items-center [&:not(:last-child)]:border-b border-slate-300 dark:border-slate-400/80 pt-14 pb-5 md:py-9 relative"
                        key={Math.random(20)}
                      >
                        <div className="text-xl md:ml-5 flex justify-between md:block gap-1 px-3 top-2 w-full mb-3 md:w-fit md:mb-0 md:px-0 absolute left-0 border-b border-dashed border-slate-200 pb-2 md:border-0">
                          <div className="flex md:block w-full gap-2">
                            <div className="w-auto border md:border-slate-200 rounded-md text-sm px-1 lg:mt-3 nunito font-semibold">
                              An Nas : {surat.nomor}
                            </div>
                          </div>
                        </div>

                        <div className="arab px-3 lg:pl-2 w-full md:w-[90%] lg:w-[94%]">
                          {surat.ar}
                          <span className="relative"> ۝</span>
                        </div>
                        <p className="w-full px-3 text-left mt-2 text-[15px] lg:w-[94%] lg:mt-7 nunito lg:pr-2">
                          {surat.idn}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {almatsuratsore.map((surat) => (
                  <section key={Math.random(20)}>
                    <div className="flex flex-col items-center mt-10 mb-2 font-semibold">
                      <span className="border border-slate-400 px-3 py-1 rounded-md">
                        {surat.heading}
                      </span>
                    </div>

                    <div className="border border-slate-300 rounded-lg overflow-hidden">
                      <div className="px-5 flex flex-wrap justify-end md:h-full md:items-center [&:not(:last-child)]:border-b border-slate-300 dark:border-slate-400/80 pt-14 pb-5 md:py-9 relative">
                        <div className="text-xl md:ml-5 flex justify-between md:block gap-1 px-3 top-2 w-full mb-3 md:w-fit md:mb-0 md:px-0 absolute left-0 border-b border-dashed border-slate-200 pb-2 md:border-0">
                          <div className="flex md:block w-full gap-2">
                            <div className="w-auto border md:border-slate-200 rounded-md text-sm px-1 lg:mt-3 nunito font-semibold">
                              Al-Matsurat
                            </div>
                          </div>
                        </div>

                        <div className="arab px-3 lg:pl-2 w-full md:w-[90%] lg:w-[94%]">
                          {surat.ar}
                          <span className="relative"> ۝</span>
                        </div>
                        <p className="w-full px-3 text-left mt-2 text-[15px] lg:w-[94%] lg:mt-7 nunito lg:pr-2">
                          {surat.idn}
                        </p>
                      </div>
                    </div>
                  </section>
                ))}

                <section>
                  <div className="flex flex-col items-center mt-10 mb-2 font-semibold">
                    <span className="border border-slate-400 px-3 py-1 rounded-md">
                      Surat Ali Imron (26-27) - 1X
                    </span>
                  </div>

                  <div className="border border-slate-300 rounded-lg overflow-hidden">
                    {aliimron.map((surat) => (
                      <div
                        className="px-5 flex flex-wrap justify-end md:h-full md:items-center [&:not(:last-child)]:border-b border-slate-300 dark:border-slate-400/80 pt-14 pb-5 md:py-9 relative"
                        key={Math.random(20)}
                      >
                        <div className="text-xl md:ml-5 flex justify-between md:block gap-1 px-3 top-2 w-full mb-3 md:w-fit md:mb-0 md:px-0 absolute left-0 border-b border-dashed border-slate-200 pb-2 md:border-0">
                          <div className="flex md:block w-full gap-2">
                            <div className="w-auto border md:border-slate-200 rounded-md text-sm px-1 lg:mt-3 nunito font-semibold">
                              Ali Imron : {surat.nomor}
                            </div>
                          </div>
                        </div>

                        <div className="arab px-3 lg:pl-2 w-full md:w-[90%] lg:w-[94%]">
                          {surat.ar}
                          <span className="relative"> ۝</span>
                        </div>
                        <p className="w-full px-3 text-left mt-2 text-[15px] lg:w-[94%] lg:mt-7 nunito lg:pr-2">
                          {surat.idn}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <div className="flex flex-col items-center mt-10 mb-2 font-semibold">
                    <span className="border border-slate-400 px-3 py-1 rounded-md">
                      Do'a Robithoh - 3X
                    </span>
                  </div>

                  <div className="border border-slate-300 rounded-lg overflow-hidden">
                    {robithohsore.map((surat) => (
                      <div
                        className="px-5 flex flex-wrap justify-end md:h-full md:items-center [&:not(:last-child)]:border-b border-slate-300 dark:border-slate-400/80 pt-14 pb-5 md:py-9 relative"
                        key={Math.random(20)}
                      >
                        <div className="text-xl md:ml-5 flex justify-between md:block gap-1 px-3 top-2 w-full mb-3 md:w-fit md:mb-0 md:px-0 absolute left-0 border-b border-dashed border-slate-200 pb-2 md:border-0">
                          <div className="flex md:block w-full gap-2">
                            <div className="w-auto border md:border-slate-200 rounded-md text-sm px-1 lg:mt-3 nunito font-semibold">
                              Do'a Robithoh
                            </div>
                          </div>
                        </div>

                        <div className="arab px-3 lg:pl-2 w-full md:w-[90%] lg:w-[94%]">
                          {surat.ar}
                          <span className="relative"> ۝</span>
                        </div>
                        <p className="w-full px-3 text-left mt-2 text-[15px] lg:w-[94%] lg:mt-7 nunito lg:pr-2">
                          {surat.idn}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Matsurat;
