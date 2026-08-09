const recipeGroups = [
  window.BASE_RECIPES,
  window.KEIN_BOCK_RECIPES,
  window.MUSS_WEG_RECIPES,
  window.GUENSTIG_RECIPES,
  window.SATT_HERZHAFT_RECIPES,
  window.SCHNELL_FEIERABEND_RECIPES,
  window.LEICHT_SOMMERLICH_RECIPES,
  window.FRUEHSTUECK_SNACK_RECIPES,
  window.HEISSLUFTFRITTEUSE_RECIPES,
  window.ZU_HEISS_ZUM_KOCHEN_RECIPES,
  window.BEWUSST_LECKER_RECIPES,
  window.BACKEN_RECIPES
];

const rawRecipes = recipeGroups
  .filter(Array.isArray)
  .flat()
  .sort((a, b) => (a.id || 0) - (b.id || 0));

const nutritionRecipes = typeof window.KUECHENKUMPEL_ENRICH_RECIPES === "function"
  ? window.KUECHENKUMPEL_ENRICH_RECIPES(rawRecipes)
  : rawRecipes;

window.RECIPES = typeof window.KUECHENKUMPEL_ENRICH_QUALITY === "function"
  ? window.KUECHENKUMPEL_ENRICH_QUALITY(nutritionRecipes)
  : nutritionRecipes;

window.KUECHENKUMPEL_RECIPE_COUNT = window.RECIPES.length;
