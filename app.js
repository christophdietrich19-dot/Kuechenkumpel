const welcomeScreen = document.getElementById("welcomeScreen");
const startAppButton = document.getElementById("startAppButton");
const hideWelcomeCheckbox = document.getElementById("hideWelcomeCheckbox");
const showWelcomeButton = document.getElementById("showWelcomeButton");

const rememberThemeCheckbox = document.getElementById("rememberThemeCheckbox");
const themeOptionButtons = document.querySelectorAll("[data-theme-option]");

const welcomeThemeBadge = document.getElementById("welcomeThemeBadge");
const welcomeThemeTitle = document.getElementById("welcomeThemeTitle");
const welcomeThemeDescription = document.getElementById("welcomeThemeDescription");

const welcomeMascot = document.getElementById("welcomeMascot");
const heroMascot = document.getElementById("heroMascot");
const moodMascot = document.getElementById("moodMascot");
const decisionMascot = document.getElementById("decisionMascot");
const sectionMascot = document.getElementById("sectionMascot");
const rescueMascot = document.getElementById("rescueMascot");
const ideaMascot = document.getElementById("ideaMascot");
const footerMascot = document.getElementById("footerMascot");
const themeHeroText = document.getElementById("themeHeroText");

const moodOptionButtons = document.querySelectorAll("[data-mood]");
const moodDescription = document.getElementById("moodDescription");
const moodInsight = document.getElementById("moodInsight");

const decisionResult = document.getElementById("decisionResult");
const decideButton = document.getElementById("decideButton");
const decideAgainButton = document.getElementById("decideAgainButton");

const ingredientInput = document.getElementById("ingredientInput");
const addIngredientButton = document.getElementById("addIngredientButton");
const quickIngredientsContainer = document.getElementById("quickIngredients");
const selectedIngredientsContainer = document.getElementById("selectedIngredients");

const buddyMessage = document.getElementById("buddyMessage");
const noMoodButton = document.getElementById("noMoodButton");
const filterButtons = document.querySelectorAll(".filter-button");

const topRecommendation = document.getElementById("topRecommendation");
const recipeResults = document.getElementById("recipeResults");
const resultCounter = document.getElementById("resultCounter");

const recipeModal = document.getElementById("recipeModal");
const modalBackdrop = document.getElementById("modalBackdrop");
const closeModalButton = document.getElementById("closeModalButton");
const modalContent = document.getElementById("modalContent");

const navLinks = document.querySelectorAll(".nav-link");
const navSections = [
  document.getElementById("start"),
  document.getElementById("recipes"),
  document.getElementById("about")
];

let selectedIngredients = [];
let activeFilter = "all";
let currentModalPortions = 2;
let activeTheme = "standard";
let activeMood = "normal";
let decisionIndex = 0;
let lastDecisionMode = "none";
let cachedRandomDecisionPool = [];

const THEME_KEY = "kuechenkumpelTheme";
const HIDE_WELCOME_KEY = "kuechenkumpelHideWelcome";
const MOOD_KEY = "kuechenkumpelMood";

const mascotFiles = {
  welcome: "kochtopf-hallo.png",
  hero: "kochtopf-standard.png",
  mood: "kochtopf-hallo.png",
  decision: "kochtopf-idee.png",
  section: "kochtopf-kochen.png",
  rescue: "kochtopf-kein-bock.png",
  idea: "kochtopf-idee.png",
  footer: "kochtopf-standard.png",
  buddy: "kochtopf-idee.png"
};

const themeSettings = {
  standard: {
    label: "Standard",
    icon: "🍳",
    folder: "standard",
    heroText: "Zeig mir, was da ist. Ich mach daraus eine Idee fürs Essen.",
    previewTitle: "Warm und gemütlich",
    previewDescription: "Einfach, ehrlich und ohne großes Küchen-Drama."
  },
  fruehling: {
    label: "Frühling",
    icon: "🌿",
    folder: "fruehling",
    heroText: "Frisch, freundlich und ein bisschen grüner im Topf.",
    previewTitle: "Frisch und leicht",
    previewDescription: "Kräuter, helle Farben und schnelle Ideen für entspannte Küche."
  },
  ostern: {
    label: "Ostern",
    icon: "🐰",
    folder: "ostern",
    heroText: "Heute wird es bunt, einfach und lecker.",
    previewTitle: "Hell und bunt",
    previewDescription: "Freundlich, weich und ein bisschen verspielt, ohne zu kitschig zu werden."
  },
  sommer: {
    label: "Sommer",
    icon: "🍋",
    folder: "sommer",
    heroText: "Schnell, frisch und bitte ohne Küchen-Marathon.",
    previewTitle: "Sonnig und leicht",
    previewDescription: "Mediterran, frisch und entspannt. Perfekt für leichte Küche."
  },
  herbst: {
    label: "Herbst",
    icon: "🍂",
    folder: "herbst",
    heroText: "Gemütlich, warm und perfekt für Pfanne, Topf und Ofen.",
    previewTitle: "Warm und gemütlich",
    previewDescription: "Deftiger, weicher, ruhiger. Genau richtig für gemütliche Teller."
  },
  halloween: {
    label: "Halloween",
    icon: "🎃",
    folder: "halloween",
    heroText: "Gruselig leerer Kühlschrank? Keine Sorge, ich rette das.",
    previewTitle: "Süß-spooky",
    previewDescription: "Dunkel, verspielt und trotzdem lecker. Kühlschrank-Grusel wird Abendessen."
  },
  weihnachten: {
    label: "Weihnachten",
    icon: "🎄",
    folder: "weihnachten",
    heroText: "Heute wird es warm, gemütlich und ein bisschen festlich.",
    previewTitle: "Festlich und warm",
    previewDescription: "Ruhig, gemütlich und ein kleines bisschen Küchenfest."
  }
};

const moodSettings = {
  normal: {
    label: "Normaler Hunger",
    description: "Such aus, wonach dir gerade ist. Ich passe die Rezeptvorschläge daran an.",
    insight: "Solider Alltag. Ich suche dir etwas, das gut passt und nicht unnötig kompliziert wird.",
    buddy: "Okay, normaler Hunger. Wir machen etwas Gutes, ohne die Küche in ein Projekt zu verwandeln.",
    mascot: "mood"
  },
  "kein-bock": {
    label: "Kein Bock",
    description: "Heute zählt: wenig Aufwand, wenig Abwasch, möglichst schnell wieder sitzen.",
    insight: "Kein-Bock-Modus. Schnelle Rezepte mit wenig Abwasch bekommen jetzt Vorrang.",
    buddy: "Verstanden. Heute wird nicht gekocht, heute wird gerettet.",
    mascot: "rescue"
  },
  schnell: {
    label: "Muss schnell gehen",
    description: "Ich schiebe schnelle Gerichte nach oben und bremse alles aus, was Küchenmarathon riecht.",
    insight: "Zeitdruck erkannt. Alles mit kurzer Kochzeit wird jetzt stärker bevorzugt.",
    buddy: "Alles klar. Wir halten es kurz, lecker und ohne unnötige Topf-Konferenz.",
    mascot: "idea"
  },
  "muss-weg": {
    label: "Es muss was weg",
    description: "Markiere Zutaten mit der Uhr. Ich gebe Resten und bald-fälligen Sachen mehr Gewicht.",
    insight: "Reste-Retter aktiv. Muss-weg-Zutaten zählen jetzt stärker bei der Empfehlung.",
    buddy: "Sehr gut. Heute bekommen die Wackelkandidaten aus dem Kühlschrank ihren Auftritt.",
    mascot: "section"
  },
  guenstig: {
    label: "Günstig bitte",
    description: "Ich bevorzuge einfache, günstige Rezepte mit soliden Grundzutaten.",
    insight: "Sparmodus aktiv. Günstige Gerichte werden jetzt nach oben geschoben.",
    buddy: "Konto schonen, Bauch trotzdem glücklich machen. Kriegen wir hin.",
    mascot: "idea"
  },
  satt: {
    label: "Mach mich satt",
    description: "Ich suche dir eher sättigende, herzhafte und ordentliche Gerichte.",
    insight: "Hunger ernst genommen. Sättigende Rezepte bekommen jetzt extra Rückenwind.",
    buddy: "Alles klar. Heute kein Deko-Teller. Heute soll das ordentlich satt machen.",
    mascot: "section"
  },
  verwoehn: {
    label: "Verwöhn mich",
    description: "Ich gewichte cremige, herzhafte und gemütliche Rezepte etwas stärker.",
    insight: "Verwöhnmodus aktiv. Soulfood, cremige Ideen und gemütliche Teller dürfen nach vorne.",
    buddy: "Oh, heute darf es also ein bisschen geiler sein. Gefällt mir.",
    mascot: "idea"
  }
};

