# 🛸 Quantum Financial Suite | SpaceX & NASA Telemetry Engine

> **Copiloto Financeiro Pessoal de Ultra-Baixa Fricção com Telemetria Visual estilo NASA/SpaceX, Captura Multimodal (Voz, OCR, QR Code, Boletos) e Integração Open Finance.**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

---

## 🌌 Visão Geral & Cockpit de Telemetria

O **Quantum Financial Suite** transforma o gerenciamento financeiro em uma rotina de no máximo **30 segundos diários**. Em vez de tabelas e planilhas cansativas, a aplicação fornece um **HUD (Heads-Up Display)** em tempo real com estética *Cyberpunk / SpaceX*:

```text
================================================================================
🛸 QUANTUM MISSION CONTROL | TELEMETRIA PATRIMONIAL EM TEMPO REAL
================================================================================
[ STATUS DO MÊS ]  [████████████░░░░░░░░] 60% Consumido | Teto de Segurança OK
[ VALOR DA HORA ] R$ 100,00/h | Custo Diário de Sobrevivência: R$ 133,33
[ RELÓGIO FIRE ]   Liberdade Financeira Projetada: 7 anos e 4 meses
================================================================================
🛡️ SOBREVIVÊNCIA : R$ 3.000 / R$ 5.000 (60%) [DENTRO DO LIMITE]
⚡ ACELERAÇÃO    : R$ 1.500 / R$ 2.000 (75%) [ALOCAÇÃO: Tesouro IPCA / FIIs]
🚀 VETOR FUTURO  : R$   800 / R$ 1.000 (80%) [META PROJETO: 80%]
🎮 LAZER LIVRE   : R$   700 / R$ 1.000 (70%) [SALDO DISPONÍVEL: R$ 300]
================================================================================
```

---

## 🚀 Módulos e Tecnologias Principais

### 1. 🎙️ Comando de Voz Hands-Free (Web Speech API)
- Captura de áudio nativa no browser para uso veloz ou acessibilidade motora/visual.
- Processador semântico de linguagem natural em português:
  * Exemplo: *"Gastei 45 no almoço, 12 no Uber e 2500 de aluguel"* ➔ extração instantânea com valor, categoria e alocação automática no vetor correspondente.

### 2. 📸 Visão Computacional & OCR de Cupons Fiscais (NFC-e)
- Leitura de QR Codes de NFC-e (Nota Fiscal de Consumidor Eletrônica) emitidas pela SEFAZ.
- Extração de itens comprados, estabelecimento, valor total e impostos.
- Decodificador de código de barras e linhas digitáveis de Boletos Bancários (44 a 48 dígitos).

### 3. 🏦 Conector Open Finance & Conciliação de Extratos
- Protocolo simulado de conexão com agregadores de Open Finance (**Pluggy / Belvo**) para sincronização com Nubank, Itaú, BTG, XP, Inter e Bradesco.
- Importador de arquivos de extrato **.OFX, .CSV e .JSON** com reconciliação bancária automática.

### 4. 🧬 O Método Quantum-Split (4 Vetores)
- 🛡️ **Sobrevivência (50% a 60%):** Despesas essenciais (aluguel, mercado, luz, saúde). Teto rígido com telemetria de burnrate diário.
- ⚡ **Aceleração FIRE (mínimo 20%):** Motor de liberdade financeira (Tesouro Selic/IPCA, FIIs, Ações globais).
- 🚀 **Vetor Futuro (10% a 15%):** Metas de médio prazo, especializações, upgrades e viagens.
- 🎮 **Lazer Livre (10% a 15%):** Lazer sem culpa para manter a qualidade de vida.

### 5. ⏱️ Relógio FIRE & Simulador de Compra Impulsiva
- **Relógio FIRE:** Cálculo atuarial contínuo com base na regra dos 4% (25x despesas anuais) e projeções exponenciais de juros compostos.
- **Compra Impulsiva:** *"Vale a pena comprar X por R$ Y?"* ➔ Converte o valor em **horas de trabalho** necessárias para pagar o item e simula quanto esse montante renderia em **1, 5 e 10 anos** se aportado no Vetor Aceleração.

---

## 🛠️ Como Executar Localmente

### Pré-requisitos
- **Node.js 18+** instalado.
- **npm** ou **yarn**.

### 1. Clonar o Repositório
```bash
git clone https://github.com/LuidiSilva05/Desafio_skill.git
cd Desafio_skill
```

### 2. Instalar Dependências
```bash
npm install
```

### 3. Iniciar o Servidor de Desenvolvimento
```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

### 4. Compilar para Produção
```bash
npm run build
npm run start
```

---

## 📁 Estrutura do Projeto

```
quantum-financial-suite/
├── src/
│   ├── app/
│   │   ├── globals.css             # Estilos Cyberpunk, Scanlines e Grid SpaceX
│   │   ├── layout.tsx              # Root Layout com fontes e Provider
│   │   ├── page.tsx                # Dashboard Principal de Telemetria
│   │   └── settings/
│   │       └── page.tsx            # Calibração 100% Customizável campo por campo
│   ├── components/
│   │   ├── HeaderHUD.tsx           # Barra superior com relógio UTC e atalhos
│   │   ├── TelemetryGauges.tsx     # Medidores de status, hora de vida e burnrate
│   │   ├── VectorsProgress.tsx     # Barras dinâmicas do Quantum-Split
│   │   ├── FireClock.tsx           # Contagem regressiva FIRE e juros compostos
│   │   ├── VoiceCommander.tsx      # Web Speech API hands-free
│   │   ├── ScannerModal.tsx        # Câmera QR Code, Boleto e OCR NFC-e
│   │   ├── OpenFinanceModal.tsx    # APIs bancárias e importador OFX/CSV
│   │   ├── ImpulseCalculator.tsx   # Simulador de decisão de compra
│   │   ├── LeakDetector.tsx        # Detecção de assinaturas e microvazamentos
│   │   └── TransactionList.tsx     # Feed de transações e input 30s
│   ├── context/
│   │   └── FinancialContext.tsx    # Estado global e persistência LocalStorage
│   └── types/
│       └── financial.ts            # Tipagens TypeScript completas
├── skills/                         # Antigravity Skills integradas
├── .antigravityrules               # Diretrizes do Copiloto no Workspace
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🔒 Privacidade e Criptografia
- Todos os dados financeiros são armazenados localmente no navegador via `localStorage`.
- Nenhuma informação privada é transmitida para servidores de terceiros.

---

## ⚠️ Ressalva Legal
> As projeções matemáticas, simulações e diagnósticos apresentados nesta suíte têm finalidade estritamente educativa e de auxílio à organização financeira pessoal, não constituindo recomendação de investimento. Decisões de investimento de maior porte merecem a avaliação de um profissional certificado (CEA/CFP).
