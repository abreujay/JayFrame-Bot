# Usando node oficial como base
FROM node:18

# Diretório da aplicação
WORKDIR /usr/src/app

# Copia package.json e package-lock.json para instalar dependências
COPY package*.json ./

# Instala dependências
RUN npm install --production

# Copia todo o código para o container
COPY . .

# Porta que o app vai usar
ENV PORT 8080
EXPOSE 8080

# Comando para rodar o app
CMD ["node", "server.js"]
