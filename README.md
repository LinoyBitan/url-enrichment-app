
# Enrichment App

This project is a URL enrichment application that consists of a frontend and a backend. The frontend provides a user interface to interact with the application, while the backend handles data extraction and enrichment processes.

## Table of Contents
- [Enrichment App](#enrichment-app)
  - [Table of Contents](#table-of-contents)
  - [Requirements](#requirements)
  - [Getting Started](#getting-started)
    - [Running the Backend](#running-the-backend)
    - [Running the Frontend](#running-the-frontend)
  - [Project Explanation](#project-explanation)

## Requirements

- **Node.js**: Ensure you have Node.js installed on your machine.
- **npm**: npm is installed with Node.js and is required to install dependencies.

## Getting Started

### Running the Backend

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Install the dependencies**:
   ```bash
   npm install
   ```

3. **Create a `.env` file** in the `backend` directory and provide the required environment variables:
   ```
   EXTRACT_URL=https://cdn.taboola.com/mobile-config/home-assignment/messages.json
   ENRICH_URL=https://cdn.taboola.com/mobile-config/home-assignment/data.json
   PORT=3000
   ```

4. **Start the backend server**:
   ```bash
   npm run server
   ```
   The backend server should now be running on the port specified in the `.env` file (e.g., `http://localhost:3000`).

### Running the Frontend

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install the dependencies**:
   ```bash
   npm install
   ```

3. **Start the frontend server**:
   ```bash
   npm run serve
   ```
   The frontend application should now be running.


## Project Explanation

- The frontend allows users to interact with the application and provides a UI to visualize enriched URLs.
- The backend has two main middlewares:
  - **extractUrlsMiddleware**: Extracts URLs from a given source.
  - **enrichUrlsMiddleware**: Enriches the extracted URLs with additional data.
- The backend uses environment variables for API endpoints and port configuration. Make sure to update the `.env` file with the correct URLs before running the application.

