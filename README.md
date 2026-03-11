# backend-server-medcast

MedCast is a digital platform that connects patients and families with verified healthcare professionals who provide medical services directly at home.

## install project

```
npm i

```

## start project

```
docker compose up -d mongo mongo-express
npm run dev

```

## build project

```

npm run build

```

## start built project

```

after run build
npm run start

```

## deploy

```
run inside of cloud server after installing docker
docker compose up -d --build
```

## Data Models

    - admin
    - users
    - providerGroups
    - invites
    - providers
    - offers
    - providerOfferRequests
    - matched

## API ENDPOINTS

    - /api/auth -
