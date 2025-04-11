
# API de Premiações de Filmes

Uma API RESTful que analisa dados de premiações de filmes e fornece informações sobre os intervalos de premiações dos produtores.

## Funcionalidades

- API RESTful seguindo o Nível 2 do Modelo de Maturidade de Richardson  
- Banco de dados SQLite em memória  
- Implementação em TypeScript  
- Princípios SOLID  
- Testes de integração  
- Fonte de dados CSV configurável  

## Pré-requisitos

- Node.js (v14 ou superior)  
- npm (v6 ou superior)  

## Instalação

1. Clone o repositório  
2. Instale as dependências:  
```bash
npm install
```

## Executando a Aplicação

1. Compile o código TypeScript:  
```bash
npm run build
```

2. Inicie o servidor informando o caminho para seu arquivo CSV:  
```bash
# Modo de desenvolvimento
npm run dev -- /caminho/para/seu/movielist.csv

# Modo de produção (após compilar)
npm start -- /caminho/para/seu/movielist.csv
```

O servidor será iniciado na porta 3000 por padrão.

> **Nota**: É necessário fornecer o caminho para seu arquivo CSV ao iniciar a aplicação. O arquivo CSV deve conter os dados de premiações no formato correto.

## Executando os Testes

Para rodar os testes de integração:  
```bash
npm run test:integration
```

## Endpoints da API

### GET /api/producers/intervals

Retorna os produtores com os menores e maiores intervalos entre premiações consecutivas.

Formato da resposta:
```json
{
  "min": [
    {
      "producer": "Producer Name",
      "interval": 1,
      "previousWin": 2008,
      "followingWin": 2009
    }
  ],
  "max": [
    {
      "producer": "Producer Name",
      "interval": 99,
      "previousWin": 1900,
      "followingWin": 1999
    }
  ]
}
```

## Formato do Arquivo CSV

O arquivo CSV deve conter as seguintes colunas:
- year  
- title  
- studios  
- producers  
- winner  

Exemplo:  
```csv
year;title;studios;producers;winner
1980;Movie A;Studio X;Producer 1;yes
1981;Movie B;Studio Y;Producer 2;no
```
