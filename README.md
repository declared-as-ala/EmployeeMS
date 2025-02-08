# Timesheet Management System (Node.js + React)

## 📌 Features

### 🖥️ Backend (Node.js + Express + MySQL)

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
create Database employee_management;
cd backend
npm install
cp .env.example .env  # Configure environment variables
npm run dev
### 🎨 Frontend Setup:
```sh
cd frontend
npm install
npm run dev
```

### 🔗 Access the Application:
- **Frontend**: Open [`http://localhost:3000`](http://localhost:3000) (or configured port).
- **Backend**: Runs on [`http://localhost:4000`](http://localhost:4000) by default (adjust if needed).

---

## ✅ Best Practices Followed:
- 🏗 **Clean Architecture**: Services handle logic, controllers manage requests.
- 🔍 **Data Validation**: Ensures `startTime < endTime` and employee exists.
- 🕒 **Automatic Date Formatting**: Converts timestamps to MySQL-friendly format.
- 🔽 **Employee Dropdown**: Prevents manual entry errors.
