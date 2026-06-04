const recipeGroups = [
  window.BASE_RECIPES,
  window.KEIN_BOCK_RECIPES,
  window.MUSS_WEG_RECIPES,
  window.GUENSTIG_RECIPES,
  window.SATT_HERZHAFT_RECIPES,
  window.SCHNELL_FEIERABEND_RECIPES,
  window.LEICHT_SOMMERLICH_RECIPES,
  window.FRUEHSTUECK_SNACK_RECIPES
];

window.RECIPES = recipeGroups
  .filter(Array.isArray)
  .flat();

window.KUECHENKUMPEL_RECIPE_COUNT = window.RECIPES.length;
