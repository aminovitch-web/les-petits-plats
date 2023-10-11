


/////////////////////////////////////////////////
//   Méthode de l'algorithmme boucle native    //
/////////////////////////////////////////////////

// const searchValue = "tarte aux pommes";
// const searchWords = searchValue.split(/\s+/);
// const filteredRecipes = [];

// for (let i = 0; i < recipes.length; i++) {
//     const recipe = recipes[i];
//     const lowerCaseName = recipe.name.toLowerCase();
//     const lowerCaseDescription = recipe.description.toLowerCase();
//     let matchesSearchWords = true;

//     for (let j = 0; j < searchWords.length; j++) {
//         const word = searchWords[j];
//         if (!(lowerCaseName.includes(word) || lowerCaseDescription.includes(word))) {
//             let ingredientFound = false;
//             for (let k = 0; k < recipe.ingredients.length; k++) {
//                 const ingredient = recipe.ingredients[k].ingredient.toLowerCase();
//                 if (ingredient.includes(word)) {
//                     ingredientFound = true;
//                     break;
//                 }
//             }
//             if (!ingredientFound) {
//                 matchesSearchWords = false;
//                 break;
//             }
//         }
//     }
//     return matchesSearchWords;
// }

/////////////////////////////////////////////////
//    Méthode de l'algorithme Fonctionnel       //
/////////////////////////////////////////////////

// const searchValue = "tarte aux pommes";
// const searchWords = searchValue.split(/\s+/).filter((word) => word.length >= 3);
// const filteredRecipes = recipes.filter((recipe) => {
//     const lowerCaseName = recipe.name.toLowerCase();
//     const lowerCaseDescription = recipe.description.toLowerCase();
//     const matchesSearchWords = searchWords.every(
//         (word) =>
//             lowerCaseName.includes(word) ||
//             lowerCaseDescription.includes(word) ||
//             recipe.ingredients.some((ingredient) =>
//                 ingredient.ingredient.toLowerCase().includes(word)
//             )
//     );
//     return matchesSearchWords;
// });
