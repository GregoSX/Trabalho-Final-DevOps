# Use uma imagem base do Node.js Alpine com a versão desejada
FROM node:18.18.2-alpine

# Instale o gerenciador de pacotes Yarn
RUN npm install -g yarn

# Crie um diretório de trabalho na imagem Docker
WORKDIR /app

# Copie o package.json e o arquivo yarn.lock para o diretório de trabalho
COPY package.json ./

# Instale as dependências do projeto
RUN yarn install

# Copie o resto dos arquivos do projeto para o diretório de trabalho
COPY . .

# Copie o arquivo tsconfig.json para o diretório de trabalho
COPY tsconfig.json ./

# Execute os comandos para criar o banco de dados e aplicar as migrações
RUN yarn migrate:dev && yarn migrate:run

# Exponha a porta utilizada pela sua aplicação
EXPOSE 3000

# Comando para iniciar a aplicação quando o contêiner for executado
CMD ["yarn", "dev"]