# Editable Table Application

This application consists of a backend server and a frontend interface for managing data in an editable table.

## Backend

### Technologies Used
- **Node.js** and **Express**: Backend server framework and API handling
- **Body-parser** and **Cors**: Middleware for handling JSON and enabling Cross-Origin Resource Sharing (CORS)
- **REST API**: CRUD operations for managing data

### API Endpoints

- **GET /data**: Fetches initial data for the editable table.
- **PUT /data/:id**: Updates specific data entry identified by `:id`.

### How to Run:
1. Install dependencies: `npm install`
2. Start the server: `node backend/server.js` or `npm start`
3. Server runs on `http://localhost:5000`

## Frontend

### Technologies Used
- **React.js**: Frontend library for building user interfaces
- **Axios**: Promise-based HTTP client for making requests to the backend API
- **TailwindCSS**: CSS for The react

### Features
- Displays a table with editable fields (Quantity, Amount, Action Type, Action Name).
- Allows users to edit fields inline and save changes back to the server.

### How to Run
1. Navigate to the frontend directory: `cd src`
2. Install dependencies: `npm install`
3. Start the development server: `npm start`
4. Application runs on `http://localhost:3000`

### Usage
1. Upon starting, enter your username to begin editing.
2. Edit fields directly in the table.
3. Click "Save" to update changes to the backend.
4. It will save changes to the backend with time and user name.
