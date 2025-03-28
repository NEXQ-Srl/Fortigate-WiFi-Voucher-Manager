import { useMsal } from "@azure/msal-react";
import { InteractionRequiredAuthError } from "@azure/msal-browser";

export const useAuthToken = () => {
    const { instance, accounts } = useMsal();

    const getAccessToken = async () => {
        if (accounts.length === 0) return null; // Nessun utente autenticato

        const request = {
            scopes: ["api://"+import.meta.env.VITE_CLIENT_ID+"/.default"], // Sostituisci con lo scope corretto
            account: accounts[0], 
        };

        try {
            const response = await instance.acquireTokenSilent(request);
            //console.log(response);
            return response.accessToken; // 🔹 Questo è il token da inviare all'API
        } catch (error) {
            if (error instanceof InteractionRequiredAuthError) {
                try {
                    const response = await instance.acquireTokenPopup(request);
                    return response.accessToken;
                } catch (popupError) {
                    console.error("Errore ottenendo il token:", popupError);
                }
            }
            console.error("Errore nel recupero del token:", error);
        }
        return null;
    };

    return { getAccessToken };
};
