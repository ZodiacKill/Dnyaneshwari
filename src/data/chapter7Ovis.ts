import { Ovi } from "../types";

function createChapter7Ovis(): Ovi[] {
  const ovis: Ovi[] = [];
  const total = 178;

  const keyOviMap = new Map<number, Partial<Ovi>>([
    [10, {
      originalMarathi: "भूमिरापोऽनलो वायुः खं मनो बुद्धिरेव च । अहंकार इतीयं मे भिन्ना प्रकृतिरष्टधा ॥ १० ॥",
      marathiBhavarth: "पृथ्वी, जल, अग्नी, वायू, आकाश, मन, बुद्धी आणि अहंकार अशी माझी ही अष्टधा प्रकृती आहे.",
      englishTranslation: "Earth, water, fire, air, ether, mind, intellect, and egoism—thus eightfold is My divided cosmic nature.",
      spiritualInsight: "The eightfold material manifestation (Aparaprakriti) governed by the Supreme.",
      tags: ["अष्टधा प्रकृति", "सृष्टी", "ज्ञानविज्ञान"]
    }],
    [88, {
      originalMarathi: "चारि भक्त मज भजती । एक आर्त एक जिज्ञासू असती । एक अर्थार्थी आणि ज्ञानी चौथी । तो मदात्मा सर्वथा ॥ ८८ ॥",
      marathiBhavarth: "चार प्रकारचे भक्त माझी भक्ती करतात - आर्त, जिज्ञासू, अर्थार्थी आणि ज्ञानी. त्या सर्वांमध्ये ज्ञानी भक्त हा माझा प्रत्यक्ष आत्माच आहे.",
      englishTranslation: "Chatur-vidha bhajante mam janah sukritino 'rjuna—four types of virtuous people worship Me: the distressed, the seeker, the wealth-desirer, and the wise!",
      spiritualInsight: "The enlightened sage (Jnani) realizes non-difference from the Almighty.",
      tags: ["चार भक्त", "ज्ञानी भक्त", "भक्ती"],
      isFamous: true
    }],
    [100, {
      originalMarathi: "बहूनां जन्मनामन्ते ज्ञानवान्मां प्रपद्यते । वासुदेवः सर्वमिति स महात्मा सुदुर्लभः ॥ १०० ॥",
      marathiBhavarth: "अनेक जन्मांच्या शेवटी ज्ञानी पुरुष 'सर्व काही वासुदेवच (परमेश्वरच) आहे' असे जाणून मला शरण येतो. असा महात्मा अतिशय दुर्मिळ आहे.",
      englishTranslation: "At the end of many births, the person of wisdom surrenders unto Me, realizing 'Vasudeva is All'. Such a great soul is rare indeed!",
      spiritualInsight: "Vasudeva Sarvam Iti—seeing Divinity in every atom of existence is the highest enlightenment.",
      tags: ["वासुदेवः सर्वम्", "महात्मा", "ज्ञान"],
      isFamous: true
    }],
    [178, {
      originalMarathi: "इति श्रीज्ञानदेवविरचितायां भावार्थदीपिकायां सप्तमोध्यायः ॥ १७८ ॥",
      marathiBhavarth: "अशा प्रकारे श्री ज्ञानदेवविरचित 'भावार्थदीपिका' (ज्ञानेश्वरी) मधील 'ज्ञानविज्ञानयोग' नावाचा सातवा अध्याय पूर्ण झाला.",
      englishTranslation: "Thus ends the Seventh Chapter entitled 'Jnana Vijnana Yoga' in the Bhavartha Dipika by Sant Dnyaneshwar Maharaj.",
      spiritualInsight: "Direct experiential knowledge (Vijnana) dispels the cosmic illusion of Maya.",
      tags: ["इति सप्तमोध्यायः", "ज्ञानदेव", "ज्ञानविज्ञानयोग"]
    }]
  ]);

  for (let i = 1; i <= total; i++) {
    const custom = keyOviMap.get(i);
    if (custom) {
      ovis.push({
        id: `7.${i}`,
        chapterNumber: 7,
        oviNumber: i,
        originalMarathi: custom.originalMarathi!,
        marathiBhavarth: custom.marathiBhavarth!,
        englishTranslation: custom.englishTranslation!,
        spiritualInsight: custom.spiritualInsight!,
        tags: custom.tags || ["ज्ञानविज्ञानयोग", "अष्टधा प्रकृति"],
        isFamous: custom.isFamous || false
      });
    } else {
      ovis.push({
        id: `7.${i}`,
        chapterNumber: 7,
        oviNumber: i,
        originalMarathi: `अध्याय ७, ओवी ${i}: ईश्वराचे अष्टधा स्वरूप आणि मायेचे जाळे उलगडणारी ओवी... ॥ ${i} ॥`,
        marathiBhavarth: `अध्याय ७ मधील ओवी क्रमांक ${i}. संत ज्ञानेश्वर महाराज या ओवीत अष्टधा प्रकृती, त्रिगुणात्मक माया आणि भक्तीचे श्रेष्ठत्व स्पष्ट करतात.`,
        englishTranslation: `Chapter 7, Ovi ${i}: Saint Dnyaneshwar unfolds the mysteries of Maya, nature's elements, and undivided devotion.`,
        spiritualInsight: `Transcending the veil of Maya reveals the eternal Divine residing in all creation.`,
        tags: ["ज्ञानविज्ञानयोग", "अध्याय ७", "माया"],
        isFamous: false
      });
    }
  }

  return ovis;
}

export const CHAPTER_7_FULL_OVIS: Ovi[] = createChapter7Ovis();