const quickIngredients = [
  { name: "nudeln", label: "🍝 Nudeln" },
  { name: "reis", label: "🍚 Reis" },
  { name: "kartoffeln", label: "🥔 Kartoffeln" },
  { name: "eier", label: "🥚 Eier" },
  { name: "käse", label: "🧀 Käse" },
  { name: "tomaten", label: "🍅 Tomaten" },
  { name: "zwiebel", label: "🧅 Zwiebel" },
  { name: "brot", label: "🍞 Brot" },
  { name: "paprika", label: "🫑 Paprika" },
  { name: "gemüse", label: "🥦 Gemüse" },
  { name: "milch", label: "🥛 Milch" },
  { name: "sahne", label: "🥛 Sahne" },
  { name: "frischkäse", label: "🥄 Frischkäse" },
  { name: "schmand", label: "🥄 Schmand" },
  { name: "quark", label: "🥣 Quark" },
  { name: "joghurt", label: "🥣 Joghurt" },
  { name: "thunfisch", label: "🐟 Thunfisch" },
  { name: "hackfleisch", label: "🥩 Hack" },
  { name: "hähnchen", label: "🍗 Hähnchen" },
  { name: "bohnen", label: "🫘 Bohnen" },
  { name: "mais", label: "🌽 Mais" },
  { name: "linsen", label: "🥣 Linsen" },
  { name: "haferflocken", label: "🥣 Haferflocken" },
  { name: "mehl", label: "🌾 Mehl" },
  { name: "brühe", label: "🍲 Brühe" },
  { name: "knoblauch", label: "🧄 Knoblauch" },
  { name: "öl", label: "🫒 Öl" }
];

const recipeSearchProfiles = {
  1: {
    main: ["nudeln", "käse", "milch"],
    optional: ["sahne", "zwiebel", "knoblauch", "tomaten", "paprika", "brokkoli"],
    tags: ["schnell", "günstig", "vegetarisch", "kein bock", "cremig", "soulfood"],
    substitutes: {
      milch: ["sahne"]
    }
  },
  2: {
    main: ["nudeln", "tomaten", "zwiebel"],
    optional: ["knoblauch", "käse", "paprika", "zucchini", "pilze"],
    tags: ["schnell", "günstig", "vegetarisch", "alltag"],
    substitutes: {
      tomaten: ["dosentomaten", "passierte tomaten"]
    }
  },
  3: {
    main: ["nudeln", "eier", "käse"],
    optional: ["zwiebel", "schinken", "tomaten", "paprika"],
    tags: ["schnell", "günstig", "kein bock", "reste", "sättigend"]
  },
  4: {
    main: ["nudeln", "thunfisch"],
    optional: ["tomaten", "frischkäse", "mais", "zwiebel", "käse"],
    tags: ["schnell", "proteinreich", "vorrat", "sättigend"],
    substitutes: {
      tomaten: ["dosentomaten", "passierte tomaten"]
    }
  },
  5: {
    main: ["nudeln", "gemüse", "zwiebel"],
    optional: ["käse", "eier", "sahne", "frischkäse", "paprika", "tomaten", "schmand"],
    tags: ["muss weg", "vegetarisch", "günstig", "reste"]
  },
  6: {
    main: ["nudeln", "schinken", "käse"],
    optional: ["milch", "sahne", "zwiebel", "erbsen"],
    tags: ["schnell", "herzhaft", "soulfood", "sättigend"],
    substitutes: {
      schinken: ["wurst", "speck"]
    }
  },
  7: {
    main: ["nudeln", "öl", "knoblauch"],
    optional: ["chili", "käse", "petersilie", "tomaten"],
    tags: ["schnell", "günstig", "kein bock", "vegetarisch"],
    substitutes: {
      öl: ["butter"]
    }
  },
  8: {
    main: ["nudeln", "gemüse", "käse"],
    optional: ["milch", "sahne", "schinken", "tomaten", "eier"],
    tags: ["muss weg", "herzhaft", "ofen", "soulfood", "sättigend"]
  },
  9: {
    main: ["nudeln", "frischkäse", "gemüse"],
    optional: ["tomaten", "knoblauch", "käse", "sahne", "schmand", "quark", "joghurt"],
    tags: ["schnell", "vegetarisch", "cremig", "soulfood"]
  },
  10: {
    main: ["nudeln", "tomaten", "käse"],
    optional: ["zwiebel", "milch", "sahne", "knoblauch", "gemüse"],
    tags: ["ofen", "vegetarisch", "soulfood", "sättigend"],
    substitutes: {
      tomaten: ["dosentomaten", "passierte tomaten"]
    }
  },
  11: {
    main: ["reis", "eier", "gemüse", "zwiebel"],
    optional: ["sojasoße", "hähnchen", "erbsen", "knoblauch"],
    tags: ["schnell", "günstig", "muss weg"]
  },
  12: {
    main: ["reis", "gemüse"],
    optional: ["zwiebel", "eier", "käse", "joghurt", "quark"],
    tags: ["vegetarisch", "günstig", "muss weg"]
  },
  13: {
    main: ["reis", "tomaten", "zwiebel"],
    optional: ["paprika", "käse", "kräuter", "knoblauch"],
    tags: ["günstig", "vegetarisch", "vorrat"],
    substitutes: {
      tomaten: ["dosentomaten", "passierte tomaten"]
    }
  },
  14: {
    main: ["reis", "gemüse", "curry"],
    optional: ["sahne", "milch", "kokosmilch", "zwiebel", "knoblauch"],
    tags: ["vegetarisch", "modern", "muss weg"]
  },
  15: {
    main: ["reis", "thunfisch", "mais"],
    optional: ["joghurt", "quark", "zwiebel", "gurke", "tomaten"],
    tags: ["schnell", "proteinreich", "vorrat"]
  },
  16: {
    main: ["reis", "bohnen", "tomaten"],
    optional: ["mais", "paprika", "käse", "zwiebel"],
    tags: ["günstig", "vorrat", "proteinreich", "sättigend"],
    substitutes: {
      tomaten: ["dosentomaten", "passierte tomaten"]
    }
  },
  17: {
    main: ["tk-gemüse", "reis"],
    optional: ["eier", "sojasoße", "hähnchen", "käse"],
    tags: ["schnell", "vorrat", "günstig", "kein bock"]
  },
  18: {
    main: ["hähnchen", "reis", "curry"],
    optional: ["gemüse", "sahne", "milch", "kokosmilch", "zwiebel"],
    tags: ["proteinreich", "modern", "macht satt", "sättigend"]
  },
  19: {
    main: ["hähnchen", "gemüse"],
    optional: ["reis", "nudeln", "joghurt", "quark", "knoblauch"],
    tags: ["proteinreich", "muss weg", "alltag", "sättigend"]
  },
  20: {
    main: ["hackfleisch", "reis", "gemüse"],
    optional: ["tomaten", "käse", "mais", "zwiebel"],
    tags: ["herzhaft", "alltag", "macht satt", "sättigend"]
  },
  21: {
    main: ["kartoffeln", "eier", "zwiebel"],
    optional: ["speck", "schinken", "käse", "gewürzgurke"],
    tags: ["günstig", "herzhaft", "klassisch", "sättigend"]
  },
  22: {
    main: ["kartoffeln", "gemüse", "zwiebel"],
    optional: ["eier", "käse", "quark", "joghurt"],
    tags: ["muss weg", "günstig", "vegetarisch"]
  },
  23: {
    main: ["kartoffeln", "käse", "milch"],
    optional: ["sahne", "gemüse", "schinken", "zwiebel"],
    tags: ["herzhaft", "ofen", "soulfood", "sättigend"],
    substitutes: {
      milch: ["sahne"]
    }
  },
  24: {
    main: ["kartoffeln", "quark"],
    optional: ["joghurt", "milch", "kräuter", "gurke", "knoblauch"],
    tags: ["günstig", "vegetarisch", "wenig abwasch"]
  },
  25: {
    main: ["kartoffeln", "möhren", "zwiebel"],
    optional: ["würstchen", "sahne", "milch", "lauch"],
    tags: ["günstig", "klassisch", "muss weg"]
  },
  26: {
    main: ["kartoffeln", "eier", "zwiebel"],
    optional: ["speck", "schinken", "käse", "gewürzgurke"],
    tags: ["herzhaft", "günstig", "deftig", "sättigend"]
  },
  27: {
    main: ["wurst", "kartoffeln", "zwiebel"],
    optional: ["eier", "paprika", "käse"],
    tags: ["herzhaft", "günstig", "deftig", "sättigend"],
    substitutes: {
      wurst: ["schinken", "speck"]
    }
  },
  28: {
    main: ["kartoffeln", "gemüse", "öl"],
    optional: ["quark", "joghurt", "feta", "käse", "knoblauch"],
    tags: ["muss weg", "vegetarisch", "wenig abwasch", "ofen"],
    substitutes: {
      öl: ["butter"]
    }
  },
  29: {
    main: ["gemüse", "käse", "milch"],
    optional: ["sahne", "kartoffeln", "nudeln", "eier"],
    tags: ["muss weg", "ofen", "vegetarisch", "soulfood"],
    substitutes: {
      milch: ["sahne"]
    }
  },
  30: {
    main: ["brötchen", "käse"],
    optional: ["brot", "gemüse", "schinken", "tomaten", "wurst", "zwiebel"],
    tags: ["muss weg", "schnell", "ofen"],
    substitutes: {
      brötchen: ["brot", "toast", "baguette"]
    }
  },
  31: {
    main: ["eier", "tomaten", "zwiebel"],
    optional: ["käse", "paprika", "kräuter"],
    tags: ["schnell", "vegetarisch", "günstig"],
    substitutes: {
      tomaten: ["dosentomaten"]
    }
  },
  32: {
    main: ["eier", "käse"],
    optional: ["zwiebel", "tomaten", "schinken", "kräuter"],
    tags: ["schnell", "kein bock", "proteinreich"]
  },
  33: {
    main: ["eier", "gemüse", "zwiebel"],
    optional: ["käse", "brot", "kräuter"],
    tags: ["schnell", "muss weg", "proteinreich"]
  },
  34: {
    main: ["eier", "tomaten", "zwiebel"],
    optional: ["paprika", "feta", "käse", "chili", "brot"],
    tags: ["modern", "vegetarisch", "proteinreich"],
    substitutes: {
      tomaten: ["dosentomaten", "passierte tomaten"]
    }
  },
  35: {
    main: ["brot", "eier"],
    optional: ["käse", "schinken", "tomaten"],
    tags: ["schnell", "günstig", "kein bock"],
    substitutes: {
      brot: ["toast", "brötchen"]
    }
  },
  36: {
    main: ["brot", "käse"],
    optional: ["tomaten", "schinken", "zwiebel"],
    tags: ["schnell", "günstig", "kein bock"],
    substitutes: {
      brot: ["toast", "brötchen"]
    }
  },
  37: {
    main: ["brot", "tomaten", "käse"],
    optional: ["schinken", "mais", "paprika", "zwiebel"],
    tags: ["schnell", "muss weg", "günstig"],
    substitutes: {
      brot: ["toast", "brötchen"],
      tomaten: ["dosentomaten"]
    }
  },
  38: {
    main: ["brot", "eier", "milch", "käse"],
    optional: ["schinken", "kräuter", "tomaten"],
    tags: ["günstig", "reste", "herzhaft", "sättigend"],
    substitutes: {
      brot: ["toast", "brötchen"]
    }
  },
  39: {
    main: ["brot", "knoblauch"],
    optional: ["butter", "öl", "joghurt", "quark", "gurke"],
    tags: ["schnell", "günstig", "beilage", "kein bock"],
    substitutes: {
      brot: ["toast", "brötchen"]
    }
  },
  40: {
    main: ["mehl", "milch", "eier"],
    optional: ["zucker", "apfel", "quark", "zimt"],
    tags: ["süß", "günstig", "einfach"]
  },
  41: {
    main: ["gemüse", "zwiebel"],
    optional: ["reis", "nudeln", "eier", "käse", "knoblauch", "schmand"],
    tags: ["muss weg", "vegetarisch", "günstig"]
  },
  42: {
    main: ["gemüse", "brühe"],
    optional: ["kartoffeln", "reis", "nudeln", "sahne", "milch"],
    tags: ["muss weg", "günstig", "leicht"]
  },
  43: {
    main: ["bohnen", "tomaten", "mais"],
    optional: ["reis", "brot", "käse", "hackfleisch"],
    tags: ["vorrat", "günstig", "proteinreich", "sättigend"],
    substitutes: {
      tomaten: ["dosentomaten", "passierte tomaten"]
    }
  },
  44: {
    main: ["linsen", "curry", "tomaten"],
    optional: ["reis", "joghurt", "gemüse", "zwiebel"],
    tags: ["vorrat", "vegetarisch", "proteinreich"],
    substitutes: {
      tomaten: ["dosentomaten", "passierte tomaten"]
    }
  },
  45: {
    main: ["tomaten", "zwiebel", "brühe"],
    optional: ["sahne", "milch", "brot", "käse", "knoblauch"],
    tags: ["vorrat", "günstig", "vegetarisch"],
    substitutes: {
      tomaten: ["dosentomaten", "passierte tomaten"]
    }
  },
  46: {
    main: ["paprika", "eier", "zwiebel"],
    optional: ["käse", "tomaten", "brot"],
    tags: ["schnell", "muss weg", "vegetarisch"]
  },
  47: {
    main: ["zucchini", "tomaten", "zwiebel"],
    optional: ["reis", "nudeln", "käse", "knoblauch"],
    tags: ["vegetarisch", "muss weg", "leicht"],
    substitutes: {
      tomaten: ["dosentomaten"]
    }
  },
  48: {
    main: ["gemüse", "curry", "reis"],
    optional: ["sahne", "milch", "kokosmilch", "zwiebel"],
    tags: ["modern", "vegetarisch", "muss weg"]
  },
  49: {
    main: ["haferflocken", "milch"],
    optional: ["wasser", "banane", "apfel", "zimt", "nüsse"],
    tags: ["frühstück", "günstig", "schnell"]
  },
  50: {
    main: ["brot", "tomaten", "käse"],
    optional: ["zwiebel", "knoblauch", "schinken", "thunfisch"],
    tags: ["schnell", "günstig", "kein bock"],
    substitutes: {
      brot: ["toast", "brötchen"],
      tomaten: ["dosentomaten"]
    }
  }
};

