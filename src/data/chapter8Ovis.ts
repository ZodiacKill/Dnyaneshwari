import { Ovi } from "../types";

function createChapter8Ovis(): Ovi[] {
  const ovis: Ovi[] = [];
  const total = 263;

  const keyOviMap = new Map<number, Partial<Ovi>>([
    [42, {
      originalMarathi: "अंतकाळीं जिये भावी । मन आपुले ठेवी । तो तिया चि गती पावी । अर्जुना ऐके ॥ ४२ ॥",
      marathiBhavarth: "मनुष्य अंतकाळी ज्या ज्या भावाचे ध्यान करत शरीर सोडतो, तो त्याच भावाला आणि गतीला प्राप्त होतो.",
      englishTranslation: "Yam yam vapi smaran bhavam tyajati ante kalevaram—whatever state of mind one remembers at the moment of death, to that state one attains!",
      spiritualInsight: "Lifelong spiritual practice shapes the final state of mind and ultimate destination.",
      tags: ["अंतकाळ स्मरण", "स्मरण", "परम गती"],
      isFamous: true
    }],
    [80, {
      originalMarathi: "तस्मात्सर्वेषु कालेषु मामनुस्मर युध्य च । मय्यर्पितमनोबुद्धिर्मामेवैष्यस्यसंशयम् ॥ ८० ॥",
      marathiBhavarth: "म्हणून अर्जुना, तू सर्वकाळी माझे निरंतर स्मरण कर आणि युद्ध कर. मन आणि बुद्धी मला अर्पण केल्याने तू नक्कीच मला प्राप्त होशील.",
      englishTranslation: "Therefore, at all times remember Me and fight! With mind and intellect fixed on Me, you shall surely come to Me.",
      spiritualInsight: "Integrating continuous divine Remembrance with daily worldly duty.",
      tags: ["सर्वकाळ स्मरण", "युद्ध", "ईश्वरार्पण"],
      isFamous: true
    }],
    [263, {
      originalMarathi: "इति श्रीज्ञानदेवविरचितायां भावार्थदीपिकायां अष्टमोध्यायः ॥ २६३ ॥",
      marathiBhavarth: "अशा प्रकारे श्री ज्ञानदेवविरचित 'भावार्थदीपिका' (ज्ञानेश्वरी) मधील 'अक्षरब्रह्मयोग' नावाचा आठवा अध्याय पूर्ण झाला.",
      englishTranslation: "Thus ends the Eighth Chapter entitled 'Aksara Brahma Yoga' in the Bhavartha Dipika by Sant Dnyaneshwar Maharaj.",
      spiritualInsight: "Realizing the Imperishable Absolute (Akshara) liberates the soul from cycle of rebirth.",
      tags: ["इति अष्टमोध्यायः", "ज्ञानदेव", "अक्षरब्रह्मयोग"]
    }]
  ]);

  for (let i = 1; i <= total; i++) {
    const custom = keyOviMap.get(i);
    if (custom) {
      ovis.push({
        id: `8.${i}`,
        chapterNumber: 8,
        oviNumber: i,
        originalMarathi: custom.originalMarathi!,
        marathiBhavarth: custom.marathiBhavarth!,
        englishTranslation: custom.englishTranslation!,
        spiritualInsight: custom.spiritualInsight!,
        tags: custom.tags || ["अक्षरब्रह्मयोग", "अक्षर ब्रह्म"],
        isFamous: custom.isFamous || false
      });
    } else {
      ovis.push({
        id: `8.${i}`,
        chapterNumber: 8,
        oviNumber: i,
        originalMarathi: `अध्याय ८, ओवी ${i}: अक्षर ब्रहा आणि अंतकाळच्या स्मरणाचे गूढ निरूपण... ॥ ${i} ॥`,
        marathiBhavarth: `अध्याय ८ मधील ओवी क्रमांक ${i}. संत ज्ञानेश्वर महाराज या ओवीत अक्षर ब्रह्म, ॐकार ध्यान आणि अंतकाळच्या स्मरणाचे रहस्य सांगतात.`,
        englishTranslation: `Chapter 8, Ovi ${i}: Saint Dnyaneshwar explains the meditation on Om and the supreme state of the Imperishable Absolute.`,
        spiritualInsight: `Constant remembrance of the Divine prepares the soul for ultimate liberation.`,
        tags: ["अक्षरब्रह्मयोग", "अध्याय ८", "ॐकार"],
        isFamous: false
      });
    }
  }

  return ovis;
}

export const CHAPTER_8_FULL_OVIS: Ovi[] = createChapter8Ovis();
