# Quickly - Fullstack Intern Technical Assessment

## Project Overview

Quickly is a marketplace for household chores. This repo implements the "Quick Book" and "Post & Quote" job-creation flows, with real-time booking, bidding, and escrow simulation.

## Dev Setup (Local)

### launch Backend

```bash
cd backend
# pnpm install
pnpm dev
```
or
`pnpm --filter frontend dev`
click: `http://localhost:3001`


### launch Frontend
```bash
cd frontend
# pnpm install
pnpm dev
```
or
`pnpm --filter backend dev`
click: `http://localhost:3000`

## Docker-based Setup

run all servers (frontend + backend + SQL)
`pnpm docker:up`
or
`docker-compose up --build`

close servers
`pnpm docker:down`

success:
- frontend: http://localhost:3000
- backend: http://localhost:3001
- SQL: postgresql://quickly:quickly@localhost:5432/quickly

restart:
```bash
pnpm docker:down
docker system prune -af  # clean up. be careful
# docker-compose down --rmi all
# pnpm store prune
pnpm docker:up
```
or
```
docker-compose down
docker-compose build --no-cache
docker-compose up
```
## TODO

I just finish customer part without login.

provider part is not finish, so far connecting with mock provider data.
