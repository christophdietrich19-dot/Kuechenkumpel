const welcomeScreen = document.getElementById("welcomeScreen");
const startAppButton = document.getElementById("startAppButton");
const hideWelcomeCheckbox = document.getElementById("hideWelcomeCheckbox");
const showWelcomeButton = document.getElementById("showWelcomeButton");

const updateFlyer = document.getElementById("updateFlyer");
const updateFlyerBackdrop = document.getElementById("updateFlyerBackdrop");
const closeUpdateFlyerButton = document.getElementById("closeUpdateFlyerButton");
const confirmUpdateFlyerButton = document.getElementById("confirmUpdateFlyerButton");
const showUpdateLaterButton = document.getElementById("showUpdateLaterButton");
const updateFlyerImage = document.getElementById("updateFlyerImage");
const updateFlyerBadge = document.getElementById("updateFlyerBadge");
const updateFlyerTitle = document.getElementById("updateFlyerTitle");
const updateFlyerSubtitle = document.getElementById("updateFlyerSubtitle");
const updateFlyerItems = document.getElementById("updateFlyerItems");
const updateFlyerFooterText = document.getElementById("updateFlyerFooterText");
const updateFlyerFooterHighlight = document.getElementById("updateFlyerFooterHighlight");

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
const favoriteMascot = document.getElementById("favoriteMascot");
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
const favoriteResults = document.getElementById("favoriteResults");
const recipeResults = document.getElementById("recipeResults");
const resultCounter = document.getElementById("resultCounter");

const recipeModal = document.getElementById("recipeModal");
const modalBackdrop = document.getElementById("modalBackdrop");
const closeModalButton = document.getElementById("closeModalButton");
const modalContent = document.getElementById("modalContent");

const navLinks = document.querySelectorAll(".nav-link");
const navSections = [
  document.getElementById("moodSection"),
  document.getElementById("favorites"),
  document.getElementById("recipes"),
  document.getElementById("about")
];

let selectedIngredients = [];
let favoriteRecipeIds = [];
let activeFilter = "all";
let activeTheme = "standard";
let activeMood = "normal";
let currentModalPortions = 2;
let decisionIndex = 0;
let lastDecisionMode = "none";
let cachedRandomDecisionPool = [];

const THEME_KEY = "kuechenkumpelTheme";
const HIDE_WELCOME_KEY = "kuechenkumpelHideWelcome";
const MOOD_KEY = "kuechenkumpelMood";
const FAVORITES_KEY = "kuechenkumpelFavorites";
const UPDATE_SEEN_KEY = "kuechenkumpelSeenUpdateVersion";

