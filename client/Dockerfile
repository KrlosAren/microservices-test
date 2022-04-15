FROM node:14-alpine

WORKDIR /app

COPY ./package.json /app 
COPY ./package-lock.json /app


RUN npm i --silent

COPY . /app 
EXPOSE 3000

CMD npm run dev