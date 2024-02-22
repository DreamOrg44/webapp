#!/bin/bash

# Define vars
INSTALL_DIR="/opt/csye6225"
ZIP_FILE="/tmp/webapp.zip"
APP_DIR="$INSTALL_DIR"
ENV_FILE="$APP_DIR/webapp/.env"

# Create installation directory
sudo mkdir -p "$INSTALL_DIR"
sudo mkdir -p "$APP_DIR"


# Move and extract webapp.zip
sudo mv "$ZIP_FILE" "$INSTALL_DIR"
#cd "$ZIP_FILE"
cd "$INSTALL_DIR"
echo "my current directory is"
pwd
echo "my current directory files are listed below"
ls -la
sudo unzip -o webapp.zip

echo "Reached line 24"
pwd
# Set permissions and ownership
sudo chown -R csye6225:csye6225 /opt
sudo chmod +x "$INSTALL_DIR/index.js"

echo "Reached line 30"

# Install npm dependencies
cd "$APP_DIR"
sudo npm install
pwd
echo "Reached line 36"
ls -la
# Create and populate .env.development
sudo tee .env <<EOL
PORT=5432
DB_HOST="localhost"
DB_NAME="health_check_db"
DB_DIALECT="postgres"
DB_USER="rushikesh"
DB_PASSWORD="1333189"
EOL
pwd
ls -la