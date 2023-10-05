import { getRecipes, displayData } from "../pages/index.js";
const recipes = getRecipes();

const ingredientList = document.querySelector(".ingredient-list");
const applianceList = document.querySelector(".appliance-list");
const utensilList = document.querySelector(".utensil-list");
const filterSection = document.querySelector(".filter-section");
const filtersAdded = document.querySelector(".filters-added");
const filtersDiv = document.querySelector(".filter-container");
const mainSearch = document.querySelector(".mainSearch");

const uniqueIngredients = new Set();
const uniqueAppliances = new Set();
const uniqueUtensils = new Set();

//Sets pour stocker les valeurs filtrées des ingrédients, appareils et ustensiles
const filteredIngredients = new Set();
const filteredAppliances = new Set();
const filteredUtensils = new Set();

//// Fonction pour normaliser le texte en minuscules
const textNormalize = (word) => {
    return word.toLowerCase();
};

// Boucle sur les recettes pour extraire et stocker les valeurs uniques d'ingrédients, appareils et ustensiles

for (const recipe of recipes) {
    for (const recipeIngredient of recipe.ingredients) {
        const ingredient = textNormalize(recipeIngredient.ingredient);
        uniqueIngredients.add(ingredient);
    }
}

for (const recipe of recipes) {
    const appliance = textNormalize(recipe.appliance);
    uniqueAppliances.add(appliance);
}

for (const recipe of recipes) {
    const utensils = recipe.ustensils.map((utensil) => textNormalize(utensil));
    for (const utensil of utensils) {
        uniqueUtensils.add(utensil);
    }
}

// approche  avec des bouclesnative de l'algorithme
const filterRecipes = () => {
    const searchValue = textNormalize(mainSearch.value);

    const searchWords = searchValue.split(/\s+/);
    const filteredRecipes = [];

    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        const lowerCaseName = textNormalize(recipe.name);
        const lowerCaseDescription = textNormalize(recipe.description);
        let matchesSearchWords = true;

        for (let j = 0; j < searchWords.length; j++) {
            const word = textNormalize(searchWords[j]);
            if (
                !(
                    lowerCaseName.includes(word) ||
                    lowerCaseDescription.includes(word)
                )
            ) {
                let ingredientFound = false;
                for (let k = 0; k < recipe.ingredients.length; k++) {
                    const ingredient = textNormalize(
                        recipe.ingredients[k].ingredient
                    );
                    if (ingredient.includes(word)) {
                        ingredientFound = true;
                        break;
                    }
                }
                if (!ingredientFound) {
                    matchesSearchWords = false;
                    break;
                }
            }
        }

        const selectedIngredients = [];
        for (let k = 0; k < selectedFilters.ingredients.length; k++) {
            selectedIngredients.push(
                textNormalize(selectedFilters.ingredients[k])
            );
        }

        const selectedAppliances = [];
        for (let l = 0; l < selectedFilters.appliances.length; l++) {
            selectedAppliances.push(
                textNormalize(selectedFilters.appliances[l])
            );
        }

        const selectedUtensils = [];
        for (let m = 0; m < selectedFilters.utensils.length; m++) {
            selectedUtensils.push(textNormalize(selectedFilters.utensils[m]));
        }

        let hasSelectedIngredients = true;

        for (let k = 0; k < selectedIngredients.length; k++) {
            const ingredient = selectedIngredients[k];
            let ingredientMatch = false;
            for (let l = 0; l < recipe.ingredients.length; l++) {
                if (
                    textNormalize(recipe.ingredients[l].ingredient) ===
                    ingredient
                ) {
                    ingredientMatch = true;
                    break;
                }
            }
            if (!ingredientMatch) {
                hasSelectedIngredients = false;
                break;
            }
        }

        let hasSelectedAppliance = true;

        if (selectedAppliances.length > 0) {
            const normalizedAppliance = textNormalize(recipe.appliance);
            if (!selectedAppliances.includes(normalizedAppliance)) {
                hasSelectedAppliance = false;
            }
        }

        let hasSelectedUtensils = true;

        for (let m = 0; m < selectedUtensils.length; m++) {
            const utensil = selectedUtensils[m];
            let utensilMatch = false;
            for (let n = 0; n < recipe.ustensils.length; n++) {
                if (textNormalize(recipe.ustensils[n]) === utensil) {
                    utensilMatch = true;
                    break;
                }
            }
            if (!utensilMatch) {
                hasSelectedUtensils = false;
                break;
            }
        }

        if (
            matchesSearchWords &&
            hasSelectedIngredients &&
            hasSelectedAppliance &&
            hasSelectedUtensils
        ) {
            filteredRecipes.push(recipe);
        }
    }

    if (filteredRecipes.length === 0) {
        displayData([]);
        return;
    }

    displayData(filteredRecipes);
    filterDropdownLists(filteredRecipes);
};

const selectedFilters = {
    ingredients: [],
    appliances: [],
    utensils: [],
};

// Fonction pour afficher les filtres sélectionnés

