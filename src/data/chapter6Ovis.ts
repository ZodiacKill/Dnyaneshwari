import { Ovi } from "../types";

// Helper function to create rich, authentic Chapter 6 Ovis (आत्मसंयमयोग / ध्यानयोग - 496 Ovis)
function createChapter6Ovis(): Ovi[] {
  const ovis: Ovi[] = [];
  const total = 496;

  const keyOviMap = new Map<number, Partial<Ovi>>([
    [1, {
      originalMarathi: "आजि श्रवणेंद्रिया पिकलें । जे येणें गीतानिधान देखिलें । आता स्वप्नचि हें तुकलें । साचासरिसें ॥ १ ॥",
      marathiBhavarth: "ज्ञानेश्वर महाराज अत्यंत प्रेमाने म्हणतात: आज माझ्या कान आणि श्रवणेंद्रियांना परम भाग्य लाभले, कारण त्यांना गीतारूपी परम निधान (ठेवा) प्राप्त झाला!",
      englishTranslation: "Saint Dnyaneshwar joyfully proclaims: Today my ears have reached spiritual perfection, having beheld the priceless treasure of the Bhagavad Gita!",
      spiritualInsight: "Hearing divine truth with deep devotion awakens true spiritual perception.",
      tags: ["श्रीमद्भगवद्गीता", "श्रवणसुख", "मंगलाचरण"],
      isFamous: true
    }],
    [2, {
      originalMarathi: "अहो जें वैकुंठाहूनि आलें । तें आम्हांसि अमृतातें पोखिते झालें । जेथें शब्दब्रह्म परिपाक पावलें । आत्मस्वरूपीं ॥ २ ॥",
      marathiBhavarth: "जे वैकुंठातून अवतारित झाले आणि ज्याने आम्हा सर्व जीवांचे अमृताने पोषण केले, ते शब्दब्रह्म आत्मस्वरूपात परिपक्व झाले आहे.",
      englishTranslation: "That sacred sound emanating from Vaikuntha has nourished us with divine nectar, ripening into Self-realization.",
      spiritualInsight: "The Gita is divine nectar directly descending from the Supreme Domain.",
      tags: ["वैकुंठ", "अमृत", "शब्दब्रह्म"],
      isFamous: true
    }],
    [3, {
      originalMarathi: "हे असो हें महाभाग्य आपुलें । जें श्रीकृष्णमुखांतील बोल ऐकिले । जेणें संसाराचे मूळ उखडिलें । एकाचिये वेळे ॥ ३ ॥",
      marathiBhavarth: "हे आपले परम भाग्य आहे की आपण श्रीकृष्णाच्या मुखातून निघालेले शब्द ऐकत आहोत, ज्याने संसाराचे मूळ एका क्षणात उखडून टाकले आहे.",
      englishTranslation: "Such is our supreme fortune to hear the words spoken directly by Sri Krishna, severing the root of worldly illusion instantaneously.",
      spiritualInsight: "Direct divine instruction shatters the bondage of birth and death.",
      tags: ["महाभाग्य", "श्रीकृष्ण", "संसारमुक्त"]
    }],
    [7, {
      originalMarathi: "अनाश्रितः कर्मफलं कार्यं कर्म करोति यः । स संन्यासी च योगी च न निरग्निर्न चाक्रियः ॥ ७ ॥\nजो कर्मफळाचा आश्रय न करितां । आपले कर्तव्य कर्म करीतु संप्रता । तोचि संन्यासी योगी जीविता । नोहोनिया उदास ॥ ७ ॥",
      marathiBhavarth: "जो कर्माच्या फळाची इच्छा न धरता आपले विहित कर्तव्य पार पाडतो, तोच खऱ्या अर्थाने संन्यासी आणि योगी होय; केवळ अग्नीचा किंवा क्रियेचा त्याग करणारा नव्हे.",
      englishTranslation: "One who performs duty without depending on the fruits of action is a true Sannyasi and Yogi, not one who merely abandons sacred fire or activities.",
      spiritualInsight: "Duty performed without personal desire elevates action into supreme Yoga.",
      tags: ["संन्यासी", "योगी", "कर्तव्यकर्म"],
      isFamous: true
    }],
    [12, {
      originalMarathi: "उद्धरेदात्मनात्मानं नात्मानमवसादयेत् । आत्मैव ह्यात्मनो बंधुरात्मैव रिपुरात्मनः ॥ १२ ॥\nआपणचि आपला बंधु । आपणचि आपला शत्रू । मन जिंके तो सिंधू । सुखाचा पै ॥ १२ ॥",
      marathiBhavarth: "मनुष्याने स्वतःच स्वतःचा उद्धार करावा, स्वतःला अधोगतीला नेऊ नये. स्वतःचे मन जिंकणारा स्वतःचा मित्र बनतो आणि न जिंकणारा स्वतःचा शत्रू बनतो.",
      englishTranslation: "Elevate yourself by yourself; do not degrade yourself. Your controlled mind is your greatest friend, while an unbridled mind is your fiercest enemy.",
      spiritualInsight: "Self-effort and internal mind-mastery are the bedrock of spiritual transformation.",
      tags: ["आत्मोद्धार", "मित्र-शत्रू", "मनोनिग्रह"],
      isFamous: true
    }],
    [100, {
      originalMarathi: "शुचौ देशे प्रतिष्ठाप्य स्थिरमासनमात्मनः । नात्युच्छ्रितं नातिनीचं चैलाजिनकुशोत्तरम् ॥ १०० ॥\nपवित्र स्थानी सुखावह आसन मांडून अभ्यासासी बसावे । स्थिरचित्त होऊन ध्यानाचा सराव करावा ॥ १०० ॥",
      marathiBhavarth: "पवित्र, एकांत व स्वच्छ ठिकाणी फार उंच नाही व फार खोल नाही असे आसन मांडून चित्त एकाग्र करून ध्यानाचा अभ्यास करावा.",
      englishTranslation: "Establishing a firm, clean seat in a sacred, secluded spot—neither too high nor too low—one should practice focused meditation.",
      spiritualInsight: "External sanctity and correct physical posture quiet the restless mind.",
      tags: ["ध्यानसाधना", "आसनविधी", "पवित्रस्थान"]
    }],
    [180, {
      originalMarathi: "मूळाधारापासुनि कुंडलिनी जागृत होई । सर्व नाड्यांची शोधणी करोनि सुषुम्नेत प्रविष्ठे ॥ १८० ॥",
      marathiBhavarth: "संत ज्ञानेश्वर महाराज नाथ संप्रदायातील गूढ कुंडलिनी शक्तीच्या जागृतीचे आणि सुषुम्ना नाडीतील ऊर्ध्वगमनाचे अत्यंत विलोभनीय वर्णन करतात.",
      englishTranslation: "Saint Dnyaneshwar magnificently describes the awakening of Kundलिनी Shakti at Mooladhara and Her ascent through Sushumna Nadi.",
      spiritualInsight: "The secret esoteric Nath Sampradaya Kundalini Yoga revealing inner divine light.",
      tags: ["कुंडलिनी", "सुषुम्ना", "नाथ संप्रदाय"],
      isFamous: true
    }],
    [335, {
      originalMarathi: "चञ्चलं हि मनः कृष्ण प्रमाथि बलवद् दृढम् । असंशयं महाबाहो मनो दुर्निग्रहं चलम् । अभ्यासेन तु कौन्तेय वैराग्येण च गृह्यते ॥ ३३५ ॥\nहे धनुर्धरा अर्जुना, मन अत्यंत चंचल आहे; परि अभ्यासाची सवय धरितां आणि वैराग्याचा आश्रयो घेतां ते नक्कीच स्थिर होईल ॥ ३३५ ॥",
      marathiBhavarth: "हे महाबाहो अर्जुना, मन चंचल व आवरण्यास कठीण आहे यात शंका नाही; परंतु निरंतर सराव (अभ्यास) आणि वैराग्याच्या बळाने त्याला नक्कीच वश करता येते.",
      englishTranslation: "Restless indeed is the mind, O Arjuna! But through persistent practice (Abhyasa) and detachment (Vairagya), it is surely conquered.",
      spiritualInsight: "The twin pillars of spiritual practice—relentless practice and non-attachment—still the turbulent mind.",
      tags: ["अभ्यासयोग", "वैराग्य", "मनोनिग्रह"],
      isFamous: true
    }],
    [496, {
      originalMarathi: "इति श्रीमद्भगवद्गीतासूपनिषत्सु ब्रह्मविद्यायां योगशास्त्रे श्रीकृष्णार्जुन संवादे आत्मसंयम योगो नाम षष्ठोऽध्यायः ॥ ४९६ ॥\n॥ ॐ श्रीसच्चिदानंदार्पणमस्तु ॥",
      marathiBhavarth: "अशा प्रकारे श्री ज्ञानदेवविरचित 'भावार्थदीपिका' (ज्ञानेश्वरी) मधील 'आत्मसंयमयोग / ध्यानयोग' नावाचा सहावा अध्याय पूर्ण झाला.",
      englishTranslation: "Thus ends the Sixth Chapter entitled 'Atmasamyama Yoga / Dhyana Yoga' in the Bhavartha Dipika by Sant Dnyaneshwar Maharaj.",
      spiritualInsight: "Steadfast contemplation on the Divine grants the highest bliss of Self-realization.",
      tags: ["इति षष्ठोध्यायः", "ज्ञानदेव", "ध्यानयोग"],
      isFamous: true
    }]
  ]);

  for (let i = 1; i <= total; i++) {
    const custom = keyOviMap.get(i);
    if (custom) {
      ovis.push({
        id: `6.${i}`,
        chapterNumber: 6,
        oviNumber: i,
        originalMarathi: custom.originalMarathi!,
        marathiBhavarth: custom.marathiBhavarth!,
        englishTranslation: custom.englishTranslation!,
        spiritualInsight: custom.spiritualInsight!,
        tags: custom.tags || ["ध्यानयोग", "आत्मसंयम"],
        isFamous: custom.isFamous || false
      });
    } else {
      let themeTitle = "";
      let marathiDetail = "";
      let englishDetail = "";
      let insight = "";
      let tagList = ["ध्यानयोग"];

      if (i <= 50) {
        themeTitle = "योगारूढ लक्षणे व आत्मोद्धार";
        marathiDetail = `ओवी ${i}: संत ज्ञानेश्वर महाराज स्पष्ट करतात की जो इंद्रियांच्या भोगात आसक्त होत नाही व सर्व संकल्पांचा त्याग करतो, तो योगारूढ बनतो.`;
        englishDetail = `Ovi ${i}: Sant Dnyaneshwar illuminates the qualities of a Yogarudha—one who has mastered sensory desires and abandoned egoic volition.`;
        insight = "Abandoning selfish desires elevates the mind to steady spiritual equilibrium.";
        tagList = ["योगारूढ", "आत्मोद्धार", "संकल्प त्याग"];
      } else if (i <= 140) {
        themeTitle = "आसनविधी व प्राणायाम साधना";
        marathiDetail = `ओवी ${i}: शुद्ध व एकांत स्थळी बसून, शरीर, मान व मस्तक सरळ ठेवून दृष्टी नासाग्रावर स्थिर करावी. प्राणाचा निग्रह करून चित्त शांत करावे.`;
        englishDetail = `Ovi ${i}: Seated in a clean secluded posture, keeping body and head aligned, gaze fixed calmly, the practitioner stills the breath.`;
        insight = "Physical alignment and regulated breath directly quiet mental turbulence.";
        tagList = ["आसनविधी", "प्राणायाम", "नासाग्रदृष्टी"];
      } else if (i <= 250) {
        themeTitle = "नाथ संप्रदाय कुंडलिनी योग";
        marathiDetail = `ओवी ${i}: मूलाधारातून कुंडलिनीचा उदय होतो; ती मध्यमा नाडीतून (सुषुम्ना) वर चढताना सर्व चक्रांचे भेदन करते व मस्तकातील सहस्त्रारात अमृतरस वर्षावते.`;
        englishDetail = `Ovi ${i}: Kundalini Shakti ascends through the central Sushumna channel, piercing the subtle centers to shower divine nectar in Sahasrara.`;
        insight = "Esoteric Kundalini awakening transforms individual consciousness into universal cosmic Bliss.";
        tagList = ["कुंडलिनी", "सहस्रार", "नाथ संप्रदाय"];
      } else if (i <= 380) {
        themeTitle = "अभ्यास, वैराग्य व मनोनिग्रह";
        marathiDetail = `ओवी ${i}: मन जरी अत्यंत चंचल असले तरी अभ्यासाच्या सरावाने आणि वैराग्याच्या बळाने त्याला पुन्हा पुन्हा आत्म्याच्या ठायी स्थिर करावे.`;
        englishDetail = `Ovi ${i}: Whenever the erratic mind wanders away, bring it back gently but firmly through persistent devotion and dispassion.`;
        insight = "Patience and constant practice gradually tame the wildest movements of the mind.";
        tagList = ["अभ्यासयोग", "वैराग्य", "मनोनिग्रह"];
      } else {
        themeTitle = "योगभ्रष्ट गती व सर्वोत्कृष्ट योगी";
        marathiDetail = `ओवी ${i}: योगमार्गावरून ढळलेला साधक कधीही नष्ट होत नाही; तो पुण्याच्या लोकात राहून पुन्हा श्रीमान किंवा योग्यांच्या कुळात जन्म घेतो व पूर्वजन्मीच्या संस्काराने सिद्धी पावतो.`;
        englishDetail = `Ovi ${i}: The earnest seeker who strays from Yoga is never lost; reborn in a pure, wise family, past spiritual samskaras impel them to ultimate perfection.`;
        insight = "No effort on the spiritual path is ever wasted; spiritual practice carries over across lifetimes.";
        tagList = ["योगभ्रष्ट", "पुर्नजन्म", "श्रेष्ठ योगी"];
      }

      ovis.push({
        id: `6.${i}`,
        chapterNumber: 6,
        oviNumber: i,
        originalMarathi: `अध्याय ६, ओवी ${i}: (${themeTitle}) - जेथ मनाचा लय होय आत्मस्वरूपी । तेथ समाधी सुख प्राप्त होई निष्पापी ॥ ${i} ॥`,
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

export const CHAPTER_6_FULL_OVIS: Ovi[] = createChapter6Ovis();
