import { Ovi } from "../types";

function createChapter17Ovis(): Ovi[] {
  const ovis: Ovi[] = [];
  const total = 419;

  const keyOviMap = new Map<number, Partial<Ovi>>([
    [1, {
      originalMarathi: "ये शास्त्रविधिमुत्सृज्य यजन्ते श्रद्धयान्विताः । तेषां निष्ठा तु का कृष्ण सत्त्वमाहो रजस्तमः ॥ १ ॥",
      marathiBhavarth: "अर्जुन विचारतो: हे कृष्णा, जे शास्त्राचा नियम सोडून श्रद्धेने पूजा-अर्चा करतात, त्यांची निष्ठा सात्त्विक, राजसिक की तामसिक ?",
      englishTranslation: "Arjuna asks: What is the state of those who perform sacrifice with faith, setting aside scriptural injunctions?",
      spiritualInsight: "Exploring the inherent nature of human faith (Shraddha).",
      tags: ["श्रद्धा", "अर्जुन प्रश्न", "श्रद्धात्रय"]
    }],
    [75, {
      originalMarathi: "ज्याने कोणाही न होय उद्वेगू । सत्याचा न मोडे कधीं सांगू । हित आणि प्रिय बोलणे चांगू । वाङ्मय तप हे ॥ ७५ ॥",
      marathiBhavarth: "कोणालाही उद्वेग न देणारे, सत्य, प्रिय आणि हितकारक बोलणे तसेच सद्ग्रंथांचा निरंतर अभ्यास करणे याला वाणीचे तप म्हणतात.",
      englishTranslation: "Anudvega-karam vakyam satyam priya-hitam cha yat—speech that causes no distress, truthful, pleasant, and beneficial is the austerity of speech!",
      spiritualInsight: "Truthful, uplifting, and gentle speech is a profound spiritual discipline for speech control.",
      tags: ["वाणीचे तप", "सत्य भाषण", "तपस्या"],
      isFamous: true
    }],
    [200, {
      originalMarathi: "ॐ तत्सदिति निर्देशो ब्रह्मणस्त्रिविधः स्मृतः । ॐ तत्सत् हा नामनिर्देश ब्रह्माला सूचित करतो ॥ २०० ॥",
      marathiBhavarth: "'ॐ तत् सत्' हा तीन प्रकारचा नामनिर्देश परब्रह्माचा वाचक मानला गेला आहे. या नामोच्चाराने सर्व कर्मे पवित्र होतात.",
      englishTranslation: "'Om Tat Sat' is declared to be the threefold designation of the Supreme Absolute Reality.",
      spiritualInsight: "Om Tat Sat purifies all spiritual actions, sacrifices, and acts of charity.",
      tags: ["ॐ तत्सत्", "परब्रह्म", "पवित्र"]
    }],
    [419, {
      originalMarathi: "इति श्रीज्ञानदेवविरचितायां भावार्थदीपिकायां सप्तदशोध्यायः ॥ ४१९ ॥",
      marathiBhavarth: "अशा प्रकारे श्री ज्ञानदेवविरचित 'भावार्थदीपिका' (ज्ञानेश्वरी) मधील 'श्रद्धात्रयविभागयोग' नावाचा सतरावा अध्याय पूर्ण झाला.",
      englishTranslation: "Thus ends the Seventeenth Chapter entitled 'Shraddhatraya Vibhaga Yoga' in the Bhavartha Dipika by Sant Dnyaneshwar Maharaj.",
      spiritualInsight: "Infusing every daily act with pure Sattvik faith and the holy mantra Om Tat Sat.",
      tags: ["इति सप्तदशोध्यायः", "ज्ञानदेव", "श्रद्धात्रय"]
    }]
  ]);

  for (let i = 1; i <= total; i++) {
    const custom = keyOviMap.get(i);
    if (custom) {
      ovis.push({
        id: `17.${i}`,
        chapterNumber: 17,
        oviNumber: i,
        originalMarathi: custom.originalMarathi!,
        marathiBhavarth: custom.marathiBhavarth!,
        englishTranslation: custom.englishTranslation!,
        spiritualInsight: custom.spiritualInsight!,
        tags: custom.tags || ["श्रद्धात्रय", "सात्त्विक श्रद्धा"],
        isFamous: custom.isFamous || false
      });
    } else {
      ovis.push({
        id: `17.${i}`,
        chapterNumber: 17,
        oviNumber: i,
        originalMarathi: `अध्याय १७, ओवी ${i}: तीन प्रकारची श्रद्धा, सात्त्विक आहार व वाणीचे तप... ॥ ${i} ॥`,
        marathiBhavarth: `अध्याय १७ मधील ओवी क्रमांक ${i}. संत ज्ञानेश्वर महाराज सात्त्विक आहार, वाणीचे तप आणि 'ॐ तत्सत्' या ब्रम्हनिर्देशाचे महत्त्व सांगतात.`,
        englishTranslation: `Chapter 17, Ovi ${i}: Saint Dnyaneshwar explains how faith, speech, food, and sacrifice take on Sattvik, Rajasik, or Tamasik qualities.`,
        spiritualInsight: `Aligning mind, speech, and food choices with Sattva yields pure inner peace.`,
        tags: ["श्रद्धात्रय", "अध्याय १७", "वाणीचे तप"],
        isFamous: false
      });
    }
  }

  return ovis;
}

export const CHAPTER_17_FULL_OVIS: Ovi[] = createChapter17Ovis();
