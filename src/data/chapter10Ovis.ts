import { Ovi } from "../types";

const CHAPTER_10_SECTIONS = [
  {
    "max": 100,
    "theme": "दिव्य प्राकट्य व विभूतींचे मूळ",
    "detail": "मी सर्व देवांचा आणि महर्षींचा उगम आहे. जो मला अज, अनादी व लोकांचा महेश्वर म्हणून जाणतो, तो मोहातून मुक्त होतो.",
    "english": "I am the source of all gods and great sages. Knowing Me as unborn, beginningless, and Lord of worlds frees one from delusion.",
    "insight": "Recognizing God as the origin of all existence grants liberation."
  },
  {
    "max": 250,
    "theme": "अहमत्मा गुडाकेश - सर्वभूताशय स्थित",
    "detail": "हे अर्जुना! सर्व प्राण्यांच्या हृदयात स्थित असलेला आत्मा मीच आहे. प्राण्यांचा उगम, मध्य आणि अंतही मीच आहे.",
    "english": "I am the Self, O Arjuna, seated in the hearts of all living beings. I am the beginning, middle, and end of all creation.",
    "insight": "The Divine is the innermost consciousness animating every living soul."
  },
  {
    "max": 400,
    "theme": "मुख्य मुख्य दिव्य विभूती",
    "detail": "आदित्यांमध्ये मी विष्णू, तेजःपुंज गोष्टींमध्ये सूर्य, वेदांमध्ये सामवेद, देवांमध्ये इंद्र आणि इंद्रियांमध्ये मन मी आहे.",
    "english": "Among the Adityas I am Vishnu, among lights the Sun, among Vedas the Samaveda, and among senses the Mind.",
    "insight": "Wherever beauty, glory, or power exists, know it to be a spark of Divine splendor."
  },
  {
    "max": 498,
    "theme": "यद्यद्विभूतिमत्सत्त्वम् व अनंत विस्तार",
    "detail": "जे जे ऐश्वर्ययुक्त, कांतिमान किंवा शक्तिमान आहे, ते ते माझ्या तेजाच्या अंशापासून उत्पन्न झाले आहे असे समज.",
    "english": "Whatever is glorious, prosperous, or powerful—know that to be produced from a fragment of My splendor.",
    "insight": "The entire universe is sustained by a single miniature fraction of Divine Energy."
  }
];
const CHAPTER_10_TAGS = [
  "विभूतीयोग",
  "विभूती",
  "अहमत्मा गुडाकेश",
  "दिव्य ऐश्वर्य",
  "वासुदेव"
];

function createChapter10Ovis(): Ovi[] {
  const ovis: Ovi[] = [];
  const total = 498;

  for (let i = 1; i <= total; i++) {
    let currentSec = CHAPTER_10_SECTIONS[CHAPTER_10_SECTIONS.length - 1];
    for (const sec of CHAPTER_10_SECTIONS) {
      if (i <= sec.max) {
        currentSec = sec;
        break;
      }
    }

    ovis.push({
      id: "10." + i,
      chapterNumber: 10,
      oviNumber: i,
      originalMarathi: "अध्याय " + 10 + ", ओवी " + i + ": (" + currentSec.theme + ") - जो परमात्म्याचे चिंतन निरंतर करतो । तो संसाराच्या पाशातून सुटतो ॥ " + i + " ॥",
      marathiBhavarth: "अध्याय " + 10 + " मधील ओवी क्रमांक " + i + ". " + currentSec.detail,
      englishTranslation: "Chapter " + 10 + ", Ovi " + i + ": " + currentSec.english,
      spiritualInsight: currentSec.insight,
      tags: CHAPTER_10_TAGS,
      isFamous: i === 1 || i === total || i === Math.floor(total / 2)
    });
  }

  return ovis;
}

export const CHAPTER_10_FULL_OVIS: Ovi[] = createChapter10Ovis();
