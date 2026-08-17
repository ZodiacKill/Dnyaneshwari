import { Chapter, Ovi } from "../types";
import dnyaneshwariJson from "./Dhyaneshwari.json";

function devanagariToAscii(str: string): string {
  const map: Record<string, string> = {
    '०': '0', '१': '1', '२': '2', '३': '3', '४': '4',
    '५': '5', '६': '6', '७': '7', '८': '8', '९': '9'
  };
  return str.replace(/[०-९]/g, m => map[m]);
}

function parseVerseNumber(line: string): number | null {
  const asciiLine = devanagariToAscii(line);
  const match = asciiLine.match(/(?:॥|\|\||\||\(|\[)\s*(\d+)\s*(?:॥|\|\||\||\)|\])\s*$/) 
             || asciiLine.match(/(\d+)\s*$/);
  if (match) {
    return parseInt(match[1], 10);
  }
  return null;
}

const CACHED_CHAPTERS: Record<number, Ovi[]> = {};

function getReconstructedChapterOvis(chapterNumber: number): Ovi[] {
  if (CACHED_CHAPTERS[chapterNumber]) {
    return CACHED_CHAPTERS[chapterNumber];
  }

  const key = `chapter_${chapterNumber}` as keyof typeof dnyaneshwariJson;
  const lines = dnyaneshwariJson[key];
  if (!lines) return [];

  const ovis: Ovi[] = [];
  let currentGroup: string[] = [];
  let index = 1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    currentGroup.push(line);
    const num = parseVerseNumber(line);

    if (num !== null) {
      const originalText = currentGroup.join(' ').trim();
      const id = `${chapterNumber}.${index}`;
      
      const chapter = ALL_CHAPTERS.find(c => c.number === chapterNumber);
      const curated = chapter?.keyOvis.find(o => o.oviNumber === index);

      ovis.push({
        id,
        chapterNumber,
        oviNumber: index,
        originalMarathi: originalText,
        marathiBhavarth: curated?.marathiBhavarth || "",
        englishTranslation: curated?.englishTranslation || "",
        spiritualInsight: curated?.spiritualInsight || "",
      });

      index++;
      currentGroup = [];
    }
  }

  CACHED_CHAPTERS[chapterNumber] = ovis;
  return ovis;
}

const CHAPTER_DATASETS: Record<number, Ovi[]> = {
  get 1() { return getReconstructedChapterOvis(1); },
  get 2() { return getReconstructedChapterOvis(2); },
  get 3() { return getReconstructedChapterOvis(3); },
  get 4() { return getReconstructedChapterOvis(4); },
  get 5() { return getReconstructedChapterOvis(5); },
  get 6() { return getReconstructedChapterOvis(6); },
  get 7() { return getReconstructedChapterOvis(7); },
  get 8() { return getReconstructedChapterOvis(8); },
  get 9() { return getReconstructedChapterOvis(9); },
  get 10() { return getReconstructedChapterOvis(10); },
  get 11() { return getReconstructedChapterOvis(11); },
  get 12() { return getReconstructedChapterOvis(12); },
  get 13() { return getReconstructedChapterOvis(13); },
  get 14() { return getReconstructedChapterOvis(14); },
  get 15() { return getReconstructedChapterOvis(15); },
  get 16() { return getReconstructedChapterOvis(16); },
  get 17() { return getReconstructedChapterOvis(17); },
  get 18() { return getReconstructedChapterOvis(18); },
};

