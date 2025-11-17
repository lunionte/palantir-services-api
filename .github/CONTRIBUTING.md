# 🤝 Guia de Contribuição

Obrigado por considerar contribuir para o **Palantir Barber API**! Este documento fornece orientações e instruções para contribuir de forma efetiva.

## 📋 Código de Conduta

Este projeto segue um Código de Conduta. Por favor, leia e cumpra os princípios básicos de respeito e inclusão.

---

## 🚀 Como Contribuir

### 1. Reportar Bugs

Se você encontrou um bug:

- **Verifique** se o bug já foi reportado em [Issues](https://github.com/lunionte/palantir-services-api/issues)
- **Descreva** o comportamento esperado vs o atual
- **Forneça** steps para reproduzir o problema
- **Inclua** logs de erro e informações do ambiente

Use o template: [Bug Report](./.github/ISSUE_TEMPLATE/bug_report.md)

### 2. Sugerir Melhorias

- Abra uma issue com o título `[FEATURE] Descrição da feature`
- Explique o caso de uso e por que seria útil
- Cite exemplos de como funcionaria

### 3. Submeter Pull Requests

#### Setup do Ambiente

```bash
# Clone o repositório
git clone https://github.com/lunionte/palantir-services-api.git
cd palantir_barber

# Instale dependências
npm install

# Configure variáveis de ambiente
cp .env.example .env
# Edite .env com seus dados

# Rode migrations do Prisma
npx prisma migrate dev
```

#### Desenvolvimento

```bash
# Inicie o servidor em modo watch
npm run dev

# Rode testes (se houver)
npm test

# Verifique tipos TypeScript
npx tsc --noEmit
```

#### Submissão

1. **Crie uma branch** a partir de `main`:
   ```bash
   git checkout -b feature/sua-feature
   ```

2. **Faça commits semânticos**:
   ```bash
   git commit -m "feat: adiciona validação de conflitos de agendamento"
   ```

3. **Teste sua mudança**:
   ```bash
   npm run dev
   # Teste manualmente ou via Postman
   ```

4. **Push e abra PR**:
   ```bash
   git push origin feature/sua-feature
   ```

5. **Descreva o PR** seguindo o template

---

## 📐 Padrões de Código

### Nomenclatura

```typescript
// Services: PascalCase + Service
export class AppointmentService { }

// Controllers: PascalCase + Controller
export class AppointmentController { }

// Repositories: PascalCase + Repository
export class AppointmentRepository { }

// Interfaces: IPascalCase
export interface IAppointment { }

// Métodos: camelCase
async createAppointment() { }

// Constantes: UPPER_SNAKE_CASE
const MAX_APPOINTMENTS = 10;
```

### Estrutura de Arquivo

```typescript
// 1. Imports
import { NotFoundError } from "../errors/not-found.error";

// 2. Tipos/Interfaces
interface IService {
  id: string;
  name: string;
}

// 3. Classe/Função Principal
export class MyService {
  // Constructor
  constructor() {}

  // Métodos públicos
  async getAll() { }

  // Métodos privados
  private validateData() { }
}
```

### Comentários

```typescript
// ✅ BOM - Comenta o "por quê", não o "o quê"
async create(data: IAppointment) {
  // Validação necessária pois profissional não pode atender dois clientes simultaneamente
  const conflicts = await this.checkConflicts(data);
}

// ❌ RUIM - Óbvio demais
// Valida conflitos
async create(data: IAppointment) { }
```

### Tratamento de Erros

```typescript
// ✅ BOM - Erro específico com mensagem clara
if (!appointment) {
  throw new NotFoundError("Agendamento não encontrado");
}

// ❌ RUIM - Erro genérico
throw new Error("Erro!");
```

### Tipagem

```typescript
// ✅ BOM - Tipos explícitos
async getById(id: string): Promise<IAppointment | null> {
  return await this.repository.getById(id);
}

// ❌ RUIM - any
async getById(id: any): any {
  return this.repository.getById(id);
}
```

---

## 📝 Commits Semânticos

Siga o padrão [Conventional Commits](https://www.conventionalcommits.org/):

```
<tipo>(<escopo>): <descrição>

<corpo>

<rodapé>
```

### Tipos

- **feat**: Nova feature
- **fix**: Correção de bug
- **docs**: Alterações em documentação
- **style**: Formatação, sem mudança de lógica
- **refactor**: Refatoração sem alterar funcionalidade
- **perf**: Melhoria de performance
- **test**: Adição ou alteração de testes
- **chore**: Atualizações de dependências, build, etc

### Exemplos

```bash
feat(appointments): adiciona detecção de conflitos de horário
fix(auth): corrige geração de token JWT expirado
docs(readme): atualiza instruções de instalação
refactor(services): simplifica validação de negócio
```

---

## 🧪 Testes

### Executar Testes

```bash
npm test
```

### Escrevendo Testes

```typescript
import { AppointmentService } from "../services/appointment.service";

describe("AppointmentService", () => {
  let service: AppointmentService;

  beforeEach(() => {
    service = new AppointmentService();
  });

  it("should create appointment successfully", async () => {
    const appointment = await service.create(validData);
    expect(appointment.id).toBeDefined();
  });

  it("should throw error on conflict", async () => {
    expect(() => service.create(conflictingData)).toThrow();
  });
});
```

---

## ✅ Checklist de PR

Antes de submeter, certifique-se:

- [ ] Código segue padrões do projeto
- [ ] TypeScript sem erros (`npx tsc --noEmit`)
- [ ] Commits são semânticos
- [ ] README atualizado se necessário
- [ ] Testes adicionados/passando
- [ ] Sem console.log desnecessários
- [ ] Sem arquivos temporários commitados

---

## 📚 Estrutura de Diretórios

```
src/
├── controllers/    # Requisição → Response
├── services/       # Lógica de negócio
├── repositories/   # Acesso a dados
├── models/         # Tipos e schemas
├── routes/         # Definição de rotas
├── middlewares/    # Auth, validação, etc
├── errors/         # Erros customizados
└── server.ts       # Configuração Express
```

---

## 🐛 Reportando Bugs

Template padrão:

**Título:** `[BUG] Descrição breve do problema`

**Descrição:**
```
## Comportamento Atual
Descreva o que está acontecendo.

## Comportamento Esperado
Descreva o que deveria acontecer.

## Steps para Reproduzir
1. Faça isso
2. Faça aquilo
3. Veja o erro

## Informações do Ambiente
- Node: v18.0.0
- npm: v9.0.0
- OS: Windows 11

## Logs/Screenshots
Cole aqui se houver
```

---

## 💬 Dúvidas?

- Abra uma [discussion](https://github.com/lunionte/palantir-services-api/discussions)
- Contate o maintainer
- Leia a [documentação](./README.md)

---

<div align="center">

**Obrigado por contribuir! 🚀**

</div>
