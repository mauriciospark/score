# Arquitetura do SCORE (Linhagem SPARK)

## Design Arquitetural

O SCORE adota uma arquitetura **Client-Side First** com foco em simplicidade, privacidade e performance. O sistema não requer backend próprio, operando inteiramente no navegador do usuário através de requisições diretas à API do GitHub.

### Padrões Arquiteturais

**1. Client-Side Architecture**
- Toda a lógica de negócio reside no navegador
- Processamento de dados local sem persistência em servidor
- Comunicação direta com APIs externas (GitHub API v3)
- Estado gerenciado via JavaScript vanilla

**2. MVC Simplificado**
- **Model**: Estruturas de dados para perfis GitHub e cálculos de rank
- **View**: Interface HTML/CSS com atualizações dinâmicas via DOM
- **Controller**: Funções JavaScript que orquestram requisições e atualizações

**3. Single Page Application (SPA)**
- Navegação sem recarregamento de página
- Atualizações incrementais da interface
- Experiência fluida e responsiva

## Justificativas Técnicas

### Escolha de Client-Side First

**Privacidade de Dados**
- Dados do usuário nunca saem do navegador para servidores intermediários
- Requisições diretas à API do GitHub garantem transparência
- Não há persistência de informações sensíveis
- Compliance com GDPR e LGPD

**Simplicidade de Deploy**
- Não requer infraestrutura de servidor
- Hospedagem estática (GitHub Pages, Netlify, Vercel)
- Zero custos de manutenção de backend
- Escalabilidade automática via CDN

**Performance**
- Processamento local reduz latência
- Cache do navegador otimiza requisições recorrentes
- Sem overhead de comunicação cliente-servidor
- Carregamento inicial rápido

### Escolha da API do GitHub

**Autenticidade dos Dados**
- Fonte única de verdade para métricas de desenvolvedores
- Dados em tempo real e atualizados
- Elimina necessidade de sincronização
- Garante precisão nas avaliações

**Limitações e Soluções**
- Rate limiting: Implementado sistema de paginação e cache
- Dados privados: Fallback para estimativas baseadas em repositórios públicos
- Latência: Requisições paralelas quando possível
- Consistência: Margem de segurança e amortecimento

### Escolha de Algoritmos Estatísticos

**CDF (Cumulative Distribution Function)**
- Algoritmo oficial do github-readme-stats
- Baseado em distribuições estatísticas reais da comunidade
- Cálculo de percentis globais para comparação justa
- Funções exponencial e log-normal para diferentes métricas

**Sistema de Pesos Dinâmicos**
- Commits: Peso reduzido (API instável)
- PRs: Peso aumentado (dados confiáveis)
- Estrelas: Peso máximo (métrica mais estável)
- Issues, Reviews, Followers: Peso moderado

## Fluxo de Dados

### 1. Interação do Usuário

```
Usuário digita username e token do GitHub
    ↓
Botão "Analisar" clicado
    ↓
JavaScript captura inputs
    ↓
Token é salvo no localStorage (persistência local)
```

### 2. Requisição à API do GitHub

```
fetchGitHubData(username, token)
    ↓
1. Configurar headers com token de autenticação dinâmico
    ↓
2. Buscar perfil básico (/users/{username})
    ↓
3. Buscar repositórios (paginação completa)
    ↓
4. Buscar commits (Search API)
    ↓
5. Buscar PRs (Search API)
    ↓
6. Buscar Issues (Search API)
    ↓
7. Buscar contribuições (user/repos com affiliation)
```

### 3. Processamento de Dados

```
Dados brutos recebidos
    ↓
Aplicar margem de segurança (15%)
    ↓
Calcular CDF para cada métrica
    ↓
Aplicar pesos dinâmicos
    ↓
Calcular percentil global
    ↓
Determinar Rank baseado em thresholds
```

### 4. Atualização da Interface

