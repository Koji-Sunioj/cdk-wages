export DB_SECRET
export FE_SECRET
source /etc/environment

echo "" > /etc/cloud/cloud.cfg.d/cloud-config.g
CLOUD_CONFIG=/etc/cloud/cloud.cfg.d/cloud-config.cfg
touch $CLOUD_CONFIG

for VARIABLE in "#cloud-config" "cloud_final_modules" "- [scripts-user, always]"
do
    echo $VARIABLE >> $CLOUD_CONFIG
done

printf \
'server {
        listen 80;
        server_name %s;
        location / {
            proxy_pass http://127.0.0.1:8000;
      }
}' $PUBLICIP > /etc/nginx/sites-enabled/fastapi_nginx
service nginx restart
uvicorn main:app --reload