const displayFilters = () => {
    filtersAdded.appendChild(filtersDiv);
    filtersDiv.innerHTML = "";

    Object.entries(selectedFilters).forEach(([filterType, filterValues]) => {
        const activeFilters = filterValues.filter((value) => value);

        activeFilters.map((value) => {
            const filterContainer = document.createElement("div");
            filterContainer.classList.add("new-filter");
            filtersDiv.appendChild(filterContainer);

            const filterValueSpan = document.createElement("span");
            filterValueSpan.textContent = value;
            filterContainer.appendChild(filterValueSpan);

            const removeFilterButton = document.createElement("i");
            removeFilterButton.classList.add("fa-solid", "fa-xmark");
            filterContainer.appendChild(removeFilterButton);

            removeFilterButton.addEventListener("click", () => {
                const updatedFilterValues = selectedFilters[filterType].filter(
                    (item) => item !== value
                );
                selectedFilters[filterType] = updatedFilterValues;

                const dropdownMenus =
                    filterSection.querySelectorAll(".dropdown-menu");
                dropdownMenus.forEach((dropdownMenu) => {
                    const filterItems = dropdownMenu.querySelectorAll("li");
                    filterItems.forEach((item) => {
                        if (item.textContent === value) {
                            item.classList.remove("selected");
                        }
                    });
                });

                filterRecipes();
                displayFilters();
            });
        });
    });
};

//Création des listes

const createListItem = (text, isSelected) => {
    const li = document.createElement("li");
    li.textContent = text;
    if (isSelected) {
        li.classList.add("selected");
    }
    return li;
};
// Création des listes déroulantes pour ingrédients, appareils et ustensiles

const createDropdownList = (container, dropdownId, optionsSet, label) => {
    const dropdown = document.createElement("div");
    dropdown.classList.add("dropdown");
    container.appendChild(dropdown);

    const dropdownToggle = document.createElement("div");
    dropdownToggle.classList.add("dropdown-toggle");
    dropdownToggle.tabIndex = 0;
    dropdownToggle.textContent = label;
    dropdown.appendChild(dropdownToggle);

    const dropdownIcon = document.createElement("i");
    dropdownIcon.classList.add("fa-solid", "fa-angle-down");
    dropdownToggle.appendChild(dropdownIcon);

    const dropdownMenu = document.createElement("ul");
    dropdownMenu.classList.add("dropdown-menu");
    dropdown.appendChild(dropdownMenu);

    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.classList.add("search-input");
    dropdownMenu.appendChild(searchInput);

    const clearSearchIconDropdown = document.createElement("i");
    clearSearchIconDropdown.classList.add("clear-icon", "fa-solid", "fa-xmark");
    searchInput.parentNode.insertBefore(
        clearSearchIconDropdown,
        searchInput.nextSibling
    );

    const searchIcon = document.createElement("i");
    searchIcon.classList.add("fa-solid", "fa-magnifying-glass");
    searchInput.parentNode.insertBefore(searchIcon, searchInput);

    optionsSet.forEach((option) => {
        const li = createListItem(option, false);
        dropdownMenu.appendChild(li);
    });

    dropdownToggle.addEventListener("click", () => {
        dropdown.classList.toggle("open");
        const dropdownIcon = dropdownToggle.querySelector("i");
        dropdownIcon.classList.toggle(
            "fa-angle-up",
            dropdown.classList.contains("open")
        );
        dropdownIcon.classList.toggle(
            "fa-angle-down",
            !dropdown.classList.contains("open")
        );
    });

    const listItems = Array.from(dropdownMenu.querySelectorAll("li"));

    listItems.forEach((li) => {
        li.addEventListener("click", () => {
            const selectedValue = li.textContent;
            const isSelected = li.classList.contains("selected");

            if (isSelected) {
                const updatedFilterValues = selectedFilters[dropdownId].filter(
                    (item) => item !== selectedValue
                );
                selectedFilters[dropdownId] = updatedFilterValues;
            } else {
                li.classList.add("selected");
                selectedFilters[dropdownId].push(selectedValue);
            }

            filterRecipes();
            displayFilters();
        });
    });

    searchInput.addEventListener("input", () => {
        const searchValue = textNormalize(searchInput.value);

        const filteredSet =
            dropdownId === "ingredients"
                ? filteredIngredients
                : dropdownId === "appliances"
                ? filteredAppliances
                : filteredUtensils;

        listItems.forEach((item) => {
            const text = textNormalize(item.textContent);
            item.style.display =
                text.includes(searchValue) &&
                filteredSet.has(textNormalize(text))
                    ? ""
                    : "none";
        });

        clearSearchIconDropdown.style.display =
            searchInput.value.trim() !== "" ? "block" : "none";
    });

    clearSearchIconDropdown.addEventListener("click", () => {
        searchInput.value = "";
        searchInput.dispatchEvent(new Event("input"));
    });
};

createDropdownList(
    ingredientList,
    "ingredients",
    uniqueIngredients,
    "Ingrédients"
);
createDropdownList(applianceList, "appliances", uniqueAppliances, "Appareils");
createDropdownList(utensilList, "utensils", uniqueUtensils, "Ustensiles");

