const welcomeScreen = document.getElementById("welcomeScreen");
const startAppButton = document.getElementById("startAppButton");
const hideWelcomeCheckbox = document.getElementById("hideWelcomeCheckbox");
const showWelcomeButton = document.getElementById("showWelcomeButton");

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
  { name: "quark", label: "🥣 Quark" },
  { name: "thunfisch", label: "🐟 Thunfisch" },
  { name: "hackfleisch", label: "🥩 Hack" },
  { name: "hähnchen", label: "🍗 Hähnchen" }
];

function createDishesText(value) {
  if (value === "wenig") {
    return "Ein bisschen Abwasch, aber kein Drama.";
  }

  if (value === "mittel") {
    return "Geht klar. Kein Küchen-Tatort.";
  }

  return "Lecker, aber danach will die Spüle kurz reden.";
}

function createCostText(value) {
  if (value === "günstig") {
    return "Tut dem Konto nicht weh.";
  }

  if (value === "normal") {
    return "Solide Mitte. Kein Sparmenü, kein Festbankett.";
  }

  return "Etwas feiner. Für Tage, an denen der Kühlschrank kurz angeben darf.";
}

const baseRecipes = [
  {
    id: 1,
    title: "Cremige Käse-Nudeln",
    main: ["nudeln", "käse", "milch"],
    alternatives: ["sahne"],
    optional: ["zwiebel", "knoblauch", "tomaten"],
    tags: ["schnell", "günstig", "vegetarisch", "kein bock"],
    time: "20 Minuten",
    dishes: "wenig",
    dishesText: "Ein Topf, eine Pfanne, kein Drama.",
    cost: "günstig",
    costText: "Tut dem Konto nicht weh.",
    filling: "macht satt",
    feeling: "Soulfood",
    saying: "Nudeln, Käse und Hoffnung. Mehr braucht es manchmal wirklich nicht.",
    steps: [
      "Nudeln in Salzwasser kochen.",
      "Etwas Milch oder Sahne in einer Pfanne erwärmen.",
      "Käse einrühren, bis es cremig wird.",
      "Nudeln dazugeben und alles gut vermengen.",
      "Mit Salz, Pfeffer und nach Lust würzen. Wenn es zu dick wird, hilft ein kleiner Schluck Nudelwasser."
    ]
  },
  {
    id: 2,
    title: "Tomaten-Zwiebel-Pasta",
    main: ["nudeln", "tomaten", "zwiebel"],
    alternatives: [],
    optional: ["knoblauch", "käse", "basilikum"],
    tags: ["schnell", "günstig", "vegetarisch"],
    time: "20 Minuten",
    dishes: "wenig",
    dishesText: "Ein Topf und eine Pfanne. Das ist noch fair.",
    cost: "günstig",
    costText: "Solide Küche ohne Einkaufszettel-Schock.",
    filling: "macht satt",
    feeling: "Alltagsküche",
    saying: "Einfach, ehrlich, warm. So sieht Feierabend auf dem Teller aus.",
    steps: [
      "Nudeln kochen.",
      "Zwiebel klein schneiden und in etwas Öl anbraten.",
      "Tomaten dazugeben und ein paar Minuten köcheln lassen.",
      "Mit Salz, Pfeffer und Kräutern abschmecken.",
      "Nudeln unterheben. Käse oben drauf ist kein Muss, aber ganz ehrlich: schadet selten."
    ]
  },
  {
    id: 3,
    title: "Eier-Nudeln aus der Pfanne",
    main: ["nudeln", "eier", "käse"],
    alternatives: [],
    optional: ["zwiebel", "speck", "tomaten"],
    tags: ["schnell", "günstig", "kein bock"],
    time: "15 Minuten",
    dishes: "wenig",
    dishesText: "Ein Topf, eine Pfanne. Danach brauchst du keine Spül-Konferenz.",
    cost: "günstig",
    costText: "Satt werden, ohne das Konto zu beleidigen.",
    filling: "macht satt",
    feeling: "Kein-Bock-Retter",
    saying: "Das ist kein Rezept, das ist ein Rettungsplan mit Ei.",
    steps: [
      "Gekochte Nudeln in eine Pfanne geben.",
      "Eier in einer Schüssel verquirlen.",
      "Eier über die Nudeln geben und bei mittlerer Hitze stocken lassen.",
      "Käse dazugeben und alles vorsichtig vermengen.",
      "Würzen und direkt essen, solange es schön saftig ist."
    ]
  },
  {
    id: 4,
    title: "Thunfisch-Pasta",
    main: ["nudeln", "thunfisch"],
    alternatives: ["tomaten", "frischkäse"],
    optional: ["mais", "zwiebel", "käse"],
    tags: ["schnell", "proteinreich", "vorrat"],
    time: "20 Minuten",
    dishes: "wenig",
    dishesText: "Überschaubar. Die Spüle bleibt entspannt.",
    cost: "normal",
    costText: "Kein Luxus, aber auch nicht nur Toast und Hoffnung.",
    filling: "macht satt",
    feeling: "Alltagsküche",
    saying: "Dose auf, Nudeln rein, Hunger leise. Läuft.",
    steps: [
      "Nudeln kochen.",
      "Thunfisch abtropfen lassen.",
      "In einer Pfanne Tomaten oder Frischkäse erwärmen.",
      "Thunfisch dazugeben und nur kurz mitziehen lassen.",
      "Nudeln untermischen und abschmecken. Mais oder Zwiebel passen gut rein, wenn noch was da ist."
    ]
  },
  {
    id: 5,
    title: "Gemüse-Nudelpfanne",
    main: ["nudeln", "gemüse", "zwiebel"],
    alternatives: [],
    optional: ["käse", "eier", "sahne"],
    tags: ["muss weg", "vegetarisch", "günstig"],
    time: "25 Minuten",
    dishes: "mittel",
    dishesText: "Geht klar. Kein Küchen-Tatort.",
    cost: "günstig",
    costText: "Perfekt, wenn Gemüse weg muss und du nicht neu einkaufen willst.",
    filling: "macht satt",
    feeling: "frisch",
    saying: "Das Gemüse wollte eh langsam mal ernst genommen werden.",
    steps: [
      "Nudeln kochen.",
      "Gemüse und Zwiebel klein schneiden.",
      "Alles in einer Pfanne anbraten, bis das Gemüse etwas Farbe bekommt.",
      "Nudeln dazugeben und kurz mitbraten.",
      "Mit Gewürzen abschmecken. Käse, Ei oder ein Schuss Sahne machen das Ganze runder."
    ]
  },
  {
    id: 6,
    title: "Schinken-Käse-Nudeln",
    main: ["nudeln", "schinken", "käse"],
    alternatives: ["sahne", "milch"],
    optional: ["zwiebel", "erbsen"],
    tags: ["schnell", "herzhaft", "soulfood"],
    time: "20 Minuten",
    dishes: "wenig",
    dishesText: "Ein bisschen was, aber kein Drama.",
    cost: "normal",
    costText: "Solide Mitte. Nicht billig, nicht abgehoben.",
    filling: "macht satt",
    feeling: "Soulfood",
    saying: "Deftig, cremig, fertig. Genau so muss das manchmal sein.",
    steps: [
      "Nudeln kochen.",
      "Schinken klein schneiden und kurz anbraten.",
      "Etwas Milch oder Sahne dazugeben.",
      "Käse einrühren, bis eine cremige Soße entsteht.",
      "Nudeln dazugeben, alles vermengen und würzen. Das ist deftig, schnell und macht keine langen Diskussionen."
    ]
  },
  {
    id: 7,
    title: "Knoblauch-Öl-Nudeln",
    main: ["nudeln", "öl", "knoblauch"],
    alternatives: [],
    optional: ["chili", "käse", "petersilie"],
    tags: ["schnell", "günstig", "kein bock", "vegetarisch"],
    time: "15 Minuten",
    dishes: "wenig",
    dishesText: "Minimaler Abwasch. Genau der richtige Film.",
    cost: "günstig",
    costText: "Das ist Vorratsküche im besten Sinne.",
    filling: "leicht bis satt",
    feeling: "Kein-Bock-Retter",
    saying: "Wenig Zutaten, aber ordentlich Charakter in der Pfanne.",
    steps: [
      "Nudeln kochen und etwas Nudelwasser aufheben.",
      "Knoblauch klein schneiden.",
      "Öl in einer Pfanne erwärmen und Knoblauch kurz anbraten, aber nicht verbrennen lassen.",
      "Nudeln dazugeben und alles vermengen.",
      "Mit Salz, Pfeffer und nach Lust Chili abschmecken. Wenn es trocken wirkt, hilft etwas Nudelwasser."
    ]
  },
  {
    id: 8,
    title: "Nudelauflauf mit Resten",
    main: ["nudeln", "gemüse", "käse"],
    alternatives: ["milch", "sahne"],
    optional: ["schinken", "tomaten", "eier"],
    tags: ["muss weg", "herzhaft", "ofen"],
    time: "35 Minuten",
    dishes: "mittel",
    dishesText: "Auflauf heißt: lecker, aber die Form will später Aufmerksamkeit.",
    cost: "normal",
    costText: "Kein Festbankett, aber etwas mehr als Nur-Nudeln.",
    filling: "richtig deftig",
    feeling: "Soulfood",
    saying: "Alles rein, Käse drüber, Ofen macht den Rest. Stabile Nummer.",
    steps: [
      "Nudeln vorkochen.",
      "Gemüse oder andere Reste klein schneiden.",
      "Alles in eine Auflaufform geben.",
      "Milch oder Sahne mit Gewürzen verrühren und darübergeben.",
      "Käse drüberstreuen und bei etwa 180 Grad backen, bis es goldig aussieht."
    ]
  },
  {
    id: 9,
    title: "Bratreis mit Ei",
    main: ["reis", "eier", "gemüse", "zwiebel"],
    alternatives: [],
    optional: ["sojasoße", "hähnchen", "erbsen"],
    tags: ["schnell", "günstig", "muss weg"],
    time: "20 Minuten",
    dishes: "wenig",
    dishesText: "Eine Pfanne macht fast alles. Das ist fair.",
    cost: "günstig",
    costText: "Reis von gestern bekommt heute seinen zweiten Auftritt.",
    filling: "macht satt",
    feeling: "Alltagsküche",
    saying: "Reis von gestern? Heute wird er nochmal wichtig.",
    steps: [
      "Gekochten Reis nehmen, am besten vom Vortag.",
      "Gemüse und Zwiebel klein schneiden und anbraten.",
      "Reis dazugeben und gut mitbraten.",
      "Ei in die Pfanne schlagen und unterrühren.",
      "Mit Salz, Pfeffer oder Sojasoße abschmecken. Der Reis darf ruhig ein bisschen Röstaroma bekommen."
    ]
  },
  {
    id: 10,
    title: "Gemüse-Reis-Pfanne",
    main: ["reis", "gemüse"],
    alternatives: [],
    optional: ["eier", "käse", "joghurt"],
    tags: ["vegetarisch", "günstig", "muss weg"],
    time: "25 Minuten",
    dishes: "wenig",
    dishesText: "Eine Pfanne, ein Brett, fertig. Damit kann man leben.",
    cost: "günstig",
    costText: "Mehr Resteverwertung als Shoppingtour.",
    filling: "macht satt",
    feeling: "frisch",
    saying: "Bisschen Reis, bisschen Gemüse, plötzlich sieht es nach Plan aus.",
    steps: [
      "Reis kochen oder fertigen Reis nehmen.",
      "Gemüse klein schneiden.",
      "Gemüse in einer Pfanne anbraten.",
      "Reis dazugeben und alles zusammen warm werden lassen.",
      "Würzen und nach Wunsch mit Joghurt-Dip, Ei oder Käse ergänzen. Simpel, aber stabil."
    ]
  }
];

