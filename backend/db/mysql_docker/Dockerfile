FROM mysql:8.0.35

MAINTAINER WEi-CHENG
EXPOSE 3306

RUN chown -R mysql:root /var/lib/mysql/

ENV MYSQL_ALLOW_EMPTY_PASSWORD yes

COPY ./init.sql /docker-entrypoint-initdb.d/