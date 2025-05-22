# RouteRadar 

RouteRadar is a multi-transport route optimization web app that integrates Uber, public transit, and real-time weather data to help users determine the most efficient and practical travel method to their destination.

## 🚀 Objective

To develop a smart, user-centric web app that fetches and compares travel routes and prices from multiple transport services and overlays weather data to make personalized trip recommendations.

## 🌟 Key Features

- Input a start and end location.
- Get real-time ride estimates from Uber.
- Fetch public transit routes and times via OpenRouteService.
- Retrieve current weather conditions using OpenWeatherMap API.
- Compare cost, ETA, and weather to suggest the best travel option.
- User-friendly interface with clear recommendations.

## 🔧 Tech Stack

**Frontend**: React.js or Next.js  
**Backend**: Node.js + Express.js  
**Database**: Firebase (Spark Plan) or MongoDB Atlas (Free Tier)  
**Authentication**: Firebase Auth  
**Hosting**: Vercel (frontend), Render (backend)

## 🌐 APIs Used

- **Uber API** – ride price and ETA estimates  
- **OpenRouteService API** – public transit & routing data *(alternative to Google Maps)*  
- **OpenWeatherMap API** – weather forecasts  
- **OpenCage Geocoding API** – convert addresses into coordinates

## 🛠️ Development Workflow

1. Set up GitHub repo and define folder structure.
2. Design wireframes (Figma or sketch).
3. Initialize frontend with React/Next.js.
4. Set up Express backend and test routes.
5. Integrate APIs: Uber, OpenRouteService, Weather, Geocoding.
6. Implement logic to compare routes by price, ETA, and weather.
7. Build UI to present travel suggestions.
8. Polish UI, perform testing, and deploy.

## ✅ Setup Instructions

1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/RouteRadar.git
   ```  

2. Navigate into project directories and install dependencies:
    ```bash
    # Frontend
    cd frontend
    npm install

    # Backend
    cd ../backend
    npm install
    ```

3. Create a .env file in both /client and /server directories:
    ```bash
    touch .env
    ```
    Inside .env, add your API keys:
    ```
    UBER_API_KEY=your_uber_api_key
    OPENROUTESERVICE_API_KEY=your_openrouteservice_key
    WEATHER_API_KEY=your_openweathermap_key
    OPENCAGE_API_KEY=your_opencage_key
    ```

4. Install Dependencies:
    ```bash
    # Frontend
    cd client
    npm install

    # Backend
    cd ../server
    npm install
    ```

5. Start Development Servers:
    ```bash
    # Frontend (React)
    cd client
    npm start

    # Backend (Express)
    cd ../server
    node index.js
    ```
    Make sure ports don’t conflict (e.g., client on 3000, server on 5000). Use concurrently if you want to run both together.

## 🚀 Deployment
- Frontend: Vercel
- Backend: Render

## 💡 Tips
- All APIs used offer free tiers. Use them within limits to avoid charges.
- Store sensitive credentials securely in .env.
- Monitor rate limits from external APIs.
- Use caching if necessary for repeated API requests.