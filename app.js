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
const sectionMascot = document.getElementById("sectionMascot");
const ideaMascot = document.getElementById("ideaMascot");
const favoriteMascot = document.getElementById("favoriteMascot");
const favoritesListMascot = document.getElementById("favoritesListMascot");
const footerMascot = document.getElementById("footerMascot");
const dailyRecommendationMascot = document.getElementById("dailyRecommendationMascot");
const themeHeroText = document.getElementById("themeHeroText");

const moodOptionButtons = document.querySelectorAll("[data-mood]");
const moodDescription = document.getElementById("moodDescription");
const moodInsight = document.getElementById("moodInsight");

const ingredientInput = document.getElementById("ingredientInput");
const addIngredientButton = document.getElementById("addIngredientButton");
const quickIngredientsContainer = document.getElementById("quickIngredients");
const toggleMoreIngredientsButton = document.getElementById("toggleMoreIngredientsButton");
const selectedArea = document.getElementById("selectedArea");
const selectedIngredientsContainer = document.getElementById("selectedIngredients");
const findRecipesButton = document.getElementById("findRecipesButton");
const clearSelectedIngredientsButton = document.getElementById("clearSelectedIngredientsButton");

const buddyMessage = document.getElementById("buddyMessage");
const filterButtons = document.querySelectorAll(".filter-button");
const airfryerShortcutButton = document.getElementById("airfryerShortcutButton");

const dailyRecommendationSection = document.getElementById("dailyRecommendationSection");
const dailyRecommendationResult = document.getElementById("dailyRecommendationResult");
const dailyRecommendationButton = document.getElementById("dailyRecommendationButton");
const dailyRecommendationAgainButton = document.getElementById("dailyRecommendationAgainButton");

const topRecommendation = document.getElementById("topRecommendation");
const favoritePreviewSection = document.getElementById("favoritePreviewSection");
const favoritePreviewText = document.getElementById("favoritePreviewText");
const showFavoritesButton = document.getElementById("showFavoritesButton");
const favoritesSection = document.getElementById("favorites");
const favoriteResults = document.getElementById("favoriteResults");
const exportFavoritesButton = document.getElementById("exportFavoritesButton");
const clearFavoritesButton = document.getElementById("clearFavoritesButton");
const recentRecipesSection = document.getElementById("recentRecipes");
const recentRecipeResults = document.getElementById("recentRecipeResults");
const clearRecentButton = document.getElementById("clearRecentButton");
const appStatsGrid = document.getElementById("appStatsGrid");
const recipesSection = document.getElementById("recipes");
const recipeResults = document.getElementById("recipeResults");
const resultCounter = document.getElementById("resultCounter");
const toggleMoreRecipesButton = document.getElementById("toggleMoreRecipesButton");

const recipeSearchInput = document.getElementById("recipeSearchInput");
const clearRecipeSearchButton = document.getElementById("clearRecipeSearchButton");
const recipeSortSelect = document.getElementById("recipeSortSelect");
const homeActionButtons = document.querySelectorAll("[data-home-scroll]");
const homeSurpriseButton = document.getElementById("homeSurpriseButton");
const surpriseRecipeButton = document.getElementById("surpriseRecipeButton");
const noMoodButton = document.getElementById("noMoodButton");
const smartSuggestionsContainer = document.getElementById("smartSuggestions");

const pantryInput = document.getElementById("pantryInput");
const addPantryButton = document.getElementById("addPantryButton");
const pantryQuickButtons = document.querySelectorAll("[data-pantry-quick]");
const pantryItemsContainer = document.getElementById("pantryItems");
const clearPantryButton = document.getElementById("clearPantryButton");

const shoppingListSection = document.getElementById("shoppingList");
const shoppingListItemsContainer = document.getElementById("shoppingListItems");
const copyShoppingListButton = document.getElementById("copyShoppingListButton");
const clearShoppingListButton = document.getElementById("clearShoppingListButton");

const recipeModal = document.getElementById("recipeModal");
const modalBackdrop = document.getElementById("modalBackdrop");
const closeModalButton = document.getElementById("closeModalButton");
const modalContent = document.getElementById("modalContent");

const navLinks = document.querySelectorAll(".nav-link");
const navSections = [
  document.getElementById("start"),
  document.getElementById("favorites"),
  document.getElementById("recipes"),
  document.getElementById("about")
];

let selectedIngredients = [];
let favoriteRecipeIds = [];
let pantryItems = [];
let shoppingListItems = [];
let recentRecipeIds = [];
let recipeSearchTerm = "";
let activeSort = "smart";
let activeFilter = "all";
let currentModalRecipeId = null;
let cookingStepIndex = 0;
let recipeTimerInterval = null;
let recipeTimerRemainingSeconds = 0;
let activeTheme = "standard";
let activeMood = "normal";
let currentModalPortions = 2;
let dailyRecommendationIndex = 0;
let cachedDailyRecommendationPool = [];
let moreIngredientsVisible = false;
let moreRecipesVisible = false;
let ingredientSearchSubmitted = false;
let rescueModeActive = false;
let rescueRecipeIds = [];
let favoritesVisible = false;
let appStartLocked = false;

const THEME_KEY = "kuechenkumpelTheme";
const HIDE_WELCOME_KEY = "kuechenkumpelHideWelcome";
const MOOD_KEY = "kuechenkumpelMood";
const FAVORITES_KEY = "kuechenkumpelFavorites";
const PANTRY_KEY = "kuechenkumpelPantry";
const SHOPPING_LIST_KEY = "kuechenkumpelShoppingList";
const RECENT_RECIPES_KEY = "kuechenkumpelRecentRecipes";
const UPDATE_SEEN_KEY = "kuechenkumpelSeenUpdateVersion";

const mascotFiles = {
  welcome: "kochtopf-hallo.png",
  hero: "kochtopf-standard.png",
  mood: "kochtopf-hallo.png",
  section: "kochtopf-kochen.png",
  rescue: "kochtopf-kein-bock.png",
  idea: "kochtopf-idee.png",
  favorite: "kochtopf-idee.png",
  footer: "kochtopf-standard.png",
  buddy: "kochtopf-idee.png",
  daily: "kochtopf-idee.png"
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
  airfryer: {
    label: "Heißluft",
    icon: "🌪️",
    folder: "airfryer",
    heroText: "Heißluftmodus. Küchenkumpel schaut, was im Korb knusprig werden kann.",
    previewTitle: "Knusprig aus dem Korb",
    previewDescription: "Ninja im Blick, Küchenkumpel am Start und einfache Ideen für die Heißluftfritteuse."
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
    previewDescription: "Freundlich, weich und ein bisschen verspielt."
  },
  sommer: {
    label: "Sommer",
    icon: "🍋",
    folder: "sommer",
    heroText: "Schnell, frisch und bitte ohne Küchen-Marathon.",
    previewTitle: "Sonnig und leicht",
    previewDescription: "Frisch, entspannt und nicht zu schwer."
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
    previewDescription: "Dunkel, verspielt und trotzdem lecker."
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
    label: "Normal",
    description: "Such aus, wonach dir gerade ist. Ich passe die Vorschläge daran an.",
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
    label: "Schnell",
    description: "Ich schiebe schnelle Gerichte nach oben.",
    insight: "Zeitdruck erkannt. Alles mit kurzer Kochzeit wird stärker bevorzugt.",
    buddy: "Alles klar. Wir halten es kurz, lecker und ohne unnötige Topf-Konferenz.",
    mascot: "idea"
  },
  "muss-weg": {
    label: "Muss weg",
    description: "Markiere Zutaten mit der Uhr. Ich gebe Resten mehr Gewicht.",
    insight: "Reste-Retter aktiv. Muss-weg-Zutaten zählen jetzt stärker bei der Empfehlung.",
    buddy: "Sehr gut. Heute bekommen die Wackelkandidaten aus dem Kühlschrank ihren Auftritt.",
    mascot: "section"
  },
  guenstig: {
    label: "Günstig",
    description: "Ich bevorzuge einfache, günstige Rezepte.",
    insight: "Sparmodus aktiv. Günstige Gerichte werden jetzt nach oben geschoben.",
    buddy: "Konto schonen, Bauch trotzdem glücklich machen. Kriegen wir hin.",
    mascot: "idea"
  },
  satt: {
    label: "Satt",
    description: "Ich suche dir eher sättigende und herzhafte Gerichte.",
    insight: "Hunger ernst genommen. Sättigende Rezepte bekommen extra Rückenwind.",
    buddy: "Alles klar. Heute kein Deko-Teller. Heute soll das ordentlich satt machen.",
    mascot: "section"
  },
  verwoehn: {
    label: "Verwöhnen",
    description: "Ich gewichte cremige und gemütliche Rezepte stärker.",
    insight: "Verwöhnmodus aktiv. Soulfood, cremige Ideen und gemütliche Teller dürfen nach vorne.",
    buddy: "Oh, heute darf es also ein bisschen geiler sein. Gefällt mir.",
    mascot: "idea"
  }
};

