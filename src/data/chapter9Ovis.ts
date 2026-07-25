import { Ovi } from "../types";

const CHAPTER_9_SECTIONS = [
  {
    "max": 100,
    "theme": "राजविद्या व परम गुह्य ज्ञान",
    "detail": "हे ज्ञान सर्व विद्यांचा राजा, सर्व गुह्यांचा राजा, परम पवित्र, प्रत्यक्ष अनुभवास येणारे आणि अत्यंत सुलभ आहे.",
    "english": "This knowledge is the King of Sciences, the Royal Secret, supreme purifier, directly perceivable, and joyful to practice.",
    "insight": "Royal wisdom shines bright when experienced directly through divine love."
  },
  {
    "max": 250,
    "theme": "जगदुत्पत्ती व अनन्य शरणता",
    "detail": "माझ्या अध्यक्षतेखाली प्रकृती या चराचर जगताची निर्मिती करते. मूढ लोक माझ्या या परम भावाला न ओळखता मला तुच्छ मानतात.",
    "english": "Under My governance, Nature produces all moving and unmoving beings. Deluded souls disrespect My supreme cosmic form.",
    "insight": "The Supreme resides as the hidden inner orchestrator of all creation."
  },
  {
    "max": 400,
    "theme": "अनन्याश्चिन्तयन्तो मां व योगक्षेम",
    "detail": "जे अनन्य भक्त माझे निरंतर चिंतन करतात, त्यांचा योगक्षेम (रक्षण व पोषण) मी स्वतः वहन करतो.",
    "english": "To those who always worship Me with undivided devotion, I personally secure what they lack and preserve what they have.",
    "insight": "Total trust in the Almighty invokes full divine guardianship."
  },
  {
    "max": 535,
    "theme": "पत्रं पुष्पं फलं तोयं व परम भक्ती",
    "detail": "जो मला प्रेमाने पत्र, पुष्प, फल किंवा पाणी अर्पण करतो, ते भक्तीने दिलेले मी आनंदाने स्वीकारतो. मन माझ्याठायी अर्पण कर.",
    "english": "Whoever offers Me with devotion a leaf, a flower, a fruit, or water—that loving gift I accept. Engage your mind in Me.",
    "insight": "Pure love, not extravagant wealth, reaches the heart of the Lord."
  }
];
const CHAPTER_9_TAGS = [
  "राजविद्याराजगुह्ययोग",
  "राजविद्या",
  "योगक्षेम",
  "पत्रं पुष्पं फलं तोयं",
  "अनन्य भक्ती"
];

function createChapter9Ovis(): Ovi[] {
  const ovis: Ovi[] = [];
  const total = 535;

  for (let i = 1; i <= total; i++) {
    let currentSec = CHAPTER_9_SECTIONS[CHAPTER_9_SECTIONS.length - 1];
    for (const sec of CHAPTER_9_SECTIONS) {
      if (i <= sec.max) {
        currentSec = sec;
        break;
      }
    }

    ovis.push({
      id: "9." + i,
      chapterNumber: 9,
      oviNumber: i,
      originalMarathi: "अध्याय " + 9 + ", ओवी " + i + ": (" + currentSec.theme + ") - जो परमात्म्याचे चिंतन निरंतर करतो । तो संसाराच्या पाशातून सुटतो ॥ " + i + " ॥",
      marathiBhavarth: "अध्याय " + 9 + " मधील ओवी क्रमांक " + i + ". " + currentSec.detail,
      englishTranslation: "Chapter " + 9 + ", Ovi " + i + ": " + currentSec.english,
      spiritualInsight: currentSec.insight,
      tags: CHAPTER_9_TAGS,
      isFamous: i === 1 || i === total || i === Math.floor(total / 2)
    });
  }

  return ovis;
}

export const CHAPTER_9_FULL_OVIS: Ovi[] = createChapter9Ovis();
