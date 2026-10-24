# 🏛️ Kamino Quantum | Enterprise Financial OS

> **SaaS de Gestão Financeira Enterprise de ultra-alta performance com design limpo, minimalista e elegante (padrão Kamino, Stripe, Brex e Ramp).**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Design: Kamino / Stripe](https://img.shields.io/badge/Design-Kamino%20%7C%20Stripe-4F46E5?style=for-the-badge)](https://stripe.com)

---

## 🎨 Design System Kamino Fintech

O **Kamino Quantum** foi construído sob uma estética corporativa contemporânea:
- **Fundo:** Superfície suave e límpida (`#F8F9FD`).
- **Superfícies:** Cards brancos puros (`#FFFFFF`) com bordas delicadas (`#E2E8F0`) e elevação sutil (`shadow-subtle`).
- **Paleta de Marca:**
  * 🟣 **Kamino Indigo (`#4F46E5`):** Destaque de marca, botões de ação e métricas centrais.
  * 🟢 **Verde Esmeralda (`#10B981`):** Indicadores de rentabilidade, poupança e metas superadas.
  * 🔴 **Vermelho Coral (`#EF4444`):** Alertas de estouro de teto e despesas fora do padrão.
  * 🔘 **Slate & Marinho (`#0F172A` / `#64748B`):** Hierarquia tipográfica nítida com **Inter** e **Plus Jakarta Sans**.

---

## 📊 Dashboard Executivo (Executive Cockpit)

Apresentação dos relatórios em tabelas e resumos executivos minimalistas:

```text
--------------------------------------------------------------------------------
🏛️ KAMINO FINANCIAL DASHBOARD | RESUMO EXECUTIVO
--------------------------------------------------------------------------------
| Métrica | Valor Atual | Meta do Mês | Status |
| :--- | :--- | :--- | :--- |
| 🛡️ Sobrevivência | R$ 3.200,00 | R$ 5.000,00 | 64% (Dentro do Limite) |
| ⚡ Aceleração (Investimentos) | R$ 2.100,00 | R$ 2.000,00 | 105% (Meta Atingida) |
| 🚀 Vetor Futuro | R$ 800,00 | R$ 1.000,00 | 80% |
| 🎮 Lazer Livre | R$ 600,00 | R$ 1.000,00 | Saldo: R$ 400,00 |

[ MENSAL ] ████████████░░░░░░░░ 60% do Orçamento Total Consumido
--------------------------------------------------------------------------------
```

---

## 🚀 Funcionalidades & Arquitetura

### 1. 🎙️ Captura Automatizada por Voz (Web Speech API / Whisper)
- Processamento em linguagem natural para registro de movimentações em segundos sem tocar no teclado.
- Reconhecimento e extração automática de valor, categoria, vetor e forma de pagamento.

### 2. 📸 Scanner Óptico & OCR de Documentos Fiscais
- Câmera Web/Mobile com leitor de QR Code integrado via `html5-qrcode`.
- Leitura e processamento de Notas Fiscais Eletrônicas ao Consumidor (**NFC-e**).
- Decodificador de código de barras e linhas digitáveis de **Boletos Bancários** (44 a 48 dígitos).

### 3. 🏦 Conector Open Finance & Conciliação de Extratos
- Protocolo padronizado de Open Banking inspirado em agregadores líderes (**Pluggy / Belvo**).
- Conexão e conciliação com Nubank, Itaú, BTG Pactual, XP, Banco Inter e Bradesco.
- Importação manual de arquivos de extrato nos formatos **.OFX, .CSV e .JSON**.

### 4. 🧬 Alocação Patrimonial em 4 Vetores (Quantum-Split)
- 🛡️ **Vetor Sobrevivência (50% a 60%):** Despesas fixas e essenciais com telemetria de burn rate diário.
- ⚡ **Vetor Aceleração FIRE (20%+):** Aportes de crescimento e multiplicação em ativos de alta liquidez, IPCA+ e FIIs.
- 🚀 **Vetor Futuro (10% a 15%):** Metas de médio prazo, capacitação e viagens.
- 🎮 **Vetor Lazer Livre (10% a 15%):** Orçamento fixo para qualidade de vida sem culpa.

### 5. ⏱️ Calculadora de Custo de Oportunidade & Relógio FIRE
- **Valor da Hora de Trabalho:** Cálculo da taxa horária com base na renda líquida total e horas dedicadas no mês.
- **Simulador de Compra:** Conversão de qualquer item em horas de vida e projeção com juros compostos em 1, 5 e 10 anos.
- **Auditoria de Assinaturas:** Detecção proativa de serviços recorrentes e microvazamentos.

---

## 🛠️ Como Executar Localmente

### 1. Clonar e Instalar
```bash
git clone https://github.com/LuidiSilva05/Desafio_skill.git
cd Desafio_skill
npm install
```

### 2. Executar em Modo de Desenvolvimento
```bash
npm run dev
```
Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

### 3. Build de Produção
```bash
npm run build
npm run start
```

---

## 📁 Estrutura de Arquivos

```
quantum-financial-suite/
├── src/
│   ├── app/
│   │   ├── globals.css             # Estilo Kamino/Stripe (#F8F9FD, cards brancos)
│   │   ├── layout.tsx              # Tipografia Inter e Plus Jakarta Sans
│   │   ├── page.tsx                # Dashboard Executivo Principal
│   │   └── settings/
│   │       └── page.tsx            # Calibração 100% Customizável
│   ├── components/
│   │   ├── HeaderHUD.tsx           # Navbar institucional Kamino
│   │   ├── TelemetryGauges.tsx     # Métricas executivas e burn rate
│   │   ├── VectorsProgress.tsx     # Cartões de alocação dos 4 Vetores
│   │   ├── FireClock.tsx           # Projeção FIRE e juros compostos
│   │   ├── VoiceCommander.tsx      # Entrada de dados hands-free por voz
│   │   ├── ScannerModal.tsx        # Câmera QR Code, Boletos e OCR NFC-e
│   │   ├── OpenFinanceModal.tsx    # Open Finance Pluggy/Belvo e upload OFX/CSV
│   │   ├── ImpulseCalculator.tsx   # Custo de oportunidade e horas de trabalho
│   │   ├── LeakDetector.tsx        # Auditoria de assinaturas recorrentes
│   │   └── TransactionList.tsx     # Ledger consolidado e input rápido
│   ├── context/
│   │   └── FinancialContext.tsx    # Gerenciador de estado e persistência local
│   └── types/
│       └── financial.ts            # Tipagens TypeScript completas
├── tailwind.config.ts              # Paleta Kamino Indigo (#4F46E5) e sombras sutis
└── package.json
```

---

## 🔒 Privacidade
- Arquitetura **Client-Side First**: todos os dados são persistidos no navegador do usuário (`localStorage`).
- Nenhuma informação financeira é repassada a servidores externos não autorizados.

---

## ⚠️ Ressalva Legal
> As projeções, diagnósticos e simulações gerados por esta plataforma têm caráter estritamente educativo e informativo, não constituindo recomendação de investimento ou consultoria financeira regulada.
