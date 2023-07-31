#!/bin/bash
source /etc/environment
printf 'server {\n\
        listen 80;\n\
        server_name %s;\n\
        location / {\n\
            proxy_pass http://127.0.0.1:8000;\n\
      }\n\
}' $PUBLICIP > /etc/nginx/sites-enabled/fastapi_nginx
service nginx restart
uvicorn main:app --reload