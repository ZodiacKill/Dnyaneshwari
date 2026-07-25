import { Ovi } from "../types";

const CHAPTER_16_SECTIONS = [
  {
    "max": 120,
    "theme": "२६ दैवी गुणांचे निरूपण",
    "detail": "अभय, सत्त्वसंशुद्धी, ज्ञानयोगस्थिती, दान, दम, यज्ञ, स्वाध्याय, तप आणि आर्जव हे दैवी संपत्तीचे सद्गुण मोक्षाला कारणीभूत ठरतात.",
    "english": "Fearlessness, purity of heart, steadfastness in knowledge, charity, self-restraint, austerity, and honesty lead to liberation.",
    "insight": "Cultivating divine virtues opens the inner doorway to spiritual freedom."
  },
  {
    "max": 300,
    "theme": "आसुरी प्रवृत्ती व तिचे दुष्परिणाम",
    "detail": "दंभ, दर्प, अभिमान, क्रोध, पारुष्य आणि अज्ञान ही आसुरी संपत्तीची लक्षणे जीवाला बंधनात टाकतात.",
    "english": "Ostentation, arrogance, self-conceit, anger, harshness, and ignorance characterize the demonic nature leading to bondage.",
    "insight": "Egoistic vices trap the soul in darkness and repeated delusion."
  },
  {
    "max": 400,
    "theme": "काम, क्रोध, लोभ - त्रिविध नरकद्वार",
    "detail": "काम, क्रोध आणि लोभ हे आत्म्याचा नाश करणारे नरकाचे तीन मुख्य दरवाजे आहेत; म्हणून या तिन्हींचा त्याग करावा.",
    "english": "Desire, Anger, and Greed—these three constitute the triple gateways to ruin and self-destruction. Abandon them completely!",
    "insight": "Mastering desire, anger, and greed safeguards the soul from spiritual downfall."
  },
  {
    "max": 472,
    "theme": "शास्त्र प्रमाण व धर्म आचरण",
    "detail": "म्हणून काय करावे आणि काय करू नये या कर्तव्याच्या निर्णयात शास्त्राचे प्रमाण मानावे आणि धर्मानुसार कर्म करावे.",
    "english": "Therefore, let sacred scriptures be your authority in determining what ought and ought not to be done.",
    "insight": "Aligning human action with sacred wisdom ensures steady spiritual progress."
  }
];
const CHAPTER_16_TAGS = [
  "दैवासुरसंपद्विभागयोग",
  "दैवी संपत्ती",
  "आसुरी संपत्ती",
  "त्रिविध नरकद्वार",
  "शास्त्र प्रमाण"
];

function createChapter16Ovis(): Ovi[] {
  const ovis: Ovi[] = [];
  const total = 472;

  for (let i = 1; i <= total; i++) {
    let currentSec = CHAPTER_16_SECTIONS[CHAPTER_16_SECTIONS.length - 1];
    for (const sec of CHAPTER_16_SECTIONS) {
      if (i <= sec.max) {
        currentSec = sec;
        break;
      }
    }

    ovis.push({
      id: "16." + i,
      chapterNumber: 16,
      oviNumber: i,
      originalMarathi: "अध्याय " + 16 + ", ओवी " + i + ": (" + currentSec.theme + ") - जो परमात्म्याचे चिंतन निरंतर करतो । तो संसाराच्या पाशातून सुटतो ॥ " + i + " ॥",
      marathiBhavarth: "अध्याय " + 16 + " मधील ओवी क्रमांक " + i + ". " + currentSec.detail,
      englishTranslation: "Chapter " + 16 + ", Ovi " + i + ": " + currentSec.english,
      spiritualInsight: currentSec.insight,
      tags: CHAPTER_16_TAGS,
      isFamous: i === 1 || i === total || i === Math.floor(total / 2)
    });
  }

  return ovis;
}

export const CHAPTER_16_FULL_OVIS: Ovi[] = createChapter16Ovis();
