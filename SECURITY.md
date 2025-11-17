# 🔒 Security Policy

## Segurança de Dados

Este documento descreve as políticas de segurança para o projeto **Palantir Barber API**.

---

## 🛡️ Versões Suportadas

| Versão | Suportada |
|--------|-----------|
| 1.0.x  | ✅ Sim    |
| < 1.0  | ❌ Não    |

---

## 🚨 Reportando Vulnerabilidades

**NÃO abra uma issue pública para vulnerabilidades de segurança!**

Se você descobrir uma vulnerabilidade, por favor reporte para: **[seu-email@example.com](mailto:seu-email@example.com)**

Inclua:

- Descrição da vulnerabilidade
- Steps para reproduzir
- Possível impacto
- Sugestão de correção (se houver)

Você receberá uma resposta em até 48 horas.

---

## 🔐 Práticas de Segurança Implementadas

### Autenticação & Autorização

- ✅ **JWT com expiração**: Tokens com validade limitada (3-7 dias)
- ✅ **Bcrypt**: Senhas hasheadas com 10 rounds
- ✅ **CORS**: Restrito para produção
- ✅ **Role-Based Access Control (RBAC)**: OWNER, EMPLOYEE, CLIENT

### Validação & Sanitização

- ✅ **Celebrate/Joi**: Validação de entrada em todos os endpoints
- ✅ **Tipagem TypeScript**: Previne erros de tipo
- ✅ **MongoDB ObjectId**: Validação de IDs

### Proteção de Dados

- ✅ **Senhas nunca logadas**: Apenas hashes
- ✅ **JWT_SECRET seguro**: Deve ser mínimo 32 caracteres
- ✅ **Variáveis de ambiente**: Credenciais não commitadas
- ✅ **HTTPS em produção**: Criptografia de tráfego

---

## ⚠️ Recomendações de Segurança

### 1. **Variáveis de Ambiente**

```bash
# ✅ BOM - Seguro
JWT_SECRET="32-caracteres-aleatorios-minimo-muito-seguro"
DATABASE_URL="mongodb+srv://user:pass@cluster.mongodb.net/db"
SUPABASE_KEY="chave-segura"

# ❌ RUIM - Inseguro
JWT_SECRET="123456"
DATABASE_URL="mongodb://localhost/db"
SUPABASE_KEY="abc123"
```

### 2. **Senhas**

```
✅ BOM: Mín 6 caracteres, com números e letras
❌ RUIM: Senhas simples como "123456" ou "password"
```

### 3. **Rate Limiting**

Adicione rate limiting em produção:

```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // 100 requests por IP
});

app.use(limiter);
```

### 4. **HTTPS em Produção**

Sempre use HTTPS em produção. Configure certificados SSL/TLS.

### 5. **Logging de Segurança**

```typescript
// ✅ Log eventos importantes
logger.info(`User ${userId} updated appointment ${appointmentId}`);
logger.warn(`Failed login attempt for ${email}`);

// ❌ Não logue dados sensíveis
logger.info(`Password: ${password}`); // NUNCA!
```

### 6. **Validação de Autorização**

Sempre valide permissions:

```typescript
// ✅ BOM
if (appointment.clientId !== userId) {
  throw new ForbidenError("Acesso negado");
}

// ❌ RUIM - Sem validação
const appointment = await repository.getById(id);
```

---

## 🔍 Checklist de Segurança para Produção

- [ ] JWT_SECRET é único e seguro (> 32 chars)
- [ ] DATABASE_URL usa credenciais seguras
- [ ] CORS configurado corretamente
- [ ] HTTPS ativado
- [ ] Rate limiting ativado
- [ ] Logging de segurança implementado
- [ ] Senhas de teste removidas
- [ ] Variáveis sensíveis não commitadas
- [ ] Dependencies atualizadas (`npm audit`)
- [ ] Backup automático configurado
- [ ] Monitoramento de erros ativado (Sentry, etc)

---

## 📦 Dependências Seguras

Mantenha as dependências atualizadas:

```bash
# Verificar vulnerabilidades
npm audit

# Atualizar dependências
npm update

# Atualizar para versão maior (cuidado - breaking changes)
npm upgrade
```

---

## 🔄 Processo de Resposta a Incidentes

1. **Reporte recebido** - Confirmação dentro de 24h
2. **Triagem** - Avaliação da criticidade
3. **Correção** - Desenvolvimento da patch
4. **Teste** - QA completo
5. **Lançamento** - Release com aviso de segurança
6. **Comunicação** - Notificação aos usuários

---

## 📚 Recursos de Segurança

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/nodejs-security/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc7519)
- [MongoDB Security](https://docs.mongodb.com/manual/security/)

---

## 📝 Histórico de Segurança

Nenhuma vulnerabilidade reportada até o momento.

---

<div align="center">

**Segurança é responsabilidade de todos. Obrigado por reportar vulnerabilidades responsavelmente!**

</div>
