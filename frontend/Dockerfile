FROM node:20-slim

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY frontend/package.json ./frontend/package.json
RUN npm install -g pnpm
RUN pnpm install

COPY frontend ./frontend
RUN pnpm run --filter frontend build

EXPOSE 3000

CMD ["pnpm", "run", "--filter", "frontend", "dev"]