```
updateUI(data)
    ↓
1. Atualizar avatar e informações básicas
    ↓
2. Atualizar estatísticas (stars, commits, PRs, etc.)
    ↓
3. Calcular e exibir Rank
    ↓
4. Atualizar círculo de progresso
    ↓
5. Gerar diagnóstico personalizado
    ↓
6. Atualizar tabela de metas (Estado 2)
    ↓
7. Mostrar seção de resultados
```

### 5. Sistema de Estados da Tabela de Metas

**Estado 1 (Inicial)**
- Tabela informativa com todos os ranks
- Faixas de percentil para cada rank
- Status: "⏳ Aguardando busca"

**Estado 2 (Dinâmico)**
- Tabela personalizada com dados do usuário
- Destaque do rank atual
- Status: "🎯 Seu Rank Atual", "✅ Alcançado", "⏳ Pendente"
- Card de próximo objetivo com sugestões

## Privacidade e Segurança

### Proteção de Dados
- Nenhum dado é armazenado em servidor
- Token de API é fornecido dinamicamente pelo usuário
- Requisições HTTPS criptografadas
- Sem cookies ou tracking
- Tokens são persistidos apenas no localStorage do navegador

### Autenticação Dinâmica
- Personal Access Token do GitHub (obrigatório)
- Token inserido pelo usuário na interface
- Armazenado no localStorage para persistência local
- Nunca enviado para servidores externos além da API do GitHub
- Garante segurança e privacidade dos dados
- **Modelo Local-First**: Token é usado apenas localmente no navegador, garantindo autonomia do usuário sobre seus dados
- **Responsabilidade**: A validade e as permissões do token são definidas exclusivamente pelo usuário no GitHub. A gestão de expiração e segurança é de sua total responsabilidade

### Rate Limiting
- API pública: 60 requisições/hora (não utilizada)
- API autenticada: 5000 requisições/hora (padrão)
- Sistema de paginação para maximizar uso
- Cache inteligente para evitar requisições duplicadas

## Estrutura de Arquivos

```
score/
├── index.html              # Interface principal
├── css/
│   └── style.css          # Estilos e design
├── javascript/
│   └── script.js          # Lógica de negócio
├── favicon/
│   └── logo.jpg           # Logo da marca
├── docs/
│   ├── README.md          # Documentação principal
│   ├── ABOUT.md           # Sobre o projeto
│   ├── ARCHITECTURE.md    # Este arquivo
│   ├── CONTRIBUTING.md    # Guia de contribuição
│   └── CHANGELOG.md       # Histórico de versões
├── src/
│   └── calculateRank.js   # Algoritmos de cálculo
├── tests/
│   └── calculateRank.test.js # Testes unitários
├── bench/
│   └── calculateRank.bench.js # Benchmarks
└── LICENSE                # Licença MIT
```

## Tecnologias e Dependências

### Frontend
- HTML5 (Estrutura semântica)
- CSS3 (Design responsivo, gradientes, animações)
- JavaScript ES6+ (Lógica, async/await, fetch API)

### APIs Externas
- GitHub REST API v3
- GitHub Search API (commits, issues, PRs)

### Algoritmos
- CDF Exponencial: `1 - 2^(-x)`
- CDF Log-Normal: `x / (1 + x)`
- Sistema de pesos dinâmicos

## Considerações de Escalabilidade

### Limitações Atuais
- Dependência da API do GitHub
- Rate limiting pode afetar uso intensivo
- Processamento limitado ao navegador do usuário

### Melhorias Futuras
- Implementação de Service Worker para cache offline
- Sistema de fila para requisições em batch
- Opcional: Backend para cache distribuído
- Integração com GraphQL para queries mais eficientes

---

**PROPRIETÁRIO**: Mauricio Spark  
**MARCA**: Spark Mauricio  
**VERSÃO**: v1.0.0  
**LINHAGEM**: SPARK  
**COPYRIGHT**: © 2026 / Mauricio Spark. Todos os direitos reservados.
