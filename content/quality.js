(() => {
  "use strict";

  const norm = (value) => String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9\s&-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const includesAny = (text, words) => words.some((word) => text.includes(word));
  const cap = (text) => text ? text.charAt(0).toUpperCase() + text.slice(1) : text;

  function recipeText(recipe) {
    return norm([
      recipe.name, recipe.title, recipe.category, recipe.shortDescription, recipe.slogan,
      ...(recipe.categories || []), ...(recipe.wellnessTags || []), ...(recipe.steps || []),
      ...(recipe.ingredients || []).map((item) => item.name)
    ].join(" "));
  }

  function stepTitle(step, index, total) {
    const text = norm(step);
    const rules = [
      [["vorheizen"], "Backofen vorheizen"],
      [["knet", "verknet"], "Teig kneten"],
      [["gehen lassen", "gehen lassen", "gehzeit", "ruhen lassen"], "Teig ruhen lassen"],
      [["ausrollen", "formen", "flechten"], "Formen"],
      [["fuellen", "füllen", "belag", "belegen"], "Füllen und belegen"],
      [["backen", "backe", "schiene"], "Backen"],
      [["auskuehl", "auskühl", "abkuehl", "abkühl"], "Abkühlen lassen"],
      [["wasch", "schneid", "wuerfel", "würfel", "reib", "putz", "schael", "schäl", "vorbereit"], "Zutaten vorbereiten"],
      [["teig", "ruhe"], "Teig vorbereiten"],
      [["dressing", "sosse", "soße", "dip", "marinade", "verruehr", "verrühr"], "Sauce oder Dressing anrühren"],
      [["reis", "nudeln", "kartoffeln", "couscous", "bulgur"], "Basis garen"],
      [["anbrat", "brat", "roest", "röst"], "Anbraten"],
      [["airfryer", "heissluft", "heißluft", "korb"], "In der Heißluftfritteuse garen"],
      [["ofen", "back", "ueberback", "überback"], "Im Ofen garen"],
      [["koch", "koechel", "köchel", "garen", "ziehen lassen"], "Garen und ziehen lassen"],
      [["misch", "vermeng", "unterheb", "zusammen", "einruehr", "einrühr"], "Alles zusammenbringen"],
      [["abschmeck", "servier", "anricht", "garnier"], "Abschmecken und servieren"],
      [["abkuehl", "abkühl", "box", "portionier", "kuehlschrank", "kühlschrank"], "Abkühlen und portionieren"]
    ];
    for (const [needles, title] of rules) if (includesAny(text, needles)) return title;
    if (index === 0) return "Vorbereitung";
    if (index === total - 1) return "Fertigstellen";
    return `Zubereitung ${index + 1}`;
  }

  function timerMinutes(step) {
    const text = String(step || "");
    const range = text.match(/(\d+)\s*(?:bis|–|-)\s*(\d+)\s*Min/i);
    if (range) return Number(range[2]);
    const single = text.match(/(\d+)\s*Min/i);
    if (single) return Number(single[1]);
    return 0;
  }

  function equipment(recipe) {
    const text = recipeText(recipe);
    const items = [];
    const add = (label) => { if (!items.includes(label)) items.push(label); };
    if (recipe.baking) {
      if ((recipe.tags || []).includes("airfryer-backen")) add("Heißluftfritteuse");
      else add("Backofen");
      if (recipe.baking.form) add(recipe.baking.form);
    }
    if (includesAny(text, ["pfanne", "anbrat", "brat"])) add("Pfanne");
    if (includesAny(text, ["topf", "koechel", "köchel", "suppe", "eintopf"])) add("Topf");
    if (includesAny(text, ["airfryer", "heissluft", "heißluft"])) add("Heißluftfritteuse");
    if (includesAny(text, ["auflauf", "gratin"])) add("Auflaufform");
    else if (includesAny(text, ["ofen", "back", "überback", "ueberback"])) add("Backblech oder ofenfeste Form");
    if (includesAny(text, ["puerier", "pürier"])) add("Pürierstab oder Mixer");
    if (includesAny(text, ["salat", "bowl", "dressing", "teig", "verruehr", "verrühr"])) add("große Schüssel");
    if (recipe.mealPrep) add("Meal-Prep-Boxen");
    if (!items.length) add("Pfanne oder Topf – passend zum Rezept");
    return items.slice(0, 4);
  }

  function occasions(recipe) {
    const text = recipeText(recipe);
    const tags = [];
    const add = (label) => { if (!tags.includes(label)) tags.push(label); };
    const total = Number(String(recipe.timeTotal || recipe.time || "").match(/\d+/)?.[0] || 30);
    if (total <= 25) add("schnell zwischendurch");
    if (total <= 40) add("Feierabend");
    if (recipe.mealPrep) add("Meal Prep");
    if (includesAny(text, ["sommer", "salat", "bowl", "kalt", "ohne kochen"])) add("Sommerabend");
    if (includesAny(text, ["auflauf", "eintopf", "chili", "pfanne", "suppe"])) add("Familienessen");
    if (includesAny(text, ["brunch", "fruehst", "frühst"])) add("Frühstück & Brunch");
    if (includesAny(text, ["wochenende", "verwöhn", "verwoehn"])) add("Wochenende");
    return tags.slice(0, 3);
  }

  function prepStatus(recipe) {
    const text = recipeText(recipe);
    if (recipe.mealPrep) return "Gut vorzubereiten";
    if (includesAny(text, ["salat", "avocado", "toast", "broet", "bröt", "knusprig", "airfryer", "fischstaebchen", "fischstäbchen"])) return "Am besten frisch";
    if (includesAny(text, ["auflauf", "gratin", "chili", "eintopf", "suppe", "curry"])) return "Lässt sich gut vorbereiten";
    return "Gut am selben Tag vorzubereiten";
  }

  function storage(recipe) {
    const text = recipeText(recipe);
    const existing = recipe.storage || {};
    const freshSalad = includesAny(text, ["blattsalat", "rucola", "avocado", "gurkensalat", "tomatensalat", "caprese", "wassermelone"]);
    const fish = includesAny(text, ["lachs", "thunfisch", "garnele", "fisch"]);
    const poultryOrHack = includesAny(text, ["hähnchen", "haehnchen", "pute", "hackfleisch", "rinderhack", "putenhack"]);
    const egg = includesAny(text, [" ei ", "eier", "omelett", "ruehrei", "rührei", "shakshuka"]);
    const rice = includesAny(text, ["reis", "reisbowl", "reisbox"]);
    const creamy = includesAny(text, ["sahne", "joghurt", "quark", "frischkaese", "frischkäse"]);
    let fridgeDays = Number(existing.fridgeDays) || 2;
    if (freshSalad) fridgeDays = Math.min(fridgeDays, 1);
    else if (fish || poultryOrHack || egg || rice || creamy) fridgeDays = Math.min(fridgeDays, 2);
    else fridgeDays = Math.min(fridgeDays || 3, 3);

    let freezable = Boolean(existing.freezable);
    if (!existing.freezable && includesAny(text, ["chili", "eintopf", "curry", "suppe", "bolognese"]) && !freshSalad) freezable = true;
    if (freshSalad || includesAny(text, ["gurke", "avocado", "toast", "brotzeit"])) freezable = false;

    let reheat = existing.reheat || "In Pfanne, Topf oder Mikrowelle vollständig und gleichmäßig erhitzen.";
    if (fish) reheat = "Schonend, aber vollständig erhitzen; am besten nur die Portion erwärmen, die direkt gegessen wird.";
    if (freshSalad) reheat = "Nicht aufwärmen; gekühlt lagern und möglichst frisch essen.";
    if (includesAny(text, ["airfryer", "knusprig", "wedges", "fischstaebchen", "fischstäbchen"])) reheat = "Für eine bessere Oberfläche im Ofen oder Airfryer vollständig durcherhitzen.";

    let separate = existing.separate || "Frische Toppings, Kräuter und Dressings nach Möglichkeit separat lagern.";
    if (!recipe.mealPrep && !freshSalad) separate = "Nur empfindliche frische Toppings oder Saucen separat aufbewahren.";

    return {
      fridgeDays,
      freezable,
      reheat,
      separate,
      warning: existing.warning || "Reste zügig abkühlen, durchgehend gekühlt lagern und nur einmal vollständig aufwärmen. Bei Zweifel entsorgen."
    };
  }

  function safetyNote(recipe) {
    const text = recipeText(recipe);
    if (includesAny(text, ["reis", "reisbowl", "reisbox"])) return "Gekochten Reis nach dem Essen zügig abkühlen, kalt stellen und beim Aufwärmen vollständig durcherhitzen.";
    if (includesAny(text, ["hackfleisch", "rinderhack", "putenhack"])) return "Hackfleisch vollständig durchgaren. Reste zügig kühlen und beim späteren Essen vollständig durcherhitzen.";
    if (includesAny(text, ["hähnchen", "haehnchen", "pute"])) return "Geflügel vollständig durchgaren und rohe sowie gegarte Zutaten sauber voneinander trennen.";
    if (includesAny(text, ["lachs", "thunfisch", "garnele", "fisch"])) return "Fischgerichte nicht unnötig bei Raumtemperatur stehen lassen; Reste zügig kühlen und zeitnah verbrauchen.";
    if (includesAny(text, ["eier", "omelett", "ruehrei", "rührei", "shakshuka"])) return "Eierspeisen vollständig stocken lassen, wenn sie später aufbewahrt werden sollen, und Reste zügig kühlen.";
    if (includesAny(text, ["sahne", "joghurt", "quark", "frischkaese", "frischkäse"])) return "Cremige Bestandteile nicht lange ungekühlt stehen lassen und Reste zeitnah wieder kalt stellen.";
    return "";
  }

  function introduction(recipe) {
    const desc = String(recipe.shortDescription || "").trim();
    const occasion = occasions(recipe)[0] || "Alltag";
    if (desc) return `${desc} Passt besonders gut, wenn es ${occasion === "Feierabend" ? "nach Feierabend unkompliziert" : occasion.toLowerCase()} sein soll.`;
    return `${recipe.name || recipe.title} ist eine unkomplizierte Küchenkumpel-Idee für den Alltag. Die Schritte bleiben übersichtlich und lassen sich ohne Küchenstress nachkochen.`;
  }

  function finishingTips(recipe) {
    const items = [];
    if (recipe.tip) items.push(String(recipe.tip));
    const text = recipeText(recipe);
    if (recipe.baking) {
      if (includesAny(text, ["brot", "broetchen", "brötchen", "hefe", "focaccia", "ciabatta"])) items.push("Brot und Hefegebäck vor dem Anschneiden ausreichend auskühlen lassen, damit die Krume stabil bleibt.");
      else items.push("Gebäck vor dem Schneiden oder Dekorieren so weit auskühlen lassen, wie es das Rezept vorgibt – dadurch bleibt die Struktur sauber.");
      return [...new Set(items.filter(Boolean))].slice(0, 2);
    }
    if (includesAny(text, ["salat", "bowl"])) items.push("Dressing und knusprige Toppings erst kurz vor dem Essen dazugeben, damit die Texturen frisch bleiben.");
    else if (includesAny(text, ["airfryer", "heissluft", "heißluft"])) items.push("Knusprige Komponenten nach dem Garen nicht abdecken, sonst werden sie schnell weich.");
    else if (includesAny(text, ["suppe", "eintopf", "chili", "curry"])) items.push("Vor dem Servieren noch einmal auf Salz, Säure und Schärfe prüfen; ein kleiner frischer Abschluss macht einen großen Unterschied.");
    else if (includesAny(text, ["nudeln", "pasta"])) items.push("Etwas Kochwasser zurückhalten: Damit lässt sich eine zu dicke Sauce am Ende sauber einstellen.");
    else items.push("Vor dem Servieren einmal in Ruhe abschmecken und erst dann nachwürzen.");
    return [...new Set(items.filter(Boolean))].slice(0, 2);
  }

  function pairsWith(recipe) {
    const text = recipeText(recipe);
    if (includesAny(text, ["suppe", "eintopf"])) return "Ein Stück gutes Brot oder ein kleiner frischer Salat.";
    if (includesAny(text, ["salat", "bowl"])) return "Frisches Brot, ein leichter Dip oder eine kleine warme Beilage.";
    if (includesAny(text, ["airfryer", "wedges", "kartoffelspalten"])) return "Kräuterquark, Joghurt-Dip oder ein knackiger Salat.";
    if (includesAny(text, ["curry", "chili"])) return "Reis, Fladenbrot oder ein frischer Joghurt-Dip.";
    return "";
  }

  function enrich(recipe) {
    const steps = (recipe.steps || []).filter(Boolean).map((step, index, all) => ({
      title: stepTitle(step, index, all.length),
      text: String(step).trim(),
      timerMinutes: timerMinutes(step)
    }));
    return {
      ...recipe,
      quality: {
        intro: introduction(recipe),
        stepDetails: steps,
        equipment: equipment(recipe),
        occasions: occasions(recipe),
        prepStatus: prepStatus(recipe),
        storage: storage(recipe),
        safetyNote: safetyNote(recipe),
        finishingTips: finishingTips(recipe),
        pairsWith: pairsWith(recipe),
        difficulty: cap(String(recipe.difficulty || "Einfach").replace(/^einfach$/i, "Einfach").replace(/^mittel$/i, "Etwas Übung").replace(/^schwer$/i, "Für Geübte"))
      },
      storage: storage(recipe)
    };
  }

  window.KUECHENKUMPEL_ENRICH_QUALITY = (recipes) => (recipes || []).map(enrich);
})();
