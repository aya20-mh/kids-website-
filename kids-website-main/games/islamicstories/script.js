// ==================== المتغيرات العامة ====================
let currentStoryIndex = 0;
let currentPageIndex = 0;
let currentSurah = null;
let totalStars = 0;
let hasanatCount = 0;
let counterValue = 0;
let currentAthkarCategory = null;

// متغيرات الصوت
let currentAudio = null;
let isPlaying = false;
let isRepeating = false;

// عدادات الأذكار العامة
let athkarCounts = {
    istighfar: 0,
    tasbih: 0,
    tahmid: 0,
    tahlil: 0,
    takbir: 0,
    hawla: 0,
    salawat: 0
};

// روابط تلاوات السور (مشاري العفاسي)
const surahAudioUrls = {
    alfatiha: 'https://server8.mp3quran.net/afs/001.mp3',
    ikhlas: 'https://server8.mp3quran.net/afs/112.mp3',
    alfalaq: 'https://server8.mp3quran.net/afs/113.mp3',
    alnas: 'https://server8.mp3quran.net/afs/114.mp3',
    alkawthar: 'https://server8.mp3quran.net/afs/108.mp3'
};

// ==================== القصص (5 قصص كاملة) ====================
const stories = [
    {
        id: 1,
        title: "كلمة السر السحرية ✨",
        color: "#FF6B6B",
        pages: [
            { text: "كان يا مكان، طفل اسمه أحمد.", img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='300'%3E%3Crect fill='%23FFE5B4' width='600' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='120' text-anchor='middle' dominant-baseline='middle'%3E👦%3C/text%3E%3C/svg%3E" },
            { text: "شعر أحمد بالجوع، وأراد أن يأكل تفاحة.", img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='300'%3E%3Crect fill='%23FFB6C1' width='600' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='120' text-anchor='middle' dominant-baseline='middle'%3E🍎%3C/text%3E%3C/svg%3E" },
            { text: "تذكر أحمد أن هناك كلمة سحرية!", img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='300'%3E%3Crect fill='%2387CEEB' width='600' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='120' text-anchor='middle' dominant-baseline='middle'%3E🤔%3C/text%3E%3C/svg%3E" },
            { text: "قال أحمد: 'بسم الله' وبدأ يأكل.", img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='300'%3E%3Crect fill='%2398FB98' width='600' height='300'/%3E%3Ctext x='50%25' y='40%25' font-size='100' text-anchor='middle' dominant-baseline='middle'%3E👦%3C/text%3E%3Ctext x='50%25' y='70%25' font-size='100' text-anchor='middle' dominant-baseline='middle'%3E🍎%3C/text%3E%3C/svg%3E" },
            { text: "أصبح الطعام ألذ، والله فرح بأحمد!", img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='300'%3E%3Crect fill='%23FFD700' width='600' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='120' text-anchor='middle' dominant-baseline='middle'%3E😊⭐%3C/text%3E%3C/svg%3E" }
        ]
    },
    {
        id: 2,        title: "أقول الحمد لله 🌸",
        color: "#2EC4B6",
        pages: [
            { text: "استيقظت سارة من النوم.", img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='300'%3E%3Crect fill='%23FFB6C1' width='600' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='120' text-anchor='middle' dominant-baseline='middle'%3E👧%3C/text%3E%3C/svg%3E" },
            { text: "رأت الشمس المشرقة في السماء.", img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='300'%3E%3Crect fill='%2387CEEB' width='600' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='120' text-anchor='middle' dominant-baseline='middle'%3E☀️%3C/text%3E%3C/svg%3E" },
            { text: "قالت سارة: 'الحمد لله' على هذا اليوم.", img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='300'%3E%3Crect fill='%2398FB98' width='600' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='120' text-anchor='middle' dominant-baseline='middle'%3E🤲%3C/text%3E%3C/svg%3E" },
            { text: "شكرت الله على عينها ويدها.", img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='300'%3E%3Crect fill='%23FFE5B4' width='600' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='120' text-anchor='middle' dominant-baseline='middle'%3E👀✋%3C/text%3E%3C/svg%3E" },
            { text: "الله يحب الأطفال الشاكرين!", img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='300'%3E%3Crect fill='%23FFD700' width='600' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='120' text-anchor='middle' dominant-baseline='middle'%3E😊🌸%3C/text%3E%3C/svg%3E" }
        ]
    },
    {
        id: 3,
        title: "ابتسامتك صدقة 😊",
        color: "#FF9F1C",
        pages: [
            { text: "لعب سلام بلعبته المفضلة.", img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='300'%3E%3Crect fill='%2390EE90' width='600' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='120' text-anchor='middle' dominant-baseline='middle'%3E👦🚗%3C/text%3E%3C/svg%3E" },
            { text: "جاءت أخته الصغيرة وهي تبكي.", img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='300'%3E%3Crect fill='%23FFB6C1' width='600' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='120' text-anchor='middle' dominant-baseline='middle'%3E👧😢%3C/text%3E%3C/svg%3E" },
            { text: "أعطاها سلام اللعبة وابتسم بوجهها.", img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='300'%3E%3Crect fill='%2387CEEB' width='600' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='120' text-anchor='middle' dominant-baseline='middle'%3E😊🤝%3C/text%3E%3C/svg%3E" },
            { text: "ضحكت أخته وشعرت بالسعادة.", img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='300'%3E%3Crect fill='%23FFD700' width='600' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='120' text-anchor='middle' dominant-baseline='middle'%3E👧😊%3C/text%3E%3C/svg%3E" },
            { text: "قال الرسول: ابتسامتك في وجه أخيك صدقة.", img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='300'%3E%3Crect fill='%2398FB98' width='600' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='120' text-anchor='middle' dominant-baseline='middle'%3E😊⭐%3C/text%3E%3C/svg%3E" }
        ]
    },
    {
        id: 4,
        title: "سبحان الله 🦋",
        color: "#9B59B6",
        pages: [
            { text: "خرجت ليلى إلى الحديقة.", img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='300'%3E%3Crect fill='%2390EE90' width='600' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='120' text-anchor='middle' dominant-baseline='middle'%3E👧%3C/text%3E%3C/svg%3E" },
            { text: "رأت فراشة جميلة ملونة.", img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='300'%3E%3Crect fill='%23FFB6C1' width='600' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='120' text-anchor='middle' dominant-baseline='middle'%3E🦋%3C/text%3E%3C/svg%3E" },
            { text: "تعجبت ليلى من جمال الفراشة.", img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='300'%3E%3Crect fill='%2387CEEB' width='600' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='120' text-anchor='middle' dominant-baseline='middle'%3E😲🦋%3C/text%3E%3C/svg%3E" },
            { text: "قالت: 'سبحان الله' خالق كل شيء جميل.", img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='300'%3E%3Crect fill='%23FFD700' width='600' height='300'/%3E%3Ctext x='50%25' y='40%25' font-size='100' text-anchor='middle' dominant-baseline='middle'%3E👧%3C/text%3E%3Ctext x='50%25' y='70%25' font-size='100' text-anchor='middle' dominant-baseline='middle'%3E🦋%3C/text%3E%3C/svg%3E" },
            { text: "الله خلق كل شيء بأحسن صورة!", img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='300'%3E%3Crect fill='%2398FB98' width='600' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='120' text-anchor='middle' dominant-baseline='middle'%3E🦋🌈%3C/text%3E%3C/svg%3E" }
        ]
    },
    {
        id: 5,
        title: "الصلاة على النبي 💚",
        color: "#27AE60",
        pages: [
            { text: "جلس عمر مع جدته.", img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='300'%3E%3Crect fill='%23FFE5B4' width='600' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='120' text-anchor='middle' dominant-baseline='middle'%3E👦👵%3C/text%3E%3C/svg%3E" },
            { text: "قالت الجدة: هل تحب النبي محمد؟", img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='300'%3E%3Crect fill='%23FFB6C1' width='600' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='120' text-anchor='middle' dominant-baseline='middle'%3E💚%3C/text%3E%3C/svg%3E" },
            { text: "قال عمر: نعم أحبه كثيراً!", img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='300'%3E%3Crect fill='%2387CEEB' width='600' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='120' text-anchor='middle' dominant-baseline='middle'%3E👦😊%3C/text%3E%3C/svg%3E" },
            { text: "قالت: قل 'الصلاة والسلام عليك يا رسول الله'", img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='300'%3E%3Crect fill='%2398FB98' width='600' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='120' text-anchor='middle' dominant-baseline='middle'%3E🤲%3C/text%3E%3C/svg%3E" },
            { text: "الله يحب من يصلي على النبي!", img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='300'%3E%3Crect fill='%23FFD700' width='600' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='120' text-anchor='middle' dominant-baseline='middle'%3E💚⭐🌙%3C/text%3E%3C/svg%3E" }
        ]
    }
];

// ==================== السور القصيرة (نص بسيط بدون تظليل) ====================
const surahs = {    alfatiha: {
        name: "سورة الفاتحة",
        text: `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ<br>
        الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ﴿١﴾<br>
        الرَّحْمَٰنِ الرَّحِيمِ ﴿٢﴾<br>
        مَالِكِ يَوْمِ الدِّينِ ﴿٣﴾<br>
        إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ﴿٤﴾<br>
        اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ﴿٥﴾<br>
        صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ ﴿٦﴾`
    },
    ikhlas: {
        name: "سورة الإخلاص",
        text: `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ<br>
        قُلْ هُوَ اللَّهُ أَحَدٌ ﴿١﴾<br>
        اللَّهُ الصَّمَدُ ﴿٢﴾<br>
        لَمْ يَلِدْ وَلَمْ يُولَدْ ﴿٣﴾<br>
        وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ ﴿٤﴾`
    },
    alfalaq: {
        name: "سورة الفلق",
        text: `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ<br>
        قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ﴿١﴾<br>
        مِنْ شَرِّ مَا خَلَقَ ﴿٢﴾<br>
        وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ ﴿٣﴾<br>
        وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ﴿٤﴾<br>
        وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ ﴿٥﴾`
    },
    alnas: {
        name: "سورة الناس",
        text: `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ<br>
        قُلْ أَعُوذُ بِرَبِّ النَّاسِ ﴿١﴾<br>
        مَلِكِ النَّاسِ ﴿٢﴾<br>
        إِلَٰهِ النَّاسِ ﴿٣﴾<br>
        مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ﴿٤﴾<br>
        الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ﴿٥﴾<br>
        مِنَ الْجِنَّةِ وَالنَّاسِ ﴿٦﴾`
    },
    alkawthar: {
        name: "سورة الكوثر",
        text: `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ<br>
        إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ ﴿١﴾<br>
        فَصَلِّ لِرَبِّكَ وَانْحَرْ ﴿٢﴾<br>
        إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ ﴿٣﴾`
    }
};

// ==================== الأذكار اليومية ====================
const athkarData = {
    morning: {
        title: "🌅 أذكار الصباح",        athkar: [
            { text: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلّهِ، وَالْحَمْدُ لِلّهِ، لاَ إِلَهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيكَ لَهُ", count: 0, reward: "مرة واحدة" },
            { text: "اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ", count: 0, reward: "مرة واحدة" },
            { text: "بِسْمِ اللهِ الَّذِي لاَ يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الأَرْضِ وَلاَ فِي السَّمَاءِ، وَهُوَ السَّمِيعُ الْعَلِيمُ", count: 0, reward: "3 مرات" },
            { text: "رَضِيتُ بِاللهِ رَبًّا، وَبِالإِسْلاَمِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا", count: 0, reward: "3 مرات" },
            { text: "يَا حَيُّ يَا قَيُّومُ، بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ", count: 0, reward: "مرة واحدة" },
            { text: "سُبْحَانَ اللهِ وَبِحَمْدِهِ", count: 0, reward: "100 مرة" },
            { text: "لاَ إِلَهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ", count: 0, reward: "10 مرات" }
        ]
    },
    evening: {
        title: "🌆 أذكار المساء",
        athkar: [
            { text: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلّهِ، وَالْحَمْدُ لِلّهِ، لاَ إِلَهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيكَ لَهُ", count: 0, reward: "مرة واحدة" },
            { text: "اللَّهُمَّ بِكَ أَمْسَيْنَا وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ", count: 0, reward: "مرة واحدة" },
            { text: "بِسْمِ اللهِ الَّذِي لاَ يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الأَرْضِ وَلاَ فِي السَّمَاءِ", count: 0, reward: "3 مرات" },
            { text: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلّهِ رَبِّ الْعَالَمِينَ", count: 0, reward: "مرة واحدة" },
            { text: "سُبْحَانَ اللهِ وَبِحَمْدِهِ", count: 0, reward: "100 مرة" },
            { text: "أَسْتَغْفِرُ اللهَ وَأَتُوبُ إِلَيْهِ", count: 0, reward: "100 مرة" }
        ]
    },
    sleep: {
        title: "🌙 أذكار النوم",
        athkar: [
            { text: "بِسْمِ اللهِ الَّذِي لاَ إِلَهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ", count: 0, reward: "مرة واحدة" },
            { text: "بِاسْمِكَ رَبِّ وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ", count: 0, reward: "مرة واحدة" },
            { text: "سُبْحَانَ اللهِ (33)، الْحَمْدُ لِلّهِ (33)، اللهُ أَكْبَرُ (34)", count: 0, reward: "قبل النوم" },
            { text: "الْحَمْدُ لِلّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا، وَكَفَانَا، وَآوَانَا", count: 0, reward: "مرة واحدة" }
        ]
    }
};

// ==================== التنقل بين الأقسام ====================
function showSection(section) {
    const sections = ['home-screen', 'stories-section', 'story-screen', 'surahs-section', 'surah-screen', 'athkar-section', 'athkar-list-screen', 'counter-section', 'reward-screen'];
    sections.forEach(function(id) {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });
    
    const showMap = {
        'home': 'home-screen',
        'stories': 'stories-section',
        'surahs': 'surahs-section',
        'athkar': 'athkar-section',
        'counter': 'counter-section'
    };
    
    if (showMap[section]) {
        document.getElementById(showMap[section]).classList.remove('hidden');        if (section === 'stories') renderStories();
    }
}

function goHome() {
    stopAudio();
    showSection('home');
}

// ==================== القصص ====================
function renderStories() {
    const grid = document.querySelector('.stories-grid');
    if (!grid) return;
    grid.innerHTML = '';
    stories.forEach(function(story, index) {
        const btn = document.createElement('button');
        btn.className = 'story-btn';
        btn.innerText = story.title;
        btn.style.backgroundColor = story.color;
        btn.onclick = function() { startStory(index); };
        grid.appendChild(btn);
    });
}

function startStory(index) {
    currentStoryIndex = index;
    currentPageIndex = 0;
    document.getElementById('stories-section').classList.add('hidden');
    document.getElementById('story-screen').classList.remove('hidden');
    showPage();
}

function showPage() {
    const story = stories[currentStoryIndex];
    const page = story.pages[currentPageIndex];
    document.getElementById('story-title').innerText = story.title;
    document.getElementById('story-content').innerText = page.text;
    document.getElementById('story-img').src = page.img;
    document.getElementById('prev-btn').disabled = currentPageIndex === 0;
    document.getElementById('prev-btn').style.opacity = currentPageIndex === 0 ? '0.5' : '1';
    document.getElementById('next-btn').innerText = currentPageIndex === story.pages.length - 1 ? "إنهاء 🎉" : "التالي ⬅️";
}

function nextPage() {
    const story = stories[currentStoryIndex];
    if (currentPageIndex < story.pages.length - 1) {
        currentPageIndex++;
        showPage();
    } else {
        addStars(1);        showReward("أحسنت! أتممت القصة!<br>حصلت على ⭐ (نجمة واحدة)");
    }
}

function prevPage() {
    if (currentPageIndex > 0) {
        currentPageIndex--;
        showPage();
    }
}

// ==================== السور ====================
function showSurah(surahId) {
    currentSurah = surahId;
    const surah = surahs[surahId];
    stopAudio();
    document.getElementById('surahs-section').classList.add('hidden');
    document.getElementById('surah-screen').classList.remove('hidden');
    document.getElementById('surah-title').innerText = surah.name;
    document.getElementById('surah-text').innerHTML = surah.text;
}

function markAsMemorized() {
    addStars(10);
    showReward("ما شاء الله! حفظت السورة!<br>حصلت على ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ (10 نجوم)");
}

// ==================== دوال صوت السور (بسيط وبدون تظليل) ====================
function toggleAudio() {
    if (!currentSurah) return;
    if (!currentAudio) {
        playAudio();
    } else if (isPlaying) {
        pauseAudio();
    } else {
        playAudio();
    }
}

function playAudio() {
    const audioUrl = surahAudioUrls[currentSurah];
    if (!audioUrl) return;
    
    currentAudio = new Audio(audioUrl);
    
    currentAudio.addEventListener('ended', function() {
        if (isRepeating) {
            currentAudio.currentTime = 0;
            currentAudio.play();
        } else {            resetAudioUI();
        }
    });
    
    currentAudio.addEventListener('timeupdate', updateProgressBar);
    
    currentAudio.play().then(function() {
        isPlaying = true;
        updateAudioUI(true);
    }).catch(function(e) {
        console.log('Play error:', e);
        resetAudioUI();
    });
}

function pauseAudio() {
    if (currentAudio) {
        currentAudio.pause();
        isPlaying = false;
        updateAudioUI(false);
    }
}

function stopAudio() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
        isPlaying = false;
        isRepeating = false;
        resetAudioUI();
    }
}

function repeatAudio() {
    isRepeating = !isRepeating;
    const btns = document.querySelectorAll('.control-btn');
    if (btns[0]) {
        btns[0].style.background = isRepeating ? '#FFD700' : 'rgba(255,255,255,0.2)';
        btns[0].style.color = isRepeating ? '#2c3e50' : 'white';
    }
}

function updateAudioUI(playing) {
    const btn = document.querySelector('.audio-btn');
    const icon = document.getElementById('audio-icon');
    const text = document.getElementById('audio-text');
    
    if (!btn || !icon || !text) return;
        if (playing) {
        btn.classList.add('playing');
        icon.innerText = '⏸️';
        text.innerText = 'إيقاف مؤقت';
    } else {
        btn.classList.remove('playing');
        icon.innerText = '▶️';
        text.innerText = 'استمع للتلاوة';
    }
}

function resetAudioUI() {
    const btn = document.querySelector('.audio-btn');
    const icon = document.getElementById('audio-icon');
    const text = document.getElementById('audio-text');
    const progress = document.getElementById('progress-bar');
    
    if (btn) btn.classList.remove('playing');
    if (icon) icon.innerText = '▶️';
    if (text) text.innerText = 'استمع للتلاوة';
    if (progress) progress.style.width = '0%';
    
    isPlaying = false;
}

function updateProgressBar() {
    if (!currentAudio) return;
    const progress = document.getElementById('progress-bar');
    if (progress && currentAudio.duration) {
        const percent = (currentAudio.currentTime / currentAudio.duration) * 100;
        progress.style.width = percent + '%';
    }
}

// ==================== الأذكار العامة ====================
function reciteAthkar(type) {
    athkarCounts[type]++;
    hasanatCount++;
    addStars(10);
    const countEl = document.getElementById(type + '-count');
    if (countEl) countEl.innerText = athkarCounts[type];
    const hasanatEl = document.getElementById('hasanat-count');
    if (hasanatEl) hasanatEl.innerText = hasanatCount;
    showFloatingText('+1 حسنة = +10 نجوم ⭐');
}

// ==================== الأذكار اليومية ====================
function showAthkarCategory(categoryId) {
    currentAthkarCategory = categoryId;
    const category = athkarData[categoryId];    document.getElementById('athkar-section').classList.add('hidden');
    document.getElementById('athkar-list-screen').classList.remove('hidden');
    document.getElementById('athkar-list-title').innerText = category.title;
    renderAthkarItems();
    updateAthkarStats();
}

function renderAthkarItems() {
    const container = document.getElementById('athkar-items');
    if (!container) return;
    container.innerHTML = '';
    const category = athkarData[currentAthkarCategory];
    category.athkar.forEach(function(athkar, index) {
        const item = document.createElement('div');
        item.className = 'athkar-item-card' + (athkar.count > 0 ? ' read' : '');
        item.onclick = function() { reciteAthkarItem(index); };
        item.innerHTML = '<div class="athkar-item-text">' + athkar.text + '</div><div class="athkar-item-hint">📖 ' + athkar.reward + '</div>' + (athkar.count > 0 ? '<div class="athkar-item-count">✅ قرأت ' + athkar.count + ' مرة</div>' : '');
        container.appendChild(item);
    });
}

function reciteAthkarItem(index) {
    const category = athkarData[currentAthkarCategory];
    category.athkar[index].count++;
    addStars(1);
    renderAthkarItems();
    updateAthkarStats();
    showFloatingText('+1 نجمة ⭐');
}

function updateAthkarStats() {
    if (!currentAthkarCategory) return;
    const category = athkarData[currentAthkarCategory];
    let totalCount = 0;
    category.athkar.forEach(function(athkar) { totalCount += athkar.count; });
    document.getElementById('athkar-read-count').innerText = totalCount;
    document.getElementById('athkar-earned-stars').innerText = totalCount;
}

// ==================== العداد ====================
function incrementCounter() {
    counterValue++;
    document.getElementById('big-counter').innerText = counterValue;
}

function resetCounter() {
    counterValue = 0;
    document.getElementById('big-counter').innerText = '0';
}
// ==================== نظام النجوم ====================
function addStars(amount) {
    totalStars += amount;
    document.getElementById('total-stars').innerText = totalStars;
    try {
        localStorage.setItem('totalStars', totalStars);
        localStorage.setItem('hasanatCount', hasanatCount);
        localStorage.setItem('counterValue', counterValue);
        localStorage.setItem('athkarCounts', JSON.stringify(athkarCounts));
        localStorage.setItem('athkarData', JSON.stringify(athkarData));
    } catch (e) {
        console.log('Storage error:', e);
    }
}

function showReward(message) {
    document.getElementById('reward-message').innerHTML = message;
    document.getElementById('reward-screen').classList.remove('hidden');
}

function showFloatingText(text) {
    const div = document.createElement('div');
    div.innerText = text;
    div.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:linear-gradient(135deg,#FFD700,#FFA500);color:white;padding:20px 40px;border-radius:50px;font-size:2rem;font-weight:bold;z-index:1000;animation:floatUp 1.5s ease-out;pointer-events:none;';
    document.body.appendChild(div);
    setTimeout(function() { div.remove(); }, 1500);
}

// ==================== تحميل البيانات المحفوظة ====================
window.onload = function() {
    try {
        const savedStars = localStorage.getItem('totalStars');
        const savedHasanat = localStorage.getItem('hasanatCount');
        const savedCounter = localStorage.getItem('counterValue');
        const savedAthkarCounts = localStorage.getItem('athkarCounts');
        
        if (savedStars) { totalStars = parseInt(savedStars); document.getElementById('total-stars').innerText = totalStars; }
        if (savedHasanat) { hasanatCount = parseInt(savedHasanat); document.getElementById('hasanat-count').innerText = hasanatCount; }
        if (savedCounter) { counterValue = parseInt(savedCounter); document.getElementById('big-counter').innerText = counterValue; }
        if (savedAthkarCounts) {
            athkarCounts = JSON.parse(savedAthkarCounts);
            for (let type in athkarCounts) {
                const el = document.getElementById(type + '-count');
                if (el) el.innerText = athkarCounts[type];
            }
        }
    } catch (e) {
        console.log('Load error:', e);
    }
};