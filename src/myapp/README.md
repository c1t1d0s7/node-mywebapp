# myapp

## Docker Compose 환경에서 API 확인

```bash
curl http://localhost:3001/
curl http://localhost:3001/hostname

curl http://localhost:3001/poddetails

curl http://localhost:3001/healthcheck
curl http://localhost:3001/healthcheck/maintenance
curl -X POST http://localhost:3001/healthcheck/maintenance/enable
curl http://localhost:3001/healthcheck/maintenance
curl http://localhost:3001/healthcheck
curl -X POST http://localhost:3001/healthcheck/maintenance/disable
curl http://localhost:3001/healthcheck/maintenance
curl http://localhost:3001/healthcheck
curl http://localhost:3001/healthcheck/uptime

curl http://localhost:3001/kill
curl http://localhost:3001/healthcheck/uptime

curl http://localhost:3001/load/cpu
curl http://localhost:3001/load/cpu\?n\=45
curl http://localhost:3001/load/memory
curl http://localhost:3001/load/memory\?n\=70000
```