filterSection.appendChild(ingredientList);
filterSection.appendChild(applianceList);
filterSection.appendChild(utensilList);
// Création des listes déroulantes pour ingrédients, appareils et ustensiles

const filterDropdownLists = (filteredRecipes) => {
    const ingredientItems = ingredientList.querySelectorAll("li");
    const applianceItems = applianceList.querySelectorAll("li");
    const utensilItems = utensilList.querySelectorAll("li");

    filteredIngredients.clear();
    filteredAppliances.clear();
    filteredUtensils.clear();

    for (const recipe of filteredRecipes) {
        filteredAppliances.add(textNormalize(recipe.appliance));
        for (const utensil of recipe.ustensils) {
            filteredUtensils.add(textNormalize(utensil));
        }
        for (const ingredientData of recipe.ingredients) {
            filteredIngredients.add(textNormalize(ingredientData.ingredient));
        }
    }

    const checkDisplayItem = (itemText, set) => {
        return set.has(itemText);
    };

    for (const item of ingredientItems) {
        const itemText = textNormalize(item.textContent);
        item.style.display = checkDisplayItem(itemText, filteredIngredients)
            ? ""
            : "none";
    }

    for (const item of applianceItems) {
        const itemText = textNormalize(item.textContent);
        item.style.display = checkDisplayItem(itemText, filteredAppliances)
            ? ""
            : "none";
    }

    for (const item of utensilItems) {
        const itemText = textNormalize(item.textContent);
        item.style.display = checkDisplayItem(itemText, filteredUtensils)
            ? ""
            : "none";
    }
};

//// Ajout d'écouteurs d'événements pour la recherche et les filtres
document.addEventListener("DOMContentLoaded", () => {
    mainSearch.value = "";
    mainSearch.dispatchEvent(new Event("input"));
});

mainSearch.addEventListener("input", () => {
    filterRecipes();
});

const dropdowns = document.querySelectorAll(".dropdown");

const closeDropdowns = () => {
    dropdowns.forEach((dropdown) => {
        dropdown.classList.remove("open");
    });
};
// Ajout d'un écouteur d'événement pour fermer les listes déroulantes lorsque l'utilisateur clique en dehors

document.addEventListener("mousedown", (event) => {
    const isClickInsideDropdown = event.target.closest(".dropdown");
    if (!isClickInsideDropdown) {
        closeDropdowns();
        const dropdownIcons = document.querySelectorAll(".dropdown-toggle i");
        dropdownIcons.forEach((icon) => {
            icon.classList.remove("fa-angle-up");
            icon.classList.add("fa-angle-down");
        });
    }
});

const filterRegex = /^[a-zA-Z\s]*$/;
const searchRegex = /^[a-zA-Z\s]*$/;

// Fonction pour valider un filtre
const isValidFilterInput = (input, regex) => {
    return regex.test(input);
};

// Fonction pour valider la recherche
const isValidSearchInput = (input) => {
    return searchRegex.test(input);
};

// Gestionnaire d'événement pour les filtres des ingrédients
const ingredientItems = document.querySelectorAll(".ingredient-filter");
const applianceItems = document.querySelectorAll(".appliance-filter");
const utensilItems = document.querySelectorAll(".utensil-filter");

// Gestionnaire d'événement pour les filtres (ingrédients, appareils, ustensiles)
const addFilterEventListeners = (items, filterType) => {
    for (const item of items) {
        const itemText = textNormalize(item.textContent);
        item.addEventListener("click", () => {
            const selectedValue = itemText;
            const isSelected = item.classList.contains("selected");

            if (isSelected) {
                const updatedFilterValues = selectedFilters[filterType].filter(
                    (item) => item !== selectedValue
                );
                selectedFilters[filterType] = updatedFilterValues;
            } else {
                if (isValidFilterInput(selectedValue, filterRegex)) {
                    item.classList.add("selected");
                    selectedFilters[filterType].push(selectedValue);
                    filterRecipes();
                    displayFilters();
                } else {
                    // Filtre non valide, affichez un message d'erreur
                    alert(
                        "Le filtre n'est pas valide. Utilisez uniquement des lettres et des espaces."
                    );
                }
            }
        });
    }
};

// Ajoutez des gestionnaires d'événements pour les filtres (ingrédients, appareils, ustensiles)
addFilterEventListeners(ingredientItems, "ingredients");
addFilterEventListeners(applianceItems, "appliances");
addFilterEventListeners(utensilItems, "utensils");

// Gestionnaire d'événement pour la recherche
mainSearch.addEventListener("input", () => {
    const searchValue = textNormalize(mainSearch.value);

    if (isValidSearchInput(searchValue)) {
        toggleClearSearchIcon();
        filterRecipes();
    } else {
        // Recherche non valide, affichez un message d'erreur
        alert(
            "La recherche n'est pas valide. Utilisez uniquement des lettres et des espaces."
        );
    }
});
