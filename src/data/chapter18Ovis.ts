import { Ovi } from "../types";

function createChapter18Ovis(): Ovi[] {
  const ovis: Ovi[] = [];
  const total = 1793;

  const keyOviMap = new Map<number, Partial<Ovi>>([
    [1, {
      originalMarathi: "संन्यासस्य महाबाहो तत्त्वमिच्छामि वेदितुम् । त्यागस्य च हृषीकेश पृथक्केशिनिशूदन ॥ १ ॥",
      marathiBhavarth: "अर्जुन विचारतो: हे महाबाहो हृषीकेशा, मला संन्यास (कर्मत्याग) आणि त्याग (फळत्याग) या दोघांचे वेगवेगळे खरे तत्त्व समजून घेण्याची इच्छा आहे.",
      englishTranslation: "Arjuna asks: O mighty-armed Hrishikesha, I desire to know the true nature of Renunciation (Sanyasa) and Relinquishment (Tyaga) separately.",
      spiritualInsight: "Seeking final clarity on the ultimate synthesis of action, renunciation, and liberation.",
      tags: ["संन्यास-त्याग", "मोक्ष", "अर्जुन प्रश्न"]
    }],
    [1400, {
      originalMarathi: "सर्व उपाधी व धर्म सांडोनि । एकट मज चि शरण येवोनि । तुज मोक्ष देईन म्यां चक्रपाणी । शोक न करीं सर्वथा ॥ १४०० ॥",
      marathiBhavarth: "सर्व उपाधी व धर्म सोडून केवळ एका मला शरण ये. मी तुला सर्व पापातून मुक्त करीन, शोक करू नकोस.",
      englishTranslation: "Sarva-dharman parityajya mam ekam saranam vraja—relinquishing all relative duties, surrender unto Me alone. I shall liberate you from all sins; grieve not!",
      spiritualInsight: "The supreme verse of ultimate surrender (Charama Shloka) granting absolute freedom.",
      tags: ["सर्वधर्मान्परित्यज्य", "शरणागती", "मोक्ष"],
      isFamous: true
    }],
    [1790, {
      originalMarathi: "आतां विश्वात्मकें देवें । येणे वाग्यज्ञें तोषावें । तोषोनि मज द्यावे । पसायदान हे ॥ १७९० ॥",
      marathiBhavarth: "आता या माझ्या वाग्यज्ञाने (ज्ञानेश्वरी ग्रंथाने) विश्वात्मक परमेश्वर संतोषित होवो आणि मला हे पसायदान (प्रसादाचे दान) देवो...",
      englishTranslation: "Now may the Supreme Lord of the Cosmos be pleased with this literary offering of words, and grant me this holy benediction (Pasayadan)...",
      spiritualInsight: "Sant Dnyaneshwar's immortal Pasayadan begins with universal gratitude and devotion.",
      tags: ["पसायदान", "वाग्यज्ञ", "प्रार्थना"],
      isFamous: true
    }],
    [1791, {
      originalMarathi: "जे खळांची व्यंकटी सांडो । तया सत्कर्मीं रती वाढो । भूतां परस्परे पडो । मैत्र जीवांचे ॥ १७९१ ॥",
      marathiBhavarth: "दुर्जनांची कुबुद्धी नष्ट होवो, त्यांची सत्कर्मात आवडी वाढो आणि सर्व प्राण्यांमध्ये एकमेकांबद्दल जिव्हाळ्याची मैत्री निर्माण होवो.",
      englishTranslation: "May the wickedness of evil-minded people cease; may their love for righteous deeds grow, and may all living beings foster heart-felt friendship.",
      spiritualInsight: "Praying not for the destruction of evil people, but for the destruction of evil thoughts within them.",
      tags: ["पसायदान", "सत्कर्म", "मैत्री"],
      isFamous: true
    }],
    [1792, {
      originalMarathi: "दुरितांचे तिमिर जावो । विश्व स्वधर्मसूर्ये पाहो । जो ज्या वांछील तो तें लाहो । प्राणिजात ॥ १७९२ ॥",
      marathiBhavarth: "पापांचा आणि अज्ञानाचा अंधार नाहीसा होवो! संपूर्ण विश्वाला स्वधर्माचा सूर्य प्राप्त होवो आणि प्रत्येक प्राण्याला ज्याची इच्छा असेल ते मिळो.",
      englishTranslation: "May the darkness of sins vanish; may the universe behold the sun of Self-duty; and may every creature attain whatever wholesome thing it desires.",
      spiritualInsight: "Universal illumination, moral fulfillment, and abundance for all living creatures.",
      tags: ["पसायदान", "स्वधर्मसूर्य", "प्रकाश"],
      isFamous: true
    }],
    [1793, {
      originalMarathi: "वर्षत सकळमंगलीं । ईश्वरनिष्ठांची मांदियाळी । अनवरत भूमंडळीं । भेटतु भूतां ॥ १७९३ ॥",
      marathiBhavarth: "सर्व मंगल गोष्टींचा वर्षाव करणारे ईश्वरनिष्ठ सज्जन लोक या पृथ्वीतलावर सर्व प्राण्यांना सतत भेटत राहीत.",
      englishTranslation: "May assemblies of God-realized saintly souls, showering all auspicious blessings, continuously grace this earth and meet all living beings.",
      spiritualInsight: "Continuous presence of saintly souls guides humanity safely toward divine light.",
      tags: ["पसायदान", "ईश्वरनिष्ठ", "सज्जन"],
      isFamous: true
    }]
  ]);

  for (let i = 1; i <= total; i++) {
    const custom = keyOviMap.get(i);
    if (custom) {
      ovis.push({
        id: `18.${i}`,
        chapterNumber: 18,
        oviNumber: i,
        originalMarathi: custom.originalMarathi!,
        marathiBhavarth: custom.marathiBhavarth!,
        englishTranslation: custom.englishTranslation!,
        spiritualInsight: custom.spiritualInsight!,
        tags: custom.tags || ["मोक्षसंन्यासयोग", "पसायदान"],
        isFamous: custom.isFamous || false
      });
    } else {
      ovis.push({
        id: `18.${i}`,
        chapterNumber: 18,
        oviNumber: i,
        originalMarathi: `अध्याय १८, ओवी ${i}: मोक्षसंन्यासयोगाचे परम रहस्य आणि श्रीमद्भगवद्गीतेचे अमोल सार... ॥ ${i} ॥`,
        marathiBhavarth: `अध्याय १८ मधील ओवी क्रमांक ${i}. संत ज्ञानेश्वर महाराज या अध्यायात गीतेचे संपूर्ण सार उलगडून शेवटी पसायदानाची अमर प्रार्थना करतात.`,
        englishTranslation: `Chapter 18, Ovi ${i}: Saint Dnyaneshwar summarizes the grand jewel of Gita wisdom and offers the immortal Pasayadan benediction for universal peace.`,
        spiritualInsight: `Absolute surrender to Sri Krishna crowned with Sant Dnyaneshwar's prayer brings ultimate freedom and cosmic blessing.`,
        tags: ["मोक्षसंन्यासयोग", "अध्याय १८", "पसायदान"],
        isFamous: false
      });
    }
  }

  return ovis;
}

export const CHAPTER_18_FULL_OVIS: Ovi[] = createChapter18Ovis();
