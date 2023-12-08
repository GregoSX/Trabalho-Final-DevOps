# Trabalho Final DevOps

## Passo 1- Desenvolvimento de uma Aplicação TODO List

A api foi implementada utilizando typescript - express - prisma - sqlite, existem rotas completas de um CRUD para adicionar tarefas no banco de dados.

## Passo 2 - Criação do Dockerfile e da Imagem

Criar o arquivo Dockerfile.

Foi criado um Dockerfile para subir o back-end em um container, para isso execute o comando abaixo dentro da pasta api-todolist

    docker build -t seu_nome_usuario/todolist:v1 .

Verificar a construação da imagem 

    docker images

## Passo 3 - Publicação no Docker Hub

Antes de publicar a imagem para o docker hub é necessário realizar a autenticação

    docker login

Insira as credenciais do seu usuário do docker hub e execute os comandos abaixo

    docker push seu_nome_usuario/todolist:v1

## Passo 4: Criação de Artefatos no Kubernetes com Helm

Inicialize um cluster utilizando kind

    kind create cluster

Primeiramente foi criado os .yaml necessários para subir a aplicação com Kubernertes.

namespace
deployment
service
configmap
secrets
hpa

Após todos estarem configurados, foi necessário implementar uma aplicação do helm com o seguinte comando:

    helm create meu-app

Dentro do diretório meu-app, é necessário modificar o arquivo Values.yaml, alterando a imagem, a tag, e a porta que esta sendo usada.
Além disso, é necessário copiar os arquivos config.yaml e secrets.yaml para dentro da pasta templates.
Após copiar, adicionar dentro do deployment.yaml da pasta templates o env para conseguir utilizar os valores da config e secrets, por fim, é necessário criar o namespace, para isso é necessário estar no diretório onde o arquivo esta e executar o comando:

    kubectl apply -f namespace.yaml 

Depois de todos os passos acima, utilizar o comando abaixo dentro da pasta que o helm criou:

    helm install todolist . --namespace devops


## Desenvolvedores

Este projeto foi desenvolvido por:

 - Guilherme Grego Santos
 - Victor Hugo Xavier Oliveira
