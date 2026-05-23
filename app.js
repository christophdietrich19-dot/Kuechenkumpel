const welcomeScreen = document.getElementById("welcomeScreen");
const startAppButton = document.getElementById("startAppButton");
const hideWelcomeCheckbox = document.getElementById("hideWelcomeCheckbox");
const showWelcomeButton = document.getElementById("showWelcomeButton");

const rememberThemeCheckbox = document.getElementById("rememberThemeCheckbox");
const themeOptionButtons = document.querySelectorAll("[data-theme-option]");

const welcomeMascot = document.getElementById("welcomeMascot");
const heroMascot = document.getElementById("heroMascot");
const sectionMascot = document.getElementById("sectionMascot");
const rescueMascot = document.getElementById("rescueMascot");
const ideaMascot = document.getElementById("ideaMascot");
const footerMascot = document.getElementById("footerMascot");
const themeHeroText = document.getElementById("themeHeroText");

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
let noMoodMode = false;
let currentModalRecipeId = null;
let currentModalPortions = 2;
let activeTheme = "standard";

const THEME_KEY = "kuechenkumpelTheme";
const HIDE_WELCOME_KEY = "kuechenkumpelHideWelcome";

const themeSettings = {
  standard: {
    label: "Standard",
    heroText: "Zeig mir, was da ist. Ich mach daraus eine Idee fürs Essen.",
    mascots: {
      welcome: "assets/images/kochtopf-hallo.png",
      hero: "assets/images/kochtopf-standard.png",
      section: "assets/images/kochtopf-kochen.png",
      rescue: "assets/images/kochtopf-kein-bock.png",
      idea: "assets/images/kochtopf-idee.png",
      footer: "assets/images/kochtopf-standard.png",
      buddy: "assets/images/kochtopf-idee.png"
    }
  },
  fruehling: {
    label: "Frühling",
    heroText: "Frisch, freundlich und ein bisschen grüner im Topf.",
    mascots: {
      welcome: "assets/images/kochtopf-hallo.png",
      hero: "assets/images/kochtopf-standard.png",
      section: "assets/images/kochtopf-kochen.png",
      rescue: "assets/images/kochtopf-kein-bock.png",
      idea: "assets/images/kochtopf-idee.png",
      footer: "assets/images/kochtopf-standard.png",
      buddy: "assets/images/kochtopf-idee.png"
    }
  },
  ostern: {
    label: "Ostern",
    heroText: "Heute wird es bunt, einfach und lecker.",
    mascots: {
      welcome: "assets/images/kochtopf-hallo.png",
      hero: "assets/images/kochtopf-standard.png",
      section: "assets/images/kochtopf-kochen.png",
      rescue: "assets/images/kochtopf-kein-bock.png",
      idea: "assets/images/kochtopf-idee.png",
      footer: "assets/images/kochtopf-standard.png",
      buddy: "assets/images/kochtopf-idee.png"
    }
  },
  sommer: {
    label: "Sommer",
    heroText: "Schnell, frisch und bitte ohne Küchen-Marathon.",
    mascots: {
      welcome: "assets/images/kochtopf-hallo.png",
      hero: "assets/images/kochtopf-standard.png",
      section: "assets/images/kochtopf-kochen.png",
      rescue: "assets/images/kochtopf-kein-bock.png",
      idea: "assets/images/kochtopf-idee.png",
      footer: "assets/images/kochtopf-standard.png",
      buddy: "assets/images/kochtopf-idee.png"
    }
  },
  herbst: {
    label: "Herbst",
    heroText: "Gemütlich, warm und perfekt für Pfanne, Topf und Ofen.",
    mascots: {
      welcome: "assets/images/kochtopf-hallo.png",
      hero: "assets/images/kochtopf-standard.png",
      section: "assets/images/kochtopf-kochen.png",
      rescue: "assets/images/kochtopf-kein-bock.png",
      idea: "assets/images/kochtopf-idee.png",
      footer: "assets/images/kochtopf-standard.png",
      buddy: "assets/images/kochtopf-idee.png"
    }
  },
  halloween: {
    label: "Halloween",
    heroText: "Gruselig leerer Kühlschrank? Keine Sorge, ich rette das.",
    mascots: {
      welcome: "assets/images/kochtopf-hallo.png",
      hero: "assets/images/kochtopf-standard.png",
      section: "assets/images/kochtopf-kochen.png",
      rescue: "assets/images/kochtopf-kein-bock.png",
      idea: "assets/images/kochtopf-idee.png",
      footer: "assets/images/kochtopf-standard.png",
      buddy: "assets/images/kochtopf-idee.png"
    }
  },
  weihnachten: {
    label: "Weihnachten",
    heroText: "Heute wird es warm, gemütlich und ein bisschen festlich.",
    mascots: {
      welcome: "assets/images/kochtopf-hallo.png",
      hero: "assets/images/kochtopf-standard.png",
      section: "assets/images/kochtopf-kochen.png",
      rescue: "assets/images/kochtopf-kein-bock.png",
      idea: "assets/images/kochtopf-idee.png",
      footer: "assets/images/kochtopf-standard.png",
      buddy: "assets/images/kochtopf-idee.png"
    }
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
    tags: ["schnell", "günstig", "vegetarisch", "kein bock", "cremig"],
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
    tags: ["schnell", "günstig", "kein bock", "reste"]
  },
  4: {
    main: ["nudeln", "thunfisch"],
    optional: ["tomaten", "frischkäse", "mais", "zwiebel", "käse"],
    tags: ["schnell", "proteinreich", "vorrat"],
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
    tags: ["schnell", "herzhaft", "soulfood"],
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
    tags: ["muss weg", "herzhaft", "ofen", "soulfood"]
  },
  9: {
    main: ["nudeln", "frischkäse", "gemüse"],
    optional: ["tomaten", "knoblauch", "käse", "sahne", "schmand", "quark", "joghurt"],
    tags: ["schnell", "vegetarisch", "cremig"]
  },
  10: {
    main: ["nudeln", "tomaten", "käse"],
    optional: ["zwiebel", "milch", "sahne", "knoblauch", "gemüse"],
    tags: ["ofen", "vegetarisch", "soulfood"],
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
    tags: ["günstig", "vorrat", "proteinreich"],
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
    tags: ["proteinreich", "modern", "macht satt"]
  },
  19: {
    main: ["hähnchen", "gemüse"],
    optional: ["reis", "nudeln", "joghurt", "quark", "knoblauch"],
    tags: ["proteinreich", "muss weg", "alltag"]
  },
  20: {
    main: ["hackfleisch", "reis", "gemüse"],
    optional: ["tomaten", "käse", "mais", "zwiebel"],
    tags: ["herzhaft", "alltag", "macht satt"]
  },
  21: {
    main: ["kartoffeln", "eier", "zwiebel"],
    optional: ["speck", "schinken", "käse", "gewürzgurke"],
    tags: ["günstig", "herzhaft", "klassisch"]
  },
  22: {
    main: ["kartoffeln", "gemüse", "zwiebel"],
    optional: ["eier", "käse", "quark", "joghurt"],
    tags: ["muss weg", "günstig", "vegetarisch"]
  },
  23: {
    main: ["kartoffeln", "käse", "milch"],
    optional: ["sahne", "gemüse", "schinken", "zwiebel"],
    tags: ["herzhaft", "ofen", "soulfood"],
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
    tags: ["herzhaft", "günstig", "deftig"]
  },
  27: {
    main: ["wurst", "kartoffeln", "zwiebel"],
    optional: ["eier", "paprika", "käse"],
    tags: ["herzhaft", "günstig", "deftig"],
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
    tags: ["muss weg", "ofen", "vegetarisch"],
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
    tags: ["günstig", "reste", "herzhaft"],
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
    tags: ["vorrat", "günstig", "proteinreich"],
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
  if (["brot", "broetchen", "brötchen", "toast", "baguette"].includes(text)) return text.replace("broetchen", "brötchen");
  if (["gemuese", "gemüse"].includes(text)) return "gemüse";
  if (["tk gemuese", "tk gemüse", "tiefkuehlgemuese", "tiefkühlgemüse"].includes(text)) return "tk-gemüse";
  if (["moehren", "möhren", "karotten", "mohren"].includes(text)) return "möhren";
  if (["paprika", "zucchini", "brokkoli", "pilze", "spinat"].includes(text)) return text;
  if (["milch", "sahne", "kokosmilch", "frischkaese", "frischkäse", "schmand", "quark", "joghurt"].includes(text)) {
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
    "eier": "Eier",
    "käse": "Käse",
    "nudeln": "Nudeln",
    "kartoffeln": "Kartoffeln",
    "tomaten": "Tomaten",
    "dosentomaten": "Dosentomaten",
    "passierte tomaten": "passierte Tomaten",
    "zwiebel": "Zwiebel",
    "brot": "Brot",
    "brötchen": "Brötchen",
    "toast": "Toast",
    "baguette": "Baguette",
    "gemüse": "Gemüse",
    "tk-gemüse": "TK-Gemüse",
    "möhren": "Möhren",
    "paprika": "Paprika",
    "zucchini": "Zucchini",
    "brokkoli": "Brokkoli",
    "pilze": "Pilze",
    "milch": "Milch",
    "sahne": "Sahne",
    "kokosmilch": "Kokosmilch",
    "frischkäse": "Frischkäse",
    "schmand": "Schmand",
    "quark": "Quark",
    "joghurt": "Joghurt",
    "hackfleisch": "Hackfleisch",
    "hähnchen": "Hähnchen",
    "thunfisch": "Thunfisch",
    "bohnen": "Bohnen",
    "mais": "Mais",
    "linsen": "Linsen",
    "haferflocken": "Haferflocken",
    "mehl": "Mehl",
    "brühe": "Brühe",
    "öl": "Öl",
    "knoblauch": "Knoblauch"
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
    (recipe.timeTotal.includes("10") ||
      recipe.timeTotal.includes("12") ||
      recipe.timeTotal.includes("15") ||
      recipe.timeTotal.includes("20"))
  ) {
    tags.push("schnell");
  }

  if (recipe.dishes === "wenig") tags.push("wenig abwasch");
  if (recipe.feeling === "Kein-Bock-Retter") tags.push("kein bock");
  if (recipe.category && recipe.category.includes("Vorrat")) tags.push("vorrat");

  return tags;
}

const recipes = buildRecipes();

function setTheme(themeName, shouldSave = false) {
  const safeTheme = themeSettings[themeName] ? themeName : "standard";
  activeTheme = safeTheme;

  document.body.dataset.theme = safeTheme;

  if (shouldSave) {
    localStorage.setItem(THEME_KEY, safeTheme);
  }

  updateThemeButtons();
  updateThemeMascots();
}

function updateThemeButtons() {
  themeOptionButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.themeOption === activeTheme);
  });
}

