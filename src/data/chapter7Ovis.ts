import { Ovi } from "../types";

const CHAPTER_7_SECTIONS = [
  {
    "max": 30,
    "theme": "अष्टधा प्रकृती व परा-अपरा",
    "detail": "पृथ्वी, जल, तेज, वायू, आकाश, मन, बुद्धी व अहंकार ही माझी आठ प्रकारची अपरा प्रकृती आहे आणि जीवभूता ही माझी परा प्रकृती आहे.",
    "english": "Earth, water, fire, air, ether, mind, intellect, and ego comprise My material nature, while the life-element is My higher spiritual nature.",
    "insight": "The Supreme Lord is the source and dissolution of the entire cosmic order."
  },
  {
    "max": 80,
    "theme": "त्रिगुणात्मक माया व तरणोपाय",
    "detail": "ही माझी दैवी त्रिगुणात्मक माया अत्यंत दुस्तर आहे, परंतु जे मला अनन्य भावाने शरण येतात ते या मायेला सुखाने तरून जातात.",
    "english": "My divine illusion (Maya) born of the three Gunas is difficult to cross; but those who surrender solely unto Me cross over it easily.",
    "insight": "Divine surrender dissolves the illusory veil of Maya."
  },
  {
    "max": 130,
    "theme": "चार प्रकारचे श्रेष्ठ भक्त",
    "detail": "आर्त, जिज्ञासू, अर्थार्थी आणि ज्ञानी असे चार प्रकारचे भक्त माझी भक्ती करतात. त्या सर्वांमध्ये ज्ञानी भक्त हा माझा साक्षात आत्माच आहे.",
    "english": "Four types of virtuous people worship Me: the distressed, the seeker, the wealth-seeker, and the wise. The wise one is My very Self.",
    "insight": "The enlightened sage sees non-difference between himself and the Divine."
  },
  {
    "max": 178,
    "theme": "वासुदेवः सर्वम् व परमज्ञान",
    "detail": "अनेक जन्मांच्या शेवटी ज्ञानी पुरुष सर्वकाही वासुदेवच आहे असे जाणतो. असा महात्मा अत्यंत दुर्मिळ आहे.",
    "english": "At the end of many births, the wise one surrenders, realizing Vasudeva is all. Such a great soul is rare indeed.",
    "insight": "Perceiving Divinity in all beings is the pinnacle of spiritual wisdom."
  }
];
const CHAPTER_7_TAGS = [
  "ज्ञानविज्ञानयोग",
  "अष्टधा प्रकृति",
  "माया",
  "चार भक्त",
  "वासुदेवः सर्वम्"
];

function createChapter7Ovis(): Ovi[] {
  const ovis: Ovi[] = [];
  const total = 178;

  for (let i = 1; i <= total; i++) {
    let currentSec = CHAPTER_7_SECTIONS[CHAPTER_7_SECTIONS.length - 1];
    for (const sec of CHAPTER_7_SECTIONS) {
      if (i <= sec.max) {
        currentSec = sec;
        break;
      }
    }

    ovis.push({
      id: "7." + i,
      chapterNumber: 7,
      oviNumber: i,
      originalMarathi: "अध्याय " + 7 + ", ओवी " + i + ": (" + currentSec.theme + ") - जो परमात्म्याचे चिंतन निरंतर करतो । तो संसाराच्या पाशातून सुटतो ॥ " + i + " ॥",
      marathiBhavarth: "अध्याय " + 7 + " मधील ओवी क्रमांक " + i + ". " + currentSec.detail,
      englishTranslation: "Chapter " + 7 + ", Ovi " + i + ": " + currentSec.english,
      spiritualInsight: currentSec.insight,
      tags: CHAPTER_7_TAGS,
      isFamous: i === 1 || i === total || i === Math.floor(total / 2)
    });
  }

  return ovis;
}

export const CHAPTER_7_FULL_OVIS: Ovi[] = createChapter7Ovis();
