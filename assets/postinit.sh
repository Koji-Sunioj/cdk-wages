source /etc/environment
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