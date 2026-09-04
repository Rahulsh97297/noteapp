# Notes App

## Overview
A minimal, responsive single-page application for creating and managing notes. This project was built as a timed coding assessment, focusing on clean architecture, fundamental state management, and robust API design without unnecessary abstractions.

## Features
* Create note
* List notes
* Delete note
* Validation (frontend and backend)
* Loading/error states

## Tech Stack
* React (Vite)
* Node.js
* Express
* In-memory storage (for assessment portability)

## Project Structure
```
notes-app/
├── backend/
│   ├── controllers/
│   │   └── notesController.js
│   ├── routes/
│   │   └── notes.js
│   └── server.js
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── notes.js
    │   ├── components/
    │   │   ├── NoteForm.jsx
    │   │   ├── NoteItem.jsx
    │   │   └── NoteList.jsx
    │   ├── App.jsx
    │   └── index.css
    └── package.json
```

## Setup

**Backend**
```bash
cd backend
npm install
npm start
```
*(Runs on `http://localhost:5000` by default)*

**Frontend**
```bash
cd frontend
npm install
npm run dev
```
*(Runs on `http://localhost:5173` by default)*

**Environment Variables**
*   **Frontend:** `VITE_API_URL` (Optional. Defaults to `http://localhost:5000/api/notes`)
*   **Backend:** `PORT` (Optional. Defaults to `5000`)

## API Endpoints

| Method | Endpoint         | Description |
| ------ | ---------------- | ----------- |
| GET    | `/api/notes`     | List notes  |
| POST   | `/api/notes`     | Create note |
| DELETE | `/api/notes/:id` | Delete note |

## Approach
*   **React State:** Exclusively utilizes `useState` for local state (form inputs, lists, loading/error toggles) and `useEffect` for data fetching on component mount. No external state libraries were used.
*   **Express Routes/Controllers:** Follows a standard MVC-lite pattern separating route definitions from business logic for maintainability.
*   **Storage:** Utilizes an in-memory array to ensure the application is immediately runnable without requiring a local database installation.
*   **Validation & Errors:** The frontend uses conditional rendering to block invalid submissions. The backend validates payloads directly in the controller, returning consistent JSON structures and appropriate HTTP status codes (`400`, `404`, `500`).

**Website Video Link:** https://drive.google.com/file/d/1OD0Mr0XUdAcv2GSJMvgko-2k3GKrkPQG/view?usp=sharing

**Code EXplaining Video:** https://drive.google.com/file/d/17XlISpBlm6HXf8tFyasCJALiC9XzUgOW/view?usp=sharing