const additionalRecipes = [
  ["Tomatenreis", ["reis", "tomaten", "zwiebel"], ["paprika", "käse", "kräuter"], ["günstig", "vegetarisch", "vorrat"], "25 Minuten", "wenig", "günstig", "macht satt", "Alltagsküche", "Simpel, warm und macht satt. Kein Drama, nur Essen."],
  ["Curry-Reis mit Gemüse", ["reis", "gemüse", "curry"], ["sahne", "milch", "kokosmilch"], ["vegetarisch", "modern", "muss weg"], "25 Minuten", "mittel", "normal", "macht satt", "frisch", "Wenn der Kühlschrank müde aussieht, hilft Curry erstaunlich oft."],
  ["Reis mit Thunfisch und Mais", ["reis", "thunfisch", "mais"], ["joghurt", "zwiebel", "gurke"], ["schnell", "proteinreich", "vorrat"], "20 Minuten", "wenig", "normal", "macht satt", "Alltagsküche", "Nicht schick, aber sehr zuverlässig. Wie ein guter alter Hoodie."],
  ["Reis-Bohnen-Pfanne", ["reis", "bohnen", "tomaten"], ["mais", "paprika", "käse"], ["günstig", "vorrat", "proteinreich"], "25 Minuten", "wenig", "günstig", "richtig deftig", "Alltagsküche", "Günstig, sattmachend und stärker als sie aussieht."],
  ["Bratkartoffeln mit Ei", ["kartoffeln", "eier", "zwiebel"], ["speck", "käse", "gewürzgurke"], ["günstig", "herzhaft", "klassisch"], "30 Minuten", "mittel", "günstig", "richtig deftig", "Soulfood", "Das ist bodenständig. Das ist ehrlich. Das ist eine gute Entscheidung."],
  ["Kartoffel-Gemüse-Pfanne", ["kartoffeln", "gemüse", "zwiebel"], ["eier", "käse", "quark"], ["muss weg", "günstig", "vegetarisch"], "30 Minuten", "mittel", "günstig", "macht satt", "Alltagsküche", "Die Pfanne sagt: Wir räumen heute den Kühlschrank auf."],
  ["Kartoffelauflauf", ["kartoffeln", "käse", "milch"], ["sahne", "gemüse", "schinken"], ["herzhaft", "ofen", "soulfood"], "40 Minuten", "mittel", "normal", "richtig deftig", "Soulfood", "Käse drauf und plötzlich ist alles ein bisschen besser."],
  ["Ofenkartoffeln mit Quark", ["kartoffeln", "quark"], ["joghurt", "kräuter", "gurke", "knoblauch"], ["günstig", "vegetarisch", "wenig abwasch"], "35 Minuten", "wenig", "günstig", "macht satt", "Alltagsküche", "Wenig Theater, viel Sättigung. Genau mein Tempo."],
  ["Kartoffelsuppe", ["kartoffeln", "möhren", "zwiebel"], ["würstchen", "sahne", "lauch"], ["günstig", "klassisch", "muss weg"], "35 Minuten", "mittel", "günstig", "macht satt", "Alltagsküche", "Warm, günstig und macht innen kurz das Licht an."],
  ["Bauernfrühstück", ["kartoffeln", "eier", "zwiebel"], ["speck", "schinken", "käse"], ["herzhaft", "günstig", "deftig"], "30 Minuten", "mittel", "normal", "richtig deftig", "Soulfood", "Das ist kein Frühstück. Das ist eine Ansage."],
  ["Tomaten-Omelett", ["eier", "tomaten", "zwiebel"], ["käse", "paprika", "kräuter"], ["schnell", "vegetarisch", "günstig"], "15 Minuten", "wenig", "günstig", "leicht bis satt", "frisch", "Schnell gemacht und trotzdem nicht traurig. Gute Kombi."],
  ["Käse-Omelett", ["eier", "käse"], ["zwiebel", "tomaten", "schinken"], ["schnell", "kein bock", "proteinreich"], "12 Minuten", "wenig", "günstig", "macht satt", "Kein-Bock-Retter", "Ei und Käse regeln mehr Probleme, als man denkt."],
  ["Gemüse-Rührei", ["eier", "gemüse", "zwiebel"], ["käse", "brot", "kräuter"], ["schnell", "muss weg", "proteinreich"], "15 Minuten", "wenig", "günstig", "macht satt", "frisch", "Das Gemüse verschwindet nicht. Es wird einfach Teil vom Plan."],
  ["Shakshuka einfach", ["eier", "tomaten", "zwiebel"], ["paprika", "feta", "chili"], ["modern", "vegetarisch", "proteinreich"], "25 Minuten", "wenig", "normal", "macht satt", "frisch", "Sieht nach mehr aus, als es Arbeit macht. Mag ich."],
  ["Ei im Toastloch", ["brot", "eier"], ["käse", "schinken", "tomaten"], ["schnell", "günstig", "kein bock"], "10 Minuten", "wenig", "günstig", "leicht bis satt", "Kein-Bock-Retter", "Kleines Essen, großer Trick. Der Toast hat heute Hauptrolle."],
  ["Käsetoast aus der Pfanne", ["brot", "käse"], ["tomaten", "schinken", "zwiebel"], ["schnell", "günstig", "kein bock"], "10 Minuten", "wenig", "günstig", "macht satt", "Kein-Bock-Retter", "Wenn nichts mehr geht, geht Käsetoast. Küchenregel Nummer eins."],
  ["Brotpizza", ["brot", "tomaten", "käse"], ["schinken", "mais", "paprika"], ["schnell", "muss weg", "günstig"], "15 Minuten", "wenig", "günstig", "macht satt", "Soulfood", "Kein Pizzateig? Kein Problem. Brot macht heute Überstunden."],
  ["Überbackene Brötchenhälften", ["brötchen", "käse"], ["gemüse", "schinken", "tomaten"], ["muss weg", "schnell", "ofen"], "18 Minuten", "wenig", "günstig", "macht satt", "Alltagsküche", "Alte Brötchen, neuer Auftritt. Käse sei Dank."],
  ["Herzhafte Arme Ritter", ["brot", "eier", "milch", "käse"], ["schinken", "kräuter", "tomaten"], ["günstig", "reste", "herzhaft"], "18 Minuten", "mittel", "günstig", "macht satt", "Soulfood", "Aus altem Brot wird plötzlich was, worauf man sich freut."],
  ["Knoblauchbrot mit Dip", ["brot", "knoblauch"], ["butter", "öl", "joghurt", "quark"], ["schnell", "günstig", "beilage"], "12 Minuten", "wenig", "günstig", "leicht", "Kein-Bock-Retter", "Nicht das ganze Abendessen, aber ein sehr guter Anfang."],
  ["Alles-muss-weg-Gemüsepfanne", ["gemüse", "zwiebel"], ["reis", "nudeln", "eier", "käse"], ["muss weg", "vegetarisch", "günstig"], "25 Minuten", "mittel", "günstig", "macht satt", "frisch", "Heute kriegt jedes traurige Gemüse nochmal Applaus."],
  ["Gemüseauflauf", ["gemüse", "käse", "milch"], ["sahne", "kartoffeln", "nudeln"], ["muss weg", "ofen", "vegetarisch"], "35 Minuten", "mittel", "normal", "richtig deftig", "Soulfood", "Gemüse unten, Käse oben. So verkauft man Vernunft."],
  ["Gemüsesuppe", ["gemüse", "brühe"], ["kartoffeln", "reis", "nudeln"], ["muss weg", "günstig", "leicht"], "30 Minuten", "mittel", "günstig", "leicht bis satt", "frisch", "Alles rein, warm machen, fertig. Der Topf übernimmt."],
  ["Ofengemüse", ["gemüse", "öl"], ["kartoffeln", "quark", "feta"], ["muss weg", "vegetarisch", "wenig abwasch"], "35 Minuten", "wenig", "günstig", "macht satt", "frisch", "Schneiden, würzen, ab in den Ofen. Mehr Motivation war nicht nötig."],
  ["Paprika-Ei-Pfanne", ["paprika", "eier", "zwiebel"], ["käse", "tomaten", "brot"], ["schnell", "muss weg", "vegetarisch"], "18 Minuten", "wenig", "günstig", "macht satt", "frisch", "Die Paprika hatte noch Pläne. Heute erfüllt sie sie."],
  ["Zucchini-Tomaten-Pfanne", ["zucchini", "tomaten", "zwiebel"], ["reis", "nudeln", "käse"], ["vegetarisch", "muss weg", "leicht"], "20 Minuten", "wenig", "günstig", "leicht bis satt", "frisch", "Leicht, frisch und ohne großes Küchen-Drama."],
  ["Gemüse-Curry", ["gemüse", "curry", "reis"], ["sahne", "milch", "kokosmilch"], ["modern", "vegetarisch", "muss weg"], "30 Minuten", "mittel", "normal", "macht satt", "frisch", "Curry ist wie ein Zaubertrick für Restegemüse."],
  ["Hack-Nudel-Pfanne", ["hackfleisch", "nudeln", "tomaten"], ["käse", "zwiebel", "paprika"], ["herzhaft", "schnell", "macht satt"], "25 Minuten", "mittel", "normal", "richtig deftig", "Soulfood", "Das ist Feierabendküche mit stabiler Schulterbreite."],
  ["Hack-Reis-Pfanne", ["hackfleisch", "reis", "gemüse"], ["tomaten", "käse", "mais"], ["herzhaft", "alltag"], "30 Minuten", "mittel", "normal", "richtig deftig", "Alltagsküche", "Macht satt, macht Sinn, macht nicht unnötig kompliziert."],
  ["Hähnchen-Curry einfach", ["hähnchen", "reis", "curry"], ["gemüse", "sahne", "kokosmilch"], ["proteinreich", "modern", "macht satt"], "30 Minuten", "mittel", "etwas teurer", "macht satt", "frisch", "Ein bisschen Curry, ein bisschen Hähnchen, direkt bessere Laune."],
  ["Hähnchen-Gemüse-Pfanne", ["hähnchen", "gemüse"], ["reis", "nudeln", "joghurt"], ["proteinreich", "muss weg", "alltag"], "30 Minuten", "mittel", "etwas teurer", "macht satt", "Alltagsküche", "Gemüse muss weg, Hähnchen hilft. Teamwork in der Pfanne."],
  ["Wurst-Kartoffel-Pfanne", ["wurst", "kartoffeln", "zwiebel"], ["eier", "paprika", "gurke"], ["herzhaft", "günstig", "deftig"], "30 Minuten", "mittel", "normal", "richtig deftig", "Soulfood", "Nicht fein, aber ehrlich. Und ehrlich macht manchmal am sattesten."],
  ["Bohnen-Chili einfach", ["bohnen", "tomaten", "mais"], ["reis", "käse", "hackfleisch"], ["vorrat", "günstig", "proteinreich"], "30 Minuten", "wenig", "günstig", "richtig deftig", "Alltagsküche", "Der Vorratsschrank zeigt heute, was er kann."],
  ["Linsen-Dal einfach", ["linsen", "curry", "tomaten"], ["reis", "joghurt", "gemüse"], ["vorrat", "vegetarisch", "proteinreich"], "30 Minuten", "mittel", "günstig", "macht satt", "frisch", "Günstig, warm und deutlich besser, als es trocken im Schrank aussah."],
  ["Tomatensuppe aus Vorrat", ["tomaten", "zwiebel", "brühe"], ["sahne", "brot", "käse"], ["vorrat", "günstig", "vegetarisch"], "20 Minuten", "wenig", "günstig", "leicht bis satt", "Alltagsküche", "Dosentomaten können mehr, als nur traurig im Schrank stehen."],
  ["TK-Gemüse-Reis-Pfanne", ["tk-gemüse", "reis"], ["eier", "sojasoße", "hähnchen"], ["schnell", "vorrat", "günstig"], "20 Minuten", "wenig", "günstig", "macht satt", "Kein-Bock-Retter", "Tiefkühlfach auf, Plan gefunden. So einfach darf es sein."],
  ["Frischkäse-Pasta", ["nudeln", "frischkäse", "gemüse"], ["tomaten", "knoblauch", "käse"], ["schnell", "vegetarisch", "cremig"], "20 Minuten", "wenig", "normal", "macht satt", "Soulfood", "Cremig ohne großes Theater. Genau dafür ist Frischkäse da."],
  ["Quark-Kartoffeln", ["kartoffeln", "quark"], ["kräuter", "gurke", "knoblauch"], ["günstig", "vegetarisch", "klassisch"], "30 Minuten", "wenig", "günstig", "macht satt", "Alltagsküche", "Klassiker aus gutem Grund. Satt, günstig, entspannt."],
  ["Pfannkuchen einfach", ["mehl", "milch", "eier"], ["zucker", "apfel", "quark"], ["süß", "günstig", "einfach"], "25 Minuten", "mittel", "günstig", "macht satt", "Soulfood", "Süß, einfach und irgendwie immer eine kleine Belohnung."],
  ["Haferflocken-Porridge", ["haferflocken", "milch"], ["wasser", "banane", "apfel", "zimt"], ["frühstück", "günstig", "schnell"], "10 Minuten", "wenig", "günstig", "leicht bis satt", "frisch", "Warm, schnell und deutlich freundlicher als leerer Magen."]
];

