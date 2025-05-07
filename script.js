const recipesTitle = document.getElementById("recipes-title"); // Retrieves the HTML element with ID "recipes-title" for potential use (e.g., updating title text)
const recipesImage = document.getElementById("recipes-image"); // Retrieves the HTML element with ID "recipes-image" for potential use (e.g., displaying an image)
const generateRecipesBtn = document.getElementById("recipes-button"); // Retrieves the HTML element with ID "recipes-button" (currently unused in the code)

//const apiKey = ''; // Replace with your actual API key

// Replace with your Spoonacular API key
//require('dotenv').config();
//const apiKey = process.env.API_KEY;

// Function to search recipes by selected meat using async/await
async function searchRecipesByMeat(meatType) { // Defines an async function to fetch recipes for a given meat type
    const loading = document.getElementById("loading"); // Retrieves the HTML element with ID "loading" (loading spinner)
    loading.style.display = "block"; // Sets the loading spinner's display style to "block" to make it visible
    const apiUrl = `http://localhost:3000/recipes/${meatType}`; // Constructs the backend API URL using the provided meat type (e.g., http://localhost:3000/recipes/chicken)
    
    try { // Begins a try-catch block to handle potential errors during the API request
        const response = await fetch(apiUrl); // Makes an asynchronous HTTP GET request to the backend API
        if (!response.ok) { // Checks if the response status is not OK (e.g., 404 or 500)
            const errorData = await response.json(); // Parses the response body as JSON to get error details
            throw new Error(errorData.error || `Backend responded with status ${response.status}`); // Throws an error with the response failed
        }
        const data = await response.json(); // Parses the response body as JSON to get the recipe data

        // Clear previous results
        const resultsContainer = document.getElementById("recipe-results"); // Retrieves the HTML element with ID "recipe-results" to display recipes
        resultsContainer.innerHTML = ''; // Clears any existing content in the results container

        // Process the results and display them
        const recipes = data.results || []; // Assigns the recipes array from the response, defaulting to an empty array if data.results is undefined
        if (recipes.length === 0) { // Checks if the recipes array is empty
            resultsContainer.innerHTML = 'No recipes found.'; // Displays a message in the results container if no recipes are found
        } else {
            recipes.forEach(recipe => { // Iterates over each recipe in the recipes array
                const recipeElement = document.createElement('div'); // Creates a new <div> element to hold a single recipe
                const instructions = recipe.instructions || 'Instructions not available.';
                // Sets the inner HTML of the div with recipe details using a template literal
                recipeElement.innerHTML = `
                    <h3>${recipe.title}</h3> <!-- Adds the recipe title as a heading -->
                    <img src="${recipe.image}" alt="${recipe.title}" width="200"> <!-- Adds an image of the recipe with a fixed width-->
                    <h4>Instructions:</h4>
                    <p>${instructions}</p> <!-- Displays the instructions -->
                    <p><a href="https://spoonacular.com/recipes/${recipe.title}-${recipe.id}" target="_blank">View on Spoonacular</a></p> <!-- Adds a link to the full recipe on Spoonacular-->
                `;
                resultsContainer.appendChild(recipeElement); // Appends the recipe div to the results container
            });
        }
    } catch (error) { // Catches any errors that occur during the fetch or processing
        console.error('Error fetching data:', error); // Logs the error to the browser console for debugging
        const resultsContainer = document.getElementById("recipe-results"); // Retrieves the results container again (for error display)
        resultsContainer.innerHTML = 'Error fetching recipes. Please try again.'; // Displays an error message in the results container
    } finally { // Executes regardless of success or failure
        loading.style.display = "none"; // Hides the loading spinner by setting its display style to "none"
    }
}

