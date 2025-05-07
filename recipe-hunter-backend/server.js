const result = require('dotenv').config();
//require('dotenv').config(); // Loads environment variables from a .env file into process.env
console.log('Dotenv result:', result); // Debug: Log the result of dotenv config to check if it loaded correctly
console.log('API_KEY:', process.env.API_KEY); // Debug: Log API_KEY to verify it’s loaded

const express = require('express'); // Imports the Express.js framework for building the web server
const axios = require('axios'); // Imports Axios for making HTTP requests to the Spoonacular API
const cors = require('cors'); // Imports CORS middleware to enable cross-origin requests from the frontend

const app = express(); // Creates an instance of the Express application
const PORT = process.env.PORT || 3000; // Sets the port for the server, using an environment variable or defaulting to 3000

// Enables CORS to allow the frontend to make requests to the backend
app.use(cors({ origin: ['http://127.0.0.1:8081', 'http://localhost:8081'] })); // Enable CORS for frontend)); // Applies CORS middleware to allow requests from different origins (e.g., frontend on a different port)

// Validate API key
if (!process.env.API_KEY) {
    console.error('Error: API_KEY is not set in .env');
    process.exit(1);
}

// Endpoint to search recipes by meat type
app.get('/recipes/:meatType', async (req, res) => { // Defines a GET route for /recipes/:meatType, where :meatType is a URL parameter
    const meatType = req.params.meatType; // Extracts the meatType parameter from the URL (e.g., "chicken" from /recipes/chicken)
    const apiKey = process.env.API_KEY; // Retrieves the Spoonacular API key from the .env file via process.env
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${meatType}&apiKey=${apiKey}`; // Constructs the Spoonacular API URL with the meat type and API key

    try { // Begins a try-catch block to handle potential errors during the API request
        const response = await axios.get(apiUrl); // Makes an HTTP GET request to the Spoonacular API using Axios
        res.json(response.data); // Sends the API response data (recipes) as JSON to the frontend
    } catch (error) { // Catches any errors that occur during the request
        
        console.error('Error fetching recipes:', error); // Logs the error to the server console for debugging
        const status = error.response ? error.response.status : 500;
        const message = error.response ? error.response.data.message : 'Failed to fetch recipes';
        res.status(status).json({ error: 'Failed to fetch recipes' }); // Sends a 500 status code and error message to the frontend
    }
});

// Endpoint to fetch a random recipe by meat type
app.get('/random/:meatType', async (req, res) => { // Defines a GET route for /random/:meatType to fetch a random recipe
    const meatType = req.params.meatType; // Extracts the meatType parameter from the URL (e.g., "beef" from /random/beef)
    const apiKey = process.env.API_KEY; // Retrieves the Spoonacular API key from the .env file
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${meatType}&apiKey=${apiKey}`; // Constructs the API URL using complexSearch to filter by meat type

    try { // Begins a try-catch block to handle potential errors during the API request
        const response = await axios.get(apiUrl); // Makes an HTTP GET request to the Spoonacular API
        const recipes = response.data.results; // Extracts the array of recipes from the API response
        if (recipes.length === 0) { // Checks if no recipes were found
            res.json({ results: [] }); // Sends an empty results array to the frontend
        } else { // If recipes are found
            const randomIndex = Math.floor(Math.random() * recipes.length); // Generates a random index to select one recipe
            res.json({ results: [recipes[randomIndex]] }); // Sends a single random recipe as an array to the frontend
        }
    } catch (error) { // Catches any errors during the request
        console.error('Error fetching random recipe:', error); // Logs the error to the server console for debugging
        const status = error.response ? error.response.status : 500;
        const message = error.response ? error.response.data.message : 'Failed to fetch random recipe';
        res.status(status).json({ error: message });
       
    }
});

app.listen(PORT, () => { // Starts the Express server and listens on the specified port
    console.log(`Server running on port ${PORT}`); // Logs a message to the console to confirm the server is running
});