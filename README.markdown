# Recipe Hunter: Meat Edition 🍖

Welcome to **Recipe Hunter: Meat Edition**, a web application designed to help meat lovers discover delicious recipes! This project allows users to search for meat-based recipes by type or fetch a random recipe (which may include non-meat options), leveraging the [Spoonacular API](https://spoonacular.com/food-api) to deliver rich culinary inspiration.

---

## 🌟 Features

- **Search Recipes by Meat Type**: Choose a meat (e.g., chicken, beef, pork) and get a list of recipes.
- **Random Recipe Generator**: Fetch a random recipe from all available meals (may not include meat).
- **Detailed Recipe Information**: View recipe titles, images, instructions, and links to the full recipe on Spoonacular.
- **Responsive Design**: A clean, user-friendly interface styled with CSS, accessible on both desktop and mobile.
- **Backend API**: A Node.js/Express backend hosted on Render, handling API requests to Spoonacular.
- **Frontend Interface**: A static frontend hosted on Vercel, built with HTML, CSS, and JavaScript.

---

## 🛠️ Project Structure

The project is a monorepo containing both the frontend and backend:

```
MY-RECIPES-PROJECT/
├── recipe-hunter-backend/     # Backend (Node.js/Express)
│   ├── package.json
│   ├── server.js
│   └── node_modules/
├── index.html                 # Frontend entry point
├── script.js                  # Frontend JavaScript logic
├── style.css                  # Frontend styling
├── config.js                  # Configuration (if used)
├── logo.jpg                   # Logo assets
├── Logo.jpg
├── logo1trans.png
└── README.md                  # Project documentation
```

- **Backend**: Located in `recipe-hunter-backend/`, powered by Express to fetch and serve recipe data.
- **Frontend**: Located in the root directory, a static site with `index.html` as the entry point.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.x or higher recommended)
- [Git](https://git-scm.com/)
- A [Spoonacular API key](https://spoonacular.com/food-api/console#Dashboard) (free tier available)

### Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Jackafella1/my-recipes-project.git
   cd my-recipes-project
   ```

2. **Set Up the Backend**:
   - Navigate to the backend directory:
     ```bash
     cd recipe-hunter-backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in `recipe-hunter-backend/`:
     ```plaintext
     API_KEY=your_spoonacular_api_key
     PORT=3000
     ```
     Replace `your_spoonacular_api_key` with your Spoonacular API key.

3. **Run the Backend Locally**:
   ```bash
   npm start
   ```
   The backend will run on `http://localhost:3000`.

4. **Run the Frontend Locally**:
   - Use a local server (e.g., with VS Code’s Live Server extension) to open `index.html` in your browser at `http://localhost:8081` (or your chosen port).
   - Update `script.js` to point to your local backend:
     ```javascript
     const apiUrl = `http://localhost:3000/recipes/${meatType}`;
     ```

### Testing Locally
- Access the frontend in your browser (e.g., `http://localhost:8081`).
- Test endpoints directly:
  - `http://localhost:3000/recipes/chicken` (search recipes for chicken)
  - `http://localhost:3000/random-all` (get a random recipe, which may not include meat)

---

## 📦 Deployment

### Backend (Render)
The backend is deployed on [Render](https://render.com/) as a Web Service.

- **URL**: `https://my-recipes-project.onrender.com` (consider renaming to `recipe-hunter-backend-jackafella1` for clarity).
- **Root Directory**: `/recipe-hunter-backend`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Environment Variables**:
  - `API_KEY=your_spoonacular_api_key`
  - `PORT=3000`

### Frontend (Vercel)
The frontend is deployed on [Vercel](https://vercel.com/) as a static site.

- **URL**: `https://my-recipes-project.vercel.app`
- **Root Directory**: `/` (root of the repository where `index.html` resides)
- **Steps**:
  1. Connect your GitHub repository to Vercel.
  2. Set the root directory to `/`.
  3. Deploy.
  4. Update CORS in `recipe-hunter-backend/server.js` to allow the Vercel URL:
     ```javascript
     app.use(cors({ origin: ['http://localhost:8081', 'https://my-recipes-project.vercel.app'] }));
     ```

### CORS Configuration
Ensure the backend allows requests from the frontend:
- In `recipe-hunter-backend/server.js`:
  ```javascript
  app.use(cors({ origin: ['http://localhost:8081', 'https://my-recipes-project.vercel.app'] }));
  ```
- Redeploy the backend after updating CORS.

---

## 🌐 API Endpoints

The backend provides the following endpoints:

- **GET `/recipes/:meatType`**
  - Returns 2 recipes for the specified meat type (e.g., `/recipes/chicken`).
- **GET `/random/:meatType`**
  - Returns 1 random recipe for the specified meat type (e.g., `/random/chicken`).
- **GET `/random-all`**
  - Returns 1 random recipe from all available meals (may not include meat).
- **GET `/healthz`**
  - Health check endpoint for Render (returns `OK`).

---

## ⚠️ Notes

- **Spoonacular API Limits**: The free tier has a daily limit of 150 API calls. Monitor usage or upgrade for production.
- **Render Free Tier**: The backend may spin down after inactivity, causing a delay of ~50 seconds on the first request.
- **CORS**: Ensure the frontend domain is allowed in the backend’s CORS configuration to avoid errors.
- **Case Sensitivity**: File names like `logo.jpg` and `Logo.jpg` may cause issues on case-sensitive systems. Consider renaming to avoid duplicates.

---

## 🤝 Contributing

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 📬 Contact

For questions or feedback, reach out to:
- **Author**: Jackafella
- **Email**: jackafella@gmail.com
- **GitHub**: [Jackafella1](https://github.com/Jackafella1)

Happy cooking with Recipe Hunter: Meat Edition! 🍗🥩