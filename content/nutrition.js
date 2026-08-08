(() => {
  "use strict";

  // Referenzwerte je 100 g/ml. Neutrale Durchschnittswerte für handelsübliche
  // Lebensmittel; Markenprodukte werden in Küchenkumpel bewusst nicht vorausgesetzt.
  const DB = {
    "reis trocken": { kcal: 350, protein: 7.2, carbs: 78, fat: 0.8, fiber: 2.2 },
    "reis gekocht": { kcal: 130, protein: 2.7, carbs: 28, fat: 0.3, fiber: 0.4 },
    "nudeln trocken": { kcal: 350, protein: 12.5, carbs: 70, fat: 1.8, fiber: 3.2, gluten: true },
    "vollkornnudeln": { kcal: 337, protein: 13, carbs: 64, fat: 2.5, fiber: 8, gluten: true },
    "glutenfreie nudeln": { kcal: 355, protein: 7.5, carbs: 78, fat: 1.5, fiber: 2.5 },
    "nudeln gekocht": { kcal: 150, protein: 5.5, carbs: 30, fat: 0.9, fiber: 1.8, gluten: true },
    "couscous": { kcal: 353, protein: 12.8, carbs: 69, fat: 1.8, fiber: 5, gluten: true },
    "bulgur": { kcal: 342, protein: 12.3, carbs: 63.4, fat: 1.3, fiber: 12.5, gluten: true },
    "haferflocken": { kcal: 372, protein: 13.5, carbs: 58.7, fat: 7, fiber: 10, glutenPossible: true },
    "mehl": { kcal: 348, protein: 10.4, carbs: 72.3, fat: 1, fiber: 3.2, gluten: true },
    "vollkornbrot": { kcal: 214, protein: 7.5, carbs: 36, fat: 2.2, fiber: 7.5, gluten: true },
    "brot": { kcal: 245, protein: 8.2, carbs: 46, fat: 2.8, fiber: 4.2, gluten: true },
    "toast": { kcal: 265, protein: 8.5, carbs: 49, fat: 3.2, fiber: 3, gluten: true },
    "brötchen": { kcal: 270, protein: 8.8, carbs: 53, fat: 1.7, fiber: 3.2, gluten: true },
    "wrap": { kcal: 310, protein: 8.5, carbs: 52, fat: 7.5, fiber: 3.5, gluten: true },
    "kartoffeln": { kcal: 77, protein: 2, carbs: 16.8, fat: 0.1, fiber: 2.2 },
    "süßkartoffeln": { kcal: 86, protein: 1.6, carbs: 20.1, fat: 0.1, fiber: 3 },
    "gnocchi": { kcal: 160, protein: 3.5, carbs: 34, fat: 0.6, fiber: 2, glutenPossible: true },
    "spätzle": { kcal: 165, protein: 5.6, carbs: 31, fat: 1.7, fiber: 1.5, gluten: true, egg: true },
    "tortellini": { kcal: 245, protein: 9, carbs: 38, fat: 6, fiber: 2.5, gluten: true, eggPossible: true, milkPossible: true },

    "hähnchenbrust": { kcal: 110, protein: 23.1, carbs: 0, fat: 1.2, fiber: 0 },
    "putenbrust": { kcal: 107, protein: 24, carbs: 0, fat: 1, fiber: 0 },
    "putenhack": { kcal: 150, protein: 20, carbs: 0, fat: 7.5, fiber: 0 },
    "rinderhack mager": { kcal: 176, protein: 21, carbs: 0, fat: 10, fiber: 0 },
    "hackfleisch": { kcal: 230, protein: 19, carbs: 0, fat: 17, fiber: 0 },
    "schinken": { kcal: 116, protein: 20, carbs: 1, fat: 3.5, fiber: 0 },
    "wurst": { kcal: 285, protein: 13, carbs: 2, fat: 25, fiber: 0 },
    "lachs": { kcal: 208, protein: 20.4, carbs: 0, fat: 13.4, fiber: 0, fish: true },
    "thunfisch": { kcal: 116, protein: 25.5, carbs: 0, fat: 1, fiber: 0, fish: true },
    "garnelen": { kcal: 99, protein: 24, carbs: 0.2, fat: 0.3, fiber: 0, fish: true },
    "fischstäbchen": { kcal: 210, protein: 12, carbs: 19, fat: 9, fiber: 1, fish: true, gluten: true },

    "ei": { kcal: 137, protein: 12.5, carbs: 0.7, fat: 9.3, fiber: 0, egg: true },
    "skyr": { kcal: 63, protein: 11, carbs: 4, fat: 0.2, fiber: 0, milk: true },
    "laktosefreier skyr": { kcal: 63, protein: 11, carbs: 4, fat: 0.2, fiber: 0, milk: true },
    "magerquark": { kcal: 67, protein: 12.2, carbs: 4, fat: 0.3, fiber: 0, milk: true },
    "quark": { kcal: 98, protein: 12, carbs: 4, fat: 4, fiber: 0, milk: true },
    "joghurt": { kcal: 61, protein: 3.5, carbs: 4.7, fat: 3.3, fiber: 0, milk: true },
    "laktosefreier joghurt": { kcal: 61, protein: 3.5, carbs: 4.7, fat: 3.3, fiber: 0, milk: true },
    "sojajoghurt": { kcal: 45, protein: 4, carbs: 2.5, fat: 2.3, fiber: 0.6, soy: true },
    "milch": { kcal: 47, protein: 3.4, carbs: 4.8, fat: 1.5, fiber: 0, milk: true },
    "laktosefreie milch": { kcal: 47, protein: 3.4, carbs: 4.8, fat: 1.5, fiber: 0, milk: true },
    "sahne": { kcal: 292, protein: 2.4, carbs: 3.2, fat: 30, fiber: 0, milk: true },
    "kochsahne": { kcal: 160, protein: 3, carbs: 4, fat: 15, fiber: 0, milk: true },
    "frischkäse": { kcal: 230, protein: 6, carbs: 4, fat: 21, fiber: 0, milk: true },
    "frischkäse light": { kcal: 155, protein: 8, carbs: 5, fat: 11, fiber: 0, milk: true },
    "hüttenkäse": { kcal: 98, protein: 12.3, carbs: 3.4, fat: 4.3, fiber: 0, milk: true },
    "feta": { kcal: 265, protein: 14.2, carbs: 3.9, fat: 21.5, fiber: 0, milk: true },
    "mozzarella": { kcal: 255, protein: 18.7, carbs: 1.5, fat: 19.5, fiber: 0, milk: true },
    "käse": { kcal: 356, protein: 25, carbs: 0.5, fat: 28, fiber: 0, milk: true },
    "parmesan": { kcal: 392, protein: 35.8, carbs: 3.2, fat: 25.8, fiber: 0, milk: true },
    "butter": { kcal: 741, protein: 0.7, carbs: 0.6, fat: 82, fiber: 0, milk: true },

    "naturtofu": { kcal: 144, protein: 15.7, carbs: 2.8, fat: 8.7, fiber: 1.2, soy: true },
    "kichererbsen": { kcal: 139, protein: 7.5, carbs: 18.7, fat: 2.4, fiber: 6.5 },
    "kidneybohnen": { kcal: 110, protein: 7.6, carbs: 15.5, fat: 0.6, fiber: 6.4 },
    "weiße bohnen": { kcal: 114, protein: 7.3, carbs: 16.4, fat: 0.5, fiber: 6.3 },
    "schwarze bohnen": { kcal: 114, protein: 7.7, carbs: 16.6, fat: 0.5, fiber: 6.9 },
    "bohnen": { kcal: 110, protein: 7.5, carbs: 16, fat: 0.6, fiber: 6.5 },
    "rote linsen trocken": { kcal: 352, protein: 25.5, carbs: 52, fat: 1.7, fiber: 11 },
    "linsen trocken": { kcal: 352, protein: 25, carbs: 52, fat: 1.8, fiber: 11 },
    "edamame": { kcal: 121, protein: 11.9, carbs: 5.2, fat: 5.2, fiber: 5.2, soy: true },
    "erbsen": { kcal: 81, protein: 5.4, carbs: 11.4, fat: 0.4, fiber: 5.1 },
    "mais": { kcal: 96, protein: 3.4, carbs: 16.3, fat: 1.5, fiber: 3 },

    "tomaten": { kcal: 18, protein: 0.9, carbs: 2.6, fat: 0.2, fiber: 1.3 },
    "gehackte tomaten": { kcal: 24, protein: 1.2, carbs: 3.6, fat: 0.2, fiber: 1.4 },
    "passierte tomaten": { kcal: 29, protein: 1.4, carbs: 4.4, fat: 0.2, fiber: 1.5 },
    "tomatenmark": { kcal: 82, protein: 4.3, carbs: 14.9, fat: 0.5, fiber: 4.1 },
    "gurke": { kcal: 15, protein: 0.7, carbs: 2.2, fat: 0.1, fiber: 0.6 },
    "paprika": { kcal: 31, protein: 1, carbs: 4.6, fat: 0.3, fiber: 2 },
    "zucchini": { kcal: 19, protein: 1.6, carbs: 2.2, fat: 0.4, fiber: 1.1 },
    "brokkoli": { kcal: 34, protein: 2.8, carbs: 4.4, fat: 0.4, fiber: 3 },
    "möhren": { kcal: 41, protein: 0.9, carbs: 6.8, fat: 0.2, fiber: 3.1 },
    "spinat": { kcal: 23, protein: 2.9, carbs: 1.4, fat: 0.4, fiber: 2.2 },
    "salat": { kcal: 15, protein: 1.3, carbs: 1.6, fat: 0.2, fiber: 1.5 },
    "rucola": { kcal: 25, protein: 2.6, carbs: 2.1, fat: 0.7, fiber: 1.6 },
    "radieschen": { kcal: 16, protein: 0.7, carbs: 2.1, fat: 0.1, fiber: 1.6 },
    "zwiebel": { kcal: 40, protein: 1.1, carbs: 7.6, fat: 0.1, fiber: 1.7 },
    "lauch": { kcal: 31, protein: 1.5, carbs: 5.5, fat: 0.3, fiber: 1.8 },
    "champignons": { kcal: 22, protein: 3.1, carbs: 0.6, fat: 0.3, fiber: 1 },
    "gemüse": { kcal: 35, protein: 2, carbs: 5, fat: 0.4, fiber: 2.8 },
    "avocado": { kcal: 160, protein: 2, carbs: 1.8, fat: 14.7, fiber: 6.7 },
    "oliven": { kcal: 145, protein: 1, carbs: 3.8, fat: 15.3, fiber: 3.3 },

    "apfel": { kcal: 52, protein: 0.3, carbs: 11.4, fat: 0.2, fiber: 2.4 },
    "banane": { kcal: 89, protein: 1.1, carbs: 20.2, fat: 0.3, fiber: 2.6 },
    "beeren": { kcal: 45, protein: 0.8, carbs: 7.5, fat: 0.5, fiber: 4.5 },
    "wassermelone": { kcal: 30, protein: 0.6, carbs: 6.3, fat: 0.2, fiber: 0.4 },
    "pfirsich": { kcal: 39, protein: 0.9, carbs: 8.4, fat: 0.3, fiber: 1.5 },
    "zitrone": { kcal: 29, protein: 1.1, carbs: 3.2, fat: 0.3, fiber: 2.8 },

    "olivenöl": { kcal: 884, protein: 0, carbs: 0, fat: 100, fiber: 0 },
    "öl": { kcal: 884, protein: 0, carbs: 0, fat: 100, fiber: 0 },
    "sesamöl": { kcal: 884, protein: 0, carbs: 0, fat: 100, fiber: 0, sesame: true },
    "erdnussmus": { kcal: 610, protein: 25, carbs: 12, fat: 50, fiber: 8, nuts: true },
    "walnüsse": { kcal: 654, protein: 15.2, carbs: 7, fat: 65.2, fiber: 6.7, nuts: true },
    "nüsse": { kcal: 620, protein: 19, carbs: 12, fat: 56, fiber: 8, nuts: true },
    "chiasamen": { kcal: 486, protein: 16.5, carbs: 7.7, fat: 30.7, fiber: 34.4 },
    "sesam": { kcal: 573, protein: 17.7, carbs: 10.2, fat: 49.7, fiber: 11.8, sesame: true },
    "pesto": { kcal: 410, protein: 5, carbs: 6, fat: 40, fiber: 2, milkPossible: true, nutsPossible: true },
    "hummus": { kcal: 240, protein: 8, carbs: 14, fat: 17, fiber: 6, sesame: true },
    "kokosmilch light": { kcal: 75, protein: 0.7, carbs: 1.5, fat: 7.2, fiber: 0 },
    "kokosmilch": { kcal: 180, protein: 1.6, carbs: 2.8, fat: 18, fiber: 0 },
    "honig": { kcal: 304, protein: 0.3, carbs: 82.4, fat: 0, fiber: 0 },
    "zucker": { kcal: 400, protein: 0, carbs: 100, fat: 0, fiber: 0 },
    "sojasoße": { kcal: 53, protein: 8.1, carbs: 4.9, fat: 0.6, fiber: 0.8, soy: true, glutenPossible: true },
    "senf": { kcal: 86, protein: 5.7, carbs: 4.7, fat: 4.5, fiber: 3.3, mustard: true },
    "balsamico": { kcal: 88, protein: 0.5, carbs: 17, fat: 0, fiber: 0 },
    "gemüsebrühe": { kcal: 6, protein: 0.3, carbs: 0.8, fat: 0.1, fiber: 0 },
    "brühe": { kcal: 6, protein: 0.3, carbs: 0.8, fat: 0.1, fiber: 0 },
    "wasser": { kcal: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 },
    "frische kräuter": { kcal: 36, protein: 3, carbs: 5, fat: 0.8, fiber: 4 },
    "paprikapulver": { kcal: 282, protein: 14.1, carbs: 19.1, fat: 12.9, fiber: 34.9 },
    "currypulver": { kcal: 325, protein: 14.3, carbs: 55.8, fat: 14, fiber: 53.2 },
    "zimt": { kcal: 247, protein: 4, carbs: 27.5, fat: 1.2, fiber: 53.1 },
    "muskat": { kcal: 525, protein: 5.8, carbs: 28.5, fat: 36.3, fiber: 20.8 },
    "kreuzkümmel": { kcal: 375, protein: 17.8, carbs: 44.2, fat: 22.3, fiber: 10.5 },
    "falafel": { kcal: 333, protein: 13.3, carbs: 31.8, fat: 17.8, fiber: 9.1, sesamePossible: true, glutenPossible: true },
    "schnitzel paniert": { kcal: 220, protein: 20, carbs: 12, fat: 10, fiber: 0.8, gluten: true, eggPossible: true },
    "zitronensaft": { kcal: 22, protein: 0.4, carbs: 6.9, fat: 0.2, fiber: 0.3 },
    "backpulver": { kcal: 53, protein: 0, carbs: 27.7, fat: 0, fiber: 0 }
  };

  const DEFAULT_WEIGHTS = {
    "ei": 60, "apfel": 180, "banane": 120, "zitrone": 120, "limette": 80,
    "zwiebel": 100, "rote zwiebel": 100, "paprika": 170, "zucchini": 250,
    "gurke": 400, "möhre": 80, "möhren": 80, "tomate": 100, "kartoffel": 150,
    "süßkartoffel": 250, "avocado": 150, "lauch": 250, "knoblauch": 3,
    "wrap": 60, "scheibe brot": 45, "scheibe toast": 30, "brötchen": 65,
    "dose thunfisch": 150, "dose bohnen": 240, "dose kichererbsen": 240,
    "dose mais": 285, "dose tomaten": 400, "bund kräuter": 30, "bund radieschen": 250,
    "kopf salat": 350, "zehe knoblauch": 3
  };

  const normalize = (value) => String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9äöü\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  function resolveIngredient(name) {
    const text = normalize(String(name).split(/\s+oder\s+|,|\//)[0]);
    const rules = [
      [/glutenfreie nudel|glutenfreie pasta/, "glutenfreie nudeln"], [/vollkornnudel/, "vollkornnudeln"], [/gekochte? nudel/, "nudeln gekocht"], [/(nudel|pasta|spaghetti|makkaroni)/, "nudeln trocken"],
      [/gekochter? reis/, "reis gekocht"], [/(reis)/, "reis trocken"], [/couscous/, "couscous"], [/bulgur/, "bulgur"], [/hafer/, "haferflocken"],
      [/vollkornbrot/, "vollkornbrot"], [/toast/, "toast"], [/brotchen/, "brötchen"], [/baguette/, "brot"], [/brot/, "brot"], [/wrap|pita|fladenbrot/, "wrap"],
      [/susskartoffel/, "süßkartoffeln"], [/kartoffel/, "kartoffeln"], [/gnocchi/, "gnocchi"], [/spatzle/, "spätzle"], [/tortellini/, "tortellini"], [/mehl/, "mehl"],
      [/putenhack/, "putenhack"], [/putenbrust|putenstreifen/, "putenbrust"], [/hahnchen|huhner|chicken/, "hähnchenbrust"],
      [/mageres rinderhack|rinderhack/, "rinderhack mager"], [/hackfleisch/, "hackfleisch"], [/schinken|speck/, "schinken"], [/wurst|wurstchen/, "wurst"],
      [/lachs/, "lachs"], [/thunfisch/, "thunfisch"], [/garnele/, "garnelen"], [/fischstabchen|fisch/, "fischstäbchen"], [/schnitzel/, "schnitzel paniert"],
      [/(^|\s)(ei|eier)($|\s)/, "ei"], [/laktosefreier skyr/, "laktosefreier skyr"], [/skyr/, "skyr"], [/magerquark/, "magerquark"], [/quark/, "quark"], [/sojajoghurt/, "sojajoghurt"], [/laktosefreier.*joghurt/, "laktosefreier joghurt"], [/joghurt/, "joghurt"], [/laktosefreie milch/, "laktosefreie milch"], [/milch/, "milch"],
      [/kochsahne/, "kochsahne"], [/sahne/, "sahne"], [/frischkase light/, "frischkäse light"], [/frischkase/, "frischkäse"], [/huttenkase/, "hüttenkäse"],
      [/feta/, "feta"], [/mozzarella/, "mozzarella"], [/parmesan/, "parmesan"], [/kase/, "käse"], [/butter/, "butter"],
      [/naturtofu|tofu/, "naturtofu"], [/kichererbse/, "kichererbsen"], [/kidneybohne/, "kidneybohnen"], [/weisse bohne/, "weiße bohnen"], [/schwarze bohne/, "schwarze bohnen"], [/bohne/, "bohnen"],
      [/rote linse/, "rote linsen trocken"], [/linse/, "linsen trocken"], [/edamame/, "edamame"], [/erbse/, "erbsen"], [/mais/, "mais"],
      [/passierte tomate|tomatensosse/, "passierte tomaten"], [/gehackte tomate|dosentomate/, "gehackte tomaten"], [/tomatenmark/, "tomatenmark"], [/tomate/, "tomaten"],
      [/gurke/, "gurke"], [/paprika/, "paprika"], [/zucchini/, "zucchini"], [/brokkoli/, "brokkoli"], [/mohre|karotte/, "möhren"], [/spinat/, "spinat"],
      [/romanasalat|blattsalat|salat/, "salat"], [/rucola/, "rucola"], [/radieschen/, "radieschen"], [/rote zwiebel|zwiebel/, "zwiebel"], [/lauch/, "lauch"],
      [/champignon|pilz/, "champignons"], [/gemuse/, "gemüse"], [/avocado/, "avocado"], [/olive/, "oliven"],
      [/apfel/, "apfel"], [/banane/, "banane"], [/beere|obst/, "beeren"], [/wassermelone/, "wassermelone"], [/pfirsich|nektarine/, "pfirsich"], [/zitrone|limette/, "zitrone"],
      [/erdnussmus/, "erdnussmus"], [/walnuss/, "walnüsse"], [/nuss|kerne/, "nüsse"], [/chiasamen/, "chiasamen"], [/sesamol/, "sesamöl"], [/sesam/, "sesam"],
      [/olivenol/, "olivenöl"], [/(^|\s)ol($|\s)/, "öl"], [/pesto/, "pesto"], [/hummus/, "hummus"], [/kokosmilch light/, "kokosmilch light"], [/kokosmilch/, "kokosmilch"],
      [/zitronensaft/, "zitronensaft"], [/falafel/, "falafel"], [/paprikapulver/, "paprikapulver"], [/currypulver|curry/, "currypulver"], [/zimt/, "zimt"], [/muskat/, "muskat"], [/kreuzkummel/, "kreuzkümmel"], [/backpulver/, "backpulver"], [/basilikum|petersilie|dill|minze|oregano|krauter/, "frische kräuter"], [/wasser/, "wasser"],
      [/honig|sirup/, "honig"], [/zucker/, "zucker"], [/sojasosse/, "sojasoße"], [/senf/, "senf"], [/balsamico|essig/, "balsamico"], [/gemusebruhe/, "gemüsebrühe"], [/bruhe/, "brühe"]
    ];
    for (const [re, key] of rules) if (re.test(text)) return key;
    return "";
  }

  function gramsFor(ingredient, canonical) {
    const amount = Number(ingredient.amount);
    const unit = normalize(ingredient.unit);
    if (!Number.isFinite(amount)) return 0;
    if (unit.includes("liter")) return amount * 1000;
    if (unit.includes("kg")) return amount * 1000;
    if (unit === "g" || unit.startsWith("g ") || unit.includes(" g")) return amount;
    if (unit.includes("ml")) return amount;
    if (unit.includes("el")) {
      if (["olivenöl", "öl", "sesamöl"].includes(canonical)) return amount * 13.5;
      if (canonical === "honig") return amount * 21;
      if (canonical === "erdnussmus") return amount * 18;
      return amount * 15;
    }
    if (unit.includes("tl")) {
      if (["olivenöl", "öl", "sesamöl"].includes(canonical)) return amount * 4.5;
      if (canonical === "honig") return amount * 7;
      return amount * 5;
    }
    const name = normalize(ingredient.name);
    if (unit.includes("dose")) {
      const small = unit.includes("kleine");
      if (canonical === "thunfisch") return amount * (small ? 100 : 150);
      if (["kidneybohnen", "weiße bohnen", "schwarze bohnen", "bohnen", "kichererbsen"].includes(canonical)) return amount * (small ? 140 : 240);
      if (canonical === "mais") return amount * (small ? 140 : 285);
      if (["gehackte tomaten", "passierte tomaten"].includes(canonical)) return amount * (small ? 240 : 400);
      return amount * (small ? 140 : 240);
    }
    if (unit.includes("kugel")) return amount * (canonical === "mozzarella" ? 125 : 100);
    if (unit.includes("portion")) {
      if (["reis trocken", "couscous", "bulgur", "nudeln trocken", "vollkornnudeln"].includes(canonical)) return amount * 70;
      if (canonical === "salat") return amount * 150;
      return amount * 150;
    }
    if (unit.includes("stange")) return amount * (canonical === "lauch" ? 250 : 100);
    if (unit.includes("kleine") && !unit.includes("dose") && !unit.includes("prise")) {
      if (canonical === "zwiebel") return amount * 70;
      if (canonical === "möhren") return amount * 60;
      if (canonical === "zucchini") return amount * 180;
      if (canonical === "tomaten") return amount * 80;
      return amount * 70;
    }
    if (unit.includes("grosse") || unit.includes("große")) {
      if (canonical === "zwiebel") return amount * 130;
      if (canonical === "kartoffeln") return amount * 220;
      return amount * 130;
    }
    if (unit.includes("scheibe")) return amount * (canonical === "vollkornbrot" || canonical === "brot" ? 45 : canonical === "toast" ? 30 : 25);
    if (unit.includes("stuck") || unit.includes("stück")) {
      if (canonical === "ei") return amount * 60;
      if (canonical === "apfel") return amount * 180;
      if (canonical === "banane") return amount * 120;
      if (canonical === "zitrone") return amount * 120;
      if (canonical === "zwiebel") return amount * 100;
      if (canonical === "paprika") return amount * 170;
      if (canonical === "zucchini") return amount * 250;
      if (canonical === "gurke") return amount * 400;
      if (canonical === "möhren") return amount * 80;
      if (canonical === "kartoffeln") return amount * 150;
      if (canonical === "süßkartoffeln") return amount * 250;
      if (canonical === "avocado") return amount * 150;
      if (canonical === "wrap") return amount * 60;
      if (canonical === "brötchen") return amount * 65;
      if (canonical === "brot") return amount * 90;
      if (canonical === "hähnchenbrust" || canonical === "putenbrust") return amount * 150;
      if (canonical === "lachs") return amount * 150;
      if (canonical === "fischstäbchen") return amount * 30;
      if (canonical === "wurst") return amount * 60;
      if (canonical === "falafel") return amount * 30;
      return amount * 100;
    }
    if (unit.includes("zehe")) return amount * 3;
    if (unit.includes("bund")) return amount * (canonical === "radieschen" ? 250 : 30);
    if (unit.includes("kopf")) return amount * 350;
    if (unit.includes("handvoll")) return amount * 30;
    return amount;
  }

  function isOptional(ingredient) {
    return Boolean(ingredient.optional) || normalize(ingredient.unit).includes("optional") || normalize(ingredient.name).includes("optional");
  }

  function structureIngredient(ingredient, index) {
    let canonical = resolveIngredient(ingredient.name);
    const normalizedUnit = normalize(ingredient.unit);
    if (normalizedUnit.includes("gekocht")) {
      if (canonical === "reis trocken") canonical = "reis gekocht";
      if (canonical === "nudeln trocken" || canonical === "vollkornnudeln") canonical = "nudeln gekocht";
    }
    const optional = isOptional(ingredient);
    return {
      ...ingredient,
      canonical,
      optional,
      main: typeof ingredient.main === "boolean" ? ingredient.main : (!optional && index < 4),
      grams: gramsFor(ingredient, canonical)
    };
  }

  function calculateNutrition(recipe) {
    const totals = { kcal: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, weight: 0 };
    const flags = { gluten: false, glutenPossible: false, milk: false, milkPossible: false, egg: false, eggPossible: false, fish: false, nuts: false, nutsPossible: false, soy: false, sesame: false, mustard: false };
    for (const ingredient of recipe.ingredients || []) {
      if (ingredient.optional) continue;
      const ref = DB[ingredient.canonical];
      const grams = Number(ingredient.grams) || 0;
      if (!ref || grams <= 0) continue;
      const factor = grams / 100;
      for (const key of ["kcal", "protein", "carbs", "fat", "fiber"]) totals[key] += (ref[key] || 0) * factor;
      totals.weight += grams;
      for (const key of Object.keys(flags)) if (ref[key]) flags[key] = true;
    }
    const portions = Math.max(1, Number(recipe.portions) || 2);
    const perPortion = {};
    for (const key of ["kcal", "protein", "carbs", "fat", "fiber"]) perPortion[key] = Math.round((totals[key] / portions) * 10) / 10;
    const proteinEnergyShare = totals.kcal > 0 ? (totals.protein * 4) / totals.kcal : 0;
    const fiberPer100g = totals.weight > 0 ? totals.fiber / totals.weight * 100 : 0;
    const fiberPer100kcal = totals.kcal > 0 ? totals.fiber / totals.kcal * 100 : 0;
    return {
      perPortion,
      total: Object.fromEntries(["kcal", "protein", "carbs", "fat", "fiber"].map(k => [k, Math.round(totals[k] * 10) / 10])),
      referencePortions: portions,
      estimatedWeight: Math.round(totals.weight),
      labels: {
        proteinreich: proteinEnergyShare >= 0.20,
        ballaststoffreich: fiberPer100g >= 6 || fiberPer100kcal >= 3,
        kalorienbewusst: perPortion.kcal > 0 && perPortion.kcal <= 650,
        leichtSaettigend: perPortion.kcal > 0 && perPortion.kcal <= 650 && (perPortion.protein >= 20 || perPortion.fiber >= 6)
      },
      basis: "Ungefähre Nährwerte aus neutralen Referenzwerten und den im Rezept angegebenen Grundmengen. Optionale Zutaten sind nicht eingerechnet."
    };
  }

  function deriveDietAndAllergens(recipe, flags) {
    const text = normalize((recipe.ingredients || []).map(x => x.name).join(" "));
    const meat = /hahnchen|pute|hack|rind|schinken|speck|wurst|schnitzel|fleisch/.test(text);
    const fish = flags.fish || /lachs|thunfisch|garnele|fisch/.test(text);
    const vegetarian = !meat && !fish;
    const vegan = vegetarian && !flags.milk && !flags.egg && !flags.fish && !/honig/.test(text);
    const allergens = [];
    if (flags.gluten) allergens.push("Gluten");
    else if (flags.glutenPossible) allergens.push("Gluten möglich");
    if (flags.milk) allergens.push("Milch");
    else if (flags.milkPossible) allergens.push("Milch möglich");
    if (flags.egg) allergens.push("Ei");
    else if (flags.eggPossible) allergens.push("Ei möglich");
    if (flags.fish) allergens.push("Fisch");
    if (flags.nuts) allergens.push("Nüsse");
    else if (flags.nutsPossible) allergens.push("Nüsse möglich");
    if (flags.soy) allergens.push("Soja");
    if (flags.sesame) allergens.push("Sesam");
    else if (flags.sesamePossible) allergens.push("Sesam möglich");
    if (flags.mustard) allergens.push("Senf");
    return {
      vegetarian, vegan, allergens,
      glutenFreePossible: (!flags.gluten && !flags.glutenPossible) || Boolean(recipe.glutenFreePossible),
      lactoseFreePossible: (!flags.milk && !flags.milkPossible) || Boolean(recipe.lactoseFreePossible)
    };
  }

  function enrichRecipe(recipe) {
    const ingredients = (recipe.ingredients || []).map(structureIngredient);
    const temp = { ...recipe, ingredients };
    const nutrition = calculateNutrition(temp);
    // Reconstruct flags from references actually used.
    const flags = {};
    for (const i of ingredients) {
      const ref = DB[i.canonical] || {};
      for (const k of ["gluten","glutenPossible","milk","milkPossible","egg","eggPossible","fish","nuts","nutsPossible","soy","sesame","sesamePossible","mustard"]) flags[k] = Boolean(flags[k] || ref[k]);
    }
    const diet = deriveDietAndAllergens(temp, flags);
    const wellnessTags = [...new Set([...(recipe.wellnessTags || []), ...(recipe.categories || [])])];
    if (nutrition.labels.proteinreich) wellnessTags.push("proteinreich");
    if (nutrition.labels.ballaststoffreich) wellnessTags.push("ballaststoffreich");
    if (nutrition.labels.leichtSaettigend) wellnessTags.push("leicht & sättigend");
    if (recipe.mealPrep) wellnessTags.push("meal prep");
    return {
      ...recipe,
      ingredients,
      nutrition,
      diet,
      wellnessTags: [...new Set(wellnessTags.map((value) => String(value || "").trim().toLowerCase()).filter(Boolean))]
    };
  }

  window.KUECHENKUMPEL_NUTRITION_DB = DB;
  window.KUECHENKUMPEL_ENRICH_RECIPES = (recipes) => (recipes || []).map(enrichRecipe);
  window.KUECHENKUMPEL_CALCULATE_NUTRITION = calculateNutrition;
})();
