- **Backend** (Node + Express + MySQL):
  - Validation for start/end times.
  - Foreign key checks to ensure `employeeId` exists.
  - Reformatting of date strings from ISO to MySQL DATETIME.
  - Simple MVC structure with routes, controllers, models, and a service layer.
- **Frontend** (React + TypeScript + Vite):
  - Form to create/update timesheets, including a **dropdown** of employees so no one types IDs manually.
  - Table + **calendar toggle** for listing timesheets.
  - Minimal but consistent styling (Material UI or your chosen approach).
  - Data validated and times are properly sent to the backend.

**How to Run**:

1. **Backend**:
   - `cd backend` → `npm install` → configure `.env` → `npm run dev`.
2. **Frontend**:
   - `cd frontend` → `npm install` → `npm run dev`.
3. **Navigate** to `http://localhost:3000` for the frontend (or the configured port).
4. **Backend** typically runs at `http://localhost:4000` (adjust if needed).

I’ve followed the best practices you mentioned:

- **Clean architecture** (services for logic, controllers for requests).
- **Validation** (start < end, employee must exist).
- **Auto** formatting of dates to keep MySQL happy.
- **Dropdown** for employees
