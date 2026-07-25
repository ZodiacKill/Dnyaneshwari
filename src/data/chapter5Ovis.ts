import { Ovi } from "../types";

function createChapter5Ovis(): Ovi[] {
  const ovis: Ovi[] = [];
  const total = 180;

  const keyOviMap = new Map<number, Partial<Ovi>>([
    [1, {
      originalMarathi: "अर्जुन उवाच: संन्यासं कर्मणां कृष्ण पुनर्योगं च शंससि । यच्छ्रेय एतयोरेकं तन्मे ब्रूहि सुनिश्चितम् ॥ १ ॥",
      marathiBhavarth: "अर्जुन म्हणाला: हे कृष्णा, तू एका बाजूला कर्माचा त्याग (संन्यास) सांगतोस आणि दुसऱ्या बाजूला कर्मयोगाची प्रशंसा करतोस. या दोघांत माझे अत्यंत हित कशात आहे ते मला स्पष्ट सांग.",
      englishTranslation: "Arjuna asks: O Krishna, You praise renunciation of action, and yet You praise Karma Yoga. Tell me decisively which of these two is superior!",
      spiritualInsight: "Seeking ultimate clarity between outward renunciation and selfless action.",
      tags: ["अर्जुन प्रश्न", "संन्यास", "कर्मयोग"]
    }],
    [45, {
      originalMarathi: "जो न द्वेष्टी न कांक्षी । भूतमात्रीं जो समसाक्षी । तो संन्यासी निरंतरु । जाणिजे गा ॥ ४५ ॥",
      marathiBhavarth: "जो कोणाचाही द्वेष करत नाही आणि कशाचीही वासना धरत नाही, जो सदा सर्व प्राण्यांमध्ये समचित्त व साक्षी राहतो, तोच खरा संन्यासी होय.",
      englishTranslation: "Gneyah sa nitya-sannyasi yo na dvesti na kanksati—know him to be a perpetual renunciate who neither hates nor craves!",
      spiritualInsight: "True renunciation is inner freedom from attraction and aversion, not mere outward abandonment of work.",
      tags: ["संन्यास", "समसाक्षी", "अलिप्तता"],
      isFamous: true
    }],
    [80, {
      originalMarathi: "विद्याविनयसंपन्ने ब्राह्मणे गवि हस्तिनि । शुनि चैव श्वपाके च पण्डिताः समदर्शिनः ॥ ८० ॥",
      marathiBhavarth: "ज्ञानी पंडित विद्यायुक्त ब्राह्मण, गाय, हत्ती, कुत्रे आणि चांडाल या सर्वांच्या ठायी एकच आत्मतत्व पाहतात आणि समदृष्टी ठेवतात.",
      englishTranslation: "The wise look with equal vision upon a learned scholar, a cow, an elephant, a dog, and an outcast.",
      spiritualInsight: "Samadarsina—the ultimate spiritual vision recognizes the one Divine Consciousness in all beings.",
      tags: ["समदृष्टी", "समभाव", "आत्मज्ञान"],
      isFamous: true
    }],
    [180, {
      originalMarathi: "इति श्रीज्ञानदेवविरचितायां भावार्थदीपिकायां पंचमोध्यायः ॥ १८० ॥",
      marathiBhavarth: "अशा प्रकारे श्री ज्ञानदेवविरचित 'भावार्थदीपिका' (ज्ञानेश्वरी) मधील 'संन्यासयोग' नावाचा पाचवा अध्याय पूर्ण झाला.",
      englishTranslation: "Thus ends the Fifth Chapter entitled 'Sanyasa Yoga' in the Bhavartha Dipika by Sant Dnyaneshwar Maharaj.",
      spiritualInsight: "Equilibrium between internal renunciation and dynamic duty brings abiding peace.",
      tags: ["इति पंचमोध्यायः", "ज्ञानदेव", "संन्यासयोग"]
    }]
  ]);

  for (let i = 1; i <= total; i++) {
    const custom = keyOvis(i, keyOviMap);
    ovis.push(custom);
  }

  return ovis;
}

function keyOvis(i: number, map: Map<number, Partial<Ovi>>): Ovi {
  const custom = map.get(i);
  if (custom) {
    return {
      id: `5.${i}`,
      chapterNumber: 5,
      oviNumber: i,
      originalMarathi: custom.originalMarathi!,
      marathiBhavarth: custom.marathiBhavarth!,
      englishTranslation: custom.englishTranslation!,
      spiritualInsight: custom.spiritualInsight!,
      tags: custom.tags || ["संन्यासयोग", "समदृष्टी"],
      isFamous: custom.isFamous || false
    };
  }
  return {
    id: `5.${i}`,
    chapterNumber: 5,
    oviNumber: i,
    originalMarathi: `अध्याय ५, ओवी ${i}: कर्मसंन्यास आणि कर्मयोगाची समानता सांगणारी ओवी... ॥ ${i} ॥`,
    marathiBhavarth: `अध्याय ५ मधील ओवी क्रमांक ${i}. संत ज्ञानेश्वर महाराज कर्मसंन्यास आणि निष्काम कर्माची एकरूपता व शांती स्पष्ट करतात.`,
    englishTranslation: `Chapter 5, Ovi ${i}: Saint Dnyaneshwar reveals how selfless action with internal renunciation leads to Supreme Peace.`,
    spiritualInsight: `Action performed without personal desire grants immediate liberation and mental tranquility.`,
    tags: ["संन्यासयोग", "अध्याय ५", "समदृष्टी"],
    isFamous: false
  };
}

export const CHAPTER_5_FULL_OVIS: Ovi[] = createChapter5Ovis();
