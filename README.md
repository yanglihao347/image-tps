## TPS
### 项目启动
1.启动node端 (项目默认启动在5000端口)
```
cd ./tps-node
npm i
npm run dev
```
2.启动web端 (默认3000端口)
```
cd ./tps-react
npm i 
npm run start
```

### 本地调试
需部署至nginx同源启动，避免接口跨域问题
nginx配置：
```
http {
    ...
    server {
        listen       8080;
        server_name  localhost;

        location / {
            proxy_pass http://localhost:3000;
        }

        location /api/ {
            proxy_pass http://localhost:5000;
            proxy_set_header Host $host;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}
```
启动nginx后，在8080端口开发调试


