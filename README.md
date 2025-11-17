# 💇‍♂️ Palantir Barber - API de Gerenciamento de Agendamentos

> Uma API robusta e completa para gerenciamento de agendamentos em barbearias e salões de beleza, com autenticação JWT, controle de acesso por roles e integração com upload de imagens.

![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=flat-square&logo=node.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9+-blue?style=flat-square&logo=typescript)
![Express](https://img.shields.io/badge/Express-5.1+-black?style=flat-square&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-via%20Prisma-green?style=flat-square&logo=mongodb)
![Prisma](https://img.shields.io/badge/Prisma-6.17-2D3748?style=flat-square&logo=prisma)
![License](https://img.shields.io/badge/License-ISC-blue?style=flat-square)

---

## 📋 Sumário

- [Sobre](#-sobre)
- [Features](#-features)
- [Stack Tecnológico](#-stack-tecnológico)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Executando](#-executando)
- [Rotas da API](#-rotas-da-api)
- [Autenticação](#-autenticação)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Regras de Negócio](#-regras-de-negócio)
- [Contribuindo](#-contribuindo)

---

## 🎯 Sobre

A **Palantir Barber API** é uma solução completa para gerenciamento de serviços, profissionais e agendamentos em estabelecimentos de beleza como barbearias, salões e clínicas de estética. 

Desenvolvida com foco em **segurança**, **escalabilidade** e **facilidade de uso**, permite que proprietários (owners) gerenciem seus negócios, profissionais gerenciem seus agendamentos e clientes marquem seus compromissos de forma prática.

---

## ✨ Features

- ✅ **Autenticação JWT** segura com tokens expíráveis
- ✅ **Controle de Acesso** baseado em roles (OWNER, EMPLOYEE, CLIENT)
- ✅ **Gerenciamento de Negócios** (criar, editar, deletar)
- ✅ **Cadastro de Profissionais** com upload de foto de perfil
- ✅ **Gerenciamento de Serviços** com preço e duração
- ✅ **Sistema Completo de Agendamentos** com validação de conflitos
- ✅ **Upload de Imagens** integrado com Supabase Storage
- ✅ **Validação de Dados** com Celebrate (Joi)
- ✅ **Tratamento Robusto de Erros** personalizado
- ✅ **CORS** ativado para integração com frontends
- ✅ **TypeScript** para segurança de tipos
- ✅ **Prisma ORM** com MongoDB

---

## 🛠️ Stack Tecnológico

| Tecnologia | Versão | Descrição |
|-----------|--------|-----------|
| **Node.js** | 18+ | Runtime JavaScript |
| **TypeScript** | 5.9+ | Superset tipado de JavaScript |
| **Express** | 5.1+ | Framework web |
| **Prisma** | 6.17+ | ORM para database |
| **MongoDB** | - | Banco de dados NoSQL |
| **JWT** | 9.0+ | Autenticação stateless |
| **Bcrypt** | 6.0+ | Hash de senhas |
| **Supabase** | 2.76+ | Storage de arquivos |
| **Celebrate** | 15.0+ | Validação com Joi |

---

## 📦 Pré-requisitos

- **Node.js** 18 ou superior
- **npm** ou **yarn**
- **MongoDB** (URI de conexão)
- **Supabase** (opcional, para upload de imagens)
- **.env** com variáveis de ambiente configuradas

---

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/lunionte/palantir-services-api.git
cd palantir_barber
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Banco de dados
DATABASE_URL="mongodb+srv://user:password@cluster.mongodb.net/palantir"

# Autenticação
JWT_SECRET="sua-chave-secreta-super-segura-aqui"

# Supabase (para upload de imagens)
SUPABASE_URL="https://seu-projeto.supabase.co"
SUPABASE_KEY="sua-chave-publica-supabase"

# Server
PORT=3000
```

---

## ⚙️ Configuração

### Prisma

Sincronize o banco de dados com o schema Prisma:

```bash
npx prisma migrate dev --name init
```

Abra o Prisma Studio para visualizar dados:

```bash
npx prisma studio
```

---

## 🏃 Executando

### Desenvolvimento

```bash
npm run dev
```

O servidor iniciará em `http://localhost:3000`

### Produção

```bash
npm run build
npm start
```

---

## 📡 Rotas da API

### 🔐 Autenticação

#### **Owner - Registrar**
```http
POST /api/auth/owner/signUp
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "senha123"
}
```
**Resposta:** `201 Created`
```json
{
  "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### **Owner - Login**
```http
POST /api/auth/owner/signIn
Content-Type: application/json

{
  "email": "joao@example.com",
  "password": "senha123"
}
```

#### **Cliente - Registrar**
```http
POST /api/auth/client/signUp
Content-Type: application/json

{
  "name": "Maria Santos",
  "email": "maria@example.com",
  "password": "senha123",
  "phone": "11999999999"
}
```

#### **Cliente - Login**
```http
POST /api/auth/client/signIn
Content-Type: application/json

{
  "email": "maria@example.com",
  "password": "senha123"
}
```
**Resposta:** `200 OK`
```json
{
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "Maria Santos",
      "email": "maria@example.com"
    }
  }
}
```

#### **Profissional - Login**
```http
POST /api/auth/professional/signIn
Content-Type: application/json

{
  "email": "profissional@example.com",
  "password": "senha123"
}
```

---

### 👤 Gerenciamento de Owner

**Requer:** Autenticação JWT

#### **Listar todos os Owners** (admin)
```http
GET /api/owner
Authorization: Bearer <token>
```

#### **Obter Dados Pessoais**
```http
GET /api/owner/:id
Authorization: Bearer <token>
```

#### **Atualizar Perfil**
```http
PATCH /api/owner/update-account
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "João Silva Updated",
  "email": "joao.novo@example.com"
}
```

#### **Alterar Senha**
```http
PATCH /api/auth/owner/update-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "oldPassword": "senha123",
  "newPassword": "novaSenha456"
}
```

#### **Deletar Conta**
```http
DELETE /api/owner/delete-account
Authorization: Bearer <token>
Content-Type: application/json

{
  "password": "senha123"
}
```

---

### 🏢 Gerenciamento de Negócios

**Requer:** Autenticação + Role OWNER

#### **Listar Todos os Negócios**
```http
GET /api/business
Authorization: Bearer <token>
```

#### **Obter Meus Negócios**
```http
GET /api/business/@me
Authorization: Bearer <token>
```

#### **Obter Negócio por ID**
```http
GET /api/business/:id
Authorization: Bearer <token>
```

#### **Criar Negócio**
```http
POST /api/business
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Barbearia Premium",
  "type": "BARBEARIA",
  "address": "Rua das Flores, 123",
  "phone": "11999999999",
  "logo": "data:image/png;base64,iVBORw0KGgoAAAANS..."
}
```
**Tipos válidos:** `BARBEARIA`, `SALAO`, `CLINICA`, `ESTUDIO`, `OUTRO`

#### **Editar Negócio**
```http
PATCH /api/business/update/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Barbearia Premium Plus",
  "phone": "11988888888"
}
```

#### **Deletar Negócio**
```http
DELETE /api/business/delete/:id
Authorization: Bearer <token>
```

---

### 👨‍💼 Gerenciamento de Profissionais

**Requer:** Autenticação + Role OWNER (para criar)

#### **Listar Todos os Profissionais**
```http
GET /api/business/professional
Authorization: Bearer <token>
```

#### **Obter Profissional por ID**
```http
GET /api/business/professional/:id
Authorization: Bearer <token>
```

#### **Criar Profissional (no Business)**
```http
POST /api/business/professional
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Carlos Barbeiro",
  "email": "carlos@example.com",
  "password": "senha123",
  "phone": "11999999999",
  "businessId": "507f1f77bcf86cd799439011",
  "image": "data:image/png;base64,iVBORw0KGgoAAAANS..."
}
```

---

### 💼 Gerenciamento de Serviços

**Requer:** Autenticação + Role OWNER (para criar/editar/deletar)

#### **Listar Todos os Serviços**
```http
GET /api/services
Authorization: Bearer <token>
```

#### **Obter Serviços por Negócio**
```http
POST /api/services/by-business
Authorization: Bearer <token>
Content-Type: application/json

{
  "id": "507f1f77bcf86cd799439011"
}
```

#### **Criar Serviço**
```http
POST /api/services
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Corte Simples",
  "description": "Corte tradicional com tesoura",
  "price": "35.00",
  "durationMin": 30,
  "businessId": "507f1f77bcf86cd799439011"
}
```

#### **Editar Serviço**
```http
PATCH /api/services/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Corte Premium",
  "price": "50.00"
}
```

#### **Deletar Serviço**
```http
DELETE /api/services/:id
Authorization: Bearer <token>
```

---

### 📅 Gerenciamento de Agendamentos

#### **Criar Agendamento** (Cliente)
```http
POST /api/appointments
Authorization: Bearer <token>
Content-Type: application/json

