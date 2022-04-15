FROM node:14-alpine

WORKDIR /app

COPY ./package.json /app 
COPY ./package-lock.json /app

RUN npm i --silent

COPY . /app 
EXPOSE 4500
CMD npm run dev