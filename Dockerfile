FROM node:19-alpine

WORKDIR /app

COPY package*.json ./

COPY tsconfig.json ./

RUN npm install

COPY entrypoint.sh  ./

RUN chmod +x ./entrypoint.sh

COPY ./src ./src

COPY ./prisma ./prisma

COPY ./prisma/seed.ts ./prisma/seed.ts

ENTRYPOINT ["./entrypoint.sh"]