function createDishesText(value) {
  if (value === "wenig") return "Ein bisschen Abwasch, aber kein Drama.";
  if (value === "mittel") return "Geht klar. Kein Küchen-Tatort.";
  return "Lecker, aber danach will die Spüle kurz reden.";
}

function createCostText(value) {
  if (value === "günstig") return "Tut dem Konto nicht weh.";
  if (value === "normal") return "Solide Mitte. Kein Sparmenü, kein Festbankett.";
  return "Etwas feiner. Für Tage, an denen der Kühlschrank kurz angeben darf.";
}

function isNoMoodMode() {
  return activeMood === "kein-bock";
}

function normalize(value) {
  return String(value || "").trim().toLowerCase();
}

function normalizeSearchValue(value) {
  return normalize(value)
    .replaceAll("ä", "ae")
    .replaceAll("ö", "oe")
    .replaceAll("ü", "ue")
    .replaceAll("ß", "ss")
    .replaceAll("-", " ")
    .replaceAll("_", " ")
    .replace(/\s+/g, " ")
    .trim();
}

function canonicalIngredient(value) {
  const text = normalizeSearchValue(value);

  if (!text) return "";
  if (["ei", "eier"].includes(text)) return "eier";
  if (["kaese", "käse"].includes(text)) return "käse";
  if (["nudel", "nudeln", "pasta", "spaghetti", "makkaroni"].includes(text)) return "nudeln";
  if (["kartoffel", "kartoffeln"].includes(text)) return "kartoffeln";
  if (["tomate", "tomaten"].includes(text)) return "tomaten";
  if (["dosentomaten", "dosen tomaten"].includes(text)) return "dosentomaten";
  if (["passierte tomaten", "tomatensosse", "tomatensoße"].includes(text)) return "passierte tomaten";
  if (["zwiebel", "zwiebeln"].includes(text)) return "zwiebel";

  if (["brot", "broetchen", "brötchen", "toast", "baguette"].includes(text)) {
    return text.replace("broetchen", "brötchen");
  }

  if (["gemuese", "gemüse"].includes(text)) return "gemüse";
  if (["tk gemuese", "tk gemüse", "tiefkuehlgemuese", "tiefkühlgemüse"].includes(text)) return "tk-gemüse";
  if (["moehren", "möhren", "karotten", "mohren"].includes(text)) return "möhren";
  if (["paprika", "zucchini", "brokkoli", "pilze", "spinat"].includes(text)) return text;

  if (
    [
      "milch",
      "sahne",
      "kokosmilch",
      "frischkaese",
      "frischkäse",
      "schmand",
      "quark",
      "joghurt"
    ].includes(text)
  ) {
    return text.replace("frischkaese", "frischkäse");
  }

  if (["hack", "hackfleisch"].includes(text)) return "hackfleisch";
  if (["haehnchen", "hähnchen", "huhn", "chicken"].includes(text)) return "hähnchen";
  if (["bohne", "bohnen"].includes(text)) return "bohnen";
  if (["linse", "linsen"].includes(text)) return "linsen";
  if (["oel", "öl"].includes(text)) return "öl";
  if (["bruehe", "brühe", "gemuesebruehe", "gemüsebrühe"].includes(text)) return "brühe";

  return text;
}

