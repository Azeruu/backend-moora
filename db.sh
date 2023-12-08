#!/bin/bash

PREFIX=""
# # MacOs
# if [[ "$OSTYPE" == "darwin"* ]]; then
#     PREFIX=""
# Linux 
# elif [[ "$OSTYPE" == "linux-gnu" ]]; then
#     PREFIX="sudo"
if [[ "$OSTYPE" == "linux-gnu" ]]; then
    PREFIX="sudo"
# else
#     echo "Operating System is Not Supported"
#     exit 1
fi

# Clear Console
clear

# Import .env File
if [ -f .env ]; then
  echo ".env found!"
  source .env
else
  echo "Please Set .env First!"
  exit 1
fi

DB_BACKUP_FILE="./database/sql_backup.sql"

if ! [ -f $DB_BACKUP_FILE ]; then
    mkdir ./database
    touch $DB_BACKUP_FILE
fi

start() {
  $PREFIX docker-compose stop 

  # Start Docker Compose
  $PREFIX docker-compose up -d

  # Install mariadb-client
  $PREFIX docker container exec $DB_CONTAINER_NAME apt update -y
  $PREFIX docker container exec $DB_CONTAINER_NAME apt install mariadb-client -y

  # Check Docker MariaDB is Connected
#   while ! $PREFIX docker container exec $DB_CONTAINER_NAME mariadb --user=root --password=$DB_ROOT_PASSWORD --execute="SELECT 1"; do
#     sleep 1
#   done

  if [ -f $DB_BACKUP_FILE ]; then
    # Import SQL Backup
    echo -e "\n\033[1mbackup.sql\033[0m is Found"
    echo "Importing MariaDB SQL..."

    $PREFIX docker container exec -i $DB_CONTAINER_NAME mariadb --user=root --password=$DB_ROOT_PASSWORD < $DB_BACKUP_FILE
  fi

  echo -e "\033[1m✨Database is Ready✨\033[0m"
}

stop() {
  # Export SQL Backup
  $PREFIX docker container exec $DB_CONTAINER_NAME mariadb-dump --user=root --password=$DB_ROOT_PASSWORD --lock-tables --all-databases > $DB_BACKUP_FILE

  # Stop Docker Compose
  $PREFIX docker-compose stop
}

case "$1" in
  run)
    start
    ;;
  drop)
    stop
    ;;
  *)
    echo "Usage: $0 [run|drop]"
    exit 1
    ;;
esac

exit 0