{
  "professionalId": "507f1f77bcf86cd799439011",
  "serviceId": "507f1f77bcf86cd799439012",
  "businessId": "507f1f77bcf86cd799439013",
  "dateTime": "2025-12-20T14:30:00Z",
  "paymentMethod": "PIX"
}
```
**Métodos de Pagamento:** `DINHEIRO`, `PIX`, `CARTAO`

**Resposta:** `201 Created`
```json
{
  "data": {
    "id": "507f1f77bcf86cd799439014",
    "clientId": "507f1f77bcf86cd799439015",
    "professionalId": "507f1f77bcf86cd799439011",
    "serviceId": "507f1f77bcf86cd799439012",
    "businessId": "507f1f77bcf86cd799439013",
    "dateTime": "2025-12-20T14:30:00.000Z",
    "status": "AGENDADO",
    "paymentMethod": "PIX",
    "createdAt": "2025-11-17T10:00:00.000Z"
  }
}
```

#### **Listar Meus Agendamentos**
```http
GET /api/appointments/@me
Authorization: Bearer <token>
```
- **Cliente:** Retorna seus agendamentos
- **Profissional:** Retorna agendamentos onde atende
- **Owner:** Retorna lista vazia (use endpoints específicos)

#### **Obter Agendamento por ID**
```http
GET /api/appointments/:id
Authorization: Bearer <token>
```

#### **Cancelar Agendamento**
```http
DELETE /api/appointments/:id
Authorization: Bearer <token>
```
**Quem pode cancelar:**
- Cliente seu próprio agendamento
- Profissional seus agendamentos
- Owner (dono do business) qualquer agendamento

---

## 🔐 Autenticação

### Header Obrigatório

Todas as rotas protegidas requerem este header:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Tokens

- **Signup:** Válido por **7 dias**
- **Login:** Válido por **7 dias** (clientes) / **3 dias** (owners)

### Roles

| Role | Permissões |
|------|-----------|
| **OWNER** | Criar/editar/deletar negócios, profissionais, serviços e agendamentos |
| **EMPLOYEE** | Ver/gerenciar seus próprios agendamentos |
| **CLIENT** | Criar agendamentos, gerenciar seus dados |

---

## 📊 Estrutura do Projeto

```
src/
├── controllers/          # Controladores (requisição → resposta)
│   ├── appointment.controller.ts
│   ├── business.controller.ts
│   ├── client.controller.ts
│   ├── owner.controller.ts
│   ├── professional.controller.ts
│   └── services.controller.ts
├── services/            # Lógica de negócio
│   ├── appointment.service.ts
│   ├── business.service.ts
│   ├── client.service.ts
│   ├── owner.service.ts
│   ├── professional.service.ts
│   ├── services.service.ts
│   └── upload-file.service.ts
├── repositories/        # Acesso a dados (Prisma)
│   ├── appointment.repository.ts
│   ├── business.repository.ts
│   ├── client.repository.ts
│   ├── owner.repository.ts
│   ├── professional.repository.ts
│   └── services.repository.ts
├── models/             # Interfaces TypeScript e schemas Joi
│   ├── appointment.model.ts
│   ├── business.model.ts
│   ├── client.model.ts
│   ├── owner.model.ts
│   ├── professional.model.ts
│   └── services.model.ts
├── routes/             # Definição de rotas
│   ├── appointment.route.ts
│   ├── business.route.ts
│   ├── client.auth.route.ts
│   ├── owner.auth.route.ts
│   ├── owner.route.ts
│   ├── professional.auth.route.ts
│   └── services.route.ts
├── middlewares/        # Middlewares (autenticação, autorização)
│   ├── auth.middleware.ts
│   ├── ensuroleRole.middleware.ts
│   └── error-handler.middleware.ts
├── errors/             # Classes de erro customizadas
│   ├── base.error.ts
│   ├── forbiden.error.ts
│   ├── internal-server.error.ts
│   ├── not-found.error.ts
│   └── validation.error.ts
└── server.ts           # Configuração principal do Express

