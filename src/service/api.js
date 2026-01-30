import axios from "axios";
import { useKeycloak } from "@react-keycloak/web";

const api = axios.create({
    baseURL: 'http://localhost:8080/api'
});

// Intercettore per aggiungere il token a ogni richiesta
api.interceptors.request.use(
    async (config) => {
        try {
            // Sostituisci 'window.keycloak' con il modo in cui accedi alla tua istanza
            await window.keycloak.updateToken(5);
            config.headers.Authorization = `Bearer ${window.keycloak.token}`;
        } catch (error) {
            console.error("Token refresh failed", error);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
