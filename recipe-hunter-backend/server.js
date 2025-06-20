const result = require('dotenv').config();
console.log('Dotenv result:', result);
console.log('API_KEY:', process.env.API_KEY);

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: ['http://localhost:8081', 'http://127.0.0.1:5500','https://my-recipes-project.vercel.app'],
    methods: ['GET', 'POST', 'OPTIONS'], // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Specify allowed headers
 }));
if (!process.env.API_KEY) {
    console.error('Error: API_KEY is not set in .env');
    process.exit(1);
}
// Health check endpoint for Render
app.get('/healthz', (req, res) => {
    res.status(200).send('OK');
});


// Endpoint to search recipes by meat type (returns 2 recipes)
app.get('/recipes/:meatType', async (req, res) => {
    const meatType = req.params.meatType;
    const apiKey = process.env.API_KEY;
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${meatType}&apiKey=${apiKey}&number=2`;

    try {
        console.log('Fetching initial recipes from:', apiUrl);
        const response = await axios.get(apiUrl);
        console.log('Initial response:', response.data);
        const recipes = response.data.results || [];
        console.log('Found recipes:', recipes.length);
        const recipeDetailsPromises = recipes.map(recipe =>
            axios.get(`https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${apiKey}&includeNutrition=false`)
        );
        console.log('Fetching details for:', recipes.map(r => r.id));
        const recipeDetailsResponses = await Promise.all(recipeDetailsPromises);
        const detailedRecipes = recipeDetailsResponses.map(response => response.data);
        console.log('Detailed recipes:', detailedRecipes);
        res.json({ results: detailedRecipes });
    } catch (error) {
        console.error('Error fetching recipes:', error.message, error.response ? error.response.data : '');
        const status = error.response ? error.response.status : 500;
        const message = error.response ? error.response.data.message : 'Failed to fetch recipes';
        res.status(status).json({ error: message });
    }
});

// Endpoint to fetch a random recipe by meat type (returns 1 recipe)
app.get('/random/:meatType', async (req, res) => {
    const meatType = req.params.meatType;
    const apiKey = process.env.API_KEY;
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${meatType}&apiKey=${apiKey}&number=2`;

    try {
        console.log('Fetching random recipe from:', apiUrl);
        const response = await axios.get(apiUrl);
        console.log('Initial response:', response.data);
        const recipes = response.data.results || [];
        if (recipes.length === 0) {
            console.log('No recipes found');
            return res.json({ results: [] });
        } else {
            const randomIndex = Math.floor(Math.random() * recipes.length);
            const recipeId = recipes[randomIndex].id;
            console.log('Fetching details for recipe ID:', recipeId);
            const detailResponse = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}&includeNutrition=false`);
            const detailedRecipe = detailResponse.data;
            console.log('Detailed recipe:', detailedRecipe);
            res.json({ results: [detailedRecipe] });
        }
    } catch (error) {
        console.error('Error fetching random recipe:', error.message, error.response ? error.response.data : '');
        const status = error.response ? error.response.status : 500;
        const message = error.response ? error.response.data.message : 'Failed to fetch random recipe';
        res.status(status).json({ error: message });
    }
});

// New endpoint to fetch any random recipe (returns 1 recipe)
app.get('/random-all', async (req, res) => {
    const apiKey = process.env.API_KEY;
    const apiUrl = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=1`;

    try {
        console.log('Fetching random recipe from:', apiUrl);
        const response = await axios.get(apiUrl);
        console.log('Initial response:', response.data);
        const recipes = response.data.recipes || [];
        if (recipes.length === 0) {
            console.log('No recipes found');
            return res.json({ results: [] });
        }

        const randomRecipe = recipes[0];
        console.log('Fetching details for recipe ID:', randomRecipe.id);
        const detailResponse = await axios.get(`https://api.spoonacular.com/recipes/${randomRecipe.id}/information?apiKey=${apiKey}&includeNutrition=false`);
        const detailedRecipe = detailResponse.data;
        console.log('Detailed random recipe:', detailedRecipe);
        res.json({ results: [detailedRecipe] });
    } catch (error) {
        console.error('Error fetching random recipe from all meals:', error.message, error.response ? error.response.data : '');
        const status = error.response ? error.response.status : 500;
        const message = error.response ? error.response.data.message : 'Failed to fetch random recipe';
        res.status(status).json({ error: message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});