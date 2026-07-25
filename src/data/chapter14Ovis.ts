import { Ovi } from "../types";

const CHAPTER_14_SECTIONS = [
  {
    "max": 100,
    "theme": "तीन गुणांची बंधकता व स्वरूप",
    "detail": "सत्व, रज आणि तम हे प्रकृतीपासून उत्पन्न झालेले तीन गुण या अविनाशी आत्म्याला शरीरामध्ये बांधून ठेवतात.",
    "english": "Sattva, Rajas, and Tamas—these three qualities born of Nature—bind the immortal embodied soul within the body.",
    "insight": "The three Gunas create the varied textures of human personality and worldly experience."
  },
  {
    "max": 220,
    "theme": "सत्व, रज, तमाचे लक्षण व फळ",
    "detail": "सत्व गुण सुखात आणि ज्ञानात जोडतो; रजोगुण कर्माच्या तृष्णेत व आसक्तीत जोडतो; तर तमोगुण आळस व प्रमादात बांधतो.",
    "english": "Sattva attaches one to joy and wisdom; Rajas to passionate action and desire; Tamas to ignorance, sloth, and delusion.",
    "insight": "Cultivating Sattva elevates consciousness toward spiritual clarity."
  },
  {
    "max": 320,
    "theme": "गुणातीत पुरुषाची लक्षणे",
    "detail": "जो गुणांच्या कार्याने विचलित होत नाही, जो प्रकाश, प्रवृत्ती व मोहात समबुद्धी ठेवून साक्षीरुप राहतो, तो गुणातीत म्हटला जातो.",
    "english": "He who is unaffected by the workings of Gunas, remaining an unshakeable witness in light, activity, or delusion, is named Trigunatita.",
    "insight": "Transcending the three Gunas reveals absolute witness consciousness."
  },
  {
    "max": 405,
    "theme": "ब्रह्मप्राप्ती व अविनाशी योग",
    "detail": "अव्यभिचारी भक्तीने जो माझी सेवा करतो, तो या तीन गुणांना ओलांडून ब्रह्मभावाला प्राप्त होण्यास योग्य बनतो.",
    "english": "One who serves Me with unswerving devotional love transcends these three Gunas and becomes fit for realization of Brahman.",
    "insight": "Undivided devotion to the Lord easily lifts the soul above all material qualities."
  }
];
const CHAPTER_14_TAGS = [
  "गुणत्रयविभागयोग",
  "सत्वगुण",
  "रजोगुण",
  "तमोगुण",
  "गुणातीत"
];

function createChapter14Ovis(): Ovi[] {
  const ovis: Ovi[] = [];
  const total = 405;

  for (let i = 1; i <= total; i++) {
    let currentSec = CHAPTER_14_SECTIONS[CHAPTER_14_SECTIONS.length - 1];
    for (const sec of CHAPTER_14_SECTIONS) {
      if (i <= sec.max) {
        currentSec = sec;
        break;
      }
    }

    ovis.push({
      id: "14." + i,
      chapterNumber: 14,
      oviNumber: i,
      originalMarathi: "अध्याय " + 14 + ", ओवी " + i + ": (" + currentSec.theme + ") - जो परमात्म्याचे चिंतन निरंतर करतो । तो संसाराच्या पाशातून सुटतो ॥ " + i + " ॥",
      marathiBhavarth: "अध्याय " + 14 + " मधील ओवी क्रमांक " + i + ". " + currentSec.detail,
      englishTranslation: "Chapter " + 14 + ", Ovi " + i + ": " + currentSec.english,
      spiritualInsight: currentSec.insight,
      tags: CHAPTER_14_TAGS,
      isFamous: i === 1 || i === total || i === Math.floor(total / 2)
    });
  }

  return ovis;
}

export const CHAPTER_14_FULL_OVIS: Ovi[] = createChapter14Ovis();