function capitalize(value) {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function displayIngredientName(value) {
  const map = {
    eier: "Eier",
    käse: "Käse",
    nudeln: "Nudeln",
    kartoffeln: "Kartoffeln",
    tomaten: "Tomaten",
    dosentomaten: "Dosentomaten",
    "passierte tomaten": "passierte Tomaten",
    zwiebel: "Zwiebel",
    brot: "Brot",
    brötchen: "Brötchen",
    toast: "Toast",
    baguette: "Baguette",
    gemüse: "Gemüse",
    "tk-gemüse": "TK-Gemüse",
    möhren: "Möhren",
    paprika: "Paprika",
    zucchini: "Zucchini",
    brokkoli: "Brokkoli",
    pilze: "Pilze",
    milch: "Milch",
    sahne: "Sahne",
    kokosmilch: "Kokosmilch",
    frischkäse: "Frischkäse",
    schmand: "Schmand",
    quark: "Quark",
    joghurt: "Joghurt",
    hackfleisch: "Hackfleisch",
    hähnchen: "Hähnchen",
    thunfisch: "Thunfisch",
    bohnen: "Bohnen",
    mais: "Mais",
    linsen: "Linsen",
    haferflocken: "Haferflocken",
    mehl: "Mehl",
    brühe: "Brühe",
    öl: "Öl",
    knoblauch: "Knoblauch"
  };

  return map[value] || capitalize(value);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatList(items) {
  const formatted = (items || []).map(displayIngredientName);

  if (formatted.length === 0) return "";
  if (formatted.length === 1) return formatted[0];
  if (formatted.length === 2) return `${formatted[0]} und ${formatted[1]}`;

  return `${formatted.slice(0, -1).join(", ")} und ${formatted[formatted.length - 1]}`;
}

function getRecipeSource() {
  if (Array.isArray(window.RECIPES) && window.RECIPES.length > 0) {
    return window.RECIPES;
  }

  return [];
}

function buildRecipes() {
  return getRecipeSource().map((recipe) => {
    const profile = recipeSearchProfiles[recipe.id] || {
      main: extractMainIngredients(recipe),
      optional: extractOptionalIngredients(recipe),
      tags: buildTags(recipe),
      substitutes: {}
    };

    return {
      ...recipe,
      title: recipe.name,
      main: (profile.main || []).map(canonicalIngredient),
      optional: (profile.optional || []).map(canonicalIngredient),
      tags: profile.tags || [],
      substitutes: normalizeSubstitutes(profile.substitutes || {}),
      time: recipe.timeTotal || "ca. 20 Minuten",
      dishesText: createDishesText(recipe.dishes),
      costText: createCostText(recipe.cost),
      filling: recipe.satiety || "macht satt",
      saying: recipe.slogan || ""
    };
  });
}

function normalizeSubstitutes(substitutes) {
  const normalized = {};

  Object.entries(substitutes).forEach(([key, values]) => {
    normalized[canonicalIngredient(key)] = (values || []).map(canonicalIngredient);
  });

  return normalized;
}

function extractMainIngredients(recipe) {
  return (recipe.ingredients || [])
    .slice(0, 4)
    .map((ingredient) => simplifyIngredientName(ingredient.name))
    .filter(Boolean);
}

function extractOptionalIngredients(recipe) {
  return (recipe.ingredients || [])
    .slice(4)
    .map((ingredient) => simplifyIngredientName(ingredient.name))
    .filter(Boolean);
}

function simplifyIngredientName(value) {
  const text = normalize(value);

  if (text.includes("nudel")) return "nudeln";
  if (text.includes("reis")) return "reis";
  if (text.includes("kartoffel")) return "kartoffeln";
  if (text.includes("ei")) return "eier";
  if (text.includes("käse")) return "käse";
  if (text.includes("tomate")) return "tomaten";
  if (text.includes("zwiebel")) return "zwiebel";
  if (text.includes("brot")) return "brot";
  if (text.includes("brötchen")) return "brötchen";
  if (text.includes("paprika")) return "paprika";
  if (text.includes("gemüse")) return "gemüse";
  if (text.includes("milch")) return "milch";
  if (text.includes("sahne")) return "sahne";
  if (text.includes("frischkäse")) return "frischkäse";
  if (text.includes("schmand")) return "schmand";
  if (text.includes("quark")) return "quark";
  if (text.includes("joghurt")) return "joghurt";
  if (text.includes("thunfisch")) return "thunfisch";
  if (text.includes("hack")) return "hackfleisch";
  if (text.includes("hähnchen")) return "hähnchen";
  if (text.includes("bohne")) return "bohnen";
  if (text.includes("mais")) return "mais";
  if (text.includes("linse")) return "linsen";
  if (text.includes("hafer")) return "haferflocken";
  if (text.includes("knoblauch")) return "knoblauch";
  if (text.includes("öl")) return "öl";
  if (text.includes("brühe")) return "brühe";

  return text.split(" ")[0];
}

function buildTags(recipe) {
  const tags = [];

  if (recipe.difficulty === "einfach") tags.push("einfach");
  if (recipe.cost === "günstig") tags.push("günstig");

  if (
    recipe.timeTotal &&
    (
      recipe.timeTotal.includes("10") ||
      recipe.timeTotal.includes("12") ||
      recipe.timeTotal.includes("15") ||
      recipe.timeTotal.includes("20")
    )
  ) {
    tags.push("schnell");
  }

  if (recipe.dishes === "wenig") tags.push("wenig abwasch");
  if (recipe.feeling === "Kein-Bock-Retter") tags.push("kein bock");
  if (recipe.category && recipe.category.includes("Vorrat")) tags.push("vorrat");
  if (recipe.category && recipe.category.includes("Rest")) tags.push("muss weg");
  if (recipe.satiety && recipe.satiety.includes("satt")) tags.push("sättigend");
  if (recipe.slogan && normalize(recipe.slogan).includes("cremig")) tags.push("cremig");

  return tags;
}

const recipes = buildRecipes();

function getThemeMascotPath(themeName, mascotKey) {
  const settings = themeSettings[themeName] || themeSettings.standard;
  const fileName = mascotFiles[mascotKey] || mascotFiles.hero;

  return `assets/images/themes/${settings.folder}/${fileName}`;
}

function getStandardMascotPath(mascotKey) {
  const fileName = mascotFiles[mascotKey] || mascotFiles.hero;

  return `assets/images/themes/standard/${fileName}`;
}

function getLegacyMascotPath(mascotKey) {
  const fileName = mascotFiles[mascotKey] || mascotFiles.hero;

  return `assets/images/${fileName}`;
}

function setMascotImage(imageElement, mascotKey) {
  if (!imageElement) return;

  const themePath = getThemeMascotPath(activeTheme, mascotKey);
  const standardPath = getStandardMascotPath(mascotKey);
  const legacyPath = getLegacyMascotPath(mascotKey);

  imageElement.onerror = () => {
    if (imageElement.src.includes(`/themes/${activeTheme}/`)) {
      imageElement.onerror = () => {
        imageElement.onerror = null;
        imageElement.src = legacyPath;
      };

      imageElement.src = standardPath;
      return;
    }

    imageElement.onerror = null;
    imageElement.src = legacyPath;
  };

  imageElement.src = themePath;
}

function setTheme(themeName, shouldSave = false) {
  const safeTheme = themeSettings[themeName] ? themeName : "standard";
  activeTheme = safeTheme;

  document.body.dataset.theme = safeTheme;

  if (shouldSave) {
    localStorage.setItem(THEME_KEY, safeTheme);
  }

  updateThemeButtons();
  updateThemeMascots();
  updateWelcomeThemePreview();
}

function updateThemeButtons() {
  themeOptionButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.themeOption === activeTheme);
  });
}

function updateWelcomeThemePreview() {
  const settings = themeSettings[activeTheme] || themeSettings.standard;

  if (welcomeThemeBadge) {
    welcomeThemeBadge.textContent = `${settings.icon} ${settings.label}`;
  }

  if (welcomeThemeTitle) {
    welcomeThemeTitle.textContent = settings.previewTitle;
  }

  if (welcomeThemeDescription) {
    welcomeThemeDescription.textContent = settings.previewDescription;
  }
}

function updateThemeMascots() {
  const settings = themeSettings[activeTheme] || themeSettings.standard;

  setMascotImage(welcomeMascot, "welcome");
  setMascotImage(heroMascot, "hero");
  setMascotImage(moodMascot, getCurrentMoodMascotKey());
  setMascotImage(decisionMascot, "decision");
  setMascotImage(sectionMascot, "section");
  setMascotImage(rescueMascot, "rescue");
  setMascotImage(ideaMascot, "idea");
  setMascotImage(footerMascot, "footer");

  if (themeHeroText) {
    themeHeroText.textContent = settings.heroText;
  }
}

function initTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY) || "standard";

  if (rememberThemeCheckbox) {
    rememberThemeCheckbox.checked = localStorage.getItem(THEME_KEY) !== null;
  }

  setTheme(savedTheme, false);
}

function getCurrentMoodMascotKey() {
  const settings = moodSettings[activeMood] || moodSettings.normal;
  return settings.mascot || "mood";
}

function setMood(moodName, shouldSave = true) {
  const safeMood = moodSettings[moodName] ? moodName : "normal";
  activeMood = safeMood;

  if (shouldSave) {
    localStorage.setItem(MOOD_KEY, safeMood);
  }

  if (noMoodButton) {
    noMoodButton.classList.toggle("active", isNoMoodMode());
    noMoodButton.textContent = isNoMoodMode()
      ? "Kein-Bock-Modus ist aktiv"
      : "Rette mein Abendessen";
  }

  resetDecision(false);
  updateMoodUI();
  updateThemeMascots();
  updateBuddyMessage();
  renderAll();
}