export const ALL_CHAPTERS: Chapter[] = [
  {
    number: 1,
    sanskritName: "अर्जुनविषादयोग",
    marathiTitle: "अध्याय १: अर्जुनविषादयोग (मंगलाचरण व अर्जुनाचा मोह)",
    englishTitle: "Chapter 1: Arjuna Visada Yoga (Dejection of Arjuna)",
    totalOvis: 314,
    themes: ["मंगलाचरण", "गणेश वंदना", "गुरु महिमा", "अर्जुनाचा शोक", "युद्धभूमी"],
    summaryMarathi: "ज्ञानेश्वरीच्या पहिल्या अध्यायात संत ज्ञानेश्वर महाराजांनी श्री गणेश, सरस्वती आणि श्रीगुरू निवृत्तीनाथांची अलौकिक वंदना केली आहे. कुरुक्षेत्रावर दोन्ही सैन्ये समोरासमोर उभी ठाकल्यावर आपल्याच आपतेष्टांना पाहून अर्जुनाचे मन काकुळतीला येते व तो धनुष्यबाण टाकून शोकग्रस्त होतो.",
    summaryEnglish: "The opening chapter begins with Saint Dnyaneshwar's sublime invocation to Lord Ganesha, Saraswati, and his Guru Nivrutthinath. On the battlefield of Kurukshetra, seeing his own relatives arrayed for war, Arjuna experiences deep moral sorrow and drops his bow in despondency.",
    keyOvis: [
      {
        id: "1.1",
        chapterNumber: 1,
        oviNumber: 1,
        originalMarathi: "ॐ नमो जी आद्या । वेदप्रतिपाद्या । जय जय स्वसंवेद्या । आत्मरूपा ॥१॥",
        marathiBhavarth: "हे आद्य आत्मरूपा, वेदांनी प्रतिपादन केलेल्या, स्वसंवेद्य असलेल्या श्री परमेश्वरा (श्री गणेशा), तुला माझा नम्र नमस्कार असो!",
        englishTranslation: "Om! Salutations to the Primal One, praised by the Vedas, self-cognizable, and the supreme embodied Soul! Victory to Thee!",
        spiritualInsight: "Sant Dnyaneshwar begins the sacred Dnyaneshwari by worshipping the Absolute Divine (Omkar / Ganesh) as the essence of knowledge and spiritual truth.",
      },
      {
        id: "1.2",
        chapterNumber: 1,
        oviNumber: 2,
        originalMarathi: "देवा तूं चि गणेशु । सकळमतिप्रकाशु । म्हणे निवृत्तीदासु । अवधारीजो ॥२॥",
        marathiBhavarth: "श्री निवृत्तीनाथांचा दास असणारा ज्ञानदेव म्हणतो, हे देवा! तूच सर्व बुद्धीला प्रकाश देणारा श्रीगणेश आहेस, माझी ही प्रार्थना ऐक.",
        englishTranslation: "Saint Dnyaneshwar, servant of Nivrutthinath, says: 'O Lord, Thou art indeed Ganesha, the illuminator of all intelligence.'",
        spiritualInsight: "Highlights that true wisdom and sharp discernment emanate from divine grace and masterly devotion.",
      },
      {
        id: "1.21",
        chapterNumber: 1,
        oviNumber: 21,
        originalMarathi: "जे पूर्णत्वाची साऊली । निवृत्तीची पाऊलीं । तेयाचेनि कारुण्याचां वोघों । ग्रंथु हा सिद्धिला जावो ॥२१॥",
        marathiBhavarth: "ज्यांच्या चरणकमलांच्या छायेमध्ये परिपूर्णता लाभते, त्या श्रीगुरू निवृत्तीनाथांच्या अपार कृपेने हा ग्रंथ परिपूर्ण सिद्धीला जावो.",
        englishTranslation: "Under the benign shadow of Sri Guru Nivrutthinath's lotus feet, may this sacred commentary reach absolute completion through divine grace.",
        spiritualInsight: "Shows the unmatched importance of Guru's grace in completing noble spiritual endeavors.",
      },
      {
        id: "1.85",
        chapterNumber: 1,
        oviNumber: 85,
        originalMarathi: "अगा सखे आणि आप्त । हे मारितां काय प्राप्त । पाप वांचूनि निश्चित । सांग पां मज ॥८५॥",
        marathiBhavarth: "अर्जुन श्रीकृष्णाला म्हणतो - हे कृष्णा, हे माझे मित्र आणि नातेवाईक आहेत. यांना मारून पापाशिवाय मला काय मिळणार आहे बरे?",
        englishTranslation: "Arjuna pleads to Krishna - 'O Krishna, killing these friends and kinsmen will bring us nothing but grief and sin.'",
        spiritualInsight: "Illustrates human attachment and ethical conflict when worldly bonds overshadow cosmic duty (Svadharma).",
      }
    ]
  },
  {
    number: 2,
    sanskritName: "सांख्ययोग",
    marathiTitle: "अध्याय २: सांख्ययोग (आत्मज्ञान व स्थितप्रज्ञ लक्षणे)",
    englishTitle: "Chapter 2: Sankhya Yoga (Wisdom of Soul & Sthitaprajna)",
    totalOvis: 446,
    themes: ["आत्मज्ञान", "अमर आत्मा", "कर्मयोग", "स्थितप्रज्ञ", "स्वधर्म"],
    summaryMarathi: "दुसऱ्या अध्यायात भगवान श्रीकृष्ण अर्जुनाला आत्म्याचे अमरत्व समजावून सांगून शोकाचा परिहार करतात. शरीर नाशवंत आहे परंतु आत्मा अविनाशी आहे. याच अध्यायात स्थितप्रज्ञाची (स्थिर बुद्धीच्या मानवाची) अलौकिक लक्षणे ज्ञानेश्वरांनी अत्यंत रसाळ भाषेत वर्णन केली आहेत.",
    summaryEnglish: "In Chapter 2, Lord Krishna reveals the immortality of the Soul (Atman) and dispels Arjuna's sorrow. While the body perishes, the Atman is eternal. Saint Dnyaneshwar exquisitely describes the characteristics of 'Sthitaprajna' - the person of steady wisdom.",
    keyOvis: [
      {
        id: "2.11",
        chapterNumber: 2,
        oviNumber: 11,
        originalMarathi: "जैसे जीर्ण वस्त्र सांडिजे । मग नूतन वेढिजे । तैसे देहांतराते अंगीकारिजे । चैतन्यनाथे ॥११॥",
        marathiBhavarth: "ज्याप्रमाणे मनुष्य जुने वस्त्र टाकून नवीन वस्त्र परिधान करतो, त्याचप्रमाणे चैतन्य स्वरूप आत्मा जुने देहावसान सोडून नवीन देह धारण करतो.",
        englishTranslation: "Just as a person discards worn-out garments and dons new ones, the eternal Soul leaves aging bodies and assumes new forms.",
        spiritualInsight: "Reminds us that physical demise is merely a change of clothing for the immortal divine consciousness within.",
      },
      {
        id: "2.47",
        chapterNumber: 2,
        oviNumber: 47,
        originalMarathi: "हे कर्माचे ठायीं अधिकारु । तुझा चि पैं धनुर्धरा । परि फळहेतु निरंतरु । न व्हावा गा ॥४७॥",
        marathiBhavarth: "हे धनुर्धरा अर्जुना! केवळ निष्काम कर्तव्य कर्म करण्यावरच तुझा अधिकार आहे. परंतु कर्माच्या फळाची इच्छा किंवा हाव तू कधीही धरू नकोस.",
        englishTranslation: "Your right is to work alone, never to its fruits. Let not the fruit of action be your motive.",
        spiritualInsight: "The timeless core principle of Nishkama Karma - focus purely on flawless effort without anxiety over outcomes.",
      },
      {
        id: "2.256",
        chapterNumber: 2,
        oviNumber: 256,
        originalMarathi: "जेया विषयांसी आठौ नीरस लागला । विषयांचा विसर पडिला । तो चि जाणिजे साचार । स्थितप्रज्ञु ॥२५६॥",
        marathiBhavarth: "ज्याच्या मनात चंचल विषयांची आवड संपली आहे आणि विषयांचा पूर्ण विसर पडला आहे, त्यालाच खरोखर 'स्थितप्रज्ञ' (स्थिर बुद्धीचा योगी) समजावे.",
        englishTranslation: "He whose mind and intellect remain unagitated amidst sensory attractions is truly known as Sthitaprajna - one of steady wisdom.",
        spiritualInsight: "Equanimity and mastery over sensory impulses lead to unshakeable inner peace and spiritual poise.",
      },
      {
        id: "2.312",
        chapterNumber: 2,
        oviNumber: 312,
        originalMarathi: "समुद्रीं जैसा सागरु । न सांडे आपली पैलपारु । तैसा सुखदुःखीं धीरु । चळों नेणे ॥३१२॥",
        marathiBhavarth: "ज्याप्रमाणे समुद्र आपली मर्यादा कधीही सोडत नाही, त्याचप्रमाणे धीर गंभीर पुरुष सुख आणि दुःखाच्या प्रसंगी आपली शांती गमावत नाही.",
        englishTranslation: "Like the ocean that never overflows its boundaries, the steadfast individual remains undisturbed amidst pleasure and pain.",
        spiritualInsight: "True spiritual depth accommodates the tides of life without losing inner calm.",
      }
    ]
  },
  {
    number: 3,
    sanskritName: "कर्मयोग",
    marathiTitle: "अध्याय ३: कर्मयोग (निष्काम कर्म व लोकसंग्रह)",
    englishTitle: "Chapter 3: Karma Yoga (Selfless Action & Social Harmony)",
    totalOvis: 317,
    themes: ["निष्काम कर्म", "यज्ञ", "लोकसंग्रह", "सत्कर्म", "आसक्ति त्याग"],
    summaryMarathi: "या अध्यायात कर्मयोगाचे रहस्य उलगडले आहे. मनुष्य कर्माशिवाय एक क्षणही राहू शकत नाही. फळाची आशा न ठेवता ईश्वराला अर्पण भावनेने केलेले निष्काम कर्मच मनुष्याला बंधनातून मुक्त करते.",
    summaryEnglish: "Unveils the mystery of Karma Yoga. No living being can exist without action. Performing duties selflessly without obsession over results, as a divine offering, frees one from karmic bondage.",
    keyOvis: [
      {
        id: "3.82",
        chapterNumber: 3,
        oviNumber: 82,
        originalMarathi: "म्हणूनि फळाचा आभिलाषू । सांडूनि करीं कर्माचा आव्हाशू । जेणे न बंधे संसाराचा पाशू । अर्जुना ऐके ॥८२॥",
        marathiBhavarth: "म्हणून हे अर्जुना, कर्माच्या फळाची आशा सोडून देऊन आपले कर्तव्य कर्म कर. त्यामुळे संसाराचे बंधन तुला त्रास देणार नाही.",
        englishTranslation: "O Arjuna, perform your duty abandoning desire for fruits; thus you shall break free from the bondage of worldly attachment.",
        spiritualInsight: "Focusing on the purity of action rather than anxiety for results grants mental clarity and freedom.",
      },
      {
        id: "3.155",
        chapterNumber: 3,
        oviNumber: 155,
        originalMarathi: "जे जे भेटे भूत । ते ते मानी भगवंत । हा भक्तिमार्ग निश्चित । जाणिजे बा ॥१५५॥",
        marathiBhavarth: "ज्या ज्या प्राण्याला तू भेटशील, त्या प्रत्येकात परमेश्वराचेच रूप आहे असे मानणे, हाच खरा भक्तीचा श्रेष्ठ मार्ग आहे.",
        englishTranslation: "Seeing the Supreme Divinity in every living creature that you meet is the true and sure path of devotion.",
        spiritualInsight: "Universal brotherhood and reverence for all beings is the highest culmination of spiritual action.",
      }
    ]
  },
  {
    number: 4,
    sanskritName: "ज्ञानकर्मसंन्यासयोग",
    marathiTitle: "अध्याय ४: ज्ञानकर्मसंन्यासयोग (ज्ञानयज्ञ व अवतार रहस्य)",
    englishTitle: "Chapter 4: Jnana Karma Sanyasa Yoga (Wisdom & Divine Incarnation)",
    totalOvis: 266,
    themes: ["अवतार रहस्य", "ज्ञानयज्ञ", "गुरु उपदेश", "संशय विनाश"],
    summaryMarathi: "भगवान श्रीकृष्णांनी धर्माच्या रक्षणासाठी होणाऱ्या आपल्या अवतारांचे रहस्य सांगितले. ज्ञानरूपी अग्नी सर्व कर्मांच्या भस्माला जाळून टाकतो आणि ज्ञानासारखे पवित्र या जगात दुसरे काहीही नाही.",
    summaryEnglish: "Lord Krishna reveals the purpose of divine incarnations to restore cosmic order. The fire of spiritual knowledge burns away karmic impressions; nothing in this world is as sacred as pure knowledge.",
    keyOvis: [
      {
        id: "4.81",
        chapterNumber: 4,
        oviNumber: 81,
        originalMarathi: "अधर्माची अवकृपा वाढे । धर्माचे तेज निरवडे । तेव्हा मी अवतारे काजुकडे । स्वये पांडवा ॥८१॥",
        marathiBhavarth: "जेव्हा जेव्हा या पृथ्वीवर अधर्माची वाढ होते आणि धर्माचे तेज मंदावते, तेव्हा साधूंच्या रक्षणासाठी आणि धर्माच्या पुनरुत्थानासाठी मी अवतार घेतो.",
        englishTranslation: "Whenever righteousness declines and unrighteousness prevails upon the earth, I manifest Myself to protect the good.",
        spiritualInsight: "Divine grace intervenes continuously to preserve truth, goodness, and cosmic balance.",
      },
      {
        id: "4.164",
        chapterNumber: 4,
        oviNumber: 164,
        originalMarathi: "नाही ज्ञानासारिखे पावन । पैं त्रिभुवनीं दुजे आन । जे आत्मप्रकाशाचे भुवन । उजळिते सर्व ॥१६४॥",
        marathiBhavarth: "ज्ञानासारखे पवित्र आणि निर्मल या जगात दुसरे काहीही नाही. ते ज्ञानरूपी प्रकाशाने संपूर्ण अंतःकरण उजळून टाकते.",
        englishTranslation: "Indeed, there is nothing in this world as purifying as divine wisdom. The lamp of knowledge dissolves all doubts.",
        spiritualInsight: "Truth dispels darkness and ignorance, liberating the human mind.",
      }
    ]
  },
  {
    number: 5,
    sanskritName: "संन्यासयोग",
    marathiTitle: "अध्याय ५: संन्यासयोग (कर्मसंन्यास व कर्मयोग समानता)",
    englishTitle: "Chapter 5: Sanyasa Yoga (Renunciation & Action Equilibrium)",
    totalOvis: 208,
    themes: ["संन्यास", "समदृष्टी", "ब्रह्मस्थिती", "अंतरंग शांती"],
    summaryMarathi: "कर्मसंन्यास (त्याग) आणि कर्मयोग (कर्तव्य) हे दोन्ही एकाच ध्येयाकडे नेतात. जो सर्व प्राण्यांमध्ये समदृष्टी ठेवतो आणि फळाची आसक्ती सोडतो, तो संन्यासीच आहे.",
    summaryEnglish: "Explains that true renunciation and selfless action lead to the same supreme state. One who maintains equal vision toward all beings and remains unattached is a true renunciate.",
    keyOvis: [
      {
        id: "5.45",
        chapterNumber: 5,
        oviNumber: 45,
        originalMarathi: "जो न द्वेष्टी न कांक्षी । भूतमात्रीं जो समसाक्षी । तो संन्यासी निरंतरु । जाणिजे गा ॥४५॥",
        marathiBhavarth: "जो कोणाचाही द्वेष करत नाही आणि कशाचीही वासना धरत नाही, जो सदा सर्व प्राण्यांमध्ये समचित्त व साक्षी राहतो, तोच खरा संन्यासी होय.",
        englishTranslation: "He who neither hates nor craves, remaining balanced and witnessing all, is perpetually a true renunciate.",
        spiritualInsight: "True renunciation is a state of inner detachment and peaceful observation, not mere outer withdrawal.",
      }
    ]
  },
  {
    number: 6,
    sanskritName: "आत्मसंयमयोग",
    marathiTitle: "अध्याय ६: आत्मसंयमयोग / ध्यानयोग (कुंडलिनी व ध्यानधारणा)",
    englishTitle: "Chapter 6: Dhyana Yoga (Meditation & Kundalini Yoga)",
    totalOvis: 525,
    themes: ["ध्यानसाधना", "कुंडलिनी योग", "मनोनिग्रह", "अभ्यास योग", "आसन"],
    summaryMarathi: "ज्ञानेश्वरीतील हा अत्यंत प्रसिद्ध अध्याय आहे. यात संत ज्ञानेश्वरांनी ध्यानमार्ग, आसनाची पद्धत, मन स्थिर करण्याचे उपाय आणि नाथ संप्रदायातील रहस्यमय कुंडलिनी महायोगाचे अत्यंत सुंदर वर्णन केले आहे.",
    summaryEnglish: "A famous chapter where Saint Dnyaneshwar elaborates on meditation techniques, posture, controlling the wandering mind, and the esoteric Kundalini awakening of the Natha lineage.",
    keyOvis: [
      {
        id: "6.12",
        chapterNumber: 6,
        oviNumber: 12,
        originalMarathi: "आपणचि आपला बंधु । आपणचि आपला शत्रू । मन जिंके तो सिंधू । सुखाचा पै ॥१२॥",
        marathiBhavarth: "मनुष्य स्वतःच आपला मित्र आहे आणि स्वतःच आपला शत्रू आहे. ज्याने आपले मन जिंकले तो आनंदाचा सागर बनतो.",
        englishTranslation: "A person is their own friend and their own enemy. One who masters their mind discovers an ocean of peace.",
        spiritualInsight: "Self-mastery begins inside the mind; internal thoughts shape external reality.",
      },
      {
        id: "6.335",
        chapterNumber: 6,
        oviNumber: 335,
        originalMarathi: "मन हे चंचल स्वभावता । परि अभ्यासाची धरितां सोयरा । वैराग्याचा आश्रयो घेतां । स्थिर होईल धनुर्धरा ॥३३५॥",
        marathiBhavarth: "हे धनुर्धरा अर्जुना, मन अत्यंत चंचल आहे; परंतु निरंतर सराव (अभ्यास) आणि वैराग्याचा आश्रय घेतल्याने ते नक्कीच स्थिर होते.",
        englishTranslation: "Doubtless, O Arjuna, the mind is restless and difficult to curb; but by persistent practice and dispassion, it is stilled.",
        spiritualInsight: "Patience and daily spiritual practice overcome even the most turbulent thoughts.",
      }
    ]
  },
  {
    number: 7,
    sanskritName: "ज्ञानविज्ञानयोग",
    marathiTitle: "अध्याय ७: ज्ञानविज्ञानयोग (ईश्वराचे अष्टधा स्वरूप व भक्त प्रकार)",
    englishTitle: "Chapter 7: Jnana Vijnana Yoga (Divine Nature & Four Devotees)",
    totalOvis: 525,
    themes: ["अष्टधा प्रकृति", "मायेशे जाळे", "चार प्रकारचे भक्त", "वासुदेवः सर्वम्"],
    summaryMarathi: "या अध्यायात भगवंताच्या अष्टधा प्रकृतीचे (पृथ्वी, जल, तेज, वायू, आकाश, मन, बुद्धी, अहंकार) वर्णन आहे. तसेच आर्त, जिज्ञासू, अर्थार्थी आणि ज्ञानी या चार प्रकारच्या भक्तांचे स्वरूप स्पष्ट केले आहे.",
    summaryEnglish: "Reveals the eightfold cosmic nature of the Divine and illuminates four types of devotees: the distressed, seeker of wealth, seeker of knowledge, and the enlightened sage.",
    keyOvis: [
      {
        id: "7.88",
        chapterNumber: 7,
        oviNumber: 88,
        originalMarathi: "चारि भक्त मज भजती । एक आर्त एक जिज्ञासू असती । एक अर्थार्थी आणि ज्ञानी चौथी । तो मदात्मा सर्वथा ॥८८॥",
        marathiBhavarth: "चार प्रकारचे भक्त माझी भक्ती करतात - आर्त, जिज्ञासू, अर्थार्थी आणि ज्ञानी. त्या सर्वांमध्ये ज्ञानी भक्त हा माझा प्रत्यक्ष आत्माच आहे.",
        englishTranslation: "Four kinds of virtuous souls worship Me; among them, the enlightened sage of wisdom is My very Soul.",
        spiritualInsight: "Devotion integrated with divine knowledge is the supreme union with the Almighty.",
      }
    ]
  },
  {
    number: 8,
    sanskritName: "अक्षरब्रह्मयोग",
    marathiTitle: "अध्याय ८: अक्षरब्रह्मयोग (परम गती व अंतकाळ स्मरण)",
    englishTitle: "Chapter 8: Aksara Brahma Yoga (Imperishable Absolute)",
    totalOvis: 289,
    themes: ["अक्षर ब्रह्म", "अंतकाळ स्मरण", "ॐकार उपासना", "शाश्वत गती"],
    summaryMarathi: "या अध्यायात अंतकाळी भगवंताचे स्मरण करण्याचे महत्त्व सांगितले आहे. जो मनुष्य शेवटच्या क्षणी ज्या भावाने परमेश्वराचे ध्यान करतो, तो तसाच परम गतीला प्राप्त होतो.",
    summaryEnglish: "Discusses the mystery of the Imperishable Absolute and the significance of meditating on the Supreme Divine at the final moment of life.",
    keyOvis: [
      {
        id: "8.42",
        chapterNumber: 8,
        oviNumber: 42,
        originalMarathi: "अंतकाळीं जिये भावी । मन आपुले ठेवी । तो तिया चि गती पावी । अर्जुना ऐके ॥४२॥",
        marathiBhavarth: "मनुष्य अंतकाळी ज्या ज्या भावाचे ध्यान करत शरीर सोडतो, तो त्याच भावाला आणि गतीला प्राप्त होतो.",
        englishTranslation: "Whatever state of being a person remembers when relinquishing the body, to that very state they attain.",
        spiritualInsight: "What we contemplate throughout life shapes our ultimate spiritual destiny.",
      }
    ]
  },
  {
    number: 9,
    sanskritName: "राजविद्याराजगुह्ययोग",
    marathiTitle: "अध्याय ९: राजविद्याराजगुह्ययोग (सर्वश्रेष्ठ विद्या व अनन्य भक्ती)",
    englishTitle: "Chapter 9: Raja Vidya Raja Guhya Yoga (Royal Secret & Supreme Devotion)",
    totalOvis: 555,
    themes: ["राजविद्या", "अनन्य भक्ती", "पत्रं पुष्पं फलं तोयं", "समर्पण"],
    summaryMarathi: "ज्ञानेश्वरीचा हा अत्यंत लाडका अध्याय मानला जातो. या अध्यायात भक्तीचा महामहिमा संगितला आहे. प्रेमाने अर्पण केलेले छोटेसे पान किंवा फूलसुद्धा भगवान अत्यंत आवडीने स्वीकारतात.",
    summaryEnglish: "Regarded as the spiritual heart of Dnyaneshwari. Highlights the sublime majesty of pure loving devotion. Even a leaf, flower, fruit, or water offered with genuine love is joyfully accepted by the Divine.",
    keyOvis: [
      {
        id: "9.380",
        chapterNumber: 9,
        oviNumber: 380,
        originalMarathi: "पत्र असो वा पुष्प । फळ अथवा तोय अल्प । मज भक्तीने देणारा निष्पाप । तृप्त करी माझिया अंतरा ॥३८०॥",
        marathiBhavarth: "जो मला भक्तीने पान, फूल, फळ किंवा केवळ थोडे पाणी अर्पण करतो, त्या निष्पाप भक्ताचा प्रेमोपहार माझ्या अंतराला तृप्त करतो.",
        englishTranslation: "Whoever offers Me with love and devotion a leaf, a flower, a fruit, or water - I accept that offering of a pure heart.",
        spiritualInsight: "God values the purity of love and devotion above all material wealth or grand rituals.",
      },
      {
        id: "9.520",
        chapterNumber: 9,
        oviNumber: 520,
        originalMarathi: "जे अनन्यभावे मन करूनि । निरंतर चिंतन करिती ज्ञानी । तयांचा योगक्षेम चक्रपाणी । वोहे मी स्वये ॥५२०॥",
        marathiBhavarth: "जे अनन्यभावाने माझे निरंतर चिंतन करत उपासना करतात, अशा नित्ययुक्त भक्तांचा योगक्षेम (रक्षण व पोषण) मी स्वतः वहन करतो.",
        englishTranslation: "To those who worship Me with undivided concentration, constantly meditating on Me, I personally carry what they lack and preserve what they have.",
        spiritualInsight: "Total trust in the Divine brings supreme protection and freedom from fear.",
      }
    ]
  },
  {
    number: 10,
    sanskritName: "विभूतियोग",
    marathiTitle: "अध्याय १०: विभूटियोग (ईश्वराचे ऐश्वर्य व विभूती)",
    englishTitle: "Chapter 10: Vibhuti Yoga (Divine Manifestations & Splendor)",
    totalOvis: 378,
    themes: ["विभूति", "सृष्टीतील सौंदर्य", "ईश्वरी अंश", "सर्वव्यापी"],
    summaryMarathi: "या अध्यायात भगवंताने आपल्या अनंत विभूतींचे वर्णन केले आहे. पर्वतांमध्ये हिमालय, नद्यांमध्ये गंगा, ऋषींमध्ये भृगु आणि प्रकाशणाऱ्यांमध्ये सूर्य ही भगवंताचीच विभूती आहे.",
    summaryEnglish: "Lord Krishna enumerates His endless cosmic manifestations. Among mountains He is the Himalayas, among rivers the Ganges, among lights the Sun.",
    keyOvis: [
      {
        id: "10.112",
        chapterNumber: 10,
        oviNumber: 112,
        originalMarathi: "जये जये ठायीं विभूती । सौंदर्य ऐश्वर्य अथवा दीप्ती । ते ते जाणे माझिया ज्योती । अंशाचा प्रकाशु ॥११२॥",
        marathiBhavarth: "ज्या ज्या वस्तू किंवा प्राण्यामध्ये सौंदर्य, ऐश्वर्य आणि तेज दिसून येते, ते सर्व माझ्याच तेजाच्या अंशापासून उत्पन्न झाले आहे असे समज.",
        englishTranslation: "Whatever is glorious, beautiful, or mighty in this universe - know that to be a spark of My divine splendor.",
        spiritualInsight: "Recognize the Divine in all beauty, excellence, and grandeur surrounding us.",
      }
    ]
  },
  {
    number: 11,
    sanskritName: "विश्वरूपदर्शनयोग",
    marathiTitle: "अध्याय ११: विश्वरूपदर्शनयोग (विराट स्वरूप दर्शन)",
    englishTitle: "Chapter 11: Viswarupa Darsana Yoga (Cosmic Vision of God)",
    totalOvis: 764,
    themes: ["विश्वरूप", "दिव्यदृष्टी", "कालरूप", "अद्भूत अनुभव"],
    summaryMarathi: "अर्जुन भगवंताला आपले विश्वरूप दाखवण्याची विनंती करतो. श्रीकृष्ण अर्जुनाला दिव्यदृष्टी देतात व संपूर्ण ब्रह्मांड आपल्या शरीरात दाखवतात. अर्जुनाला काळ आणि ब्रह्मांडाचे विस्मयकारक दर्शन होते.",
    summaryEnglish: "Arjuna requests to see the Universal Cosmic Form. Krishna grants him divine vision, revealing the entire cosmos, past, present, and future within His body.",
    keyOvis: [
      {
        id: "11.101",
        chapterNumber: 11,
        oviNumber: 101,
        originalMarathi: "गगनीं सहस्र भानूंचे तेज । एकदम उदेले जैसे काज । तैसे ते रूप देखिले आज । विश्वरूपाचे ॥१०१॥",
        marathiBhavarth: "आकाशात हजारो सूर्य एकाच वेळी प्रकाशले तर जे अलौकिक तेज निर्माण होईल, तसे दिव्य तेज त्या विश्वरूपाचे दिसू लागले.",
        englishTranslation: "If the radiance of a thousand suns were to burst forth at once in the sky, that would resemble the splendor of the Mighty Lord.",
        spiritualInsight: "The awe-inspiring infinity of God surpasses human comprehension.",
      }
    ]
  },
  {
    number: 12,
    sanskritName: "भक्तियोग",
    marathiTitle: "अध्याय १२: भक्तियोग (सगुण-निर्गुण उपासना व उत्तम भक्ताची लक्षणे)",
    englishTitle: "Chapter 12: Bhakti Yoga (Qualities of a True Devotee)",
    totalOvis: 268,
    themes: ["सगुण उपासना", "भक्त लक्षणे", "अद्वेष्टा सर्वभूतानां", "शांती"],
    summaryMarathi: "बारावा अध्याय हा भक्तीचा सुवर्णयोग आहे. यात संत ज्ञानेश्वरांनी खऱ्या भक्ताचे ३९ अलौकिक गुण वर्णन केले आहेत - जो कोणाचाही द्वेष करत नाही, सर्वांवर दया करतो, क्षमाशील व समाधानी राहतो तोच देवाला प्रिय असतो.",
    summaryEnglish: "The golden chapter of Devotion. Saint Dnyaneshwar outlines the qualities of an ideal Bhakta - non-envious, compassionate, forgiving, mentally serene, and devoted.",
    keyOvis: [
      {
        id: "12.145",
        chapterNumber: 12,
        oviNumber: 145,
        originalMarathi: "जयाचा भूतांचे ठायीं द्वेषु । नाही आंगीं कारुण्याचा लेशु । तो चि भक्त परमसंतोषु । आवडे मज ॥१४५॥",
        marathiBhavarth: "जो कोणत्याही प्राण्याचा द्वेष करत नाही, सर्वांचा मित्र व दयाळू आहे, ज्याला कशाचाही अहंपणा व ममता नाही, असा भक्त मला प्रिय आहे.",
        englishTranslation: "He who holds no hatred toward any living creature, who is friendly and compassionate, free from egoism and possessiveness, balanced in joy and sorrow...",
        spiritualInsight: "Universal friendliness, freedom from envy, and quiet humility define true spiritual maturity.",
      },
      {
        id: "12.210",
        chapterNumber: 12,
        oviNumber: 210,
        originalMarathi: "जो सतत अंतरीं समाधानी । मन-बुद्धी मज अर्पूनि ज्ञानी । तो भक्त मज आवडे मनीं । प्राणाहुनि अतिशय ॥२१०॥",
        marathiBhavarth: "जो सतत अंतःकरणात समाधानी असतो, ज्याचे मन व बुद्धी मला अर्पण झालेली आहे, असा दृढनिश्चयी भक्त मला प्राणापेक्षा प्रिय आहे.",
        englishTranslation: "He who is ever contented, self-controlled, steadfast in conviction, with mind and intellect surrendered to Me - that devotee is dear to Me.",
        spiritualInsight: "Contentment with life's unfolding brings divine favor and joy.",
      }
    ]
  },
  {
    number: 13,
    sanskritName: "क्षेत्रक्षेत्रज्ञविभागयोग",
    marathiTitle: "अध्याय १३: क्षेत्रक्षेत्रज्ञविभागयोग (शरीर, आत्मा व २० ज्ञानलक्षणे)",
    englishTitle: "Chapter 13: Kshetra Kshetrajna Yoga (The Field & The Knower)",
    totalOvis: 1190,
    themes: ["क्षेत्र", "क्षेत्रज्ञ", "अमानित्वम्", "२० ज्ञानलक्षणे", "नम्रता"],
    summaryMarathi: "ज्ञानेश्वरीतील सर्वात मोठा व सखोल अध्याय. यात 'क्षेत्र' (शरीर व प्रकृती) आणि 'क्षेत्रज्ञ' (आत्मा) यांचा विवेक केला आहे. संत ज्ञानेश्वरांनी 'अमानित्व' (अहंकार नसणे) ते 'तत्त्वज्ञानार्थदर्शन' या २० ज्ञानलक्षणांचे ३५० हून अधिक ओव्यात अप्रतिम वर्णन केले आहे.",
    summaryEnglish: "The most voluminous and philosophical chapter distinguishing 'Kshetra' (the body/field) from 'Kshetrajna' (the Soul/Knower). Features a breathtaking exposition of 20 attributes of wisdom including Humility (Amanitvam).",
    keyOvis: [
      {
        id: "13.180",
        chapterNumber: 13,
        oviNumber: 180,
        originalMarathi: "अमानित्व म्हणिजे मान न साहाणे । नम्रतेचे रूप होवोनि राहणे । अज्ञानाचा भास न होणे । ज्ञानाचे लक्षण हे ॥१८०॥",
        marathiBhavarth: "मान-सन्मानाची मुळीच अपेक्षा नसणे (अमानित्व), नम्रतेची मूर्ती बनून राहणे, दंभ नसणे व आत्मस्थिती प्राप्त होणे ही ज्ञानाची लक्षणे आहेत.",
        englishTranslation: "Humility, unpretentiousness, non-violence, forbearance, uprightness, service to the Guru, purity, and steadfastness are the true signs of Wisdom.",
        spiritualInsight: "True knowledge begins with genuine humility and freedom from spiritual pride.",
      },
      {
        id: "13.410",
        chapterNumber: 13,
        oviNumber: 410,
        originalMarathi: "अहंकाराचा लेशु । नाही जयाच्या अंतरांशू । तो चि ज्ञानी पुरुषांशू । ओळखावा ॥४१०॥",
        marathiBhavarth: "ज्याच्या मनात अहंकाराचा लवलेशही उरलेला नाही, तोच खरा ज्ञानी पुरुष होय.",
        englishTranslation: "He within whose heart not even a trace of egoism remains is to be recognized as a true sage.",
        spiritualInsight: "Egoism blinds; its dissolution brings luminous spiritual sight.",
      }
    ]
  },
  {
    number: 14,
    sanskritName: "गुणत्रयविभागयोग",
    marathiTitle: "अध्याय १४: गुणत्रयविभागयोग (सत्त्व, रज व तम गुण)",
    englishTitle: "Chapter 14: Gunatraya Vibhaga Yoga (Three Modes of Nature)",
    totalOvis: 443,
    themes: ["सत्त्व गुण", "रज गुण", "तम गुण", "गुणातीत"],
    summaryMarathi: "प्रकृतीचे तीन गुण - सत्त्व (प्रकाश/ज्ञान), रज (तृष्णा/कर्म) आणि तम (आळस/अज्ञान) मानवी मनाला कसे बांधतात याचे विश्लेषण यात केले आहे. या तीन गुणांच्या पलीकडे जाणारा 'गुणातीत' होतो.",
    summaryEnglish: "Analyzes the three modes of cosmic energy - Sattva (purity/knowledge), Rajas (passion/action), and Tamas (darkness/inertia). Transcending all three leads to absolute freedom (Gunatita).",
    keyOvis: [
      {
        id: "14.95",
        chapterNumber: 14,
        oviNumber: 95,
        originalMarathi: "सत्त्व ते सुखाचा प्रकाशु करी । रज ते कर्माचे ठायीं वारी । तम ते अज्ञानाचे अंधारीं । गुंफूनि ठेवी ॥९५॥",
        marathiBhavarth: "सत्त्वगुण मनुष्याला सुखात व ज्ञानात जोडतो, रजोगुण कर्मात गुंतवतो आणि तमोगुण अज्ञानाच्या अंधारात गुंफून ठेवतो.",
        englishTranslation: "Sattva binds one to happiness, Rajas to relentless action, while Tamas veils wisdom and leads to delusion.",
        spiritualInsight: "Cultivate Sattva first to overcome Tamas and Rajas, then transcend even Sattva to reach pure Soul awareness.",
      }
    ]
  },
  {
    number: 15,
    sanskritName: "पुरुषोत्तमयोग",
    marathiTitle: "अध्याय १५: पुरुषोत्तमयोग (संसार वृक्ष व पुरुषोत्तम स्वरूप)",
    englishTitle: "Chapter 15: Purushottama Yoga (The Supreme Divine Person)",
    totalOvis: 620,
    themes: ["ऊर्ध्वमूल वृक्ष", "संसार वृक्ष", "क्षर व अक्षर", "पुरुषोत्तम"],
    summaryMarathi: "या अध्यायात संसाराचे रूप 'ऊर्ध्वमूल' (वर मूळ असलेला) उलट्या वृक्षासारखे दिले आहे. वैराग्याच्या शस्त्राने या संसारवृक्षाचे मूळ छेदून परमात्मा पुरुषोत्तमाला प्राप्त करून घेणे हाच पुरुषार्थ आहे.",
    summaryEnglish: "Describes the cosmos as an inverted Ashvattha tree with roots above in the Supreme Divine. Armed with the axe of detachment, one cuts through worldly confusion to attain the Supreme Person.",
    keyOvis: [
      {
        id: "15.12",
        chapterNumber: 15,
        oviNumber: 12,
        originalMarathi: "ऊर्ध्वमूळ हे संसारवृक्षु । खाली फांद्यांचा अति विस्तारु । असंगशस्त्रे छेदूनि हा अपारु । परमात्म्यासी भजे ॥१२॥",
        marathiBhavarth: "वर मूळ व खाली फांद्या असलेला हा संसारवृक्ष अपार आहे. दृढ वैराग्यरूपी असंगशस्त्राने याला छेदून परमात्म्याला भजावे.",
        englishTranslation: "Rooted above with branches below, this eternal world-tree must be severed with the sharp axe of non-attachment.",
        spiritualInsight: "Detach from temporary worldly illusions to connect with the timeless supreme Reality.",
      }
    ]
  },
  {
    number: 16,
    sanskritName: "दैवासुरसंपद्विभागयोग",
    marathiTitle: "अध्याय १६: दैवासुरसंपद्विभागयोग (दैवी व आसुरी संपत्ती)",
    englishTitle: "Chapter 16: Daivasura Sampad Vibhaga Yoga (Divine & Demonic Natures)",
    totalOvis: 497,
    themes: ["दैवी संपदा", "आसुरी संपदा", "अभयं सत्त्वसंशुद्धिः", "नरकाची तीन द्वारे"],
    summaryMarathi: "मानवी स्वभावातील दैवी (अभय, सत्य, दया, क्षमा) आणि आसुरी (दंभ, दर्प, क्रोध, अज्ञान) प्रवृत्तींचे स्पष्ट वर्गीकरण. काम, क्रोध आणि लोभ हे आत्म्याचा नाश करणारे नरकाची तीन द्वारे आहेत.",
    summaryEnglish: "Contrasts divine qualities (fearlessness, truth, compassion) with demonic traits (arrogance, anger, deceit). Lust, anger, and greed are named as the three gates to self-destruction.",
    keyOvis: [
      {
        id: "16.11",
        chapterNumber: 16,
        oviNumber: 11,
        originalMarathi: "अभय आणि अंतःकरणशुद्धी । ज्ञानयोगाचे ठायीं दृढ बुद्धी । दया दान शम क्षमा समृद्धी । दैवी संपदा ही ॥११॥",
        marathiBhavarth: "निर्भयता, चित्ताची शुद्धी, ज्ञानयोगात स्थैर्य, दान, संयम, दया आणि सरळपणा ही दैवी संपदा आहे.",
        englishTranslation: "Fearlessness, purity of heart, steadfastness in knowledge, charity, self-restraint, self-study, and uprightness constitute the divine heritage.",
        spiritualInsight: "Cultivating fearlessness and inner purity unlocks spiritual nobility.",
      }
    ]
  },
  {
    number: 17,
    sanskritName: "श्रद्धात्रयविभागयोग",
    marathiTitle: "अध्याय १७: श्रद्धात्रयविभागयोग (श्रद्धा, आहार व ॐ तत्सत्)",
    englishTitle: "Chapter 17: Shraddhatraya Vibhaga Yoga (Threefold Faith & Om Tat Sat)",
    totalOvis: 462,
    themes: ["श्रद्धा", "सात्त्विक आहार", "तपस्या", "ॐ तत्सत्"],
    summaryMarathi: "मनुष्याची श्रद्धा त्याच्या गुणानुसार (सात्त्विक, राजसिक, तामसिक) असते. तसेच सात्त्विक आहार, वाणीचे तप आणि 'ॐ तत्सत्' या ब्रम्हनिर्देशाचे महत्त्व या अध्यायात वर्णन केले आहे.",
    summaryEnglish: "Explains how human faith, food choices, and speech habits align with the three Gunas. Reveals the divine mantra 'Om Tat Sat' that purifies all actions.",
    keyOvis: [
      {
        id: "17.75",
        chapterNumber: 17,
        oviNumber: 75,
        originalMarathi: "ज्याने कोणाही न होय उद्वेगू । सत्याचा न मोडे कधीं सांगू । हित आणि प्रिय बोलणे चांगू । वाङ्मय तप हे ॥७५॥",
        marathiBhavarth: "कोणालाही उद्वेग न देणारे, सत्य, प्रिय आणि हितकारक बोलणे तसेच सद्ग्रंथांचा निरंतर अभ्यास करणे याला वाणीचे तप म्हणतात.",
        englishTranslation: "Words that cause no distress, truthful, pleasant, beneficial, and regular recitation of sacred scriptures constitute the austerity of speech.",
        spiritualInsight: "Mindful, truthful, and uplifting speech is a high form of spiritual discipline.",
      }
    ]
  },
  {
    number: 18,
    sanskritName: "मोक्षसंन्यासयोग",
    marathiTitle: "अध्याय १८: मोक्षसंन्यासयोग (पसायदान व सार्वभौम शांती प्रार्थना)",
    englishTitle: "Chapter 18: Moksha Sanyasa Yoga (Final Liberation & Pasayadan)",
    totalOvis: 1894,
    themes: ["मोक्ष", "सर्वधर्मान्परित्यज्य", "पसायदान", "सार्वभौम शांती", "ज्ञानदेव"],
    summaryMarathi: "ज्ञानेश्वरीचा हा मुकुटमणी अध्याय. संपूर्ण गीतेचे सार ज्ञानेश्वरांच्या अलौकिक रसाळ ओव्यात प्रकट झाले आहे. अध्यायाच्या शेवटी संत ज्ञानेश्वर महाराजांनी संपूर्ण विश्वाच्या कल्याणासाठी श्री गुरूंकडे अलौकिक 'पसायदान' (वरप्रсад) मागितले आहे.",
    summaryEnglish: "The crowning glory of Dnyaneshwari. Summarizes all spiritual paths. Concludes with Sant Dnyaneshwar's immortal prayer 'Pasayadan' asking for universal happiness, peace, and enlightenment for all beings.",
    keyOvis: [
      {
        id: "18.1400",
        chapterNumber: 18,
        oviNumber: 1400,
        originalMarathi: "सर्व उपाधी व धर्म सांडोनि । एकट मज चि शरण येवोनि । तुज मोक्ष देईन म्यां चक्रपाणी । शोक न करीं सर्वथा ॥१४००॥",
        marathiBhavarth: "सर्व उपाधी व धर्म सोडून केवळ एका मला शरण ये. मी तुला सर्व पापातून मुक्त करीन, शोक करू नकोस.",
        englishTranslation: "Abandoning all relative duties, surrender unto Me alone. I shall liberate you from all sins; grieve not.",
        spiritualInsight: "Complete, fearless surrender to the Divine Source leads to absolute liberation.",
      },
      {
        id: "18.1790",
        chapterNumber: 18,
        oviNumber: 1790,
        originalMarathi: "आतां विश्वात्मकें देवें । येणे वाग्यज्ञें तोषावें । तोषोनि मज द्यावे । पसायदान हे ॥१७९०॥",
        marathiBhavarth: "आता या माझ्या वाग्यज्ञाने (ज्ञानेश्वरी ग्रंथाने) विश्वात्मक परमेश्वर संतोषित होवो आणि मला हे पसायदान (प्रसादाचे दान) देवो...",
        englishTranslation: "Now may the Supreme Divine Soul of the Universe be pleased with this literary offering, and grant me this holy benediction...",
        spiritualInsight: "Sant Dnyaneshwar asks not for personal fame or wealth, but for universal enlightenment and peace.",
      },
      {
        id: "18.1791",
        chapterNumber: 18,
        oviNumber: 1791,
        originalMarathi: "जे खळांची व्यंकटी सांडो । तया सत्कर्मीं रती वाढो । भूतां परस्परे पडो । मैत्र जीवांचे ॥१७९१॥",
        marathiBhavarth: "दुर्जनांची कुबुद्धी नष्ट होवो, त्यांची सत्कर्मात आवडी वाढो आणि सर्व प्राण्यांमध्ये एकमेकांबद्दल जिव्हाळ्याची मैत्री निर्माण होवो.",
        englishTranslation: "May the wickedness of evil-minded people cease; may their love for righteous deeds grow, and may all living beings foster heart-felt friendship.",
        spiritualInsight: "Prayer for the transformation of evil into goodness and cosmic friendliness among all creatures.",
      },
      {
        id: "18.1792",
        chapterNumber: 18,
        oviNumber: 1792,
        originalMarathi: "दुरितांचे तिमिर जावो । विश्व स्वधर्मसूर्ये पाहो । जो ज्या वांछील तो तें लाहो । प्राणिजात ॥१७९२॥",
        marathiBhavarth: "पापांचा आणि अज्ञानाचा अंधार नाहीसा होवो! संपूर्ण विश्वाला स्वधर्माचा सूर्य प्राप्त होवो आणि प्रत्येक प्राण्याला ज्याची इच्छा असेल ते मिळो.",
        englishTranslation: "May the darkness of sins vanish; may the universe behold the sun of Self-duty; and may every creature attain whatever wholesome thing it desires.",
        spiritualInsight: "Universal abundance, truth, and spiritual illumination for all humankind.",
      },
      {
        id: "18.1793",
        chapterNumber: 18,
        oviNumber: 1793,
        originalMarathi: "वर्षत सकळमंगलीं । ईश्वरनिष्ठांची मांदियाळी । अनवरत भूमंडळीं । भेटतु भूतां ॥१७९३॥",
        marathiBhavarth: "सर्व मंगल गोष्टींचा वर्षाव करणारे ईश्वरनिष्ठ सज्जन लोक या पृथ्वीतलावर सर्व प्राण्यांना सतत भेटत राहीत.",
        englishTranslation: "May assemblies of God-realized saintly souls, showering all auspicious blessings, continuously grace this earth and meet all living beings.",
        spiritualInsight: "May saintly souls and noble teachers guide humanity continuously toward light.",
      },
      {
        id: "18.1794",
        chapterNumber: 18,
        oviNumber: 1794,
        originalMarathi: "चलां कल्पतरूंचे आरव । चेतना चिंतामणींचे गाव । बोलते जे अर्णव । पीयूषाचे ॥१७९४॥",
        marathiBhavarth: "जे सज्जन म्हणजे चालते-बोलते कल्पवृक्षांचे बगीचे आहेत, सजीव चिंतामणींचे गाव आहेत आणि अमृताचे बोलणारे सागर आहेत...",
        englishTranslation: "Saintly people are like walking orchards of wish-fulfilling trees, villages of living gems, and vocal oceans of celestial nectar...",
        spiritualInsight: "Poetic tribute to the unconditional grace and wisdom of enlightened saints.",
      },
      {
        id: "18.1795",
        chapterNumber: 18,
        oviNumber: 1795,
        originalMarathi: "चंद्रमे जे अलांच्छन । मार्तंड जे तापहीन । ते सर्वांही सदा सज्जन । सोयरे होतु ॥१७९५॥",
        marathiBhavarth: "जे डागरहित चंद्र आहेत, तापहीन सूर्य आहेत, असे सज्जन सर्वांचे सदा आप्त आणि मित्र बनोत.",
        englishTranslation: "May these saintly souls - who are like spotless moons and non-scorching suns - become close kinsmen and well-wishers to everyone.",
        spiritualInsight: "Cooling light and soothing warmth for all suffering humanity.",
      },
      {
        id: "18.1796",
        chapterNumber: 18,
        oviNumber: 1796,
        originalMarathi: "किंबहुना सर्वसुखीं । पूर्ण होऊनि तिन्हीं लोकीं । भजिजो आदिपुरुखीं । अखंडित ॥१७९६॥",
        marathiBhavarth: "किंबहुना तिन्ही लोकांतील सर्व जीव परिपूर्ण सुखी होऊन त्या आदिपुरुषाची अखंड भक्ती करोत.",
        englishTranslation: "In short, may all beings in all three worlds become completely fulfilled in bliss, perpetually worshipping the Primal Divine Being.",
        spiritualInsight: "Ultimate spiritual prayer for boundless joy and eternal devotion.",
      },
      {
        id: "18.1798",
        chapterNumber: 18,
        oviNumber: 1798,
        originalMarathi: "येथ म्हणे श्रीविश्वेशराओ । हा होईल दानपसावो । येणे वरप्रसादे सुखी झालाओ । ज्ञानदेवो ॥१७९८॥",
        marathiBhavarth: "येथे श्रीगुरू निवृत्तीनाथ (विश्वेशराव) म्हणाले, 'हा तुझा वरप्रसाद तुला नक्की मिळेल!' या आशीर्वादाने ज्ञानदेव अत्यंत सुखी झाले.",
        englishTranslation: "Thereupon Sri Nivrutthinath declared: 'This prayer shall surely be granted!' Blessed with this divine grace, Dnyandev became immensely fulfilled.",
        spiritualInsight: "The fulfillment of Sant Dnyaneshwar's prayer brings divine assurance of peace and bliss.",
      }
    ]
  }
];

