#!/bin/bash
echo "Installing google cloud ops_agent"
cd /tmp/
curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh
sudo bash add-google-cloud-ops-agent-repo.sh --also-install

sudo tee -a /etc/google-cloud-ops-agent/config.yaml << EOF
logging:
  receivers:
    webapp_log:
      type: files
      include_paths:
        - /var/log/csye6225/webapp.log
  service:
    pipelines:
      webapp_pipeline:
        receivers:
          - webapp_log
EOF