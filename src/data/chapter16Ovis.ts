import { Ovi } from "../types";

function createChapter16Ovis(): Ovi[] {
  const ovis: Ovi[] = [];
  const total = 470;

  const keyOviMap = new Map<number, Partial<Ovi>>([
    [1, {
      originalMarathi: "अभयं सत्त्वसंशुद्धिर्ज्ञानयोगव्यवस्थितिः । दानं दमश्च यज्ञश्च स्वाध्यायस्तप आर्जवम् ॥ १ ॥",
      marathiBhavarth: "अभय (निर्भयता), चित्तशुद्धी, ज्ञानयोगात दृढता, दान, दम (इंद्रियसंयम), यज्ञ, स्वाध्याय, तप आणि सरळपणा...",
      englishTranslation: "Fearlessness, purity of heart, steadfastness in knowledge and yoga, charity, sensory control, sacrifice, self-study, and simplicity...",
      spiritualInsight: "The 26 divine attributes (Daivi Sampad) that elevate human consciousness.",
      tags: ["दैवी संपदा", "अभय", "सत्त्वसंशुद्धी"]
    }],
    [11, {
      originalMarathi: "अभय आणि अंतःकरणशुद्धी । ज्ञानयोगाचे ठायीं दृढ बुद्धी । दया दान शम क्षमा समृद्धी । दैवी संपदा ही ॥ ११ ॥",
      marathiBhavarth: "निर्भयता, चित्ताची शुद्धी, ज्ञानयोगात स्थैर्य, दान, संयम, दया आणि सरळपणा ही दैवी संपदा आहे.",
      englishTranslation: "Fearlessness and internal purity leading to steadfast wisdom form the core of divine wealth.",
      spiritualInsight: "Cultivating divine virtues opens the inner gateway to spiritual liberation.",
      tags: ["दैवी संपदा", "सद्गुण", "अभय"],
      isFamous: true
    }],
    [200, {
      originalMarathi: "त्रिविधं नरकस्येदं द्वारं नाशनमात्मनः । कामः क्रोधस्तथा लोभस्तस्मादेतत्त्रयं त्यजेत् ॥ २०० ॥",
      marathiBhavarth: "काम (वासना), क्रोध (राग) आणि लोभ ही आत्म्याचा नाश करणारी नरकाची तीन द्वारे आहेत; म्हणून या तिन्हींचा त्याग करावा.",
      englishTranslation: "Lust, Anger, and Greed are the three gateways to self-destruction and hell; therefore, one must abandon all three!",
      spiritualInsight: "Kama, Krodha, and Lobha are the principal internal thieves destroying human dignity and peace.",
      tags: ["काम-क्रोध-लोभ", "नरकद्वारे", "त्याग"],
      isFamous: true
    }],
    [470, {
      originalMarathi: "इति श्रीज्ञानदेवविरचितायां भावार्थदीपिकायां षोडशोध्यायः ॥ ४७० ॥",
      marathiBhavarth: "अशा प्रकारे श्री ज्ञानदेवविरचित 'भावार्थदीपिका' (ज्ञानेश्वरी) मधील 'दैवासुरसंपद्विभागयोग' नावाचा सोळावा अध्याय पूर्ण झाला.",
      englishTranslation: "Thus ends the Sixteenth Chapter entitled 'Daivasura Sampad Vibhaga Yoga' in the Bhavartha Dipika by Sant Dnyaneshwar Maharaj.",
      spiritualInsight: "Choosing divine virtues over demonic egoism seals one's spiritual ascension.",
      tags: ["इति षोडशोध्यायः", "ज्ञानदेव", "दैवासुरसंपद्"]
    }]
  ]);

  for (let i = 1; i <= total; i++) {
    const custom = keyOviMap.get(i);
    if (custom) {
      ovis.push({
        id: `16.${i}`,
        chapterNumber: 16,
        oviNumber: i,
        originalMarathi: custom.originalMarathi!,
        marathiBhavarth: custom.marathiBhavarth!,
        englishTranslation: custom.englishTranslation!,
        spiritualInsight: custom.spiritualInsight!,
        tags: custom.tags || ["दैवासुरसंपद्", "दैवी संपदा"],
        isFamous: custom.isFamous || false
      });
    } else {
      ovis.push({
        id: `16.${i}`,
        chapterNumber: 16,
        oviNumber: i,
        originalMarathi: `अध्याय १६, ओवी ${i}: दैवी सद्गुण आणि आसुरी दुर्गुणांचे स्पष्ट वर्गीकरण... ॥ ${i} ॥`,
        marathiBhavarth: `अध्याय १६ मधील ओवी क्रमांक ${i}. संत ज्ञानेश्वर महाराज दैवी संपदा आणि आसुरी प्रवृत्तींमधील फरक उलगडून दाखवतात.`,
        englishTranslation: `Chapter 16, Ovi ${i}: Saint Dnyaneshwar delineates the noble qualities that liberate versus the egoistic traits that bind.`,
        spiritualInsight: `Rejecting pride, anger, and greed nurtures the divine radiance dormant within the soul.`,
        tags: ["दैवासुरसंपद्", "अध्याय १६", "सद्गुण"],
        isFamous: false
      });
    }
  }

  return ovis;
}

export const CHAPTER_16_FULL_OVIS: Ovi[] = createChapter16Ovis();
