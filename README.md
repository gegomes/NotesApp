# Dockerfile
FROM node:18-alpine

# Cria diretório da aplicação
WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia todos os arquivos do projeto
COPY . .

# Exponha a porta usada pela aplicação
EXPOSE 3000

# Comando padrão
CMD ["npm", "run", "dev"]


# =======================
# README.md
# =======================

# NotesApp

Uma aplicação de anotações com suporte a múltiplos idiomas, busca, arquivamento e exclusão de notas.

## Funcionalidades
- Criar notas com título, conteúdo, descrição e tags
- Editar e excluir notas
- Arquivar e desarquivar notas
- Buscar por título ou tags
- Alternar idioma entre português e inglês
- Interface moderna com feedback via toast e som

---

## 🚀 Rodando localmente

### Pré-requisitos
- Node.js 18+
- npm

```bash
# Instalar dependências
npm install

# Rodar localmente
npm run dev
```

Acesse: http://localhost:3000

---

## 🐳 Rodando com Docker

```bash
# Build da imagem
docker build -t notesapp .

# Rodar container
docker run -p 3000:3000 notesapp
```

Acesse: http://localhost:3000

---

## 🛠 Tecnologias
- Next.js 14
- TypeScript
- TailwindCSS
- Sonner (toast)
- Howler.js (efeitos sonoros)

---

## 📁 Estrutura
- `components/` → Componentes reutilizáveis e UI
- `pages/` ou `app/` → Entradas principais da aplicação
- `public/sounds` → Áudios para feedbacks

---

## 📦 Build de produção

```bash
npm run build
npm start
```

---

Feito com 💛 para o desafio **NotesApp Challenge**.
