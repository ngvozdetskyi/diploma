FROM node:18-alpine

WORKDIR /app

COPY ./package*.json .

RUN npm ci

COPY ./dist .

CMD ["node", "./main.js"]