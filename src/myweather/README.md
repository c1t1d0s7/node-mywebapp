# myweather

## Docker Compose 환경에서 API 확인

```bash
curl -s http://localhost:3003/weather/
curl -s http://localhost:3003/weather/seoul
curl -s http://localhost:3003/weather/seoul | jq
curl -s http://localhost:3003/weather/seoul | jq '.current_condition[0].temp_C'
curl -s http://localhost:3003/weather/seoul | jq '.current_condition[0].weatherDesc[0].value'
curl -s http://localhost:3003/weather/seoul | jq '.nearest_area[0].areaName[0].value'
curl -s http://localhost:3003/weather/seoul | jq '.nearest_area[0].latitude'
curl -s http://localhost:3003/weather/seoul | jq '.nearest_area[0].longitude'
```
