---
name: quantum-excel-generator
description: >
  Gerador de planilhas Excel futuristas (.xlsx) com visual Cyberpunk/SpaceX para
  dashboards financeiros. Cria relatórios com KPIs, formatação condicional neon,
  gráficos de juros compostos e tabelas de projeção patrimonial. Integra-se ao
  Quantum Financial Copilot para exportar dados mensais em formato profissional.
---

# 📊 Quantum Excel Generator — SKILL.md

> **Gerador de dashboards financeiros futuristas em Excel (.xlsx)**
> Visual *Cyberpunk/SpaceX* com gradientes neon, KPIs automatizados e gráficos de projeção patrimonial.

---

## 🎯 Objetivo

Gerar planilhas Excel avançadas (`.xlsx`) que transformem os dados financeiros do Quantum Financial Copilot em **dashboards visuais de alto impacto**, prontos para análise rápida e tomada de decisão.

A identidade visual deve ser **futurista e dark**, inspirada em painéis de controle de naves espaciais — fundo escuro, acentos neon (ciano, magenta, verde-limão), tipografia bold.

---

## 🛠️ Stack Técnica

Use a biblioteca **openpyxl** para Python. Se não estiver instalada, execute:

```bash
pip install openpyxl
```

### Dependências Opcionais
- `Pillow` — para inserção de logotipos/imagens
- `numpy` — para cálculos de projeção

---

## 🎨 Design System — Quantum Dark Theme

### Paleta de Cores

| Elemento | Cor Hex | Uso |
|----------|---------|-----|
| Fundo principal | `#0D0D0D` | Background das células |
| Fundo secundário | `#1A1A2E` | Headers e seções |
| Fundo de cards | `#16213E` | Áreas de KPI |
| Acento primário (Ciano) | `#00F5FF` | Títulos, bordas, destaques positivos |
| Acento secundário (Magenta) | `#FF006E` | Alertas, gastos acima do limite |
| Acento terciário (Verde neon) | `#39FF14` | Indicadores positivos, aportes |
| Acento quaternário (Amarelo) | `#FFD700` | Avisos, valores intermediários |
| Texto principal | `#E0E0E0` | Corpo do texto |
| Texto secundário | `#8892B0` | Labels e subtítulos |

### Formatação de Células

```python
from openpyxl.styles import Font, PatternFill, Border, Side, Alignment

# Estilo do header principal
header_fill = PatternFill(start_color="1A1A2E", end_color="1A1A2E", fill_type="solid")
header_font = Font(name="Segoe UI", size=14, bold=True, color="00F5FF")

# Estilo de dados
data_fill = PatternFill(start_color="0D0D0D", end_color="0D0D0D", fill_type="solid")
data_font = Font(name="Segoe UI", size=11, color="E0E0E0")

# Estilo de KPI positivo
kpi_positive_font = Font(name="Segoe UI", size=20, bold=True, color="39FF14")

# Estilo de KPI negativo/alerta
kpi_alert_font = Font(name="Segoe UI", size=20, bold=True, color="FF006E")

# Bordas neon
neon_border = Border(
    left=Side(style="thin", color="00F5FF"),
    right=Side(style="thin", color="00F5FF"),
    top=Side(style="thin", color="00F5FF"),
    bottom=Side(style="thin", color="00F5FF"),
)
```

---

## 📐 Estrutura da Planilha

A planilha deve conter as seguintes abas (worksheets):

### Aba 1: 🏠 Dashboard Principal

Layout sugerido:

```
┌─────────────────────────────────────────────────────────┐
│  🚀 QUANTUM FINANCIAL DASHBOARD — [MÊS/ANO]           │
├──────────┬──────────┬──────────┬──────────┬─────────────┤
│  RENDA   │ GASTOS   │ SOBRA    │ INVESTIDO│ PATRIMÔNIO  │
│  MENSAL  │ TOTAIS   │ LÍQUIDA  │ NO MÊS   │ ACUMULADO   │
│  R$X.XXX │ R$X.XXX  │ R$X.XXX  │ R$X.XXX  │ R$XX.XXX    │
├──────────┴──────────┴──────────┴──────────┴─────────────┤
│                                                         │
│  QUANTUM-SPLIT — Alocação por Vetor                     │
│                                                         │
│  🛡️ Sobrevivência  ████████░░ 78%  R$ X.XXX / R$ X.XXX │
│  ⚡ Aceleração      ██████████ 100% R$ X.XXX / R$ X.XXX │
│  🚀 Futuro          ████░░░░░░ 40%  R$ XXX / R$ XXX     │
│  🎮 Expansão        ██████░░░░ 60%  R$ XXX / R$ XXX     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Aba 2: 📋 Transações do Mês

| Data | Descrição | Valor | Categoria | Vetor | Pagamento |
|------|-----------|-------|-----------|-------|-----------|
| Dados alimentados pelo Copiloto Financeiro |

**Formatação condicional:**
- 🟢 Verde neon (`#39FF14`) → transações ≤ R$ 50
- 🟡 Amarelo (`#FFD700`) → transações R$ 50–200
- 🔴 Magenta (`#FF006E`) → transações > R$ 200