function updateThemeMascots() {
  const settings = themeSettings[activeTheme] || themeSettings.standard;
  const mascots = settings.mascots;

  if (welcomeMascot) welcomeMascot.src = mascots.welcome;
  if (heroMascot) heroMascot.src = mascots.hero;
  if (sectionMascot) sectionMascot.src = mascots.section;
  if (rescueMascot) rescueMascot.src = mascots.rescue;
  if (ideaMascot) ideaMascot.src = mascots.idea;
  if (footerMascot) footerMascot.src = mascots.footer;
  if (themeHeroText) themeHeroText.textContent = settings.heroText;
}

function initTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY) || "standard";
  setTheme(savedTheme, false);
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
  updateBuddyMessage();
  renderAll();
}

function removeIngredient(name) {
  selectedIngredients = selectedIngredients.filter((ingredient) => ingredient.name !== name);
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

  const vegetables = ["gemüse", "paprika", "zucchini", "möhren", "brokkoli", "pilze", "spinat", "tk-gemüse"];

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
    if (isExactIngredientMatch(recipeIngredient, selectedName)) {
      return "exact";
    }
  }

  for (const selectedName of selectedNames) {
    if (isVegetableSoftMatch(recipeIngredient, selectedName)) {
      return "soft";
    }
  }

  for (const selectedName of selectedNames) {
    if (isSubstituteMatch(recipe, recipeIngredient, selectedName)) {
      return "substitute";
    }
  }

  return "missing";
}

