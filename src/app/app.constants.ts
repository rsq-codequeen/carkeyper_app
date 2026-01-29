// Check if the app is running on a live website (Vercel) or locally
const isProduction = window.location.hostname !== 'localhost';

export const API_URL = isProduction 
  ? 'https://carkeyper-backend.vercel.app/api' // Your new Vercel Backend
  : 'http://localhost:8080/api';               // Your Local Backend