FROM node:20

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 9527

CMD ["npm", "run", "dev"]
