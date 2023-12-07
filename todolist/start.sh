#!/bin/sh

# Inicie o servidor de desenvolvimento do Vue.js
cd /app/front-end && npm run serve &

# Espere um momento para garantir que o servidor do Vue.js seja iniciado
sleep 5

# Inicie o servidor do back-end
cd /app/back-end && yarn dev
