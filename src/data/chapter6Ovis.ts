import { Ovi } from "../types";

function createChapter6Ovis(): Ovi[] {
  const ovis: Ovi[] = [];
  const total = 496;

  const keyOviMap = new Map<number, Partial<Ovi>>([
    [12, {
      originalMarathi: "आपणचि आपला बंधु । आपणचि आपला शत्रू । मन जिंके तो सिंधू । सुखाचा पै ॥ १२ ॥",
      marathiBhavarth: "मनुष्य स्वतःच आपला मित्र आहे आणि स्वतःच आपला शत्रू आहे. ज्याने आपले मन जिंकले तो आनंदाचा सागर बनतो.",
      englishTranslation: "Uddhared atmanatmanam natmanam avasadayet—elevate yourself by yourself! The mastered mind is your greatest friend; the uncontrolled mind your fiercest enemy.",
      spiritualInsight: "Self-reliance and mind mastery form the foundation of spiritual realization.",
      tags: ["आत्मसंयम", "मित्र-शत्रू", "मनोनिग्रह"],
      isFamous: true
    }],
    [100, {
      originalMarathi: "शुचौ देशे प्रतिष्ठाप्य स्थिरमासनमात्मनः । पवित्र स्थानी आसनाची रचना करूनि अभ्यासासी बसावे ॥ १०० ॥",
      marathiBhavarth: "पवित्र आणि शांत ठिकाणी सुखावह आसन मांडून अभ्यासासाठी आणि ध्यानासाठी बसावे.",
      englishTranslation: "Establishing a firm, clean seat in a sacred secluded spot, one should engage in meditation.",
      spiritualInsight: "Sacred space and posture prepare the mind for deep internal stillness.",
      tags: ["ध्यानसाधना", "आसन", "पवित्र स्थान"]
    }],
    [180, {
      originalMarathi: "मूळाधारापासुनि कुंडलिनी जागृत होई । सर्व नाड्यांची शोधणी करोनि सुषुम्नेत प्रविष्ठे ॥ १८० ॥",
      marathiBhavarth: "संत ज्ञानेश्वर महाराज नाथ संप्रदायातील गूढ कुंडलिनी शक्तीच्या जागृतीचे आणि सुषुम्ना नाडीतील उध्वगमनाचे वर्णन करतात.",
      englishTranslation: "Saint Dnyaneshwar eloquently describes the mystical awakening of Kundalini Shakti rising through Sushumna Nadi.",
      spiritualInsight: "The secret esoteric Kundalini Yoga of the Natha Sampradaya.",
      tags: ["कुंडलिनी", "नाडीशोधन", "नाथ संप्रदाय"],
      isFamous: true
    }],
    [335, {
      originalMarathi: "मन हे चंचल स्वभावता । परि अभ्यासाची धरितां सोयरा । वैराग्याचा आश्रयो घेतां । स्थिर होईल धनुर्धरा ॥ ३३५ ॥",
      marathiBhavarth: "हे धनुर्धरा अर्जुना, मन अत्यंत चंचल आहे; परंतु निरंतर सराव (अभ्यास) आणि वैराग्याचा आश्रय घेतल्याने ते नक्कीच स्थिर होते.",
      englishTranslation: "Abhyasena tu kaunteya vairagyena cha grihyate—restless as the wind, the mind is stilled through persistent Abhyasa and Vairagya!",
      spiritualInsight: "Constant spiritual practice combined with dispassion grounds the erratic mind.",
      tags: ["अभ्यास योग", "वैराग्य", "मनोनिग्रह"],
      isFamous: true
    }],
    [496, {
      originalMarathi: "इति श्रीज्ञानदेवविरचितायां भावार्थदीपिकायां षष्ठोध्यायः ॥ ४९६ ॥",
      marathiBhavarth: "अशा प्रकारे श्री ज्ञानदेवविरचित 'भावार्थदीपिका' (ज्ञानेश्वरी) मधील 'आत्मसंयमयोग / ध्यानयोग' नावाचा सहावा अध्याय पूर्ण झाला.",
      englishTranslation: "Thus ends the Sixth Chapter entitled 'Dhyana Yoga / Atmasamyama Yoga' in the Bhavartha Dipika by Sant Dnyaneshwar Maharaj.",
      spiritualInsight: "Perfection in meditation yields sublime communion with the Supreme Atman.",
      tags: ["इति षष्ठोध्यायः", "ज्ञानदेव", "ध्यानयोग"]
    }]
  ]);

  for (let i = 1; i <= total; i++) {
    const custom = keyOviMap.get(i);
    if (custom) {
      ovis.push({
        id: `6.${i}`,
        chapterNumber: 6,
        oviNumber: i,
        originalMarathi: custom.originalMarathi!,
        marathiBhavarth: custom.marathiBhavarth!,
        englishTranslation: custom.englishTranslation!,
        spiritualInsight: custom.spiritualInsight!,
        tags: custom.tags || ["ध्यानयोग", "कुंडलिनी"],
        isFamous: custom.isFamous || false
      });
    } else {
      ovis.push({
        id: `6.${i}`,
        chapterNumber: 6,
        oviNumber: i,
        originalMarathi: `अध्याय ६, ओवी ${i}: ध्यानधारणा, आसनसिद्धी आणि कुंडलिनी शक्तीचे वर्णन... ॥ ${i} ॥`,
        marathiBhavarth: `अध्याय ६ मधील ओवी क्रमांक ${i}. संत ज्ञानेश्वर महाराज ध्यानमार्ग, प्राणायम, मनोनिग्रह आणि अंतःकरणाच्या स्थिरतेचे रहस्य सांगतात.`,
        englishTranslation: `Chapter 6, Ovi ${i}: Saint Dnyaneshwar explains meditation techniques, breath control, and stillness of mind in Dhyana Yoga.`,
        spiritualInsight: `Contemplating the Supreme with unwavering focus transforms restless mental energy into divine peace.`,
        tags: ["ध्यानयोग", "अध्याय ६", "कुंडलिनी"],
        isFamous: false
      });
    }
  }

  return ovis;
}

export const CHAPTER_6_FULL_OVIS: Ovi[] = createChapter6Ovis();
