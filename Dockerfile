FROM node:18-alpine

WORKDIR /app

# Copiar dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Generar Prisma Client para Linux
RUN npx prisma generate

EXPOSE 3000

# Arranque
CMD ["npm", "run", "dev"]
