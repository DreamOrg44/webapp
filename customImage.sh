# Example: setup.sh
# This script performs user creation, installs dependencies, copies files, and sets up the systemd service.

#!/bin/bash

# Step 1: Create user
sudo useradd -m -s /usr/sbin/nologin -U csye6225

# Step 2: Install dependencies
sudo apt-get update
sudo apt-get install -y \
  build-essential \
  libssl-dev \
  libcairo2-dev \
  libpango1.0-dev \
  libjpeg-dev \
  libgif-dev

  npm install bcrypt@^5.1.1 body-parser@^1.20.2 dotenv@^16.4.4 express@^4.18.2 pg@^8.11.3 sequelize@^6.35.2 --save

  npm install jest@^29.7.0 supertest@^6.3.4 --save-dev
# Step 3: Copy application artifacts and configuration files
sudo cp -r $GITHUB_WORKSPACE/my-app.zip /opt/
sudo chown -R csye6225:csye6225 /opt/

# Step 4: Add systemd service file
sudo cp ./systemd-file.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable systemd-file.service
sudo systemctl start systemd-file.service