prisma/
└── schema.prisma       # Schema do banco de dados

.env                    # Variáveis de ambiente
package.json           # Dependências
tsconfig.json          # Configuração TypeScript
```

---

## 💡 Regras de Negócio

### 👥 Autenticação & Autorização
- ✅ Senhas são hasheadas com **bcrypt** (10 rounds)
- ✅ Tokens JWT com **expiração automática**
- ✅ Verificação de role em rotas protegidas
- ✅ Emails devem ser únicos no sistema

### 📅 Agendamentos
- ✅ Cliente deve existir no sistema
- ✅ Profissional deve pertencer ao business
- ✅ Serviço deve pertencer ao business
- ✅ Data deve ser no **futuro**
- ✅ Detecta **conflitos** (mesmo profissional, mesmo horário)
- ✅ Status: `AGENDADO` → `CANCELADO` ou `CONCLUIDO`
- ✅ Apenas cliente, profissional ou owner podem cancelar

### 💼 Negócios
- ✅ Owner pode ter múltiplos negócios
- ✅ Negócio pode ter múltiplos profissionais e serviços
- ✅ Logo é salvo no **Supabase Storage**
- ✅ Apenas owner pode editar/deletar seu negócio

### 👨‍💼 Profissionais
- ✅ Pertence a exatamente um negócio
- ✅ Email é único
- ✅ Role padrão: `EMPLOYEE`
- ✅ Foto de perfil opcional (upload em Supabase)

### 💰 Serviços
- ✅ Pertence a exatamente um negócio
- ✅ Preço em formato string (ex: "35.00")
- ✅ Duração em minutos (inteiro positivo)
- ✅ Descrição é opcional

---

## 🧪 Testando a API

### Com Postman/Insomnia

1. **Importe a coleção** (endpoints acima)
2. **Configure variáveis de ambiente:**
   - `base_url`: `http://localhost:3000`
   - `token`: Token JWT retornado no login
