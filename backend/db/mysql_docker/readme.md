# My Uber Instruction to run database

## run the following to build the mysql docker server

Remember add the .env file and add the desired password to your Dockerfile.
Otherwise, there will be an error!
==================================

```shell
cd backend/db/mysql_docker
sudo docker build -t my_uber_database_image .
sudo docker run --name mysql_container -d -p 8080:3306 my_uber_database_image
mysql -h 127.0.0.1 -P 8080 -u root -p
# input the passwaord -p is for pwd (not necessary), -P for port

```

```
# If you cannot run the first line:
docker pull mysql:8.0.35
```
