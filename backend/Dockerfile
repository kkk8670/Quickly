FROM node:20-slim

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY backend/package.json ./backend/package.json
RUN npm install -g pnpm
RUN pnpm install && \
  echo "== pnpm ls ts-node-dev ==" && pnpm ls ts-node-dev || true && \
  echo "== ls /app/node_modules/ts-node-dev ==" && ls -l /app/node_modules/ts-node-dev || true

COPY backend ./backend

CMD ["pnpm", "run", "--filter", "backend", "dev"]

EXPOSE 3001