function hasRealIngredient(recipe, recipeIngredient, selectedNames) {
  const type = getIngredientMatchType(recipe, recipeIngredient, selectedNames);
  return type === "exact" || type === "soft";
}

function hasAnyIngredientConnection(recipe, ingredient, selectedNames) {
  const type = getIngredientMatchType(recipe, ingredient, selectedNames);
  return type === "exact" || type === "soft" || type === "substitute";
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
      return;
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

  if (noMoodMode) {
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

    if (recipe.time.includes("30") || recipe.time.includes("35") || recipe.time.includes("40") || recipe.time.includes("45")) {
      score -= 4;
    }

    if (recipe.tags.includes("ofen")) {
      score -= 5;
    }
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
    .filter((item) => item.matchingMain.length > 0 || item.matchingOptional.length > 0 || item.substituteMain.length > 0)
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);
}

function getBuddyMascotPath() {
  const settings = themeSettings[activeTheme] || themeSettings.standard;
  return settings.mascots.buddy;
}

function updateBuddyTextOnly(text) {
  buddyMessage.innerHTML = `
    <img
      class="buddy-mascot"
      src="${escapeHtml(getBuddyMascotPath())}"
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

  let message = "Okay, damit lässt sich arbeiten.";

  if (selectedIngredients.length === 0) {
    message = "Okay, was liegt heute im Kühlschrank?";
  } else if (urgentNames.length > 0) {
    message = `Alles klar. ${formatList(urgentNames)} hat nicht mehr ewig Zeit. Geben wir dem Zeug heute noch einen würdigen Auftritt.`;
  } else if (selectedIngredients.length <= 2) {
    message = "Das ist sportlich wenig, aber wir kriegen was hin.";
  } else if (noMoodMode) {
    message = "Keine Energie? Alles gut. Heute wird nicht gekocht, heute wird gerettet.";
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

  return `
    <article class="${cardClass}">
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
          Passt: ${matchingMain.length > 0 ? escapeHtml(formatList(matchingMain)) : "noch nicht viel, aber wir versuchen es."}
        </div>

        <div class="missing-line">
          ${escapeHtml(missingText)}
        </div>

        <div class="match-line">
          ${escapeHtml(optionalText)}
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

function openRecipeModal(recipeId) {
  const recipe = recipes.find((item) => item.id === recipeId);
  if (!recipe) return;

  currentModalRecipeId = recipe.id;
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
  currentModalRecipeId = null;
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

  filterButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.filter === filter);
  });

  renderAll();
}

function toggleNoMoodMode() {
  noMoodMode = !noMoodMode;

  noMoodButton.classList.toggle("active", noMoodMode);
  noMoodButton.textContent = noMoodMode
    ? "Kein-Bock-Modus ist aktiv"
    : "Rette mein Abendessen";

  updateBuddyMessage();
  renderAll();
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
}

function showWelcomeAgain() {
  localStorage.removeItem(HIDE_WELCOME_KEY);
  hideWelcomeCheckbox.checked = false;
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