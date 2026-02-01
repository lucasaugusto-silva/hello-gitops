# TesteDocker (Docker → Kubernetes → Argo CD)

## App local (Node + Docker)

Build e run:

```powershell
docker build -t hello-node:1 .
docker run --rm -p 3000:3000 -e APP_NAME=Lucas hello-node:1
```

Endpoints:
- `http://localhost:3000/`
- `http://localhost:3000/health`

## Kubernetes local (Kind)

Criar cluster e aplicar (modo simples):

```powershell
kind create cluster --name hello --image kindest/node:v1.32.2
kubectl config use-context kind-hello
kubectl apply -f .\k8s.yaml
kubectl port-forward svc/hello-node 8080:80
```

## GitOps (Kustomize) + Argo CD

Estrutura:
- `gitops/apps/hello-node/base`
- `gitops/apps/hello-node/overlays/dev`
- `gitops/apps/hello-node/overlays/prod`

### Instalar Argo CD no cluster

```powershell
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
kubectl rollout status deploy/argocd-server -n argocd
kubectl port-forward svc/argocd-server -n argocd 8081:443
```

### Criar a Application (ajuste `repoURL`)

```powershell
kubectl apply -f .\gitops\argocd\hello-node-dev.yaml
```

