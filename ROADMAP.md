# 🗺️ Roadmap - Palantir Barber API

Visão geral do desenvolvimento futuro do projeto.

---

## 📅 Timeline

```
┌─ 2025 Q1 ─┬─ 2025 Q2 ─┬─ 2025 Q3 ─┬─ 2025 Q4 ─┐
│   v1.0    │ v1.1/v1.2 │   v1.3+   │   v2.0    │
└─ Atual ─┬─┘           └─ Features ─┘           └─ Major ─┘
          └─ Core ✅ ───┴─ Enhanced ─┴─ Advanced ┘
```

---

## 🚀 Versão 1.0 - Core ✅ (Atual)

**Status:** ✅ Concluído (17-11-2025)

### Features

- [x] Autenticação JWT (OWNER, EMPLOYEE, CLIENT)
- [x] CRUD de Negócios
- [x] CRUD de Profissionais
- [x] CRUD de Serviços
- [x] Sistema de Agendamentos com validação de conflitos
- [x] Upload de imagens (Supabase)
- [x] Validação com Celebrate/Joi
- [x] TypeScript completo
- [x] Documentação

---

## 📈 Versão 1.1 - Polish & Testing (Q1 2025)

**Status:** ⏳ Planejado

### Backend Improvements

- [ ] Testes unitários com **Jest**
  ```bash
  npm test
  ```

- [ ] Integração contínua (GitHub Actions)
  ```yaml
  # .github/workflows/ci.yml
  - Run tests
  - Lint check
  - Type check
  - Deploy to staging
  ```

- [ ] Logging estruturado (Winston)
  ```typescript
  logger.info('User created', { userId, email });
  logger.error('Database error', { code: err.code });
  ```

- [ ] Rate limiting (express-rate-limit)
  ```typescript
  app.use('/api/auth', rateLimiter);
  ```

### API Enhancements

- [ ] Paginação em queries
  ```http
  GET /api/business?page=1&limit=10
  ```

- [ ] Filtros avançados
  ```http
  GET /api/appointments?status=AGENDADO&date=2025-12-20
  ```

- [ ] Sorting
  ```http
  GET /api/services?sort=price&order=asc
  ```

---

## ✨ Versão 1.2 - Notifications (Q2 2025)

**Status:** ⏳ Planejado

### Email Notifications

- [ ] Integração com SendGrid/Nodemailer
- [ ] Email de confirmação de agendamento
- [ ] Lembretes 24h antes
- [ ] Confirmação de cancelamento

### SMS (Opcional)

- [ ] Integração com Twilio
- [ ] Notificação de agendamento por SMS
- [ ] Código OTP para verificação

### In-App Notifications

- [ ] Sistema de notificações push
- [ ] WebSocket para notificações real-time

---

## 🎨 Versão 1.3 - Advanced Features (Q3 2025)

**Status:** ⏳ Planejado

### Agendamentos Avançados

- [ ] Agendamentos recorrentes
  ```json
  {
    "clientId": "...",
    "serviceId": "...",
    "dateTime": "2025-12-20T14:30:00Z",
    "frequency": "WEEKLY",
    "until": "2026-02-20"
  }
  ```

- [ ] Bloqueios de horário (owner)
  ```http
  POST /api/business/blocks
  {
    "businessId": "...",
    "dateTimeStart": "2025-12-25T00:00:00Z",
    "dateTimeEnd": "2025-12-25T23:59:59Z",
    "reason": "Fechado por feriado"
  }
  ```

- [ ] Confirmação de presença
  ```http
  PATCH /api/appointments/:id/confirm
  ```

### Analytics & Reports

- [ ] Dashboard de agendamentos
- [ ] Relatório de ganhos
- [ ] Ocupação por profissional
- [ ] Horários mais procurados
- [ ] Cliente mais frequente

### Sistema de Avaliações

- [ ] Clientes avaliam profissionais
- [ ] Rating de 1-5 estrelas
- [ ] Comentários
- [ ] Media de avaliações

---

## 🔄 Versão 2.0 - Major Rewrite (Q4 2025)

**Status:** ⏳ Futuro

### Arquitetura

- [ ] **Event-Driven** com RabbitMQ/Redis
- [ ] **CQRS** (Command Query Responsibility Segregation)
- [ ] **Microserviços** (opcional)
- [ ] **GraphQL** alternativo ao REST

### API Enhancements

- [ ] Webhooks para eventos
  ```typescript
  // Quando agendamento é criado
  POST https://seu-client.com/webhooks/appointment.created
  {
    "event": "appointment.created",
    "data": { ... }
  }
  ```

- [ ] API versioning (`/api/v2/...`)

### Authentication

- [ ] OAuth 2.0 (Google, GitHub, etc)
- [ ] Multi-factor authentication (MFA)
- [ ] Magic links
- [ ] Biometric (futura integração mobile)

### Data

- [ ] Cache distribuído (Redis)
- [ ] Full-text search (Elasticsearch)
- [ ] Analytics warehouse

---

## 🎯 Features em Consideração

### Curto Prazo (3-6 meses)

- [ ] Agendamentos online (cliente faz login, marca consulta)
- [ ] Integração com Google Calendar
- [ ] Sistema de descontos e cupons
- [ ] Integração com WhatsApp (Twilio)
- [ ] Dashboard mobile responsivo

### Médio Prazo (6-12 meses)

- [ ] App mobile (React Native/Flutter)
- [ ] Integração com gateway de pagamento (Stripe, MercadoPago)
- [ ] Sistema de fidelidade
- [ ] Painel administrativo completo
- [ ] Relatórios em PDF/Excel

### Longo Prazo (12+ meses)

- [ ] Marketplace de profissionais
- [ ] Sistema de afiliados
- [ ] IA para recomendações
- [ ] Integração com franchises
- [ ] Versão em outras línguas

---

## 🐛 Bugs Conhecidos

Nenhum bug crítico registrado no momento.

---

## 📊 Métricas de Progresso

```
v1.0: 100% ✅ [===================]
v1.1:  20% ⏳ [===                 ]
v1.2:   0% ⏳ [                    ]
v1.3:   0% ⏳ [                    ]
v2.0:   0% ⏳ [                    ]
```

---

## 🤝 Como Ajudar

### Contribuições Bem-Vindas

1. **Reportar Bugs** - Abra uma [issue](https://github.com/lunionte/palantir-services-api/issues)
2. **Sugerir Features** - Abra uma [discussion](https://github.com/lunionte/palantir-services-api/discussions)
3. **Enviar PRs** - Veja [CONTRIBUTING.md](./.github/CONTRIBUTING.md)
4. **Sponsor** - ⭐ Dê uma star no GitHub!

---

## 📞 Feedback

- Abra uma [discussion](https://github.com/lunionte/palantir-services-api/discussions)
- Email: [seu-email@example.com](mailto:seu-email@example.com)
- Twitter: [@seu_usuario](https://twitter.com/seu_usuario)

---

<div align="center">

**Obrigado por acompanhar a evolução do Palantir Barber! 🚀**

[Voltar ao README](./README.md)

</div>
