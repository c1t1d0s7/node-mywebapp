# Docker Compose 리소스 관리

## 컨테이너 빌드 및 실행

```bash
docker compose up --build -d
```

## 컨테이너 확인

```bash
docker compose ls
docker compose ps
docker compose ps --services
```

## 컨테이너 실시간 로깅

```bash
docker compose logs -f
```

## 컨테이너 리소스 사용량 확인

```bash
docker compose stats
```

## 이미지 푸시

```bash
docker compose build --push --no-cache
```

## 중지 및 삭제

```bash 
docker compose down -v
```
