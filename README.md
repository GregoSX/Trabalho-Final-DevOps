# Trabalho Final DevOps

## Passo 1: Desenvolvimento de uma Aplicação TODO List

A API foi implementada utilizando TypeScript, Express, Prisma e SQLite. Foram criadas rotas completas de um CRUD para adicionar tarefas ao banco de dados.

## Passo 2 - Criação do Dockerfile e da Imagem

1. Criar o arquivo Dockerfile.

2. Para subir o backend em um container, execute o comando abaixo dentro da pasta `api-todolist`:

        docker build -t seu_nome_usuario/app-todolist:v1 .
   

4. Verificar a construção da imagem:

        docker images


## Passo 3 - Publicação no Docker Hub

Antes de publicar a imagem para o Docker Hub, é necessário realizar a autenticação:

    docker login


Insira as credenciais do seu usuário do Docker Hub e execute os comandos abaixo:

    docker push seu_nome_usuario/app-todolist:v1


## Passo 4: Criação de Artefatos no Kubernetes com Helm

1. Inicialize um cluster utilizando `kind`:

       kind create cluster
   

3. Primeiramente, crie os arquivos `.yaml` necessários para subir a aplicação com Kubernetes:

    - [namespace](https://raw.githubusercontent.com/GregoSX/Trabalho-Final-Devops/main/namespace.yaml)
    - [deployment](https://raw.githubusercontent.com/GregoSX/Trabalho-Final-Devops/main/deployment.yaml)
    - [service](https://raw.githubusercontent.com/GregoSX/Trabalho-Final-Devops/main/services.yaml)
    - [configmap](https://raw.githubusercontent.com/GregoSX/Trabalho-Final-Devops/main/config.yaml)
    - [secrets](https://raw.githubusercontent.com/GregoSX/Trabalho-Final-Devops/main/secret.yaml)
    - [hpa](https://raw.githubusercontent.com/GregoSX/Trabalho-Final-Devops/main/hpa.yaml)

4. Após todos estarem configurados, é necessário implementar uma aplicação do Helm com o seguinte comando:

        helm create meu-app

5. Dentro do diretório `meu-app`, é necessário modificar o arquivo `values.yaml`, alterando a imagem, a tag e a porta que estão sendo usadas. Além disso, copie os arquivos `config.yaml` e `secret.yaml` para dentro da pasta `templates`. Após copiar, adicione dentro do `deployment.yaml` da pasta `templates` o `env` para conseguir utilizar os valores da config e secrets.

6. Por fim, é necessário criar o namespace. Para isso, estando no diretório onde o arquivo está, execute o comando:

        kubectl apply -f namespace.yaml


7. Depois de todos os passos acima, utilize o comando abaixo dentro da pasta que o Helm criou:

       helm install app-todolist . --namespace devops

8. Ao executar irá aparecer uma mensagem com as instruções para realizar o port-forward da aplicação:

   ```
   export POD_NAME=$(kubectl get pods --namespace devops -l "app.kubernetes.io/name=meu-app,app.kubernetes.io/instance=app-todolist" -o jsonpath="{.items[0].metadata.name}")
   ```
   
   ```
   export CONTAINER_PORT=$(kubectl get pod --namespace devops $POD_NAME -o jsonpath="{.spec.containers[0].ports[0].containerPort}")
   ```
   
   ```
   kubectl --namespace devops port-forward $POD_NAME 8080:$CONTAINER_PORT
   ```
   
10. Com isso sua aplicação esta rodando no link:
    
        http://127.0.0.1:8080


## Desenvolvedores

Este projeto foi desenvolvido por:

 - [Guilherme Grego Santos](https://github.com/GregoSX)
 - [Victor Hugo Xavier Oliveira](https://github.com/victorhxo)