const mascotFiles = {
  welcome: "kochtopf-hallo.png",
  hero: "kochtopf-standard.png",
  mood: "kochtopf-hallo.png",
  decision: "kochtopf-idee.png",
  section: "kochtopf-kochen.png",
  rescue: "kochtopf-kein-bock.png",
  idea: "kochtopf-idee.png",
  favorite: "kochtopf-idee.png",
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

const daytimeSettings = {
  morgen: {
    label: "Morgenmodus",
    heroText: "Guten Morgen. Frühstück, Resteküche oder direkt Kühlschrank-Notfall?",
    buddy: "Guten Morgen. Wir starten langsam, aber mit Plan. Was ist heute früh überhaupt machbar?"
  },
  mittag: {
    label: "Mittagsmodus",
    heroText: "Mittagshunger erkannt. Wir halten es sinnvoll und nicht unnötig kompliziert.",
    buddy: "Mittagshunger erkannt. Ich suche dir etwas, das satt macht und nicht den halben Tag klaut."
  },
  nachmittag: {
    label: "Nachmittagsmodus",
    heroText: "Kleiner Hunger oder schon Abendessen planen? Ich schau mal, was geht.",
    buddy: "Nachmittagsküche. Noch Snack, schon Abendessen oder einfach mal schauen, was der Kühlschrank sagt?"
  },
  abend: {
    label: "Feierabendmodus",
    heroText: "Feierabendküche. Bitte lecker, aber ohne Küchen-Drama.",
    buddy: "Feierabendküche. Jetzt bitte etwas Gutes, ohne dass die Küche danach aussieht wie ein Tatort."
  },
  nacht: {
    label: "Nachtmodus",
    heroText: "Späte Küchenaktion? Okay. Dann bitte schnell und ohne große Sauerei.",
    buddy: "Späte Küchenaktion. Ich halte es kurz, einfach und möglichst ohne große Sauerei."
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

function getUpdateContent() {
  return window.KUECHENKUMPEL_UPDATE || null;
}

function shouldShowUpdateFlyer() {
  const updateContent = getUpdateContent();

  if (!updateContent || !updateContent.version) {
    return false;
  }

  const seenVersion = localStorage.getItem(UPDATE_SEEN_KEY);

  return seenVersion !== updateContent.version;
}

function renderUpdateFlyerContent() {
  const updateContent = getUpdateContent();

  if (!updateContent) {
    return;
  }

  if (updateFlyerBadge) {
    updateFlyerBadge.textContent = updateContent.badge || "UPDATE";
  }

  if (updateFlyerTitle) {
    updateFlyerTitle.textContent = updateContent.title || "Neu bei Küchenkumpel";
  }

  if (updateFlyerSubtitle) {
    updateFlyerSubtitle.textContent = updateContent.subtitle || "";
  }

  if (updateFlyerImage) {
    updateFlyerImage.src = updateContent.image || "assets/images/update-pinup.png";
    updateFlyerImage.alt = updateContent.imageAlt || "Neu bei Küchenkumpel";
  }

  if (updateFlyerFooterText) {
    updateFlyerFooterText.textContent = updateContent.footerText || "Schön, dass du wieder da bist.";
  }

  if (updateFlyerFooterHighlight) {
    updateFlyerFooterHighlight.textContent = updateContent.footerHighlight || "Viel Spaß beim Loskochen!";
  }

  if (confirmUpdateFlyerButton) {
    confirmUpdateFlyerButton.textContent = updateContent.buttonText || "Alles klar, loskochen";
  }

  if (showUpdateLaterButton) {
    showUpdateLaterButton.textContent = updateContent.laterText || "Später nochmal anschauen";
  }

  if (updateFlyerItems) {
    const items = Array.isArray(updateContent.items) ? updateContent.items : [];

    updateFlyerItems.innerHTML = items
      .map((item) => {
        return `
          <div class="update-pinup-item">
            <span class="update-pinup-icon">${escapeHtml(item.icon || "✦")}</span>

            <div>
              <strong>${escapeHtml(item.title || "")}</strong>
              <p>${escapeHtml(item.text || "")}</p>
            </div>
          </div>
        `;
      })
      .join("");
  }
}

function openUpdateFlyer() {
  if (!updateFlyer) return;

  renderUpdateFlyerContent();
  updateFlyer.classList.remove("hidden");
  document.body.classList.add("update-flyer-open");
}

function closeUpdateFlyer(rememberVersion = false) {
  if (!updateFlyer) return;

  const updateContent = getUpdateContent();

  if (rememberVersion && updateContent && updateContent.version) {
    localStorage.setItem(UPDATE_SEEN_KEY, updateContent.version);
  }

  updateFlyer.classList.add("hidden");
  document.body.classList.remove("update-flyer-open");
}

function initUpdateFlyer() {
  if (!updateFlyer) return;

  renderUpdateFlyerContent();

  if (shouldShowUpdateFlyer()) {
    setTimeout(() => {
      openUpdateFlyer();
    }, 450);
  }
}

function getDaytimeMode() {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 11) return "morgen";
  if (hour >= 11 && hour < 15) return "mittag";
  if (hour >= 15 && hour < 18) return "nachmittag";
  if (hour >= 18 && hour < 23) return "abend";

  return "nacht";
}

function getDaytimeSettings() {
  const mode = getDaytimeMode();
  return daytimeSettings[mode] || daytimeSettings.abend;
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

  if (["paprika", "zucchini", "brokkoli", "pilze", "spinat"].includes(text)) {
    return text;
  }

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

function getRecipeSource() {
  if (Array.isArray(window.RECIPES)) {
    return window.RECIPES;
  }

  return [];
}

function simplifyIngredientName(value) {
  const text = normalize(value);

  if (text.includes("nudel") || text.includes("spaghetti") || text.includes("pasta")) return "nudeln";
  if (text.includes("reis")) return "reis";
  if (text.includes("kartoffel")) return "kartoffeln";
  if (text.includes("ei")) return "eier";
  if (text.includes("käse") || text.includes("kaese")) return "käse";
  if (text.includes("tomate")) return "tomaten";
  if (text.includes("zwiebel")) return "zwiebel";
  if (text.includes("brot")) return "brot";
  if (text.includes("brötchen") || text.includes("broetchen")) return "brötchen";
  if (text.includes("paprika")) return "paprika";
  if (text.includes("gemüse") || text.includes("gemuese")) return "gemüse";
  if (text.includes("milch")) return "milch";
  if (text.includes("sahne")) return "sahne";
  if (text.includes("frischkäse") || text.includes("frischkaese")) return "frischkäse";
  if (text.includes("schmand")) return "schmand";
  if (text.includes("quark")) return "quark";
  if (text.includes("joghurt")) return "joghurt";
  if (text.includes("thunfisch")) return "thunfisch";
  if (text.includes("hack")) return "hackfleisch";
  if (text.includes("hähnchen") || text.includes("haehnchen") || text.includes("huhn")) return "hähnchen";
  if (text.includes("bohne")) return "bohnen";
  if (text.includes("mais")) return "mais";
  if (text.includes("linse")) return "linsen";
  if (text.includes("hafer")) return "haferflocken";
  if (text.includes("mehl")) return "mehl";
  if (text.includes("knoblauch")) return "knoblauch";
  if (text.includes("öl") || text.includes("oel")) return "öl";
  if (text.includes("brühe") || text.includes("bruehe")) return "brühe";
  if (text.includes("zucchini")) return "zucchini";
  if (text.includes("möhren") || text.includes("karotte")) return "möhren";
  if (text.includes("brokkoli")) return "brokkoli";
  if (text.includes("pilz")) return "pilze";
  if (text.includes("spinat")) return "spinat";

  return "";
}

function buildTags(recipe) {
  const tags = [];
  const fullText = normalize(
    [
      recipe.name,
      recipe.category,
      recipe.slogan,
      recipe.shortDescription,
      recipe.feeling,
      recipe.satiety,
      recipe.timeTotal,
      recipe.difficulty,
      recipe.cost,
      recipe.dishes
    ].join(" ")
  );

  if (recipe.cost === "günstig" || fullText.includes("günstig")) tags.push("günstig");
  if (recipe.dishes === "wenig") tags.push("wenig abwasch");
  if (fullText.includes("kein-bock") || fullText.includes("kein bock")) tags.push("kein bock");
  if (fullText.includes("rest")) tags.push("muss weg");
  if (fullText.includes("vorrat")) tags.push("vorrat");
  if (fullText.includes("satt")) tags.push("sättigend");
  if (fullText.includes("protein")) tags.push("proteinreich");
  if (fullText.includes("soulfood") || fullText.includes("cremig")) tags.push("soulfood");
  if (fullText.includes("cremig")) tags.push("cremig");
  if (fullText.includes("ofen") || fullText.includes("auflauf")) tags.push("ofen");
  if (fullText.includes("herzhaft")) tags.push("herzhaft");

  if (
    fullText.includes("10 minuten") ||
    fullText.includes("12 minuten") ||
    fullText.includes("15 minuten") ||
    fullText.includes("20 minuten")
  ) {
    tags.push("schnell");
  }

  const meatWords = ["hack", "hähnchen", "haehnchen", "schinken", "speck", "wurst", "thunfisch", "fleisch"];
  const isMeat = meatWords.some((word) => fullText.includes(word));

  if (!isMeat) {
    tags.push("vegetarisch");
  }

  return [...new Set(tags)];
}

function extractRecipeMainIngredients(recipe) {
  const ingredients = recipe.ingredients || [];
  const found = [];

  ingredients.forEach((ingredient) => {
    const simplified = simplifyIngredientName(ingredient.name);

    if (simplified && !found.includes(simplified)) {
      found.push(simplified);
    }
  });

  return found.slice(0, 4);
}

function extractRecipeOptionalIngredients(recipe) {
  const ingredients = recipe.ingredients || [];
  const found = [];

  ingredients.forEach((ingredient) => {
    const simplified = simplifyIngredientName(ingredient.name);

    if (simplified && !found.includes(simplified)) {
      found.push(simplified);
    }
  });

  return found.slice(4, 10);
}

function buildRecipes() {
  return getRecipeSource().map((recipe) => {
    return {
      ...recipe,
      title: recipe.name,
      main: extractRecipeMainIngredients(recipe),
      optional: extractRecipeOptionalIngredients(recipe),
      tags: buildTags(recipe),
      time: recipe.timeTotal || "ca. 20 Minuten",
      dishesText: createDishesText(recipe.dishes),
      costText: createCostText(recipe.cost),
      filling: recipe.satiety || "macht satt",
      saying: recipe.slogan || ""
    };
  });
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

  if (welcomeThemeBadge) welcomeThemeBadge.textContent = `${settings.icon} ${settings.label}`;
  if (welcomeThemeTitle) welcomeThemeTitle.textContent = settings.previewTitle;
  if (welcomeThemeDescription) welcomeThemeDescription.textContent = settings.previewDescription;
}

function getCurrentMoodMascotKey() {
  const settings = moodSettings[activeMood] || moodSettings.normal;
  return settings.mascot || "mood";
}

function updateThemeMascots() {
  setMascotImage(welcomeMascot, "welcome");
  setMascotImage(heroMascot, "hero");
  setMascotImage(moodMascot, getCurrentMoodMascotKey());
  setMascotImage(decisionMascot, "decision");
  setMascotImage(sectionMascot, "section");
  setMascotImage(rescueMascot, "rescue");
  setMascotImage(ideaMascot, "idea");
  setMascotImage(favoriteMascot, "favorite");
  setMascotImage(footerMascot, "footer");

  if (themeHeroText) {
    themeHeroText.textContent = getDaytimeSettings().heroText;
  }
}

function initTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY) || "standard";

  if (rememberThemeCheckbox) {
    rememberThemeCheckbox.checked = localStorage.getItem(THEME_KEY) !== null;
  }

  setTheme(savedTheme, false);
}

function loadFavorites() {
  try {
    const savedFavorites = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");

    if (Array.isArray(savedFavorites)) {
      favoriteRecipeIds = savedFavorites
        .map((id) => Number(id))
        .filter((id) => Number.isFinite(id));
    }
  } catch {
    favoriteRecipeIds = [];
  }
}

function saveFavorites() {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteRecipeIds));
}

