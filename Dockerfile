# Stage 1: Build the client
FROM ubuntu:24.04 AS client-builder

# Install dependencies
RUN apt-get update && apt-get install -y \
    curl \
    gnupg2 \
    lsb-release \
    ca-certificates \
    build-essential \
    xz-utils && \
    rm -rf /var/lib/apt/lists/*

# Install Node.js v22.13.1 (for client)
RUN curl -fsSL https://nodejs.org/dist/v22.13.1/node-v22.13.1-linux-x64.tar.xz -o node-v22.13.1-linux-x64.tar.xz && \
    tar -xJf node-v22.13.1-linux-x64.tar.xz -C /usr/local --strip-components=1 && \
    rm node-v22.13.1-linux-x64.tar.xz

# Verify Node.js and npm installation
RUN node -v && npm -v

# Set working directory for client
WORKDIR /app/client

# Copy client package.json and package-lock.json
COPY client/package*.json ./

# Install client dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the client code
COPY client/ .

# Build the client app
RUN npm run build

# Stage 2: Build the server
FROM ubuntu:24.04 AS server-builder

# Install dependencies
RUN apt-get update && apt-get install -y \
    curl \
    gnupg2 \
    lsb-release \
    ca-certificates \
    build-essential \
    xz-utils && \
    rm -rf /var/lib/apt/lists/*

# Install Node.js v22.13.1 (for server)
RUN curl -fsSL https://nodejs.org/dist/v22.13.1/node-v22.13.1-linux-x64.tar.xz -o node-v22.13.1-linux-x64.tar.xz && \
    tar -xJf node-v22.13.1-linux-x64.tar.xz -C /usr/local --strip-components=1 && \
    rm node-v22.13.1-linux-x64.tar.xz

# Verify Node.js and npm installation
RUN node -v && npm -v

# Set working directory for server
WORKDIR /app/server

# Copy server package.json and package-lock.json
COPY server/package*.json ./

# Install server dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the server code
COPY server/ .

# Stage 3: Create the final image
FROM ubuntu:24.04 AS final

# Install dependencies for running both client and server
RUN apt-get update && apt-get install -y \
    curl \
    gnupg2 \
    lsb-release \
    ca-certificates \
    build-essential \
    xz-utils && \
    rm -rf /var/lib/apt/lists/*

# Install Node.js v22.13.1
RUN curl -fsSL https://nodejs.org/dist/v22.13.1/node-v22.13.1-linux-x64.tar.xz -o node-v22.13.1-linux-x64.tar.xz && \
    tar -xJf node-v22.13.1-linux-x64.tar.xz -C /usr/local --strip-components=1 && \
    rm node-v22.13.1-linux-x64.tar.xz

# Create directories for client and server
WORKDIR /app

# Copy the built client and server from previous stages
COPY --from=client-builder /app/client /app/client
COPY --from=server-builder /app/server /app/server

# Copy the .env file for the server and client
#COPY .env ./

# Expose the ports for both client (5173) and server (3000, or your preferred server port)
EXPOSE 5173 3000

# Environment variables (customizza secondo le tue necessità)
ENV NODE_PORT=3000
ENV NODE_TLS_REJECT_UNAUTHORIZED=0
ENV SMTP_MAIL=Email_Address
ENV SMTP_HOST=SMTP_Server
ENV SMTP_PORT=587
ENV SMTP_SECURE=false
ENV SMTP_USER=SMTP_UserName
ENV SMTP_PASSWORD=SMTP_Password
ENV VITE_CLIENT_ID="Entra_Client_ID"
ENV VITE_TENANT_ID="Entra_Tenant_ID"
ENV VITE_REDIRECT_URI="/"
ENV VITE_API_GETVOUCHER_URL="/api/firewall/GetVoucher"
ENV VITE_API_URL="/api/firewall/GenerateVoucher"
ENV VITE_API_BACKEND_URL="/api/mail/send"
ENV VITE_API_PREFIX="Username_Prefix"
ENV VITE_PHONE_COUNTRY="IT"
ENV VITE_NAME="Application_Name"
ENV VITE_LOGO_URL="https://www.nexq.it/wp-content/uploads/2024/07/logo-colorato.svg"
ENV VITE_FIREWALL_CONFIG='[{"FIREWALL": "Firewall1","API_HOST": "https://firewall1","API_URL": "/api/v2/cmdb/user/group/Guests%20Portale/guest?vdom=root","API_TOKEN": "ApiToken","WIFI_SSID": "WiFi-Guest"},{"FIREWALL": "Firewall2","API_HOST": "https://Firewall2","API_URL": "/api/v2/cmdb/user/group/Guest%20Users/guest?vdom=root","API_TOKEN": "SSID1","WIFI_SSID": "WiFi-Guest"}]'


# Start both client and server (make sure the server is running on port 3000)
CMD ["sh", "-c", "npm run start --prefix /app/server & npm run dev --prefix /app/client"]
