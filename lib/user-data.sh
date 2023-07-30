#!/bin/bash
apt update -y
apt install python3-pip postgresql libpq-dev -y
git clone https://github.com/Koji-Sunioj/fastapi-wages.git
cd fastapi-wages/
pip install -r requirements.txt
