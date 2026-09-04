#!/usr/bin/env bash
set -euo pipefail

export DEBIAN_FRONTEND=noninteractive

apt-get update
apt-get install -y nginx net-tools curl

cp /vagrant/infra/nginx/task-manager.conf /etc/nginx/sites-available/task-manager.conf
ln -sf /etc/nginx/sites-available/task-manager.conf /etc/nginx/sites-enabled/task-manager.conf
rm -f /etc/nginx/sites-enabled/default

nginx -t
systemctl enable nginx
systemctl restart nginx
