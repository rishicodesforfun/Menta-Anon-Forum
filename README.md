# Menta-Anon Forum 🛡️

A safe, anonymous community forum with persistent chat and crisis resources.

## 🚀 How to Run the Project

You will need **two separate terminal windows** open.

### Step 1: Start the Backend Server
1.  Open your first terminal.
2.  Navigate to the server folder:
    ```bash
    cd server
    ```
3.  Start the server:
    ```bash
    node server.js
    ```
    *You should see: `Server running on http://localhost:5000`*

### Step 2: Start the Frontend Client
1.  Open a **second** terminal.
2.  Navigate to the client folder:
    ```bash
    cd client
    ```
3.  Start the React app:
    ```bash
    npm run dev
    ```
    *You should see: `Local: http://localhost:5173/`*

### Step 3: Open in Browser
*   Go to **http://localhost:5173** in your web browser.

---

## 🛠️ Troubleshooting
*   **Port in Use?** If you see `EADDRINUSE`, run `taskkill /F /IM node.exe` in the terminal to clear old processes.
*   **Missing Modules?** If `node` or `npm` complains about missing files, run `npm install` inside the respective folder (`server` or `client`).
