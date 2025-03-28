import dotenv from 'dotenv';
import { Firewall } from '../interfaces/firewall';
import axios from 'axios';
import { Voucher } from '../interfaces/voucher';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });
const jsonString: any = process.env.VITE_FIREWALL_CONFIG;
const firewallConfig = JSON.parse(jsonString);

export const generateVoucher = async (firewall: Firewall): Promise<void> => {
    const selectedFirewall = firewallConfig.find((fw: { FIREWALL: string; }) => fw.FIREWALL === firewall.firewallName);

    try {
        const apiUrl = `${selectedFirewall.API_HOST}${selectedFirewall.API_URL}`;
        const body = {
            "user-id": firewall['user-id'],
            name: firewall.name,
            password: firewall.password,
            company: firewall.company,
            email: firewall.email,
            expiration: firewall.expiration,
            comment: firewall.comment,
            'mobile-phone': firewall['mobile-phone'],
            multiple: firewall.multiple,
            sponsor: firewall.sponsor,
        };

        const response = await axios.post(apiUrl, body, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${selectedFirewall.API_TOKEN}`,
            }
        });
    } catch (error) {
        console.error('Errore durante la generazione del voucher: ', error);
        throw new Error('Errore durante la generazione del voucher');
    }
}

export const getVoucher = async (firewall: any): Promise<Voucher[]> => {
    const selectedFirewall = firewallConfig.find((fw: { FIREWALL: string; }) => fw.FIREWALL === firewall.firewallName);
    //console.log(selectedFirewall);
    try {
        const apiUrl = `${selectedFirewall.API_HOST}${selectedFirewall.API_URL}`;
        //console.log("APIURL: " + apiUrl);

        const response = await axios.get(apiUrl, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${selectedFirewall.API_TOKEN}`,
            }
        });

        return response.data.results;
    } catch (error) {
        console.error('Errore durante la GET dei voucher: ', error);
        return [];
    }
}