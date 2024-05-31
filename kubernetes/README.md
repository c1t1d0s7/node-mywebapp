# 쿠버네티스 리소스 관리

## 스토리지 클래스 준비

1. 기본 스토리지 클래스 준비

2. 기본 스토리지 클래스 확인

```bash
kubectl get storageclasses.storage.k8s.io

NAME                 PROVISIONER                RECLAIMPOLICY   VOLUMEBINDINGMODE   ALLOWVOLUMEEXPANSION   AGE
standard (default)   k8s.io/minikube-hostpath   Delete          Immediate           false                  11d
```

## 리소스 생성

```bash
kubectl apply -f .
```

## 리소스 삭제

```bash
kubectl delete -f .
kubectl delete pvc database-node-mydb-sts-0
```
