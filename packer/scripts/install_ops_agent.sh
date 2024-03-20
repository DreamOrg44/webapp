#!/bin/bash

# Install Ops Agent on CentOS-based system
curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh
sudo bash add-google-cloud-ops-agent-repo.sh --also-install
# sudo yum update -y && sudo yum install -y stackdriver-agent

# # Start Ops Agent service
# sudo systemctl start stackdriver-agent
