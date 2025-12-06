# TaskForge

TaskForge is a modern task management application designed to help users organize their daily activities efficiently. It features a secure authentication system and a dashboard for managing tasks.

## 🚀 Current Status

The project currently includes the following features:

- **Authentication:**
  - User Registration (Sign Up)
  - User Login (Sign In)
  - Secure Logout
  - JWT-based session management with HTTP-only cookies
- **Task Management (CRUD):**
  - Create new tasks with titles and descriptions
  - View a list of tasks
  - Update task details and toggle completion status
  - Delete tasks
- **UI/UX:**
  - Responsive dashboard layout
  - Dark mode interface using Tailwind CSS
  - Loading states and error handling
  - Modal forms for creating and editing tasks

## 🛠️ Tech Stack

### Backend Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens), bcrypt, cookie-parser
- **Tooling:** TypeScript, Nodemon

### Frontend Stack

- **Framework:** React (Vite)
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **State Management:** Context API (AuthContext)
- **Tooling:** TypeScript, ESLint

## ⚙️ Environment Variables

Create a `.env.development.local` file in the `backend` directory with the following variables:

```env
# Server Configuration
PORT=5500
SERVER_URL="http://localhost:5500"
NODE_ENV=development

# Database
MONGO_URI="your_mongodb_connection_string"

# Authentication
JWT_SECRET="your_jwt_secret_key"
JWT_EXPIRES_IN="1d"
```

## 📦 Installation & Running with Bun

Ensure you have [Bun](https://bun.sh/) installed on your machine.

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   bun install
   ```

3. Start the development server:

   ```bash
   bun run dev
   ```

   The server will start on `http://localhost:5500`.

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   bun install
   ```

3. Start the development server:

   ```bash
   bun run dev
   ```

   The application will be available at `http://localhost:5173`.

## 📝 Dependencies

### Backend Dependencies

- `express`: Web framework for Node.js
- `mongoose`: MongoDB object modeling tool
- `bcrypt`: Library to help hash passwords
- `jsonwebtoken`: Implementation of JSON Web Tokens
- `cookie-parser`: Parse Cookie header and populate `req.cookies`
- `dotenv`: Loads environment variables from .env file
- `nodemon`: Monitor for any changes in your source and automatically restart your server

### Frontend Dependencies

- `react` & `react-dom`: JavaScript library for building user interfaces
- `react-router-dom`: Declarative routing for React
- `tailwindcss`: A utility-first CSS framework
- `@tailwindcss/vite`: Tailwind CSS integration for Vite
