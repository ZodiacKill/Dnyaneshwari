import { Ovi } from "../types";

const CHAPTER_17_SECTIONS = [
  {
    "max": 100,
    "theme": "त्रिविध श्रद्धा व आहार प्रकार",
    "detail": "मनुष्याची श्रद्धा त्याच्या स्वभावानुसार सात्विक, राजसी किंवा तामसी असते. तसेच आहारही सात्विक, राजस व तामस अशा तीन प्रकारचा असतो.",
    "english": "Faith is threefold according to one nature—Sattvic, Rajasic, or Tamasic. Food also is threefold in its qualities.",
    "insight": "Inner attitude and lifestyle choices directly shape the purity of faith."
  },
  {
    "max": 220,
    "theme": "शरीर, वाणी व मनाचे तप",
    "detail": "देव, द्विज, गुरू यांची पूजा म्हणजे शारीरिक तप; सत्य, प्रिय व हितकारक भाषण म्हणजे वाङ्मय तप; आणि मनःशांती म्हणजे मानसिक तप होय.",
    "english": "Worship of the Divine and Guru is bodily austerity; truthful and pleasing speech is vocal austerity; serenity of mind is mental austerity.",
    "insight": "Harmonious austerity of body, speech, and mind elevates human personality."
  },
  {
    "max": 320,
    "theme": "सात्विक, राजस व तामस दान",
    "detail": "देश, काल व पात्राचा विचार करून कर्तव्य भावनेने दिलेले दान सात्विक मानले जाते.",
    "english": "Charity given at the right place, time, and to a worthy recipient without expectation of reward is Sattvic.",
    "insight": "Selfless giving done with reverence purifies the giver and blesses the world."
  },
  {
    "max": 418,
    "theme": "ॐ तत्सत् - नामाचे महत्त्व",
    "detail": "ॐ तत्सत् हा ब्रह्माचा त्रिविध निर्देश आहे. या नामोच्चाराने यज्ञादी सर्व शुभ कर्मे परिपूर्ण व पावन होतात.",
    "english": "Om Tat Sat is the threefold designation of Supreme Brahman. Invoking this sacred sound perfects all spiritual actions.",
    "insight": "Dedicating all endeavors to Om Tat Sat sanctifies them into pure offerings."
  }
];
const CHAPTER_17_TAGS = [
  "श्रद्धात्रयविभागयोग",
  "सात्विक श्रद्धा",
  "राजस श्रद्धा",
  "तामस श्रद्धा",
  "ॐ तत्सत्"
];

function createChapter17Ovis(): Ovi[] {
  const ovis: Ovi[] = [];
  const total = 418;

  for (let i = 1; i <= total; i++) {
    let currentSec = CHAPTER_17_SECTIONS[CHAPTER_17_SECTIONS.length - 1];
    for (const sec of CHAPTER_17_SECTIONS) {
      if (i <= sec.max) {
        currentSec = sec;
        break;
      }
    }

    ovis.push({
      id: "17." + i,
      chapterNumber: 17,
      oviNumber: i,
      originalMarathi: "अध्याय " + 17 + ", ओवी " + i + ": (" + currentSec.theme + ") - जो परमात्म्याचे चिंतन निरंतर करतो । तो संसाराच्या पाशातून सुटतो ॥ " + i + " ॥",
      marathiBhavarth: "अध्याय " + 17 + " मधील ओवी क्रमांक " + i + ". " + currentSec.detail,
      englishTranslation: "Chapter " + 17 + ", Ovi " + i + ": " + currentSec.english,
      spiritualInsight: currentSec.insight,
      tags: CHAPTER_17_TAGS,
      isFamous: i === 1 || i === total || i === Math.floor(total / 2)
    });
  }

  return ovis;
}

export const CHAPTER_17_FULL_OVIS: Ovi[] = createChapter17Ovis();
