# Sandeep Pal Portfolio (Full Stack)

Modern full-stack portfolio project built with React + Express.

## Stack
- Frontend: React, Vite, Framer Motion, Axios, React Icons
- Backend: Node.js, Express.js
- Data source: API-driven JSON content
- Contact form: Backend endpoint with server-side message storage

## Features
- Premium one-page responsive portfolio UI
- Animated hero + timeline + skill sections
- API-based portfolio details and projects
- Live projects section with your links
- Working contact form (`POST /api/contact`)
- Mobile-friendly layout and sticky navigation

## Project Structure

```bash
PortfolioProject/
  client/
  server/
```

## Setup

1. Install root dependencies:
```bash
npm install
```

2. Create env files:
```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

3. Run both frontend + backend:
```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

## Update Your Data

All personal details and projects are managed from:
- `server/src/data/portfolioData.js`

Contact messages are stored at:
- `server/data/messages.json`

## API Endpoints
- `GET /api/health`
- `GET /api/portfolio`
- `GET /api/projects`
- `POST /api/contact`

## Build Frontend
```bash
npm run build
```

