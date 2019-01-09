FROM node:7.10 as build-deps

WORKDIR app

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

RUN npm run build

FROM alpine

COPY --from=build-deps /app/build /build