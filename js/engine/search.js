import { getRecipes } from "../pages/index.js";
import { displayData } from "../pages/index.js";
const recipes = getRecipes();

const mainSearch = document.querySelector(".mainSearch");



function textNormalize(word) {
  return word.toLowerCase();
}

// Fonction pour filtrer les recettes en fonction des critères de recherche
const filterRecipes = () => {
  const searchValue = textNormalize(mainSearch.value);

  const searchWords = searchValue.split(/\s+/).filter(word => word.length >= 3);
  const filteredRecipes = recipes.filter(recipe => {
    const lowerCaseName = textNormalize(recipe.name);
    const lowerCaseDescription = textNormalize(recipe.description);
    const matchesSearchWords = searchWords.every(word =>
      lowerCaseName.includes(word) ||
      lowerCaseDescription.includes(word) ||
      recipe.ingredients.some(ingredient =>
        textNormalize(ingredient.ingredient).includes(word)
      )
    );

    return matchesSearchWords;
  });

  if (filteredRecipes.length === 0) {
    displayData([]);
    return;
  }

  displayData(filteredRecipes);
}

// Écoutez l'événement d'entrée dans la barre de recherche principale
mainSearch.addEventListener("input", () => {
  filterRecipes();
});

// Appel initial pour afficher toutes les recettes
filterRecipes();
