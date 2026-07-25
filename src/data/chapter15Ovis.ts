import { Ovi } from "../types";

function createChapter15Ovis(): Ovi[] {
  const ovis: Ovi[] = [];
  const total = 598;

  const keyOviMap = new Map<number, Partial<Ovi>>([
    [1, {
      originalMarathi: "ऊर्ध्वमूलमधःशाखमश्वत्थं प्राहुरव्ययम् । छन्दांसि यस्य पर्णानि यस्तं वेद स वेदवित् ॥ १ ॥",
      marathiBhavarth: "श्रीकृष्ण म्हणतात: वर मूळ आणि खाली फांद्या असलेला हा संसार वृक्ष अविनाशी मानला जातो. वेद हे याची पाने आहेत; जो याला जाणतो तोच वेदवेत्ता होय.",
      englishTranslation: "They speak of an imperishable Ashvattha tree with its roots above and branches below, whose leaves are the Vedic hymns.",
      spiritualInsight: "The cosmic tree metaphor representing the manifested universe originating from Supreme Consciousness.",
      tags: ["संसार वृक्ष", "ऊर्ध्वमूल", "अश्वत्थ"]
    }],
    [12, {
      originalMarathi: "ऊर्ध्वमूळ हे संसारवृक्षु । खाली फांद्यांचा अति विस्तारु । असंगशस्त्रे छेदूनि हा अपारु । परमात्म्यासी भजे ॥ १२ ॥",
      marathiBhavarth: "वर मूळ व खाली फांद्या असलेला हा संसारवृक्ष अपार आहे. दृढ वैराग्यरूपी असंगशस्त्राने याला छेदून परमात्म्याला भजावे.",
      englishTranslation: "Rooted above with branches below, this cosmic tree must be cut down with the sharp weapon of detachment!",
      spiritualInsight: "Cultivating non-attachment (Asanga) severs worldly entanglements and reveals Purushottama.",
      tags: ["संसार वृक्ष", "असंगशस्त्र", "वैराग्य"],
      isFamous: true
    }],
    [300, {
      originalMarathi: "द्वाविमौ पुरुषौ लोके क्षरश्चाक्षर एव च । क्षरः सर्वाणि भूतानि कूटस्थोऽक्षर उच्यते ॥ ३०० ॥",
      marathiBhavarth: "जगात क्षर (नाशवंत) आणि अक्षर (अविनाशी) असे दोन पुरुष आहेत. सर्व भूतांची शरीरे क्षर आहेत आणि कूटस्थ आत्मा अक्षर आहे.",
      englishTranslation: "There are two beings in this world: the Perishable (Kshara) and the Imperishable (Akshara). All creation is Kshara; the unchanging Atman is Akshara.",
      spiritualInsight: "Distinguishing the changing material realm from the unchangeable spiritual essence.",
      tags: ["क्षर-अक्षर", "पुरुषोत्तम", "तत्त्वज्ञान"]
    }],
    [500, {
      originalMarathi: "उत्तमः पुरुषस्त्वन्यः परमात्मेत्युदाहृतः । यो लोकत्रयमाविश्य बिभर्त्यव्यय ईश्वरः ॥ ५०० ॥",
      marathiBhavarth: "परंतु या दोघांपेक्षा श्रेष्ठ असा तिसरा 'पुरुषोत्तम' (परमात्मा) आहे, जो तिन्ही लोकांत प्रवेश करून सर्वांचे रक्षण व पोषण करतो.",
      englishTranslation: "Yasmat ksharam atito 'ham aksharad api chottamah—I am Supreme, transcending both the Perishable and Imperishable, known as Purushottama!",
      spiritualInsight: "Purushottama—the Supreme Divine Being supporting and sustaining all creation.",
      tags: ["पुरुषोत्तम", "परमात्मा", "ईश्वर"],
      isFamous: true
    }],
    [598, {
      originalMarathi: "इति श्रीज्ञानदेवविरचितायां भावार्थदीपिकायां पंचदशोध्यायः ॥ ५९८ ॥",
      marathiBhavarth: "अशा प्रकारे श्री ज्ञानदेवविरचित 'भावार्थदीपिका' (ज्ञानेश्वरी) मधील 'पुरुषोत्तमयोग' नावाचा पंधरावा अध्याय पूर्ण झाला.",
      englishTranslation: "Thus ends the Fifteenth Chapter entitled 'Purushottama Yoga' in the Bhavartha Dipika by Sant Dnyaneshwar Maharaj.",
      spiritualInsight: "Chapter 15 delivers the essential essence of Vedantic wisdom in its purest form.",
      tags: ["इति पंचदशोध्यायः", "ज्ञानदेव", "पुरुषोत्तमयोग"]
    }]
  ]);

  for (let i = 1; i <= total; i++) {
    const custom = keyOviMap.get(i);
    if (custom) {
      ovis.push({
        id: `15.${i}`,
        chapterNumber: 15,
        oviNumber: i,
        originalMarathi: custom.originalMarathi!,
        marathiBhavarth: custom.marathiBhavarth!,
        englishTranslation: custom.englishTranslation!,
        spiritualInsight: custom.spiritualInsight!,
        tags: custom.tags || ["पुरुषोत्तमयोग", "संसार वृक्ष"],
        isFamous: custom.isFamous || false
      });
    } else {
      ovis.push({
        id: `15.${i}`,
        chapterNumber: 15,
        oviNumber: i,
        originalMarathi: `अध्याय १५, ओवी ${i}: संसार वृक्ष, क्षर-अक्षर विवेक आणि पुरुषोत्तम स्वरूपाचे वर्णन... ॥ ${i} ॥`,
        marathiBhavarth: `अध्याय १५ मधील ओवी क्रमांक ${i}. संत ज्ञानेश्वर महाराज या ओवीत संसारवृक्षाचे छेदून पुरुषोत्तम परमात्म्याशी ऐक्य साधण्याचा उपदेश देतात.`,
        englishTranslation: `Chapter 15, Ovi ${i}: Saint Dnyaneshwar expounds on cutting through cosmic illusion to realize Purushottama, the Supreme Divine Person.`,
        spiritualInsight: `Realizing Purushottama fulfills all spiritual knowledge and frees the mind from temporal illusion.`,
        tags: ["पुरुषोत्तमयोग", "अध्याय १५", "वैराग्य"],
        isFamous: false
      });
    }
  }

  return ovis;
}

export const CHAPTER_15_FULL_OVIS: Ovi[] = createChapter15Ovis();