function updateMoodUI() {
  const settings = moodSettings[activeMood] || moodSettings.normal;

  moodOptionButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.mood === activeMood);
  });

  if (moodDescription) {
    moodDescription.textContent = settings.description;
  }

  if (moodInsight) {
    moodInsight.innerHTML = `
      <strong>Aktuelle Küchenlage:</strong>
      <span>${escapeHtml(settings.insight)}</span>
    `;
  }
}

function initMood() {
  const savedMood = localStorage.getItem(MOOD_KEY) || "normal";
  setMood(savedMood, false);
}

function ingredientExists(name) {
  const normalizedName = canonicalIngredient(name);
  return selectedIngredients.some((ingredient) => ingredient.name === normalizedName);
}

function addIngredient(name) {
  const normalizedName = canonicalIngredient(name);

  if (!normalizedName || ingredientExists(normalizedName)) {
    ingredientInput.value = "";
    return;
  }

  selectedIngredients.push({
    name: normalizedName,
    urgent: false
  });

  ingredientInput.value = "";
  resetDecision(false);
  updateBuddyMessage();
  renderAll();
}

function removeIngredient(name) {
  selectedIngredients = selectedIngredients.filter((ingredient) => ingredient.name !== name);
  resetDecision(false);
  updateBuddyMessage();
  renderAll();
}

function toggleUrgent(name) {
  selectedIngredients = selectedIngredients.map((ingredient) => {
    if (ingredient.name === name) {
      return {
        ...ingredient,
        urgent: !ingredient.urgent
      };
    }

    return ingredient;
  });

  resetDecision(false);
  updateBuddyMessage();
  renderAll();
}

function getSelectedNames() {
  return selectedIngredients.map((ingredient) => ingredient.name);
}

function getUrgentNames() {
  return selectedIngredients
    .filter((ingredient) => ingredient.urgent)
    .map((ingredient) => ingredient.name);
}

function isExactIngredientMatch(recipeIngredient, selectedIngredient) {
  const recipeValue = canonicalIngredient(recipeIngredient);
  const selectedValue = canonicalIngredient(selectedIngredient);

  if (recipeValue === selectedValue) return true;

  const strictSynonyms = [
    ["eier", "ei"],
    ["tomaten", "dosentomaten", "passierte tomaten"],
    ["brot", "toast", "brötchen", "baguette"],
    ["brötchen", "brot", "toast", "baguette"],
    ["tk-gemüse", "gemüse"],
    ["brühe", "gemüsebrühe"]
  ];

  return strictSynonyms.some((group) => group.includes(recipeValue) && group.includes(selectedValue));
}

function isVegetableSoftMatch(recipeIngredient, selectedIngredient) {
  const recipeValue = canonicalIngredient(recipeIngredient);
  const selectedValue = canonicalIngredient(selectedIngredient);

  const vegetables = [
    "gemüse",
    "paprika",
    "zucchini",
    "möhren",
    "brokkoli",
    "pilze",
    "spinat",
    "tk-gemüse"
  ];

  return recipeValue === "gemüse" && vegetables.includes(selectedValue);
}

function isSubstituteMatch(recipe, recipeIngredient, selectedIngredient) {
  const recipeValue = canonicalIngredient(recipeIngredient);
  const selectedValue = canonicalIngredient(selectedIngredient);
  const substitutes = recipe.substitutes || {};

  return Array.isArray(substitutes[recipeValue]) && substitutes[recipeValue].includes(selectedValue);
}

function getIngredientMatchType(recipe, recipeIngredient, selectedNames) {
  for (const selectedName of selectedNames) {
    if (isExactIngredientMatch(recipeIngredient, selectedName)) return "exact";
  }

  for (const selectedName of selectedNames) {
    if (isVegetableSoftMatch(recipeIngredient, selectedName)) return "soft";
  }

  for (const selectedName of selectedNames) {
    if (isSubstituteMatch(recipe, recipeIngredient, selectedName)) return "substitute";
  }

  return "missing";
}

function hasRealIngredient(recipe, recipeIngredient, selectedNames) {
  const type = getIngredientMatchType(recipe, recipeIngredient, selectedNames);
  return type === "exact" || type === "soft";
}

function scoreRecipe(recipe) {
  const selectedNames = getSelectedNames();
  const urgentNames = getUrgentNames();

  const matchingMain = [];
  const softMain = [];
  const substituteMain = [];
  const missingMain = [];
  const matchingOptional = [];

  recipe.main.forEach((ingredient) => {
    const matchType = getIngredientMatchType(recipe, ingredient, selectedNames);

    if (matchType === "exact") {
      matchingMain.push(ingredient);
    } else if (matchType === "soft") {
      softMain.push(ingredient);
    } else if (matchType === "substitute") {
      substituteMain.push(ingredient);
      missingMain.push(ingredient);
    } else {
      missingMain.push(ingredient);
    }
  });

  recipe.optional.forEach((ingredient) => {
    if (selectedNames.some((selectedName) => isExactIngredientMatch(ingredient, selectedName))) {
      matchingOptional.push(ingredient);
      return;
    }

    if (selectedNames.some((selectedName) => isVegetableSoftMatch(ingredient, selectedName))) {
      matchingOptional.push(ingredient);
    }
  });

  let score = 0;

  score += matchingMain.length * 6;
  score += softMain.length * 4;
  score += substituteMain.length * 1;
  score += matchingOptional.length * 1.5;

  score -= missingMain.length * 2.5;

  urgentNames.forEach((urgentName) => {
    if (recipe.main.some((ingredient) => hasRealIngredient(recipe, ingredient, [urgentName]))) {
      score += 6;
    }

    if (recipe.optional.some((ingredient) => isExactIngredientMatch(ingredient, urgentName))) {
      score += 2;
    }
  });

  if (isNoMoodMode()) {
    if (recipe.tags.includes("kein bock")) score += 8;
    if (recipe.dishes === "wenig") score += 3;

    if (
      recipe.time.includes("10") ||
      recipe.time.includes("12") ||
      recipe.time.includes("15") ||
      recipe.time.includes("20")
    ) {
      score += 3;
    }

    if (
      recipe.time.includes("30") ||
      recipe.time.includes("35") ||
      recipe.time.includes("40") ||
      recipe.time.includes("45")
    ) {
      score -= 4;
    }

    if (recipe.tags.includes("ofen")) score -= 5;
  }

  if (activeMood === "schnell") {
    if (recipe.tags.includes("schnell")) score += 7;
    if (recipe.dishes === "wenig") score += 2;

    if (
      recipe.time.includes("10") ||
      recipe.time.includes("12") ||
      recipe.time.includes("15") ||
      recipe.time.includes("20")
    ) {
      score += 5;
    }

    if (
      recipe.time.includes("35") ||
      recipe.time.includes("40") ||
      recipe.time.includes("45") ||
      recipe.tags.includes("ofen")
    ) {
      score -= 5;
    }
  }

  if (activeMood === "muss-weg") {
    if (recipe.tags.includes("muss weg") || recipe.tags.includes("reste")) score += 7;

    urgentNames.forEach((urgentName) => {
      if (recipe.main.some((ingredient) => hasRealIngredient(recipe, ingredient, [urgentName]))) {
        score += 8;
      }

      if (recipe.optional.some((ingredient) => isExactIngredientMatch(ingredient, urgentName))) {
        score += 4;
      }
    });
  }

  if (activeMood === "guenstig") {
    if (recipe.tags.includes("günstig")) score += 8;
    if (recipe.cost === "günstig") score += 5;
    if (recipe.cost === "hoch") score -= 6;
  }

  if (activeMood === "satt") {
    if (recipe.tags.includes("sättigend")) score += 7;
    if (recipe.tags.includes("proteinreich")) score += 4;
    if (recipe.tags.includes("herzhaft")) score += 3;
    if (recipe.filling && normalize(recipe.filling).includes("satt")) score += 4;
  }

  if (activeMood === "verwoehn") {
    if (recipe.tags.includes("soulfood")) score += 7;
    if (recipe.tags.includes("cremig")) score += 5;
    if (recipe.tags.includes("herzhaft")) score += 3;
    if (recipe.cost === "hoch") score += 1;
  }

  if (activeFilter !== "all") {
    if (recipe.tags.includes(activeFilter)) {
      score += 4;
    } else {
      score -= 5;
    }
  }

  const realMainMatchCount = matchingMain.length + softMain.length;
  const hasAtLeastOneRealMain = realMainMatchCount > 0;
  const hasTooManyMissingMain = missingMain.length >= recipe.main.length;

  if (!hasAtLeastOneRealMain || hasTooManyMissingMain) {
    score -= 8;
  }

  return {
    recipe,
    matchingMain: [...matchingMain, ...softMain],
    substituteMain,
    missingMain,
    matchingOptional,
    score
  };
}

