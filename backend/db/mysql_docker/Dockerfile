FROM mysql:8.0.35

MAINTAINER WEi-CHENG
EXPOSE 3306

RUN chown -R mysql:root /var/lib/mysql/

ENV LANG=C.UTF-8

ENV MYSQL_ALLOW_EMPTY_PASSWORD yes
# ENV MYSQL_ROOT_PASSWORD=1234

COPY ./init.sql /docker-entrypoint-initdb.d/
