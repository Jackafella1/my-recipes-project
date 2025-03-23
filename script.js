const recipesTitle = document.getElementById("recipes-title"); 
const recipesImage = document.getElementById("recipes-image");
const generateRecipesBtn = document.getElementById("recipes-button");

// Replace with your Spoonacular API key
require('dotenv').config();
const apiKey = process.env.API_KEY;

// Function to search recipes by selected meat using async/await
async function searchRecipesByMeat(meatType) {
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${meatType}&apiKey=${apiKey}`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Clear previous results
        const resultsContainer = document.getElementById("recipe-results");
        resultsContainer.innerHTML = '';

        // Process the results and display them
        const recipes = data.results;
        if (recipes.length === 0) {
            resultsContainer.innerHTML = 'No recipes found.';
        } else {
            recipes.forEach(recipe => {
                const recipeElement = document.createElement('div');
                recipeElement.innerHTML = `
                    <h3>${recipe.title}</h3>
                    <img src="${recipe.image}" alt="${recipe.title}" width="200">
                    <p><a href="https://spoonacular.com/recipes/${recipe.title}-${recipe.id}" target="_blank">View Recipe</a></p>
                `;
                resultsContainer.appendChild(recipeElement);
            });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to search for a random recipe by meat using async/await
async function searchRandomRecipesByMeat(randomMeatType) {
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${randomMeatType}&apiKey=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Clear previous results
        const resultsContainer = document.getElementById("recipe-results");
        resultsContainer.innerHTML = '';

        // Process the results and display a random recipe
        const recipes = data.results;
        if (recipes.length === 0) {
            resultsContainer.innerHTML = 'No recipes found.';
        } else { 
            // Pick a random recipe from the results
            const randomIndex = Math.floor(Math.random() * recipes.length);
            const randomRecipe = recipes[randomIndex];

            // Display the random recipe
            const recipeElement = document.createElement('div');
            recipeElement.innerHTML = `
                <h3>${randomRecipe.title}</h3>
                <img src="${randomRecipe.image}" alt="${randomRecipe.title}" width="200">
                <p><a href="https://spoonacular.com/recipes/${randomRecipe.title}-${randomRecipe.id}" target="_blank">View Recipe</a></p>
            `;
            resultsContainer.appendChild(recipeElement);
        }
    } catch (error) {
        console.error('Error fetching random recipes by meat:', error);
    }
}
// Function to clear the search results and reset dropdown
function clearHunt() {
    console.log("Clear Hunt button clicked!");
    const resultsContainer = document.getElementById("recipe-results");
    const meatSelect = document.getElementById("meat-select");
    resultsContainer.innerHTml = '';
    meatSelect.value = "chicken";
}

// Add event listener for button click to search and display random recipe based on meat
document.getElementById("random-meat-recipes-button").addEventListener("click", () => {
    const selectedMeat = document.getElementById("meat-select").value;
    searchRandomRecipesByMeat(selectedMeat);
});

// Add event listener for button click to search by meat
document.getElementById("search-button").addEventListener("click", () => {
    const selectedMeat = document.getElementById("meat-select").value;
    searchRecipesByMeat(selectedMeat);
});

document.getElementById("clear-hunt-button").addEventListener("click", clearHunt);

// Hide the recipe container initially
document.addEventListener("DOMContentLoaded", () => {
    const recipesContainer = document.getElementById("recipes-container");
    recipesContainer.style.display = 'none';  // Hide the container initially
});
