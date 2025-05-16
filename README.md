# CRUD App Task

A modern React CRUD app with authentication, protected routes, product management, search, pagination, and beautiful UI/UX.

## Features
- Login/logout with JWT authentication
- Protected product listing page
- Product search (by name, brand, category)
- Pagination
- Delete product with confirmation and toast
- Loading spinners and toasts for feedback
- 404 Not Found page for invalid routes
- Responsive, clean design (TailwindCSS)

## Tech Stack
- React 19
- TypeScript
- React Router v7
- Axios
- React Toastify
- TailwindCSS

## Getting Started

### 1. Clone the repo
```bash
git clone <repo-url>
cd crud-app-task
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the dev server
```bash
npm run dev
```

App will be running at [http://localhost:5173](http://localhost:5173)

## Usage
- **Login:** Use your credentials to log in.
- **Product Page:** View, search, and delete products. Only accessible when logged in.
- **Logout:** Click the logout button (top right) to log out.
- **404:** Any invalid route shows a friendly 404 page.

## Project Structure
```
src/
  components/      # React components (Table, Login, Pagination, etc)
  api/             # API calls (auth, product)
  types/           # TypeScript types
  services/        # Auth token helpers
  main.tsx         # App entrypoint
```

## Notes
- API endpoints are expected to be available and CORS-enabled.
- React 18+ StrictMode may cause double API calls in dev (not in production).
- All UI feedback (loading, errors, success) is handled with toasts and spinners.

## License
MIT
