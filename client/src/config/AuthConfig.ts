export const msalConfig = {
    auth: {
        clientId: import.meta.env.VITE_CLIENT_ID, // Il Client ID ottenuto da Azure
        authority: `https://login.microsoftonline.com/${import.meta.env.VITE_TENANT_ID}`, // Il Tenant ID
        redirectUri: import.meta.env.VITE_REDIRECT_URI, // URL di redirect, assicurati che corrisponda a quello che hai configurato su Azure
    },
    cache: {
        cacheLocation: 'sessionStorage', // dove viene memorizzato il token
        storeAuthStateInCookie: false, // può essere true per gestire meglio i problemi sui browser più vecchi
    },
};

export const loginRequest = {
    scopes: ['User.Read'], // Permessi richiesti per leggere i dati dell'utente
};
