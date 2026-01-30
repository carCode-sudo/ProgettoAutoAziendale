import axios from "axios";
import  keycloak  from "./auth/Keycloak";

/* export default axios.create({
    baseURL: '',
    headers: {
        'Content-Type': 'application/json'
    }
});
*/
const httpClient = axios.create({
    baseURL: '',
});

httpClient.interceptors.request.use(
    async (config) => {
        if (keycloak.authenticated) {
            try {
                // Aggiorna il token se scade entro 30 secondi
                await keycloak.updateToken(30);
                config.headers.Authorization = `Bearer ${keycloak.token}`;
            } catch (error) {
                console.error("Token refresh failed", error);
                keycloak.login(); // Se il refresh fallisce, rimanda al login
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default httpClient;