function isFavorite(recipeId) {
  return favoriteRecipeIds.includes(Number(recipeId));
}

function toggleFavorite(recipeId) {
  const id = Number(recipeId);

  if (!Number.isFinite(id)) return;

  if (isFavorite(id)) {
    favoriteRecipeIds = favoriteRecipeIds.filter((favoriteId) => favoriteId !== id);
    updateBuddyTextOnly("Okay, Rezept aus den Favoriten entfernt.");
  } else {
    favoriteRecipeIds.push(id);
    updateBuddyTextOnly("Gemerkte Küchenidee. Dein zukünftiges Ich sagt danke.");
  }

  saveFavorites();
  renderAll();

  if (recipeModal && !recipeModal.classList.contains("hidden")) {
    const recipe = recipes.find((item) => item.id === id);

    if (recipe) {
      renderRecipeModal(recipe);
    }
  }
}

function isNoMoodMode() {
  return activeMood === "kein-bock";
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
    if (ingredientInput) ingredientInput.value = "";
    return;
  }

  selectedIngredients.push({
    name: normalizedName,
    urgent: false
  });

  if (ingredientInput) ingredientInput.value = "";

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

  const groups = [
    ["eier", "ei"],
    ["tomaten", "dosentomaten", "passierte tomaten"],
    ["brot", "toast", "brötchen", "baguette"],
    ["gemüse", "tk-gemüse", "paprika", "zucchini", "möhren", "brokkoli", "pilze", "spinat"],
    ["brühe", "gemüsebrühe"]
  ];

  return groups.some((group) => group.includes(recipeValue) && group.includes(selectedValue));
}