const daytimeSettings = {
  morgen: {
    label: "Morgenmodus",
    heroText: "Guten Morgen. Frühstück, Resteküche oder direkt Kühlschrank-Notfall?",
    buddy: "Guten Morgen. Wir starten langsam, aber mit Plan."
  },
  mittag: {
    label: "Mittagsmodus",
    heroText: "Mittagshunger erkannt. Wir halten es sinnvoll und nicht unnötig kompliziert.",
    buddy: "Mittagshunger erkannt. Ich suche dir etwas, das satt macht und nicht den halben Tag klaut."
  },
  nachmittag: {
    label: "Nachmittagsmodus",
    heroText: "Kleiner Hunger oder schon Abendessen planen? Ich schau mal, was geht.",
    buddy: "Nachmittagsküche. Mal sehen, was der Kühlschrank sagt."
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
  { name: "öl", label: "🫒 Öl" },
  { name: "heißluftfritteuse", label: "🌪️ Heißluftfritteuse" }
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

  if (updateFlyerBadge) updateFlyerBadge.textContent = updateContent.badge || "UPDATE";
  if (updateFlyerTitle) updateFlyerTitle.textContent = updateContent.title || "Neu bei Küchenkumpel";
  if (updateFlyerSubtitle) updateFlyerSubtitle.textContent = updateContent.subtitle || "";

  if (updateFlyerImage) {
    updateFlyerImage.src =
      updateContent.image ||
      updateContent.mascot ||
      "assets/images/themes/standard/kochtopf-hallo.png";

    updateFlyerImage.alt =
      updateContent.imageAlt ||
      updateContent.mascotAlt ||
      "Küchenkumpel winkt freundlich";
  }

  if (updateFlyerFooterText) {
    updateFlyerFooterText.textContent = updateContent.footerText || "Schön, dass du wieder da bist.";
  }

  if (updateFlyerFooterHighlight) {
    updateFlyerFooterHighlight.textContent = updateContent.footerHighlight || "Viel Spaß beim Loskochen!";
  }

  if (confirmUpdateFlyerButton) {
    confirmUpdateFlyerButton.textContent = updateContent.buttonText || "Weiter";
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
    setTimeout(() => openUpdateFlyer(), 450);
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

function getSeasonMode() {
  const month = new Date().getMonth() + 1;

  if (month >= 3 && month <= 5) return "fruehling";
  if (month >= 6 && month <= 8) return "sommer";
  if (month >= 9 && month <= 11) return "herbst";

  return "winter";
}

function getSeasonLabel(season) {
  const labels = {
    fruehling: "Frühling",
    sommer: "Sommer",
    herbst: "Herbst",
    winter: "Winter"
  };

  return labels[season] || "Saison";
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
  if (["suesskartoffel", "suesskartoffeln"].includes(text)) return "süßkartoffeln";
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

  if (["heissluftfritteuse", "heißluftfritteuse", "airfryer", "air fryer", "ninja"].includes(text)) return "heißluftfritteuse";

  if (["hack", "hackfleisch"].includes(text)) return "hackfleisch";
  if (["haehnchen", "hähnchen", "huhn", "chicken"].includes(text)) return "hähnchen";
  if (["bohne", "bohnen"].includes(text)) return "bohnen";
  if (["linse", "linsen"].includes(text)) return "linsen";
  if (["oel", "öl"].includes(text)) return "öl";
  if (["bruehe", "brühe", "gemuesebruehe", "gemüsebrühe"].includes(text)) return "brühe";

  return text;
}

function textContainsEgg(value) {
  const text = normalizeSearchValue(value);
  return /(^|\s)(ei|eier|eiern|eiweiss)(?=\s|$)/.test(text);
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
    süßkartoffeln: "Süßkartoffeln",
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
    lachs: "Lachs",
    garnelen: "Garnelen",
    feta: "Feta",
    mozzarella: "Mozzarella",
    gurke: "Gurke",
    kichererbsen: "Kichererbsen",
    bohnen: "Bohnen",
    mais: "Mais",
    linsen: "Linsen",
    haferflocken: "Haferflocken",
    mehl: "Mehl",
    brühe: "Brühe",
    öl: "Öl",
    knoblauch: "Knoblauch",
    heißluftfritteuse: "Heißluftfritteuse"
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
  const text = normalizeSearchValue(value);

  if (!text) return "";

  if (
    text.includes("heissluft") ||
    text.includes("airfryer") ||
    text.includes("air fryer") ||
    text.includes("ninja")
  ) {
    return "heißluftfritteuse";
  }

  if (text.includes("nudel") || text.includes("spaghetti") || text.includes("pasta") || text.includes("makkaroni")) return "nudeln";
  if (text.includes("reis")) return "reis";
  if (text.includes("suesskartoffel")) return "süßkartoffeln";
  if (text.includes("kartoffel")) return "kartoffeln";

  if (text.includes("passierte tomate") || text.includes("tomatensosse")) return "passierte tomaten";
  if (text.includes("dosentomate") || text.includes("dosen tomate")) return "dosentomaten";
  if (text.includes("tomate")) return "tomaten";

  if (text.includes("frischkaese")) return "frischkäse";
  if (text.includes("kokosmilch")) return "kokosmilch";
  if (text.includes("kaese")) return "käse";
  if (text.includes("feta")) return "feta";
  if (text.includes("mozzarella")) return "mozzarella";
  if (text.includes("schmand")) return "schmand";
  if (text.includes("quark")) return "quark";
  if (text.includes("joghurt")) return "joghurt";
  if (text.includes("sahne")) return "sahne";
  if (text.includes("milch")) return "milch";

  if (textContainsEgg(text)) return "eier";

  if (text.includes("hack")) return "hackfleisch";
  if (text.includes("haehnchen") || text.includes("huhn") || text.includes("chicken")) return "hähnchen";
  if (text.includes("thunfisch")) return "thunfisch";
  if (text.includes("lachs")) return "lachs";
  if (text.includes("garnele")) return "garnelen";

  if (text.includes("bohne")) return "bohnen";
  if (text.includes("linse")) return "linsen";
  if (text.includes("kichererbse")) return "kichererbsen";
  if (text.includes("mais")) return "mais";

  if (text.includes("gemuesebruehe") || text.includes("bruehe")) return "brühe";
  if (text.includes("tk gemuese") || text.includes("tiefkuehlgemuese")) return "tk-gemüse";
  if (text.includes("paprika")) return "paprika";
  if (text.includes("zucchini")) return "zucchini";
  if (text.includes("moehre") || text.includes("karotte")) return "möhren";
  if (text.includes("brokkoli")) return "brokkoli";
  if (text.includes("pilz") || text.includes("champignon")) return "pilze";
  if (text.includes("spinat")) return "spinat";
  if (text.includes("gurke")) return "gurke";
  if (text.includes("gemuese")) return "gemüse";

  if (text.includes("broetchen")) return "brötchen";
  if (text.includes("baguette")) return "baguette";
  if (text.includes("toast")) return "toast";
  if (text.includes("brot")) return "brot";

  if (text.includes("zwiebel")) return "zwiebel";
  if (text.includes("knoblauch")) return "knoblauch";
  if (text.includes("hafer")) return "haferflocken";
  if (text.includes("mehl")) return "mehl";
  if (text.includes("oel")) return "öl";

  return "";
}

function buildTags(recipe) {
  const tags = [];

  const addTag = (value) => {
    const tag = normalize(value);

    if (tag && !tags.includes(tag)) {
      tags.push(tag);
    }
  };

  (recipe.tags || []).forEach(addTag);
  (recipe.categories || []).forEach(addTag);
  (recipe.deviceTags || []).forEach(addTag);

  const fullText = normalizeSearchValue(
    [
      recipe.name,
      recipe.category,
      ...(recipe.categories || []),
      ...(recipe.deviceTags || []),
      ...(recipe.tags || []),
      recipe.slogan,
      recipe.shortDescription,
      recipe.feeling,
      recipe.satiety,
      recipe.timeTotal,
      recipe.timePrep,
      recipe.timeCook,
      recipe.difficulty,
      recipe.cost,
      recipe.dishes,
      recipe.airfryerTemperature,
      recipe.airfryerTime
    ].join(" ")
  );

  if (recipe.cost === "günstig" || fullText.includes("guenstig")) addTag("günstig");
  if (recipe.dishes === "wenig") addTag("wenig abwasch");
  if (fullText.includes("kein bock")) addTag("kein bock");
  if (fullText.includes("rest") || fullText.includes("muss weg")) addTag("muss weg");
  if (fullText.includes("vorrat")) addTag("vorrat");
  if (fullText.includes("satt")) addTag("sättigend");
  if (fullText.includes("protein")) addTag("proteinreich");
  if (fullText.includes("soulfood") || fullText.includes("cremig")) addTag("soulfood");
  if (fullText.includes("cremig")) addTag("cremig");
  if (fullText.includes("ofen") || fullText.includes("auflauf")) addTag("ofen");
  if (fullText.includes("herzhaft")) addTag("herzhaft");
  if (fullText.includes("fruehstueck") || fullText.includes("frühstück")) addTag("frühstück");

  if (
    fullText.includes("10 minuten") ||
    fullText.includes("12 minuten") ||
    fullText.includes("15 minuten") ||
    fullText.includes("18 minuten") ||
    fullText.includes("20 minuten") ||
    fullText.includes("airfryer") ||
    fullText.includes("heissluftfritteuse")
  ) {
    addTag("schnell");
  }

  if (
    fullText.includes("heissluftfritteuse") ||
    fullText.includes("airfryer") ||
    fullText.includes("air fryer") ||
    fullText.includes("ninja")
  ) {
    addTag("heissluftfritteuse");
    addTag("airfryer");
    addTag("ninja");
  }

  const meatWords = ["hack", "haehnchen", "chicken", "schinken", "speck", "wurst", "thunfisch", "fleisch", "lachs", "garnelen", "fisch"];
  const isMeat = meatWords.some((word) => fullText.includes(word));

  if (!isMeat) {
    addTag("vegetarisch");
  }

  return tags;
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

function createRecipeSlug(value) {
  return normalizeSearchValue(value)
    .replaceAll(" ", "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function buildRecipes() {
  return getRecipeSource().map((recipe) => {
    const slug = recipe.slug || createRecipeSlug(recipe.name || recipe.title || `rezept-${recipe.id}`);

    return {
      ...recipe,
      slug,
      title: recipe.name,
      imageAlt: recipe.imageAlt || recipe.name || "Küchenkumpel Rezeptbild",
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

let recipes = [];

function refreshRecipes() {
  recipes = buildRecipes();
  return recipes;
}

refreshRecipes();

function getMascotFileName(mascotKey, extension = "png") {
  const fileName = mascotFiles[mascotKey] || mascotFiles.hero;

  return fileName.replace(/\.[a-z0-9]+$/i, `.${extension}`);
}

function getThemeMascotPath(themeName, mascotKey, extension = "png") {
  const settings = themeSettings[themeName] || themeSettings.standard;
  const fileName = getMascotFileName(mascotKey, extension);

  return `assets/images/themes/${settings.folder}/${fileName}`;
}

function getStandardMascotPath(mascotKey, extension = "png") {
  const fileName = getMascotFileName(mascotKey, extension);

  return `assets/images/themes/standard/${fileName}`;
}

function getLegacyMascotPath(mascotKey) {
  const fileName = getMascotFileName(mascotKey, "png");

  return `assets/images/${fileName}`;
}

function createMascotPathCandidates(themeName, mascotKey) {
  const candidates = [
    getThemeMascotPath(themeName, mascotKey, "webp"),
    getThemeMascotPath(themeName, mascotKey, "png"),
    getStandardMascotPath(mascotKey, "webp"),
    getStandardMascotPath(mascotKey, "png"),
    getLegacyMascotPath(mascotKey)
  ];

  return candidates.filter((path, index) => path && candidates.indexOf(path) === index);
}


function getAssetVersion() {
  const version = window.KUECHENKUMPEL_VERSION || {};
  const update = window.KUECHENKUMPEL_UPDATE || {};

  return version.images || version.recipes || update.version || "1";
}

function addAssetVersion(path) {
  if (!path) return "";

  if (path.startsWith("data:") || path.includes("?v=")) {
    return path;
  }

  const separator = path.includes("?") ? "&" : "?";
  return `${path}${separator}v=${encodeURIComponent(getAssetVersion())}`;
}

function getRecipeImagePath(recipe) {
  if (!recipe) return "";

  if (recipe.slug) {
    return addAssetVersion(`assets/images/recipes/${recipe.slug}.jpg`);
  }

  if (recipe.image) {
    return addAssetVersion(recipe.image);
  }

  return "";
}

function getRecipeFallbackImagePath(recipe) {
  const tags = recipe && Array.isArray(recipe.tags) ? recipe.tags : [];

  if (tags.includes("heissluftfritteuse") || tags.includes("airfryer")) {
    return addAssetVersion("assets/images/recipe-fallbacks/heissluftfritteuse.png");
  }

  return addAssetVersion("assets/images/recipe-fallbacks/default.png");
}

function handleRecipeImageError(imageElement) {
  if (!imageElement) return;

  const fallbackPath = imageElement.dataset ? imageElement.dataset.fallback : "";

  if (fallbackPath && imageElement.dataset.fallbackTried !== "true") {
    imageElement.dataset.fallbackTried = "true";
    imageElement.src = fallbackPath;
    return;
  }

  if (imageElement.parentElement) {
    imageElement.parentElement.classList.add("recipe-card-image-fallback", "image-missing");
    imageElement.parentElement.innerHTML = "<span>🥘</span>";
  }
}

window.handleRecipeImageError = handleRecipeImageError;

function setMascotImage(imageElement, mascotKey) {
  if (!imageElement) return;

  const paths = createMascotPathCandidates(activeTheme, mascotKey).map(addAssetVersion);
  let pathIndex = 0;

  imageElement.onerror = () => {
    pathIndex += 1;

    if (pathIndex >= paths.length) {
      imageElement.onerror = null;
      return;
    }

    imageElement.src = paths[pathIndex];
  };

  imageElement.src = paths[pathIndex] || "";
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
  setMascotImage(sectionMascot, "section");
  setMascotImage(ideaMascot, "idea");
  setMascotImage(favoriteMascot, "favorite");
  setMascotImage(favoritesListMascot, "favorite");
  setMascotImage(footerMascot, "footer");
  setMascotImage(dailyRecommendationMascot, "daily");

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

function exportFavorites() {
  const favoriteRecipes = favoriteRecipeIds
    .map((id) => recipes.find((recipe) => recipe.id === id))
    .filter(Boolean);

  if (favoriteRecipes.length === 0) {
    updateBuddyTextOnly("Du hast noch keine Favoriten gespeichert.");
    return;
  }

  const text = favoriteRecipes
    .map((recipe) => `• ${recipe.title} · ${recipe.time}`)
    .join("\n");

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(text)
      .then(() => updateBuddyTextOnly("Favoriten kopiert. Gute Liste."))
      .catch(() => updateBuddyTextOnly("Kopieren hat leider nicht geklappt."));
  } else {
    updateBuddyTextOnly("Kopieren wird in diesem Browser nicht unterstützt.");
  }
}

function clearFavorites() {
  favoriteRecipeIds = [];
  saveFavorites();
  favoritesVisible = false;
  updateBuddyTextOnly("Favoriten geleert.");
  renderAll();
}

function loadRecentRecipes() {
  try {
    const savedRecent = JSON.parse(localStorage.getItem(RECENT_RECIPES_KEY) || "[]");

    if (Array.isArray(savedRecent)) {
      recentRecipeIds = savedRecent
        .map(Number)
        .filter(Boolean)
        .filter((id, index, list) => list.indexOf(id) === index)
        .slice(0, 8);
    }
  } catch {
    recentRecipeIds = [];
  }
}

function saveRecentRecipes() {
  localStorage.setItem(RECENT_RECIPES_KEY, JSON.stringify(recentRecipeIds));
}

function addRecentRecipe(recipeId) {
  recentRecipeIds = [
    recipeId,
    ...recentRecipeIds.filter((id) => id !== recipeId)
  ].slice(0, 8);

  saveRecentRecipes();
}

function clearRecentRecipes() {
  recentRecipeIds = [];
  saveRecentRecipes();
  renderAll();
  updateBuddyTextOnly("Verlauf geleert.");
}

function renderRecentRecipes() {
  if (!recentRecipesSection || !recentRecipeResults) return;

  const recentRecipes = recentRecipeIds
    .map((id) => recipes.find((recipe) => recipe.id === id))
    .filter(Boolean);

  recentRecipesSection.classList.toggle("hidden", recentRecipes.length === 0);

  if (recentRecipes.length === 0) {
    recentRecipeResults.innerHTML = "";
    return;
  }

  recentRecipeResults.innerHTML = recentRecipes
    .map((recipe) => createRecipeCard(createFavoriteMatch(recipe), false))
    .join("");
}


function loadPantry() {
  try {
    const savedPantry = JSON.parse(localStorage.getItem(PANTRY_KEY) || "[]");

    if (Array.isArray(savedPantry)) {
      pantryItems = savedPantry
        .map((item) => canonicalIngredient(item))
        .filter(Boolean)
        .filter((item, index, list) => list.indexOf(item) === index);
    }
  } catch {
    pantryItems = [];
  }
}

function savePantry() {
  localStorage.setItem(PANTRY_KEY, JSON.stringify(pantryItems));
}

function pantryItemExists(name) {
  const normalizedName = canonicalIngredient(name);
  return pantryItems.includes(normalizedName);
}

function addPantryItem(name) {
  const normalizedName = canonicalIngredient(name);

  if (!normalizedName || pantryItemExists(normalizedName)) {
    if (pantryInput) pantryInput.value = "";
    return;
  }

  pantryItems.push(normalizedName);
  savePantry();

  if (pantryInput) pantryInput.value = "";

  moreRecipesVisible = false;
  cachedDailyRecommendationPool = [];
  dailyRecommendationIndex = 0;

  updateBuddyTextOnly(`${displayIngredientName(normalizedName)} ist jetzt in deiner Vorratskammer.`);
  renderAll();
}

function removePantryItem(name) {
  const normalizedName = canonicalIngredient(name);
  pantryItems = pantryItems.filter((item) => item !== normalizedName);
  savePantry();

  cachedDailyRecommendationPool = [];
  dailyRecommendationIndex = 0;

  renderAll();
}

function clearPantry() {
  pantryItems = [];
  savePantry();

  cachedDailyRecommendationPool = [];
  dailyRecommendationIndex = 0;

  updateBuddyTextOnly("Vorratskammer geleert. Wir rechnen wieder nur mit den aktuellen Zutaten.");
  renderAll();
}

function renderPantryItems() {
  if (!pantryItemsContainer) return;

  if (pantryItems.length === 0) {
    pantryItemsContainer.innerHTML = `
      <div class="empty-mini-state">
        Noch nichts gespeichert. Tipp oben ein paar Standardzutaten an.
      </div>
    `;
  } else {
    pantryItemsContainer.innerHTML = pantryItems
      .map((item) => {
        return `
          <div class="ingredient-chip pantry-chip">
            <span>${escapeHtml(displayIngredientName(item))}</span>

            <button
              class="chip-button"
              type="button"
              title="Aus Vorratskammer entfernen"
              aria-label="${escapeHtml(displayIngredientName(item))} aus Vorratskammer entfernen"
              data-remove-pantry="${escapeHtml(item)}"
            >×</button>
          </div>
        `;
      })
      .join("");
  }

  if (clearPantryButton) {
    clearPantryButton.disabled = pantryItems.length === 0;
  }

  document.querySelectorAll("[data-remove-pantry]").forEach((button) => {
    button.addEventListener("click", () => removePantryItem(button.dataset.removePantry || ""));
  });
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
    updateBuddyTextOnly("Gute Wahl. Das Rezept darf bleiben.");
  }

  saveFavorites();
  renderAll();

  if (recipeModal && !recipeModal.classList.contains("hidden")) {
    const recipe = recipes.find((item) => item.id === id);

    if (recipe) renderRecipeModal(recipe);
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

  cachedDailyRecommendationPool = [];
  dailyRecommendationIndex = 0;

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

function resetIngredientSearch() {
  ingredientSearchSubmitted = false;
  rescueModeActive = false;
  rescueRecipeIds = [];
  moreRecipesVisible = false;
  cachedDailyRecommendationPool = [];
  dailyRecommendationIndex = 0;
}

function preserveViewport(renderCallback) {
  const scrollLeft = window.scrollX;
  const scrollTop = window.scrollY;

  renderCallback();

  const restore = () => {
    window.scrollTo({ left: scrollLeft, top: scrollTop, behavior: "auto" });
  };

  restore();
  requestAnimationFrame(() => {
    restore();
    requestAnimationFrame(restore);
  });
  setTimeout(restore, 120);
}

function renderIngredientSelectionState(message = "") {
  preserveViewport(() => {
    renderQuickIngredients();
    renderSelectedIngredients();
    renderSmartSuggestions();
    renderRecommendations();
    renderRecipeResults();
    attachRecipeActionEvents();

    if (message) {
      updateBuddyTextOnly(message);
    }
  });
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

  resetIngredientSearch();
  renderIngredientSelectionState();
}

function removeIngredient(name) {
  selectedIngredients = selectedIngredients.filter((ingredient) => ingredient.name !== name);

  resetIngredientSearch();
  renderIngredientSelectionState();
}

function clearSelectedIngredients() {
  selectedIngredients = [];

  resetIngredientSearch();
  renderIngredientSelectionState("Alles klar, Auswahl geleert. Wir fangen wieder frisch an.");
}

function submitIngredientSearch() {
  const selectedNames = getExplicitSelectedNames();

  if (selectedNames.length === 0) {
    updateBuddyTextOnly("Gib mir erst eine Zutat, dann kann ich sinnvoll loslegen.");
    return;
  }

  ingredientSearchSubmitted = true;
  rescueModeActive = false;
  rescueRecipeIds = [];
  moreRecipesVisible = true;
  cachedDailyRecommendationPool = [];
  dailyRecommendationIndex = 0;

  updateBuddyTextOnly(`Ich suche jetzt passend zu ${formatList(selectedNames)}.`);
  renderAll();

  if (topRecommendation) {
    setTimeout(() => {
      topRecommendation.closest("section")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }
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

  resetIngredientSearch();
  renderIngredientSelectionState();
}

function getExplicitSelectedNames() {
  const names = selectedIngredients.map((ingredient) => ingredient.name);

  return names.filter((name, index, list) => list.indexOf(name) === index);
}

function getSelectedNames() {
  const names = [
    ...getExplicitSelectedNames(),
    ...pantryItems
  ];

  return names.filter((name, index, list) => list.indexOf(name) === index);
}

function hasPendingIngredientSelection() {
  return getExplicitSelectedNames().length > 0 && !ingredientSearchSubmitted;
}

function hasSubmittedIngredientSearch() {
  return getExplicitSelectedNames().length > 0 && ingredientSearchSubmitted;
}

function getUrgentNames() {
  return selectedIngredients
    .filter((ingredient) => ingredient.urgent)
    .map((ingredient) => ingredient.name);
}

function isExactIngredientMatch(recipeIngredient, selectedIngredient) {
  const recipeValue = canonicalIngredient(recipeIngredient);
  const selectedValue = canonicalIngredient(selectedIngredient);

  if (!recipeValue || !selectedValue) return false;
  if (recipeValue === selectedValue) return true;

  const selectedIngredientAliases = {
    gemüse: ["tk-gemüse", "paprika", "zucchini", "möhren", "brokkoli", "pilze", "spinat"],
    "tk-gemüse": ["gemüse"],
    brot: ["toast", "brötchen", "baguette"],
    brühe: ["gemüsebrühe"]
  };

  return (selectedIngredientAliases[selectedValue] || []).includes(recipeValue);
}

function getRecipeIngredientNames(recipe) {
  const names = [
    ...(recipe.main || []),
    ...(recipe.optional || []),
    ...((recipe.ingredients || []).map((ingredient) => simplifyIngredientName(ingredient.name) || ingredient.name))
  ].map(canonicalIngredient).filter(Boolean);

  return names.filter((name, index, list) => list.indexOf(name) === index);
}

function recipeMatchesSubmittedIngredients(recipe) {
  const selectedNames = getExplicitSelectedNames();

  if (selectedNames.length === 0) return true;

  const wantsAirfryer = selectedNames.includes("heißluftfritteuse");
  const selectedIngredientNames = selectedNames.filter((name) => name !== "heißluftfritteuse");
  const recipeIngredients = getRecipeIngredientNames(recipe);
  const recipeTags = recipe.tags || [];

  const matchesDevice = !wantsAirfryer || recipeTags.includes("heissluftfritteuse") || recipeTags.includes("airfryer");
  const matchesIngredient = selectedIngredientNames.length === 0
    ? true
    : selectedIngredientNames.every((selectedName) => {
        return recipeIngredients.some((ingredientName) => isExactIngredientMatch(ingredientName, selectedName));
      });

  return matchesDevice && matchesIngredient;
}

function scoreRecipe(recipe) {
  const selectedNames = getSelectedNames();
  const urgentNames = getUrgentNames();
  const wantsAirfryer = selectedNames.includes("heißluftfritteuse");

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
    if (recipe.main.some((ingredient) => isExactIngredientMatch(ingredient, urgentName))) score += 8;
    if (recipe.optional.some((ingredient) => isExactIngredientMatch(ingredient, urgentName))) score += 3;
  });

  if (wantsAirfryer) {
    if (recipe.tags.includes("heissluftfritteuse") || recipe.tags.includes("airfryer")) score += 18;
    else score -= 8;
  }

  if (activeMood === "kein-bock") {
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

  if (activeMood === "muss-weg" && recipe.tags.includes("muss weg")) score += 7;
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
    if (recipe.tags.includes(activeFilter)) score += 5;
    else score -= 6;
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


function hasRecipeSearch() {
  return normalize(recipeSearchTerm).length > 0;
}

function hasBrowseCriteria() {
  return activeFilter !== "all" || hasRecipeSearch();
}

function getActiveFilterLabel() {
  const activeButton = Array.from(filterButtons).find((button) => button.dataset.filter === activeFilter);
  return activeButton ? activeButton.textContent.trim() : activeFilter;
}

function recipeMatchesActiveFilter(recipe) {
  if (activeFilter === "all") return true;

  const tags = recipe.tags || [];
  const normalizedFilter = normalize(activeFilter);

  return tags.some((tag) => normalize(tag) === normalizedFilter);
}

function recipeMatchesSearch(recipe) {
  const search = normalize(recipeSearchTerm);

  if (!search) return true;

  return getRecipeSearchText(recipe).includes(search);
}

function createBrowseMatch(recipe) {
  return {
    recipe,
    matchingMain: [],
    substituteMain: [],
    missingMain: recipe.main || [],
    matchingOptional: [],
    score: scoreBrowseRecipe(recipe)
  };
}

function scoreBrowseRecipe(recipe) {
  let score = 0;
  const tags = recipe.tags || [];
  const text = getRecipeSearchText(recipe);

  if (recipeMatchesActiveFilter(recipe)) score += 20;
  if (hasRecipeSearch() && text.includes(normalize(recipeSearchTerm))) score += 18;
  if (tags.includes("schnell")) score += 4;
  if (recipe.dishes === "wenig") score += 3;
  if (recipe.cost === "günstig") score += 2;
  if (tags.includes("zu heiß zum kochen")) score += 2;

  return score;
}

function getRecipeMinutes(recipe) {
  const values = [
    recipe.timeTotal,
    recipe.timePrep,
    recipe.timeCook,
    recipe.airfryerTime
  ];

  for (const value of values) {
    const match = String(value || "").match(/(\d+)/);

    if (match) {
      return Number(match[1]);
    }
  }

  return 999;
}

function getDishScore(recipe) {
  if (recipe.dishes === "wenig") return 1;
  if (recipe.dishes === "mittel") return 2;
  return 3;
}

function getCostScore(recipe) {
  if (recipe.cost === "günstig") return 1;
  if (recipe.cost === "normal") return 2;
  return 3;
}

function getFillingScore(recipe) {
  const text = normalizeSearchValue([recipe.satiety, recipe.feeling, ...(recipe.tags || [])].join(" "));

  if (text.includes("richtig deftig") || text.includes("macht satt") || text.includes("sättigend")) return 3;
  if (text.includes("leicht bis satt")) return 2;
  return 1;
}

function getLightScore(recipe) {
  const text = normalizeSearchValue([recipe.category, recipe.feeling, recipe.satiety, ...(recipe.tags || [])].join(" "));

  let score = 0;
  if (text.includes("frisch")) score += 3;
  if (text.includes("leicht")) score += 3;
  if (text.includes("sommer")) score += 2;
  if (text.includes("zu heiss zum kochen") || text.includes("zu heiß zum kochen")) score += 2;
  if (text.includes("soulfood") || text.includes("deftig")) score -= 2;

  return score;
}

function sortMatches(matches) {
  const list = [...matches];

  if (activeSort === "fast") {
    return list.sort((a, b) => getRecipeMinutes(a.recipe) - getRecipeMinutes(b.recipe) || b.score - a.score);
  }

  if (activeSort === "few-dishes") {
    return list.sort((a, b) => getDishScore(a.recipe) - getDishScore(b.recipe) || b.score - a.score);
  }

  if (activeSort === "cheap") {
    return list.sort((a, b) => getCostScore(a.recipe) - getCostScore(b.recipe) || b.score - a.score);
  }

  if (activeSort === "light") {
    return list.sort((a, b) => getLightScore(b.recipe) - getLightScore(a.recipe) || b.score - a.score);
  }

  if (activeSort === "filling") {
    return list.sort((a, b) => getFillingScore(b.recipe) - getFillingScore(a.recipe) || b.score - a.score);
  }

  return list.sort((a, b) => b.score - a.score || (a.recipe.id || 0) - (b.recipe.id || 0));
}

function getBrowseMatches() {
  return sortMatches(
    recipes
      .filter(recipeMatchesActiveFilter)
      .filter(recipeMatchesSearch)
      .map(createBrowseMatch)
  );
}

function getMatches() {
  const hasIngredientContext = hasSubmittedIngredientSearch();

  if (hasPendingIngredientSelection()) return [];
  if (!hasIngredientContext && !hasBrowseCriteria()) return [];

  if (!hasIngredientContext) {
    return getBrowseMatches();
  }

  return sortMatches(
    recipes
      .filter(recipeMatchesSubmittedIngredients)
      .map(scoreRecipe)
      .filter((item) => recipeMatchesActiveFilter(item.recipe))
      .filter((item) => recipeMatchesSearch(item.recipe))
  );
}

function createRescueMatch(recipe, index) {
  return {
    recipe,
    matchingMain: [],
    substituteMain: [],
    missingMain: [],
    matchingOptional: [],
    score: 0,
    context: "rescue",
    rescueIndex: index
  };
}

function getRescueMatches() {
  return rescueRecipeIds
    .map((id, index) => {
      const recipe = recipes.find((item) => item.id === id);
      return recipe ? createRescueMatch(recipe, index) : null;
    })
    .filter(Boolean);
}

function pickRandomRescueRecipes(count = 3) {
  const previousIds = new Set(rescueRecipeIds);
  let pool = recipes.filter((recipe) => !previousIds.has(recipe.id));

  if (pool.length < count) {
    pool = [...recipes];
  }

  for (let index = pool.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [pool[index], pool[randomIndex]] = [pool[randomIndex], pool[index]];
  }

  return pool.slice(0, Math.min(count, pool.length));
}

function rescueDinner() {
  const pickedRecipes = pickRandomRescueRecipes(3);

  if (pickedRecipes.length === 0) {
    updateBuddyTextOnly("Ich finde gerade keine Rezepte zum Retten.");
    return;
  }

  rescueRecipeIds = pickedRecipes.map((recipe) => recipe.id);
  rescueModeActive = true;
  ingredientSearchSubmitted = false;
  moreRecipesVisible = true;
  cachedDailyRecommendationPool = [];
  dailyRecommendationIndex = 0;

  renderRecommendations();
  renderRecipeResults();
  attachRecipeActionEvents();

  updateBuddyTextOnly("Abendessen gerettet. Ich habe dir drei zufällige Ideen gezogen.");

  if (topRecommendation) {
    setTimeout(() => {
      topRecommendation.closest("section")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }
}

function getBuddyMascotPath() {
  return addAssetVersion(getThemeMascotPath(activeTheme, "buddy", "webp"));
}

function getBuddyMascotFallbackPath() {
  return addAssetVersion(getThemeMascotPath(activeTheme, "buddy", "png"));
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

  let message = activeMood === "normal" ? daytime.buddy : mood.buddy;

  if (urgentNames.length > 0) {
    message = `Alles klar. ${formatList(urgentNames)} hat nicht mehr ewig Zeit. Geben wir dem Zeug heute noch einen würdigen Auftritt.`;
  } else if (selectedIngredients.length === 1) {
    message = "Eine Zutat ist mutig. Nicht gut, aber mutig.";
  } else if (selectedIngredients.length === 2) {
    message = "Das ist noch sportlich wenig, aber wir kriegen was hin.";
  } else if (selectedIngredients.length >= 3 && activeMood === "normal") {
    message = "Damit kann man arbeiten.";
  }

  updateBuddyTextOnly(message);
}


function getSmartIngredientSuggestions() {
  const selectedNames = getSelectedNames();

  if (selectedNames.length >= 4) return [];

  const baseSuggestions = ["eier", "brot", "käse", "joghurt", "reis", "nudeln", "kartoffeln", "gurke", "tomaten", "feta"];
  const matches = recipes
    .map(scoreRecipe)
    .filter((item) => item.score > -8)
    .sort((a, b) => b.score - a.score)
    .slice(0, 16);

  const counts = new Map();

  matches.forEach((match) => {
    (match.missingMain || []).forEach((ingredient) => {
      const name = canonicalIngredient(ingredient);

      if (!name || selectedNames.includes(name)) return;

      counts.set(name, (counts.get(name) || 0) + 1);
    });
  });

  const ranked = Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([name]) => name);

  return [...ranked, ...baseSuggestions]
    .map(canonicalIngredient)
    .filter(Boolean)
    .filter((name, index, list) => list.indexOf(name) === index)
    .filter((name) => !selectedNames.includes(name))
    .slice(0, 6);
}

function renderSmartSuggestions() {
  if (!smartSuggestionsContainer) return;

  const suggestions = getSmartIngredientSuggestions();

  if (suggestions.length === 0) {
    smartSuggestionsContainer.classList.add("hidden");
    smartSuggestionsContainer.innerHTML = "";
    return;
  }

  smartSuggestionsContainer.classList.remove("hidden");
  smartSuggestionsContainer.innerHTML = `
    <div class="smart-suggestions-copy">
      <strong>Küchenkumpel fragt nach:</strong>
      <span>Hast du vielleicht noch eins davon da?</span>
    </div>

    <div class="smart-suggestion-buttons">
      ${suggestions.map((name) => `
        <button class="smart-suggestion-button" type="button" data-suggest-ingredient="${escapeHtml(name)}">
          ${escapeHtml(displayIngredientName(name))}
        </button>
      `).join("")}
    </div>
  `;

  smartSuggestionsContainer.querySelectorAll("[data-suggest-ingredient]").forEach((button) => {
    button.addEventListener("click", () => addIngredient(button.dataset.suggestIngredient || ""));
  });
}

function renderQuickIngredients() {
  if (!quickIngredientsContainer) return;

  quickIngredientsContainer.classList.toggle("collapsed", !moreIngredientsVisible);
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

  if (toggleMoreIngredientsButton) {
    toggleMoreIngredientsButton.textContent = moreIngredientsVisible
      ? "Weniger Zutaten anzeigen"
      : "Mehr Zutaten anzeigen";
    toggleMoreIngredientsButton.setAttribute("aria-expanded", String(moreIngredientsVisible));
  }
}

function renderSelectedIngredients() {
  if (!selectedIngredientsContainer || !selectedArea) return;

  selectedArea.classList.toggle("hidden", selectedIngredients.length === 0);
  selectedIngredientsContainer.innerHTML = "";

  if (findRecipesButton) findRecipesButton.disabled = selectedIngredients.length === 0;
  if (clearSelectedIngredientsButton) clearSelectedIngredientsButton.disabled = selectedIngredients.length === 0;

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

    chip.querySelector(".clock-button").addEventListener("click", () => toggleUrgent(ingredient.name));
    chip.querySelector(".chip-button").addEventListener("click", () => removeIngredient(ingredient.name));

    selectedIngredientsContainer.appendChild(chip);
  });
}

function getRecipeImageMarkup(recipe, isRecommendation) {
  const imageClass = isRecommendation ? "recipe-card-image large" : "recipe-card-image";
  const imagePath = getRecipeImagePath(recipe);
  const fallbackPath = getRecipeFallbackImagePath(recipe);

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
        data-fallback="${escapeHtml(fallbackPath)}"
        alt="${escapeHtml(recipe.imageAlt || recipe.title)}"
        loading="lazy"
        onerror="handleRecipeImageError(this)"
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
  const { recipe, matchingMain, missingMain } = match;
  const isRescue = match.context === "rescue";
  const cardClass = isRecommendation ? "recommendation-card" : "recipe-card";
  const badgeText = isRescue
    ? (isRecommendation ? "Abendessen gerettet" : "Zufällige Alternative")
    : (isRecommendation ? "Bester Treffer" : "Rezeptidee");
  const hasIngredientContext = !isRescue && hasSubmittedIngredientSearch();

  const statusText = isRescue
    ? "Zufällig für dich gezogen"
    : (hasIngredientContext
      ? (missingMain.length > 0
        ? `${missingMain.length} wichtige Zutat${missingMain.length === 1 ? "" : "en"} fehlt${missingMain.length === 1 ? "" : "en"} noch`
        : "Alles Wichtige ist da")
      : "Passt zu Filter oder Suche");

  const matchText = isRescue
    ? "Einfach ansehen oder noch einmal würfeln"
    : (hasIngredientContext && matchingMain.length > 0
      ? `Passt mit ${formatList(matchingMain.slice(0, 3))}`
      : "Details und Anleitung im Rezept");

  return `
    <article class="${cardClass} recipe-card-compact">
      ${getRecipeImageMarkup(recipe, isRecommendation)}

      <div class="recipe-card-content">
        <div class="recipe-card-topline">
          <span class="recipe-card-badge">${badgeText}</span>
          ${createFavoriteButton(recipe)}
        </div>

        <h4>${escapeHtml(recipe.title)}</h4>

        <p class="recipe-saying compact-saying">${escapeHtml(recipe.saying)}</p>

        <div class="recipe-quick-meta">
          <span>${escapeHtml(recipe.time)}</span>
          <span>${escapeHtml(recipe.category || "Rezept")}</span>
          ${recipe.airfryerTemperature ? `<span>${escapeHtml(recipe.airfryerTemperature)}</span>` : ""}
        </div>

        <div class="compact-card-status">
          <strong>${escapeHtml(statusText)}</strong>
          <span>${escapeHtml(matchText)}</span>
        </div>

        <div class="recipe-actions compact-actions">
          <button class="small-button" data-open-recipe="${recipe.id}" type="button">
            Ansehen
          </button>

          <button class="ghost-button" data-add-shopping="${recipe.id}" type="button">
            Einkauf
          </button>

          <button class="ghost-button" data-share-card="${recipe.id}" type="button">
            Teilen
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

  document.querySelectorAll("[data-add-shopping]").forEach((button) => {
    button.addEventListener("click", () => {
      addMissingToShoppingList(Number(button.dataset.addShopping));
    });
  });

  document.querySelectorAll("[data-share-card]").forEach((button) => {
    button.addEventListener("click", () => {
      const recipe = recipes.find((item) => item.id === Number(button.dataset.shareCard));
      if (recipe) shareRecipe(recipe);
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

  if (rescueModeActive) {
    const rescueMatches = getRescueMatches();

    topRecommendation.innerHTML = rescueMatches.length > 0
      ? createRecipeCard(rescueMatches[0], true)
      : `<div class="empty-state">Ich konnte gerade keine Zufallsidee ziehen.</div>`;
    return;
  }

  const matches = getMatches();
  const hasIngredientContext = hasSubmittedIngredientSearch();

  if (hasPendingIngredientSelection()) {
    topRecommendation.innerHTML = `
      <div class="empty-state">
        Wähl in Ruhe alles aus. Erst mit „Daraus was kochen“ suche ich dir passende Rezepte raus.
      </div>
    `;
    return;
  }

  if (!hasIngredientContext) {
    topRecommendation.innerHTML = `
      <div class="empty-state">
        ${hasBrowseCriteria()
          ? "Stöbermodus aktiv. Die passenden Rezepte findest du unten in den Vorschlägen."
          : "Trag ein paar Zutaten ein. Dann zeige ich dir hier direkt den besten Treffer."}
      </div>
    `;
    return;
  }

  if (matches.length === 0) {
    topRecommendation.innerHTML = `
      <div class="empty-state">
        Dafür habe ich keinen vollständigen Treffer. Nimm eine Zutat raus oder stell die Auswahl etwas breiter auf.
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

function renderFavoritePreview() {
  if (!favoritePreviewSection || !favoritePreviewText) return;

  const count = favoriteRecipeIds.length;
  favoritePreviewSection.classList.toggle("hidden", count === 0);

  if (count === 0) {
    favoritePreviewText.textContent = "Du hast noch keine Favoriten gespeichert.";
    return;
  }

  favoritePreviewText.textContent =
    count === 1
      ? "Du hast 1 Rezept gemerkt."
      : `Du hast ${count} Rezepte gemerkt.`;
}

function renderFavorites() {
  if (!favoriteResults || !favoritesSection) return;

  favoritesSection.classList.toggle("hidden", !favoritesVisible);

  if (exportFavoritesButton) exportFavoritesButton.disabled = favoriteRecipeIds.length === 0;
  if (clearFavoritesButton) clearFavoritesButton.disabled = favoriteRecipeIds.length === 0;

  const favoriteRecipes = favoriteRecipeIds
    .map((id) => recipes.find((recipe) => recipe.id === id))
    .filter(Boolean);

  if (favoriteRecipes.length === 0) {
    favoriteResults.innerHTML = `
      <div class="empty-state">
        Noch keine Favoriten. Wenn ein Rezept gut klingt, drück aufs Herz.
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

  if (rescueModeActive) {
    const rescueMatches = getRescueMatches();
    const alternatives = rescueMatches.slice(1);

    resultCounter.textContent = rescueMatches.length > 1
      ? `${rescueMatches.length} zufällige Ideen für heute Abend.`
      : "Eine zufällige Idee für heute Abend.";

    if (toggleMoreRecipesButton) {
      toggleMoreRecipesButton.disabled = true;
      toggleMoreRecipesButton.setAttribute("aria-expanded", "true");
    }

    recipeResults.classList.remove("hidden");
    recipeResults.innerHTML = alternatives.length > 0
      ? alternatives.map((match) => createRecipeCard(match, false)).join("")
      : `<div class="empty-state">Die Hauptidee findest du direkt darüber.</div>`;
    return;
  }

  const hasIngredientContext = hasSubmittedIngredientSearch();
  const pendingIngredientSelection = hasPendingIngredientSelection();
  const matches = getMatches();
  const hasToggleButton = !!toggleMoreRecipesButton;
  const browsing = !hasIngredientContext && hasBrowseCriteria();

  if (!hasToggleButton) {
    moreRecipesVisible = true;
  }

  if (hasToggleButton) {
    toggleMoreRecipesButton.textContent = moreRecipesVisible
      ? "Vorschläge ausblenden"
      : "Mehr Vorschläge zeigen";
    toggleMoreRecipesButton.setAttribute("aria-expanded", String(moreRecipesVisible));
  }

  if (pendingIngredientSelection) {
    resultCounter.textContent = "Zutaten ausgewählt. Drück auf „Daraus was kochen“, wenn ich suchen soll.";

    if (hasToggleButton) {
      toggleMoreRecipesButton.disabled = true;
      toggleMoreRecipesButton.setAttribute("aria-expanded", "false");
    }

    moreRecipesVisible = false;
    recipeResults.classList.add("hidden");
    recipeResults.innerHTML = `
      <div class="empty-state">
        Ich warte noch. Du kannst erst mehrere Zutaten sammeln und danach bewusst loslegen.
      </div>
    `;
    return;
  }

  if (!hasIngredientContext && !hasBrowseCriteria()) {
    resultCounter.textContent = "Gib Zutaten ein oder wähle einen Filter zum Stöbern.";

    if (hasToggleButton) {
      toggleMoreRecipesButton.disabled = true;
      toggleMoreRecipesButton.setAttribute("aria-expanded", "false");
    }

    moreRecipesVisible = false;
    recipeResults.classList.add("hidden");
    recipeResults.innerHTML = `
      <div class="empty-state">
        Du kannst Zutaten eintragen, nach Rezepten suchen oder direkt einen Filter wie „Zu heiß zum Kochen“ öffnen.
      </div>
    `;
    return;
  }

  if (matches.length === 0) {
    resultCounter.textContent = "Noch nichts Passendes gefunden.";

    if (hasToggleButton) {
      toggleMoreRecipesButton.disabled = true;
      toggleMoreRecipesButton.setAttribute("aria-expanded", "false");
    }

    moreRecipesVisible = false;
    recipeResults.classList.add("hidden");
    recipeResults.innerHTML = `
      <div class="empty-state">
        Dafür gibt es gerade keinen vollständigen Treffer. Entferne eine Zutat oder starte eine neue Auswahl.
      </div>
    `;
    return;
  }

  if (matches.length === 1 && hasIngredientContext) {
    resultCounter.textContent = "Ein guter Treffer gefunden.";

    if (hasToggleButton) {
      toggleMoreRecipesButton.disabled = true;
      toggleMoreRecipesButton.setAttribute("aria-expanded", "false");
      moreRecipesVisible = false;
      recipeResults.classList.add("hidden");
    } else {
      moreRecipesVisible = true;
      recipeResults.classList.remove("hidden");
    }

    recipeResults.innerHTML = `
      <div class="empty-state">
        Ich habe gerade nur diesen einen wirklich passenden Treffer. Eine Zutat mehr bringt mehr Auswahl.
      </div>
    `;
    return;
  }

  const visibleMatches = hasIngredientContext
    ? matches.slice(1, 13)
    : matches.slice(0, 30);

  if (browsing) {
    const label = activeFilter !== "all" ? getActiveFilterLabel() : "Suche";
    resultCounter.textContent = `${matches.length} Idee${matches.length === 1 ? "" : "n"} für ${label} gefunden.`;
  } else if (hasIngredientContext) {
    const label = formatList(getExplicitSelectedNames());
    resultCounter.textContent = `${matches.length} Idee${matches.length === 1 ? "" : "n"} passend zu ${label} gefunden.`;
  } else {
    resultCounter.textContent = `${matches.length} Idee${matches.length === 1 ? "" : "n"} gefunden.`;
  }

  if (hasToggleButton) {
    toggleMoreRecipesButton.disabled = false;
    recipeResults.classList.toggle("hidden", !moreRecipesVisible);
  } else {
    recipeResults.classList.remove("hidden");
  }

  recipeResults.innerHTML = visibleMatches.map((match) => createRecipeCard(match, false)).join("");
}
function getRecipeSearchText(recipe) {
  return normalize(
    [
      recipe.title,
      recipe.name,
      recipe.slug,
      recipe.category,
      ...(recipe.categories || []),
      ...(recipe.deviceTags || []),
      recipe.slogan,
      recipe.shortDescription,
      recipe.feeling,
      recipe.satiety,
      recipe.timeTotal,
      recipe.timePrep,
      recipe.timeCook,
      recipe.airfryerTemperature,
      recipe.airfryerTime,
      recipe.difficulty,
      recipe.cost,
      recipe.dishes,
      ...(recipe.tags || []),
      ...((recipe.ingredients || []).map((ingredient) => ingredient.name))
    ].join(" ")
  );
}

function getDailyIntroText(season, daytimeMode) {
  if (daytimeMode === "morgen") {
    return "Heute würde ich es eher einfach halten. Schnell, nicht zu schwer und ohne Küchenstress direkt am Morgen.";
  }

  if (daytimeMode === "mittag") {
    return "Für jetzt würde ich etwas nehmen, das satt macht, aber nicht den halben Tag klaut.";
  }

  if (daytimeMode === "nacht") {
    return "Zu der Uhrzeit bitte keine Heldentaten mehr. Schnell, einfach und möglichst wenig Chaos.";
  }

  if (season === "sommer") {
    return "Heute eher leicht und unkompliziert. Kein schwerer Teller, wenn es auch frischer geht.";
  }

  if (season === "winter") {
    return "Heute darf es ruhig etwas Wärmeres und Sättigenderes sein. So ein richtiger Küchentrost eben.";
  }

  if (season === "herbst") {
    return "Heute passt etwas Warmes und Gemütliches ziemlich gut.";
  }

  if (season === "fruehling") {
    return "Heute würde ich es eher frisch, einfach und nicht zu schwer halten.";
  }

  return "Heute würde ich dir das hier vorschlagen. Passt gerade ganz gut und macht nicht unnötig Arbeit.";
}

function scoreDailyRecipe(recipe) {
  const season = getSeasonMode();
  const daytimeMode = getDaytimeMode();
  const text = getRecipeSearchText(recipe);
  const wantsAirfryer = getSelectedNames().includes("heißluftfritteuse");
  let score = 0;

  if (recipe.difficulty === "einfach") score += 3;
  if (recipe.dishes === "wenig") score += 4;
  if (recipe.cost === "günstig") score += 2;
  if ((recipe.tags || []).includes("schnell")) score += 3;
  if ((recipe.tags || []).includes("sättigend")) score += 2;

  if (wantsAirfryer) {
    if (recipe.tags.includes("heissluftfritteuse") || recipe.tags.includes("airfryer")) score += 18;
    else score -= 8;
  }

  if (activeMood === "kein-bock") {
    if ((recipe.tags || []).includes("kein bock")) score += 8;
    if ((recipe.tags || []).includes("schnell")) score += 5;
    if (recipe.dishes === "wenig") score += 5;
    if ((recipe.tags || []).includes("ofen")) score -= 6;
  }

  if (activeMood === "schnell") {
    if ((recipe.tags || []).includes("schnell")) score += 8;
    if (text.includes("15 minuten") || text.includes("20 minuten")) score += 3;
    if (text.includes("40 minuten") || text.includes("45 minuten")) score -= 5;
  }

  if (activeMood === "muss-weg") {
    if ((recipe.tags || []).includes("muss weg")) score += 7;
    if (text.includes("reste") || text.includes("gemüse") || text.includes("gemuese")) score += 4;
  }

  if (activeMood === "guenstig") {
    if (recipe.cost === "günstig") score += 8;
    if (text.includes("grundzutaten")) score += 2;
  }

  if (activeMood === "satt") {
    if ((recipe.tags || []).includes("sättigend")) score += 8;
    if (text.includes("kartoffel") || text.includes("nudel") || text.includes("reis") || text.includes("auflauf")) score += 3;
  }

  if (activeMood === "verwoehn") {
    if ((recipe.tags || []).includes("soulfood") || (recipe.tags || []).includes("cremig")) score += 8;
    if (text.includes("käse") || text.includes("kaese") || text.includes("sahne")) score += 3;
  }

  if (daytimeMode === "morgen") {
    if ((recipe.tags || []).includes("frühstück") || text.includes("brot") || textContainsEgg(text) || text.includes("hafer")) score += 7;
    if ((recipe.tags || []).includes("schnell")) score += 4;
    if ((recipe.tags || []).includes("ofen") || text.includes("auflauf")) score -= 5;
  }

  if (daytimeMode === "mittag") {
    if ((recipe.tags || []).includes("sättigend")) score += 4;
    if ((recipe.tags || []).includes("schnell")) score += 3;
  }

  if (daytimeMode === "nachmittag") {
    if ((recipe.tags || []).includes("schnell")) score += 3;
    if (text.includes("brot") || textContainsEgg(text) || text.includes("nudel")) score += 2;
  }

  if (daytimeMode === "abend") {
    if ((recipe.tags || []).includes("sättigend") || (recipe.tags || []).includes("soulfood")) score += 4;
    if (recipe.dishes === "wenig") score += 2;
  }

  if (daytimeMode === "nacht") {
    if ((recipe.tags || []).includes("schnell")) score += 7;
    if (recipe.dishes === "wenig") score += 5;
    if ((recipe.tags || []).includes("ofen") || text.includes("auflauf")) score -= 8;
  }

  if (season === "sommer") {
    if (text.includes("tomate") || text.includes("gemüse") || text.includes("gemuese") || text.includes("frisch") || text.includes("thunfisch")) score += 4;
    if (text.includes("leicht")) score += 3;
    if (text.includes("auflauf") || text.includes("richtig deftig")) score -= 3;
  }

  if (season === "winter") {
    if ((recipe.tags || []).includes("soulfood") || (recipe.tags || []).includes("sättigend")) score += 5;
    if (text.includes("auflauf") || text.includes("kartoffel") || text.includes("käse") || text.includes("kaese") || text.includes("sahne")) score += 4;
  }

  if (season === "herbst") {
    if (text.includes("kartoffel") || text.includes("auflauf") || text.includes("gemüse") || text.includes("gemuese") || text.includes("cremig")) score += 4;
    if ((recipe.tags || []).includes("soulfood")) score += 3;
  }

  if (season === "fruehling") {
    if (text.includes("frisch") || text.includes("gemüse") || text.includes("gemuese") || text.includes("tomate")) score += 4;
    if ((recipe.tags || []).includes("schnell")) score += 2;
  }

  return score + Math.random();
}

function getDailyRecommendationPool() {
  const baseMatches = getMatches();

  if (baseMatches.length > 0) {
    return baseMatches
      .slice(0, 30)
      .map((match) => match.recipe);
  }

  return recipes
    .filter(recipeMatchesActiveFilter)
    .filter(recipeMatchesSearch)
    .map((recipe) => ({ recipe, score: scoreDailyRecipe(recipe) }))
    .sort((a, b) => b.score - a.score)
    .map((item) => item.recipe);
}

function createDailyReason(recipe) {
  const season = getSeasonMode();
  const daytimeMode = getDaytimeMode();
  const daytime = getDaytimeSettings();
  const intro = getDailyIntroText(season, daytimeMode);
  const parts = [];

  parts.push(intro);

  if (activeMood !== "normal") {
    const mood = moodSettings[activeMood] || moodSettings.normal;
    parts.push(`Deine Küchenlage ist gerade „${mood.label}“, also habe ich das mit reingerechnet.`);
  }

  if (recipe.dishes === "wenig") {
    parts.push("Außerdem bleibt der Abwasch überschaubar.");
  }

  if ((recipe.tags || []).includes("schnell")) {
    parts.push("Und es dauert nicht ewig.");
  } else if ((recipe.tags || []).includes("sättigend")) {
    parts.push("Und es macht ordentlich satt.");
  }

  return {
    text: parts.join(" "),
    badges: [getSeasonLabel(season), daytime.label, recipe.time || recipe.timeTotal || "schnell gemacht"]
  };
}

function renderDailyRecommendation() {
  if (!dailyRecommendationResult) return;

  const recipeId = Number(dailyRecommendationResult.dataset.recipeId || 0);
  const recipe = recipes.find((item) => item.id === recipeId);

  if (!recipe) return;

  const reason = createDailyReason(recipe);

  dailyRecommendationResult.className = "daily-recommendation-result has-daily-recommendation";
  dailyRecommendationResult.innerHTML = `
    <div class="daily-recommendation-recipe">
      <img
        class="daily-recommendation-image"
        src="${escapeHtml(getRecipeImagePath(recipe))}"
        data-fallback="${escapeHtml(getRecipeFallbackImagePath(recipe))}"
        alt="${escapeHtml(recipe.imageAlt || recipe.title)}"
        loading="lazy"
        decoding="async"
      />

      <div class="daily-recommendation-copy">
        <strong>Heute würde ich dir das hier vorschlagen:</strong>
        <h4>${escapeHtml(recipe.title)}</h4>
        <p>${escapeHtml(reason.text)}</p>

        <div class="daily-recommendation-meta">
          ${reason.badges.map((badge) => `<span>${escapeHtml(badge)}</span>`).join("")}
        </div>

        <button class="small-button daily-recommendation-open-button" type="button" data-open-daily-recipe="${recipe.id}">
          Rezept ansehen
        </button>
      </div>
    </div>
  `;

  const image = dailyRecommendationResult.querySelector(".daily-recommendation-image");

  if (image) {
    image.onerror = () => handleRecipeImageError(image);
  }
}

function recommendDailyRecipe(useNext = false) {
  if (!dailyRecommendationResult || !dailyRecommendationSection) return;

  dailyRecommendationSection.classList.remove("hidden");

  if (!recipes.length) {
    dailyRecommendationResult.className = "daily-recommendation-result empty-daily-recommendation";
    dailyRecommendationResult.innerHTML = `
      <strong>Ich finde gerade keine Rezepte.</strong>
      <span>Schau bitte, ob recipes.js sauber geladen wird.</span>
    `;
    return;
  }

  if (cachedDailyRecommendationPool.length === 0) {
    cachedDailyRecommendationPool = getDailyRecommendationPool();
    dailyRecommendationIndex = 0;
  } else if (useNext) {
    dailyRecommendationIndex += 1;
  }

  if (dailyRecommendationIndex >= cachedDailyRecommendationPool.length) {
    dailyRecommendationIndex = 0;
  }

  const recipe = cachedDailyRecommendationPool[dailyRecommendationIndex];

  if (!recipe) return;

  dailyRecommendationResult.dataset.recipeId = String(recipe.id);
  renderDailyRecommendation();

  if (dailyRecommendationAgainButton) {
    dailyRecommendationAgainButton.disabled = cachedDailyRecommendationPool.length <= 1;
  }

  updateBuddyTextOnly(`Ich würde heute ${recipe.title} nehmen. Passt gerade ganz gut.`);

  setTimeout(() => {
    dailyRecommendationSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 80);
}


function surpriseRecipe() {
  const pool = getMatches().length > 0
    ? getMatches().map((match) => match.recipe)
    : recipes;

  if (!pool.length) {
    updateBuddyTextOnly("Ich finde gerade keine Rezepte zum Überraschen.");
    return;
  }

  const recipe = pool[Math.floor(Math.random() * pool.length)];

  updateBuddyTextOnly(`Überraschung: ${recipe.title}. Klingt nach Plan.`);
  openRecipeModal(recipe.id);
}

function openRecipeModal(recipeId) {
  if (!recipeModal || !modalContent) return;

  const recipe = recipes.find((item) => item.id === recipeId);
  if (!recipe) return;

  currentModalRecipeId = recipe.id;
  currentModalPortions = recipe.portions || 2;
  cookingStepIndex = 0;
  stopRecipeTimer(false);
  addRecentRecipe(recipe.id);

  renderRecipeModal(recipe);
  recipeModal.classList.remove("hidden");
  recipeModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  if (closeModalButton) {
    closeModalButton.focus();
  }
}


function getRecipeMainNames(recipe, limit = 6) {
  return (recipe.ingredients || [])
    .map((ingredient) => ingredient.name)
    .filter(Boolean)
    .slice(0, limit)
    .map(displayIngredientName);
}

function getRecipeContextFlags(recipe) {
  const tags = recipe.tags || [];
  const searchText = normalizeSearchValue([
    recipe.title,
    recipe.category,
    recipe.shortDescription,
    recipe.deviceNote,
    ...(recipe.steps || []),
    ...(recipe.ingredients || []).map((ingredient) => ingredient.name),
    ...tags
  ].join(" "));

  return {
    airfryer: tags.includes("heissluftfritteuse") || searchText.includes("airfryer") || searchText.includes("heissluft"),
    summer: tags.includes("zu heiß zum kochen") || tags.includes("zu heiss zum kochen") || searchText.includes("sommer"),
    leftovers: tags.includes("muss weg") || searchText.includes("reste") || searchText.includes("muss weg"),
    noCook: searchText.includes("ohne kochen") || searchText.includes("kalt") || searchText.includes("salat") || searchText.includes("wrap"),
    pan: searchText.includes("pfanne") || searchText.includes("braten") || searchText.includes("anbraten"),
    oven: searchText.includes("ofen") || searchText.includes("backen")
  };
}

function getDetailedSteps(recipe) {
  const originalSteps = (recipe.steps || []).filter(Boolean);
  const flags = getRecipeContextFlags(recipe);
  const mainNames = getRecipeMainNames(recipe);
  const steps = [];

  steps.push({
    title: "Vorbereitung",
    text: getPreparationText(recipe, flags, mainNames),
    tip: getPreparationTip(flags)
  });

  originalSteps.forEach((step, index) => {
    steps.push({
      title: `Zubereitung ${index + 1}`,
      text: expandRecipeStep(recipe, step, index, flags),
      tip: getStepTip(recipe, step, index, flags)
    });
  });

  steps.push({
    title: "Abschmecken & servieren",
    text: getFinishText(recipe, flags),
    tip: getFinishTip(flags)
  });

  return steps;
}

function getPreparationText(recipe, flags, mainNames) {
  const ingredientsText = mainNames.length > 0
    ? `Leg dir zuerst ${mainNames.join(", ")} und die restlichen Zutaten bereit.`
    : "Leg dir zuerst alle Zutaten bereit.";

  if (flags.airfryer) {
    return `${ingredientsText} Tupfe feuchte Zutaten kurz trocken, damit sie in der Heißluftfritteuse besser bräunen. Heize das Gerät nur vor, wenn dein Modell das braucht, und halte den Korb frei genug, damit die Luft zirkulieren kann.`;
  }

  if (flags.summer || flags.noCook) {
    return `${ingredientsText} Wasche Gemüse und Kräuter gründlich, schneide alles mundgerecht und rühre Soßen oder Dressings separat an. So bleibt das Gericht frisch und wird nicht matschig, bevor es auf den Teller kommt.`;
  }

  if (flags.leftovers) {
    return `${ingredientsText} Prüfe Reste kurz auf Geruch und Konsistenz, schneide trockene oder unschöne Stellen weg und sortiere alles so vor, dass du beim Kochen nicht suchen musst.`;
  }

  return `${ingredientsText} Schneide Gemüse möglichst gleichmäßig, stelle Gewürze griffbereit und such dir Pfanne, Topf oder Schüssel vorher raus. Dadurch läuft die Zubereitung ruhiger und nichts brennt an, während du noch schnippelst.`;
}

function getPreparationTip(flags) {
  if (flags.airfryer) return "Nicht zu voll machen: lieber in zwei Runden garen als einen überladenen Korb riskieren.";
  if (flags.summer || flags.noCook) return "Kalte Komponenten erst kurz vor dem Essen mischen, dann bleibt alles knackiger.";
  if (flags.leftovers) return "Reste sind perfekt, aber nur, wenn sie noch gut riechen und sauber gelagert wurden.";
  return "Einmal vorbereiten spart am Ende mehr Zeit als hektisches Nachschneiden.";
}

function expandRecipeStep(recipe, step, index, flags) {
  const cleanStep = String(step || "").trim();
  const normalizedStep = normalizeSearchValue(cleanStep);
  let addition = "";

  if (normalizedStep.includes("schneid") || normalizedStep.includes("würfel") || normalizedStep.includes("wuerfel")) {
    addition = "Achte auf ähnliche Stückgrößen, dann wird später alles gleichmäßiger gar und das Mundgefühl wird besser.";
  } else if (normalizedStep.includes("anbrat") || normalizedStep.includes("brat")) {
    addition = "Arbeite lieber mit mittlerer bis guter Hitze und rühre regelmäßig um, damit Röstaromen entstehen, aber nichts bitter wird.";
  } else if (normalizedStep.includes("koch") || normalizedStep.includes("garen")) {
    addition = "Lass es nicht unnötig stark blubbern. Ein ruhiges Köcheln reicht meistens und gibt dir mehr Kontrolle.";
  } else if (normalizedStep.includes("misch") || normalizedStep.includes("verrühr") || normalizedStep.includes("vermeng")) {
    addition = "Mische erst vorsichtig und gib Flüssigkeit oder Dressing lieber nach und nach dazu, bis die Konsistenz passt.";
  } else if (normalizedStep.includes("würz") || normalizedStep.includes("wuerz") || normalizedStep.includes("abschmeck")) {
    addition = "Würze in kleinen Schritten. Salz, Säure und etwas Schärfe lieber am Ende fein einstellen.";
  } else if (flags.airfryer) {
    addition = "Schüttle oder wende nach etwa der Hälfte der Zeit, damit die Oberfläche rundherum Farbe bekommt.";
  } else if (flags.summer || flags.noCook) {
    addition = "Wenn du das Gericht vorbereitest, bewahre frische und cremige Bestandteile getrennt auf und mische sie erst beim Servieren.";
  } else {
    addition = "Nimm dir hier einen Moment Zeit und probiere kurz, ob Konsistenz und Würzung schon in die richtige Richtung gehen.";
  }

  if (cleanStep.length > 120) return cleanStep;

  return `${cleanStep} ${addition}`;
}

function getStepTip(recipe, step, index, flags) {
  const normalizedStep = normalizeSearchValue(step);

  if (flags.airfryer) return "Bei Heißluft lieber einmal früher kontrollieren. Geräte garen je nach Modell unterschiedlich.";
  if (normalizedStep.includes("soße") || normalizedStep.includes("sosse") || normalizedStep.includes("dressing")) return "Soßen dürfen zuerst etwas kräftiger schmecken, weil sie sich später mit den Zutaten verteilen.";
  if (normalizedStep.includes("pfanne") || normalizedStep.includes("brat")) return "Wenn es zu schnell dunkel wird: Hitze runter, nicht hektisch werden.";
  if (flags.summer || flags.noCook) return "Frische Kräuter oder etwas Zitronensaft heben kalte Gerichte direkt an.";
  if (flags.leftovers) return "Reste vertragen oft etwas mehr Würze, weil sie beim Aufwärmen milder wirken.";
  return index === 0 ? "Der erste Schritt entscheidet oft über Ruhe oder Chaos in der Küche." : "Kurz probieren ist erlaubt. Küchenkumpel petzt nicht.";
}

function getFinishText(recipe, flags) {
  if (flags.airfryer) {
    return "Lass das Gericht nach dem Garen ein bis zwei Minuten stehen, damit sich Hitze und Saft verteilen. Prüfe dann die Konsistenz, würze bei Bedarf nach und serviere es am besten direkt, solange es noch knusprig ist.";
  }

  if (flags.summer || flags.noCook) {
    return "Mische empfindliche Zutaten erst ganz zum Schluss unter. Probier einmal auf Salz, Säure und Frische, gib bei Bedarf etwas Zitrone, Joghurt, Öl oder Kräuter dazu und serviere alles möglichst frisch.";
  }

  if (flags.leftovers) {
    return "Probier zum Schluss bewusst: Braucht es Salz, Säure, Schärfe oder etwas Cremigkeit? Gerade Restegerichte werden mit einem kleinen frischen Abschluss deutlich besser.";
  }

  return "Schalte die Hitze aus, probiere in Ruhe und stell Salz, Pfeffer, Säure oder Cremigkeit ein. Richte das Essen dann direkt an und gib, wenn vorhanden, noch etwas Frisches oder Knuspriges darüber.";
}

function getFinishTip(flags) {
  if (flags.airfryer) return "Knusprige Sachen nicht abdecken, sonst werden sie weich.";
  if (flags.summer || flags.noCook) return "Frische Gerichte wirken sofort besser, wenn sie nicht zu lange herumstehen.";
  if (flags.leftovers) return "Ein frischer Abschluss macht aus Resteessen wieder ein richtiges Gericht.";
  return "Am Ende entscheidet Abschmecken mehr als jede genaue Mengenangabe.";
}

function renderDetailedStepCards(recipe) {
  return getDetailedSteps(recipe)
    .map((step, index) => `
      <li class="detailed-step-card">
        <div class="step-number">${index + 1}</div>

        <div class="step-copy">
          <h5>${escapeHtml(step.title)}</h5>
          <p>${escapeHtml(step.text)}</p>
          ${step.tip ? `<small>${escapeHtml(step.tip)}</small>` : ""}
        </div>
      </li>
    `)
    .join("");
}

function renderRecipeModal(recipe) {
  modalContent.innerHTML = `
    <div class="modal-recipe-hero">
      <div class="modal-recipe-image-wrap">
        <img
          src="${escapeHtml(getRecipeImagePath(recipe))}"
          data-fallback="${escapeHtml(getRecipeFallbackImagePath(recipe))}"
          alt="${escapeHtml(recipe.imageAlt || recipe.title)}"
          onerror="handleRecipeImageError(this)"
        />
      </div>

      <div class="modal-title-area">
        <div class="modal-title-top">
          <span class="modal-category">${escapeHtml(recipe.category || "Rezept")}</span>
          ${createFavoriteButton(recipe)}
        </div>

        <h3 id="modalRecipeTitle">${escapeHtml(recipe.title)}</h3>
        <p class="recipe-saying">${escapeHtml(recipe.saying)}</p>
        <p class="modal-description">${escapeHtml(recipe.shortDescription || "")}</p>
      </div>
    </div>

    <div class="modal-action-groups">
      <div class="modal-action-group">
        <span>Kochen</span>

        <div class="modal-action-row">
          <button id="toggleCookModeButton" class="ghost-button" type="button">
            Kochmodus
          </button>

          <button id="startRecipeTimerButton" class="ghost-button" type="button">
            Timer
          </button>
        </div>
      </div>

      <div class="modal-action-group">
        <span>Planen</span>

        <div class="modal-action-row">
          <button id="addModalShoppingButton" class="ghost-button" type="button">
            Einkaufsliste
          </button>

          <button id="shareRecipeButton" class="ghost-button" type="button">
            Teilen
          </button>

          <button id="printRecipeButton" class="ghost-button" type="button">
            Drucken
          </button>
        </div>
      </div>
    </div>

    <div id="recipeTimerPanel" class="recipe-timer-panel hidden" aria-live="polite">
      <strong id="recipeTimerDisplay">00:00</strong>
      <button id="stopRecipeTimerButton" class="ghost-button" type="button">
        Timer stoppen
      </button>
    </div>

    <div id="cookModePanel" class="cook-mode-panel hidden" aria-live="polite">
      <div class="cook-mode-head">
        <strong>Kochmodus</strong>
        <span id="cookModeCounter">Schritt 1</span>
      </div>

      <p id="cookModeStepText"></p>

      <div class="cook-mode-actions">
        <button id="previousCookStepButton" class="ghost-button" type="button">
          Zurück
        </button>

        <button id="nextCookStepButton" class="ghost-button" type="button">
          Weiter
        </button>
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
      ${recipe.airfryerTemperature ? `<span class="meta-pill">Airfryer · ${escapeHtml(recipe.airfryerTemperature)}</span>` : ""}
      ${recipe.airfryerTime ? `<span class="meta-pill">Garzeit · ${escapeHtml(recipe.airfryerTime)}</span>` : ""}
    </div>

    ${renderRecipeHints(recipe)}

    <div class="detail-box">
      <strong>Abwasch:</strong> ${escapeHtml(recipe.dishesText)}
    </div>

    <div class="detail-box">
      <strong>Kosten:</strong> ${escapeHtml(recipe.costText)}
    </div>

    ${recipe.deviceNote ? `
      <div class="detail-box">
        <strong>Geräte-Hinweis:</strong> ${escapeHtml(recipe.deviceNote)}
      </div>
    ` : ""}

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

    <h4 class="modal-section-title">Ausführliche Anleitung</h4>
    <ol class="detailed-step-list">
      ${renderDetailedStepCards(recipe)}
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

  if (decreaseButton) decreaseButton.addEventListener("click", () => changeModalPortions(recipe, -1));
  if (increaseButton) increaseButton.addEventListener("click", () => changeModalPortions(recipe, 1));

  const toggleCookModeButton = document.getElementById("toggleCookModeButton");
  const previousCookStepButton = document.getElementById("previousCookStepButton");
  const nextCookStepButton = document.getElementById("nextCookStepButton");
  const startRecipeTimerButton = document.getElementById("startRecipeTimerButton");
  const stopRecipeTimerButton = document.getElementById("stopRecipeTimerButton");
  const addModalShoppingButton = document.getElementById("addModalShoppingButton");
  const shareRecipeButton = document.getElementById("shareRecipeButton");
  const printRecipeButton = document.getElementById("printRecipeButton");

  if (toggleCookModeButton) toggleCookModeButton.addEventListener("click", () => toggleCookMode(recipe));
  if (previousCookStepButton) previousCookStepButton.addEventListener("click", () => changeCookStep(recipe, -1));
  if (nextCookStepButton) nextCookStepButton.addEventListener("click", () => changeCookStep(recipe, 1));
  if (startRecipeTimerButton) startRecipeTimerButton.addEventListener("click", () => startRecipeTimer(recipe));
  if (stopRecipeTimerButton) stopRecipeTimerButton.addEventListener("click", () => stopRecipeTimer(true));
  if (addModalShoppingButton) addModalShoppingButton.addEventListener("click", () => addMissingToShoppingList(recipe.id));
  if (shareRecipeButton) shareRecipeButton.addEventListener("click", () => shareRecipe(recipe));
  if (printRecipeButton) printRecipeButton.addEventListener("click", () => window.print());

  renderCookModeStep(recipe);

  const favoriteButton = modalContent.querySelector("[data-toggle-favorite]");

  if (favoriteButton) {
    favoriteButton.addEventListener("click", () => {
      toggleFavorite(Number(favoriteButton.dataset.toggleFavorite));
    });
  }
}


function renderRecipeHints(recipe) {
  const hints = getRecipeHints(recipe);

  if (hints.length === 0) return "";

  return `
    <div class="recipe-hints">
      ${hints.map((hint) => `<span>${escapeHtml(hint)}</span>`).join("")}
    </div>
  `;
}

function getRecipeHints(recipe) {
  const text = normalizeSearchValue([
    recipe.name,
    recipe.category,
    recipe.shortDescription,
    ...(recipe.ingredients || []).map((ingredient) => ingredient.name),
    ...(recipe.tags || [])
  ].join(" "));

  const hints = [];

  if ((recipe.tags || []).includes("vegetarisch")) hints.push("vegetarisch");
  if (text.includes("hähnchen") || text.includes("haehnchen") || text.includes("schinken") || text.includes("wurst") || text.includes("hack")) hints.push("mit Fleisch");
  if (text.includes("lachs") || text.includes("thunfisch") || text.includes("garnelen") || text.includes("fisch")) hints.push("mit Fisch");
  if (textContainsEgg(text)) hints.push("enthält Ei");
  if (text.includes("feta") || text.includes("käse") || text.includes("kaese") || text.includes("joghurt") || text.includes("quark") || text.includes("milch") || text.includes("mozzarella")) hints.push("milchhaltig");
  if (text.includes("brot") || text.includes("wrap") || text.includes("nudeln") || text.includes("pasta") || text.includes("baguette") || text.includes("pita")) hints.push("gluten möglich");
  if ((recipe.tags || []).includes("zu heiß zum kochen")) hints.push("wenig Herd");

  return hints.filter((hint, index, list) => list.indexOf(hint) === index).slice(0, 6);
}

function toggleCookMode(recipe) {
  const panel = document.getElementById("cookModePanel");

  if (!panel) return;

  panel.classList.toggle("hidden");
  renderCookModeStep(recipe);
}

function renderCookModeStep(recipe) {
  const steps = getDetailedSteps(recipe);
  const stepText = document.getElementById("cookModeStepText");
  const counter = document.getElementById("cookModeCounter");
  const previousButton = document.getElementById("previousCookStepButton");
  const nextButton = document.getElementById("nextCookStepButton");

  if (!stepText || !counter) return;

  if (steps.length === 0) {
    stepText.textContent = "Für dieses Rezept sind keine Schritte hinterlegt.";
    counter.textContent = "Keine Schritte";
    return;
  }

  cookingStepIndex = Math.min(Math.max(cookingStepIndex, 0), steps.length - 1);
  const currentStep = steps[cookingStepIndex];
  stepText.textContent = `${currentStep.title}: ${currentStep.text}${currentStep.tip ? " Tipp: " + currentStep.tip : ""}`;
  counter.textContent = `Schritt ${cookingStepIndex + 1} von ${steps.length}`;

  if (previousButton) previousButton.disabled = cookingStepIndex === 0;
  if (nextButton) nextButton.disabled = cookingStepIndex === steps.length - 1;
}

function changeCookStep(recipe, direction) {
  const steps = getDetailedSteps(recipe);

  if (steps.length === 0) return;

  cookingStepIndex = Math.min(Math.max(cookingStepIndex + direction, 0), steps.length - 1);
  renderCookModeStep(recipe);
}

function getRecipeTimerMinutes(recipe) {
  const candidates = [recipe.airfryerTime, recipe.timeCook, recipe.timeTotal];

  for (const candidate of candidates) {
    const match = String(candidate || "").match(/(\d+)/);

    if (match) return Math.max(1, Number(match[1]));
  }

  return 10;
}

function updateRecipeTimerDisplay() {
  const display = document.getElementById("recipeTimerDisplay");

  if (!display) return;

  const minutes = Math.floor(recipeTimerRemainingSeconds / 60);
  const seconds = recipeTimerRemainingSeconds % 60;

  display.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function startRecipeTimer(recipe) {
  const panel = document.getElementById("recipeTimerPanel");

  if (!panel) return;

  stopRecipeTimer(false);

  recipeTimerRemainingSeconds = getRecipeTimerMinutes(recipe) * 60;
  panel.classList.remove("hidden");
  updateRecipeTimerDisplay();

  recipeTimerInterval = window.setInterval(() => {
    recipeTimerRemainingSeconds = Math.max(0, recipeTimerRemainingSeconds - 1);
    updateRecipeTimerDisplay();

    if (recipeTimerRemainingSeconds === 0) {
      stopRecipeTimer(false);
      updateBuddyTextOnly("Timer fertig. Bitte einmal nach dem Essen schauen.");
    }
  }, 1000);

  updateBuddyTextOnly(`Timer für ${getRecipeTimerMinutes(recipe)} Minuten läuft.`);
}

function stopRecipeTimer(showMessage = true) {
  if (recipeTimerInterval) {
    window.clearInterval(recipeTimerInterval);
    recipeTimerInterval = null;
  }

  const panel = document.getElementById("recipeTimerPanel");

  if (panel && recipeTimerRemainingSeconds === 0) {
    panel.classList.add("hidden");
  }

  recipeTimerRemainingSeconds = 0;

  if (showMessage) {
    updateBuddyTextOnly("Timer gestoppt.");
  }
}

function getRecipeShareText(recipe) {
  return [
    `Küchenkumpel empfiehlt: ${recipe.title}`,
    `Zeit: ${recipe.time}`,
    recipe.shortDescription || "",
    "",
    "Geöffnet über Küchenkumpel:"
  ].filter(Boolean).join("\n");
}

function shareRecipe(recipe) {
  const text = getRecipeShareText(recipe);

  if (navigator.share) {
    navigator.share({
      title: recipe.title,
      text
    }).catch(() => {});
    return;
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(text)
      .then(() => updateBuddyTextOnly("Rezepttext kopiert. Teilen kann kommen."))
      .catch(() => updateBuddyTextOnly("Teilen hat leider nicht geklappt."));
  } else {
    updateBuddyTextOnly("Teilen wird in diesem Browser nicht unterstützt.");
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

  if (!ingredient.unit) return formattedAmount;

  const unit = ingredient.unit;

  if (["Stück", "Dose", "Zehe", "Scheibe"].some((word) => unit.includes(word)) && !Number.isInteger(calculatedAmount)) {
    return `ca. ${formattedAmount} ${unit}`;
  }

  return `${formattedAmount} ${unit}`;
}

function formatNumber(value) {
  if (Number.isInteger(value)) return String(value);

  const rounded = Math.round(value * 10) / 10;
  return String(rounded).replace(".", ",");
}

function closeRecipeModal() {
  if (recipeModal) {
    recipeModal.classList.add("hidden");
    recipeModal.setAttribute("aria-hidden", "true");
  }

  document.body.classList.remove("modal-open");
  stopRecipeTimer(false);
}

function loadShoppingList() {
  try {
    const savedShoppingList = JSON.parse(localStorage.getItem(SHOPPING_LIST_KEY) || "[]");

    if (Array.isArray(savedShoppingList)) {
      shoppingListItems = savedShoppingList
        .map((item) => {
          if (typeof item === "string") {
            return { name: canonicalIngredient(item), done: false };
          }

          return {
            name: canonicalIngredient(item.name),
            done: Boolean(item.done)
          };
        })
        .filter((item) => item.name)
        .filter((item, index, list) => list.findIndex((entry) => entry.name === item.name) === index);
    }
  } catch {
    shoppingListItems = [];
  }
}

function saveShoppingList() {
  localStorage.setItem(SHOPPING_LIST_KEY, JSON.stringify(shoppingListItems));
}

function getMissingMainIngredients(recipe) {
  const selectedNames = getSelectedNames();

  return (recipe.main || []).filter((ingredient) => {
    return !selectedNames.some((selectedName) => isExactIngredientMatch(ingredient, selectedName));
  });
}

function addShoppingItem(name) {
  const normalizedName = canonicalIngredient(name);

  if (!normalizedName || shoppingListItems.some((item) => item.name === normalizedName)) {
    return false;
  }

  shoppingListItems.push({
    name: normalizedName,
    done: false
  });

  return true;
}

function addMissingToShoppingList(recipeId) {
  const recipe = recipes.find((item) => item.id === recipeId);
  if (!recipe) return;

  const missing = getMissingMainIngredients(recipe);

  if (missing.length === 0) {
    updateBuddyTextOnly("Für dieses Rezept fehlt dir nichts Wichtiges.");
    return;
  }

  const added = missing.filter(addShoppingItem);
  saveShoppingList();
  renderShoppingList();

  if (added.length === 0) {
    updateBuddyTextOnly("Die fehlenden Zutaten stehen schon auf deiner Einkaufsliste.");
  } else {
    updateBuddyTextOnly(`Auf die Einkaufsliste gesetzt: ${formatList(added)}.`);
  }

  if (shoppingListSection && "open" in shoppingListSection) {
    shoppingListSection.open = true;
  }

  shoppingListSection?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function toggleShoppingItem(name) {
  const normalizedName = canonicalIngredient(name);

  shoppingListItems = shoppingListItems.map((item) => {
    if (item.name === normalizedName) {
      return { ...item, done: !item.done };
    }

    return item;
  });

  saveShoppingList();
  renderShoppingList();
}

function removeShoppingItem(name) {
  const normalizedName = canonicalIngredient(name);
  shoppingListItems = shoppingListItems.filter((item) => item.name !== normalizedName);
  saveShoppingList();
  renderShoppingList();
}

function clearShoppingList() {
  shoppingListItems = [];
  saveShoppingList();
  renderShoppingList();
  updateBuddyTextOnly("Einkaufszettel geleert.");
}

function renderShoppingList() {
  if (!shoppingListItemsContainer) return;

  if (shoppingListSection) {
    shoppingListSection.classList.toggle("is-empty", shoppingListItems.length === 0);
  }

  if (shoppingListItems.length === 0) {
    shoppingListItemsContainer.innerHTML = `
      <div class="empty-state">
        Noch nichts auf der Liste. Öffne ein Rezept und tippe auf „Auf Einkaufsliste“.
      </div>
    `;
  } else {
    shoppingListItemsContainer.innerHTML = shoppingListItems
      .map((item) => {
        const label = displayIngredientName(item.name);

        return `
          <div class="shopping-list-item ${item.done ? "done" : ""}">
            <label>
              <input
                type="checkbox"
                ${item.done ? "checked" : ""}
                data-toggle-shopping="${escapeHtml(item.name)}"
              />
              <span>${escapeHtml(label)}</span>
            </label>

            <button
              class="chip-button"
              type="button"
              data-remove-shopping="${escapeHtml(item.name)}"
              aria-label="${escapeHtml(label)} von Einkaufsliste entfernen"
            >×</button>
          </div>
        `;
      })
      .join("");
  }

  if (copyShoppingListButton) copyShoppingListButton.disabled = shoppingListItems.length === 0;
  if (clearShoppingListButton) clearShoppingListButton.disabled = shoppingListItems.length === 0;

  document.querySelectorAll("[data-toggle-shopping]").forEach((input) => {
    input.addEventListener("change", () => toggleShoppingItem(input.dataset.toggleShopping || ""));
  });

  document.querySelectorAll("[data-remove-shopping]").forEach((button) => {
    button.addEventListener("click", () => removeShoppingItem(button.dataset.removeShopping || ""));
  });
}

function copyShoppingList() {
  if (shoppingListItems.length === 0) {
    updateBuddyTextOnly("Der Einkaufszettel ist leer.");
    return;
  }

  const text = shoppingListItems
    .map((item) => `${item.done ? "✓" : "•"} ${displayIngredientName(item.name)}`)
    .join("\n");

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(text)
      .then(() => updateBuddyTextOnly("Einkaufszettel kopiert. Sehr erwachsen von uns."))
      .catch(() => updateBuddyTextOnly("Kopieren hat leider nicht geklappt."));
  } else {
    updateBuddyTextOnly("Kopieren wird in diesem Browser nicht unterstützt.");
  }
}

function copyMissingIngredients(recipeId) {
  const recipe = recipes.find((item) => item.id === recipeId);
  if (!recipe) return;

  const missing = getMissingMainIngredients(recipe);

  if (missing.length === 0) {
    updateBuddyTextOnly("Da fehlt nichts Wichtiges. Der Einkaufszettel darf heute Pause machen.");
    return;
  }

  const text = missing.map(displayIngredientName).join(", ");

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(text)
      .then(() => updateBuddyTextOnly(`Kopiert: ${formatList(missing)}. Der Einkaufszettel kann kommen.`))
      .catch(() => updateBuddyTextOnly(`Fehlt noch: ${formatList(missing)}. Kopieren hat leider gezickt.`));
  } else {
    updateBuddyTextOnly(`Fehlt noch: ${formatList(missing)}.`);
  }
}

function setActiveFilter(filter) {
  activeFilter = filter;
  rescueModeActive = false;
  rescueRecipeIds = [];
  moreRecipesVisible = filter !== "all" || hasRecipeSearch();
  cachedDailyRecommendationPool = [];

  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === filter;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  renderAll();
}


function renderAppStats() {
  if (!appStatsGrid) return;

  const summerCount = recipes.filter((recipe) => (recipe.tags || []).includes("zu heiß zum kochen")).length;
  const airfryerCount = recipes.filter((recipe) => (recipe.tags || []).includes("heissluftfritteuse")).length;

  const stats = [
    { label: "Rezepte", value: recipes.length },
    { label: "Sommerideen", value: summerCount },
    { label: "Heißluftideen", value: airfryerCount },
    { label: "Favoriten", value: favoriteRecipeIds.length },
    { label: "Vorrat", value: pantryItems.length },
    { label: "Einkaufsliste", value: shoppingListItems.length }
  ];

  appStatsGrid.innerHTML = stats
    .map((item) => `
      <div class="stat-card">
        <strong>${escapeHtml(String(item.value))}</strong>
        <span>${escapeHtml(item.label)}</span>
      </div>
    `)
    .join("");
}

function renderAll() {
  refreshRecipes();

  renderQuickIngredients();
  renderSelectedIngredients();
  renderPantryItems();
  renderSmartSuggestions();
  renderRecommendations();
  renderRecipeResults();
  renderFavoritePreview();
  renderFavorites();
  renderRecentRecipes();
  renderShoppingList();
  renderAppStats();
  attachRecipeActionEvents();
  updateActiveNavByScroll();
}

function initWelcomeScreen() {
  const shouldHideWelcome = localStorage.getItem(HIDE_WELCOME_KEY) === "true";

  if (shouldHideWelcome && welcomeScreen) {
    welcomeScreen.classList.add("hidden");
  }
}

function startApp(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  if (appStartLocked) {
    return;
  }

  appStartLocked = true;

  if (rememberThemeCheckbox && rememberThemeCheckbox.checked) {
    localStorage.setItem(THEME_KEY, activeTheme);
  }

  if (hideWelcomeCheckbox && hideWelcomeCheckbox.checked) {
    localStorage.setItem(HIDE_WELCOME_KEY, "true");
  }

  if (welcomeScreen) {
    welcomeScreen.classList.add("hidden");
    welcomeScreen.setAttribute("aria-hidden", "true");
    welcomeScreen.style.display = "none";
  }

  const startSection = document.getElementById("start");

  if (startSection) {
    setTimeout(() => {
      startSection.scrollIntoView({ behavior: "smooth", block: "start" });
      appStartLocked = false;
    }, 120);
  } else {
    appStartLocked = false;
  }
}

function showWelcomeAgain() {
  localStorage.removeItem(HIDE_WELCOME_KEY);

  if (hideWelcomeCheckbox) hideWelcomeCheckbox.checked = false;
  if (welcomeScreen) {
    welcomeScreen.style.display = "";
    welcomeScreen.classList.remove("hidden");
    welcomeScreen.removeAttribute("aria-hidden");
  }

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
    if (section && !section.classList.contains("hidden") && section.offsetTop <= triggerPoint) {
      currentId = section.id;
    }
  });

  setActiveNav(currentId);
}

function initNav() {
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      if (link.dataset.nav === "favorites" && favoriteRecipeIds.length > 0) {
        favoritesVisible = true;
        renderAll();
      }

      setActiveNav(link.dataset.nav);
      setTimeout(updateActiveNavByScroll, 350);
    });
  });

  window.addEventListener("scroll", updateActiveNavByScroll);
  window.addEventListener("load", updateActiveNavByScroll);
  window.addEventListener("resize", updateActiveNavByScroll);
}


function eventHitsStartButton(event) {
  if (!startAppButton) {
    return false;
  }

  const rect = startAppButton.getBoundingClientRect();
  let point = null;

  if (event.touches && event.touches.length > 0) {
    point = event.touches[0];
  } else if (event.changedTouches && event.changedTouches.length > 0) {
    point = event.changedTouches[0];
  } else if (typeof event.clientX === "number" && typeof event.clientY === "number") {
    point = event;
  }

  if (!point) {
    return false;
  }

  return (
    point.clientX >= rect.left &&
    point.clientX <= rect.right &&
    point.clientY >= rect.top &&
    point.clientY <= rect.bottom
  );
}

function handleStartButtonFallback(event) {
  if (!welcomeScreen || welcomeScreen.classList.contains("hidden")) {
    return;
  }

  const target = event.target && event.target.closest ? event.target.closest("#startAppButton") : null;

  if (target || eventHitsStartButton(event)) {
    startApp(event);
  }
}


function bindEvents() {
  if (addIngredientButton) {
    addIngredientButton.addEventListener("click", () => addIngredient(ingredientInput ? ingredientInput.value : ""));
  }

  if (ingredientInput) {
    ingredientInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") addIngredient(ingredientInput.value);
    });
  }

  if (findRecipesButton) {
    findRecipesButton.addEventListener("click", submitIngredientSearch);
  }

  if (clearSelectedIngredientsButton) {
    clearSelectedIngredientsButton.addEventListener("click", clearSelectedIngredients);
  }

  if (recipeSearchInput) {
    recipeSearchInput.addEventListener("input", () => {
      recipeSearchTerm = recipeSearchInput.value || "";
      rescueModeActive = false;
      rescueRecipeIds = [];
      moreRecipesVisible = true;
      cachedDailyRecommendationPool = [];
      renderAll();
    });
  }

  if (clearRecipeSearchButton) {
    clearRecipeSearchButton.addEventListener("click", () => {
      recipeSearchTerm = "";
      rescueModeActive = false;
      rescueRecipeIds = [];

      if (recipeSearchInput) {
        recipeSearchInput.value = "";
        recipeSearchInput.focus();
      }

      renderAll();
    });
  }

  if (recipeSortSelect) {
    recipeSortSelect.addEventListener("change", () => {
      activeSort = recipeSortSelect.value || "smart";
      moreRecipesVisible = hasBrowseCriteria();
      renderAll();
    });
  }

  if (surpriseRecipeButton) {
    surpriseRecipeButton.addEventListener("click", surpriseRecipe);
  }

  if (homeSurpriseButton) {
    homeSurpriseButton.addEventListener("click", surpriseRecipe);
  }

  if (noMoodButton) {
    noMoodButton.addEventListener("click", rescueDinner);
  }

  homeActionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.dataset.homeScroll || "";
      const target = document.getElementById(targetId);

      if (!target) return;

      if (target.tagName === "DETAILS") {
        target.open = true;
      }

      target.scrollIntoView({ behavior: "smooth", block: "start" });

      if (target instanceof HTMLInputElement) {
        setTimeout(() => target.focus(), 250);
      } else {
        const input = target.querySelector("input, select, button");
        if (input) setTimeout(() => input.focus(), 250);
      }
    });
  });

  if (exportFavoritesButton) {
    exportFavoritesButton.addEventListener("click", exportFavorites);
  }

  if (clearFavoritesButton) {
    clearFavoritesButton.addEventListener("click", clearFavorites);
  }

  if (clearRecentButton) {
    clearRecentButton.addEventListener("click", clearRecentRecipes);
  }

  if (addPantryButton) {
    addPantryButton.addEventListener("click", () => addPantryItem(pantryInput ? pantryInput.value : ""));
  }

  if (pantryInput) {
    pantryInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") addPantryItem(pantryInput.value);
    });
  }

  pantryQuickButtons.forEach((button) => {
    button.addEventListener("click", () => addPantryItem(button.dataset.pantryQuick || ""));
  });

  if (clearPantryButton) {
    clearPantryButton.addEventListener("click", clearPantry);
  }

  if (copyShoppingListButton) {
    copyShoppingListButton.addEventListener("click", copyShoppingList);
  }

  if (clearShoppingListButton) {
    clearShoppingListButton.addEventListener("click", clearShoppingList);
  }

  if (toggleMoreIngredientsButton) {
    toggleMoreIngredientsButton.addEventListener("click", () => {
      moreIngredientsVisible = !moreIngredientsVisible;
      renderQuickIngredients();
    });
  }

  if (toggleMoreRecipesButton) {
    toggleMoreRecipesButton.addEventListener("click", () => {
      moreRecipesVisible = !moreRecipesVisible;
      renderAll();

      if (moreRecipesVisible) {
        setTimeout(() => {
          recipeResults?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 80);
      }
    });
  }

  if (showFavoritesButton) {
    showFavoritesButton.addEventListener("click", () => {
      favoritesVisible = !favoritesVisible;
      renderAll();

      if (favoritesVisible) {
        setTimeout(() => {
          favoritesSection?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 80);
      }
    });
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => setActiveFilter(button.dataset.filter || "all"));
  });

  if (airfryerShortcutButton) {
    airfryerShortcutButton.addEventListener("click", () => {
      setActiveFilter("heissluftfritteuse");
      recipesSection?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  themeOptionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedTheme = button.dataset.themeOption || "standard";
      const shouldSave = rememberThemeCheckbox ? rememberThemeCheckbox.checked : false;

      setTheme(selectedTheme, shouldSave);
      updateBuddyMessage();
    });
  });

  moodOptionButtons.forEach((button) => {
    button.addEventListener("click", () => setMood(button.dataset.mood || "normal"));
  });

  if (rememberThemeCheckbox) {
    rememberThemeCheckbox.addEventListener("change", () => {
      if (rememberThemeCheckbox.checked) localStorage.setItem(THEME_KEY, activeTheme);
      else localStorage.removeItem(THEME_KEY);
    });
  }

  if (startAppButton) {
    startAppButton.addEventListener("click", startApp);
    startAppButton.addEventListener("touchend", startApp, { passive: false });
    startAppButton.addEventListener("pointerup", startApp);
  }

  document.addEventListener("pointerdown", handleStartButtonFallback, true);
  document.addEventListener("touchstart", handleStartButtonFallback, { capture: true, passive: false });
  document.addEventListener("mousedown", handleStartButtonFallback, true);
  document.addEventListener("click", handleStartButtonFallback, true);
  if (showWelcomeButton) showWelcomeButton.addEventListener("click", showWelcomeAgain);

  if (dailyRecommendationButton) {
    dailyRecommendationButton.addEventListener("click", () => recommendDailyRecipe(false));
  }

  if (dailyRecommendationAgainButton) {
    dailyRecommendationAgainButton.addEventListener("click", () => recommendDailyRecipe(true));
  }

  if (dailyRecommendationResult) {
    dailyRecommendationResult.addEventListener("click", (event) => {
      const target = event.target.closest("[data-open-daily-recipe]");
      if (target) openRecipeModal(Number(target.dataset.openDailyRecipe));
    });
  }

  if (closeModalButton) closeModalButton.addEventListener("click", closeRecipeModal);
  if (modalBackdrop) modalBackdrop.addEventListener("click", closeRecipeModal);

  if (confirmUpdateFlyerButton) {
    confirmUpdateFlyerButton.addEventListener("click", () => closeUpdateFlyer(true));
  }

  if (showUpdateLaterButton) {
    showUpdateLaterButton.addEventListener("click", () => closeUpdateFlyer(false));
  }

  if (closeUpdateFlyerButton) {
    closeUpdateFlyerButton.addEventListener("click", () => closeUpdateFlyer(false));
  }

  if (updateFlyerBackdrop) {
    updateFlyerBackdrop.addEventListener("click", () => closeUpdateFlyer(false));
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeRecipeModal();
      closeUpdateFlyer(false);
    }
  });
}

window.kuechenkumpelStartApp = startApp;

function initApp() {
  refreshRecipes();

  bindEvents();
  loadFavorites();
  loadPantry();
  loadShoppingList();
  loadRecentRecipes();
  initTheme();
  initMood();
  initWelcomeScreen();
  updateBuddyMessage();
  renderAll();
  initNav();
  initUpdateFlyer();

  if (!recipes.length) {
    updateBuddyTextOnly("Ich finde gerade keine Rezepte. Schau bitte, ob die Rezeptdateien vor app.js geladen werden.");
  }
}

initApp();