### Aba 3: 📈 Projeção Patrimonial

Tabela de projeção com juros compostos para 1, 3, 5, 10, 20 e 30 anos.

| Horizonte | Aporte Mensal | Taxa (a.a.) | Patrimônio Projetado |
|-----------|--------------|-------------|---------------------|
| 1 ano     | R$ X         | 12%         | R$ X.XXX            |
| 5 anos    | R$ X         | 12%         | R$ XX.XXX           |
| 10 anos   | R$ X         | 12%         | R$ XXX.XXX          |
| 20 anos   | R$ X         | 12%         | R$ X.XXX.XXX        |
| 30 anos   | R$ X         | 12%         | R$ XX.XXX.XXX       |

**Incluir gráfico de linha** (openpyxl chart) mostrando a curva de crescimento exponencial.

### Aba 4: 🔍 Diagnóstico de Vazamentos

| Gasto Recorrente | Valor Mensal | Valor Anual | Impacto em 5 anos (12% a.a.) | Status |
|------------------|-------------|-------------|------------------------------|--------|
| Identificado pelo Copiloto |

### Aba 5: 🎯 Simulador de Compras

| Item | Valor | Horas de Trabalho | Em 1 ano | Em 5 anos | Em 10 anos | Veredicto |
|------|-------|--------------------|----------|-----------|------------|-----------|
| Dados do modo Compra Impulsiva |

---

## 🔧 Script de Geração Base

