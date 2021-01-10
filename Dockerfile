FROM node

WORKDIR /app

COPY package*.json ./
COPY .env ./

RUN npm install

COPY . .

CMD ["npm","start"]