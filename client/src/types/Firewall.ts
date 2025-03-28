// Interface representing a firewall configuration
export interface Firewall {
  FIREWALL: string; // Name of the firewall
  API_HOST: string; // API host URL for the firewall
  API_URL: string; // API endpoint for the firewall
  API_TOKEN: string; // API token for authentication
  WIFI_SSID: string; // WiFi SSID associated with the firewall
}