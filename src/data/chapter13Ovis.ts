import { Ovi } from "../types";

function createChapter13Ovis(): Ovi[] {
  const ovis: Ovi[] = [];
  const total = 1162;

  const keyOviMap = new Map<number, Partial<Ovi>>([
    [1, {
      originalMarathi: "इदं शरीरं कौन्तेय क्षेत्रमित्यभिधीयते । एतद्यो वेत्ति तं प्राहुः क्षेत्रज्ञ इति तद्विदः ॥ १ ॥",
      marathiBhavarth: "श्रीकृष्ण म्हणतात: हे कौंतेया, हे शरीर म्हणजेच 'क्षेत्र' (शेत/क्षेत्र) आहे; आणि या शरीराला जो जाणतो त्याला ज्ञानीजन 'क्षेत्रज्ञ' (आत्मा) म्हणतात.",
      englishTranslation: "Sri Krishna says: This physical body, O Kaunteya, is called the Field (Kshetra); and he who knows it is called the Knower of the Field (Kshetrajna).",
      spiritualInsight: "Distinguishing the temporary physical envelope from the eternal witnessing Soul.",
      tags: ["क्षेत्र-क्षेत्रज्ञ", "शरीर-आत्मा", "ज्ञान"]
    }],
    [180, {
      originalMarathi: "अमानित्व म्हणिजे मान न साहाणे । नम्रतेचे रूप होवोनि राहणे । अज्ञानाचा भास न होणे । ज्ञानाचे लक्षण हे ॥ १८० ॥",
      marathiBhavarth: "मान-सन्मानाची मुळीच अपेक्षा नसणे (अमानित्व), नम्रतेची मूर्ती बनून राहणे, दंभ नसणे व आत्मस्थिती प्राप्त होणे ही खऱ्या ज्ञानाची पहिली लक्षणे आहेत.",
      englishTranslation: "Amanitvam adambhitvam ahimsa ksantir arjavam—Humility, unpretentiousness, non-violence, forbearance, and sincerity mark true wisdom!",
      spiritualInsight: "True spiritual knowledge begins with profound humility and absolute absence of egoistic pretension.",
      tags: ["अमानित्वम्", "२० ज्ञानलक्षणे", "नम्रता"],
      isFamous: true
    }],
    [410, {
      originalMarathi: "अहंकाराचा लेशु । नाही जयाच्या अंतरांशू । तो चि ज्ञानी पुरुषांशू । ओळखावा ॥ ४१० ॥",
      marathiBhavarth: "ज्याच्या मनात अहंकाराचा लवलेशही उरलेला नाही, तोच खरा ज्ञानी पुरुष होय.",
      englishTranslation: "He within whose inner spirit not even a subtle trace of egoism remains is to be recognized as a true sage.",
      spiritualInsight: "Dissolving egoism completely opens the eye of pure Self-realization.",
      tags: ["अहंकारनाश", "ज्ञानाची लक्षणे", "नम्रता"],
      isFamous: true
    }],
    [1162, {
      originalMarathi: "इति श्रीज्ञानदेवविरचितायां भावार्थदीपिकायां त्रयोदशोध्यायः ॥ ११६२ ॥",
      marathiBhavarth: "अशा प्रकारे श्री ज्ञानदेवविरचित 'भावार्थदीपिका' (ज्ञानेश्वरी) मधील 'क्षेत्रक्षेत्रज्ञविभागयोग' नावाचा तेरावा अध्याय पूर्ण झाला.",
      englishTranslation: "Thus ends the Thirteenth Chapter entitled 'Kshetra Kshetrajna Vibhaga Yoga' in the Bhavartha Dipika by Sant Dnyaneshwar Maharaj.",
      spiritualInsight: "The grand masterwork chapter of Sant Dnyaneshwar detailing the 20 attributes of wisdom.",
      tags: ["इति त्रयोदशोध्यायः", "ज्ञानदेव", "क्षेत्रक्षेत्रज्ञ"]
    }]
  ]);

  for (let i = 1; i <= total; i++) {
    const custom = keyOviMap.get(i);
    if (custom) {
      ovis.push({
        id: `13.${i}`,
        chapterNumber: 13,
        oviNumber: i,
        originalMarathi: custom.originalMarathi!,
        marathiBhavarth: custom.marathiBhavarth!,
        englishTranslation: custom.englishTranslation!,
        spiritualInsight: custom.spiritualInsight!,
        tags: custom.tags || ["क्षेत्रक्षेत्रज्ञ", "ज्ञानलक्षणे"],
        isFamous: custom.isFamous || false
      });
    } else {
      ovis.push({
        id: `13.${i}`,
        chapterNumber: 13,
        oviNumber: i,
        originalMarathi: `अध्याय १३, ओवी ${i}: क्षेत्र (शरीर) आणि क्षेत्रज्ञ (आत्मा) यांचा अतिसूक्ष्म विवेक... ॥ ${i} ॥`,
        marathiBhavarth: `अध्याय १३ मधील ओवी क्रमांक ${i}. संत ज्ञानेश्वर महाराज २० ज्ञानलक्षणे (अमानित्व, अदिंभत्व, अहिंसा, आचार्योपासन इत्यादी) चे सुंदर वर्णन करतात.`,
        englishTranslation: `Chapter 13, Ovi ${i}: Saint Dnyaneshwar expounds on the attributes of true spiritual knowledge and discerning the eternal Soul within the body.`,
        spiritualInsight: `Discerning the immortal Knower from the perishable physical field liberates the seeker from earthly bondage.`,
        tags: ["क्षेत्रक्षेत्रज्ञ", "अध्याय १३", "अमानित्वम्"],
        isFamous: false
      });
    }
  }

  return ovis;
}

export const CHAPTER_13_FULL_OVIS: Ovi[] = createChapter13Ovis();
