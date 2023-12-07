# Trabalho Final DevOps

### Passo 1- Desenvolvimento de uma Aplicação TODO List

A aplicação TODO List foi construída utilizando o framework Vue.JS, com a utilização da ferramenta localstorage dos navegadores para simular a inserção, edição e exlusão de dados em banco de dados.

### Passo 2 - Criação do Dockerfile e da Imagem

Criar o arquivo Dockerfile.

Para construir a imagem execute o comando

`docker build -t todolist:v1 .`

Verificar a construação da imagem 

`docker images`

Execute a imagem em um container para verificar a aplicação

`docker run -d -p 8080:8080 --name todolist todolist:v1`

Verifique a aplicação no host com:

- [ToDo List](http://localhost:8080/)

Podemos gerenciar o container

`docker ps`

`docker stop todolist`

`docker start todolist`

`docker restart todolist`

`docker rm todolist`

### Passo 3 - Publicação no Docker Hub

Antes de publicar a imagem para o docker hub é necessário realizar a autenticação

`Docker login`

Insira as credenciais do seu usuário do docker hub e execute os comandos abaixo

`docker tag todolist:v1 gregosx/todolist:v1`

`docker push gregosx/todolist:v1`

### Passo 4: Criação de Artefatos no Kubernetes com Helm

Inicialize um cluster utilizando kind

`kind create cluster`


Crie uma estrutura básica de um chart Helm

`helm create todolist`

Dentro do diretório **templates** crie e defina os arquivos namespace.yaml,deployment.yaml, service.yaml, configmap.yaml, secrets.yaml e hpa.yaml.

Para testar o funcionamento execute os comandos:

`kubectl --namespace $NAMESPACE_NAME port-forward $POD_NAME 8080:$CONTAINER_PORT`

## Desenvolvedores

Este projeto foi desenvolvido por:

 - Guilherme Grego Santos 

## Referências