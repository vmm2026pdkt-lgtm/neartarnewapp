# NearTar

Local business directory & buy/sell marketplace. React (Vite) frontend, FastAPI backend,
PostgreSQL database.

**Status: Phase 1.** Auth (register/login/refresh, JWT + Argon2) and the core
Category → Business → Product API/models are wired end-to-end. Everything else in
the full spec (requirements, chat, leads, reviews, notifications, subscriptions,
admin panel, search) is scaffolded as UI placeholders only — see
[`docs/API.md`](docs/API.md) for exactly what's implemented.

```
NearTar/
├── client/      React + Vite + Tailwind frontend
├── server/      FastAPI backend (SQLAlchemy + Alembic)
├── database/    Seed SQL / reference data
├── docs/        API reference
└── docker-compose.yml
```

## Run everything with Docker

Requires Docker Desktop running.

```bash
docker compose up --build
```

- Frontend: http://localhost:5173
- Backend: http://localhost:8000 (docs at `/docs`)
- Postgres: localhost:5432 (db `neartardb`, user/pass `neartar`/`neartar`)

Apply migrations once the containers are up:

```bash
docker compose exec backend alembic upgrade head
docker compose exec db psql -U neartar -d neartardb -f /dev/stdin < database/seed.sql
```

## Run locally without Docker

### Database

Start just Postgres via Docker (`docker compose up -d db`), or point
`server/.env`'s `DATABASE_URL` at your own local Postgres instance and create a
`neartardb` database.

### Backend (`server/`)

```bash
cd server
py -m venv .venv
./.venv/Scripts/python.exe -m pip install -r requirements.txt
cp .env.example .env               # adjust DATABASE_URL / JWT_SECRET_KEY if needed
./.venv/Scripts/python.exe -m alembic upgrade head
./.venv/Scripts/python.exe -m uvicorn app.main:app --reload
```

API docs: http://localhost:8000/docs

Load reference data (roles, starter categories):

```bash
psql -U neartar -d neartardb -f ../database/seed.sql
```

To promote a user to admin (no admin UI yet), update their `role_id` directly
in the `users`/`roles` tables.

### Frontend (`client/`)

```bash
cd client
npm install
npm run dev
```

Runs on http://localhost:5173 (or the next free port). Set `VITE_API_BASE_URL`
in a `client/.env` file if the backend isn't at `http://localhost:8000/api`.

## Tech stack

- **Frontend:** React 19, React Router, Redux Toolkit, Axios, Tailwind CSS v4,
  React Icons, Framer Motion.
- **Backend:** FastAPI, SQLAlchemy 2.0, Alembic, Pydantic v2, PyJWT, Argon2
  (via passlib), psycopg 3.
- **Database:** PostgreSQL (`neartardb`).
