# Timesheet Management System (Node.js + React)

## 📌 Features

### 🖥️ Backend (Node.js + Express + MySQL)
- ✅ **Validation**: Ensures start time is before end time.
- ✅ **Foreign Key Checks**: Validates that `employeeId` exists in the database.
- ✅ **Date Formatting**: Converts ISO date strings to MySQL `DATETIME` format.
- ✅ **MVC Architecture**: Implements a clean separation of concerns with:
  - **Routes** for API endpoints.
  - **Controllers** for handling requests.
  - **Models** for database interactions.
  - **Services** for business logic.

### 💻 Frontend (React + TypeScript + Vite)
- ✅ **Timesheet Form**: Allows users to create/update timesheets.
  - Includes a **dropdown** for selecting employees (no manual ID typing).
- ✅ **Timesheet Listing**: 
  - Displays data in a **table** with a **calendar toggle** view.
- ✅ **Styling**: Minimal yet consistent UI (Material UI or custom styling).
- ✅ **Validation**: Ensures proper data before sending requests to the backend.

---

## 🚀 How to Run the Project

### 🔧 Backend Setup:
```sh
cd backend
npm install
cp .env.example .env  # Configure environment variables
npm run dev
