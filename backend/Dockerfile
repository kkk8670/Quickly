FROM node:20-slim

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY backend/package.json ./backend/package.json
RUN npm install -g pnpm
RUN pnpm install && \
  echo "== pnpm ls tsx ==" && pnpm ls tsx || true && \
  echo "== ls /app/node_modules/tsx ==" && ls -l /app/node_modules/tsx || true

COPY backend ./backend

CMD ["pnpm", "run", "--filter", "backend", "dev"]

EXPOSE 3001

