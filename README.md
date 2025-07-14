# LifeMantra Login Page

A full-stack login page project with OAuth authentication, built with a Node.js/Express backend and a modern React (TypeScript + Tailwind CSS) frontend.

## Features
- User authentication with Passport.js (Google, Facebook, etc.)
- Secure session management
- Modern, responsive UI
- TypeScript support
- Tailwind CSS styling

## Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```
### 2. Running the App
```bash
npm run dev
```
The frontend will run on [http://localhost:5173](http://localhost:5173) (default Vite port)

## Usage
- Visit the frontend URL in your browser.
- Use the login form or OAuth buttons to authenticate.
- On successful login, you will be redirected to your user profile page.

## Folder Structure
```
login-page/
  backend/      # Express backend with Passport.js
  frontend/     # React + Vite + Tailwind frontend
```

## License
MIT
