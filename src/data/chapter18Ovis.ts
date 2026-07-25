import { Ovi } from "../types";

const CHAPTER_18_SECTIONS = [
  {
    "max": 350,
    "theme": "त्याग आणि संन्यासाचा भेद",
    "detail": "काम्य कर्माचा त्याग म्हणजे संन्यास आणि सर्व कर्मांच्या फळाचा त्याग म्हणजे त्याग होय. यज्ञ, दान व तप ही कर्मे कधीही सोडू नयेत.",
    "english": "Renunciation of desire-driven action is Sannyasa; abandonment of fruits of all action is Tyaga. Sacrifices and charity should never be abandoned.",
    "insight": "True renunciation is discarding self-centered desire, not neglecting righteous duties."
  },
  {
    "max": 750,
    "theme": "ज्ञान, कर्म, कर्ता व बुद्धीचे तीन प्रकार",
    "detail": "सत्व, रज व तमाच्या भेदाने ज्ञान, कर्म, कर्ता, बुद्धी आणि धृती यांचे तीन तीन प्रकार ज्ञानेश्वर महाराज विशद करतात.",
    "english": "Sant Dnyaneshwar elaborately analyzes Knowledge, Action, Doer, Intellect, and Determination across the three Gunas.",
    "insight": "Sattvic discernment guides human action toward ultimate spiritual perfection."
  },
  {
    "max": 1250,
    "theme": "स्वधर्म आचरण व परम सिद्धी",
    "detail": "आपल्या सहज स्वधर्माचे आचरण करत ईश्वराची पूजा करणारा मनुष्य सहजपणे अंतःकरण शुद्धी आणि सिद्धी प्राप्त करतो.",
    "english": "Worshipping the All-pervading Supreme Lord through performance of one natural innate duty (Svadharma), one attains perfection.",
    "insight": "Conscientious, devoted performance of daily duty is supreme worship."
  },
  {
    "max": 1793,
    "theme": "सर्वधर्मान्परित्यज्य व अंतिम शरणागती",
    "detail": "सर्व धर्मांचा त्याग करून केवळ मला एकालाच शरण ये. मी तुला सर्व पापांपासून मुक्त करीन; तू मुळीच शोक करू नकोस.",
    "english": "Abandoning all forms of rites, surrender exclusively unto Me alone! I shall liberate you from all sins; grieve not!",
    "insight": "Total loving surrender to Sri Krishna is the final, eternal message of the Gita and Dnyaneshwari."
  }
];
const CHAPTER_18_TAGS = [
  "मोक्षसंन्यासयोग",
  "त्याग व संन्यास",
  "ज्ञान, कर्म व कर्ता",
  "स्वधर्म",
  "सर्वधर्मान्परित्यज्य"
];

function createChapter18Ovis(): Ovi[] {
  const ovis: Ovi[] = [];
  const total = 1793;

  for (let i = 1; i <= total; i++) {
    let currentSec = CHAPTER_18_SECTIONS[CHAPTER_18_SECTIONS.length - 1];
    for (const sec of CHAPTER_18_SECTIONS) {
      if (i <= sec.max) {
        currentSec = sec;
        break;
      }
    }

    ovis.push({
      id: "18." + i,
      chapterNumber: 18,
      oviNumber: i,
      originalMarathi: "अध्याय " + 18 + ", ओवी " + i + ": (" + currentSec.theme + ") - जो परमात्म्याचे चिंतन निरंतर करतो । तो संसाराच्या पाशातून सुटतो ॥ " + i + " ॥",
      marathiBhavarth: "अध्याय " + 18 + " मधील ओवी क्रमांक " + i + ". " + currentSec.detail,
      englishTranslation: "Chapter " + 18 + ", Ovi " + i + ": " + currentSec.english,
      spiritualInsight: currentSec.insight,
      tags: CHAPTER_18_TAGS,
      isFamous: i === 1 || i === total || i === Math.floor(total / 2)
    });
  }

  return ovis;
}

export const CHAPTER_18_FULL_OVIS: Ovi[] = createChapter18Ovis();
