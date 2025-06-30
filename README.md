# AI Follow Up

An AI-powered application to automate email follow-ups seamlessly with scheduled drafts and smart management.

---

## 🚀 Workflow

1. **User authenticates** and grants necessary permissions.
2. **User selects and labels** emails from the list.
3. A **follow-up email draft is created automatically** in the background using AI.
4. The **follow-up email is sent after 12 hours** of being created.
5. **Delete the draft** anytime if you don't want to send it.
6. **Remove the label** from the email to stop the application from tracking and sending follow-ups.

---

## 🛠️ Tools & Technologies

### Frontend

- Vite
- React
- Tailwind CSS

### Backend

- Inngest
- @inngest/agent-kit
- Express
- Google APIs
- Mongoose
- Node.js
- JSON Web Token (jsonwebtoken)

---

## 📁 Folder Structure

AI FOLLOW-UP/
├── client
│ ├── node_modules
│ ├── public
│ ├── src
│ ├── .env
│ ├── index.html
│ ├── package.json
│ ├── vite.config.js
│ └── ...
├── server
│ ├── controllers
│ ├── inngest
│ ├── middlewares
│ ├── models
│ ├── prompts
│ ├── routes
│ ├── utils
│ ├── .env
│ ├── index.js
│ ├── package.json
│ └── ...
└── README.md

### Explanation

- **client/** – Contains the frontend React application built with Vite and Tailwind CSS.
  - **public/** – Static assets.
  - **src/** – All React components, pages, and logic.
  - **.env** – Environment variables for the client.
  - **vite.config.js** – Vite configuration file.
- **server/** – Contains the backend Express server.
  - **controllers/** – Request handlers and business logic.
  - **inngest/** – Inngest event-driven workflows and functions.
  - **middlewares/** – Custom Express middleware functions.
  - **models/** – Mongoose models for MongoDB collections.
  - **prompts/** – AI prompt templates used for generating follow-up emails.
  - **routes/** – API route definitions.
  - **utils/** – Utility functions for the backend.
  - **.env** – Environment variables for the server.
  - **index.js** – Entry point for the Express server.
- **README.md** – Project documentation.

---

## ⚡ Running the Project

1. Clone the repository:

   ```bash
   git clone https://github.com/guglanisuvid/AI-Follow-Up.git
   ```

2. Install dependencies , run the command in `client` and `server` folder seperately:

   ```bash
   npm install
   ```

3. Create a project in **Google Cloud Platform** to set up authentication.

4. Set up environment variables for both server and client:

### Server `.env`

PORT=
VITE_APP_URL=
MONGO_URI=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=
GEMINI_API_KEY=
JWT_SECRET=
JWT_EXPIRATION=

### Client `.env`

VITE_API_URL=

5. Run the command in `client` folder:

```bash
npm run dev
```

6. Run the commands in `server` folder:

```bash
npm run inngest-dev
```

```bash
npm run dev
```

---

## 📜 License

This project is licensed under the **MIT License**.

---
