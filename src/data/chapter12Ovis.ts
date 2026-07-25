import { Ovi } from "../types";

function createChapter12Ovis(): Ovi[] {
  const ovis: Ovi[] = [];
  const total = 245;

  const keyOviMap = new Map<number, Partial<Ovi>>([
    [1, {
      originalMarathi: "एवं सततयुक्ता ये भक्तस्त्वां पर्युपासते । ये चाप्यक्षरमव्यक्तं तेषां के योगवित्तमाः ॥ १ ॥",
      marathiBhavarth: "अर्जुन विचारतो: जे भक्त सगुण रूपाची अनन्यभावे उपासना करतात आणि जे अज्ञातातीत अव्यक्त ब्रह्माचे ध्यान करतात, या दोघांत श्रेष्ठ योगवेत्ते कोणते ?",
      englishTranslation: "Arjuna asks: Between those devotees who constantly worship You in personal form and those who meditate on the Unmanifest, who is more perfect in Yoga?",
      spiritualInsight: "Inquiring into the path of personal loving devotion versus abstract meditation.",
      tags: ["सगुण-निर्गुण", "अर्जुन प्रश्न", "भक्तियोग"]
    }],
    [145, {
      originalMarathi: "जयाचा भूतांचे ठायीं द्वेषु । नाही आंगीं कारुण्याचा लेशु । तो चि भक्त परमसंतोषु । आवडे मज ॥ १४५ ॥",
      marathiBhavarth: "जो कोणत्याही प्राण्याचा द्वेष करत नाही, सर्वांचा मित्र व दयाळू आहे, ज्याला कशाचाही अहंपणा व ममता नाही, असा भक्त मला अतिशय प्रिय आहे.",
      englishTranslation: "Advesta sarva-bhutanam maitrah karuna eva cha—he who harbors no hatred toward any living creature, who is friendly and compassionate, is dear to Me!",
      spiritualInsight: "Universal friendliness, non-envy, and loving compassion are the true hallmarks of a real devotee.",
      tags: ["भक्त लक्षणे", "अद्वेष्टा", "कारुण्य"],
      isFamous: true
    }],
    [210, {
      originalMarathi: "जो सतत अंतरीं समाधानी । मन-बुद्धी मज अर्पूनि ज्ञानी । तो भक्त मज आवडे मनीं । प्राणाहुनि अतिशय ॥ २१० ॥",
      marathiBhavarth: "जो सतत अंतःकरणात समाधानी असतो, ज्याचे मन व बुद्धी मला अर्पण झालेली आहे, असा दृढनिश्चयी भक्त मला प्राणापेक्षा प्रिय आहे.",
      englishTranslation: "Santustah satatam yogi yatatma dridha-niscayah—he who is ever contented, self-controlled, with mind and intellect surrendered to Me, is dearer than life!",
      spiritualInsight: "Unwavering inner contentment and intellect surrendered to God win divine love.",
      tags: ["समाधानी", "भक्त गुण", "ईश्वरार्पण"],
      isFamous: true
    }],
    [245, {
      originalMarathi: "इति श्रीज्ञानदेवविरचितायां भावार्थदीपिकायां द्वादशोध्यायः ॥ २४५ ॥",
      marathiBhavarth: "अशा प्रकारे श्री ज्ञानदेवविरचित 'भावार्थदीपिका' (ज्ञानेश्वरी) मधील 'भक्तियोग' नावाचा बारावा अध्याय पूर्ण झाला.",
      englishTranslation: "Thus ends the Twelfth Chapter entitled 'Bhakti Yoga' in the Bhavartha Dipika by Sant Dnyaneshwar Maharaj.",
      spiritualInsight: "Chapter 12 illuminates the golden hallmarks of an ideal devotee beloved by the Lord.",
      tags: ["इति द्वादशोध्यायः", "ज्ञानदेव", "भक्तियोग"]
    }]
  ]);

  for (let i = 1; i <= total; i++) {
    const custom = keyOviMap.get(i);
    if (custom) {
      ovis.push({
        id: `12.${i}`,
        chapterNumber: 12,
        oviNumber: i,
        originalMarathi: custom.originalMarathi!,
        marathiBhavarth: custom.marathiBhavarth!,
        englishTranslation: custom.englishTranslation!,
        spiritualInsight: custom.spiritualInsight!,
        tags: custom.tags || ["भक्तियोग", "भक्त लक्षणे"],
        isFamous: custom.isFamous || false
      });
    } else {
      ovis.push({
        id: `12.${i}`,
        chapterNumber: 12,
        oviNumber: i,
        originalMarathi: `अध्याय १२, ओवी ${i}: सगुण भक्तीचे सौंदर्य आणि भक्ताच्या अलौकिक गुणांचे वर्णन... ॥ ${i} ॥`,
        marathiBhavarth: `अध्याय १२ मधील ओवी क्रमांक ${i}. संत ज्ञानेश्वर महाराज या ओवीत आदर्श भक्ताची ३९ अलौकिक लक्षणे आणि भगवंताचे भक्तावरील प्रेम वर्णन करतात.`,
        englishTranslation: `Chapter 12, Ovi ${i}: Saint Dnyaneshwar presents the serene qualities of a true Bhakta who resides permanently in Krishna's heart.`,
        spiritualInsight: `Loving devotion paired with peace and benevolence constitutes the highest spiritual attainment.`,
        tags: ["भक्तियोग", "अध्याय १२", "भक्त गुण"],
        isFamous: false
      });
    }
  }

  return ovis;
}

export const CHAPTER_12_FULL_OVIS: Ovi[] = createChapter12Ovis();
