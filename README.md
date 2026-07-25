# TravelHub Backend

Backend del sistema **TravelHub**, desarrollado bajo una arquitectura de **microservicios**, permitiendo administrar la autenticación de usuarios, vuelos, reservas, pagos y administración mediante servicios independientes desplegados sobre Kubernetes.

---

# Arquitectura

La plataforma está basada en una arquitectura de microservicios donde cada servicio posee su propia lógica de negocio y una base de datos PostgreSQL independiente.

```
                    React Native / Expo
                             │
                             ▼
                       API Gateway
                             │
        ┌────────────┬────────────┬────────────┬────────────┬────────────┐
        ▼            ▼            ▼            ▼            ▼
     Auth        Vuelos      Reservas       Pagos        Admin
        │            │            │            │
        ▼            ▼            ▼            ▼
 PostgreSQL   PostgreSQL   PostgreSQL   PostgreSQL

                     OpenTelemetry SDK
                             │
                             ▼
                OpenTelemetry Collector
                             │
                             ▼
                          Jaeger
```

---

# Microservicios

El backend está compuesto por los siguientes servicios:

- API Gateway
- Auth Service
- Vuelos Service
- Reservas Service
- Pagos Service
- Admin Service
- PostgreSQL (Base de datos por servicio)
- OpenTelemetry Collector
- Jaeger

---

# Tecnologías utilizadas

- Node.js
- Express.js
- Sequelize
- PostgreSQL
- Docker
- Kubernetes
- Minikube
- OpenTelemetry
- OpenTelemetry Collector
- Jaeger
- JWT
- Bcrypt
- Axios

---

# Estructura del proyecto

```
Backend-TravelHub-Kubernetes
│
├── api-gateway/
├── auth-service/
├── vuelos-service/
├── reservas-service/
├── pagos-service/
├── admin-service/
│
├── kubernetes/
│   ├── namespace.yaml
│   ├── databases/
│   ├── services/
│   └── observability/
│
├── docker-compose.yml
└── README.md
```

---

# Requisitos

Antes de ejecutar el proyecto se requiere:

- Docker Desktop
- Kubernetes
- Minikube
- kubectl
- Node.js
- npm

---

# Clonar el proyecto

```bash
git clone https://github.com/MathiasGR27/Backend-TravelHub-Kubernetes
```

Ingresar al proyecto

```bash
cd Backend-TravelHub-Kubernetes
```

---

# Construcción de imágenes Docker

## API Gateway

```bash
docker build -t travelhub-api-gateway:1.1 ./api-gateway
```

## Auth Service

```bash
docker build -t travelhub-auth:1.1 ./auth-service
```

## Vuelos Service

```bash
docker build -t travelhub-vuelos:1.1 ./vuelos-service
```

## Reservas Service

```bash
docker build -t travelhub-reservas:1.1 ./reservas-service
```

## Pagos Service

```bash
docker build -t travelhub-pagos:1.1 ./pagos-service
```

## Admin Service

```bash
docker build -t travelhub-admin:1.1 ./admin-service
```

---

# Cargar imágenes en Minikube

```bash
minikube image load travelhub-api-gateway:1.1
minikube image load travelhub-auth:1.1
minikube image load travelhub-vuelos:1.1
minikube image load travelhub-reservas:1.1
minikube image load travelhub-pagos:1.1
minikube image load travelhub-admin:1.1
```

---

# Iniciar Kubernetes

Iniciar Minikube

```bash
minikube start
```

Verificar el estado

```bash
minikube status
```

---

Crear el namespace

```bash
kubectl apply -f kubernetes/namespace.yaml
```

Seleccionar el namespace

```bash
kubectl config set-context --current --namespace=travelhub
```

---

# Desplegar PostgreSQL

```bash
kubectl apply -f kubernetes/databases/
```

Verificar

```bash
kubectl get pods
```

---

# Desplegar microservicios

```bash
kubectl apply -f kubernetes/services/api-gateway/

kubectl apply -f kubernetes/services/auth/

kubectl apply -f kubernetes/services/vuelos/

kubectl apply -f kubernetes/services/reservas/

kubectl apply -f kubernetes/services/pagos/

kubectl apply -f kubernetes/services/admin/
```

---

# Desplegar OpenTelemetry

```bash
kubectl apply -f kubernetes/observability/
```

---

# Verificar el despliegue

Pods

```bash
kubectl get pods
```

Deployments

```bash
kubectl get deployments
```

Services

```bash
kubectl get services
```

PVC

```bash
kubectl get pvc
```

---

# Exponer servicios

## API Gateway

```bash
kubectl port-forward service/api-gateway 4000:4000 --address=0.0.0.0 -n travelhub
```

---

## Auth Service

```bash
kubectl port-forward service/auth-service 4001:4001 --address=0.0.0.0 -n travelhub
```

---

## Jaeger

```bash
kubectl port-forward service/jaeger 16686:16686 -n travelhub
```

---

# Observabilidad

La plataforma utiliza OpenTelemetry para instrumentar automáticamente todos los microservicios.

El flujo de observabilidad es:

```
API Gateway
      │
      ▼
Microservicios
      │
      ▼
OpenTelemetry SDK
      │
      ▼
OpenTelemetry Collector
      │
      ▼
Jaeger
```

---

# Variables de entorno

Cada microservicio utiliza variables de entorno administradas mediante ConfigMaps y Secrets.

Ejemplo:

```env
PORT=4001

DB_HOST=postgres-auth

DB_PORT=5432

DB_NAME=travelhub_auth

DB_USER=postgres

DB_PASSWORD=*****

JWT_SECRET=********
```

---

# Verificación

Una vez desplegado el sistema se recomienda verificar:

- Registro de usuarios.
- Inicio de sesión.
- Consulta de vuelos.
- Creación de reservas.
- Procesamiento de pagos.
- Funciones administrativas.
- Visualización de trazas en Jaeger.

---

# Monitoreo

Acceder a Jaeger

```
http://localhost:16686
```

Desde la interfaz es posible visualizar las trazas correspondientes a:

- API Gateway
- Auth Service
- Vuelos Service
- Reservas Service
- Pagos Service
- Admin Service

