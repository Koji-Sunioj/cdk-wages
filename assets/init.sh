apt update -y
apt install python3-pip postgresql libpq-dev nginx -y
git clone https://github.com/Koji-Sunioj/fastapi-wages.git
cd fastapi-wages/
pip install -r requirements.txt
PUBLICIP=$(curl http://checkip.amazonaws.com)
echo "PUBLICIP=$PUBLICIP" >> /etc/environment
