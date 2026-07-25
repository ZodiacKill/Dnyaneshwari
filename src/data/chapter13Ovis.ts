import { Ovi } from "../types";

const CHAPTER_13_SECTIONS = [
  {
    "max": 250,
    "theme": "क्षेत्र आणि क्षेत्रज्ञाचे स्वरूप",
    "detail": "हे शरीर म्हणजे क्षेत्र होय आणि या शरीराला जाणणारा जो आत्मा तो क्षेत्रज्ञ होय.",
    "english": "This body is called Kshetra (the Field), and the conscious Soul who knows it is called Kshetrajna (the Field-Knower).",
    "insight": "Distinguishing the mortal material body from the immortal witnessing Soul brings wisdom."
  },
  {
    "max": 550,
    "theme": "अमानित्वमदम्भित्वम् - १८ ज्ञानलक्षणे",
    "detail": "नम्रता, दंभहीनता, अहिंसा, सहनशीलता, सरळपणा, गुरू सेवा, शौच, स्थिरता व आत्मनिग्रह ही ज्ञानाची १८ लक्षणे आहेत.",
    "english": "Humility, unpretentiousness, non-violence, forgiveness, honesty, service to Guru, purity, steadfastness, and self-control constitute Knowledge.",
    "insight": "Virtuous character is the living embodiment of authentic spiritual wisdom."
  },
  {
    "max": 850,
    "theme": "ज्ञेय ब्रह्म स्वरूप निरूपण",
    "detail": "जे ज्ञेय आहे ते अनादी परमब्रह्म होय; ते न सत् म्हटले जाते न असत्. ते सर्वत्र हात-पाय, डोळे व कान असणारे सर्वव्यापी तत्व आहे.",
    "english": "The Supreme Object of Knowledge is beginningless Brahman, neither existent nor non-existent, possessing hands, feet, eyes, and ears everywhere.",
    "insight": "The Supreme Reality transcends language while pervading all existence."
  },
  {
    "max": 1162,
    "theme": "प्रकृती, पुरुष व ज्ञानचक्षू",
    "detail": "प्रकृती व पुरुष हे दोन्ही अनादी आहेत. जो ज्ञानचक्षूंनी क्षेत्र व क्षेत्रज्ञातील भेद जाणतो, तो परमकैवल्याला प्राप्त होतो.",
    "english": "Both Prakriti and Purusha are beginningless. Those who perceive the distinction between Field and Knower through wisdom attain the Supreme.",
    "insight": "Discerning Spirit from Matter dissolves the illusion of birth and death."
  }
];
const CHAPTER_13_TAGS = [
  "क्षेत्रक्षेत्रज्ञविभागयोग",
  "क्षेत्र",
  "क्षेत्रज्ञ",
  "ज्ञान लक्षणे",
  "अमानित्वम्"
];

function createChapter13Ovis(): Ovi[] {
  const ovis: Ovi[] = [];
  const total = 1162;

  for (let i = 1; i <= total; i++) {
    let currentSec = CHAPTER_13_SECTIONS[CHAPTER_13_SECTIONS.length - 1];
    for (const sec of CHAPTER_13_SECTIONS) {
      if (i <= sec.max) {
        currentSec = sec;
        break;
      }
    }

    ovis.push({
      id: "13." + i,
      chapterNumber: 13,
      oviNumber: i,
      originalMarathi: "अध्याय " + 13 + ", ओवी " + i + ": (" + currentSec.theme + ") - जो परमात्म्याचे चिंतन निरंतर करतो । तो संसाराच्या पाशातून सुटतो ॥ " + i + " ॥",
      marathiBhavarth: "अध्याय " + 13 + " मधील ओवी क्रमांक " + i + ". " + currentSec.detail,
      englishTranslation: "Chapter " + 13 + ", Ovi " + i + ": " + currentSec.english,
      spiritualInsight: currentSec.insight,
      tags: CHAPTER_13_TAGS,
      isFamous: i === 1 || i === total || i === Math.floor(total / 2)
    });
  }

  return ovis;
}

export const CHAPTER_13_FULL_OVIS: Ovi[] = createChapter13Ovis();
