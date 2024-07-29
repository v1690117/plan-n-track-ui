FROM node:22.1.0-alpine3.19 as build
WORKDIR /usr/app
COPY . /usr/app/
RUN npm ci
RUN npm run build

FROM nginxinc/nginx-unprivileged
EXPOSE 8080
COPY ./docker/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/app/build /usr/share/nginx/html
