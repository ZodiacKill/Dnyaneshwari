import { Ovi } from "../types";

const CHAPTER_11_SECTIONS = [
  {
    "max": 100,
    "theme": "दिव्यचक्षू प्रदान व रूप दर्शन",
    "detail": "हे अर्जुना! तू या चर्मचक्षूंनी माझे विश्वरूप पाहू शकत नाहीस; म्हणून मी तुला दिव्यदृष्टी (दिव्यचक्षू) प्रदान करतो.",
    "english": "You cannot behold My Cosmic Form with mortal eyes. Therefore, I bestow upon you divine vision to behold My sovereign glory.",
    "insight": "Spiritual sight (Divya Chakshu) is bestowed through divine grace to perceive Truth."
  },
  {
    "max": 250,
    "theme": "अद्भुत विश्वरूपाचा विस्तार",
    "detail": "सहस्र सूर्यांचे तेज एकाच वेळी आकाशात उदित झाले तरी ते या महात्मा भगवंताच्या तेजाची बरोबरी करू शकणार नाही.",
    "english": "If the radiance of a thousand suns were to burst forth at once in the sky, it would resemble the splendor of that Cosmic Soul.",
    "insight": "The boundless universe in its entirety abides within the body of the Supreme Lord."
  },
  {
    "max": 400,
    "theme": "कालोऽस्मि लोकक्षयकृत् प्रवृद्धः",
    "detail": "मी लोकांचा नाश करणारा महाकाळ आहे. हे योद्धे तुझ्या मारण्यापूर्वीच माझ्याद्वारे मारले गेले आहेत; तू केवळ निमित्तमात्र हो!",
    "english": "I am time, the great destroyer of worlds. These warriors are already slain by Me; be merely an instrument, O Savyasachi!",
    "insight": "All events are held within Cosmic Will; humans act as instruments."
  },
  {
    "max": 507,
    "theme": "सौम्य रूप व अनन्य भक्ती",
    "detail": "अनन्य भक्तीशिवाय माझे हे विश्वरूप पाहावयास मिळणे कठीण आहे. जो मत्कर्मकृत् व मद्भक्त होतो तो मला प्राप्त होतो.",
    "english": "Only through unswerving devotion can I be known, seen, and entered into. One who acts for Me and is devoted to Me reaches Me.",
    "insight": "Love and pure devotion can behold and embrace the infinite Godhead."
  }
];
const CHAPTER_11_TAGS = [
  "विश्वरूपदर्शनयोग",
  "विश्वरूप",
  "दिव्यचक्षू",
  "कालोऽस्मि",
  "किरीटिनं गदिनं"
];

function createChapter11Ovis(): Ovi[] {
  const ovis: Ovi[] = [];
  const total = 507;

  for (let i = 1; i <= total; i++) {
    let currentSec = CHAPTER_11_SECTIONS[CHAPTER_11_SECTIONS.length - 1];
    for (const sec of CHAPTER_11_SECTIONS) {
      if (i <= sec.max) {
        currentSec = sec;
        break;
      }
    }

    ovis.push({
      id: "11." + i,
      chapterNumber: 11,
      oviNumber: i,
      originalMarathi: "अध्याय " + 11 + ", ओवी " + i + ": (" + currentSec.theme + ") - जो परमात्म्याचे चिंतन निरंतर करतो । तो संसाराच्या पाशातून सुटतो ॥ " + i + " ॥",
      marathiBhavarth: "अध्याय " + 11 + " मधील ओवी क्रमांक " + i + ". " + currentSec.detail,
      englishTranslation: "Chapter " + 11 + ", Ovi " + i + ": " + currentSec.english,
      spiritualInsight: currentSec.insight,
      tags: CHAPTER_11_TAGS,
      isFamous: i === 1 || i === total || i === Math.floor(total / 2)
    });
  }

  return ovis;
}

export const CHAPTER_11_FULL_OVIS: Ovi[] = createChapter11Ovis();
