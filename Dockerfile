FROM node:22.1.0-alpine3.19 as build
WORKDIR /usr/app
COPY package.json /usr/app/
COPY package-lock.json /usr/app/
RUN npm ci
COPY . /usr/app/
RUN npm run build

FROM nginxinc/nginx-unprivileged
EXPOSE 8080
COPY ./docker/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/app/dist /usr/share/nginx/html
