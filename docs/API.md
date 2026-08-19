# NearTar API Reference (Phase 1)

Base URL: `http://localhost:8000/api`

Phase 1 covers authentication and the core Category → Business → Product chain.
Everything else in the full spec (requirements, chat, leads, reviews, notifications,
subscriptions, admin panel, search) is not implemented yet.

## Auth — `/auth`

| Method | Path              | Auth | Description                          |
|--------|-------------------|------|--------------------------------------|
| POST   | `/auth/register`  | none | Create a user account (default role `user`) |
| POST   | `/auth/login`     | none | Returns `access_token` + `refresh_token` |
| POST   | `/auth/refresh`   | none | Exchange a refresh token for a new pair |
| GET    | `/auth/me`        | JWT  | Current authenticated user |

## Users — `/users`

| Method | Path       | Auth | Description        |
|--------|------------|------|---------------------|
| GET    | `/users/me`| JWT  | Current authenticated user (mirrors `/auth/me`) |

## Categories — `/categories`

| Method | Path                                | Auth  | Description |
|--------|-------------------------------------|-------|-------------|
| GET    | `/categories`                       | none  | List active categories |
| GET    | `/categories/{id}`                  | none  | Get one category |
| POST   | `/categories`                       | admin | Create a category |
| GET    | `/categories/{id}/subcategories`    | none  | List subcategories for a category |
| POST   | `/categories/{id}/subcategories`    | admin | Create a subcategory |

## Business — `/business`

| Method | Path                | Auth | Description |
|--------|---------------------|------|-------------|
| GET    | `/business`         | none | List published businesses. Filters: `category_id`, `city`, `q`, `skip`, `limit` |
| GET    | `/business/mine`     | JWT  | Businesses owned by the current user |
| GET    | `/business/{id}`     | none | Get one business |
| POST   | `/business`          | JWT  | Create a business (current user becomes owner) |
| PUT    | `/business/{id}`     | JWT  | Update a business you own |

## Products — `/products`

| Method | Path               | Auth | Description |
|--------|--------------------|------|-------------|
| GET    | `/products`        | none | List published products. Filters: `category_id`, `city`, `q`, `sort` (`newest`\|`price_low`\|`price_high`), `skip`, `limit` |
| GET    | `/products/mine`    | JWT  | Products listed by the current user |
| GET    | `/products/{id}`    | none | Get one product |
| POST   | `/products`         | JWT  | Create a product (current user becomes seller) |
| PUT    | `/products/{id}`    | JWT  | Update a product you listed |

## Auth model

- Passwords hashed with Argon2 (`passlib[argon2]`).
- Access tokens: 60 min expiry. Refresh tokens: 30 days.
- Bearer token in `Authorization: Bearer <token>` header.
- Admin-only routes use `require_role("admin")` — there's no role-assignment
  endpoint yet, so promote a user to `admin` directly in the `roles`/`users`
  tables until the admin panel exists.

## Not yet implemented

Requirements, chat, leads, reviews/ratings, favorites, notifications,
subscriptions/payments, advertisements, reports, activity logs, admin panel,
global search. Model/router additions for these land in later phases.
