---
title: 'Container Security Essentials: Securing Your Docker & Kubernetes Stack'
excerpt: 'From image scanning to runtime protection, learn how to secure containerized applications across the entire lifecycle. Essential practices for DevSecOps teams.'
coverImage: '/assets/blog/hello-world/cover.jpg'
date: '2024-10-01T05:00:00.000Z'
author:
  name: Pi Sigma Team
  picture: '/assets/blog/authors/jj.jpeg'
ogImage:
  url: '/assets/blog/hello-world/cover.jpg'
---

## Why Container Security Matters

Containers have revolutionized application deployment, but they introduce unique security challenges. A single vulnerable container can compromise your entire infrastructure.

## The Container Security Stack

```
┌─────────────────────────────────┐
│   Application Code Security     │
├─────────────────────────────────┤
│   Container Image Security       │
├─────────────────────────────────┤
│   Container Runtime Security     │
├─────────────────────────────────┤
│   Orchestration Security (K8s)   │
├─────────────────────────────────┤
│   Host & Infrastructure Security │
└─────────────────────────────────┘
```

## Securing Container Images

### 1. Use Minimal Base Images

```dockerfile
# ❌ Don't use full OS images
FROM ubuntu:latest

# ✅ Use minimal images
FROM alpine:3.18
# or
FROM gcr.io/distroless/static-debian11
```

### 2. Scan for Vulnerabilities

```bash
# Using Trivy
trivy image myapp:latest

# Using Grype  
grype myapp:latest

# CI/CD integration
docker build -t myapp:latest .
trivy image --exit-code 1 --severity HIGH,CRITICAL myapp:latest
```

### 3. Multi-Stage Builds

Reduce attack surface with multi-stage builds:

```dockerfile
# Build stage
FROM golang:1.21 AS builder
WORKDIR /app
COPY . .
RUN go build -o main .

# Final stage - minimal image
FROM alpine:3.18
RUN apk --no-cache add ca-certificates
COPY --from=builder /app/main /main
USER nobody
ENTRYPOINT ["/main"]
```

### 4. Sign Your Images

```bash
# Using Docker Content Trust
export DOCKER_CONTENT_TRUST=1
docker push myregistry.com/myapp:latest

# Using Cosign
cosign sign --key cosign.key myregistry.com/myapp:latest
```

## Runtime Security

### Implement Security Policies

```yaml
# Pod Security Policy (PSP)
apiVersion: policy/v1beta1
kind: PodSecurityPolicy
metadata:
  name: restricted
spec:
  privileged: false
  allowPrivilegeEscalation: false
  requiredDropCapabilities:
    - ALL
  volumes:
    - 'configMap'
    - 'emptyDir'
    - 'secret'
  runAsUser:
    rule: 'MustRunAsNonRoot'
  seLinux:
    rule: 'RunAsAny'
  fsGroup:
    rule: 'RunAsAny'
```

### Runtime Monitoring with Falco

```yaml
# Falco rule to detect shell in container
- rule: Shell in Container
  desc: Detect shell execution in container
  condition: >
    spawned_process and 
    container and
    proc.name in (bash, sh, zsh)
  output: >
    Shell spawned in container
    (user=%user.name container=%container.name 
    command=%proc.cmdline)
  priority: WARNING
```

## Kubernetes Security Best Practices

### 1. Network Policies

Implement microsegmentation:

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: api-network-policy
spec:
  podSelector:
    matchLabels:
      app: api
  policyTypes:
    - Ingress
    - Egress
  ingress:
    - from:
        - podSelector:
            matchLabels:
              app: frontend
      ports:
        - protocol: TCP
          port: 8080
  egress:
    - to:
        - podSelector:
            matchLabels:
              app: database
      ports:
        - protocol: TCP
          port: 5432
```

### 2. RBAC Configuration

Principle of least privilege:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: pod-reader
rules:
  - apiGroups: [""]
    resources: ["pods"]
    verbs: ["get", "list"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: read-pods
subjects:
  - kind: ServiceAccount
    name: myapp
roleRef:
  kind: Role
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io
```

### 3. Secrets Management

Never hardcode secrets:

```yaml
# Using Kubernetes Secrets
apiVersion: v1
kind: Secret
metadata:
  name: db-credentials
type: Opaque
data:
  username: dXNlcm5hbWU=  # base64 encoded
  password: cGFzc3dvcmQ=  # base64 encoded
```

Better: Use external secret managers:

```yaml
# Using External Secrets Operator
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: db-credentials
spec:
  refreshInterval: 1h
  secretStoreRef:
    name: aws-secrets-manager
  target:
    name: db-credentials
  data:
    - secretKey: username
      remoteRef:
        key: prod/db/credentials
        property: username
```

## Container Security Scanning in CI/CD

```yaml
# GitHub Actions example
name: Container Security Scan

on: [push, pull_request]

jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build image
        run: docker build -t myapp:${{ github.sha }} .
      
      - name: Run Trivy vulnerability scanner
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: myapp:${{ github.sha }}
          format: 'sarif'
          output: 'trivy-results.sarif'
          severity: 'CRITICAL,HIGH'
      
      - name: Upload to GitHub Security
        uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: 'trivy-results.sarif'
```

## Security Hardening Checklist

- [ ] Use minimal base images
- [ ] Scan images for vulnerabilities
- [ ] Run containers as non-root
- [ ] Use read-only root filesystems
- [ ] Drop unnecessary capabilities
- [ ] Implement network policies
- [ ] Configure RBAC properly
- [ ] Use secrets management
- [ ] Enable audit logging
- [ ] Implement runtime monitoring
- [ ] Regular security updates
- [ ] Image signing and verification

## Common Vulnerabilities to Watch

### Exposed Docker Socket

```yaml
# ❌ NEVER DO THIS
volumes:
  - /var/run/docker.sock:/var/run/docker.sock
```

### Privileged Containers

```yaml
# ❌ Avoid privileged mode
securityContext:
  privileged: true

# ✅ Drop capabilities instead
securityContext:
  capabilities:
    drop:
      - ALL
    add:
      - NET_BIND_SERVICE
```

## Monitoring and Response

Implement comprehensive logging:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: myapp
spec:
  containers:
    - name: app
      image: myapp:latest
      # Stdout/stderr logging
      # Collected by logging daemon
    - name: log-forwarder
      image: fluent/fluent-bit
      volumeMounts:
        - name: logs
          mountPath: /var/log/app
```

## Conclusion

Container security requires a defense-in-depth approach. Secure your images, harden your runtime, implement proper access controls, and monitor continuously.

Remember: Security is not a one-time task but an ongoing process. Stay updated with the latest vulnerabilities and best practices.

---

**Need help securing your container infrastructure?** [Contact Pi Sigma](https://www.pisigma.io/) for expert DevSecOps consulting.