function scoreRecipe(recipe) {
  const selectedNames = getSelectedNames();
  const urgentNames = getUrgentNames();

  const matchingMain = [];
  const missingMain = [];
  const matchingOptional = [];

  recipe.main.forEach((ingredient) => {
    if (selectedNames.some((selectedName) => isExactIngredientMatch(ingredient, selectedName))) {
      matchingMain.push(ingredient);
    } else {
      missingMain.push(ingredient);
    }
  });

  recipe.optional.forEach((ingredient) => {
    if (selectedNames.some((selectedName) => isExactIngredientMatch(ingredient, selectedName))) {
      matchingOptional.push(ingredient);
    }
  });

  let score = 0;

  score += matchingMain.length * 8;
  score += matchingOptional.length * 2;
  score -= missingMain.length * 2;

  urgentNames.forEach((urgentName) => {
    if (recipe.main.some((ingredient) => isExactIngredientMatch(ingredient, urgentName))) {
      score += 8;
    }

    if (recipe.optional.some((ingredient) => isExactIngredientMatch(ingredient, urgentName))) {
      score += 3;
    }
  });

  if (isNoMoodMode()) {
    if (recipe.tags.includes("kein bock")) score += 8;
    if (recipe.tags.includes("schnell")) score += 4;
    if (recipe.dishes === "wenig") score += 3;
    if (recipe.tags.includes("ofen")) score -= 4;
  }

  if (activeMood === "schnell") {
    if (recipe.tags.includes("schnell")) score += 8;
    if (recipe.dishes === "wenig") score += 2;
    if (recipe.tags.includes("ofen")) score -= 4;
  }

  if (activeMood === "muss-weg") {
    if (recipe.tags.includes("muss weg")) score += 7;
  }

  if (activeMood === "guenstig") {
    if (recipe.tags.includes("günstig")) score += 8;
    if (recipe.cost === "hoch") score -= 5;
  }

  if (activeMood === "satt") {
    if (recipe.tags.includes("sättigend")) score += 7;
    if (recipe.tags.includes("proteinreich")) score += 4;
    if (recipe.tags.includes("herzhaft")) score += 3;
  }

  if (activeMood === "verwoehn") {
    if (recipe.tags.includes("soulfood")) score += 7;
    if (recipe.tags.includes("cremig")) score += 5;
    if (recipe.tags.includes("herzhaft")) score += 2;
  }

  const daytimeMode = getDaytimeMode();

  if (daytimeMode === "morgen") {
    if (recipe.tags.includes("frühstück")) score += 8;
    if (recipe.tags.includes("schnell")) score += 2;
  }

  if (daytimeMode === "mittag") {
    if (recipe.tags.includes("schnell")) score += 3;
    if (recipe.tags.includes("sättigend")) score += 2;
  }

  if (daytimeMode === "abend") {
    if (recipe.tags.includes("soulfood")) score += 3;
    if (recipe.tags.includes("sättigend")) score += 2;
    if (recipe.tags.includes("herzhaft")) score += 2;
  }

  if (daytimeMode === "nacht") {
    if (recipe.tags.includes("schnell")) score += 5;
    if (recipe.dishes === "wenig") score += 4;
    if (recipe.tags.includes("ofen")) score -= 6;
  }

  if (activeFilter !== "all") {
    if (recipe.tags.includes(activeFilter)) {
      score += 5;
    } else {
      score -= 6;
    }
  }

  if (matchingMain.length === 0 && matchingOptional.length === 0) {
    score -= 10;
  }

  return {
    recipe,
    matchingMain,
    substituteMain: [],
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
  if (!buddyMessage) return;

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
  const daytime = getDaytimeSettings();

  let message = daytime.buddy;

  if (activeMood !== "normal") {
    message = mood.buddy;
  }

  if (selectedIngredients.length === 0) {
    message = activeMood === "normal" ? daytime.buddy : mood.buddy;
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
  if (!quickIngredientsContainer) return;

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
  if (!selectedIngredientsContainer) return;

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

function createFavoriteButton(recipe) {
  const active = isFavorite(recipe.id);

  return `
    <button
      class="favorite-button ${active ? "active" : ""}"
      type="button"
      data-toggle-favorite="${recipe.id}"
      aria-label="${active ? "Aus Favoriten entfernen" : "Zu Favoriten hinzufügen"}"
      title="${active ? "Aus Favoriten entfernen" : "Zu Favoriten hinzufügen"}"
    >
      ${active ? "♥" : "♡"}
    </button>
  `;
}

function createRecipeCard(match, isRecommendation) {
  const { recipe, matchingMain, missingMain, matchingOptional } = match;
  const cardClass = isRecommendation ? "recommendation-card" : "recipe-card";
  const badgeText = isRecommendation ? "Bester Treffer" : "Rezeptidee";

  const missingText = missingMain.length > 0
    ? formatList(missingMain)
    : "Du hast alles Wichtige. Sehr stabil.";

  const optionalText = matchingOptional.length > 0
    ? formatList(matchingOptional)
    : "Extras sind nice, aber kein Muss.";

  return `
    <article class="${cardClass}">
      ${getRecipeImageMarkup(recipe, isRecommendation)}

      <div class="recipe-card-content">
        <div class="recipe-card-topline">
          <span class="recipe-card-badge">${badgeText}</span>
          ${createFavoriteButton(recipe)}
        </div>

        <h4>${escapeHtml(recipe.title)}</h4>

        <p class="recipe-saying">${escapeHtml(recipe.saying)}</p>

        <div class="recipe-meta">
          <span class="meta-pill">Zeit · ${escapeHtml(recipe.time)}</span>
          <span class="meta-pill">Abwasch · ${escapeHtml(recipe.dishes || "normal")}</span>
          <span class="meta-pill">Kosten · ${escapeHtml(recipe.cost || "normal")}</span>
          <span class="meta-pill">Sättigung · ${escapeHtml(recipe.filling)}</span>
          <span class="meta-pill">Gefühl · ${escapeHtml(recipe.feeling || "Alltag")}</span>
        </div>

        <div class="match-info">
          <div class="match-line">
            <strong>Passt:</strong>
            ${matchingMain.length > 0 ? escapeHtml(formatList(matchingMain)) : "noch nicht viel, aber wir versuchen es."}
          </div>

          <div class="missing-line">
            <strong>${missingMain.length > 0 ? "Fehlt:" : "Status:"}</strong>
            ${escapeHtml(missingText)}
          </div>

          <div class="match-line">
            <strong>Extra:</strong>
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
      </div>
    </article>
  `;
}

function attachRecipeActionEvents() {
  document.querySelectorAll("[data-open-recipe]").forEach((button) => {
    button.addEventListener("click", () => {
      openRecipeModal(Number(button.dataset.openRecipe));
    });
  });

  document.querySelectorAll("[data-copy-missing]").forEach((button) => {
    button.addEventListener("click", () => {
      copyMissingIngredients(Number(button.dataset.copyMissing));
    });
  });

  document.querySelectorAll("[data-toggle-favorite]").forEach((button) => {
    button.addEventListener("click", () => {
      toggleFavorite(Number(button.dataset.toggleFavorite));
    });
  });
}

function renderRecommendations() {
  if (!topRecommendation) return;

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

function createFavoriteMatch(recipe) {
  return {
    recipe,
    matchingMain: [],
    substituteMain: [],
    missingMain: recipe.main || [],
    matchingOptional: [],
    score: 0
  };
}

function renderFavorites() {
  if (!favoriteResults) return;

  const favoriteRecipes = favoriteRecipeIds
    .map((id) => recipes.find((recipe) => recipe.id === id))
    .filter(Boolean);

  if (favoriteRecipes.length === 0) {
    favoriteResults.innerHTML = `
      <div class="empty-state">
        Noch keine Favoriten. Wenn ein Rezept gut klingt, drück aufs Herz. Dein zukünftiges Ich wird es dir danken.
      </div>
    `;
    return;
  }

  favoriteResults.innerHTML = favoriteRecipes
    .map((recipe) => createRecipeCard(createFavoriteMatch(recipe), false))
    .join("");
}

function renderRecipeResults() {
  if (!recipeResults || !resultCounter) return;

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

function getShuffledRecipesForMood() {
  return recipes
    .map((recipe) => {
      let weight = 1;
      const daytimeMode = getDaytimeMode();

      if (activeMood === "kein-bock" && recipe.tags.includes("kein bock")) weight += 4;
      if (activeMood === "schnell" && recipe.tags.includes("schnell")) weight += 4;
      if (activeMood === "muss-weg" && recipe.tags.includes("muss weg")) weight += 4;
      if (activeMood === "guenstig" && recipe.tags.includes("günstig")) weight += 4;
      if (activeMood === "satt" && recipe.tags.includes("sättigend")) weight += 4;
      if (activeMood === "verwoehn" && (recipe.tags.includes("soulfood") || recipe.tags.includes("cremig"))) weight += 4;

      if (daytimeMode === "morgen" && recipe.tags.includes("frühstück")) weight += 5;
      if (daytimeMode === "mittag" && recipe.tags.includes("schnell")) weight += 2;
      if (daytimeMode === "abend" && recipe.tags.includes("sättigend")) weight += 2;
      if (daytimeMode === "nacht" && recipe.tags.includes("schnell")) weight += 4;
      if (daytimeMode === "nacht" && recipe.tags.includes("ofen")) weight -= 4;

      return { recipe, weight, random: Math.random() };
    })
    .sort((a, b) => {
      if (b.weight !== a.weight) return b.weight - a.weight;
      return a.random - b.random;
    })
    .map((item) => item.recipe);
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

function decideRecipe(useNext = false) {
  if (!decisionResult) return;

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
  const daytime = getDaytimeSettings();

  if (mode === "random") {
    return `Du hast noch nichts eingetragen. Also würfle ich dir passend zu „${mood.label}“ und ${daytime.label} eine solide Idee aus. Einkaufen müsstest du dafür wahrscheinlich kurz.`;
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
      <div class="decision-picked-top">
        <p class="decision-kicker">Küchenkumpel entscheidet heute:</p>
        ${createFavoriteButton(recipe)}
      </div>

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

  const favoriteButton = decisionResult.querySelector("[data-toggle-favorite]");

  if (favoriteButton) {
    favoriteButton.addEventListener("click", () => {
      toggleFavorite(Number(favoriteButton.dataset.toggleFavorite));
    });
  }
}

function openRecipeModal(recipeId) {
  if (!recipeModal || !modalContent) return;

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
          src="${escapeHtml(recipe.image || "")}"
          alt="${escapeHtml(recipe.title)}"
          onerror="this.parentElement.classList.add('image-missing'); this.remove();"
        />
      </div>

      <div class="modal-title-area">
        <div class="modal-title-top">
          <span class="modal-category">${escapeHtml(recipe.category || "Rezept")}</span>
          ${createFavoriteButton(recipe)}
        </div>

        <h3>${escapeHtml(recipe.title)}</h3>
        <p class="recipe-saying">${escapeHtml(recipe.saying)}</p>
        <p class="modal-description">${escapeHtml(recipe.shortDescription || "")}</p>
      </div>
    </div>

    <div class="recipe-meta">
      <span class="meta-pill">Zeit · ${escapeHtml(recipe.time)}</span>
      <span class="meta-pill">Vorbereitung · ${escapeHtml(recipe.timePrep || "nach Gefühl")}</span>
      <span class="meta-pill">Kochen · ${escapeHtml(recipe.timeCook || "nach Gefühl")}</span>
      <span class="meta-pill">Abwasch · ${escapeHtml(recipe.dishes || "normal")}</span>
      <span class="meta-pill">Kosten · ${escapeHtml(recipe.cost || "normal")}</span>
      <span class="meta-pill">Sättigung · ${escapeHtml(recipe.filling)}</span>
      <span class="meta-pill">Gefühl · ${escapeHtml(recipe.feeling || "Alltag")}</span>
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

  if (decreaseButton) {
    decreaseButton.addEventListener("click", () => changeModalPortions(recipe, -1));
  }

  if (increaseButton) {
    increaseButton.addEventListener("click", () => changeModalPortions(recipe, 1));
  }

  const favoriteButton = modalContent.querySelector("[data-toggle-favorite]");

  if (favoriteButton) {
    favoriteButton.addEventListener("click", () => {
      toggleFavorite(Number(favoriteButton.dataset.toggleFavorite));
    });
  }
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
  if (recipeModal) {
    recipeModal.classList.add("hidden");
  }
}

function copyMissingIngredients(recipeId) {
  const recipe = recipes.find((item) => item.id === recipeId);
  if (!recipe) return;

  const selectedNames = getSelectedNames();
  const missing = recipe.main.filter((ingredient) => {
    return !selectedNames.some((selectedName) => isExactIngredientMatch(ingredient, selectedName));
  });

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
  renderFavorites();
  renderRecipeResults();
  attachRecipeActionEvents();
  updateActiveNavByScroll();
}

function initWelcomeScreen() {
  const shouldHideWelcome = localStorage.getItem(HIDE_WELCOME_KEY) === "true";

  if (shouldHideWelcome && welcomeScreen) {
    welcomeScreen.classList.add("hidden");
  }
}

function startApp() {
  if (rememberThemeCheckbox && rememberThemeCheckbox.checked) {
    localStorage.setItem(THEME_KEY, activeTheme);
  }

  if (hideWelcomeCheckbox && hideWelcomeCheckbox.checked) {
    localStorage.setItem(HIDE_WELCOME_KEY, "true");
  }

  if (welcomeScreen) {
    welcomeScreen.classList.add("hidden");
  }

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

  if (welcomeScreen) {
    welcomeScreen.classList.remove("hidden");
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setActiveNav(targetId) {
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.nav === targetId);
  });
}

function updateActiveNavByScroll() {
  let currentId = "moodSection";
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
  if (addIngredientButton) {
    addIngredientButton.addEventListener("click", () => {
      addIngredient(ingredientInput ? ingredientInput.value : "");
    });
  }

  if (ingredientInput) {
    ingredientInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        addIngredient(ingredientInput.value);
      }
    });
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setActiveFilter(button.dataset.filter || "all");
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

  if (noMoodButton) {
    noMoodButton.addEventListener("click", toggleNoMoodMode);
  }

  if (startAppButton) {
    startAppButton.addEventListener("click", startApp);
  }

  if (showWelcomeButton) {
    showWelcomeButton.addEventListener("click", showWelcomeAgain);
  }

  if (decideButton) {
    decideButton.addEventListener("click", () => {
      decideRecipe(false);
    });
  }

  if (decideAgainButton) {
    decideAgainButton.addEventListener("click", () => {
      decideRecipe(true);
    });
  }

  if (closeModalButton) {
    closeModalButton.addEventListener("click", closeRecipeModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", closeRecipeModal);
  }

  if (confirmUpdateFlyerButton) {
    confirmUpdateFlyerButton.addEventListener("click", () => {
      closeUpdateFlyer(true);
    });
  }

  if (showUpdateLaterButton) {
    showUpdateLaterButton.addEventListener("click", () => {
      closeUpdateFlyer(false);
    });
  }

  if (closeUpdateFlyerButton) {
    closeUpdateFlyerButton.addEventListener("click", () => {
      closeUpdateFlyer(false);
    });
  }

  if (updateFlyerBackdrop) {
    updateFlyerBackdrop.addEventListener("click", () => {
      closeUpdateFlyer(false);
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeRecipeModal();
      closeUpdateFlyer(false);
    }
  });
}

function initApp() {
  bindEvents();
  loadFavorites();
  initTheme();
  initMood();
  resetDecision(false);
  initWelcomeScreen();
  updateBuddyMessage();
  renderAll();
  initNav();
  initUpdateFlyer();

  if (!recipes.length) {
    updateBuddyTextOnly("Ich finde gerade keine Rezepte. Schau bitte, ob recipes.js vor app.js geladen wird.");
  }
}

initApp();