// Function to search for a random recipe by meat using async/await
async function searchRandomRecipesByMeat(randomMeatType) { // Defines an async function to fetch a single random recipe for a given meat type
    const loading = document.getElementById("loading"); // Retrieves the HTML element with ID "loading" (loading spinner)
    loading.style.display = "block"; // Sets the loading spinner's display style to "block" to make it visible
    const apiUrl = `http://localhost:3000/random/${randomMeatType}`; // Constructs the backend API URL for a random recipe (e.g., http://localhost:3000/random/beef)
    
    try { // Begins a try-catch block to handle potential errors
        const response = await fetch(apiUrl); // Makes an asynchronous HTTP GET request to the backend API

        if (!response.ok) { // Checks if the response status is not OK
            const errorData = await response.json(); // Parses the response body as JSON to get error details
            throw new Error(`Backend responded with status ${response.status}`); // Throws an error with the response status if the request failed
        
        }
        const data = await response.json(); // Parses the response body as JSON to get the recipe data

        // Clear previous results
        const resultsContainer = document.getElementById("recipe-results"); // Retrieves the HTML element with ID "recipe-results"
        resultsContainer.innerHTML = ''; // Clears any existing content in the results container

        // Process the results and display a random recipe
        const recipes = data.results || []; // Assigns the recipes array from the response, defaulting to an empty array if undefined
        if (recipes.length === 0) { // Checks if the recipes array is empty
            resultsContainer.innerHTML = 'No recipes found.'; // Displays a message if no recipes are found
        } else { // If a recipe is found
            const randomRecipe = recipes[0]; // Selects the first (and only) recipe from the array (backend returns one random recipe)
            const recipeElement = document.createElement('div');
            const instructions = randomRecipe.instructions || 'Instructions not available.'; // Retrieves the instructions for the recipe, defaulting to a message if not available
           // Sets the inner HTML with recipe details using a template literal
            recipeElement.innerHTML = ` 
                <h3>${randomRecipe.title}</h3> <!-- Adds the recipe title as a heading -->
                <img src="${randomRecipe.image}" alt="${randomRecipe.title}" width="200"> <!-- Adds an image of the recipe -->
                <h4>Instructions:</h4>
                <p>${instructions}</p> <!-- Displays the instructions -->
                <p><a href="https://spoonacular.com/recipes/${randomRecipe.title}-${randomRecipe.id}" target="_blank">View Recipe</a></p> <!-- Adds a link to the full recipe -->
            `;
            resultsContainer.appendChild(recipeElement); // Appends the recipe div to the results container
        }
    } catch (error) { // Catches any errors during the fetch or processing
        console.error('Error fetching random recipes by meat:', error); // Logs the error to the browser console
        const resultsContainer = document.getElementById("recipe-results"); // Retrieves the results container again
        resultsContainer.innerHTML = 'Error fetching random recipes. Please try again.'; // Displays an error message
    } finally { // Executes regardless of success or failure
        loading.style.display = "none"; // Hide loading spinner
    }
}
// Function to clear the search results and reset dropdown
function clearHunt() { // Defines a function to clear displayed recipes and reset the meat selection
    console.log("Clear Hunt button clicked!"); // Logs a message to the console when the clear button is clicked
    const resultsContainer = document.getElementById("recipe-results"); // Retrieves the results container
    const meatSelect = document.getElementById("meat-select"); // Retrieves the dropdown element with ID "meat-select"
    resultsContainer.innerHTML = ''; // Clears all content in the results container
    meatSelect.value = "chicken"; // Resets the dropdown to the default option ("chicken")
}

// Add event listener for button click to search and display random recipe based on meat
document.getElementById("random-meat-recipes-button").addEventListener("click", () => { // Attaches a click event listener to the random recipe button
    const selectedMeat = document.getElementById("meat-select").value; // Gets the currently selected meat type from the dropdown
    searchRandomRecipesByMeat(selectedMeat); // Calls the function to fetch a random recipe for the selected meat
});

// Add event listener for button click to search by meat
document.getElementById("search-button").addEventListener("click", () => { // Attaches a click event listener to the search button
    const selectedMeat = document.getElementById("meat-select").value; // Gets the currently selected meat type
    searchRecipesByMeat(selectedMeat); // Calls the function to fetch all recipes for the selected meat
});

document.getElementById("clear-hunt-button").addEventListener("click", clearHunt); // Attaches a click event listener to the clear button, calling clearHunt

// Hide the recipe container initially
document.addEventListener("DOMContentLoaded", () => { // Adds an event listener that runs when the DOM is fully loaded
    const recipesContainer = document.getElementById("recipes-container"); // Retrieves the HTML element with ID "recipes-container"
    recipesContainer.style.display = 'none';  // Hides the recipes container by setting its display style to "none"
});
