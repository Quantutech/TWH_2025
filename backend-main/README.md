
# Backend

This project aims to run a PostgreSQL database and a backend application inside Docker containers.

## 🚀 Getting Started

This project provides a basic setup to start a PostgreSQL database and a backend application using Docker and Docker Compose.

### ✅ Prerequisites

- Docker and Docker Compose must be installed.
- Git (optional, for cloning the repository).

### 📥 Cloning the Project

Clone the latest version of the project to your local machine:

```bash
git clone https://github.com/TeleWellness-Hub/backend.git
cd backend
```

### ⚙️ Starting Dependencies

To build and start required dependencies:

```bash
docker compose -f docker-dependency.yml up --build -d
```

### 🛠️ Environment Configuration

Create a `.env` file in the project root and add the following configuration:

```env
# Server Configuration
WEB_SERVER_PORT=
LOG_LEVEL=

# Database Configuration
DB_CONNECTION=postgres
DB_HOST=167.88.38.12
DB_PORT=5432
DB_DATABASE=telewellness_hub
DB_USERNAME=telewellness_hub
DB_PASSWORD=Telewellness01*

# JWT Configuration
JWT_EXPIRES_IN=
JWT_SECRET_KEY=

# Client JWT Configuration
CLIENT_JWT_SECRET=
CLIENT_JWT_EXPIRY=
CLIENT_REFRESH_TOKEN_SECRET=
CLIENT_REFRESH_TOKEN_EXPIRY=

# Provider JWT Configuration
PROVIDER_JWT_SECRET=
PROVIDER_JWT_EXPIRY=
PROVIDER_REFRESH_TOKEN_SECRET=
PROVIDER_REFRESH_TOKEN_EXPIRY=
PROVIDER_JWT_EXPIRES_IN=
PROVIDER_JWT_SECRET_KEY=

# Admin JWT Configuration
ADMIN_JWT_EXPIRES_IN=
ADMIN_JWT_SECRET=
ADMIN_REFRESH_TOKEN_SECRET=
ADMIN_REFRESH_TOKEN_EXPIRY=

# Google OAuth Configuration
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=

# SMTP Configuration
SMTP_FROM=
SMTP_SSL=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=

# Stripe Configuration
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
```

### ▶️ Starting the Backend

After setting up your environment file, start the backend with:

```bash
docker compose up -d
```
