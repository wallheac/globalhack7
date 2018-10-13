const languages = [
  {
    "language": "af",
    "name": "Afrikaans"
  },
  {
    "language": "am",
    "name": "አማርኛ"
  },
  {
    "language": "ar",
    "name": "العربية"
  },
  {
    "language": "az",
    "name": "Azərbaycan dili"
  },
  {
    "language": "be",
    "name": "Беларуская"
  },
  {
    "language": "bg",
    "name": "български"
  },
  {
    "language": "bn",
    "name": "বাংলা"
  },
  {
    "language": "bs",
    "name": "bosanski"
  },
  {
    "language": "ca",
    "name": "català"
  },
  {
    "language": "ceb",
    "name": "Cebuano"
  },
  {
    "language": "co",
    "name": "Corse"
  },
  {
    "language": "cs",
    "name": "čeština"
  },
  {
    "language": "cy",
    "name": "Cymraeg"
  },
  {
    "language": "da",
    "name": "Dansk"
  },
  {
    "language": "de",
    "name": "Deutsch"
  },
  {
    "language": "el",
    "name": "Ελληνικά"
  },
  {
    "language": "en",
    "name": "English"
  },
  {
    "language": "eo",
    "name": "Esperanto"
  },
  {
    "language": "es",
    "name": "español"
  },
  {
    "language": "et",
    "name": "eesti"
  },
  {
    "language": "eu",
    "name": "euskara"
  },
  {
    "language": "fa",
    "name": "فارسی"
  },
  {
    "language": "fi",
    "name": "suomi"
  },
  {
    "language": "fr",
    "name": "Français"
  },
  {
    "language": "fy",
    "name": "Frysk"
  },
  {
    "language": "ga",
    "name": "Gaeilge"
  },
  {
    "language": "gd",
    "name": "Gàidhlig"
  },
  {
    "language": "gl",
    "name": "galego"
  },
  {
    "language": "gu",
    "name": "ગુજરાતી"
  },
  {
    "language": "ha",
    "name": "Hausa"
  },
  {
    "language": "haw",
    "name": "Hawaiian"
  },
  {
    "language": "hi",
    "name": "हिन्दी"
  },
  {
    "language": "hmn",
    "name": "Hmong"
  },
  {
    "language": "hr",
    "name": "hrvatski"
  },
  {
    "language": "ht",
    "name": "Kreyòl Ayisyen"
  },
  {
    "language": "hu",
    "name": "magyar"
  },
  {
    "language": "hy",
    "name": "հայերեն"
  },
  {
    "language": "id",
    "name": "Indonesia"
  },
  {
    "language": "ig",
    "name": "Igbo"
  },
  {
    "language": "is",
    "name": "íslenska"
  },
  {
    "language": "it",
    "name": "Italiano"
  },
  {
    "language": "iw",
    "name": "עברית"
  },
  {
    "language": "ja",
    "name": "日本語"
  },
  {
    "language": "jw",
    "name": "Javanese"
  },
  {
    "language": "ka",
    "name": "ქართული"
  },
  {
    "language": "kk",
    "name": "қазақ"
  },
  {
    "language": "km",
    "name": "ខ្មែរ"
  },
  {
    "language": "kn",
    "name": "ಕನ್ನಡ"
  },
  {
    "language": "ko",
    "name": "한국어"
  },
  {
    "language": "ku",
    "name": "Kurdish (Kurmanji)"
  },
  {
    "language": "ky",
    "name": "кыргызча"
  },
  {
    "language": "la",
    "name": "Latin"
  },
  {
    "language": "lb",
    "name": "Luxembourgish"
  },
  {
    "language": "lo",
    "name": "ລາວ"
  },
  {
    "language": "lt",
    "name": "lietuvių"
  },
  {
    "language": "lv",
    "name": "latviešu"
  },
  {
    "language": "mg",
    "name": "Malagasy"
  },
  {
    "language": "mi",
    "name": "Māori"
  },
  {
    "language": "mk",
    "name": "македонски"
  },
  {
    "language": "ml",
    "name": "മലയാളം"
  },
  {
    "language": "mn",
    "name": "Монгол"
  },
  {
    "language": "mr",
    "name": "मराठी"
  },
  {
    "language": "ms",
    "name": "Melayu"
  },
  {
    "language": "mt",
    "name": "Malti"
  },
  {
    "language": "my",
    "name": "မြန်မာ (မြန်မာ)"
  },
  {
    "language": "ne",
    "name": "नेपाली"
  },
  {
    "language": "nl",
    "name": "Nederlands"
  },
  {
    "language": "no",
    "name": "norsk"
  },
  {
    "language": "ny",
    "name": "Chichewa"
  },
  {
    "language": "pa",
    "name": "ਪੰਜਾਬੀ"
  },
  {
    "language": "pl",
    "name": "polski"
  },
  {
    "language": "ps",
    "name": "پښتو"
  },
  {
    "language": "pt",
    "name": "Portuguese"
  },
  {
    "language": "ro",
    "name": "Română"
  },
  {
    "language": "ru",
    "name": "русский"
  },
  {
    "language": "sd",
    "name": "سنڌي"
  },
  {
    "language": "si",
    "name": "සිංහල"
  },
  {
    "language": "sk",
    "name": "slovenčina"
  },
  {
    "language": "sl",
    "name": "slovenščina"
  },
  {
    "language": "sm",
    "name": "Samoan"
  },
  {
    "language": "sn",
    "name": "ChiShona"
  },
  {
    "language": "so",
    "name": "Soomaali"
  },
  {
    "language": "sq",
    "name": "Shqip"
  },
  {
    "language": "sr",
    "name": "српски"
  },
  {
    "language": "st",
    "name": "Sesotho"
  },
  {
    "language": "su",
    "name": "Basa Sunda"
  },
  {
    "language": "sv",
    "name": "svenska"
  },
  {
    "language": "sw",
    "name": "Kiswahili"
  },
  {
    "language": "ta",
    "name": "தமிழ்"
  },
  {
    "language": "te",
    "name": "తెలుగు"
  },
  {
    "language": "tg",
    "name": "Тоҷикӣ"
  },
  {
    "language": "th",
    "name": "ภาษาไทย"
  },
  {
    "language": "tl",
    "name": "Filipino"
  },
  {
    "language": "tr",
    "name": "Türkçe"
  },
  {
    "language": "uk",
    "name": "українська"
  },
  {
    "language": "ur",
    "name": "اردو"
  },
  {
    "language": "uz",
    "name": "O‘zbek"
  },
  {
    "language": "vi",
    "name": "Tiếng Việt"
  },
  {
    "language": "xh",
    "name": "IsiXhosa"
  },
  {
    "language": "yi",
    "name": "יידיש"
  },
  {
    "language": "yo",
    "name": "Èdè Yorùbá"
  },
  {
    "language": "zh-TW",
    "name": "中文(繁體)"
  },
  {
    "language": "zh",
    "name": "中文(简体)"
  },
  {
    "language": "zu",
    "name": "isiZulu"
  }
]

export default languages;
