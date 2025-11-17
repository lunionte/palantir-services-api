# 📝 Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
e este projeto segue [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2025-11-17

### ✨ Adicionado

- **Autenticação JWT** com tokens expíráveis para owners, profissionais e clientes
- **Sistema Completo de Agendamentos** com validação de conflitos e autorização por roles
- **Gerenciamento de Negócios** (CRUD) com suporte a múltiplos tipos (barbearia, salão, clínica, estúdio)
- **Cadastro de Profissionais** com upload de foto de perfil via Supabase
- **Gerenciamento de Serviços** com preço, duração e vinculação ao negócio
- **Upload de Imagens** integrado com Supabase Storage
- **Validação de Dados** com Celebrate (Joi) em todos os endpoints
- **Tratamento Robusto de Erros** com classes customizadas para diferentes tipos
- **Middlewares** de autenticação e controle de acesso por roles (OWNER, EMPLOYEE, CLIENT)
- **CORS** configurado para integração com frontends
- **TypeScript** com tipagem completa
- **Prisma ORM** com MongoDB
- **README** completo com documentação de rotas
- **Guia de Contribuição** para facilitarse contribuições
- **Templates de Issues** para bug reports e feature requests

### 🏗️ Estrutura

- Controllers para Appointments, Business, Client, Owner, Professional, Services
- Services com regras de negócio e validações
- Repositories com operações CRUD via Prisma
- Models com interfaces TypeScript e schemas Joi
- Routes com validação e middlewares
- Middlewares de autenticação e autorização
- Classes de erro customizadas

### 📋 Regras de Negócio

- ✅ Agendamentos só podem ser no futuro
- ✅ Detecta conflitos de agendamento (mesmo profissional, mesmo horário)
- ✅ Apenas owner pode gerenciar seu negócio
- ✅ Apenas owner pode criar profissionais e serviços
- ✅ Cliente, profissional e owner têm diferentes permissões
- ✅ Senhas hasheadas com bcrypt
- ✅ Validação de email único

---

## [Planejado] - Próximas Features

### 🔜 Em Desenvolvimento

- [ ] Testes unitários com Jest
- [ ] Integração contínua (CI/CD)
- [ ] Autenticação OAuth (Google, GitHub)
- [ ] Notificações por email
- [ ] Sistema de avaliações e reviews
- [ ] Dashboard para analytics
- [ ] API GraphQL (alternativa ao REST)
- [ ] Rate limiting
- [ ] Logging estruturado
- [ ] Backup automático

### 💡 Em Consideração

- Agendamentos recorrentes
- Sistema de bloqueios de horário
- Gerenciamento de caixa/recebimentos
- Integração com Google Calendar
- App mobile (React Native)
- Painel de administração (web)
- Relatórios de performance

---

## 🔐 Versões Suportadas

| Versão | Status | Data de Lançamento | Data de Fim de Suporte |
|--------|--------|-------------------|----------------------|
| 1.0.x  | ✅ Ativo | 17-11-2025 | TBD |

---

## 🚀 Como Fazer Upgrade

### De versão anterior para 1.0.0

```bash
npm update
npx prisma migrate deploy
```

---

## 📚 Referências

- [Keep a Changelog](https://keepachangelog.com/)
- [Semantic Versioning](https://semver.org/)

---

## ❓ Perguntas?

Abra uma [discussion](https://github.com/lunionte/palantir-services-api/discussions) ou uma [issue](https://github.com/lunionte/palantir-services-api/issues).
