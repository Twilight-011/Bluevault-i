
# Hosting the BlueVault Project Locally

This document provides step-by-step instructions for setting up and running the BlueVault application on your local machine for development and testing purposes.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js**: It is recommended to use a recent LTS (Long-Term Support) version, such as 18.x or 20.x. You can download it from [nodejs.org](https://nodejs.org/).
- **npm**: The Node Package Manager is included with the Node.js installation.
- **A Code Editor**: A modern code editor like [Visual Studio Code](https://code.visualstudio.com/) is recommended for a better development experience.

## Setup Instructions

Follow these steps to get the project running:

### 1. Install Dependencies

Navigate to the root directory of the project in your terminal and run the following command to install all the necessary packages defined in `package.json`:

```bash
npm install
```

### 2. Set Up Environment Variables

The project uses a `.env` file for environment variables. The Genkit AI features require a Google AI (Gemini) API key.

1.  Create a new file named `.env` in the root directory of the project.
2.  Add the following line to the `.env` file, replacing `<YOUR_GEMINI_API_KEY>` with your actual key:

    ```
    GEMINI_API_KEY=<YOUR_GEMINI_API_KEY>
    ```

    You can obtain a Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

### 3. Run the Development Servers

This project requires two separate development servers to be running simultaneously:

-   **Next.js Server**: For the main web application frontend.
-   **Genkit Server**: For the backend AI flows that power features like the MRV report generator.

Open two separate terminal windows or tabs in your project's root directory.

#### Terminal 1: Start the Next.js App

In the first terminal, run the following command to start the Next.js development server:

```bash
npm run dev
```

This will start the main application. By default, it will be accessible at **http://localhost:9002**.

#### Terminal 2: Start the Genkit Server

In the second terminal, run the following command to start the Genkit development server:

```bash
npm run genkit:dev
```

This server runs in the background and handles all the AI-related API calls. The application is already configured to communicate with it.

## Accessing the Application

Once both servers are running without errors, you can open your web browser and navigate to:

**http://localhost:9002**

You should now see the BlueVault login page, and all features, including the AI-powered components, should be fully functional.
