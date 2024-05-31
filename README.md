# node-mywebapp

목적: 도커, 쿠버네티스를 더 잘 이해하기 위해 Node.js 런타임과 Express.js 프레임워크를 사용한 간단한 웹 애플리케이션

## 디렉토리

- `docker/`: 도커 컨테이너 실행을 위한 Docker Compose 파일
- `kubernetes/`: 쿠버네티스 리소스 실행을 위한 YAML 파일
- `src/`: 소스 코드
  - `myweb`: EJS 템플릿 엔진, Express.js 프레임워크를 사용한 프론트엔드
  - `myapp`: Express.js 프레임워크 백엔드
    - 호스트명을 출력하는 백엔드
    - 쿠버네티스 Downward API를 사용한 백엔드
    - 일반적인 `go-myweb` 이미지처럼 단독 사용가능
    - 헬스체크 기능: 쿠버네티스 프로브
      - 애플리케이션: Liveness Probe, Readiness Probe
    - 부하 생성 기능
      - CPU: 피보나치 수열 계산
      - Memory: 큰 배열 생성
  - `mydiary`: Express.js 프레임워크, Sequelize ORM을 사용한 백엔드
    - MySQL 데이터베이스에 간단한 일기를 저장, 생성, 수정, 삭제
    - 헬스체크 기능: 쿠버네티스 프로브
      - 애플리케이션: Liveness Probe
      - 데이터베이스: Readiness Probe
  - `myweather`: Express.js 프레임워크를 사용한 백엔드
    - wttr.in API를 사용하여 날씨 정보를 출력
    - [ ] `mydiary`와 연동해 날씨 정보를 일기에 저장, 연동 기능 추가 필요

## 추가 필요한 기능

- [ ] `myapp` 및 `mydiary`에서 유지관리(maintenance) 모드 활성 시 500 에러로 프론트엔드가 표시되지 않음
  - 백엔드는 500으로 출력되어야 하나
  - 프론트엔드는 정상적으로 200으로 출력되어야 함  
- [ ] `myweb`에서 헬스체크 기능은 `myapp`에만 적용되어 있음
  - `mydiary`와 `myweather`에도 적용 필요
- [ ] `myweb`이 현재 EJS 템플릿 엔진으로 구성되어 있으며, Vanilla JS 또는 React.js로 변경 필요
- [ ] `myweather`와 `mydiary` 연동
- [ ] 인증
- [ ] 쿠키 및 세션
