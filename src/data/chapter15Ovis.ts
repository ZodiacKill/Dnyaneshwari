import { Ovi } from "../types";

const CHAPTER_15_SECTIONS = [
  {
    "max": 150,
    "theme": "ऊर्ध्वमूलं अधःशाखम् - संसार वृक्ष",
    "detail": "हा संसार म्हणजे वर मूळ असलेला आणि खाली शाखा असलेला अविनाशी अश्वत्थ वृक्ष होय. याचे वैराग्यरुपी शस्त्रानी छेद करावा.",
    "english": "This world is described as an eternal Ashvattha tree with roots above and branches below. Cut it down with the firm axe of detachment!",
    "insight": "Severing worldly attachment with dispassion reveals the unshakeable Supreme Root."
  },
  {
    "max": 300,
    "theme": "ममैवांशो जीवलोके व आत्मप्रकाश",
    "detail": "या जीवलोकात माझाच सनातन अंश जीव बनून राहिला आहे. तो मन आणि पाच इंद्रियांना आकर्षित करतो.",
    "english": "An eternal fragment of My own Divine Self becomes the individual soul in the world, drawing unto itself the mind and senses.",
    "insight": "Every soul is an eternal spark of the divine Infinite."
  },
  {
    "max": 450,
    "theme": "क्षर, अक्षर आणि पुरुषोत्तम",
    "detail": "जगात क्षर (विनाशी) आणि अक्षर (अविनाशी) असे दोन पुरुष आहेत; परंतु या दोघांच्या पलीकडे जो परमात्मा आहे त्याला पुरुषोत्तम म्हणतात.",
    "english": "There are two beings in the world—the Perishable (Kshara) and Imperishable (Akshara). Beyond both is the Supreme Being named Purushottama.",
    "insight": "Purushottama is the Transcendent Absolute sustaining all creation."
  },
  {
    "max": 582,
    "theme": "इति गुह्यतमं शास्त्रम् व कृतकृत्यता",
    "detail": "हे अर्जुना! हे अत्यंत गुह्य शास्त्र म्यां तुला सागितले. हे जाणणारा मनुष्य बुद्धीमान व कृतकृत्य होतो.",
    "english": "Thus, O blameless Arjuna, this most secret teaching has been revealed. Understanding this makes one truly wise and fulfilled.",
    "insight": "Realizing Purushottama is the ultimate culmination of human life."
  }
];
const CHAPTER_15_TAGS = [
  "पुरुषोत्तमयोग",
  "अश्वत्थ वृक्ष",
  "क्षर व अक्षर",
  "पुरुषोत्तम",
  "गुह्यतम शास्त्र"
];

function createChapter15Ovis(): Ovi[] {
  const ovis: Ovi[] = [];
  const total = 582;

  for (let i = 1; i <= total; i++) {
    let currentSec = CHAPTER_15_SECTIONS[CHAPTER_15_SECTIONS.length - 1];
    for (const sec of CHAPTER_15_SECTIONS) {
      if (i <= sec.max) {
        currentSec = sec;
        break;
      }
    }

    ovis.push({
      id: "15." + i,
      chapterNumber: 15,
      oviNumber: i,
      originalMarathi: "अध्याय " + 15 + ", ओवी " + i + ": (" + currentSec.theme + ") - जो परमात्म्याचे चिंतन निरंतर करतो । तो संसाराच्या पाशातून सुटतो ॥ " + i + " ॥",
      marathiBhavarth: "अध्याय " + 15 + " मधील ओवी क्रमांक " + i + ". " + currentSec.detail,
      englishTranslation: "Chapter " + 15 + ", Ovi " + i + ": " + currentSec.english,
      spiritualInsight: currentSec.insight,
      tags: CHAPTER_15_TAGS,
      isFamous: i === 1 || i === total || i === Math.floor(total / 2)
    });
  }

  return ovis;
}

export const CHAPTER_15_FULL_OVIS: Ovi[] = createChapter15Ovis();
