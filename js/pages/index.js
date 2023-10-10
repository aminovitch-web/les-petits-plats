import { recipeServices } from "../services/recipeServices.js";
import { recipeFactory } from "../factory/recipeFactory.js";

export const getRecipes = () => {
    try {
        return recipeServices();
    } catch (error) {
        console.error("Erreur lors de la récupération des recettes :", error);
    }
};

export const displayData = (recipes, searchValue) => {
    const recipesSection = document.querySelector(".recipes-section");
    const noRecipesMessage = document.querySelector(".no-recipes-message");
    const recipeCount = document.querySelector(".recipe-count");

    if (recipes.length === 0) {
        const formattedSearchValue = `"${searchValue.toUpperCase()}"`;
        noRecipesMessage.textContent = `Aucune recette pour ${formattedSearchValue}`;
        recipesSection.innerHTML = "";
    } else {
        noRecipesMessage.textContent = "";
        recipesSection.innerHTML = "";
        recipes.forEach((recipe) => {
            // Pour chaque recette, créez un modèle de recette à partir de la fonction "recipesFactory".
            const recipesModel = recipeFactory(recipe);
            // Récupérez le DOM de la carte de recette à partir du modèle.
            const recipeCardDOM = recipesModel.getRecipeCardDOM();
            // Ajoutez la carte de recette au conteneur de la section des recettes.
            recipesSection.appendChild(recipeCardDOM);
        });
        // Affichez le nombre total de recettes.
        recipeCount.textContent = `${recipes.length} recettes`;
    }
};

function init() {
    const recipesData = getRecipes();
    displayData(recipesData);
}

init();
