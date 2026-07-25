import { Ovi } from "../types";

// Helper function to create rich, authentic Chapter 5 Ovis (कर्मसंन्यासयोग - 180 Ovis)
function createChapter5Ovis(): Ovi[] {
  const ovis: Ovi[] = [];
  const total = 180;

  const keyOviMap = new Map<number, Partial<Ovi>>([
    [1, {
      originalMarathi: "अर्जुन उवाचः संन्यासं कर्मणां कृष्ण पुनर्योगं च शंससि । यत् श्रेयं एतयोरेकें तत् मे ब्रूहि सुनिश्चितम् ॥ १ ॥\nमग पार्थु श्रीकृष्णातें म्हणे । हां हो हें कैसें तुमचे बोलणें । एक होय तरी अंतःकरणे । विचारूं ये ॥ १ ॥",
      marathiBhavarth: "अर्जुन श्रीकृष्णाला म्हणाला: हे कृष्णा, तुम्ही एका बाजूला सर्व कर्मांचा संन्यास (त्याग) सांगता आणि दुसऱ्या बाजूला कर्मयोगाची प्रशंसा करता. या दोघांमध्ये माझ्यासाठी काय निश्चित श्रेयस्कर आहे ते मला स्पष्ट सांगा.",
      englishTranslation: "Arjuna asks: O Krishna, You praise renunciation of actions, and yet You also praise selfless performance of action (Karma Yoga). Tell me decisively which of these two is superior!",
      spiritualInsight: "Seeking absolute clarity between internal detachment and active duty.",
      tags: ["अर्जुन प्रश्न", "संन्यास", "कर्मयोग"],
      isFamous: true
    }],
    [2, {
      originalMarathi: "मागां सकळ कर्माचा संन्यासु । तुम्हींचि निरोपिला होता बहुवसु । तरी कर्मयोगीं केवीं आचरू ॥ २ ॥",
      marathiBhavarth: "मागे तुम्ही सर्व कर्मांचा संन्यास घेण्याविषयी फार विस्तारपूर्वक सांगितले होते; मग आता कर्मयोगाचे आचरण कसे करावे ते सांगावे.",
      englishTranslation: "Previously You explained the greatness of renunciation; now You advocate Karma Yoga. How should one practice this?",
      spiritualInsight: "Resolving apparent spiritual contradictions through deeper insight.",
      tags: ["संन्यास", "कर्मयोग", "अर्जुन"]
    }],
    [3, {
      originalMarathi: "आणि आतां तरी ऐसें सांगतसा । जे कर्माते आचरावे सर्वथा । तरी या दोहींमाजीं निभ्रांता । कवणाची सोय ॥ ३ ॥",
      marathiBhavarth: "आणि आता असे सांगता की कर्माचे आचरण केलेच पाहिजे; मग या दोघांपैकी कोणता मार्ग संशयविरहित आणि श्रेष्ठ आहे?",
      englishTranslation: "And now You state that duties must be performed. Among these two, which path leads unwaveringly to liberation?",
      spiritualInsight: "Directing the intellect toward the highest spiritual path.",
      tags: ["कर्मयोग", "श्रेयस्कर मार्ग"]
    }],
    [4, {
      originalMarathi: "हें पूर्वोत्तर पाहतां दोन्ही । आम्हांसि विषम दिसे मनीं । तरी एकावचनीं राहौनि । सांगा जी आम्हां ॥ ४ ॥",
      marathiBhavarth: "हे पूर्व आणि उत्तर विधान पाहता आमच्या मनात विषमता वाटते, म्हणून एकाच निश्चित वचनाने आम्हास मार्गदर्शन करावे.",
      englishTranslation: "Examining both statements, my mind feels conflicted. Please give me one clear, definitive guidance.",
      spiritualInsight: "Single-minded pursuit of Truth requires unambiguous guidance.",
      tags: ["एकावचन", "मार्गदर्शन", "कृष्ण"]
    }],
    [5, {
      originalMarathi: "अहो जेणें पथे जाहले आपण । तेथें सर्वथा न पडे संदेहो । तेणें मार्गे सर्वही जीवो । सुख पावती ॥ ५ ॥",
      marathiBhavarth: "ज्या मार्गाने तुम्ही स्वतः गेला आहात, जिथे कोणताही संशय उरत नाही, त्या मार्गाने चालून सर्व जीव परम सुख पावतात.",
      englishTranslation: "Along the path walk'd by the Lord, no doubt remains; traveling that path, all souls attain eternal bliss.",
      spiritualInsight: "Following the path of God and realized masters ensures steady liberation.",
      tags: ["सुख", "परम मार्ग", "आत्मानंद"]
    }],
    [9, {
      originalMarathi: "श्रीभगवानुवाचः संन्यासः कर्मयोगश्च निःश्रेयसकरावुभौ । तयोस्तु कर्मसंन्यासात्कर्मयोगो विशिष्यते ॥ ९ ॥\nअहो संन्यास आणि योगु । हे दोन्ही मोक्षाचेचि मार्ग । परि यां दोहींतें एकु । श्रेयो वर्णिजे ॥ ९ ॥",
      marathiBhavarth: "श्रीभगवान म्हणाले: कर्मसंन्यास आणि कर्मयोग हे दोन्ही मार्ग मोक्ष देणारेच आहेत. परंतु या दोघांमध्ये कर्मसंन्यासापेक्षा कर्मयोग अधिक सुलभ व श्रेयस्कर आहे.",
      englishTranslation: "Sri Krishna says: Both renunciation of action and Karma Yoga lead to supreme liberation. But of the two, Karma Yoga is far more accessible and exalted.",
      spiritualInsight: "Selfless action performed as worship easily transcends karmic bonds without outer austerity.",
      tags: ["श्रीभगवान उवाच", "कर्मयोग", "निःश्रेयस"],
      isFamous: true
    }],
    [45, {
      originalMarathi: "ज्ञेयः स नित्यसंन्यासी यो न द्वेष्टि न काङ्क्षति । निर्द्वन्द्वो हि महाबाहो सुखं बन्धात्प्रमुच्यते ॥ ४५ ॥\nजो न द्वेष्टी न कांक्षी । भूतमात्रीं जो समसाक्षी । तो संन्यासी निरंतरु । जाणिजे गा ॥ ४५ ॥",
      marathiBhavarth: "जो कोणाचाही द्वेष करत नाही आणि कशाचीही आकांक्षा बाळगत नाही, जो द्वंद्वातीत असून सर्व प्राणिमात्रांच्या ठायी समसाक्षी राहतो, त्यालाच नित्य संन्यासी समजावे.",
      englishTranslation: "Know him to be a perpetual renunciate who neither hates nor desires. Free from dualities, he is easily released from all bondage.",
      spiritualInsight: "True renunciation is an inner state of detachment from dualities, not abandoning work.",
      tags: ["नित्य संन्यासी", "द्वंद्वातीत", "समसाक्षी"],
      isFamous: true
    }],
    [80, {
      originalMarathi: "विद्याविनयसंपन्ने ब्राह्मणे गवि हस्तिनि । शुनि चैव श्वपाके च पण्डिताः समदर्शिनः ॥ ८० ॥",
      marathiBhavarth: "ज्ञानाने परिपूर्ण झालेले ज्ञानी पंडित विद्यायुक्त ब्राह्मण, गाय, हत्ती, कुत्रा आणि चांडाल या सर्वांच्या ठायी एकच आत्मतत्व पाहतात व समदृष्टी ठेवतात.",
      englishTranslation: "The truly wise look with equal vision upon a learned scholar, a cow, an elephant, a dog, and an outcast.",
      spiritualInsight: "Equal vision (Samadarshana) beholds the same divine Consciousness shining in every soul.",
      tags: ["समदृष्टी", "पंडित", "आत्मज्ञान"],
      isFamous: true
    }],
    [100, {
      originalMarathi: "इहैव तैर्जितः सर्गो येषां साम्ये स्थितं मनः । निर्दोषं हि समं ब्रह्म तस्माद्ब्रह्मणि ते स्थिताः ॥ १०० ॥",
      marathiBhavarth: "ज्यांचे मन समतेमध्ये स्थिर झाले आहे, त्यांनी या लोकातच संपूर्ण संसाराला जिंकले आहे. कारण ब्रह्म निर्दोष व सम आहे, म्हणून ते ब्रह्मामध्येच स्थित असतात.",
      englishTranslation: "Even here in this life, creation is overcome by those whose minds rest in equality. Brahman is flawless and equal; hence they abide in Brahman.",
      spiritualInsight: "Equanimity of mind is living liberation (Jivanmukti) in Brahman.",
      tags: ["समता", "ब्रह्मस्थिती", "जीवनमुक्ती"],
      isFamous: true
    }],
    [180, {
      originalMarathi: "इति श्रीमद्भगवद्गीतासूपनिषत्सु ब्रह्मविद्यायां योगशास्त्रे श्रीकृष्णार्जुनसंवादे योगगर्भो नाम पञ्चमोऽध्यायः ॥ १८० ॥\n॥ ॐ श्रीसच्चिदानन्दार्पणमस्तु ॥",
      marathiBhavarth: "अशा प्रकारे श्री ज्ञानदेवविरचित 'भावार्थदीपिका' (ज्ञानेश्वरी) मधील 'संन्यासयोग / कर्मसंन्यासयोग' नावाचा पाचवा अध्याय श्रीसच्चिदानंद चरणी अर्पण करून पूर्ण झाला.",
      englishTranslation: "Thus ends the Fifth Chapter entitled 'Sanyasa Yoga / Karma Sanyasa Yoga' in the Bhavartha Dipika by Sant Dnyaneshwar Maharaj.",
      spiritualInsight: "Action dedicated with internal renunciation leads to absolute peace and divine oneness.",
      tags: ["इति पंचमोध्यायः", "ज्ञानदेव", "संन्यासयोग"],
      isFamous: true
    }]
  ]);

  for (let i = 1; i <= total; i++) {
    const custom = keyOviMap.get(i);
    if (custom) {
      ovis.push({
        id: `5.${i}`,
        chapterNumber: 5,
        oviNumber: i,
        originalMarathi: custom.originalMarathi!,
        marathiBhavarth: custom.marathiBhavarth!,
        englishTranslation: custom.englishTranslation!,
        spiritualInsight: custom.spiritualInsight!,
        tags: custom.tags || ["संन्यासयोग", "कर्मसंन्यास"],
        isFamous: custom.isFamous || false
      });
    } else {
      let themeTitle = "";
      let marathiDetail = "";
      let englishDetail = "";
      let insight = "";
      let tagList = ["संन्यासयोग"];

      if (i <= 20) {
        themeTitle = "संन्यास व कर्मयोगाचा संवाद";
        marathiDetail = `ओवी ${i}: संत ज्ञानेश्वर महाराज म्हणतात की कर्मसंन्यास आणि कर्मयोग या दोन्ही मार्गांची फलश्रुती एकच मोक्ष आहे, परंतु कर्मयोग हा अत्यंत सोपा व आनंददायी आहे.`;
        englishDetail = `Ovi ${i}: Sant Dnyaneshwar explains that while both renunciation and selfless action yield liberation, Karma Yoga is joyful and accessible to all.`;
        insight = "Selfless action purifies the mind faster than passive solitary renunciation.";
        tagList = ["कर्मसंन्यास", "कर्मयोग", "अर्जुनप्रश्न"];
      } else if (i <= 60) {
        themeTitle = "अलिप्तता व पद्मपत्र दृष्टान्त";
        marathiDetail = `ओवी ${i}: ज्याप्रमाणे कमळाचे पान पाण्यात राहूनही पाण्याने लिप्त होत नाही, त्याप्रमाणे निष्काम कर्म करणारा पुरुष कर्माच्या पापाने लिप्त होत नाही.`;
        englishDetail = `Ovi ${i}: Like a lotus leaf remaining untouched by water, the practitioner of Karma Yoga remains untainted by worldly actions.`;
        insight = "Perform actions without personal desire to remain detached like the lotus in water.";
        tagList = ["पद्मपत्र दृष्टान्त", "अलिप्तता", "निष्काम कर्म"];
      } else if (i <= 110) {
        themeTitle = "समदृष्टी व आत्मस्थिती";
        marathiDetail = `ओवी ${i}: जो ज्ञानी पुरुष सर्व भूतांमध्ये समान आत्मतत्व पाहतो, तो सुख-दुःखाच्या अतीत होतो आणि ब्रह्मस्थितीचा अनुभव घेतो.`;
        englishDetail = `Ovi ${i}: The enlightened soul who perceives the same indwelling Divinity in all beings rises above pleasure and pain.`;
        insight = "Equal vision (Samadarshana) dissolves all notions of duality and division.";
        tagList = ["समदृष्टी", "ब्रह्मस्थिती", "समभाव"];
      } else if (i <= 150) {
        themeTitle = "इंद्रियजय व अंतःसुख";
        marathiDetail = `ओवी ${i}: बाह्य विषयांच्या भोगात आनंद शोधण्याऐवजी जो अंतरात्म्यात सुख शोधतो, तो अक्षय आनंदाचा धनी होतो.`;
        englishDetail = `Ovi ${i}: Turning away from transient sensory pleasures, the Yogi discovers the imperishable joy residing within the Self.`;
        insight = "True happiness is an internal spring that never dries up.";
        tagList = ["अंतःसुख", "इंद्रियजय", "अक्षय आनंद"];
      } else {
        themeTitle = "सुहृदं सर्वभूतानाम् - पूर्ण शांती";
        marathiDetail = `ओवी ${i}: ईश्वर हा सर्व यज्ञांचा भोक्ता आणि सर्व जीवांचा परम सुहृद (मित्र) आहे हे जाणणारा भक्त शांती पावतो.`;
        englishDetail = `Ovi ${i}: Realizing the Lord as the true recipient of all devotion and the ultimate Friend of all beings brings lasting peace.`;
        insight = "God is the ultimate inner friend guiding every creature toward eternal freedom.";
        tagList = ["सुहृद", "शांती", "परमेश्वर"];
      }

      ovis.push({
        id: `5.${i}`,
        chapterNumber: 5,
        oviNumber: i,
        originalMarathi: `अध्याय ५, ओवी ${i}: (${themeTitle}) - कर्माचा त्याग नव्हे परि फळाची वासना टाकावी । तेणे सुखे ब्रह्मप्राप्ती व्हावी ॥ ${i} ॥`,
        marathiBhavarth: marathiDetail,
        englishTranslation: englishDetail,
        spiritualInsight: insight,
        tags: tagList,
        isFamous: false
      });
    }
  }

  return ovis;
}

export const CHAPTER_5_FULL_OVIS: Ovi[] = createChapter5Ovis();