const recipes = [
  ...baseRecipes,
  ...additionalRecipes.map((item, index) => ({
    id: index + 11,
    title: item[0],
    main: item[1],
    alternatives: [],
    optional: item[2],
    tags: item[3],
    time: item[4],
    dishes: item[5],
    dishesText: createDishesText(item[5]),
    cost: item[6],
    costText: createCostText(item[6]),
    filling: item[7],
    feeling: item[8],
    saying: item[9],
    steps: [
      "Zutaten vorbereiten und alles klein schneiden, was in die Pfanne oder den Topf soll.",
      "Die Hauptzutaten nach und nach garen, damit nichts matschig wird.",
      "Optionales dazugeben, wenn es passt und weg muss.",
      "Mit Salz, Pfeffer und passenden Gewürzen abschmecken.",
      "Kurz probieren und nach Gefühl nachwürzen. Die genaue Zubereitung wird im nächsten Ausbau noch sauber ausgearbeitet."
    ]
  }))
];

function normalize(value) {
  return value.trim().toLowerCase();
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function formatList(items) {
  if (items.length === 0) return "";
  if (items.length === 1) return capitalize(items[0]);
  if (items.length === 2) return `${capitalize(items[0])} und ${items[1]}`;
  return `${items.slice(0, -1).map(capitalize).join(", ")} und ${items[items.length - 1]}`;
}

function ingredientExists(name) {
  return selectedIngredients.some((ingredient) => ingredient.name === name);
}

function addIngredient(name) {
  const normalizedName = normalize(name);

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

function hasIngredient(recipeIngredient, selectedNames) {
  if (selectedNames.includes(recipeIngredient)) return true;

  if (recipeIngredient === "milch" && selectedNames.includes("sahne")) return true;
  if (recipeIngredient === "sahne" && selectedNames.includes("milch")) return true;
  if (recipeIngredient === "tomaten" && selectedNames.includes("dosentomaten")) return true;

  if (
    recipeIngredient === "gemüse" &&
    selectedNames.some((name) =>
      ["paprika", "zucchini", "möhren", "tk-gemüse"].includes(name)
    )
  ) {
    return true;
  }

  if (recipeIngredient === "brot" && selectedNames.includes("brötchen")) return true;

  return false;
}

function scoreRecipe(recipe) {
  const selectedNames = getSelectedNames();
  const urgentNames = getUrgentNames();

  const matchingMain = recipe.main.filter((ingredient) =>
    hasIngredient(ingredient, selectedNames)
  );
  const missingMain = recipe.main.filter(
    (ingredient) => !hasIngredient(ingredient, selectedNames)
  );
  const matchingOptional = recipe.optional.filter((ingredient) =>
    hasIngredient(ingredient, selectedNames)
  );

  let score = matchingMain.length * 4 + matchingOptional.length;

  urgentNames.forEach((urgentName) => {
    if (recipe.main.includes(urgentName) || recipe.optional.includes(urgentName)) {
      score += 5;
    }

    if (urgentName === "paprika" && recipe.main.includes("gemüse")) {
      score += 3;
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
      score += 2;
    }
    if (recipe.tags.includes("ofen")) score -= 4;
  }

  if (activeFilter !== "all") {
    if (recipe.tags.includes(activeFilter)) {
      score += 4;
    } else {
      score -= 6;
    }
  }

  return {
    recipe,
    matchingMain,
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
    .filter((item) => item.matchingMain.length > 0 || item.matchingOptional.length > 0)
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);
}

function updateBuddyTextOnly(text) {
  buddyMessage.innerHTML = `
    <img
      class="buddy-mascot"
      src="assets/images/kochtopf-idee.png"
      alt=""
      aria-hidden="true"
    />

    <div>
      <strong>Küchenkumpel sagt:</strong>
      <span>${text}</span>
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
        removeIngredient(ingredient.name);
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
      <span>${capitalize(ingredient.name)}</span>
      <button class="clock-button" type="button" title="Muss weg markieren">${ingredient.urgent ? "⏰" : "○"}</button>
      <button class="chip-button" type="button" title="Entfernen">×</button>
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
  const { recipe, matchingMain, missingMain, matchingOptional } = match;
  const cardClass = isRecommendation ? "recommendation-card" : "recipe-card";

  const missingText = missingMain.length > 0
    ? `Fehlt noch: ${formatList(missingMain)}`
    : "Du hast alles Wichtige. Sehr stabil.";

  const optionalText = matchingOptional.length > 0
    ? `Extra passt auch: ${formatList(matchingOptional)}`
    : "Extras sind nice, aber kein Muss.";

  return `
    <article class="${cardClass}">
      <h4>${recipe.title}</h4>
      <p class="recipe-saying">${recipe.saying}</p>

      <div class="recipe-meta">
        <span class="meta-pill">Zeit · ${recipe.time}</span>
        <span class="meta-pill">Abwasch · ${recipe.dishes}</span>
        <span class="meta-pill">Kosten · ${recipe.cost}</span>
        <span class="meta-pill">Sättigung · ${recipe.filling}</span>
        <span class="meta-pill">Gefühl · ${recipe.feeling}</span>
      </div>

      <div class="match-info">
        <div class="match-line">
          Passt: ${matchingMain.length > 0 ? formatList(matchingMain) : "noch nicht viel, aber wir versuchen es."}
        </div>

        <div class="missing-line">
          ${missingText}
        </div>

        <div class="match-line">
          ${optionalText}
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

  modalContent.innerHTML = `
    <h3>${recipe.title}</h3>
    <p class="recipe-saying">${recipe.saying}</p>

    <div class="recipe-meta">
      <span class="meta-pill">Zeit · ${recipe.time}</span>
      <span class="meta-pill">Abwasch · ${recipe.dishes}</span>
      <span class="meta-pill">Kosten · ${recipe.cost}</span>
      <span class="meta-pill">Sättigung · ${recipe.filling}</span>
      <span class="meta-pill">Gefühl · ${recipe.feeling}</span>
    </div>

    <div class="detail-box">
      <strong>Abwasch:</strong> ${recipe.dishesText}
    </div>

    <div class="detail-box">
      <strong>Kosten:</strong> ${recipe.costText}
    </div>

    <div class="detail-box">
      <strong>Hauptzutaten:</strong> ${formatList(recipe.main)}
    </div>

    <div class="detail-box">
      <strong>Optionale Extras:</strong> ${recipe.optional.length > 0 ? formatList(recipe.optional) : "Keine Extras nötig."}
    </div>

    <h4>Zubereitung</h4>
    <ol>
      ${recipe.steps.map((step) => `<li>${step}</li>`).join("")}
    </ol>
  `;

  recipeModal.classList.remove("hidden");
}

function closeRecipeModal() {
  recipeModal.classList.add("hidden");
}

function copyMissingIngredients(recipeId) {
  const recipe = recipes.find((item) => item.id === recipeId);
  if (!recipe) return;

  const selectedNames = getSelectedNames();
  const missing = recipe.main.filter((ingredient) => !hasIngredient(ingredient, selectedNames));

  if (missing.length === 0) {
    updateBuddyTextOnly("Da fehlt nichts Wichtiges. Der Einkaufszettel darf heute Pause machen.");
    return;
  }

  const text = missing.join(", ");

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
  const shouldHideWelcome = localStorage.getItem("kuechenkumpelHideWelcome") === "true";

  if (shouldHideWelcome) {
    welcomeScreen.classList.add("hidden");
  }
}

function startApp() {
  if (hideWelcomeCheckbox.checked) {
    localStorage.setItem("kuechenkumpelHideWelcome", "true");
  }

  welcomeScreen.classList.add("hidden");
}

function showWelcomeAgain() {
  localStorage.removeItem("kuechenkumpelHideWelcome");
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

initWelcomeScreen();
updateBuddyMessage();
renderAll();
initNav();