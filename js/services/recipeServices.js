import { recipes } from "/data/recipes.js";
export const recipeServices = async () => {
    try {
        console.log("recuperations des recettes avec succes");
        return recipes;
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        return false;
    }
};