```python
import openpyxl
from openpyxl.styles import Font, PatternFill, Border, Side, Alignment
from openpyxl.chart import LineChart, Reference
from openpyxl.utils import get_column_letter
from datetime import datetime

def create_quantum_dashboard(data: dict, output_path: str = "quantum_dashboard.xlsx"):
    """
    Gera o dashboard financeiro futurista em Excel.

    Args:
        data: Dicionário com os dados financeiros do mês:
            - renda: float
            - transacoes: list[dict] com keys: data, descricao, valor, categoria, vetor, pagamento
            - vetores: dict com gastos por vetor
            - projecoes: dict com configurações de projeção
        output_path: Caminho do arquivo .xlsx de saída
    """
    wb = openpyxl.Workbook()

    # === CORES DO TEMA ===
    BG_DARK = "0D0D0D"
    BG_HEADER = "1A1A2E"
    BG_CARD = "16213E"
    CYAN = "00F5FF"
    MAGENTA = "FF006E"
    GREEN = "39FF14"
    GOLD = "FFD700"
    TEXT = "E0E0E0"
    TEXT_DIM = "8892B0"

    # === ESTILOS ===
    title_style = Font(name="Segoe UI", size=16, bold=True, color=CYAN)
    header_style = Font(name="Segoe UI", size=11, bold=True, color=CYAN)
    data_style = Font(name="Segoe UI", size=11, color=TEXT)
    money_format = '#,##0.00'

    bg_fill = PatternFill(start_color=BG_DARK, end_color=BG_DARK, fill_type="solid")
    header_fill = PatternFill(start_color=BG_HEADER, end_color=BG_HEADER, fill_type="solid")
    card_fill = PatternFill(start_color=BG_CARD, end_color=BG_CARD, fill_type="solid")

    neon_border = Border(
        left=Side(style="thin", color=CYAN),
        right=Side(style="thin", color=CYAN),
        top=Side(style="thin", color=CYAN),
        bottom=Side(style="thin", color=CYAN),
    )

    # ==============================
    # ABA 1: DASHBOARD PRINCIPAL
    # ==============================
    ws_dash = wb.active
    ws_dash.title = "Dashboard"
    ws_dash.sheet_properties.tabColor = CYAN

    # Configurar larguras
    for col in range(1, 12):
        ws_dash.column_dimensions[get_column_letter(col)].width = 18

    # Título
    ws_dash.merge_cells("A1:F1")
    title_cell = ws_dash["A1"]
    title_cell.value = f"🚀 QUANTUM FINANCIAL DASHBOARD — {datetime.now().strftime('%B %Y').upper()}"
    title_cell.font = title_style
    title_cell.fill = header_fill
    title_cell.alignment = Alignment(horizontal="center", vertical="center")
    ws_dash.row_dimensions[1].height = 45

    # KPIs
    renda = data.get("renda", 5000)
    gastos_totais = sum(t.get("valor", 0) for t in data.get("transacoes", []))
    sobra = renda - gastos_totais

    kpis = [
        ("💰 Renda", renda),
        ("📉 Gastos", gastos_totais),
        ("💎 Sobra", sobra),
        ("⚡ Investido", data.get("investido", 0)),
        ("🏦 Patrimônio", data.get("patrimonio", 0)),
    ]

    for i, (label, value) in enumerate(kpis, start=1):
        col = get_column_letter(i)
        ws_dash[f"{col}3"].value = label
        ws_dash[f"{col}3"].font = Font(name="Segoe UI", size=10, color=TEXT_DIM)
        ws_dash[f"{col}3"].fill = card_fill
        ws_dash[f"{col}3"].border = neon_border

        ws_dash[f"{col}4"].value = value
        ws_dash[f"{col}4"].number_format = money_format
        ws_dash[f"{col}4"].font = Font(
            name="Segoe UI", size=16, bold=True,
            color=GREEN if value >= 0 else MAGENTA
        )
        ws_dash[f"{col}4"].fill = card_fill
        ws_dash[f"{col}4"].border = neon_border

    # Pintar fundo escuro em toda a aba
    for row in ws_dash.iter_rows(min_row=1, max_row=30, min_col=1, max_col=10):
        for cell in row:
            if cell.fill == PatternFill():  # Só se não tiver fill definido
                cell.fill = bg_fill

    # ==============================
    # ABA 2: TRANSAÇÕES
    # ==============================
    ws_trans = wb.create_sheet("Transações")
    ws_trans.sheet_properties.tabColor = GREEN

    headers = ["Data", "Descrição", "Valor", "Categoria", "Vetor", "Pagamento"]
    for i, h in enumerate(headers, start=1):
        cell = ws_trans.cell(row=1, column=i, value=h)
        cell.font = header_style
        cell.fill = header_fill
        cell.border = neon_border
        ws_trans.column_dimensions[get_column_letter(i)].width = 20

    for row_idx, t in enumerate(data.get("transacoes", []), start=2):
        ws_trans.cell(row=row_idx, column=1, value=t.get("data", "")).font = data_style
        ws_trans.cell(row=row_idx, column=2, value=t.get("descricao", "")).font = data_style
        val_cell = ws_trans.cell(row=row_idx, column=3, value=t.get("valor", 0))
        val_cell.number_format = money_format
        val_cell.font = data_style
        ws_trans.cell(row=row_idx, column=4, value=t.get("categoria", "")).font = data_style
        ws_trans.cell(row=row_idx, column=5, value=t.get("vetor", "")).font = data_style
        ws_trans.cell(row=row_idx, column=6, value=t.get("pagamento", "N/I")).font = data_style

        # Formatação condicional por valor
        valor = t.get("valor", 0)
        if valor > 200:
            color = MAGENTA
        elif valor > 50:
            color = GOLD
        else:
            color = GREEN
        val_cell.font = Font(name="Segoe UI", size=11, bold=True, color=color)

        for col in range(1, 7):
            ws_trans.cell(row=row_idx, column=col).fill = bg_fill

    # ==============================
    # ABA 3: PROJEÇÃO PATRIMONIAL
    # ==============================
    ws_proj = wb.create_sheet("Projeção Patrimonial")
    ws_proj.sheet_properties.tabColor = GOLD

    ws_proj.cell(row=1, column=1, value="Horizonte (anos)").font = header_style
    ws_proj.cell(row=1, column=2, value="Aporte Mensal").font = header_style
    ws_proj.cell(row=1, column=3, value="Taxa (a.a.)").font = header_style
    ws_proj.cell(row=1, column=4, value="Patrimônio Projetado").font = header_style

    for col in range(1, 5):
        ws_proj.cell(row=1, column=col).fill = header_fill
        ws_proj.cell(row=1, column=col).border = neon_border
        ws_proj.column_dimensions[get_column_letter(col)].width = 22

    aporte = data.get("aporte_mensal", 1000)
    taxa_anual = data.get("taxa_anual", 0.12)
    taxa_mensal = (1 + taxa_anual) ** (1/12) - 1

    horizontes = [1, 3, 5, 10, 20, 30]
    for i, anos in enumerate(horizontes, start=2):
        meses = anos * 12
        patrimonio = aporte * (((1 + taxa_mensal) ** meses - 1) / taxa_mensal)

        ws_proj.cell(row=i, column=1, value=anos).font = data_style
        ws_proj.cell(row=i, column=2, value=aporte).font = data_style
        ws_proj.cell(row=i, column=2).number_format = money_format
        ws_proj.cell(row=i, column=3, value=f"{taxa_anual*100:.0f}%").font = data_style
        ws_proj.cell(row=i, column=4, value=round(patrimonio, 2)).font = Font(
            name="Segoe UI", size=11, bold=True, color=GREEN
        )
        ws_proj.cell(row=i, column=4).number_format = money_format

        for col in range(1, 5):
            ws_proj.cell(row=i, column=col).fill = bg_fill

    # Gráfico de projeção
    chart = LineChart()
    chart.title = "Curva de Crescimento Patrimonial"
    chart.x_axis.title = "Horizonte (anos)"
    chart.y_axis.title = "Patrimônio (R$)"
    chart.style = 10

    data_ref = Reference(ws_proj, min_col=4, min_row=1, max_row=len(horizontes)+1)
    cats = Reference(ws_proj, min_col=1, min_row=2, max_row=len(horizontes)+1)
    chart.add_data(data_ref, titles_from_data=True)
    chart.set_categories(cats)
    chart.shape = 4
    ws_proj.add_chart(chart, "A10")

    # ==============================
    # SALVAR
    # ==============================
    wb.save(output_path)
    print(f"✅ Dashboard salvo em: {output_path}")
    return output_path


# ============================================================
# EXEMPLO DE USO
# ============================================================
if __name__ == "__main__":
    sample_data = {
        "renda": 5000,
        "investido": 1000,
        "patrimonio": 25000,
        "aporte_mensal": 1000,
        "taxa_anual": 0.12,
        "transacoes": [
            {"data": "2026-10-01", "descricao": "Aluguel", "valor": 1500, "categoria": "Moradia", "vetor": "🛡️ Sobrevivência", "pagamento": "Pix"},
            {"data": "2026-10-02", "descricao": "Almoço", "valor": 45, "categoria": "Alimentação", "vetor": "🛡️ Sobrevivência", "pagamento": "Cartão"},
            {"data": "2026-10-02", "descricao": "Uber", "valor": 12, "categoria": "Transporte", "vetor": "🛡️ Sobrevivência", "pagamento": "Cartão"},
            {"data": "2026-10-03", "descricao": "Netflix", "valor": 55.90, "categoria": "Assinatura", "vetor": "🎮 Expansão", "pagamento": "Cartão"},
            {"data": "2026-10-05", "descricao": "Curso Online", "valor": 297, "categoria": "Educação", "vetor": "🚀 Futuro", "pagamento": "Pix"},
        ],
    }
    create_quantum_dashboard(sample_data, "quantum_dashboard.xlsx")
```