function getMatches() {
  if (selectedIngredients.length === 0) {
    return [];
  }

  return recipes
    .map(scoreRecipe)
    .filter(
      (item) =>
        item.matchingMain.length > 0 ||
        item.matchingOptional.length > 0 ||
        item.substituteMain.length > 0
    )
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);
}

function getBuddyMascotPath() {
  return getThemeMascotPath(activeTheme, "buddy");
}

function getBuddyMascotFallbackPath() {
  return getStandardMascotPath("buddy");
}

function updateBuddyTextOnly(text) {
  buddyMessage.innerHTML = `
    <img
      class="buddy-mascot"
      src="${escapeHtml(getBuddyMascotPath())}"
      onerror="this.onerror=null; this.src='${escapeHtml(getBuddyMascotFallbackPath())}';"
      alt=""
      aria-hidden="true"
    />

    <div>
      <strong>Küchenkumpel sagt:</strong>
      <span>${escapeHtml(text)}</span>
    </div>
  `;
}

function updateBuddyMessage() {
  const urgentNames = getUrgentNames();
  const mood = moodSettings[activeMood] || moodSettings.normal;

  let message = mood.buddy;

  if (selectedIngredients.length === 0) {
    message = mood.buddy;
  } else if (urgentNames.length > 0) {
    message = `Alles klar. ${formatList(urgentNames)} hat nicht mehr ewig Zeit. Geben wir dem Zeug heute noch einen würdigen Auftritt.`;
  } else if (selectedIngredients.length <= 2) {
    message = "Das ist sportlich wenig, aber wir kriegen was hin.";
  } else if (isNoMoodMode()) {
    message = "Keine Energie? Alles gut. Heute wird nicht gekocht, heute wird gerettet.";
  } else if (activeMood === "schnell") {
    message = "Okay, kurze Nummer. Ich suche dir die schnellen Kandidaten nach oben.";
  } else if (activeMood === "guenstig") {
    message = "Sparmodus läuft. Satt werden ohne Einkaufswagen-Eskalation.";
  } else if (activeMood === "satt") {
    message = "Alles klar. Heute soll das nicht nur hübsch aussehen, heute soll es satt machen.";
  } else if (activeMood === "verwoehn") {
    message = "Sehr schön. Heute darf es ein bisschen mehr Küchenliebe sein.";
  } else {
    message = "Okay, das sieht schon nach Abendessen aus.";
  }

  updateBuddyTextOnly(message);
}

function renderQuickIngredients() {
  quickIngredientsContainer.innerHTML = "";

  quickIngredients.forEach((ingredient) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = ingredientExists(ingredient.name) ? "quick-button selected" : "quick-button";
    button.textContent = ingredient.label;

    button.addEventListener("click", () => {
      if (ingredientExists(ingredient.name)) {
        removeIngredient(canonicalIngredient(ingredient.name));
      } else {
        addIngredient(ingredient.name);
      }
    });

    quickIngredientsContainer.appendChild(button);
  });
}

function renderSelectedIngredients() {
  selectedIngredientsContainer.innerHTML = "";

  if (selectedIngredients.length === 0) {
    selectedIngredientsContainer.innerHTML =
      `<div class="empty-small">Noch nichts ausgewählt. Der Kühlschrank schweigt.</div>`;
    return;
  }

  selectedIngredients.forEach((ingredient) => {
    const chip = document.createElement("div");
    chip.className = ingredient.urgent ? "ingredient-chip urgent" : "ingredient-chip";

    chip.innerHTML = `
      <span>${escapeHtml(displayIngredientName(ingredient.name))}</span>

      <button
        class="clock-button ${ingredient.urgent ? "active" : ""}"
        type="button"
        title="${ingredient.urgent ? "Muss-weg-Markierung entfernen" : "Als muss weg markieren"}"
        aria-label="${ingredient.urgent ? "Muss-weg-Markierung entfernen" : "Als muss weg markieren"}"
      >${ingredient.urgent ? "⏰" : "🕒"}</button>

      <button
        class="chip-button"
        type="button"
        title="Entfernen"
        aria-label="Zutat entfernen"
      >×</button>
    `;

    chip.querySelector(".clock-button").addEventListener("click", () => {
      toggleUrgent(ingredient.name);
    });

    chip.querySelector(".chip-button").addEventListener("click", () => {
      removeIngredient(ingredient.name);
    });

    selectedIngredientsContainer.appendChild(chip);
  });
}

function getRecipeImageMarkup(recipe, isRecommendation) {
  const imageClass = isRecommendation ? "recipe-card-image large" : "recipe-card-image";
  const imagePath = recipe.image || "";

  if (!imagePath) {
    return `
      <div class="${imageClass} recipe-card-image-fallback">
        <span>🥘</span>
      </div>
    `;
  }

  return `
    <div class="${imageClass}">
      <img
        src="${escapeHtml(imagePath)}"
        alt="${escapeHtml(recipe.title)}"
        loading="lazy"
        onerror="this.parentElement.classList.add('recipe-card-image-fallback'); this.remove();"
      />
    </div>
  `;
}

function createRecipeCard(match, isRecommendation) {
  const { recipe, matchingMain, substituteMain, missingMain, matchingOptional } = match;
  const cardClass = isRecommendation ? "recommendation-card" : "recipe-card";

  const missingText = missingMain.length > 0
    ? `Fehlt noch: ${formatList(missingMain)}`
    : "Du hast alles Wichtige. Sehr stabil.";

  const optionalItems = [...matchingOptional, ...substituteMain];
  const optionalText = optionalItems.length > 0
    ? `Extra oder Ersatz passt auch: ${formatList(optionalItems)}`
    : "Extras sind nice, aber kein Muss.";

  const badgeText = isRecommendation ? "Bester Treffer" : "Rezeptidee";

  return `
    <article class="${cardClass}">
      ${getRecipeImageMarkup(recipe, isRecommendation)}

      <div class="recipe-card-content">
        <div class="recipe-card-topline">
          <span class="recipe-card-badge">${badgeText}</span>
        </div>

        <h4>${escapeHtml(recipe.title)}</h4>

        <p class="recipe-saying">${escapeHtml(recipe.saying)}</p>

        <div class="recipe-meta">
          <span class="meta-pill">Zeit · ${escapeHtml(recipe.time)}</span>
          <span class="meta-pill">Abwasch · ${escapeHtml(recipe.dishes)}</span>
          <span class="meta-pill">Kosten · ${escapeHtml(recipe.cost)}</span>
          <span class="meta-pill">Sättigung · ${escapeHtml(recipe.filling)}</span>
          <span class="meta-pill">Gefühl · ${escapeHtml(recipe.feeling)}</span>
        </div>

        <div class="match-info">
          <div class="match-line">
            <strong>Passt:</strong>
            ${matchingMain.length > 0 ? escapeHtml(formatList(matchingMain)) : "noch nicht viel, aber wir versuchen es."}
          </div>

          <div class="missing-line">
            <strong>${missingMain.length > 0 ? "Fehlt:" : "Status:"}</strong>
            ${escapeHtml(missingText.replace("Fehlt noch: ", ""))}
          </div>

          <div class="match-line">
            <strong>Extra:</strong>
            ${escapeHtml(optionalText.replace("Extra oder Ersatz passt auch: ", ""))}
          </div>
        </div>

        <div class="recipe-actions">
          <button class="small-button" data-open-recipe="${recipe.id}" type="button">
            Rezept ansehen
          </button>

          <button class="ghost-button" data-copy-missing="${recipe.id}" type="button">
            Fehlendes kopieren
          </button>
        </div>
      </div>
    </article>
  `;
}

function attachRecipeActionEvents() {
  document.querySelectorAll("[data-open-recipe]").forEach((button) => {
    button.addEventListener("click", () => {
      const recipeId = Number(button.dataset.openRecipe);
      openRecipeModal(recipeId);
    });
  });

  document.querySelectorAll("[data-copy-missing]").forEach((button) => {
    button.addEventListener("click", () => {
      const recipeId = Number(button.dataset.copyMissing);
      copyMissingIngredients(recipeId);
    });
  });
}

function renderRecommendations() {
  const matches = getMatches();

  if (matches.length === 0) {
    topRecommendation.innerHTML = `
      <div class="empty-state">
        Noch keine Empfehlung. Gib ein paar Zutaten ein, dann macht der Küchenkumpel seinen Job.
      </div>
    `;
    return;
  }

  topRecommendation.innerHTML = createRecipeCard(matches[0], true);
}

