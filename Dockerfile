FROM nginx

COPY build /usr/share/nginx/html

VOLUME /var/log/nginx/log