3. **Execute os testes** conforme desejado

### Com cURL

```bash
# Registrar Owner
curl -X POST http://localhost:3000/api/auth/owner/signUp \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João",
    "email": "joao@example.com",
    "password": "senha123"
  }'

# Fazer login
curl -X POST http://localhost:3000/api/auth/owner/signIn \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "password": "senha123"
  }'

# Criar negócio (substitua TOKEN)
curl -X POST http://localhost:3000/api/business \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Minha Barbearia",
    "type": "BARBEARIA",
    "address": "Rua Principal, 100",
    "phone": "11999999999"
  }'
```

---

## 📝 Tratamento de Erros

A API retorna erros estruturados:

```json
{
  "status": 400,
  "message": "Email ou senha inválidos"
}
```

### Códigos de Status HTTP

| Código | Significado |
|--------|-----------|
| **200** | OK - Sucesso |
| **201** | Created - Recurso criado |
| **204** | No Content - Sucesso sem conteúdo |
| **400** | Bad Request - Dados inválidos |
| **401** | Unauthorized - Token inválido/ausente |
| **403** | Forbidden - Sem permissão |
| **404** | Not Found - Recurso não encontrado |
| **500** | Internal Server Error - Erro do servidor |

---

## 🔄 Ciclo de Vida de um Agendamento

```
1. Cliente faz LOGIN → Recebe TOKEN
   ↓
2. Cliente cria AGENDAMENTO
   ↓
3. Sistema VALIDA (cliente, profissional, serviço, business, data, conflitos)
   ↓
4. Agendamento criado com status "AGENDADO"
   ↓
5. Profissional ou Owner veem o agendamento
   ↓
6. Cliente/Profissional/Owner podem CANCELAR
   ↓
7. Status muda para "CANCELADO"
```

---

## 🚀 Deploy

### Ambiente Recomendado

- **Runtime:** Node.js 18+ em Vercel, Railway, Render ou Heroku
- **Database:** MongoDB Atlas (cloud)
- **Storage:** Supabase (imagens)
- **Cache:** Redis (opcional, para escalabilidade)

### Variáveis de Produção

```env
DATABASE_URL="mongodb+srv://..."
JWT_SECRET="chave-secreta-muito-longa-e-aleatória"
SUPABASE_URL="https://..."
SUPABASE_KEY="sk-..."
PORT=3000
NODE_ENV="production"
```

---

## 📋 Checklist de Funcionalidades

- [x] Autenticação com JWT
- [x] Controle de acesso por roles
- [x] CRUD de owners
- [x] CRUD de negócios
- [x] CRUD de profissionais
- [x] CRUD de serviços
- [x] Sistema completo de agendamentos
- [x] Validação de conflitos de agendamento
- [x] Upload de imagens (Supabase)
- [x] Tratamento de erros personalizado
- [x] Validação com Celebrate/Joi
- [x] Middlewares de autenticação
- [x] TypeScript completo
- [x] Prisma ORM

---

## 📚 Documentação Adicional

- [Express Documentation](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc7519)
- [MongoDB Documentation](https://docs.mongodb.com/)

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está licenciado sob a licença ISC.

---

## 👨‍💻 Autor

**Lunionte** - [GitHub Profile](https://github.com/lunionte)

---

## 📞 Suporte

Para dúvidas, abra uma [issue](https://github.com/lunionte/palantir-services-api/issues) no repositório.

---

<div align="center">

**Feito com ❤️ para simplificar o gerenciamento de barbearias e salões**

[⬆ Voltar ao topo](#-palantir-barber---api-de-gerenciamento-de-agendamentos)

</div>
