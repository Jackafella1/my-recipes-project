const recipesTitle = document.getElementById("recipes-title");
const recipesImage = document.getElementById("recipes-image");
const generateRecipesBtn = document.getElementById("recipes-button");

// Replace with your Spoonacular API key
const apiKey = '8a65ad549e8b4574b18fb02e36c691a1';

// Function to search recipes by selected meat
function searchRecipesByMeat(meatType) {
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${meatType}&apiKey=${apiKey}`;

    // Fetching the data from Spoonacular API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
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
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Add event listener for button click
document.getElementById("search-button").addEventListener("click", () => {
    const selectedMeat = document.getElementById("meat-select").value;
    searchRecipesByMeat(selectedMeat);
});