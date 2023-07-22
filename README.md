# Work-study live coding 2022-09

## Development environment

### Integrate with coding tools

Install dependencies on host system to get autocomplete and other IDE features:

```
cd back-end && npm i && cd ..
cd web-app && npm i && cd ..
```

### Run app

Docker and Docker Compose are required on host system.

Build and start in dev mode:

```
./build-start.dev.sh
```

### Run tests in back-end

docker-compose -f docker-compose.dev.yml exec back-end npm run test

## Run native app

Expo go is required on your device to run native app

```
npx expo start --tunnel
```

### Run migrations when modify schema in back-end

docker compose -f docker-compose.dev.yml exec back-end npm run migration:generate
