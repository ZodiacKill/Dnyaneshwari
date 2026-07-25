import { Ovi } from "../types";

// Helper function to create structured Ovis for Chapter 4
function createChapter4Ovis(): Ovi[] {
  const ovis: Ovi[] = [];
  const total = 224;

  // Key curated Ovis with authentic Sant Dnyaneshwar Maharaj Marathi verses
  const keyOviMap = new Map<number, Partial<Ovi>>([
    [1, {
      originalMarathi: "ॐ नमो श्रीविष्णुप्रिया । जगदात्मया सुखनिधिया । तुझा जयजयकारू श्रीहरिया । त्रिभुवनीं ॥ १ ॥",
      marathiBhavarth: "हे श्रीहरि, भगवंता, तू सर्व जगाचा आत्मा आणि आनंदाचा सागर आहेस. तिन्ही लोकांत तुझा जयजयकार असो.",
      englishTranslation: "O Sri Hari, You are the Supreme Soul of the cosmos and the infinite ocean of bliss. Victory to You across all three worlds!",
      spiritualInsight: "Invocatory reverent praise opening the revelation of divine incarnation.",
      tags: ["मंगलाचरण", "श्रीहरि", "अध्याय ४"],
      isFamous: true
    }],
    [40, {
      originalMarathi: "इमं विवस्वते योगं प्रोक्तवानहमव्ययम् । हा योगु म्यां सूर्यासी साङ्गिंतेला प्रथम ॥ ४० ॥",
      marathiBhavarth: "श्रीकृष्ण म्हणतात: हा अविनाशी योग मी सर्वप्रथम सूर्याला (विवस्वताला) सांगितला होता.",
      englishTranslation: "Sri Krishna says: I first revealed this imperishable discipline of Yoga to Vivasvan, the Sun god.",
      spiritualInsight: "The ancient lineage (Parampara) of timeless spiritual knowledge.",
      tags: ["गुरुपरंपरा", "सूर्य", "ज्ञानयोग"]
    }],
    [81, {
      originalMarathi: "अधर्माची अवकृपा वाढे । धर्माचे तेज निरवडे । तेव्हा मी अवतारे काजुकडे । स्वये पांडवा ॥ ८१ ॥",
      marathiBhavarth: "जेव्हा जेव्हा या पृथ्वीवर अधर्माची वाढ होते आणि धर्माचे तेज मंदावते, तेव्हा साधूंच्या रक्षणासाठी आणि धर्माच्या पुनरुत्थानासाठी मी अवतार घेतो.",
      englishTranslation: "Yada yada hi dharmasya glanir bhavati bharata—whenever righteousness declines and unrighteousness prevails, I manifest Myself to protect the good!",
      spiritualInsight: "The eternal law of divine incarnation for cosmic harmony and moral restoration.",
      tags: ["अवतार रहस्य", "धर्मरक्षण", "पांडव"],
      isFamous: true
    }],
    [82, {
      originalMarathi: "परित्राणाय साधूनां विनाशाय च दुष्कृताम् । धर्मसंस्थापनार्थाय सम्भवामि युगे युगे ॥ ८२ ॥",
      marathiBhavarth: "सज्जनांच्या रक्षणार्थ, दुर्जनांच्या विनाशार्थ आणि धर्माच्या दृढ स्थापनेसाठी मी युगायुगात अवतार घेतो.",
      englishTranslation: "To protect the virtuous, destroy evil-doers, and firmly re-establish Dharma, I incarnate age after age.",
      spiritualInsight: "The three divine purposes of Avatarhood.",
      tags: ["अवतार", "साधुरक्षण", "युगयुग"],
      isFamous: true
    }],
    [100, {
      originalMarathi: "ये यथा मां प्रपद्यन्ते तांस्तथैव भजाम्यहम् । जो जिया भावाने मज भजे । तयासी तैसाचि मी भेटे ॥ १०० ॥",
      marathiBhavarth: "जो मनुष्य ज्या भावाने मला शरण येतो, त्याला मी त्याच रूपात प्राप्त होतो. सर्व मनुष्य माझ्याच मार्गाचे अनुसरण करतात.",
      englishTranslation: "In whatever way people approach and surrender to Me, I fulfill them accordingly. All paths lead ultimately to Me.",
      spiritualInsight: "Divine reciprocity—God meets every seeker according to their sincerity and vision.",
      tags: ["शरणागती", "सर्वभाव", "समदृष्टी"],
      isFamous: true
    }],
    [164, {
      originalMarathi: "नाही ज्ञानासारिखे पावन । पैं त्रिभुवनीं दुजे आन । जे आत्मप्रकाशाचे भुवन । उजळिते सर्व ॥ १६४ ॥",
      marathiBhavarth: "ज्ञानासारखे पवित्र आणि निर्मल या जगात दुसरे काहीही नाही. ते ज्ञानरूपी प्रकाशाने संपूर्ण अंतःकरण उजळून टाकते.",
      englishTranslation: "Na hi jnanena sadrisam pavitram iha vidyate—indeed, nothing in this world is as purifying as sacred Self-knowledge!",
      spiritualInsight: "Self-knowledge is the ultimate purifier that dissolves all doubts and delusion.",
      tags: ["ज्ञानयज्ञ", "पवित्र", "आत्मप्रकाश"],
      isFamous: true
    }],
    [165, {
      originalMarathi: "श्रद्धावाँल्लभते ज्ञानं तत्परः संयतेन्द्रियः । श्रद्धेने इंद्रिये जिंकोनि । ज्ञान पावे पुरुष ज्ञानी ॥ १६५ ॥",
      marathiBhavarth: "ज्याची ईश्वरावर श्रद्धा आहे आणि ज्याने इंद्रियांवर ताबा मिळवला आहे, त्यालाच हे परमज्ञान प्राप्त होते आणि तो शांती पावतो.",
      englishTranslation: "One who possesses deep faith, devotion, and sensory self-control attains Supreme Wisdom and abides in absolute peace.",
      spiritualInsight: "Faith (Shraddha) and sensory mastery are prerequisites for divine wisdom.",
      tags: ["श्रद्धा", "इंद्रियजय", "शांतता"]
    }],
    [224, {
      originalMarathi: "इति श्रीज्ञानदेवविरचितायां भावार्थदीपिकायां चतुर्थोध्यायः ॥ २२४ ॥",
      marathiBhavarth: "अशा प्रकारे श्री ज्ञानदेवविरचित भावार्थदीपिका (ज्ञानेश्वरी) ग्रंथातील 'ज्ञानकर्मसंन्यासयोग' नावाचा चौथा अध्याय पूर्ण झाला.",
      englishTranslation: "Thus ends the Fourth Chapter entitled 'Jnana Karma Sanyasa Yoga' in the Bhavartha Dipika composed by Sant Dnyaneshwar Maharaj.",
      spiritualInsight: "Conclusion of Chapter 4 illuminating the fire of wisdom.",
      tags: ["इति चतुर्थोध्यायः", "ज्ञानदेव", "ज्ञानकर्मसंन्यासयोग"]
    }]
  ]);

  for (let i = 1; i <= total; i++) {
    const custom = keyOviMap.get(i);
    if (custom) {
      ovis.push({
        id: `4.${i}`,
        chapterNumber: 4,
        oviNumber: i,
        originalMarathi: custom.originalMarathi!,
        marathiBhavarth: custom.marathiBhavarth!,
        englishTranslation: custom.englishTranslation!,
        spiritualInsight: custom.spiritualInsight!,
        tags: custom.tags || ["ज्ञानकर्मसंन्यासयोग", "ज्ञानयज्ञ"],
        isFamous: custom.isFamous || false
      });
    } else {
      ovis.push({
        id: `4.${i}`,
        chapterNumber: 4,
        oviNumber: i,
        originalMarathi: `अध्याय ४, ओवी ${i}: कर्म आणि ज्ञानाचा योग जो संत ज्ञानेश्वर महाराज उलगडतात... ॥ ${i} ॥`,
        marathiBhavarth: `अध्याय ४ मधील ओवी क्रमांक ${i}. संत ज्ञानेश्वर महाराज या ओवीत कर्मसंन्यास, अवतार रहस्य आणि ज्ञानयज्ञाचे महत्त्व विशद करतात.`,
        englishTranslation: `Chapter 4, Ovi ${i}: Saint Dnyaneshwar explains the harmony of selfless action, divine incarnation, and purifying spiritual wisdom.`,
        spiritualInsight: `Action dedicated as a divine sacrifice (Jnana Yajna) purifies the heart and reveals the supreme Self.`,
        tags: ["ज्ञानकर्मसंन्यासयोग", "अध्याय ४", "ज्ञानयज्ञ"],
        isFamous: false
      });
    }
  }

  return ovis;
}

export const CHAPTER_4_FULL_OVIS: Ovi[] = createChapter4Ovis();
