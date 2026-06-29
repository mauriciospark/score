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
- **Cálculo de Rank**: Algoritmo oficial baseado em percentis globais (S++, S, A+, A, A-, B+, B, B-, C+, C)
- **Tabela Dinâmica de Metas**: 
  - Estado 1: Tabela informativa com todos os ranks e faixas de percentil
  - Estado 2: Tabela personalizada mostrando o rank atual e próximos objetivos
- **Sistema de Estabilidade**: Margem de segurança e amortecimento para compensar falhas da API
- **Diagnóstico Personalizado**: Recomendações baseadas no perfil do usuário
- **Interface Responsiva**: Design moderno com tema dark mode
- **Logo Profissional**: Identidade visual com marca Spark Mauricio

## Como Usar

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

3. Gere seu Personal Access Token do GitHub:
- Acesse: https://github.com/settings/tokens
- Clique em "Generate new token (classic)"
- Dê um nome descritivo ao token (ex: "SCORE Auditoria")
- Selecione os escopos necessários: `repo` (acesso a repositórios) e `user` (especificamente `read:user` para dados do perfil)
- **Importante**: Não selecione outras opções adicionais além dessas duas permissões
- Clique em "Generate token"
- **Importante**: Copie o token imediatamente, pois ele não será exibido novamente

4. Insira o token na interface:
- Cole o token no campo "Token do GitHub (obrigatório)"
- O token será salvo automaticamente no localStorage do navegador
- **Nota**: O token é usado apenas localmente e nunca é enviado para servidores externos além da API do GitHub
- **Responsabilidade**: A validade e as permissões do seu token são definidas exclusivamente pelo usuário no GitHub. A gestão de expiração e segurança é de sua total responsabilidade.

5. Gerenciamento do Token:
- Use o botão 🗑️ para apagar o token salvo do localStorage
- Monitore a validade do seu token no GitHub Settings
- Revogue o token quando necessário para garantir segurança

6. Inicie a análise:
- Digite o username do GitHub no campo de busca
- Clique em "Analisar" para obter a avaliação completa

## Notas de Desenvolvimento

- O sistema é 100% client-side, não requer servidor backend
- Utiliza a API do GitHub com autenticação obrigatória via Personal Access Token
- Implementa algoritmos estatísticos para cálculo de percentis
- Sistema de pesos ajustado para priorizar métricas confiáveis (estrelas e PRs)
- Tokens são persistidos localmente via localStorage para conveniência do usuário
- **Modelo Local-First**: A ferramenta opera exclusivamente no navegador do usuário, garantindo autonomia e privacidade dos dados

---

**PROPRIETÁRIO**: Mauricio Spark  
**MARCA**: Spark Mauricio  
**VERSÃO**: v1.0.0  
**LINHAGEM**: SPARK  
**COPYRIGHT**: © 2026 / Mauricio Spark. Todos os direitos reservados.
