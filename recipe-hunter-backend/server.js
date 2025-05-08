const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: ['http://127.0.0.1:8081', 'http://localhost:8081'] }));

const mockRecipes = [
    {
        id: 1,
        title: "Mock Boozy BBQ Chicken",
        image: "https://picsum.photos/200"
        ,
        instructions: "This is a mock instruction for Boozy BBQ Chicken. Grill the chicken and enjoy!"
    },
    {
        id: 2,
        title: "Mock Easy Baked Parmesan Chicken",
        image: "https://picsum.photos/200",
        instructions: "This is a mock instruction for Easy Baked Parmesan Chicken. Bake at 400F for 20 minutes."
    }
];

app.get('/recipes/:meatType', async (req, res) => {
    res.json({ results: mockRecipes });
});

app.get('/random/:meatType', async (req, res) => {
    const randomIndex = Math.floor(Math.random() * mockRecipes.length);
    res.json({ results: [mockRecipes[randomIndex]] });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});