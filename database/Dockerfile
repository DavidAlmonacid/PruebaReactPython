FROM mcr.microsoft.com/mssql/server:2022-latest

ENV ACCEPT_EULA=Y
ENV MSSQL_SA_PASSWORD=SuperSecretPassword123!

WORKDIR /database

ADD init.sql /database/init.sql
