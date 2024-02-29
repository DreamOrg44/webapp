#!/bin/bash

# Update the system
sudo yum update -y

# # Install PostgreSQL
# sudo yum install -y postgresql-server

# # Initialize the PostgreSQL database
# #sudo postgresql-setup initdb

# # Configure PostgreSQL with trust authentication (for demo purposes, adjust as needed)
# sudo PGSETUP_INITDB_OPTIONS=" --auth=trust" postgresql-setup --initdb --unit postgresql --debug

# # Start and enable PostgreSQL
# sudo systemctl start postgresql
# sudo systemctl enable --now postgresql

# echo 'Setting up PostgreSQL secure installation...'

# # Change the password for the postgres user
# #echo "ALTER USER postgres WITH PASSWORD 'root';" | sudo -u postgres psql
# sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD 'root';"
# sudo -u postgres psql -c "CREATE DATABASE health_check_db;"


# echo "PostgreSQL setup completed successfully, and the installed version is $(postgres --version)"

echo "installing node"
curl -sL https://rpm.nodesource.com/setup_16.x | sudo bash -
sudo yum install -y nodejs
node -v

echo "installing unzip"
sudo yum install unzip -y
unzip -version

