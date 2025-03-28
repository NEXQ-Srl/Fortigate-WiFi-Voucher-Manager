import type React from "react"

import { useEffect, useState } from "react"

import { Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { addTime, generatePassword, generateUserId } from "@/utils/function"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { PhoneInput } from "../ui/phone-input"

import { useMsal } from '@azure/msal-react';
import { useAuthToken } from '@/hooks/useAuthToken'; // Custom hook for fetching access tokens
import { RootState } from "@/store/store"
import { useSelector } from "react-redux"

const VoucherForm = () => {

    // Retrieve account information from MSAL
    const { accounts } = useMsal();
    const { getAccessToken } = useAuthToken();

    //console.log("Account: " + accounts[0]?.name); // Log the name of the logged-in user

    // State to store form data
    const [formData, setFormData] = useState({
        name: "",
        company: "",
        email: "",
        notes: "",
        duration: "",
        mobilePhone: "",
    });

    // State to store generated voucher details
    const [generatedVoucher, setGeneratedVoucher] = useState<{
        username?: string;
        password?: string;
    } | null>(null);

    // State to manage messages, loading status, and modal visibility
    const [message, setMessage] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState<string>('');

    // Retrieve the selected firewall from Redux store
    const selectedFirewall = useSelector((state: RootState) => state.firewall.selectedFirewall);



    // Environment variables for API configuration
    const API_URL = import.meta.env.VITE_API_URL;
    const API_BACKEND_URL = import.meta.env.VITE_API_BACKEND_URL;
    const PREFIX = import.meta.env.VITE_API_PREFIX; // Username prefix

    useEffect(() => {
        if (!selectedFirewall) {
            setError("Please select firewall.");
            return;
        } else {
            setError('');
        }
    }, [selectedFirewall]);

    // Handle input changes for text and textarea fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle phone number input changes
    const handlePhoneChange = (value: string) => {
        setFormData((prev) => ({ ...prev, mobilePhone: value }));
    };

    // Handle selection changes for voucher duration
    const handleSelectChange = (value: string) => {
        setFormData((prev) => ({ ...prev, duration: value }));
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        setGeneratedVoucher(null);

        // Fetch access token
        const token = await getAccessToken();

        if (!selectedFirewall || !token) {
            setMessage("❌ Error generating voucher");
            setIsModalOpen(true);
            return;
        }

        // Generate user ID and password
        const userId = generateUserId(PREFIX);
        const password = generatePassword();

        // Get the logged-in user's display name
        const sponsor = accounts[0]?.name;

        try {
            //console.log("Generating voucher...");
            // API call to generate voucher
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    firewallName: selectedFirewall?.FIREWALL,
                    "user-id": userId,
                    name: formData.name,
                    password: password,
                    company: formData.company,
                    email: formData.email,
                    expiration: addTime(new Date(), Number(formData.duration)), // Convert duration to number
                    comment: formData.notes,
                    "mobile-phone": formData.mobilePhone,
                    multiple: 1,
                    sponsor: sponsor, // Include sponsor in the request body
                }),
            });

            if (response.ok) {
                //console.log("Voucher generated successfully!");
                //console.log(token);

                // API call to send email with voucher details
                const responseMail = await fetch(API_BACKEND_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        to: formData.email,
                        subject: "WiFi Voucher - " + selectedFirewall?.WIFI_SSID,
                        //text: `Hello,\nbelow find its Wifi GUEST code:\n\rWiFi SSID: ${selectedFirewall?.WIFI_SSID}\n\rUser: ${userId}\n\rPassword: ${password}`,
                        text: `<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Accesso WiFi Guest</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f4f4f4; padding: 20px 0;">
        <tr>
            <td align="center">
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
                    <tr>
                        <td align="center">
                            <h2 style="color: #333;">Benvenuto!</h2>
                            <p style="font-size: 16px; color: #555;">Puoi connetterti alla nostra rete WiFi Guest utilizzando le seguenti credenziali:</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; text-align: center;">
                            <p style="font-size: 18px; margin: 5px 0;"><strong>SSID:</strong> ${selectedFirewall.WIFI_SSID}</p>
                            <p style="font-size: 18px; margin: 5px 0;"><strong>User:</strong> ${userId}</p>
                            <p style="font-size: 18px; margin: 5px 0;"><strong>Password:</strong> <span style="color: #d9534f;">${password}</span></p>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding: 15px;">
                            <p style="font-size: 14px; color: #777;">Se hai problemi di connessione, non esitare a contattare il supporto.</p>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding-top: 10px; font-size: 14px; color: #777;">
                            <br/>
                            <p>Powered By <a href="https://nexq.it">NEXQ S.r.l.</a></p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`,
                    }),
                });

                //const responseText = await responseMail.text(); // Read the response as text
                //console.log("Server response:", responseText);

                if (responseMail.ok) {
                    //console.log("Email sent successfully!");
                    setMessage("✅ Voucher generated successfully!");
                    setGeneratedVoucher({
                        username: userId,
                        password: password,
                    });

                    // Reset form data
                    setFormData({
                        name: "",
                        company: "",
                        email: "",
                        notes: "",
                        duration: "",
                        mobilePhone: "",
                    });
                } else {
                    const errorDetails = await responseMail.json();
                    console.error("Error sending email:", errorDetails);
                    console.error("❌ Error sending email");
                }
            } else {
                setMessage("❌ Error generating voucher");
            }
        } catch (error) {
            console.error("API error:", error);
            setMessage("❌ API request error");
        } finally {
            setIsModalOpen(true); // Open modal to display message
        }
    };

    return (
        <>
            {error ? (
                <div className="flex flex-col justify-center items-center h-32 text-gray-700 font-semibold text-2xl">
                    <span className="text-4xl">😞</span>
                    <span className="p-2">{error}</span>
                </div>
            ) : (
                <Card>
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Form fields for user input */}
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="Guest full name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="company">Company</Label>
                                    <Input
                                        id="company"
                                        name="company"
                                        placeholder="Guest company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="guest@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="mobilePhone">Mobile Phone</Label>
                                    <PhoneInput
                                        id="mobile-phone"
                                        name="mobilePhone"
                                        placeholder="+39 123 456 7890"
                                        value={formData.mobilePhone}
                                        onChange={handlePhoneChange}
                                        defaultCountry={import.meta.env.VITE_PHONE_COUNTRY}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="duration">Voucher Duration</Label>
                                <Select value={formData.duration} onValueChange={handleSelectChange} required>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select duration" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">1 hour</SelectItem>
                                        <SelectItem value="2">2 hours</SelectItem>
                                        <SelectItem value="4">4 hours</SelectItem>
                                        <SelectItem value="6">6 hours</SelectItem>
                                        <SelectItem value="8">8 hours</SelectItem>
                                        <SelectItem value="10">10 hours</SelectItem>
                                        <SelectItem value="24">1 day</SelectItem>
                                        <SelectItem value="168">1 week</SelectItem>
                                        <SelectItem value="744">1 month</SelectItem>
                                        <SelectItem value="8928">1 year</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="notes">Notes</Label>
                                <Textarea
                                    id="notes"
                                    name="notes"
                                    placeholder="Additional information about the guest"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    rows={4}
                                />
                            </div>

                            <div className="flex justify-end">
                                <Button type="submit" className="gap-2">
                                    <Send className="h-4 w-4" />
                                    Generate Voucher
                                </Button>
                            </div>
                        </form>
                    </CardContent>

                    {/* Modal to display success or error messages */}
                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{message?.includes("❌") ? "Errore" : "Voucher Generato"}</DialogTitle>
                            </DialogHeader>

                            {generatedVoucher ? (
                                <div className="p-4 border rounded-md bg-gray-100">
                                    <p className="font-semibold">Dettagli del Voucher:</p>
                                    <p><strong>Username:</strong> {generatedVoucher.username}</p>
                                    <p><strong>Password:</strong> {generatedVoucher.password}</p>
                                    <p><strong>WiFi:</strong> {selectedFirewall?.WIFI_SSID}</p>
                                </div>
                            ) : <div>{message}</div>}
                            <DialogFooter>
                                <Button onClick={() => setIsModalOpen(false)}>Chiudi</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </Card>
            )
            }
        </>

    );
};

export default VoucherForm;