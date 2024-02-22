#!/bin/bash
SERVICE_NAME="webapp.service"
#SERVICE_FILE="/etc/systemd/system/$SERVICE_NAME.service"

sudo mv /tmp/webapp.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable "$SERVICE_NAME"
sudo systemctl start "$SERVICE_NAME"
sudo systemctl status "$SERVICE_NAME"