function renderRecipeResults() {
  const matches = getMatches();

  if (selectedIngredients.length === 0) {
    resultCounter.textContent = "Noch keine Zutaten eingetragen.";
    recipeResults.innerHTML = `
      <div class="empty-state">
        Trag ein paar Zutaten ein. Dein Küchenkumpel macht dann aus dem Chaos einen Plan.
      </div>
    `;
    return;
  }

  if (matches.length === 0) {
    resultCounter.textContent = "Noch nichts Passendes gefunden.";
    recipeResults.innerHTML = `
      <div class="empty-state">
        Hm. Damit kann ich noch nichts Sicheres vorschlagen. Versuch es mal mit Nudeln, Reis, Eiern, Käse, Tomaten oder Kartoffeln.
      </div>
    `;
    return;
  }

  const visibleMatches = matches.slice(1, 13);
  resultCounter.textContent = `${matches.length} Idee${matches.length === 1 ? "" : "n"} gefunden.`;

  if (visibleMatches.length === 0) {
    recipeResults.innerHTML = `
      <div class="empty-state">
        Im Moment ist das hier der beste Treffer. Gib noch ein paar Zutaten dazu, dann kommen mehr Vorschläge.
      </div>
    `;
    return;
  }

  recipeResults.innerHTML = visibleMatches.map((match) => createRecipeCard(match, false)).join("");
}

function resetDecision(shouldRender = true) {
  decisionIndex = 0;
  lastDecisionMode = "none";
  cachedRandomDecisionPool = [];

  if (decideAgainButton) {
    decideAgainButton.disabled = true;
  }

  if (decisionResult) {
    decisionResult.className = "decision-result empty-decision";
    decisionResult.innerHTML = `
      <strong>Noch keine Entscheidung getroffen.</strong>
      <span>Drück auf den Button, dann übernehme ich kurz.</span>
    `;
  }

  if (shouldRender) {
    renderAll();
  }
}

function getDecisionPool() {
  const matches = getMatches();

  if (matches.length > 0) {
    return {
      mode: "matched",
      items: matches.map((match) => match.recipe),
      matches
    };
  }

  if (cachedRandomDecisionPool.length === 0) {
    cachedRandomDecisionPool = getShuffledRecipesForMood();
  }

  return {
    mode: "random",
    items: cachedRandomDecisionPool,
    matches: []
  };
}

function getShuffledRecipesForMood() {
  return recipes
    .map((recipe) => {
      let weight = 1;

      if (activeMood === "kein-bock" && recipe.tags.includes("kein bock")) weight += 4;
      if (activeMood === "schnell" && recipe.tags.includes("schnell")) weight += 4;
      if (activeMood === "muss-weg" && recipe.tags.includes("muss weg")) weight += 4;
      if (activeMood === "guenstig" && recipe.tags.includes("günstig")) weight += 4;
      if (activeMood === "satt" && recipe.tags.includes("sättigend")) weight += 4;
      if (activeMood === "verwoehn" && (recipe.tags.includes("soulfood") || recipe.tags.includes("cremig"))) weight += 4;

      return { recipe, weight, random: Math.random() };
    })
    .sort((a, b) => {
      if (b.weight !== a.weight) return b.weight - a.weight;
      return a.random - b.random;
    })
    .map((item) => item.recipe);
}

function decideRecipe(useNext = false) {
  const pool = getDecisionPool();

  if (!pool.items.length) {
    decisionResult.className = "decision-result empty-decision";
    decisionResult.innerHTML = `
      <strong>Ich finde gerade keine Rezepte.</strong>
      <span>Schau bitte, ob recipes.js sauber geladen wird.</span>
    `;
    return;
  }

  if (lastDecisionMode !== pool.mode) {
    decisionIndex = 0;
  } else if (useNext) {
    decisionIndex += 1;
  }

  if (decisionIndex >= pool.items.length) {
    decisionIndex = 0;
  }

  const recipe = pool.items[decisionIndex];
  const match = pool.matches.find((item) => item.recipe.id === recipe.id) || null;

  lastDecisionMode = pool.mode;

  renderDecisionResult(recipe, pool.mode, match);

  if (decideAgainButton) {
    decideAgainButton.disabled = pool.items.length <= 1;
  }

  updateBuddyTextOnly(
    pool.mode === "matched"
      ? `Ich hab entschieden: ${recipe.title}. Das passt gerade am besten zu deiner Küchenlage.`
      : `Keine Zutaten angegeben. Ich hab trotzdem entschieden: ${recipe.title}. Einkaufen musst du wahrscheinlich kurz.`
  );
}

function createDecisionReason(recipe, mode, match) {
  const mood = moodSettings[activeMood] || moodSettings.normal;

  if (mode === "random") {
    return `Du hast noch nichts eingetragen. Also würfle ich dir passend zur Küchenlage „${mood.label}“ eine solide Idee aus. Einkaufen müsstest du dafür wahrscheinlich kurz.`;
  }

  if (!match) {
    return `Das Rezept passt gut zu deiner Küchenlage „${mood.label}“ und ist gerade ein brauchbarer Kandidat.`;
  }

  const parts = [];

  if (match.matchingMain.length > 0) {
    parts.push(`Du hast schon ${formatList(match.matchingMain)} da.`);
  }

  if (activeMood === "kein-bock") {
    parts.push("Außerdem passt es gut, wenn heute wenig Aufwand gefragt ist.");
  } else if (activeMood === "schnell") {
    parts.push("Außerdem wirkt es nach einer schnellen Nummer ohne Küchenmarathon.");
  } else if (activeMood === "muss-weg") {
    parts.push("Außerdem hilft es dabei, vorhandene Sachen sinnvoll zu verwerten.");
  } else if (activeMood === "guenstig") {
    parts.push("Außerdem bleibt es eher bodenständig und günstig.");
  } else if (activeMood === "satt") {
    parts.push("Außerdem macht es ordentlich satt.");
  } else if (activeMood === "verwoehn") {
    parts.push("Außerdem hat es genau dieses gemütliche Soulfood-Gefühl.");
  }

  if (parts.length === 0) {
    parts.push("Das Rezept ist gerade der stärkste Treffer aus deinen Angaben.");
  }

  return parts.join(" ");
}

function getDecisionShoppingItems(recipe, mode, match) {
  if (mode === "random") {
    return recipe.main || [];
  }

  if (match && match.missingMain.length > 0) {
    return match.missingMain;
  }

  return [];
}

function renderDecisionResult(recipe, mode, match) {
  const reason = createDecisionReason(recipe, mode, match);
  const shoppingItems = getDecisionShoppingItems(recipe, mode, match);

  const shoppingText = mode === "random"
    ? "Besorgen müsstest du wahrscheinlich:"
    : "Falls noch nicht da, wäre gut:";

  const shoppingMarkup = shoppingItems.length > 0
    ? `
      <div class="decision-shopping">
        <strong>${escapeHtml(shoppingText)}</strong>
        <div class="decision-shopping-list">
          ${shoppingItems.map((item) => `<span>${escapeHtml(displayIngredientName(item))}</span>`).join("")}
        </div>
      </div>
    `
    : `
      <div class="decision-shopping decision-shopping-good">
        <strong>Sieht gut aus.</strong>
        <span>Für die wichtigsten Sachen bist du schon ziemlich gut aufgestellt.</span>
      </div>
    `;

  decisionResult.className = "decision-result has-decision";
  decisionResult.innerHTML = `
    <div class="decision-picked">
      <p class="decision-kicker">Küchenkumpel entscheidet heute:</p>
      <h4>${escapeHtml(recipe.title)}</h4>
      <p>${escapeHtml(reason)}</p>
    </div>

    ${shoppingMarkup}

    <div class="decision-result-actions">
      <button class="small-button" type="button" data-open-decision-recipe="${recipe.id}">
        Rezept ansehen
      </button>
    </div>
  `;

  const openButton = decisionResult.querySelector("[data-open-decision-recipe]");

  if (openButton) {
    openButton.addEventListener("click", () => {
      openRecipeModal(recipe.id);
    });
  }
}

function openRecipeModal(recipeId) {
  const recipe = recipes.find((item) => item.id === recipeId);
  if (!recipe) return;

  currentModalPortions = recipe.portions || 2;

  renderRecipeModal(recipe);
  recipeModal.classList.remove("hidden");
}

