        tailwind.config = {
            darkMode: 'class',
            theme: {
                screens: {
                    'sm': '885px',
                    'md': '1024px',
                    'lg': '1280px',
                    'xl': '1536px',
                },
                extend: {
                    colors: {
                        primary: '#10b981',
                        accent: '#fbbf24',
                        darkBg: '#020617',
                        glassWhite: 'rgba(255, 255, 255, 0.8)',
                        glassDark: 'rgba(15, 23, 42, 0.8)'
                    },
                    fontFamily: {
                        cairo: ['Cairo', 'sans-serif'],
                        amiri: ['Amiri', 'serif']
                    }
                }
            }
        }


        function holyApp() {
            return {
                darkMode: localStorage.getItem('darkMode') === 'true',
                currentView: 'home',
                searchQuery: '',
                selectedSurah: null,
                surahData: null,
                selectedAthkarCategory: null,
                showTranslation: true,
                fontSize: 28,
                showSettings: false,
                bookmarks: JSON.parse(localStorage.getItem('holy_bookmarks') || '[]'),
                surahs: [],
                audio: new Audio(),
                isPlaying: false,
                duration: 0,
                currentTime: 0,
                audioProgress: 0,
                volume: 0.7,
                quickStats: [
                    { label: 'المفضلة', value: 0, icon: 'fa-solid fa-heart', bg: 'bg-red-500' },
                    { label: 'السور', value: 114, icon: 'fa-solid fa-book', bg: 'bg-primary' },
                    { label: 'الأذكار', value: '2', icon: 'fa-solid fa-hands-praying', bg: 'bg-accent' },
                    { label: 'القارئ', value: 'العفاسي', icon: 'fa-solid fa-microphone', bg: 'bg-blue-500' }
                ],
                menu: [
                    { id: 'home', name: 'الرئيسية', icon: 'fa-solid fa-house-chimney' },
                    { id: 'quran', name: 'المصحف', icon: 'fa-solid fa-book-open' },
                    { id: 'athkar', name: 'الأذكار', icon: 'fa-solid fa-hands-praying' },
                    { id: 'favorites', name: 'المفضلة', icon: 'fa-solid fa-heart' }
                ],
                allAthkarData: {
                    "أذكار الصباح": [
                        { text: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.", originalCount: 1, currentCount: 1 },
        { text: "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ.", originalCount: 1, currentCount: 1 },
        { text: "أَصْبَحْنَا عَلَى فِطْرَةِ الإِسْلاَمِ، وَعَلَى كَلِمَةِ الإِخْلاَصِ، وَعَلَى دِينِ نَبِيِّنَا مُحَمَّدٍ ﷺ، وَعَلَى مِلَّةِ أَبِينَا إِبْرَاهِيمَ حَنِيفًا مُسْلِمًا وَمَا كَانَ مِنَ الْمُشْرِكِينَ.", originalCount: 1, currentCount: 1 },
        { text: "اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ لاَ تَأْخُذُهُ سِنَةٌ وَلاَ نَوْمٌ... (آيَةُ الْكُرْسِيِّ).", originalCount: 1, currentCount: 1 },
        { text: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ. قُلْ هُوَ اللَّهُ أَحَدٌ... (سُورَةُ الإِخْلاَصِ).", originalCount: 3, currentCount: 3 },
        { text: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ. قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ... (سُورَةُ الْفَلَقِ).", originalCount: 3, currentCount: 3 },
        { text: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ. قُلْ أَعُوذُ بِرَبِّ النَّاسِ... (سُورَةُ النَّاسِ).", originalCount: 3, currentCount: 3 },
        { text: "اللَّهُمَّ أَنْتَ رَبِّي لا إِلَهَ إِلا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لا يَغْفِرُ الذُّنُوبَ إِلا أَنْتَ.", originalCount: 1, currentCount: 1 },
        { text: "اللَّهُمَّ إِنِّي أَصْبَحْتُ أُشْهِدُكَ، وَأُشْهِدُ حَمَلَةَ عَرْشِكَ، وَمَلاَئِكَتَكَ، وَجَمِيعَ خَلْقِكَ، أَنَّكَ أَنْتَ اللَّهُ لاَ إِلَهَ إِلاَّ أَنْتَ وَحْدَكَ لاَ شَرِيكَ لَكَ، وَأَنَّ مُحَمَّدًا عَبْدُكَ وَرَسُولُكَ.", originalCount: 4, currentCount: 4 },
        { text: "اللَّهُمَّ مَا أَصْبَحَ بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لا شَرِيكَ لَكَ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ.", originalCount: 1, currentCount: 1 },
        { text: "اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لاَ إِلَهَ إِلاَّ أَنْتَ.", originalCount: 3, currentCount: 3 },
        { text: "حَسْبِيَ اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ.", originalCount: 7, currentCount: 7 },
        { text: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالآخِرَةِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي.", originalCount: 1, currentCount: 1 },
        { text: "بِسْمِ اللَّهِ الَّذِي لاَ يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الأَرْضِ وَلاَ فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ.", originalCount: 3, currentCount: 3 },
        { text: "رَضِيتُ بِاللَّهِ رَبًّا، وَبِالإِسْلاَمِ دِينًا، وَبِمُحَمَّدٍ ﷺ نَبِيًّا.", originalCount: 3, currentCount: 3 },
        { text: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ أَصْلِحْ لِي شَأْنِي كُلَّهُ وَلاَ تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ.", originalCount: 1, currentCount: 1 },
        { text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ: عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ.", originalCount: 3, currentCount: 3 },
        { text: "لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.", originalCount: 10, currentCount: 10 },
        { text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ.", originalCount: 100, currentCount: 100 },
        { text: "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ.", originalCount: 100, currentCount: 100 }
                    ],
                    "أذكار المساء": [
                       { text: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.", originalCount: 1, currentCount: 1 },
        { text: "اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ.", originalCount: 1, currentCount: 1 },
        { text: "أَمْسَيْنَا عَلَى فِطْرَةِ الإِسْلاَمِ، وَعَلَى كَلِمَةِ الإِخْلاَصِ، وَعَلَى دِينِ نَبِيِّنَا مُحَمَّدٍ ﷺ، وَعَلَى مِلَّةِ أَبِينَا إِبْرَاهِيمَ حَنِيفًا مُسْلِمًا وَمَا كَانَ مِنَ الْمُشْرِكِينَ.", originalCount: 1, currentCount: 1 },
        { text: "اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ لاَ تَأْخُذُهُ سِنَةٌ وَلاَ نَوْمٌ... (آيَةُ الْكُرْسِيِّ).", originalCount: 1, currentCount: 1 },
        { text: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ. قُلْ هُوَ اللَّهُ أَحَدٌ... (سُورَةُ الإِخْلاَصِ).", originalCount: 3, currentCount: 3 },
        { text: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ. قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ... (سُورَةُ الْفَلَقِ).", originalCount: 3, currentCount: 3 },
        { text: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ. قُلْ أَعُوذُ بِرَبِّ النَّاسِ... (سُورَةُ النَّاسِ).", originalCount: 3, currentCount: 3 },
        { text: "اللَّهُمَّ أَنْتَ رَبِّي لا إِلَهَ إِلا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لا يَغْفِرُ الذُّنُوبَ إِلا أَنْتَ.", originalCount: 1, currentCount: 1 },
        { text: "اللَّهُمَّ إِنِّي أَمْسَيْتُ أُشْهِدُكَ، وَأُشْهِدُ حَمَلَةَ عَرْشِكَ، وَمَلاَئِكَتَكَ، وَجَمِيعَ خَلْقِكَ، أَنَّكَ أَنْتَ اللَّهُ لاَ إِلَهَ إِلاَّ أَنْتَ وَحْدَكَ لاَ شَرِيكَ لَكَ، وَأَنَّ مُحَمَّدًا عَبْدُكَ وَرَسُولُكَ.", originalCount: 4, currentCount: 4 },
        { text: "اللَّهُمَّ مَا أَمْسَى بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لا شَرِيكَ لَكَ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ.", originalCount: 1, currentCount: 1 },
        { text: "اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لاَ إِلَهَ إِلاَّ أَنْتَ.", originalCount: 3, currentCount: 3 },
        { text: "حَسْبِيَ اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ.", originalCount: 7, currentCount: 7 },
        { text: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالآخِرَةِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي.", originalCount: 1, currentCount: 1 },
        { text: "بِسْمِ اللَّهِ الَّذِي لاَ يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الأَرْضِ وَلاَ فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ.", originalCount: 3, currentCount: 3 },
        { text: "رَضِيتُ بِاللَّهِ رَبًّا، وَبِالإِسْلاَمِ دِينًا، وَبِمُحَمَّدٍ ﷺ نَبِيًّا.", originalCount: 3, currentCount: 3 },
        { text: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ أَصْلِحْ لِي شَأْنِي كُلَّهُ وَلاَ تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ.", originalCount: 1, currentCount: 1 },
        { text: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ.", originalCount: 3, currentCount: 3 },
        { text: "لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.", originalCount: 10, currentCount: 10 },
        { text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ.", originalCount: 100, currentCount: 100 },
        { text: "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ.", originalCount: 100, currentCount: 100 }
                    ]
                },
                async init() {
                    const res = await fetch('https://api.alquran.cloud/v1/surah');
                    const data = await res.json();
                    this.surahs = data.data;
                    this.quickStats[0].value = this.bookmarks.length;

                    this.$watch('darkMode', val => {
                        localStorage.setItem('darkMode', val);
                        if(val) document.documentElement.classList.add('dark');
                        else document.documentElement.classList.remove('dark');
                    });
                    if(this.darkMode) document.documentElement.classList.add('dark');
                    this.$watch('bookmarks', val => {
                        localStorage.setItem('holy_bookmarks', JSON.stringify(val));
                        this.quickStats[0].value = val.length;
                    });
                    this.$watch('volume', val => this.audio.volume = val);
                    this.audio.ontimeupdate = () => {
                        this.currentTime = this.audio.currentTime;
                        this.duration = this.audio.duration;
                        this.audioProgress = (this.currentTime / this.duration) * 100;
                    };
                    this.audio.onended = () => this.isPlaying = false;
                },
                get filteredSurahs() {
                    return this.surahs.filter(s => s.name.includes(this.searchQuery) || s.englishName.toLowerCase().includes(this.searchQuery.toLowerCase()));
                },
                async loadSurah(num) {
                    this.selectedSurah = num;
                    const res = await fetch(`https://api.alquran.cloud/v1/surah/${num}/editions/quran-uthmani,en.asad`);
                    const data = await res.json();
                    const ar = data.data[0];
                    const en = data.data[1];
                    this.surahData = {
                        ...ar,
                        ayahs: ar.ayahs.map((a, i) => ({
                            ...a,
                            translation: en.ayahs[i].text
                        }))
                    };
                    this.audio.src = `https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/${num}.mp3`;
                    this.isPlaying = false;
                    this.audioProgress = 0;
                    this.currentTime = 0;
                },
                toggleAudio() {
                    if (this.audio.src && this.audio.src !== window.location.href) {
                        if (this.isPlaying) this.audio.pause();
                        else this.audio.play();
                        this.isPlaying = !this.isPlaying;
                    }
                },
                formatTime(seconds) {
                    if (isNaN(seconds) || !isFinite(seconds)) return "00:00";
                    const min = Math.floor(seconds / 60);
                    const sec = Math.floor(seconds % 60);
                    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
                },
                copyAyah(text) {
                    navigator.clipboard.writeText(text);
                },
                toggleBookmark(ayah) {
                    const idx = this.bookmarks.findIndex(b => b.number === ayah.number && b.surahNumber === this.selectedSurah);
                    if (idx > -1) this.bookmarks.splice(idx, 1);
                    else this.bookmarks.push({ number: ayah.number, surahNumber: this.selectedSurah, surahName: this.surahData.name, text: ayah.text });
                },
                isBookmarked(ayah) {
                    return this.bookmarks.some(b => b.number === ayah.number && b.surahNumber === this.selectedSurah);
                },
                getViewTitle() {
                    if (this.currentView === 'quran' && this.selectedSurah) return this.surahData?.name;
                    return this.menu.find(m => m.id === this.currentView)?.name || '';
                }
            }
        }
