# Trabalho Final DevOps

### Passo 1 - Criar a imagem da aplicação todo list

Criar o arquivo Dockerfile.

Para construir a imagem execute o comando

`docker build -t todolist:v1 .`

Verificar a construação da imagem 

`docker images`

Execute a imagem em um container para verificar a aplicação

`docker run -d -p 8080:80 --name todolist todolist:v1`

Verifique a aplicação no host com:

- [ToDo List](http://localhost:8080/)

Podemos gerenciar o container

`docker ps`

`docker stop todolist`

`docker start todolist`

`docker restart todolist`

`docker rm todolist`


### Passo 2 - Enviar a imagem para o docker hub

Antes de enviar a imagem para o docker hub é necessário realizar a autenticação

`Docker login`



## Desenvolvedores

Este projeto foi desenvolvido por:

 - Guilherme Grego Santos 

## Referências