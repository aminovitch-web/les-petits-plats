;import { recipeServices } from "../services/recipeServices.js";
import { recipeFactory } from "../factory/recipeFactory.js";

const getRecipes = (recipes) => {
    try {
        const recipesData =  recipeServices();
        return recipesData;
      } catch (error) {
        console.error('Erreur lors de la récupération des photographes :', error)
      }
}

const displayData = (recipes) =>{
    const recipesSection = document.querySelector(".recipes-section");
    const noRecipesMessage = document.querySelector(".no-recipes-message");
    const recipeCount =  document.querySelector(".recipe-count");
    alert("display");

}

const init = () => {
const { recipes } = getRecipes();
displayData(recipes);

}


init();