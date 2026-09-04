#!/usr/bin/env bash
set -euo pipefail

export DEBIAN_FRONTEND=noninteractive

apt-get update
apt-get install -y mysql-server net-tools

sed -i "s/^bind-address.*/bind-address = 192.168.57.12/" /etc/mysql/mysql.conf.d/mysqld.cnf
systemctl enable mysql
systemctl restart mysql

mysql < /vagrant/db/init.sql