function renderRecipeModal(recipe) {
  modalContent.innerHTML = `
    <div class="modal-recipe-hero">
      <div class="modal-recipe-image-wrap">
        <img
          src="${escapeHtml(recipe.image)}"
          alt="${escapeHtml(recipe.title)}"
          onerror="this.parentElement.classList.add('image-missing'); this.remove();"
        />
      </div>

      <div class="modal-title-area">
        <span class="modal-category">${escapeHtml(recipe.category || "Rezept")}</span>
        <h3>${escapeHtml(recipe.title)}</h3>
        <p class="recipe-saying">${escapeHtml(recipe.saying)}</p>
        <p class="modal-description">${escapeHtml(recipe.shortDescription || "")}</p>
      </div>
    </div>

    <div class="recipe-meta">
      <span class="meta-pill">Zeit · ${escapeHtml(recipe.time)}</span>
      <span class="meta-pill">Vorbereitung · ${escapeHtml(recipe.timePrep || "nach Gefühl")}</span>
      <span class="meta-pill">Kochen · ${escapeHtml(recipe.timeCook || "nach Gefühl")}</span>
      <span class="meta-pill">Abwasch · ${escapeHtml(recipe.dishes)}</span>
      <span class="meta-pill">Kosten · ${escapeHtml(recipe.cost)}</span>
      <span class="meta-pill">Sättigung · ${escapeHtml(recipe.filling)}</span>
      <span class="meta-pill">Gefühl · ${escapeHtml(recipe.feeling)}</span>
    </div>

    <div class="detail-box">
      <strong>Abwasch:</strong> ${escapeHtml(recipe.dishesText)}
    </div>

    <div class="detail-box">
      <strong>Kosten:</strong> ${escapeHtml(recipe.costText)}
    </div>

    <div class="portion-panel">
      <p>Für <span id="modalPortionText">${currentModalPortions}</span> Portionen</p>

      <div class="portion-controls">
        <button id="decreasePortionsButton" class="portion-button" type="button" aria-label="Weniger Portionen">−</button>
        <span id="modalPortionCount" class="portion-count">${currentModalPortions}</span>
        <button id="increasePortionsButton" class="portion-button" type="button" aria-label="Mehr Portionen">+</button>
      </div>
    </div>

    <h4 class="modal-section-title">Zutaten</h4>
    <ul id="modalIngredientList" class="ingredient-list">
      ${renderIngredientList(recipe)}
    </ul>

    <h4 class="modal-section-title">Zubereitung</h4>
    <ol>
      ${(recipe.steps || []).map((step) => `<li>${escapeHtml(step)}</li>`).join("")}
    </ol>

    <div class="recipe-tip-box">
      <strong>Küchenkumpel-Tipp</strong>
      ${escapeHtml(recipe.tip || "Mach es dir nicht schwerer als nötig. Abschmecken, probieren, nachwürzen.")}
    </div>

    <h4 class="modal-section-title">Alternativen</h4>
    <ul class="alternative-list">
      ${(recipe.alternatives || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
    </ul>
  `;

  const decreaseButton = document.getElementById("decreasePortionsButton");
  const increaseButton = document.getElementById("increasePortionsButton");

  decreaseButton.addEventListener("click", () => changeModalPortions(recipe, -1));
  increaseButton.addEventListener("click", () => changeModalPortions(recipe, 1));
}

function changeModalPortions(recipe, direction) {
  const min = recipe.portionMin || 1;
  const max = recipe.portionMax || 8;
  const nextPortions = Math.min(max, Math.max(min, currentModalPortions + direction));

  if (nextPortions === currentModalPortions) return;

  currentModalPortions = nextPortions;

  const portionText = document.getElementById("modalPortionText");
  const portionCount = document.getElementById("modalPortionCount");
  const ingredientList = document.getElementById("modalIngredientList");

  if (portionText) portionText.textContent = currentModalPortions;
  if (portionCount) portionCount.textContent = currentModalPortions;
  if (ingredientList) ingredientList.innerHTML = renderIngredientList(recipe);
}

function renderIngredientList(recipe) {
  return (recipe.ingredients || [])
    .map((ingredient) => {
      return `
        <li>
          <span>${escapeHtml(ingredient.name)}</span>
          <strong>${escapeHtml(formatIngredientAmount(recipe, ingredient))}</strong>
        </li>
      `;
    })
    .join("");
}

function formatIngredientAmount(recipe, ingredient) {
  if (ingredient.amount === null || ingredient.amount === undefined) {
    return ingredient.unit || "";
  }

  const basePortions = recipe.portions || 2;
  const factor = currentModalPortions / basePortions;
  const calculatedAmount = ingredient.amount * factor;
  const formattedAmount = formatNumber(calculatedAmount);

  if (!ingredient.unit) {
    return formattedAmount;
  }

  const unit = ingredient.unit;

  if (
    ["Stück", "Dose", "Zehe", "Scheibe"].some((word) => unit.includes(word)) &&
    !Number.isInteger(calculatedAmount)
  ) {
    return `ca. ${formattedAmount} ${unit}`;
  }

  return `${formattedAmount} ${unit}`;
}

function formatNumber(value) {
  if (Number.isInteger(value)) {
    return String(value);
  }

  const rounded = Math.round(value * 10) / 10;
  return String(rounded).replace(".", ",");
}

function closeRecipeModal() {
  recipeModal.classList.add("hidden");
}

function copyMissingIngredients(recipeId) {
  const recipe = recipes.find((item) => item.id === recipeId);
  if (!recipe) return;

  const selectedNames = getSelectedNames();
  const missing = recipe.main.filter((ingredient) => !hasRealIngredient(recipe, ingredient, selectedNames));

  if (missing.length === 0) {
    updateBuddyTextOnly("Da fehlt nichts Wichtiges. Der Einkaufszettel darf heute Pause machen.");
    return;
  }

  const text = missing.map(displayIngredientName).join(", ");

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        updateBuddyTextOnly(`Kopiert: ${formatList(missing)}. Der Einkaufszettel kann kommen.`);
      })
      .catch(() => {
        updateBuddyTextOnly(`Fehlt noch: ${formatList(missing)}. Kopieren hat leider gezickt.`);
      });
  } else {
    updateBuddyTextOnly(`Fehlt noch: ${formatList(missing)}.`);
  }
}

function setActiveFilter(filter) {
  activeFilter = filter;
  resetDecision(false);

  filterButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.filter === filter);
  });

  renderAll();
}

function toggleNoMoodMode() {
  const nextMood = isNoMoodMode() ? "normal" : "kein-bock";
  setMood(nextMood);
}

function renderAll() {
  renderQuickIngredients();
  renderSelectedIngredients();
  renderRecommendations();
  renderRecipeResults();
  attachRecipeActionEvents();
  updateActiveNavByScroll();
}

function initWelcomeScreen() {
  const shouldHideWelcome = localStorage.getItem(HIDE_WELCOME_KEY) === "true";

  if (shouldHideWelcome) {
    welcomeScreen.classList.add("hidden");
  }
}

function startApp() {
  if (rememberThemeCheckbox && rememberThemeCheckbox.checked) {
    localStorage.setItem(THEME_KEY, activeTheme);
  }

  if (hideWelcomeCheckbox.checked) {
    localStorage.setItem(HIDE_WELCOME_KEY, "true");
  }

  welcomeScreen.classList.add("hidden");

  const moodSection = document.getElementById("moodSection");

  if (moodSection) {
    setTimeout(() => {
      moodSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
  }
}

function showWelcomeAgain() {
  localStorage.removeItem(HIDE_WELCOME_KEY);

  if (hideWelcomeCheckbox) {
    hideWelcomeCheckbox.checked = false;
  }

  welcomeScreen.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setActiveNav(targetId) {
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.nav === targetId);
  });
}

function updateActiveNavByScroll() {
  let currentId = "start";
  const triggerPoint = window.scrollY + window.innerHeight * 0.4;

  navSections.forEach((section) => {
    if (section && section.offsetTop <= triggerPoint) {
      currentId = section.id;
    }
  });

  setActiveNav(currentId);
}

function initNav() {
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      setActiveNav(link.dataset.nav);
      setTimeout(updateActiveNavByScroll, 350);
    });
  });

  window.addEventListener("scroll", updateActiveNavByScroll);
  window.addEventListener("load", updateActiveNavByScroll);
  window.addEventListener("resize", updateActiveNavByScroll);
}

function bindEvents() {
  addIngredientButton.addEventListener("click", () => {
    addIngredient(ingredientInput.value);
  });

  ingredientInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      addIngredient(ingredientInput.value);
    }
  });

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setActiveFilter(button.dataset.filter);
    });
  });

  themeOptionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedTheme = button.dataset.themeOption || "standard";
      const shouldSave = rememberThemeCheckbox ? rememberThemeCheckbox.checked : false;

      setTheme(selectedTheme, shouldSave);
      updateBuddyMessage();
    });
  });

  moodOptionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setMood(button.dataset.mood || "normal");
    });
  });

  if (rememberThemeCheckbox) {
    rememberThemeCheckbox.addEventListener("change", () => {
      if (rememberThemeCheckbox.checked) {
        localStorage.setItem(THEME_KEY, activeTheme);
      } else {
        localStorage.removeItem(THEME_KEY);
      }
    });
  }

  noMoodButton.addEventListener("click", toggleNoMoodMode);
  startAppButton.addEventListener("click", startApp);
  showWelcomeButton.addEventListener("click", showWelcomeAgain);

  decideButton.addEventListener("click", () => {
    decideRecipe(false);
  });

  decideAgainButton.addEventListener("click", () => {
    decideRecipe(true);
  });

  closeModalButton.addEventListener("click", closeRecipeModal);
  modalBackdrop.addEventListener("click", closeRecipeModal);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeRecipeModal();
    }
  });
}

function initApp() {
  initTheme();
  initMood();
  resetDecision(false);

  if (!recipes.length) {
    updateBuddyTextOnly("Ich finde gerade keine Rezepte. Schau bitte, ob recipes.js vor app.js geladen wird.");
    return;
  }

  bindEvents();
  initWelcomeScreen();
  updateBuddyMessage();
  renderAll();
  initNav();
}

initApp();