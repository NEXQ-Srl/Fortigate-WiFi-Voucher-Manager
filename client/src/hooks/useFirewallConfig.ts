export function useFirewallConfig() {
    const jsonString = import.meta.env.VITE_FIREWALL_CONFIG;
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        console.error("Errore nel parsing del JSON:", error);
        return [];
    }
}