---

## 📦 Como Usar

### Via Copiloto Financeiro (integrado)

Basta pedir ao Quantum Financial Copilot:

> *"Gera a planilha do mês"*
> *"Exporta meu dashboard para Excel"*
> *"Quero ver a projeção patrimonial no Excel"*

O copiloto coletará os dados registrados e chamará este gerador automaticamente.

### Via Script Direto

```python
from quantum_excel_generator import create_quantum_dashboard

data = {
    "renda": 8000,
    "transacoes": [...],  # lista de transações do mês
    "aporte_mensal": 1600,
    "taxa_anual": 0.12,
}

create_quantum_dashboard(data, "meu_dashboard_outubro.xlsx")
```

---

## 🖼️ Personalização

| Parâmetro | Padrão | Descrição |
|-----------|--------|-----------|
| `output_path` | `quantum_dashboard.xlsx` | Caminho do arquivo de saída |
| `taxa_anual` | `0.12` (12%) | Taxa de rendimento para projeções |
| `aporte_mensal` | Baseado no Vetor Aceleração | Valor mensal de investimento |
| `tema` | Dark/Neon | Esquema de cores do dashboard |

---

## ⚠️ Notas Importantes

- As projeções usam taxas ilustrativas e **não constituem recomendação de investimento**.
- Para decisões de investimento, consulte um profissional certificado (CEA/CFP).
- A planilha é compatível com Excel 2016+, LibreOffice Calc e Google Sheets.

---

*Quantum Excel Generator v1.0 — Dados financeiros nunca foram tão bonitos.* 📊✨

