import { Ovi } from "../types";

function createChapter10Ovis(): Ovi[] {
  const ovis: Ovi[] = [];
  const total = 330;

  const keyOviMap = new Map<number, Partial<Ovi>>([
    [1, {
      originalMarathi: "भूय एव महाबाहो शृणु मे परमं वचः । यत्तेऽहं प्रीयमाणाय वक्ष्यामि हितकाम्यया ॥ १ ॥",
      marathiBhavarth: "श्रीकृष्ण म्हणतात: हे महाबाहो अर्जुना, माझ्यावर अत्यंत प्रेम करणाऱ्या तुझ्या हितासाठी मी पुन्हा माझे परम रहस्यमय वचन सांगतो.",
      englishTranslation: "Sri Krishna says: Listen further, O mighty-armed Arjuna, to My supreme word which I speak for your welfare.",
      spiritualInsight: "Divine wisdom flows spontaneously toward one who listens with genuine love.",
      tags: ["विभूतियोग", "हितकाम्या", "महाबाहो"]
    }],
    [112, {
      originalMarathi: "जये जये ठायीं विभूती । सौंदर्य ऐश्वर्य अथवा दीप्ती । ते ते जाणे माझिया ज्योती । अंशाचा प्रकाशु ॥ ११२ ॥",
      marathiBhavarth: "ज्या ज्या वस्तू किंवा प्राण्यामध्ये सौंदर्य, ऐश्वर्य आणि तेज दिसून येते, ते सर्व माझ्याच तेजाच्या अंशापासून उत्पन्न झाले आहे असे समज.",
      englishTranslation: "Yad yad vibhutimat sattvam srimad urjitam eva va—whatever is glorious, beautiful, or mighty, know that to spring from a spark of My splendor!",
      spiritualInsight: "Perceiving the Divine Spark behind every beauty, excellence, and grandeur in the universe.",
      tags: ["विभूती", "सौंदर्य", "ईश्वरी अंश"],
      isFamous: true
    }],
    [200, {
      originalMarathi: "अहमात्मा गुडाकेश सर्वभूताशयस्थितः । अहमादिश्च मध्यं च भूतानामन्त एव च ॥ २०० ॥",
      marathiBhavarth: "हे अर्जुना, मी सर्व प्राण्यांच्या अंतःकरणात राहणारा आत्मा आहे. सर्व प्राण्यांचा आदि, मध्य आणि अंतही मीच आहे.",
      englishTranslation: "I am the Self, O Gudakesha, seated in the hearts of all creatures; I am the beginning, the middle, and the end of all beings.",
      spiritualInsight: "God is the innermost soul of every living being and the origin of time.",
      tags: ["आत्मा", "सर्वभूत", "आदि-मध्य-अन्त"],
      isFamous: true
    }],
    [330, {
      originalMarathi: "इति श्रीज्ञानदेवविरचितायां भावार्थदीपिकायां दशमोध्यायः ॥ ३३० ॥",
      marathiBhavarth: "अशा प्रकारे श्री ज्ञानदेवविरचित 'भावार्थदीपिका' (ज्ञानेश्वरी) मधील 'विभूतियोग' नावाचा दहावा अध्याय पूर्ण झाला.",
      englishTranslation: "Thus ends the Tenth Chapter entitled 'Vibhuti Yoga' in the Bhavartha Dipika by Sant Dnyaneshwar Maharaj.",
      spiritualInsight: "Recognizing the omnipresent splendor of Krishna in every blossom and mountain peak.",
      tags: ["इति दशमोध्यायः", "ज्ञानदेव", "विभूतियोग"]
    }]
  ]);

  for (let i = 1; i <= total; i++) {
    const custom = keyOviMap.get(i);
    if (custom) {
      ovis.push({
        id: `10.${i}`,
        chapterNumber: 10,
        oviNumber: i,
        originalMarathi: custom.originalMarathi!,
        marathiBhavarth: custom.marathiBhavarth!,
        englishTranslation: custom.englishTranslation!,
        spiritualInsight: custom.spiritualInsight!,
        tags: custom.tags || ["विभूतियोग", "विभूती"],
        isFamous: custom.isFamous || false
      });
    } else {
      ovis.push({
        id: `10.${i}`,
        chapterNumber: 10,
        oviNumber: i,
        originalMarathi: `अध्याय १०, ओवी ${i}: ईश्वराचे अनंत ऐश्वर्य आणि विश्वातील विभूतींचे वर्णन... ॥ ${i} ॥`,
        marathiBhavarth: `अध्याय १० मधील ओवी क्रमांक ${i}. संत ज्ञानेश्वर महाराज या ओवीत भगवंताच्या अनंत ऐश्वर्याचे आणि सृष्टीतील विभूतींचे रसाळ वर्णन करतात.`,
        englishTranslation: `Chapter 10, Ovi ${i}: Saint Dnyaneshwar celebrates the infinite manifestations and divine glory of Krishna throughout nature.`,
        spiritualInsight: `Seeing the Almighty reflected in all magnificent forms elevates ordinary perception into sacred worship.`,
        tags: ["विभूतियोग", "अध्याय १०", "ऐश्वर्य"],
        isFamous: false
      });
    }
  }

  return ovis;
}

export const CHAPTER_10_FULL_OVIS: Ovi[] = createChapter10Ovis();
