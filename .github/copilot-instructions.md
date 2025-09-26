# Copilot Instructions for Legal Transcription Codebase

## Overview
This project is a Node.js/Express web application for legal transcription services. It features user signup, file uploads, and admin/dashboard views, with MongoDB for data persistence. The frontend is static HTML/CSS/JS in `Public/`, and the backend is in `server.js`.

## Architecture
- **Backend:**
  - Main entry: `server.js`
  - Uses Express for routing and middleware
  - MongoDB (via Mongoose) for storing users and file submissions
  - Multer for file uploads (files saved to `Uploads/`)
  - Endpoints:
    - `POST /upload` — file upload (requires `name`, `email`, and file)
    - `POST /signup` — user registration
    - `GET /submissions` — fetch all submissions (for dashboard/admin)
- **Frontend:**
  - Static files in `Public/` (HTML, CSS, images)
  - No frontend framework; forms post directly to backend endpoints
  - Key pages: `index.html`, `admin.html`, `login.html`, `pricing.html`, etc.

## Developer Workflows
- **Start server:**
  - `npm start` or `node server.js` (default port: 3000, override with `PORT` env)
- **Environment setup:**
  - Copy `.env` from example in `Project API.txt` or set manually:
    - `PORT=3000`
    - `MONGODB_URI=mongodb://localhost:27017/legal_transcription` (or Atlas URI)
    - `PAYPAL_CLIENT_ID=...` (if integrating payments)
- **Dependencies:**
  - Install with `npm install` (see `package.json`)
- **Testing:**
  - No automated tests; manual testing via browser and API requests

## Patterns & Conventions
- **MongoDB Models:**
  - `Submission` and `User` schemas in `server.js`
  - All user and file data stored in MongoDB
- **Uploads:**
  - Files uploaded via `/upload` endpoint, saved in `Uploads/` directory
- **Static Assets:**
  - Served from `Public/` via Express static middleware
- **Error Handling:**
  - API endpoints return status codes and simple messages
  - Console logs for server-side errors
- **Styling:**
  - Custom CSS in `Public/style.css`; inline styles in some HTML files

## Integration Points
- **MongoDB Atlas:**
  - Connection string in `.env` or `process.env.MONGODB_URI`
- **Supabase:**
  - Credentials in `Project API.txt` (not currently integrated in code)
- **Payments:**
  - Placeholder for PayPal integration via `PAYPAL_CLIENT_ID` (not implemented)

## Examples
- To add a new API route, follow the Express pattern in `server.js`.
- To add a new page, create an HTML file in `Public/` and link it in navigation.
- To extend the data model, update the Mongoose schemas in `server.js`.

## Key Files & Directories
- `server.js` — main backend logic, API endpoints, models
- `Public/` — all frontend assets
- `Uploads/` — uploaded files
- `package.json` — dependencies and scripts
- `.env` — environment variables (not checked in)
- `Project API.txt` — reference for external credentials and example configs

---
**If any section is unclear or missing, please specify what needs improvement.**
