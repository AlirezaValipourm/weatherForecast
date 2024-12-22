import axios from 'axios';
import { toast } from 'react-hot-toast';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_WEATHER_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        console.log(config)
        if (config.baseURL == process.env.NEXT_PUBLIC_WEATHER_API_BASE_URL) {
            const weatherApiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
            config.params = {
                ...config.params,
                key: weatherApiKey
            }
        }

        if (config.baseURL == process.env.NEXT_PUBLIC_GEOLOCATION_API_BASE_URL) {
            const geoApiKey = process.env.NEXT_PUBLIC_GEOLOCATION_API_KEY;
            config.params = {
                ...config.params,
                key: geoApiKey
            }
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor - Handle common errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.message || 'An error occurred';
        toast.error(message);
        return Promise.reject(error);
    }
);

export { api };