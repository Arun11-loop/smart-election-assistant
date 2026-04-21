import mockDatabase from './mockDatabase.json';

const calculateAge = (dobString) => {
  const today = new Date();
  const birthDate = new Date(dobString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

// Simple mock translation dictionary for the MVP.
const translations = {
  Kannada: {
    "Let's start from the beginning. Which country are you voting in?": "ಮೊದಲಿನಿಂದ ಪ್ರಾರಂಭಿಸೋಣ. ನೀವು ಯಾವ ದೇಶದಲ್ಲಿ ಮತ ಚಲಾಯಿಸುತ್ತಿದ್ದೀರಿ?",
    "India": "ಭಾರತ (India)", "USA": "ಯುಎಸ್ಎ (USA)", "Canada": "ಕೆನಡಾ (Canada)", "Nepal": "ನೇಪಾಳ (Nepal)",
    "Welcome! Let's get started. Which country are you voting in?": "ಸ್ವಾಗತ! ಪ್ರಾರಂಭಿಸೋಣ. ನೀವು ಯಾವ ದೇಶದಲ್ಲಿ ಮತ ಚಲಾಯಿಸುತ್ತಿದ್ದೀರಿ?",
    "Please select a valid country from the options.": "ದಯವಿಟ್ಟು ಆಯ್ಕೆಗಳಿಂದ ಮಾನ್ಯವಾದ ದೇಶವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    "Yes, I am a citizen": "ಹೌದು, ನಾನು ಪ್ರಜೆ", "No, I am not": "ಇಲ್ಲ, ನಾನಲ್ಲ",
    "Yes, help me find it": "ಹೌದು, ಹುಡುಕಲು ಸಹಾಯ ಮಾಡಿ", "No, I know where it is": "ಇಲ್ಲ, ನನಗೆ ತಿಳಿದಿದೆ",
    "Karnataka": "ಕರ್ನಾಟಕ", "Delhi": "ದೆಹಲಿ", "Uttar Pradesh": "ಉತ್ತರ ಪ್ರದೇಶ", "Kerala": "ಕೇರಳ", "Other": "ಇತರೆ",
    "Finish": "ಮುಕ್ತಾಯ", "Start Over": "ಮತ್ತೆ ಪ್ರಾರಂಭಿಸಿ"
  },
  Hindi: {
    "Let's start from the beginning. Which country are you voting in?": "चलिए शुरू से शुरू करते हैं। आप किस देश में मतदान कर रहे हैं?",
    "India": "भारत (India)", "USA": "यूएसए (USA)", "Canada": "कनाडा (Canada)", "Nepal": "नेपाल (Nepal)",
    "Welcome! Let's get started. Which country are you voting in?": "स्वागत है! चलिए शुरू करते हैं। आप किस देश में मतदान कर रहे हैं?",
    "Please select a valid country from the options.": "कृपया विकल्पों में से एक वैध देश चुनें।",
    "Yes, I am a citizen": "हाँ, मैं नागरिक हूँ", "No, I am not": "नहीं, मैं नहीं हूँ",
    "Yes, help me find it": "हाँ, खोजने में मदद करें", "No, I know where it is": "नहीं, मुझे पता है",
    "Karnataka": "कर्नाटक", "Delhi": "दिल्ली", "Uttar Pradesh": "उत्तर प्रदेश", "Kerala": "केरल", "Other": "अन्य",
    "Finish": "समाप्त", "Start Over": "फिर से शुरू करें"
  },
  Tamil: {
    "Let's start from the beginning. Which country are you voting in?": "ஆரம்பத்திலிருந்தே தொடங்குவோம். நீங்கள் எந்த நாட்டில் வாக்களிக்கிறீர்கள்?",
    "India": "இந்தியா (India)", "USA": "அமெரிக்கா (USA)", "Canada": "கனடா (Canada)", "Nepal": "நேபாளம் (Nepal)",
    "Welcome! Let's get started. Which country are you voting in?": "வரவேற்கிறோம்! ஆரம்பிக்கலாம். நீங்கள் எந்த நாட்டில் வாக்களிக்கிறீர்கள்?",
    "Please select a valid country from the options.": "விருப்பங்களிலிருந்து சரியான நாட்டைத் தேர்ந்தெடுக்கவும்.",
    "Yes, I am a citizen": "ஆம், நான் குடிமகன்", "No, I am not": "இல்லை",
    "Yes, help me find it": "ஆம், உதவவும்", "No, I know where it is": "இல்லை, எனக்கு தெரியும்",
    "Karnataka": "கர்நாடகா", "Delhi": "டெல்லி", "Uttar Pradesh": "உத்தரபிரதேசம்", "Kerala": "கேரளா", "Other": "மற்றவை",
    "Finish": "முடிக்க", "Start Over": "மீண்டும் தொடங்கு"
  },
  Telugu: {
    "Let's start from the beginning. Which country are you voting in?": "మొదటినుండి ప్రారంభిద్దాం. మీరు ఏ దేశంలో ఓటు వేస్తున్నారు?",
    "India": "భారతదేశం (India)", "USA": "యుఎస్ఎ (USA)", "Canada": "కెనడా (Canada)", "Nepal": "నేపాల్ (Nepal)",
    "Welcome! Let's get started. Which country are you voting in?": "స్వాగతం! ప్రారంభిద్దాం. మీరు ఏ దేశంలో ఓటు వేస్తున్నారు?",
    "Please select a valid country from the options.": "దయచేసి ఎంపికల నుండి సరైన దేశాన్ని ఎంచుకోండి.",
    "Yes, I am a citizen": "అవును, నేను పౌరుడిని", "No, I am not": "కాదు",
    "Yes, help me find it": "అవును, సహాయం చేయండి", "No, I know where it is": "వద్దు, నాకు తెలుసు",
    "Karnataka": "కర్ణాటక", "Delhi": "ఢిల్లీ", "Uttar Pradesh": "ఉత్తర ప్రదేశ్", "Kerala": "కేరళ", "Other": "ఇతర",
    "Finish": "ముగించు", "Start Over": "మళ్ళీ ప్రారంభించండి"
  },
  Spanish: {
    "Let's start from the beginning. Which country are you voting in?": "Empecemos desde el principio. ¿En qué país vas a votar?",
    "India": "India", "USA": "EE.UU. (USA)", "Canada": "Canadá", "Nepal": "Nepal",
    "Welcome! Let's get started. Which country are you voting in?": "¡Bienvenido! Empecemos. ¿En qué país vas a votar?",
    "Please select a valid country from the options.": "Por favor, seleccione un país válido.",
    "Yes, I am a citizen": "Sí, soy ciudadano", "No, I am not": "No, no lo soy",
    "Yes, help me find it": "Sí, ayúdame a encontrarlo", "No, I know where it is": "No, ya sé dónde está",
    "Finish": "Terminar", "Start Over": "Empezar de nuevo"
  }
};

const translate = (text, language, dynamicVal1 = '', dynamicVal2 = '') => {
  if (language === 'English' || !translations[language]) return text;
  if (translations[language][text]) return translations[language][text];

  if (text.includes("Great! You selected")) {
     if (language === 'Kannada') return `ಉತ್ತಮ! ನೀವು ${dynamicVal1} ಆಯ್ಕೆ ಮಾಡಿದ್ದೀರಿ. ದಯವಿಟ್ಟು ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರನ್ನು ನಮೂದಿಸಿ.`;
     if (language === 'Hindi') return `बहुत बढ़िया! आपने ${dynamicVal1} चुना है। कृपया अपना पूरा नाम दर्ज करें।`;
     if (language === 'Tamil') return `நன்று! நீங்கள் ${dynamicVal1} ஐ தேர்ந்தெடுத்தீர்கள். உங்கள் முழுப் பெயரை உள்ளிடவும்.`;
     if (language === 'Telugu') return `గొప్పది! మీరు ${dynamicVal1} ఎంచుకున్నారు. దయచేసి మీ పూర్తి పేరు నమోదు చేయండి.`;
     if (language === 'Spanish') return `¡Genial! Has seleccionado ${dynamicVal1}. Por favor ingresa tu nombre completo.`;
  }
  
  if (text.includes("Thanks,")) {
     if (language === 'Kannada') return `ಧನ್ಯವಾದಗಳು, ${dynamicVal1}. ನಿಮ್ಮ ವಯಸ್ಸನ್ನು ಪರಿಶೀಲಿಸಲು, ದಯವಿಟ್ಟು ನಿಮ್ಮ ಸರ್ಕಾರಿ ಐಡಿಯ ಫೋಟೋವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.`;
     if (language === 'Hindi') return `धन्यवाद, ${dynamicVal1}। अपनी आयु सत्यापित करने के लिए, कृपया अपनी सरकारी आईडी की एक फोटो अपलोड करें।`;
     if (language === 'Tamil') return `நன்றி, ${dynamicVal1}. உங்கள் வயதை சரிபார்க்க, உங்கள் அரசு அடையாள அட்டையின் புகைப்படத்தை பதிவேற்றவும்.`;
     if (language === 'Telugu') return `ధన్యవాదాలు, ${dynamicVal1}. మీ వయస్సు ధృవీకరించడానికి, దయచేసి మీ ప్రభుత్వ ID ఫోటోను అప్‌లోడ్ చేయండి.`;
     if (language === 'Spanish') return `Gracias, ${dynamicVal1}. Para verificar tu edad, sube una foto de tu identificación oficial.`;
  }

  if (text.includes("Age verified!")) {
    if (language === 'Kannada') return `✅ ವಯಸ್ಸು ಪರಿಶೀಲಿಸಲಾಗಿದೆ! ನಿಮಗೆ ${dynamicVal1} ವರ್ಷ. ನೀವು ಮತದಾನಕ್ಕೆ ಅರ್ಹರು.\n\nಮುಂದಿನ ಹಂತ: ನೀವು ${dynamicVal2} ಪ್ರಜೆಯೇ?`;
    if (language === 'Hindi') return `✅ आयु सत्यापित! आप ${dynamicVal1} वर्ष के हैं। आप मतदान के योग्य हैं।\n\nअगला कदम: क्या आप ${dynamicVal2} के नागरिक हैं?`;
    if (language === 'Tamil') return `✅ வயது சரிபார்க்கப்பட்டது! உங்களுக்கு ${dynamicVal1} வயது. நீங்கள் வாக்களிக்க தகுதியானவர்.\n\nஅடுத்த படி: நீங்கள் ${dynamicVal2} குடிமகனா?`;
    if (language === 'Telugu') return `✅ వయస్సు ధృవీకరించబడింది! మీకు ${dynamicVal1} సంవత్సరాలు. మీరు ఓటు వేయడానికి అర్హులు.\n\nతదుపరి దశ: మీరు ${dynamicVal2} పౌరులేనా?`;
    if (language === 'Spanish') return `✅ ¡Edad verificada! Tienes ${dynamicVal1} años, lo que cumple el requisito.\n\nSiguiente paso: ¿Eres ciudadano de ${dynamicVal2}?`;
  }

  if (text.includes("Since you are already verified in our database as registered")) {
    if (language === 'Kannada') return "✅ ಉತ್ತಮ! ನಮ್ಮ ಡೇಟಾಬೇಸ್‌ನಲ್ಲಿ ನೀವು ನೋಂದಾಯಿತರಾಗಿದ್ದೀರಿ ಎಂದು ನಾವು ಕಂಡುಕೊಂಡಿದ್ದೇವೆ. ಈಗ ನಿಮ್ಮ ಮತಗಟ್ಟೆಯನ್ನು ಹುಡುಕೋಣ. ನಿಮಗೆ ಸಹಾಯ ಬೇಕೇ?";
    if (language === 'Hindi') return "✅ बहुत बढ़िया! आप हमारे डेटाबेस में पंजीकृत हैं। अब हम आपका मतदान केंद्र खोज सकते हैं। क्या आपको मदद चाहिए?";
    if (language === 'Tamil') return "✅ சிறப்பு! எங்கள் தரவுத்தளத்தில் நீங்கள் பதிவு செய்யப்பட்டுள்ளீர்கள். இப்போது உங்கள் வாக்குச்சாவடியைக் கண்டுபிடிப்போம். உங்களுக்கு உதவி வேண்டுமா?";
    if (language === 'Telugu') return "✅ గొప్పది! మా డేటాబేస్‌లో మీరు నమోదు చేయబడ్డారు. ఇప్పుడు మీ పోలింగ్ బూత్‌ను కనుగొందాం. మీకు సహాయం కావాలా?";
    if (language === 'Spanish') return "✅ ¡Genial! Como ya estás registrado, podemos encontrar tu lugar de votación. ¿Necesitas ayuda?";
  }

  if (text.includes("To find your polling station, I need your region/state")) {
    if (language === 'Kannada') return "ನಿಮ್ಮ ಮತಗಟ್ಟೆಯನ್ನು ಹುಡುಕಲು, ನಿಮ್ಮ ರಾಜ್ಯ/ಪ್ರದೇಶದ ಅಗತ್ಯವಿದೆ. ನೀವು ಯಾವ ರಾಜ್ಯದಲ್ಲಿದ್ದೀರಿ?";
    if (language === 'Hindi') return "आपका मतदान केंद्र खोजने के लिए, मुझे आपके राज्य/क्षेत्र की आवश्यकता है। आप किस राज्य में हैं?";
    if (language === 'Tamil') return "உங்கள் வாக்குச்சாவடியைக் கண்டுபிடிக்க, எனக்கு உங்கள் மாநிலம் தேவை. நீங்கள் எந்த மாநிலத்தில் இருக்கிறீர்கள்?";
    if (language === 'Telugu') return "మీ పోలింగ్ బూత్‌ను కనుగొనడానికి, నాకు మీ రాష్ట్రం కావాలి. మీరు ఏ రాష్ట్రంలో ఉన్నారు?";
    if (language === 'Spanish') return "Para encontrar tu lugar de votación, necesito saber tu estado o provincia. ¿Cuál es?";
  }

  if (text.includes("📍 Found it! Based on our mock data")) {
    if (language === 'Kannada') return `📍 ಸಿಕ್ಕಿತು! ${dynamicVal1} ಗಾಗಿ, ನಿಮ್ಮ ಹತ್ತಿರದ ಮತಗಟ್ಟೆ:\n\n**ಸೆಂಟ್ರಲ್ ಹೈಸ್ಕೂಲ್ ಜಿಮ್ನಾಷಿಯಂ**\n123 ಮೇನ್ ಸ್ಟ್ರೀಟ್.\nಬೆಳಿಗ್ಗೆ 7 ರಿಂದ ರಾತ್ರಿ 8 ರವರೆಗೆ.\n\nನೀವು ಮತದಾನಕ್ಕೆ ಸಿದ್ಧರಾಗಿದ್ದೀರಿ!`;
    if (language === 'Hindi') return `📍 मिल गया! ${dynamicVal1} के लिए, आपका निकटतम मतदान केंद्र है:\n\n**सेंट्रल हाई स्कूल जिमनैजियम**\n123 मेन स्ट्रीट।\nसुबह 7 से रात 8 बजे तक खुला।\n\nआप पूरी तरह तैयार हैं!`;
    if (language === 'Tamil') return `📍 கிடைத்தது! ${dynamicVal1} க்கான உங்கள் வாக்குச்சாவடி:\n\n**சென்ட்ரல் ஹை ஸ்கூல்**\n123 மெயின் ஸ்ட்ரீட்.\nகாலை 7 மணி முதல் இரவு 8 மணி வரை.\n\nநீங்கள் வாக்களிக்க தயாராக உள்ளீர்கள்!`;
    if (language === 'Telugu') return `📍 దొరికింది! ${dynamicVal1} కొరకు, మీ పోలింగ్ బూత్:\n\n**సెంట్రల్ హైస్కూల్**\n123 మెయిన్ స్ట్రీట్.\nఉదయం 7 నుండి రాత్రి 8 వరకు.\n\nమీరు ఓటు వేయడానికి సిద్ధంగా ఉన్నారు!`;
    if (language === 'Spanish') return `📍 ¡Encontrado! Para ${dynamicVal1}, tu lugar de votación es:\n\n**Gimnasio de la Escuela Central**\n123 Main St.\nAbierto de 7 AM a 8 PM.\n\n¡Estás preparado!`;
  }

  return text;
};

const translateOptions = (optionsArray, language) => {
  if (language === 'English' || !translations[language]) return optionsArray;
  return optionsArray.map(opt => translations[language][opt] || opt);
};

export const processUserMessage = async (message, currentState, updateState) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  const lowerMsg = message.toLowerCase();
  
  let lang = currentState.language || 'English';
  if (lowerMsg.includes('explain in kannada')) lang = 'Kannada';
  if (lowerMsg.includes('explain in hindi')) lang = 'Hindi';
  if (lowerMsg.includes('explain in tamil')) lang = 'Tamil';
  if (lowerMsg.includes('explain in telugu')) lang = 'Telugu';
  if (lowerMsg.includes('explain in spanish')) lang = 'Spanish';

  // --- RESTART / START OVER ---
  if (lowerMsg.includes('start over') || lowerMsg.includes('explain in') || lowerMsg.includes('ಮತ್ತೆ') || lowerMsg.includes('फिर')) {
      updateState({
        country: null, name: null, dob: null, isVerified: false,
        eligibilityChecked: false, isEligible: null, isRegistered: null,
        voterIdVerified: null, pollingStationFound: null, voted: false,
        state: null, awaitingInput: null
      });
      return {
        text: translate("Let's start from the beginning. Which country are you voting in?", lang),
        options: translateOptions(["India", "USA", "Canada", "Nepal"], lang),
        clearHistory: true
      };
  }

  // --- INITIAL / GREETING ---
  if (lowerMsg.includes('how do i vote') || lowerMsg.includes('start') || lowerMsg.includes('hello')) {
    if (!currentState.country && currentState.awaitingInput !== 'NAME' && currentState.awaitingInput !== 'DOB') {
      return {
        text: translate("Welcome! Let's get started. Which country are you voting in?", lang),
        options: translateOptions(["India", "USA", "Canada", "Nepal"], lang)
      };
    }
  }

  // --- VERIFICATION FLOW ---
  if (!currentState.isVerified) {
    if (!currentState.country && currentState.awaitingInput !== 'NAME' && currentState.awaitingInput !== 'DOB') {
      const isIndia = ['india', 'ಭಾರತ', 'भारत', 'இந்தியா', 'భారతదేశం'].some(c => lowerMsg.includes(c));
      const isUSA = ['usa', 'ಯುಎಸ್ಎ', 'यूएसए', 'அமெரிக்கா', 'యుఎస్ఎ'].some(c => lowerMsg.includes(c));
      const isCanada = ['canada', 'ಕೆನಡಾ', 'कनाडा', 'கனடா', 'కెనడా'].some(c => lowerMsg.includes(c));
      const isNepal = ['nepal', 'ನೇಪಾಳ', 'नेपाल', 'நேபாளம்', 'నేపాల్'].some(c => lowerMsg.includes(c));

      if (isIndia || isUSA || isCanada || isNepal) {
        let selectedCountry = 'India';
        if (isUSA) selectedCountry = 'USA';
        if (isCanada) selectedCountry = 'Canada';
        if (isNepal) selectedCountry = 'Nepal';

        updateState({ country: selectedCountry, awaitingInput: 'NAME' });
        return {
          text: translate(`Great! You selected ${selectedCountry}. Please enter your full name.`, lang, selectedCountry),
          options: []
        };
      } else {
        return { 
          text: translate("Please select a valid country from the options.", lang), 
          options: translateOptions(["India", "USA", "Canada", "Nepal"], lang) 
        };
      }
    }
    
    if (currentState.awaitingInput === 'NAME') {
      updateState({ name: message, awaitingInput: 'OCR_ID' });
      return {
        text: translate(`Thanks, ${message}. To verify your age securely, please upload a clear photo of your Government ID.`, lang, message),
        requiresUpload: true,
        options: []
      };
    }

    if (currentState.awaitingInput === 'OCR_ID' || currentState.awaitingInput === 'DOB') {
      let dobToUse = message;
      let isScanned = false;
      
      if (message.includes('SCAN_SUCCESS')) {
         dobToUse = message.split(': ')[1];
         isScanned = true;
      }
      
      const age = calculateAge(dobToUse);
      
      if (isNaN(age)) {
         return {
           text: "We couldn't read the date. Please try uploading again, or manually type your Date of Birth (YYYY-MM-DD).",
           requiresUpload: true,
           options: ["2000-01-15"]
         };
      }

      if (age < 18) {
         updateState({ dob: dobToUse, isVerified: true, eligibilityChecked: true, isEligible: false, awaitingInput: null });
         return {
           text: `⚠️ Based on your Date of Birth, you are ${age} years old. You must be at least 18 to vote. You cannot register yet, but you can still learn about the process!`,
           options: translateOptions(["Start Over"], lang)
         };
      } else {
         const userMatch = mockDatabase.find(
            user => user.name.toLowerCase() === currentState.name.toLowerCase() && 
                    user.country === currentState.country
         );
         
         updateState({ 
            dob: dobToUse, isVerified: true, awaitingInput: null,
            isRegistered: userMatch ? userMatch.registered : null
         });

         const translateCountry = translateOptions([currentState.country], lang)[0];
         let scanPrefix = isScanned ? `✅ ID Scanned Successfully! Extracted DOB: ${dobToUse}\n\n` : '';

         return {
            text: scanPrefix + translate(`✅ Age verified! You are ${age} years old, which meets the age requirement.\n\nNext step: Are you a citizen of ${currentState.country}?`, lang, age, translateCountry),
            options: translateOptions(["Yes, I am a citizen", "No, I am not"], lang)
         };
      }
    }
  }

  // --- ELIGIBILITY FLOW ---
  if (currentState.isVerified && !currentState.eligibilityChecked) {
    const isYes = ['yes', 'ಹೌದು', 'हाँ', 'ஆம்', 'అవును', 'sí'].some(c => lowerMsg.includes(c));
    const isNo = ['no', 'ಇಲ್ಲ', 'नहीं', 'இல்லை', 'కాదు'].some(c => lowerMsg.includes(c));

    if (isYes) {
      updateState({ eligibilityChecked: true, isEligible: true });
      
      if (currentState.isRegistered) {
         return {
          text: translate("✅ Great! Since you are already verified in our database as registered, we can skip registration and move to finding your polling station. Do you need help finding it?", lang),
          options: translateOptions(["Yes, help me find it", "No, I know where it is"], lang)
        };
      } else {
        return {
          text: translate("✅ Great! You are eligible to vote.\n\nAccording to our records, you are NOT registered yet. Would you like me to guide you through registration?", lang),
          options: translateOptions(["Yes, guide me", "No, I will do it later"], lang)
        };
      }
    } else if (isNo) {
      updateState({ eligibilityChecked: true, isEligible: false });
      return {
        text: "⚠️ You must be a citizen to vote in federal/national elections. Please check local laws for exceptions.",
        options: translateOptions(["Start Over"], lang)
      };
    }
  }

  // --- REGISTRATION FLOW ---
  if (currentState.isEligible && currentState.isRegistered === false && currentState.awaitingInput !== 'CONFIRM_REGISTRATION') {
    const isYes = ['yes', 'guide', 'ಹೌದು', 'हाँ', 'ஆம்', 'అవును', 'sí'].some(c => lowerMsg.includes(c));
    const isNo = ['no', 'later', 'ಇಲ್ಲ', 'नहीं', 'இல்லை', 'కాదు'].some(c => lowerMsg.includes(c));
    
    if (isYes) {
      let officialUrl = "https://vote.gov"; // USA default
      if (currentState.country === 'India') officialUrl = "https://voters.eci.gov.in/";
      if (currentState.country === 'Canada') officialUrl = "https://www.elections.ca/";
      if (currentState.country === 'Nepal') officialUrl = "https://election.gov.np/";

      updateState({ awaitingInput: 'CONFIRM_REGISTRATION' });
      return {
        text: translate(`To ensure strict data privacy and compliance, we redirect you to the official government portal for the legally binding registration step.\n\nPlease click the secure link below to register. Once completed, click "I have registered".`, lang),
        externalLink: officialUrl,
        externalLinkText: `🔗 Official ${currentState.country} Voter Portal`,
        options: translateOptions(["I have registered", "I will do it later"], lang)
      };
    } else if (isNo) {
      return {
         text: "No problem! You can come back and register anytime before the deadline. Have a great day!",
         options: translateOptions(["Start Over"], lang)
      };
    }
  }

  if (currentState.awaitingInput === 'CONFIRM_REGISTRATION') {
      const isYes = ['registered', 'yes', 'done', 'ಹೌದು', 'हाँ'].some(c => lowerMsg.includes(c));
      if (isYes) {
         updateState({ isRegistered: true, awaitingInput: null });
         return {
           text: translate("✅ Awesome! Now that you are officially registered, let's find your polling station. Do you need help finding it?", lang),
           options: translateOptions(["Yes, help me find it", "No, I know where it is"], lang)
         };
      } else {
         return {
            text: translate("No problem! Take your time.", lang),
            options: translateOptions(["Start Over"], lang)
         };
      }
  }

  // --- POLLING STATION FLOW ---
  if (currentState.isRegistered && currentState.pollingStationFound === null) {
    const isYes = ['yes', 'ಹೌದು', 'हाँ', 'ஆம்', 'అవును', 'sí'].some(c => lowerMsg.includes(c));
    const isNo = ['no', 'ಇಲ್ಲ', 'नहीं', 'இல்லை', 'కాదు'].some(c => lowerMsg.includes(c));

    if (isYes) {
      let options = ["Other"];
      if (currentState.country === 'India') {
        options = ["Karnataka", "Delhi", "Uttar Pradesh", "Kerala", "Other"];
      } else if (currentState.country === 'USA') {
        options = ["California", "Texas", "New York", "Florida", "Other"];
      } else if (currentState.country === 'Canada') {
        options = ["Ontario", "Quebec", "British Columbia", "Alberta", "Other"];
      } else if (currentState.country === 'Nepal') {
        options = ["Bagmati", "Gandaki", "Lumbini", "Karnali", "Other"];
      }
      return {
        text: translate(`To find your polling station, I need your region/state. What state or province are you in?`, lang),
        options: translateOptions(options, lang)
      };
    } else if (isNo) {
      updateState({ pollingStationFound: true });
      return {
        text: "Great! You are all set for Election Day.\n\nRemember to bring your valid Voter ID or accepted Photo ID. Happy voting! 🗳️",
        options: translateOptions(["Start Over"], lang)
      };
    }
  }

  // --- LOCATION HANDLING ---
  if (currentState.isRegistered && currentState.pollingStationFound === null) {
    updateState({ pollingStationFound: true, state: message });
    return {
      text: translate(`📍 Found it! Based on our mock data for ${message}, your nearest polling station is:\n\n**Central High School Gymnasium**\n123 Main St.\nOpen from 7 AM to 8 PM.\n\nYou are fully prepared for Election Day!`, lang, message),
      options: translateOptions(["Finish"], lang),
      mapQuery: `Central High School ${message}`
    };
  }

  // --- FINAL / DEFAULT ---
  if (lowerMsg.includes('finish') || lowerMsg.includes('ಮುಕ್ತಾಯ') || lowerMsg.includes('समाप्त')) {
     updateState({ voted: true });
     return {
       text: "You're very welcome! If you have any other questions, feel free to ask.",
       options: translateOptions(["Start Over"], lang)
     };
  }

  return {
    text: "I'm not sure how to respond to that.",
    options: translateOptions(["Start Over"], lang)
  };
};
