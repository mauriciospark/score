# Guia de Contribuição — SCORE (Linhagem SPARK)

## Histórico de Alterações

### [Added] - Novos Recursos
- Sistema de tabela dinâmica de metas com dois estados
- Logo profissional no cabeçalho
- Sistema de estabilidade e amortecimento para cálculo de ranks
- Integração completa com API do GitHub (commits, PRs, issues, estrelas, contribuições)
- Algoritmo oficial de CDF para cálculo de percentis globais
- Interface responsiva com tema dark mode

### [Changed] - Modificações em Funções Existentes
- Ajuste de pesos das métricas (diminuição de commits, aumento de estrelas e PRs)
- Implementação de margem de segurança (15%) para compensar falhas da API
- Atualização do sistema de busca de contribuições para incluir organizações
- Refatoração da função `calculateOfficialRank` com estabilidade de nota
- Melhoria na coleta de dados com paginação completa de repositórios

### [Fixed] - Correções de Bugs
- Correção na contagem de contribuições para incluir repositórios de organizações
- Ajuste no header de commits para usar `application/vnd.github.cloak-preview+json`
- Correção na busca de PRs para evitar contagem incorreta
- Fix na lógica de fallback para commits quando API falha

## Guia de Boas Práticas

### Padrão de Código

**JavaScript**
- Use ES6+ features (const/let, arrow functions, template literals)
- Funções devem ter nomes descritivos em camelCase
- Comentários para lógica complexa
- Evite globals, use const para constantes

**CSS**
- Use classes em kebab-case
- Organize estilos por seção (header, input, results, etc.)
- Use variáveis CSS para cores repetidas
- Mantenha responsividade em mente

**HTML**
- Use tags semânticas (header, main, section, etc.)
- Atributos alt em imagens
- Estrutura indentada e legível
- Valide HTML antes de commit

### Estilo de Escrita

**Nomenclatura**
- Variáveis: camelCase (ex: `totalStars`, `fetchGitHubData`)
- Constantes: UPPER_SNAKE_CASE (ex: `GITHUB_TOKEN`, `SAFETY_MARGIN`)
- Classes CSS: kebab-case (ex: `.logo-wrapper`, `.goals-section`)
- Funções: camelCase com verbos (ex: `calculateRank`, `updateUI`)

**Comentários**
- Explique "por que" não "o que"
- Use comentários de bloco para funções complexas
- Mantenha comentários atualizados com o código
- Evite comentários óbvios

**Formatação**
- Indentação de 4 espaços
- Espaço após vírgulas e operadores
- Linha em branco entre funções
- Máximo 80-100 caracteres por linha

## Regras de Organização

### Nomenclatura de Branches

**Padrão**: `tipo/descricao-curta`

**Tipos permitidos**:
- `feature/` - Novos recursos
- `fix/` - Correção de bugs
- `refactor/` - Refatoração de código
- `docs/` - Atualizações de documentação
- `style/` - Alterações de formatação/estilo
- `test/` - Adição ou correção de testes
- `chore/` - Tarefas de manutenção

**Exemplos**:
- `feature/tabela-dinamica-metas`
- `fix/contribuicoes-organizacoes`
- `refactor/pesos-metricas`
- `docs/arquitetura-projeto`

### Processo de Commit

**Formato de Mensagem**: `tipo: descricao`

**Tipos**:
- `feat`: Novo recurso
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação/estilo
- `refactor`: Refatoração
- `test`: Testes
- `chore`: Manutenção

**Exemplos**:
- `feat: adicionar tabela dinâmica de metas`
- `fix: corrigir contagem de contribuições de organizações`
- `docs: atualizar README com novas funcionalidades`

### Validações Obrigatórias

**Antes de Submeter Alterações**:
1. ✅ Código formateado consistentemente
2. ✅ Sem console.log() em produção (use apenas para debug)
3. ✅ Comentários atualizados
4. ✅ Testes passando (se aplicável)
5. ✅ Documentação atualizada (README, CHANGELOG)
6. ✅ Nenhuma alteração em arquivos de build/config sem motivo

**Code Review Checklist**:
- [ ] Código segue padrões do projeto
- [ ] Lógica está clara e bem documentada
- [ ] Não há código duplicado
- [ ] Performance não foi degradada
- [ ] Segurança não foi comprometida
- [ ] Testes cobrem novas funcionalidades
- [ ] Documentação reflete as mudanças

## Fluxo de Contribuição

### 1. Fork e Clone
```bash
git clone https://github.com/seu-usuario/score.git
cd score
```

### 2. Criar Branch
```bash
git checkout -b feature/sua-funcionalidade
```

### 3. Fazer Alterações
- Siga os padrões de código
- Adicione testes se aplicável
- Atualize documentação

### 4. Commit
```bash
git add .
git commit -m "feat: adicionar sua funcionalidade"
```

### 5. Push e Pull Request
```bash
git push origin feature/sua-funcionalidade
```
- Abra PR no GitHub
- Descreva as mudanças
- Aguarde review

## Diretrizes Específicas

### API do GitHub
- Sempre usar headers de autenticação quando disponível
- Implementar fallbacks para rate limiting
- Tratar erros de API gracefulmente
- Não expor tokens em código público

### Performance
- Evitar requisições desnecessárias
- Usar cache quando possível
- Minimizar reflows e repaints
- Otimizar loops e operações pesadas

### Acessibilidade
- Usar tags semânticas
- Atributos alt em imagens
- Contraste adequado de cores
- Navegação por teclado

### Segurança
- Validar inputs do usuário
- Sanitizar dados de APIs externas
- Não expor informações sensíveis
- Usar HTTPS sempre

## Comunicação

### Issues
- Use templates para reportar bugs
- Forneça detalhes reproduzíveis
- Inclua screenshots quando aplicável
- Seja claro e conciso

### Pull Requests
- Descreva o problema e a solução
- Liste as alterações principais
- Referencie issues relacionadas
- Esteja aberto a feedback

### Discussões
- Seja respeitoso e construtivo
- Foque em fatos e código
- Aceite críticas profissionalmente
- Contribua com soluções

## Recursos

- [Documentação do GitHub](https://docs.github.com/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [JavaScript Style Guide](https://github.com/airbnb/javascript)
- [CSS Tricks](https://css-tricks.com/)

---

**PROPRIETÁRIO**: Mauricio Spark  
**MARCA**: Spark Mauricio  
**VERSÃO**: v1.0.0  
**LINHAGEM**: SPARK  
**COPYRIGHT**: © 2026 / Mauricio Spark. Todos os direitos reservados.
