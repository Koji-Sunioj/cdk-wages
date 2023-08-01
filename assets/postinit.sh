export DB_SECRET
export FE_SECRET
source /etc/environment

CLOUD_CONFIG=/etc/cloud/cloud.cfg.d/cloud-config.cfg

if [ ! -f "$CLOUD_CONFIG" ]; then
      touch $CLOUD_CONFIG
      echo "" > /etc/cloud/cloud.cfg.d/cloud-config.g
      for VARIABLE in "#cloud-config" "cloud_final_modules:" "- [scripts-user, always]"
      do
            echo $VARIABLE >> $CLOUD_CONFIG
      done
fi

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