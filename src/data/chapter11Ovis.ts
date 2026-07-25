import { Ovi } from "../types";

function createChapter11Ovis(): Ovi[] {
  const ovis: Ovi[] = [];
  const total = 607;

  const keyOviMap = new Map<number, Partial<Ovi>>([
    [101, {
      originalMarathi: "गगनीं सहस्र भानूंचे तेज । एकदम उदेले जैसे काज । तैसे ते रूप देखिले आज । विश्वरूपाचे ॥ १०१ ॥",
      marathiBhavarth: "आकाशात हजारो सूर्य एकाच वेळी प्रकाशले तर जे अलौकिक तेज निर्माण होईल, तसे दिव्य तेज त्या विश्वरूपाचे दिसू लागले.",
      englishTranslation: "Divi surya-sahasrasya bhaved yugapad utthita—if the radiance of a thousand suns were to burst forth at once in the sky, that would resemble the cosmic Form!",
      spiritualInsight: "The boundless, dazzling infinity of God eclipses ordinary sensory capacity.",
      tags: ["विश्वरूप", "सहस्र सूर्य", "दिव्य तेज"],
      isFamous: true
    }],
    [200, {
      originalMarathi: "न चक्षुषा शक्यसे द्रष्टुमनेनैव स्वचक्षुषा । दिव्यं ददामि ते चक्षुः पश्य मे योगमैश्वरम् ॥ २०० ॥",
      marathiBhavarth: "श्रीकृष्ण म्हणाले: तू तुझ्या चर्मचक्षूंनी माझे हे रूप पाहू शकत नाहीस; म्हणून मी तुला दिव्यदृष्टी देतो. त्या दृष्टीने माझी ऐश्वर्ययुक्त शक्ती पाहा.",
      englishTranslation: "You cannot behold Me with your ordinary physical eyes; I grant you divine vision! Behold My supreme cosmic glory.",
      spiritualInsight: "Spiritual realization requires awakening of inner divine perception (Divya Chakshu).",
      tags: ["दिव्यदृष्टी", "चर्मचक्षू", "ऐश्वर्य"],
      isFamous: true
    }],
    [607, {
      originalMarathi: "इति श्रीज्ञानदेवविरचितायां भावार्थदीपिकायां एकादशोध्यायः ॥ ६०७ ॥",
      marathiBhavarth: "अशा प्रकारे श्री ज्ञानदेवविरचित 'भावार्थदीपिका' (ज्ञानेश्वरी) मधील 'विश्वरूपदर्शनयोग' नावाचा अकरावा अध्याय पूर्ण झाला.",
      englishTranslation: "Thus ends the Eleventh Chapter entitled 'Viswarupa Darsana Yoga' in the Bhavartha Dipika by Sant Dnyaneshwar Maharaj.",
      spiritualInsight: "Experiencing the cosmic unity of the Lord inspires awe, humility, and absolute surrender.",
      tags: ["इति एकादशोध्यायः", "ज्ञानदेव", "विश्वरूपदर्शनयोग"]
    }]
  ]);

  for (let i = 1; i <= total; i++) {
    const custom = keyOviMap.get(i);
    if (custom) {
      ovis.push({
        id: `11.${i}`,
        chapterNumber: 11,
        oviNumber: i,
        originalMarathi: custom.originalMarathi!,
        marathiBhavarth: custom.marathiBhavarth!,
        englishTranslation: custom.englishTranslation!,
        spiritualInsight: custom.spiritualInsight!,
        tags: custom.tags || ["विश्वरूपदर्शनयोग", "विश्वरूप"],
        isFamous: custom.isFamous || false
      });
    } else {
      ovis.push({
        id: `11.${i}`,
        chapterNumber: 11,
        oviNumber: i,
        originalMarathi: `अध्याय ११, ओवी ${i}: भगवंताचे विराट विश्वरूप दर्शन आणि अर्जुनाचा अद्भुत स्तवन संवाद... ॥ ${i} ॥`,
        marathiBhavarth: `अध्याय ११ मधील ओवी क्रमांक ${i}. संत ज्ञानेश्वर महाराज भगवंताच्या अद्भूत विराट विश्वरूपाचे आणि कालरूपाचे वर्णन करतात.`,
        englishTranslation: `Chapter 11, Ovi ${i}: Saint Dnyaneshwar depicts the magnificent, awe-inspiring Cosmic Form revealed to Arjuna.`,
        spiritualInsight: `Beholding the entire cosmos within the Almighty inspires profound reverence and sacred wonder.`,
        tags: ["विश्वरूपदर्शनयोग", "अध्याय ११", "विराट रूप"],
        isFamous: false
      });
    }
  }

  return ovis;
}

export const CHAPTER_11_FULL_OVIS: Ovi[] = createChapter11Ovis();
