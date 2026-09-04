#!/usr/bin/env bash
set -euo pipefail

export DEBIAN_FRONTEND=noninteractive

apt-get update
apt-get install -y nodejs npm build-essential net-tools curl

cd /vagrant/app
npm install

if [ ! -f /vagrant/app/.env ]; then
  cp /vagrant/app/.env.example /vagrant/app/.env
fi

cat >/etc/systemd/system/task-manager-app.service <<'SERVICE'
[Unit]
Description=Task Manager API
After=network.target

[Service]
Type=simple
WorkingDirectory=/vagrant/app
EnvironmentFile=/vagrant/app/.env
ExecStart=/usr/bin/npm start
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
SERVICE

systemctl daemon-reload
systemctl enable task-manager-app
systemctl restart task-manager-app
