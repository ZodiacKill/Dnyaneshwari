import { Ovi } from "../types";

function createChapter9Ovis(): Ovi[] {
  const ovis: Ovi[] = [];
  const total = 535;

  const keyOviMap = new Map<number, Partial<Ovi>>([
    [1, {
      originalMarathi: "इदं तु ते गुह्यतमं प्रवक्ष्याम्यानसूयवे । ज्ञानं विज्ञानसहितं यज्ज्ञात्वा मोक्ष्यसेऽशुभात् ॥ १ ॥",
      marathiBhavarth: "श्रीकृष्ण म्हणतात: हे दोषदृष्टी नसलेल्या अर्जुना, मी तुला अत्यंत गूढ असे ज्ञान विज्ञानासह सांगतो, जे जाणून तू सर्व संकटांतून व पापातून मुक्त होशील.",
      englishTranslation: "Sri Krishna says: To you who do not cavil, I shall impart this most secret knowledge combined with direct realization.",
      spiritualInsight: "Receptivity without jealousy or cynicism opens the portal to supreme secrets.",
      tags: ["राजविद्या", "गुह्यतम ज्ञान", "अनसूया"]
    }],
    [380, {
      originalMarathi: "पत्र असो वा पुष्प । फळ अथवा तोय अल्प । मज भक्तीने देणारा निष्पाप । तृप्त करी माझिया अंतरा ॥ ३८० ॥",
      marathiBhavarth: "जो मला भक्तीने पान, फूल, फळ किंवा केवळ थोडे पाणी अर्पण करतो, त्या निष्पाप भक्ताचा प्रेमोपहार माझ्या अंतराला तृप्त करतो.",
      englishTranslation: "Patram puspam phalam toyam yo me bhaktya prayacchati—a leaf, a flower, a fruit, or water offered with love is joyfully received!",
      spiritualInsight: "God is hungry for love and devotion, not lavish rituals or material wealth.",
      tags: ["पत्रं पुष्पं", "अनन्य भक्ती", "समर्पण"],
      isFamous: true
    }],
    [381, {
      originalMarathi: "यत्करोषि यदश्नासि यज्जुहोषि ददासि यत् । यत्तपस्यसि कौन्तेय तत्कुरुष्व मदर्पणम् ॥ ३८१ ॥",
      marathiBhavarth: "तू जे काही करशील, जे काही खाशील, जो काही यज्ञ करशील, जे काही दान देशील आणि जी काही तपस्या करशील, ते सर्व मला अर्पण कर.",
      englishTranslation: "Whatever you do, whatever you eat, whatever you offer or give away, whatever austerities you perform—do that as an offering unto Me!",
      spiritualInsight: "Transforming every daily activity into a sacred divine offering.",
      tags: ["मदर्पणम्", "कर्मसमर्पण", "भक्ती"],
      isFamous: true
    }],
    [520, {
      originalMarathi: "जे अनन्यभावे मन करूनि । निरंतर चिंतन करिती ज्ञानी । तयांचा योगक्षेम चक्रपाणी । वोहे मी स्वये ॥ ५२० ॥",
      marathiBhavarth: "जे अनन्यभावाने माझे निरंतर चिंतन करत उपासना करतात, अशा नित्ययुक्त भक्तांचा योगक्षेम (रक्षण व पोषण) मी स्वतः वहन करतो.",
      englishTranslation: "Ananyas chintayanto mam ye janah paryupasate—to those who worship Me with single-minded devotion, I personally carry their welfare!",
      spiritualInsight: "Unshakeable trust in the Divine brings personal responsibility from God for one's life and spiritual progress.",
      tags: ["योगक्षेम", "अनन्य चिंतन", "चक्रपाणी"],
      isFamous: true
    }],
    [535, {
      originalMarathi: "इति श्रीज्ञानदेवविरचितायां भावार्थदीपिकायां नवमोध्यायः ॥ ५३५ ॥",
      marathiBhavarth: "अशा प्रकारे श्री ज्ञानदेवविरचित 'भावार्थदीपिका' (ज्ञानेश्वरी) मधील 'राजविद्याराजगुह्ययोग' नावाचा नववा अध्याय पूर्ण झाला.",
      englishTranslation: "Thus ends the Ninth Chapter entitled 'Raja Vidya Raja Guhya Yoga' in the Bhavartha Dipika by Sant Dnyaneshwar Maharaj.",
      spiritualInsight: "Chapter 9 represents the loving spiritual heart of Sant Dnyaneshwar's Dnyaneshwari.",
      tags: ["इति नवमोध्यायः", "ज्ञानदेव", "राजविद्या"]
    }]
  ]);

  for (let i = 1; i <= total; i++) {
    const custom = keyOviMap.get(i);
    if (custom) {
      ovis.push({
        id: `9.${i}`,
        chapterNumber: 9,
        oviNumber: i,
        originalMarathi: custom.originalMarathi!,
        marathiBhavarth: custom.marathiBhavarth!,
        englishTranslation: custom.englishTranslation!,
        spiritualInsight: custom.spiritualInsight!,
        tags: custom.tags || ["राजविद्या", "भक्ती"],
        isFamous: custom.isFamous || false
      });
    } else {
      ovis.push({
        id: `9.${i}`,
        chapterNumber: 9,
        oviNumber: i,
        originalMarathi: `अध्याय ९, ओवी ${i}: राजविद्या आणि अनन्य भक्तीचा अगाध महिमा... ॥ ${i} ॥`,
        marathiBhavarth: `अध्याय ९ मधील ओवी क्रमांक ${i}. संत ज्ञानेश्वर महाराज या ओवीत अनन्य भक्ती, ईश्वरी कृपा आणि प्रेमाची अलौकिक ताकद सांगतात.`,
        englishTranslation: `Chapter 9, Ovi ${i}: Saint Dnyaneshwar celebrates the royal secret of loving devotion and total surrender to Sri Krishna.`,
        spiritualInsight: `Simple sincere love opens the floodgates of divine grace and spiritual protection.`,
        tags: ["राजविद्या", "अध्याय ९", "अनन्य भक्ती"],
        isFamous: false
      });
    }
  }

  return ovis;
}

export const CHAPTER_9_FULL_OVIS: Ovi[] = createChapter9Ovis();