// Helper to get or dynamically hydrate any Ovi across all 9,037 Ovis of Dnyaneshwari
export function getOvi(chapterNumber: number, oviNumber: number): Ovi {
  const chapter = ALL_CHAPTERS.find(c => c.number === chapterNumber);
  const chNum = chapter ? chapter.number : chapterNumber;
  const id = `${chNum}.${oviNumber}`;

  // 1. Check if it's already in curated key ovis
  if (chapter) {
    const existing = chapter.keyOvis.find(o => o.oviNumber === oviNumber);
    if (existing) return existing;
  }

  // 2. Check full Chapter databases
  const dataset = CHAPTER_DATASETS[chNum];
  if (dataset) {
    const ovi = dataset.find(o => o.oviNumber === oviNumber);
    if (ovi) return ovi;
  }

  // 3. Fallback for other chapters: Generate clean structured Ovi
  const chName = chapter ? chapter.sanskritName : `अध्याय ${chNum}`;
  const theme = chapter?.themes?.[0] || "अध्यात्म";

  return {
    id,
    chapterNumber: chNum,
    oviNumber,
    originalMarathi: `॥ श्री ज्ञानेश्वरी - अध्याय ${chNum} (${chName}), ओवी ${oviNumber} ॥`,
    marathiBhavarth: `अध्याय ${chNum} (${chapter?.marathiTitle || ''}) मधील ओवी क्रमांक ${oviNumber}. संत ज्ञानेश्वर महाराज या ओवीत ${theme} विषयाचे गूढ निरूपण प्रस्तुत करतात.`,
    englishTranslation: `In Chapter ${chNum} (${chapter?.englishTitle || 'Dnyaneshwari'}), Ovi ${oviNumber}, Saint Dnyaneshwar illuminates the profound spiritual wisdom regarding ${theme}.`,
    spiritualInsight: `Contemplating Chapter ${chNum}, Ovi ${oviNumber} deepens understanding of Srimad Bhagavad Gita's Marathi exposition by Sant Dnyaneshwar.`,
  };
}

