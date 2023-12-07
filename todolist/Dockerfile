# Use uma imagem Node.js como base
FROM node:18.18.2-alpine

# Defina o diretório de trabalho para /app
WORKDIR /app

# Copie os arquivos do front-end
COPY front-end/package*.json ./front-end/
COPY front-end/ ./front-end/

# Copie os arquivos do back-end
COPY back-end/package*.json ./back-end/
COPY back-end/ ./back-end/

# Instale as dependências do front-end
RUN cd front-end && npm install

# Instale as dependências do back-end
RUN cd back-end && yarn install

# Expor as portas utilizadas pelo front-end e back-end
EXPOSE 8080
EXPOSE 3000

# Copie um script de inicialização
COPY start.sh .

# Dê permissão de execução ao script
RUN chmod +x start.sh

# Comando para iniciar a aplicação quando o contêiner for executado
CMD ["./start.sh"]