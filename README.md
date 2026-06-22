# SCORE — Auditoria de Perfil GitHub (Linhagem SPARK)

## Descrição

SCORE é uma plataforma de auditoria e análise de perfil GitHub que fornece uma avaliação precisa e justa da atividade de desenvolvedores em repositórios públicos. Utilizando o algoritmo oficial de CDF (Cumulative Distribution Function) do GitHub, o sistema calcula ranks baseados em percentis globais, considerando métricas como commits, pull requests, issues, estrelas e contribuições em projetos externos.

O problema que o SCORE resolve é a falta de transparência e padronização na avaliação de perfis GitHub, permitindo que desenvolvedores entendam seu posicionamento real na comunidade global e recebam recomendações personalizadas para melhorar sua visibilidade e impacto.

## Stack

### Frontend
- HTML5
- CSS3 (com gradientes e design dark mode)
- JavaScript (ES6+)

### Backend
- API REST do GitHub (v3)
- Autenticação via Personal Access Token

### Bibliotecas e Ferramentas
- Fetch API para requisições HTTP
- Algoritmos estatísticos (CDF exponencial e log-normal)
- Sistema de pesos dinâmicos para cálculo de ranks

## Funcionalidades

- **Análise de Perfil**: Busca automática de dados do usuário via API do GitHub
- **Cálculo de Rank**: Algoritmo oficial baseado em percentis globais (S, A+, A, A-, B+, B, B-, C+, C)
- **Tabela Dinâmica de Metas**: 
  - Estado 1: Tabela informativa com todos os ranks e faixas de percentil
  - Estado 2: Tabela personalizada mostrando o rank atual e próximos objetivos
- **Sistema de Estabilidade**: Margem de segurança e amortecimento para compensar falhas da API
- **Diagnóstico Personalizado**: Recomendações baseadas no perfil do usuário
- **Interface Responsiva**: Design moderno com tema dark mode
- **Logo Profissional**: Identidade visual com marca Spark Mauricio

## Como Rodar

1. Clone o repositório:
```bash
git clone https://github.com/mauriciospark/score.git
cd score
```

2. Abra o arquivo `index.html` em seu navegador:
```bash
# Navegadores suportados:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
```

3. Configure o Token do GitHub (opcional):
- Edite o arquivo `javascript/script.js`
- Substitua `GITHUB_TOKEN` pelo seu Personal Access Token do GitHub
- Isso garante maior limite de requisições à API

4. Inicie a análise:
- Digite o username do GitHub no campo de busca
- Clique em "Analisar" para obter a avaliação completa

## Notas de Desenvolvimento

- O sistema é 100% client-side, não requer servidor backend
- Utiliza a API pública do GitHub com autenticação opcional
- Implementa algoritmos estatísticos para cálculo de percentis
- Sistema de pesos ajustado para priorizar métricas confiáveis (estrelas e PRs)

---

**PROPRIETÁRIO**: Mauricio Spark  
**MARCA**: Spark Mauricio  
**VERSÃO**: v1.0.0  
**LINHAGEM**: SPARK  
**COPYRIGHT**: © 2026 / Mauricio Spark. Todos os direitos reservados.
