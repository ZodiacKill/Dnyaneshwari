import { Ovi } from "../types";

function createChapter14Ovis(): Ovi[] {
  const ovis: Ovi[] = [];
  const total = 410;

  const keyOviMap = new Map<number, Partial<Ovi>>([
    [95, {
      originalMarathi: "सत्त्व ते सुखाचा प्रकाशु करी । रज ते कर्माचे ठायीं वारी । तम ते अज्ञानाचे अंधारीं । गुंफूनि ठेवी ॥ ९५ ॥",
      marathiBhavarth: "सत्त्वगुण मनुष्याला सुखात व ज्ञानात जोडतो, रजोगुण कर्मात गुंतवतो आणि तमोगुण अज्ञानाच्या अंधारात गुंफून ठेवतो.",
      englishTranslation: "Sattvam sukhe sanjayati rajah karmani bharata—Sattva binds to happiness, Rajas to intense work, and Tamas veils wisdom in ignorance.",
      spiritualInsight: "Understanding the three cosmic forces (Gunas) enables one to rise above their binding influence.",
      tags: ["त्रिगुण", "सत्त्व-रज-तम", "गुणातीत"],
      isFamous: true
    }],
    [200, {
      originalMarathi: "गुणानेतानतीत्य त्रीन देही देहसमुद्भवान् । जन्ममृत्युजरादुःखैर्विमुक्तोऽमृतमश्नुते ॥ २०० ॥",
      marathiBhavarth: "शरीरधारी पुरुष जेव्हा या तीन गुणांचा त्याग करून त्यांच्या पलीकडे जातो, तेव्हा तो जन्म, मृत्यू, म्हातारपण आणि दुःखांपासून मुक्त होऊन अमृत्वाचा अनुभव घेतो.",
      englishTranslation: "Having transcended these three modes of nature born of the body, the embodied soul is freed from birth, death, old age, and sorrow!",
      spiritualInsight: "Gunatita—the liberated sage who remains untouched by the fluctuations of the three Gunas.",
      tags: ["गुणातीत", "अमृतत्व", "मुक्ती"]
    }],
    [410, {
      originalMarathi: "इति श्रीज्ञानदेवविरचितायां भावार्थदीपिकायां चतुर्दशोध्यायः ॥ ४१० ॥",
      marathiBhavarth: "अशा प्रकारे श्री ज्ञानदेवविरचित 'भावार्थदीपिका' (ज्ञानेश्वरी) मधील 'गुणत्रयविभागयोग' नावाचा चौदावा अध्याय पूर्ण झाला.",
      englishTranslation: "Thus ends the Fourteenth Chapter entitled 'Gunatraya Vibhaga Yoga' in the Bhavartha Dipika by Sant Dnyaneshwar Maharaj.",
      spiritualInsight: "Ascending beyond Sattva, Rajas, and Tamas into pure Gunatita state of consciousness.",
      tags: ["इति चतुर्दशोध्यायः", "ज्ञानदेव", "गुणत्रय"]
    }]
  ]);

  for (let i = 1; i <= total; i++) {
    const custom = keyOviMap.get(i);
    if (custom) {
      ovis.push({
        id: `14.${i}`,
        chapterNumber: 14,
        oviNumber: i,
        originalMarathi: custom.originalMarathi!,
        marathiBhavarth: custom.marathiBhavarth!,
        englishTranslation: custom.englishTranslation!,
        spiritualInsight: custom.spiritualInsight!,
        tags: custom.tags || ["गुणत्रय", "गुणातीत"],
        isFamous: custom.isFamous || false
      });
    } else {
      ovis.push({
        id: `14.${i}`,
        chapterNumber: 14,
        oviNumber: i,
        originalMarathi: `अध्याय १४, ओवी ${i}: सत्त्व, रज आणि तम गुणांचे वैशिष्ट्य आणि गुणत्रयातीत अवस्था... ॥ ${i} ॥`,
        marathiBhavarth: `अध्याय १४ मधील ओवी क्रमांक ${i}. संत ज्ञानेश्वर महाराज या ओवीत त्रिगुणांचे बंधन, त्यांचे परिणाम आणि गुणातीत होण्याचा मार्ग स्पष्ट करतात.`,
        englishTranslation: `Chapter 14, Ovi ${i}: Saint Dnyaneshwar explains how the three modes of nature function and how to transcend them into freedom.`,
        spiritualInsight: `Becoming an unattached witness to the three Gunas frees the soul from worldly bondage.`,
        tags: ["गुणत्रय", "अध्याय १४", "गुणातीत"],
        isFamous: false
      });
    }
  }

  return ovis;
}

export const CHAPTER_14_FULL_OVIS: Ovi[] = createChapter14Ovis();
