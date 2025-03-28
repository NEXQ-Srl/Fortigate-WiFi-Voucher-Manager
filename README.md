# Fortigate Voucher Manager

Generate and view the Voucher for Fortigate Firewall.
Generally used for the Guest Network

## 📋 Index
- [Prerequisites](#prerequisites)
- [How it Works](#how-it-works)
- [Create an Application on Entra](#create-an-application-on-entra)
- [Create a Fortigate Token](#create-a-fortigate-token)
- [Installation](#installation)
- [Images](#images)
- [Feedback](#feedback)
- [License](#license)

## ✅ Prerequisites
To use this application, you need:
- A **Fortigate Firewall**
- A **Microsoft Entra Tenant** for authentication
- **Docker** (Linux recommended)
- An **SSL Certificate** (By default, a self-signed certificate is installed)

## ⚙️ How it Works
- The software uses **Microsoft credentials** for login.
- It connects to **Fortigate APIs** to generate and manage vouchers.

## 🛠️ Create an Application on Entra
1. Login to [Microsoft Entra](https://entra.microsoft.com).
2. Navigate to **Identity** → **Applications** → **App registrations**.

   <img width="600" alt="App Registrations" src="https://github.com/user-attachments/assets/c42c903e-c200-4ff6-95de-3f71a7d6666b" />

4. Click on **New Registration** and fill out the form as shown below:

   <img width="600" alt="New Registrations" src="https://github.com/user-attachments/assets/1233c36b-64ba-4f13-a1cc-2ceab27ab22e" />

6. Copy the **Application (client) ID** and **Directory (tenant) ID**:

   <img width="600" alt="IDs" src="https://github.com/user-attachments/assets/53106aec-5f45-4b69-be46-dc9152e72563" />

## 🔑 Create a Fortigate Token
You need to have a network or SSID where portal access is configured.
1. Login to Fortigate Firewall
2. Go to "System" --> "Admin Prifiles"
   
<img width="600" alt="Fortigate Admin Profile" src="https://github.com/user-attachments/assets/c35fa2e0-d7bc-4174-ac97-7cd82d4984b3" />

4. Click on "Create New"
5. Compile an information like a photo and Click Save

<img width="600" alt="Fortigate Create Profile" src="https://github.com/user-attachments/assets/e162b03b-e9a3-496e-9609-b632da888cad" />

6. Go to "System" --> "Administrators" and click on "Create New" --> "REST API Admin" --> Compile a form and select the previously created profile

<img width="600" alt="Fortigate Rest API Gen" src="https://github.com/user-attachments/assets/b62bf4ab-97c9-4ed7-93f4-fa4c8ed758be" />

<img width="600" alt="Fortigate New Rest API" src="https://github.com/user-attachments/assets/26348152-1784-46a6-9cd8-1ec62db2dadd" />

7. After save show the API key

<img width="600" alt="Fortigate API key" src="https://github.com/user-attachments/assets/92e21c1c-4990-4c72-bf5e-c2623ad8cf48" />

## 🚀 Installation
1. **Download the code** from GitHub and edit the following environment variables in the `Dockerfile`:
   ```env
   ENV NODE_PORT=3000 //Do not touch
   ENV NODE_TLS_REJECT_UNAUTHORIZED=0 //Do not touch
   ENV SMTP_MAIL=Email_Address //Change this value
   ENV SMTP_HOST=SMTP_Server //Change this value
   ENV SMTP_PORT=587 //Change this value
   ENV SMTP_SECURE=false //Change this value
   ENV SMTP_USER=SMTP_UserName //Change this value
   ENV SMTP_PASSWORD=SMTP_Password //Change this value
   ENV VITE_CLIENT_ID="Entra_Client_ID" //Change this value
   ENV VITE_TENANT_ID="Entra_Tenant_ID" //Change this value
   ENV VITE_REDIRECT_URI="/" //Do not touch
   ENV VITE_API_GETVOUCHER_URL="/api/firewall/GetVoucher" //Do not touch
   ENV VITE_API_URL="/api/firewall/GenerateVoucher" //Do not touch
   ENV VITE_API_BACKEND_URL="/api/mail/send" //Do not touch
   ENV VITE_API_PREFIX="Username_Prefix" //Change this value
   ENV VITE_PHONE_COUNTRY="IT" //Change this value
   ENV VITE_NAME="Application_Name" //Change this value is the name in Browser Tab and Login
   ENV VITE_LOGO_URL="https://www.nexq.it/wp-content/uploads/2024/07/logo-colorato.svg" //Change this value is the image of the software
   ENV VITE_FIREWALL_CONFIG='[{"FIREWALL": "Firewall1","API_HOST": "https://firewall2.domain.it","API_URL": "/api/v2/cmdb/user/group/Guests%20Portale/guest?vdom=root","API_TOKEN": "apiTocker1234","WIFI_SSID": "SSID-Guest-WIFI"},{"FIREWALL": "Firewall2","API_HOST": "https://firewall2.domain.it","API_URL": "/api/v2/cmdb/user/group/Guest%20Users/guest?vdom=root","API_TOKEN": "apiTocker1234","WIFI_SSID": "SSID-Guest-WIFI"}]
   ```

   ### Notes:

   ***SMTP_MAIL*** It is the email that is used to send the credentials to the guest
   
   ***SMTP_HOST*** It is the email SMTP server like smtp.google.it
   
   ***SMTP_PORT*** It is the email SMTP server port like 587
   
   ***SMTP_USER*** is the user that is used to send emails
   
   ***SMTP_PASSWORD*** is the password that is used to send emails
   
   ***VITE_CLIENT_ID*** is the Microsoft Entra Application ID or Client ID
   
   ***VITE_TENANT_ID*** is the Microsoft Entra Tenant ID
   
   ***VITE_API_PREFIX*** It is the prefix used in the username
   
   ***VITE_PHONE_COUNTRY*** It is the phone default country. Esample: US: United States; CA: Canada; FR: France; DE: Germany; ES: Spain; GB: United Kingdom; AU: Australia; JP: Japan; CN: China; IN: India
   
   ***VITE_NAME*** It is the application name
   
   ***VITE_NAME*** It is the application name visible on the pages
   
   ***VITE_LOGO_URL*** It is the URL of your logo
   
   ***VITE_FIREWALL_CONFIG*** It is the firewalls configuration. You can add more firewalls. Insert here the data in Json Format:
   
   ```json[
     {
       "FIREWALL": "Firewall1",
       "API_HOST": "https://firewall2.domain.it",
       "API_URL": "/api/v2/cmdb/user/group/Guests%20Portale/guest?vdom=root",
       "API_TOKEN": "apiTocker1234",
       "WIFI_SSID": "SSID-Guest-WIFI"
     },
     {
       "FIREWALL": "Firewall2",
       "API_HOST": "https://firewall2.domain.it",
       "API_URL": "/api/v2/cmdb/user/group/Guest%20Users/guest?vdom=root",
       "API_TOKEN": "apiTocker1234",
       "WIFI_SSID": "SSID-Guest-WIFI"
     }
   ]
   ```
3. Download from Git:
   ```sh
   git clone https://github.com/NEXQ-Srl/Fortigate-WiFi-Voucher-Manager.git
   ```
4. Go to The folder with "dockerfile" and create an image:
   ```sh
   docker build -t fortigate-wifi-voucher-manager .
   ``` 
5. Run the container
   ```sh
   docker run -d \
   --name fortigate-voucher-manager \
   -p 8081:5173 \
   -p 3060:3000 \
   -e SMTP_MAIL="DoNotReply@domain.it" \
   -e SMTP_HOST="smtp.domain.net" \
   -e SMTP_PORT=587 \
   -e SMTP_SECURE=false \
   -e SMTP_USER=username \
   -e SMTP_PASSWORD=password \
   -e VITE_CLIENT_ID="EntraClientID" \
   -e VITE_TENANT_ID="EntraTenantID" \
   -e VITE_API_PREFIX="FG" \
   -e VITE_PHONE_COUNTRY="IT" \
   -e VITE_NAME="Voucher Manager" \
   -e VITE_LOGO_URL="https://www.nexq.it/wp-content/uploads/2024/07/logo-colorato.svg" \
   -e VITE_FIREWALL_CONFIG='[{"FIREWALL": "FirewallName","API_HOST": "https://firewall1","API_URL": "/api/v2/cmdb/user/group/Guests%20Portale/guest?vdom=root","API_TOKEN": "token","WIFI_SSID": "Guest"}]' \
   fortigate-wifi-voucher-manager
   ```
6. Go to **Web Browser** and click **Login**

💡 Note: Remeber to change the variable in docker run!

## Images
<img width="600" alt="Login" src="https://github.com/user-attachments/assets/cae837a6-0054-48f4-8256-52fc580d6cfd" />
<img width="600" alt="Voucher Generator" src="https://github.com/user-attachments/assets/cac4b52b-e484-4b6f-a8b3-6dba6b799a51" />
<img width="600" alt="Voucher List" src="https://github.com/user-attachments/assets/ef9ea37d-ab59-49bb-87c1-b82feaf8f26a" />


## Feedback
<p>Powered by <a href="http://www.nexq.it">NEXQ S.r.l.</a></p>
<p>Mail <a href="mailto:developer@nexq.it">developer@nexq.it</a> for more info.</p>
<p>Mail <a href="mailto:into@nexq.it">into@nexq.it</a> for custom implementation.</p>

<a href=https://www.linkedin.com/company/nexq><img style="margin: 0 10;" width="35" src="https://github.com/user-attachments/assets/571fbd1e-4c60-4ebd-985c-7aab446a23d6"></a>

## License
<p>Copyright (c) 2025 NEXQ S.r.l.</p>
<p>Creative Commons Legal Code (Non Commercial Use) </p>
