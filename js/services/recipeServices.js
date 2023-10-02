import { recipes } from "/data/recipes.js";

export const recipeServices = () => {
    try {
        console.log("Liste des recettes récupérées :");
        console.table(recipes);
        return recipes;
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        return false;
    }
};