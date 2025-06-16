# JayFrame-Bot

JayFrame-Bot é um bot para Discord que consulta o Warframe Market e retorna informações sobre itens à venda.

---

## Funcionalidade

### Comando `/market`

Permite buscar anúncios de itens disponíveis para venda no Warframe Market, fornecendo as seguintes informações:

- Preço do item  
- Quantidade disponível  
- Rank (quando o item for um mod)  
- Nome do vendedor (jogador)  
- Mensagem formatada detalhando a venda  

---

## Como usar

No Discord, utilize o comando:

```
/market [nome-do-item]
```

Exemplo:

```
/market soma prime set
```

O bot responderá com os detalhes dos anúncios encontrados para o item pesquisado.

---

## Instalação

### Pré-requisitos

- Node.js instalado  
- Token do bot Discord  

### Passos

1. Clone o repositório:  
   ```bash
   git clone https://github.com/abreujay/JayFrame-Bot.git
   cd JayFrame-Bot
   ```
2. Instale as dependências:  
   ```bash
   npm install
   ```
3. Crie um arquivo `.env` na raiz do projeto e defina:  
   ```
   DISCORD_TOKEN=seu_token_do_discord
   ```
4. Inicie o bot:  
   ```bash
   node server.js
   ```
