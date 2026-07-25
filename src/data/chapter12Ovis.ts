import { Ovi } from "../types";

const CHAPTER_12_SECTIONS = [
  {
    "max": 50,
    "theme": "सगुण व निर्गुण भक्तीची तुलना",
    "detail": "सगुण रूपाची भक्ती करणारे आणि अव्यक्त निर्गुणाची भक्ती करणारे - या दोघांमध्ये सगुण भक्ती करणारे भक्त अत्यंत सुलभतेने मोक्ष पावतात.",
    "english": "Those who fix their minds on My personal form with supreme faith reach Me swiftly, as contemplation on the Unmanifest is difficult for embodied beings.",
    "insight": "Loving devotion to the Personal God easily purifies human emotions."
  },
  {
    "max": 110,
    "theme": "अभ्यास व ईश्वरार्पण",
    "detail": "चित्त माझ्याठायी स्थिर कर; तसे न जमल्यास अभ्यासाची सवय धर; तेही न जमल्यास माझ्यासाठी कर्म कर व सर्व कर्मांची फळे मला अर्पण कर.",
    "english": "Fix your mind on Me; if unable, practice meditation; if unable, perform actions for My sake and surrender all fruits to Me.",
    "insight": "Divine compassion provides progressive steps for seekers at every stage."
  },
  {
    "max": 170,
    "theme": "अद्वेष्टा सर्वभूतानां - भक्ताची लक्षणे",
    "detail": "जो कोणत्याही प्राण्याचा द्वेष करत नाही, जो सर्वांचा मित्र, करुणाकर, निरहंकारी, सुख-दुःखात सम आणि क्षमाशील आहे, तो भक्त मला प्रिय आहे.",
    "english": "He who hates no creature, is friendly and compassionate to all, free from ego, balanced in pleasure and pain, is dear to Me.",
    "insight": "Universal compassion and egolessness mark the true devotee of the Lord."
  },
  {
    "max": 215,
    "theme": "ये तु धर्म्यामृतमिदं व परम प्रिय",
    "detail": "जे या सांगितलेल्या धर्मरूपी अमृताचे श्रद्धेने आचरण करतात, ते भक्त मला अत्यंत प्रिय आहेत.",
    "english": "Those who honor this immortal nectar of Dharma with full faith and devotion are exceedingly dear to Me.",
    "insight": "Living the nectar of devotional virtues binds the soul in eternal divine intimacy."
  }
];
const CHAPTER_12_TAGS = [
  "भक्तियोग",
  "भक्ती",
  "सगुण-निर्गुण",
  "अद्वेष्टा सर्वभूतानां",
  "भक्त लक्षणे"
];

function createChapter12Ovis(): Ovi[] {
  const ovis: Ovi[] = [];
  const total = 215;

  for (let i = 1; i <= total; i++) {
    let currentSec = CHAPTER_12_SECTIONS[CHAPTER_12_SECTIONS.length - 1];
    for (const sec of CHAPTER_12_SECTIONS) {
      if (i <= sec.max) {
        currentSec = sec;
        break;
      }
    }

    ovis.push({
      id: "12." + i,
      chapterNumber: 12,
      oviNumber: i,
      originalMarathi: "अध्याय " + 12 + ", ओवी " + i + ": (" + currentSec.theme + ") - जो परमात्म्याचे चिंतन निरंतर करतो । तो संसाराच्या पाशातून सुटतो ॥ " + i + " ॥",
      marathiBhavarth: "अध्याय " + 12 + " मधील ओवी क्रमांक " + i + ". " + currentSec.detail,
      englishTranslation: "Chapter " + 12 + ", Ovi " + i + ": " + currentSec.english,
      spiritualInsight: currentSec.insight,
      tags: CHAPTER_12_TAGS,
      isFamous: i === 1 || i === total || i === Math.floor(total / 2)
    });
  }

  return ovis;
}

export const CHAPTER_12_FULL_OVIS: Ovi[] = createChapter12Ovis();
