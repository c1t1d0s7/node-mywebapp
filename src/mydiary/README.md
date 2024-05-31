# mydiary

## Docker Compose 환경에서 API 확인

```bash
curl http://localhost:3002/healthcheck
curl http://localhost:3002/healthcheck/maintenance
curl -X POST http://localhost:3002/healthcheck/maintenance/enable
curl http://localhost:3002/healthcheck/maintenance
curl http://localhost:3002/healthcheck
curl -X POST http://localhost:3002/healthcheck/maintenance/disable
curl http://localhost:3002/healthcheck/maintenance
curl http://localhost:3002/healthcheck
curl http://localhost:3002/healthcheck/uptime
curl http://localhost:3002/healthcheck/database
curl http://localhost:3002/kill
curl http://localhost:3002/healthcheck/uptime

curl http://localhost:3002/diary
curl http://localhost:3002/diary -X POST -H "Content-Type: application/json" -d '{"title":"Hello", "content":"Hello, World!", "weather":"sunny"}'
curl http://localhost:3002/diary -X POST -H "Content-Type: application/json" -d '{"title":"Hi", "content":"Hi, World!", "weather":"rainy"}'
curl http://localhost:3002/diary -X POST -H "Content-Type: application/json" -d '{"title":"안녕", "content":"안녕하세요!", "weather":"cloudy"}'
curl http://localhost:3002/diary | jq
curl http://localhost:3002/diary/1
curl http://localhost:3002/diary/2
curl http://localhost:3002/diary/3
curl http://localhost:3002/diary/1 -X PUT -H "Content-Type: application/json" -d '{"title":"HELLO", "content":"HELLO, WORLD!", "weather":"sunny"}'
curl http://localhost:3002/diary/2 -X PUT -H "Content-Type: application/json" -d '{"title":"HHEELLLLOOO"}'
curl http://localhost:3002/diary/3 -X DELETE 
curl http://localhost:3002/diary | jq
```
