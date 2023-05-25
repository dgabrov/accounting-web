FROM nginx:1.19.1-alpine
WORKDIR /usr/share/nginx/html
COPY ./account/build ./
EXPOSE 80
