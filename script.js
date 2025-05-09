const recipesTitle = document.getElementById("recipes-title");
//const recipesImage = document.getElementById("recipes-image");
const generateRecipesBtn = document.getElementById("recipes-button");

// Function to search recipes by selected meat using async/await
async function searchRecipesByMeat(meatType) {
    console.log(`Fetching recipes for meat type: ${meatType}`);
    const loading = document.getElementById("loading");
    if (!loading) console.error("Loading element not found");
    loading.style.display = "block";
    const apiUrl = `https://my-recipes-project.onrender.com/recipes/${meatType}`;
    console.log(`Request URL: ${apiUrl}`);
    
    try {
        const response = await fetch(apiUrl);
        console.log(`Response status: ${response.status}`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Backend responded with status ${response.status}`);
        }
        const data = await response.json();
        console.log("Response data:", data);

        const resultsContainer = document.getElementById("recipe-results");
        if (!resultsContainer) console.error("recipe-results element not found");
        resultsContainer.innerHTML = '';

        const recipes = data.results || [];
        console.log(`Found ${recipes.length} recipes`);
        if (recipes.length === 0) {
            resultsContainer.innerHTML = 'No recipes found.';
        } else {
            recipes.forEach((recipe, index) => {
                const recipeElement = document.createElement('div');
                const instructions = recipe.instructions || 'Instructions not available.';
                const escapedInstructions = instructions.replace(/</g, '<').replace(/>/g, '>'); // Correct escaping
                console.log(`Generating HTML for ${recipe.title}:`, `
                    <h3>${recipe.title}</h3>
                    <img src="${recipe.image}" alt="${recipe.title}" width="200" onerror="this.onerror=null; this.src='https://picsum.photos/200'; this.alt='Image unavailable';">
                    <a href="#" class="toggle-instructions" data-index="${index}">Hunter’s Guide</a>
                    <p><a href="https://spoonacular.com/recipes/${encodeURIComponent(recipe.title.replace(/\s+/g, '-'))}-${recipe.id}" target="_blank">Hunter’s Intel</a></p>
                    <div class="instructions-content" id="instructions-${index}" style="display: none;">${escapedInstructions}</div>
                `);
                recipeElement.innerHTML = `
                    <h3>${recipe.title}</h3>
                    <img src="${recipe.image}" alt="${recipe.title}" width="200" onerror="this.onerror=null; this.src='https://picsum.photos/200'; this.alt='Image unavailable';">
                    <a href="#" class="toggle-instructions" data-index="${index}">Hunter’s Guide</a>
                    <p><a href="https://spoonacular.com/recipes/${encodeURIComponent(recipe.title.replace(/\s+/g, '-'))}-${recipe.id}" target="_blank">Hunter’s Intel</a></p>
                    <div class="instructions-content" id="instructions-${index}" style="display: none;">${escapedInstructions}</div>
                `;
                resultsContainer.appendChild(recipeElement);
            });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        const resultsContainer = document.getElementById("recipe-results");
        if (resultsContainer) {
            resultsContainer.innerHTML = 'Error fetching recipes. Please try again.';
        }
    } finally {
        loading.style.display = "none";
    }
}

// Function to search for a random recipe by meat using async/await
async function searchRandomRecipesByMeat(randomMeatType) {
    console.log(`Fetching random recipe for meat type: ${randomMeatType}`);
    const loading = document.getElementById("loading");
    loading.style.display = "block";
    const apiUrl = `https://my-recipes-project.onrender.com/recipes/${meatType}`; // Updated URL`;
    console.log(`Request URL: ${apiUrl}`);
    
    try {
        const response = await fetch(apiUrl);
        console.log(`Response status: ${response.status}`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Backend responded with status ${response.status}`);
        }
        const data = await response.json();
        console.log("Response data:", data);

        const resultsContainer = document.getElementById("recipe-results");
        resultsContainer.innerHTML = '';

        const recipes = data.results || [];
        console.log(`Found ${recipes.length} recipes`);
        if (recipes.length === 0) {
            resultsContainer.innerHTML = 'No recipes found.';
        } else {
            const randomRecipe = recipes[0];
            const recipeElement = document.createElement('div');
            const instructions = randomRecipe.instructions || 'Instructions not available.';
            const escapedInstructions = instructions.replace(/</g, '<').replace(/>/g, '>'); // Correct escaping
            recipeElement.innerHTML = `
                <h3>${randomRecipe.title}</h3>
                <img src="${randomRecipe.image}" alt="${randomRecipe.title}" width="200" onerror="this.onerror=null; this.src='https://picsum.photos/200'; this.alt='Image unavailable';">
                <a href="#" class="toggle-instructions" data-index="0">Hunter’s Guide</a>
                <p><a href="https://spoonacular.com/recipes/${encodeURIComponent(randomRecipe.title.replace(/\s+/g, '-'))}-${randomRecipe.id}" target="_blank">Hunter’s Intel</a></p>
                <div class="instructions-content" id="instructions-0" style="display: none;">${escapedInstructions}</div>
            `;
            resultsContainer.appendChild(recipeElement);
        }
    } catch (error) {
        console.error('Error fetching random recipes by meat:', error);
        const resultsContainer = document.getElementById("recipe-results");
        resultsContainer.innerHTML = 'Error fetching random recipes. Please try again.';
    } finally {
        loading.style.display = "none";
    }
}

// Function to search for a random recipe from all meats
async function searchRandomRecipeAllMeats() {
    console.log(`Fetching random recipe from all meats`);
    const loading = document.getElementById("loading");
    loading.style.display = "block";
    const apiUrl = `https://my-recipes-project.onrender.com/random-all`; // Update if renamed
    console.log(`Request URL: ${apiUrl}`);
    
    try {
        const response = await fetch(apiUrl);
        console.log(`Response status: ${response.status}`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Backend responded with status ${response.status}`);
        }
        const data = await response.json();
        console.log("Response data:", data);

        const resultsContainer = document.getElementById("recipe-results");
        resultsContainer.innerHTML = '';

        const recipes = data.results || [];
        console.log(`Found ${recipes.length} recipes`);
        if (recipes.length === 0) {
            resultsContainer.innerHTML = 'No recipes found.';
        } else {
            const randomRecipe = recipes[0]; // Only 1 recipe expected
            const recipeElement = document.createElement('div');
            const instructions = randomRecipe.instructions || 'Instructions not available.';
            const escapedInstructions = instructions.replace(/</g, '<').replace(/>/g, '>'); // Correct escaping
            recipeElement.innerHTML = `
                <h3>${randomRecipe.title}</h3>
                <img src="${randomRecipe.image}" alt="${randomRecipe.title}" width="200" onerror="this.onerror=null; this.src='https://picsum.photos/200'; this.alt='Image unavailable';">
                <a href="#" class="toggle-instructions" data-index="0">Hunter’s Guide</a>
                <p><a href="https://spoonacular.com/recipes/${encodeURIComponent(randomRecipe.title.replace(/\s+/g, '-'))}-${randomRecipe.id}" target="_blank">Hunter’s Intel</a></p>
                <div class="instructions-content" id="instructions-0" style="display: none;">${escapedInstructions}</div>
            `;
            resultsContainer.appendChild(recipeElement);
        }
    } catch (error) {
        console.error('Error fetching random recipe from all meats:', error);
        const resultsContainer = document.getElementById("recipe-results");
        resultsContainer.innerHTML = 'Error fetching random recipe. Please try again.';
    } finally {
        loading.style.display = "none";
    }
}

// Function to clear the search results and reset dropdown
function clearHunt() {
    console.log("Clear Hunt button clicked!");
    const resultsContainer = document.getElementById("recipe-results");
    const meatSelect = document.getElementById("meat-select");
    resultsContainer.innerHTML = '';
    meatSelect.value = "chicken";
}

// Add event listeners
document.getElementById("random-meat-recipes-button").addEventListener("click", () => {
    searchRandomRecipeAllMeats();
});

document.getElementById("search-button").addEventListener("click", () => {
    const selectedMeat = document.getElementById("meat-select").value;
    console.log(`Search button clicked for meat: ${selectedMeat}`);
    searchRecipesByMeat(selectedMeat);
});

document.getElementById("clear-hunt-button").addEventListener("click", clearHunt);

document.addEventListener("DOMContentLoaded", () => {
    const recipesContainer = document.getElementById("recipes-container");
    // Remove or adjust this line if it hides the content
    // recipesContainer.style.display = 'none'; // Comment out for now

    document.addEventListener('click', (event) => {
        const toggleLink = event.target.closest('.toggle-instructions');
        if (toggleLink) {
            event.preventDefault();
            const index = toggleLink.getAttribute('data-index');
            if (!index) {
                console.error('data-index attribute not found on toggle-instructions link');
                return;
            }
            const instructionsDiv = document.getElementById(`instructions-${index}`);
            if (instructionsDiv) {
                if (instructionsDiv.style.display === 'none') {
                    instructionsDiv.style.display = 'block';
                    toggleLink.textContent = 'Hide Instructions';
                } else {
                    instructionsDiv.style.display = 'none';
                    toggleLink.textContent = 'View Instructions';
                }
            } else {
                console.error(`Instructions div not found for index ${index}`);
            }
        }
    });
});