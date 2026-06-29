# Changelog — SCORE (Linhagem SPARK)

Este documento mantém um registro cronológico e organizado de todas as evoluções e atualizações do sistema SCORE.

## [1.0.0] - 2026-06-22

### [Added]
- **Sistema de Auditoria de Perfil GitHub**: Lançamento inicial da plataforma
- **Cálculo de Rank por Percentil**: Implementação do algoritmo oficial de CDF (Cumulative Distribution Function) do GitHub
- **Tabela Dinâmica de Metas**:
  - Estado 1: Tabela informativa com todos os ranks (S++, S, A+, A, A-, B+, B, B-, C+, C)
  - Estado 2: Tabela personalizada com dados do usuário e próximos objetivos
- **Integração com API do GitHub**: 
  - Busca de perfil básico
  - Coleta de commits via Search API
  - Coleta de Pull Requests e Issues
  - Cálculo de estrelas com paginação completa
  - Busca de contribuições em organizações
- **Sistema de Pesos Dinâmicos**: 
  - Commits: peso 1 (reduzido por instabilidade da API)
  - PRs: peso 5 (aumentado por confiabilidade)
  - Estrelas: peso 6 (máximo por estabilidade)
  - Issues, Reviews, Followers: peso 1
- **Margem de Segurança**: Amortecimento de 15% para compensar falhas da API
- **Estabilidade da Nota**: Buffer de 5% para evitar variações pequenas
- **Interface Profissional**: 
  - Design dark mode com gradientes
  - Logo Spark Mauricio no cabeçalho
  - Layout responsivo para todos os dispositivos
- **Diagnóstico Personalizado**: Recomendações baseadas no perfil do usuário
- **Círculo de Progresso**: Visualização gráfica do rank alcançado

### [Changed]
- **Refatoração de Algoritmos**: Implementação de funções CDF exponencial e log-normal
- **Otimização de Requisições**: Paginação completa para busca de repositórios
- **Ajuste de Headers**: Uso de `application/vnd.github.cloak-preview+json` para commits
- **Melhoria na Busca de Contribuições**: Inclusão de parâmetro `affiliation=owner,collaborator,organization_member`

### [Fixed]
- **Correção de Contagem de Contribuições**: Inclui repositórios de organizações onde usuário é membro
- **Fix na Busca de Commits**: Header correto para Search API de commits
- **Correção de Fallback**: Estimativa baseada em repositórios públicos quando API falha
- **Ajuste na Contagem de PRs**: Filtro correto para evitar contagem de issues

### [Technical]
- **Arquitetura Client-Side First**: Sistema 100% client-side sem backend próprio
- **Privacidade de Dados**: Nenhuma persistência de informações sensíveis
- **Performance**: Cache inteligente e requisições otimizadas
- **Documentação Completa**: README, ABOUT, ARCHITECTURE, CONTRIBUTING, LICENSE

---

## Próximas Versões (Planejado)

### [1.1.0] - Planejado
- [Added] Sistema de histórico de avaliações
- [Added] Exportação de relatórios em PDF
- [Added] Modo comparativo entre perfis
- [Changed] Melhorias na interface de diagnóstico
- [Fixed] Otimizações de performance

### [2.0.0] - Planejado
- [Added] Aplicação mobile (React Native)
- [Added] Dashboard administrativo para organizações
- [Added] API pública para integrações de terceiros
- [Added] Sistema de badges e conquistas
- [Changed] Refatoração completa para suporte multi-plataforma

### [3.0.0] - Planejado
- [Added] Inteligência artificial para recomendações avançadas
- [Added] Análise de tendências de carreira
- [Added] Integração com GitLab e Bitbucket
- [Added] Comunidade e fórum de discussão
- [Changed] Arquitetura distribuída com backend opcional

---

**Convenções de Changelog**:
- **[Added]**: Novos recursos e funcionalidades
- **[Changed]**: Modificações em funcionalidades existentes
- **[Fixed]**: Correções de bugs
- **[Removed]**: Remoção de funcionalidades
- **[Deprecated]**: Funcionalidades marcadas para remoção futura
- **[Security]**: Atualizações de segurança

---

**PROPRIETÁRIO**: Mauricio Spark  
**MARCA**: Spark Mauricio  
**VERSÃO**: v1.0.0  
**LINHAGEM**: SPARK  
**COPYRIGHT**: © 2026 / Mauricio Spark. Todos os direitos reservados.
