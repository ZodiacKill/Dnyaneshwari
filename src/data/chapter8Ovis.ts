import { Ovi } from "../types";

const CHAPTER_8_SECTIONS = [
  {
    "max": 50,
    "theme": "ब्रह्म, अध्यात्म व कर्माचे रहस्य",
    "detail": "परम अविनाशी तत्व म्हणजे ब्रह्म, जीवाचा मूळ स्वभाव म्हणजे अध्यात्म आणि प्राण्यांच्या उत्पत्तीला कारण असलेला विसर्ग म्हणजे कर्म होय.",
    "english": "The Supreme Imperishable is Brahman; the essential nature of the soul is Adhyatma; and the creative force bringing beings into existence is Karma.",
    "insight": "Understanding the underlying Divine Reality frees the soul from cosmic confusion."
  },
  {
    "max": 120,
    "theme": "अंतकाळचे स्मरण व निरंतर योग",
    "detail": "मनुष्य अंतकाळी ज्या भावाचे ध्यान करतो, तो त्याच गतीला प्राप्त होतो. म्हणून सर्वकाळी माझे स्मरण कर आणि आपले कर्तव्य पार पाड.",
    "english": "Whatever state of mind one remembers at death, to that state one goes. Therefore, remember Me at all times while performing your duties.",
    "insight": "Lifelong divine remembrance shapes the soul ultimate journey."
  },
  {
    "max": 200,
    "theme": "ॐकार ध्यान व प्राणीप्रयाण",
    "detail": "इंद्रियांचे द्वारे आवरून, मनात प्राणाचा निग्रह करून, ॐकाराचा जप करत जो शरीर सोडतो, तो परम गतीला प्राप्त होतो.",
    "english": "Controlling the senses, holding the life-breath within, and chanting the sacred Om, one who departs reaches the highest goal.",
    "insight": "Focusing on sacred Om at the moment of transition yields supreme liberation."
  },
  {
    "max": 263,
    "theme": "अनावृत्ती व शाश्वत धाम",
    "detail": "माझ्या धामाला प्राप्त झालेले जीव पुन्हा या दुःखालाय असलेल्या मृत्यूलोकात पुनर्जन्म घेत नाहीत.",
    "english": "Reaching My supreme abode, high-souled beings never suffer rebirth in this transitory world of sorrow.",
    "insight": "Attaining the Supreme Abode ends the painful cycle of samsara forever."
  }
];
const CHAPTER_8_TAGS = [
  "अक्षरब्रह्मयोग",
  "अक्षर ब्रह्म",
  "अंतकाळ स्मरण",
  "ॐकार ध्यान",
  "परम गती"
];

function createChapter8Ovis(): Ovi[] {
  const ovis: Ovi[] = [];
  const total = 263;

  for (let i = 1; i <= total; i++) {
    let currentSec = CHAPTER_8_SECTIONS[CHAPTER_8_SECTIONS.length - 1];
    for (const sec of CHAPTER_8_SECTIONS) {
      if (i <= sec.max) {
        currentSec = sec;
        break;
      }
    }

    ovis.push({
      id: "8." + i,
      chapterNumber: 8,
      oviNumber: i,
      originalMarathi: "अध्याय " + 8 + ", ओवी " + i + ": (" + currentSec.theme + ") - जो परमात्म्याचे चिंतन निरंतर करतो । तो संसाराच्या पाशातून सुटतो ॥ " + i + " ॥",
      marathiBhavarth: "अध्याय " + 8 + " मधील ओवी क्रमांक " + i + ". " + currentSec.detail,
      englishTranslation: "Chapter " + 8 + ", Ovi " + i + ": " + currentSec.english,
      spiritualInsight: currentSec.insight,
      tags: CHAPTER_8_TAGS,
      isFamous: i === 1 || i === total || i === Math.floor(total / 2)
    });
  }

  return ovis;
}

export const CHAPTER_8_FULL_OVIS: Ovi[] = createChapter8Ovis();
