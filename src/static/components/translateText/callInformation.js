const callInformation = {
    VOICELANGUAGE: {
        "af": "Hoe lank is hierdie oproep in?",
        "am": "ይህ ጥሪ ወደ የትኛው ነው?",
        "ar": "ما هو languange في هذه الدعوة؟",
        "az": "Bu zəng nədir?",
        "be": "Што Languange гэты выклік у?",
        "bg": "Каква е тази покана?",
        "bn": "এই languange কি কল?",
        "bs": "Koji je to poziv?",
        "ca": "En quin llenguatge hi ha aquesta crida?",
        "ceb": "Unsa man ang tawag niini?",
        "co": "Chì parli è sta chjamata?",
        "cs": "Jakým jazykem je toto volání?",
        "cy": "Pa mor fach yw&#39;r alwad hon?",
        "da": "Hvor længe er dette opkald?",
        "de": "Welche Sprache ist dieser Ruf?",
        "el": "Σε ποια γλώσσα είναι αυτή η κλήση;",
        "en": "What languange is this call in?",
        "eo": "Kio estas ĉi tiu alvoko?",
        "es": "¿En qué idioma está esta llamada?",
        "et": "Mis keelt on see kõne?",
        "eu": "Zer hizkuntzatan dago deialdi hau?",
        "fa": "چه پنجره ای این تماس است؟",
        "fi": "Mikä languange on tämä puhelu?",
        "fr": "Quelle langue est cet appel?",
        "fy": "Hokker languange is dit oanrop yn?",
        "ga": "Cad é an teanga seo an glaoch?",
        "gd": "Dè an t-ainm a th &#39;air a&#39; ghairm seo?",
        "gl": "¿Que idioma hai neste chamada?",
        "gu": "આ કોલ શું છે?",
        "ha": "Mene ne wannan kira yake?",
        "haw": "He aha ka mana o kēia kipa?",
        "hi": "इस कॉल में क्या लापरवाही है?",
        "hmn": "Dab tsi yog qhov teeb meem hauv txoj hauj lwm?",
        "hr": "Kakav je ovaj poziv?",
        "ht": "Ki languange sa a rele nan?",
        "hu": "Milyen languange ez a hívás?",
        "hy": "Ինչ տանջանք է այս զանգը:",
        "id": "Bahasa apa yang dimaksud dengan panggilan ini?",
        "ig": "Kedu ụdị oku a na-akpọ?",
        "is": "Hvað er þetta símtal í?",
        "it": "In che lingua è questa chiamata?",
        "iw": "לאיזו שיחה מדובר?",
        "ja": "どんなlanguangeがこの電話ですか？",
        "jw": "Apa wae telpon iki?",
        "ka": "რა ჩანჩქერია ეს ზარი?",
        "kk": "Бұл қоңырау қандай ланганж болып табылады?",
        "km": "តើការហៅទូរស័ព្ទនេះជាអ្វី?",
        "kn": "ಈ ಕರೆ ಯಾವುದು?",
        "ko": "이 전화는 뭐야?",
        "ku": "Ev kîjanange çi ye?",
        "ky": "Кандай languange Бул чакыруу болуп саналат?",
        "la": "In languange quid est?",
        "lb": "Wat languange ass dësen Uruff an?",
        "lo": "ໂທຫານີ້ແມ່ນຫຍັງ?",
        "lt": "Koks kalba yra šis skambutis?",
        "lv": "Kuru valodu ir šis zvans?",
        "mg": "Inona ny halalin&#39;io antso io?",
        "mi": "He aha te reo o tenei karangatanga?",
        "mk": "Каков авангарден е овој повик?",
        "ml": "ഈ കോൾ ഏത് അപകടമാണ്?",
        "mn": "Энэ дуудлага ямар вэ?",
        "mr": "हा कॉल किती शांत आहे?",
        "ms": "Apa gunanya panggilan ini?",
        "mt": "X&#39;inhu languange f&#39;din is-sejħa?",
        "my": "ဤခေါ်ဆိုမှုတှငျအဘယျ languange ပါသလဲ",
        "ne": "यो languange यो कल हो?",
        "nl": "In welk taalgebruik is deze oproep binnen?",
        "no": "Hvor lang tid er denne anropet?",
        "ny": "Kodi kuyitana uku ndi chiyani?",
        "pa": "ਇਸ ਵਿਚ ਕੀ ਕਾਲ ਹੈ?",
        "pl": "Jakie oswojenie to wezwanie?",
        "ps": "دا تلیفون څه دی؟",
        "pt": "Em que languange esta chamada?",
        "ro": "Ce limbă este acest apel?",
        "ru": "Что за этот разговор?",
        "sd": "ڇا ڇا تڪرار هن سڏ ۾ آهي؟",
        "si": "මෙම ඇමතුම කුමක්ද?",
        "sk": "Akým jazykom je táto výzva?",
        "sl": "V kakšnem jeziku je ta klic?",
        "sm": "O le a le faʻailoga o lenei valaʻau?",
        "sn": "Ndezvipi zvinoratidzirwa neizvi?",
        "so": "Dhibaato noocee ah waa wicitaankan?",
        "sq": "Çfarë languange është kjo thirrje në?",
        "sr": "Који језик је овај позив?",
        "st": "Ke pitso efe moo pitso ee e leng teng?",
        "su": "Naon languange is panggero ieu?",
        "sv": "Vilken languange är det här samtalet?",
        "sw": "Nini languange ni simu hii?",
        "ta": "இந்த அழைப்பிதழ் என்ன?",
        "te": "ఈ పిలుపు ఏమిటి?",
        "tg": "Ин даъвати мазкур дар чист?",
        "th": "อะไร languange คือสายนี้?",
        "tl": "Ano ang tawag dito?",
        "tr": "Bu çağrı ne demek oluyor?",
        "uk": "Який мовний цей дзвінок?",
        "ur": "کیا سلیجنگ اس کال میں ہے؟",
        "uz": "Ushbu chaqiruv nimani anglatadi?",
        "vi": "Cuộc gọi này là gì?",
        "xh": "Yiyiphi na le ngxaki?",
        "yi": "וואָס לאַנג איז די רופן אין?",
        "yo": "Kini gbigbọn ni ipe yii ni?",
        "zh-TW": "這個電話是什麼語言？",
        "zh": "这个电话是什么语言？",
        "zu": "Yini i-languange yile kholi?"
    },
    CALLERNAME: {
        "af": "Wie wil jy bel?",
        "am": "ማንን መደወል ይፈልጋሉ?",
        "ar": "الذي تريد للاتصال؟",
        "az": "Kimə zəng etmək istərdiniz?",
        "be": "З кім бы вы хацелі назваць?",
        "bg": "На кого искате да се обадите?",
        "bn": "আপনি কে কল করতে চান?",
        "bs": "Koga biste želeli nazvati?",
        "ca": "A qui t&#39;agradaria trucar?",
        "ceb": "Kinsa ang gusto nimo nga tawagon?",
        "co": "Quale voli vulete chjamà?",
        "cs": "Kdo by chtěl volat?",
        "cy": "Pwy hoffech chi alw?",
        "da": "Hvem vil du ringe til?",
        "de": "Wen wollen Sie anrufen?",
        "el": "Ποιος θα θέλατε να καλέσετε;",
        "en": "Who would you like to call?",
        "eo": "Kiun vi volas nomi?",
        "es": "¿A quién te gustaría llamar?",
        "et": "Keda sa tahaksid helistada?",
        "eu": "Nork deitu nahi al duzu?",
        "fa": "چه کسی دوست داری تماس بگیری؟",
        "fi": "Kenen haluat soittaa?",
        "fr": "Qui voudriez-vous appeler?",
        "fy": "Wa wolle jo oproppe?",
        "ga": "Cé ar mhaith leat glaoch?",
        "gd": "Cò ris a bu mhath leat a ghairm?",
        "gl": "A quen che gustaría chamar?",
        "gu": "તમે કોને કૉલ કરવા માંગો છો?",
        "ha": "Wa kuke so ku kira?",
        "haw": "ʻO wai ka makemake e kāhea?",
        "hi": "आप किससे फोन करना चाहते हैं?",
        "hmn": "Leej twg xav kom koj hu?",
        "hr": "Tko biste željeli nazvati?",
        "ht": "Ki moun ou ta renmen rele?",
        "hu": "Ki hívna?",
        "hy": "Ով կցանկանայիք զանգահարել:",
        "id": "Siapa yang ingin Anda hubungi?",
        "ig": "Kedu onye ị ga-achọ ịkpọ?",
        "is": "Hver viltu hringja?",
        "it": "Chi vorresti chiamare?",
        "iw": "למי היית רוצה להתקשר?",
        "ja": "あなたは誰に電話したいですか？",
        "jw": "Sapa sing sampeyan pengin nelpon?",
        "ka": "ვინ მოგწონთ?",
        "kk": "Кімге қоңырау шалғыңыз келеді?",
        "km": "តើអ្នកចង់ហៅទូរស័ព្ទទៅអ្នកណា?",
        "kn": "ನೀವು ಯಾರನ್ನು ಕರೆ ಮಾಡಲು ಬಯಸುತ್ತೀರಿ?",
        "ko": "누구 한테 전화하고 싶니?",
        "ku": "Ma kî ê dixwazî ​​bang bikî?",
        "ky": "Кимге чалайын келет?",
        "la": "Qui velis vocare?",
        "lb": "Wiem géift Dir geroden?",
        "lo": "ເຈົ້າຢາກໂທຫາໃຜ?",
        "lt": "Kam norėtum paskambinti?",
        "lv": "Kuru jūs vēlētos zvanīt?",
        "mg": "Iza no tianao hiantso?",
        "mi": "Ko wai ka hiahia koe ki te karanga?",
        "mk": "Кој би сакал да се јавите?",
        "ml": "നിങ്ങൾക്ക് ആരെയാണ് വിളിക്കേണ്ടത്?",
        "mn": "Та хэн рүү залгах вэ?",
        "mr": "आपण कोणास कॉल करू इच्छिता?",
        "ms": "Siapa yang anda mahu hubungi?",
        "mt": "Lil min toqgħod?",
        "my": "အဘယ်သူသည်သင်တို့ကိုခေါ်လိုပါသနည်း",
        "ne": "तपाई कसलाई कल गर्न चाहानुहुन्छ?",
        "nl": "Wie zou je willen bellen?",
        "no": "Hvem vil du ringe?",
        "ny": "Kodi mukufuna kuitana ndani?",
        "pa": "ਤੁਸੀਂ ਕਿਸਨੂੰ ਕਾਲ ਕਰਨਾ ਪਸੰਦ ਕਰੋਗੇ?",
        "pl": "Do kogo chciałbyś zadzwonić?",
        "ps": "تاسو څوک غواړی چې تلیفون وکړئ؟",
        "pt": "Quem você gostaria de ligar?",
        "ro": "Cui doriți să sunați?",
        "ru": "Кого бы вы хотели назвать?",
        "sd": "توهان ڪير سڏيندو؟",
        "si": "ඔබට ඇමතීමට කැමැති ද?",
        "sk": "Kto by ste radi zavolali?",
        "sl": "Koga bi radi poklicali?",
        "sm": "O ai e te fia valaʻau i ai?",
        "sn": "Ndiani waungada kudana?",
        "so": "Yaad jeclaan lahayd inaad wacdo?",
        "sq": "Kush do të dëshironit të thërrisni?",
        "sr": "Кога бисте желели назвати?",
        "st": "U ka rata ho bitsa mang?",
        "su": "Saha Rék nelepon?",
        "sv": "Vem vill du ringa?",
        "sw": "Nani ungependa kupiga simu?",
        "ta": "நீங்கள் யாரை அழைக்க விரும்புகிறீர்கள்?",
        "te": "మీరు ఎవరు కాల్ చేయాలనుకుంటున్నారు?",
        "tg": "Шумо мехоҳед, ки занг занед?",
        "th": "คุณต้องการโทรหาใคร?",
        "tl": "Sino ang gusto mong tawagan?",
        "tr": "Kimi aramak istersiniz?",
        "uk": "Кому б Ви хотіли зателефонувати?",
        "ur": "آپ کون فون کرنا چاہتے ہیں؟",
        "uz": "Kimga qo&#39;ng&#39;iroq qilishni xohlaysiz?",
        "vi": "Bạn muốn gọi ai?",
        "xh": "Ngubani ongathanda ukubiza?",
        "yi": "ווער וואָלט איר ווי צו רופן?",
        "yo": "Tani iwọ yoo fẹ lati pe?",
        "zh-TW": "你想給誰打個電話？",
        "zh": "你想给谁打个电话？",
        "zu": "Ubani ongathanda ukubiza?"
    },
    PHONENUMBER: {
        "af": "Wat is die telefoonnommer?",
        "am": "የስልክ ቁጥሩ ምንድን ነው?",
        "ar": "ما هو رقم الهاتف؟",
        "az": "Telefon nömrəsi nədir?",
        "be": "Што такое нумар тэлефона?",
        "bg": "Какъв е телефонният номер?",
        "bn": "ফোন নম্বর কি?",
        "bs": "Koji je broj telefona?",
        "ca": "Quin és el número de telèfon?",
        "ceb": "Unsa ang numero sa telepono?",
        "co": "Qualessu hè u telefunu?",
        "cs": "Co je to telefonní číslo?",
        "cy": "Beth yw&#39;r rhif ffôn?",
        "da": "Hvad er telefonnummeret?",
        "de": "Was ist die Telefonnummer?",
        "el": "Ποιος είναι ο αριθμός τηλεφώνου;",
        "en": "What is the phone number?",
        "eo": "Kio estas la telefona nombro?",
        "es": "¿Cuál es el número de teléfono?",
        "et": "Mis on telefoninumber?",
        "eu": "Zein da telefono zenbakia?",
        "fa": "شماره تلفن چیست؟",
        "fi": "Mikä on puhelinnumero?",
        "fr": "Quel est le numéro de téléphone?",
        "fy": "Wat is it tillefoannûmer?",
        "ga": "Cad é an uimhir theileafóin?",
        "gd": "Dè an àireamh fòn a th &#39;ann?",
        "gl": "Cal é o número de teléfono?",
        "gu": "ફોન નંબર શું છે?",
        "ha": "Menene lambar waya?",
        "haw": "He aha ke helu kelepona?",
        "hi": "फोन नंबर क्या है?",
        "hmn": "Tus xov tooj yog dab tsi?",
        "hr": "Koji je telefonski broj?",
        "ht": "Ki nimewo telefòn lan?",
        "hu": "Mi a telefonszám?",
        "hy": "Որն է հեռախոսահամարը:",
        "id": "Berapa nomor teleponnya?",
        "ig": "Kedu nọmba ekwentị?",
        "is": "Hver er símanúmerið?",
        "it": "Qual è il numero di telefono?",
        "iw": "מהו מספר הטלפון?",
        "ja": "電話番号は何ですか？",
        "jw": "Apa nomer telpon?",
        "ka": "რა არის ტელეფონის ნომერი?",
        "kk": "Телефон нөмірі дегеніміз не?",
        "km": "តើលេខទូរស័ព្ទគឺជាអ្វី?",
        "kn": "ಫೋನ್ ಸಂಖ್ಯೆ ಏನು?",
        "ko": "전화 번호는 무엇입니까?",
        "ku": "Numreya telefonê çi ye?",
        "ky": "тел номери кандай?",
        "la": "Quod phone numerum?",
        "lb": "Wat ass Är Telefonsnummer?",
        "lo": "ຫມາຍເລກໂທລະສັບແມ່ນຫຍັງ?",
        "lt": "Koks yra telefono numeris?",
        "lv": "Kāds ir tālruņa numurs?",
        "mg": "Inona ny nomeraon-telefaona?",
        "mi": "He aha te tau waea?",
        "mk": "Кој е телефонскиот број?",
        "ml": "ഫോൺ നമ്പർ എന്താണ്?",
        "mn": "Утасны дугаар гэж юу вэ?",
        "mr": "फोन नंबर काय आहे?",
        "ms": "Apakah nombor telefon?",
        "mt": "X&#39;inhu n-numru tat-telefon?",
        "my": "ဖုန်းနံပါတ်ကဘာလဲ?",
        "ne": "फोन नम्बर के हो?",
        "nl": "Wat is het telefoonnummer?",
        "no": "Hva er telefonnummeret?",
        "ny": "Kodi nambala ya foni ndi chiyani?",
        "pa": "ਫੋਨ ਨੰਬਰ ਕੀ ਹੈ?",
        "pl": "Jaki jest numer telefonu?",
        "ps": "د تليفون شمېره څه ده؟",
        "pt": "Qual é o número do telefone?",
        "ro": "Care este numărul de telefon?",
        "ru": "Какой номер телефона?",
        "sd": "فون نمبر ڇا آهي؟",
        "si": "දුරකථන අංකය කුමක්ද?",
        "sk": "Aké je telefónne číslo?",
        "sl": "Kakšna je telefonska številka?",
        "sm": "O le a le numera telefoni?",
        "sn": "Ndeipi nhamba yefoni?",
        "so": "Waa maxay lambarka telefoonka?",
        "sq": "Cili është numri i telefonit?",
        "sr": "Који је број телефона?",
        "st": "Nomoro ea fono ke eng?",
        "su": "Naon jumlah telepon?",
        "sv": "Vad är telefonnumret?",
        "sw": "Nambari ya simu ni nini?",
        "ta": "தொலைபேசி எண் என்ன?",
        "te": "ఫోన్ నంబర్ అంటే ఏమిటి?",
        "tg": "Рақами телефон чист?",
        "th": "หมายเลขโทรศัพท์คืออะไร?",
        "tl": "Ano ang numero ng telepono?",
        "tr": "Telefon numarası nedir?",
        "uk": "Що таке номер телефону?",
        "ur": "فون نمبر کیا ہے؟",
        "uz": "Telefon raqami nima?",
        "vi": "Số điện thoại của bạn là gì?",
        "xh": "Iyiphi inombolo yefowuni?",
        "yi": "וואָס איז די טעלעפאָן נומער?",
        "yo": "Kini nọmba foonu naa?",
        "zh-TW": "電話號碼是多少？",
        "zh": "电话号码是多少？",
        "zu": "Iyini inombolo yocingo?"
    },
    MESSAGE: {
        "af": "Wat is jou boodskap?",
        "am": "የእርስዎ መልዕክት ምንድን ነው?",
        "ar": "ما هي رسالتك؟",
        "az": "Mesajınız nədir?",
        "be": "Якое ваша паведамленне?",
        "bg": "Какво е вашето послание?",
        "bn": "আপনার বার্তা কি?",
        "bs": "Koja je tvoja poruka?",
        "ca": "Quin és el teu missatge?",
        "ceb": "Unsa ang imong mensahe?",
        "co": "Chì ghjè u vostru messagiu?",
        "cs": "Jaká je vaše zpráva?",
        "cy": "Beth yw eich neges?",
        "da": "Hvad er din besked?",
        "de": "Was ist deine Nachricht?",
        "el": "Ποιο είναι το μήνυμά σας;",
        "en": "What is your message?",
        "eo": "Kio estas via mesaĝo?",
        "es": "Cual es tu mensaje",
        "et": "Mis on sinu sõnum?",
        "eu": "Zer da zure mezua?",
        "fa": "پیام شما چیست؟",
        "fi": "Mikä on viestisi?",
        "fr": "Quel est ton message?",
        "fy": "Wat is jo berjocht?",
        "ga": "Cad é do theachtaireacht?",
        "gd": "Dè a th &#39;anns an teachdaireachd agad?",
        "gl": "Cal é a túa mensaxe?",
        "gu": "તમારો સંદેશ શું છે?",
        "ha": "Menene sakonku?",
        "haw": "He aha kāu hua&#39;ōlelo?",
        "hi": "आपका संदेश क्या है?",
        "hmn": "Koj lus yog dab tsi?",
        "hr": "Koja je tvoja poruka?",
        "ht": "Ki mesaj ou ye?",
        "hu": "Mi az üzenete?",
        "hy": "Ինչ է ձեր հաղորդագրությունը:",
        "id": "Apa pesanmu?",
        "ig": "Kedu ozi gị?",
        "is": "Hvað er skilaboðin þín?",
        "it": "Qual è il tuo messaggio?",
        "iw": "מה המסר שלך?",
        "ja": "あなたのメッセージは何ですか？",
        "jw": "Apa pesenmu?",
        "ka": "რა არის თქვენი შეტყობინება?",
        "kk": "Сіздің хабарламаңыз қандай?",
        "km": "តើអ្វីជាសាររបស់អ្នក?",
        "kn": "ನಿಮ್ಮ ಸಂದೇಶವೇನು?",
        "ko": "당신의 메시지는 무엇입니까?",
        "ku": "Peyama te çi ye?",
        "ky": "Кандай кабар бар?",
        "la": "Nuntius Quod est opus tuum?",
        "lb": "Wat ass Är Noriicht?",
        "lo": "ຂໍ້ຄວາມຂອງທ່ານແມ່ນຫຍັງ?",
        "lt": "Kokia tavo žinia?",
        "lv": "Kāda ir tava vēstule?",
        "mg": "Inona ny hafatrao?",
        "mi": "He aha to karere?",
        "mk": "Која е вашата порака?",
        "ml": "നിങ്ങളുടെ സന്ദേശം എന്താണ്?",
        "mn": "Таны зурвас юу вэ?",
        "mr": "तुमचा संदेश कोणता आहे?",
        "ms": "Apakah mesej anda?",
        "mt": "X&#39;inhu l-messaġġ tiegħek?",
        "my": "သင့်ရဲ့မက်ဆေ့ခ်ျကိုကဘာလဲ?",
        "ne": "तिम्रो सन्देश के हो?",
        "nl": "Wat is jouw bericht?",
        "no": "Hva er meldingen din?",
        "ny": "Uthenga wanu ndi chiyani?",
        "pa": "ਤੁਹਾਡਾ ਸੁਨੇਹਾ ਕੀ ਹੈ?",
        "pl": "Jakie jest twoje przesłanie?",
        "ps": "ستاسو پیغام څه دی؟",
        "pt": "Qual é a sua mensagem?",
        "ro": "Care este mesajul dvs.?",
        "ru": "Каково ваше сообщение?",
        "sd": "توهان جو پيغام ڇا آهي؟",
        "si": "ඔබේ පණිවිඩය කුමක්ද?",
        "sk": "Aké je tvoja správa?",
        "sl": "Kakšno je vaše sporočilo?",
        "sm": "O le a lau savali?",
        "sn": "Ndeipi shoko rako?",
        "so": "Waa maxay fariintaada?",
        "sq": "Cili është mesazhi juaj?",
        "sr": "Која је твоја порука?",
        "st": "Molaetsa oa hau ke ofe?",
        "su": "Naon pesen anjeun?",
        "sv": "Vad är ditt meddelande?",
        "sw": "Ujumbe wako ni nini?",
        "ta": "உங்கள் செய்தி என்ன?",
        "te": "మీ సందేశం ఏమిటి?",
        "tg": "Хабари шумо чист?",
        "th": "ข้อความของคุณคืออะไร?",
        "tl": "Ano ang iyong mensahe?",
        "tr": "Mesajın nedir?",
        "uk": "Яке ваше повідомлення?",
        "ur": "آپ کا پیغام کیا ہے؟",
        "uz": "Sizning xabaringiz nima?",
        "vi": "Thông điệp của bạn là gì?",
        "xh": "Nguwuphi umyalezo wakho?",
        "yi": "וואָס איז דיין אָנזאָג?",
        "yo": "Kini ifiranṣẹ rẹ?",
        "zh-TW": "你的消息是什麼？",
        "zh": "你的消息是什么？",
        "zu": "Uyini umlayezo wakho?"
    }
}
export default callInformation;
