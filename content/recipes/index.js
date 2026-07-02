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
  window.ZU_HEISS_ZUM_KOCHEN_RECIPES
];

window.RECIPES = recipeGroups
  .filter(Array.isArray)
  .flat()
  .sort((a, b) => (a.id || 0) - (b.id || 0));

window.KUECHENKUMPEL_RECIPE_COUNT = window.RECIPES.length;
