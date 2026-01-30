import axios from "axios";
import { useKeycloak } from "@react-keycloak/web";

const api = axios.create({
    baseURL: "http://localhost:8080" // backend
});

// aggiunge automaticamente il token ad ogni richiesta
export const useApi = () => {
    const { keycloak } = useKeycloak();

    api.interceptors.request.use(config => {
        if (keycloak && keycloak.authenticated) {
            config.headers.Authorization = `Bearer ${keycloak.token}`;
        }
        return config;
    });

    return api;
};