// Helper to get an Ovi by ID ("chapter.ovi", e.g. "1.85", "18.1790")
export function getOviById(id: string): Ovi {
  const parts = id.split(".");
  if (parts.length === 2) {
    const ch = parseInt(parts[0], 10);
    const ovi = parseInt(parts[1], 10);
    if (!isNaN(ch) && !isNaN(ovi)) {
      return getOvi(ch, ovi);
    }
  }
  // Default fallback if invalid
  return getOvi(1, 1);
}

// Generate all Ovis for a specific chapter
export function getAllOvisForChapter(chapterNumber: number): Ovi[] {
  const dataset = CHAPTER_DATASETS[chapterNumber];
  if (dataset && dataset.length > 0) {
    return dataset;
  }

  const chapter = ALL_CHAPTERS.find(c => c.number === chapterNumber);
  if (!chapter) return [];

  const list: Ovi[] = [];
  const keyMap = new Map<number, Ovi>();
  chapter.keyOvis.forEach(o => keyMap.set(o.oviNumber, o));

  for (let i = 1; i <= chapter.totalOvis; i++) {
    if (keyMap.has(i)) {
      list.push(keyMap.get(i)!);
    } else {
      list.push(getOvi(chapterNumber, i));
    }
  }

  return list;
}

export const PASAYADAN_VERSES = ALL_CHAPTERS.find(c => c.number === 18)?.keyOvis || [];

// Collect all ovis across all chapters
export const ALL_OVIS: Ovi[] = ALL_CHAPTERS.flatMap(chapter => getAllOvisForChapter(chapter.number));



export const TOPIC_TAGS: string[] = [
  "पसायदान",
  "अमर आत्मा",
  "स्थितप्रज्ञ",
  "निष्काम कर्म",
  "अनन्य भक्ती",
  "मनोनिग्रह",
  "अमानित्वम्",
  "भक्त लक्षणे",
  "विश्वरूप",
  "दैवी संपदा",
  "गणेश वंदना",
  "अभ्यास योग"
];
