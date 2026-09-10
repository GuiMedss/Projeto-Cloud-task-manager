#!/usr/bin/env bash
set -euo pipefail

export DEBIAN_FRONTEND=noninteractive

apt-get update
apt-get install -y nodejs npm build-essential net-tools curl

if [ ! -f /vagrant/app/.env ]; then
  cp /vagrant/app/.env.example /vagrant/app/.env
fi

rm -rf /opt/task-manager
mkdir -p /opt/task-manager
cp -r /vagrant/app/. /opt/task-manager/
rm -rf /opt/task-manager/node_modules

cd /opt/task-manager
npm install

cat >/etc/systemd/system/task-manager-app.service <<'SERVICE'
[Unit]
Description=Task Manager API
After=network.target

[Service]
Type=simple
WorkingDirectory=/opt/task-manager
EnvironmentFile=/opt/task-manager/.env
ExecStart=/usr/bin/npm start
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
SERVICE

systemctl daemon-reload
systemctl enable task-manager-app
systemctl restart task-manager-app
