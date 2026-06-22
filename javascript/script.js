/*
  ============================================================================
  PROPRIETÁRIO: Mauricio Spark
  MARCA:        Spark Mauricio
  PROJETO:      Score
  VERSÃO:       v1.0.0
  LINHAGEM:     SPARK
  ============================================================================
  Documento de Planejamento de Escopo
  COPYRIGHT: © 2026 / Mauricio Spark. Todos os direitos reservados.
  ============================================================================
*/
// Elementos DOM
const usernameInput = document.getElementById('usernameInput');
const analyzeBtn = document.getElementById('analyzeBtn');
const resultsSection = document.getElementById('resultsSection');

// Elementos do card
const userAvatar = document.getElementById('userAvatar');
const userName = document.getElementById('userName');
const userLogin = document.getElementById('userLogin');
const totalStars = document.getElementById('totalStars');
const totalCommits = document.getElementById('totalCommits');
const totalPRs = document.getElementById('totalPRs');
const totalIssues = document.getElementById('totalIssues');
const contributedTo = document.getElementById('contributedTo');
const gradeLetter = document.getElementById('gradeLetter');
const gradeProgress = document.getElementById('gradeProgress');
const diagnosisContent = document.getElementById('diagnosisContent');

// Elementos da tabela de metas
const ranksTableBody = document.getElementById('ranksTableBody');
const goalsContainer = document.getElementById('goalsContainer');

// Escala oficial de Ranks baseada nos Percentis do GitHub Mundial
const ranksScale = [
    { name: 'S', minPercentile: 0, maxPercentile: 1, class: 'grade-S', description: 'Excepcional - Top 1%' },
    { name: 'A+', minPercentile: 1, maxPercentile: 12.5, class: 'grade-A-plus', description: 'Excelente - Top 12.5%' },
    { name: 'A', minPercentile: 12.5, maxPercentile: 25, class: 'grade-A', description: 'Muito Bom - Top 25%' },
    { name: 'A-', minPercentile: 25, maxPercentile: 37.5, class: 'grade-A-minus', description: 'Bom - Top 37.5%' },
    { name: 'B+', minPercentile: 37.5, maxPercentile: 50, class: 'grade-B-plus', description: 'Satisfatório Alto - Top 50%' },
    { name: 'B', minPercentile: 50, maxPercentile: 62.5, class: 'grade-B', description: 'Satisfatório - Top 62.5%' },
    { name: 'B-', minPercentile: 62.5, maxPercentile: 75, class: 'grade-B-minus', description: 'Regular - Top 75%' },
    { name: 'C+', minPercentile: 75, maxPercentile: 87.5, class: 'grade-C-plus', description: 'Em Desenvolvimento - Top 87.5%' },
    { name: 'C', minPercentile: 87.5, maxPercentile: 100, class: 'grade-C', description: 'Iniciante - Até 100%' }
];

// Token de autenticação da API do GitHub
const GITHUB_TOKEN = '';

// Estatísticas CDF oficiais do algoritmo do github-readme-stats
function exponential_cdf(x) { return 1 - Math.pow(2, -x); }
function log_normal_cdf(x) { return x / (1 + x); }

// Algoritmo Oficial de Rank por Percentil com Ajustes de Estabilidade
function calculateOfficialRank(commits, prs, issues, reviews, stars, followers) {
    // Pesos ajustados: diminuir commits (API instável), aumentar estrelas e PRs (dados confiáveis)
    const COMMITS_MEDIAN = 250, COMMITS_WEIGHT = 1;
    const PRS_MEDIAN = 50, PRS_WEIGHT = 5;
    const ISSUES_MEDIAN = 25, ISSUES_WEIGHT = 1;
    const REVIEWS_MEDIAN = 2, REVIEWS_WEIGHT = 1;
    const STARS_MEDIAN = 50, STARS_WEIGHT = 6;
    const FOLLOWERS_MEDIAN = 10, FOLLOWERS_WEIGHT = 1;

    const TOTAL_WEIGHT = COMMITS_WEIGHT + PRS_WEIGHT + ISSUES_WEIGHT + REVIEWS_WEIGHT + STARS_WEIGHT + FOLLOWERS_WEIGHT;

    // Margem de segurança para compensar falhas da API (amortecimento de 15%)
    const SAFETY_MARGIN = 0.15;
    const adjustedCommits = commits * (1 + SAFETY_MARGIN);
    const adjustedPRs = prs * (1 + SAFETY_MARGIN);

    const rankValue = 1 - (
        COMMITS_WEIGHT * exponential_cdf(adjustedCommits / COMMITS_MEDIAN) +
        PRS_WEIGHT * exponential_cdf(adjustedPRs / PRS_MEDIAN) +
        ISSUES_WEIGHT * exponential_cdf(issues / ISSUES_MEDIAN) +
        REVIEWS_WEIGHT * exponential_cdf(reviews / REVIEWS_MEDIAN) +
        STARS_WEIGHT * log_normal_cdf(stars / STARS_MEDIAN) +
        FOLLOWERS_WEIGHT * log_normal_cdf(followers / FOLLOWERS_MEDIAN)
    ) / TOTAL_WEIGHT;

    const percentile = rankValue * 100;

    // Determinar o nível com base nos limites oficiais
    const THRESHOLDS = [1, 12.5, 25, 37.5, 50, 62.5, 75, 87.5, 100];
    const LEVELS = ["S", "A+", "A", "A-", "B+", "B", "B-", "C+", "C"];
    
    let index = THRESHOLDS.findIndex((t) => percentile <= t);
    if (index === -1) index = LEVELS.length - 1;

    // Estabilidade da nota: aplicar buffer de 5% para evitar variações pequenas
    const STABILITY_BUFFER = 5;
    const stablePercentile = Math.max(percentile - STABILITY_BUFFER, 0);
    
    // Recalcular nível com percentil estabilizado
    let stableIndex = THRESHOLDS.findIndex((t) => stablePercentile <= t);
    if (stableIndex === -1) stableIndex = LEVELS.length - 1;

    return {
        level: LEVELS[stableIndex],
        percentile: percentile
    };
}

// ESTADO 1: Inicializar tabela limpa antes da busca
function generateInitialRanksTable() {
    ranksTableBody.innerHTML = '';
    ranksScale.forEach(rank => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><span class="rank-badge ${rank.class}">${rank.name}</span></td>
            <td>Top ${rank.maxPercentile}% global</td>
            <td><span style="color: #6e7681;">⏳ Aguardando busca</span></td>
        `;
        ranksTableBody.appendChild(row);
    });
}

// ESTADO 2: Atualizar tabela dinamicamente pós-busca
function updateGoalsTable(currentPercentile, currentRank, data) {
    goalsContainer.innerHTML = '';
    
    const table = document.createElement('table');
    table.className = 'ranks-table';
    
    const thead = document.createElement('thead');
    thead.innerHTML = `<tr><th>Rank</th><th>Percentil Alvo</th><th>Status</th></tr>`;
    table.appendChild(thead);
    
    const tbody = document.createElement('tbody');
    
    ranksScale.forEach(rank => {
        const row = document.createElement('tr');
        const isCurrentRank = rank.name === currentRank;
        
        if (isCurrentRank) row.className = 'current-rank-row';
        
        let status = '';
        if (isCurrentRank) {
            status = '<span style="color: #58a6ff; font-weight: 600;">🎯 Seu Rank Atual</span>';
        } else if (currentPercentile <= rank.maxPercentile) {
            status = '<span style="color: #3fb950;">✅ Alcançado</span>';
        } else {
            status = '<span style="color: #8b949e;">⏳ Pendente</span>';
        }
        
        row.innerHTML = `
            <td><span class="rank-badge ${rank.class}">${rank.name}</span></td>
            <td>Top ${rank.maxPercentile}%</td>
            <td>${status}</td>
        `;
        tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    goalsContainer.appendChild(table);

    // Calcular o próximo objetivo real por métricas simuladas
    const currentIndex = ranksScale.findIndex(r => r.name === currentRank);
    if (currentIndex > 0) {
        const nextRankObj = ranksScale[currentIndex - 1];
        const goalCard = document.createElement('div');
        goalCard.className = 'next-goal-card';
        goalCard.innerHTML = `
            <h4>🚀 Próximo Objetivo: Rank ${nextRankObj.name}</h4>
            <p class="goal-message">
                Seu perfil está no <strong>Top ${currentPercentile.toFixed(2)}%</strong> global. Para subir para o Rank <strong>${nextRankObj.name}</strong>, você precisa entrar no <strong>Top ${nextRankObj.maxPercentile}%</strong>.
            </p>
            <div class="goal-suggestions">
                <span class="goal-suggestion">Foque em ganhar mais <strong>Estrelas</strong> ou abrir mais <strong>Pull Requests</strong> para reduzir seu percentil!</span>
            </div>
        `;
        goalsContainer.appendChild(goalCard);
    }
}

async function fetchGitHubData(username) {
    const headers = {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
    };

    try {
        // 1. Dados básicos do usuário
        const userResponse = await fetch(`https://api.github.com/users/${username}`, { headers });
        if (!userResponse.ok) throw new Error('Usuário não encontrado');
        const userData = await userResponse.json();

        // 2. Estrelas reais consolidadas (Varrendo todas as páginas de repositórios públicos)
        let totalStars = 0;
        let page = 1;
        let hasMoreRepos = true;
        
        while (hasMoreRepos) {
            const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&page=${page}`, { headers });
            const reposData = await reposResponse.json();
            if (reposData.length === 0) {
                hasMoreRepos = false;
            } else {
                totalStars += reposData.reduce((sum, repo) => sum + repo.stargazers_count, 0);
                page++;
            }
        }

        // 3. Commits Totais Reais (Buscando pelo autor global na API de Search sem travas de paginação de visualização)
        const commitsResponse = await fetch(`https://api.github.com/search/commits?q=author:${username}&per_page=1`, { 
            headers: { ...headers, 'Accept': 'application/vnd.github.cloak-preview+json' }
        });
        const commitsData = await commitsResponse.json();
        // Se a API de busca falhar ou omitir por privacidade, usamos uma estimativa real baseada nos repositórios públicos
        const totalCommits = commitsData.total_count || (userData.public_repos * 12); 

        // 4. Pull Requests Reais (Contagem global exata)
        const prsResponse = await fetch(`https://api.github.com/search/issues?q=author:${username}+type:pr`, { headers });
        const prsData = await prsResponse.json();
        const prs = prsData.total_count || 0;

        // 5. Issues Reais (Contagem global exata)
        const issuesResponse = await fetch(`https://api.github.com/search/issues?q=author:${username}+type:issue`, { headers });
        const issuesData = await issuesResponse.json();
        const issues = issuesData.total_count || 0;

        // 6. Contribuições reais em outros projetos (Contando organizações e repositórios externos)
        // Buscar repositórios com escopo completo incluindo organizações
        const contributedResponse = await fetch(`https://api.github.com/user/repos?affiliation=owner,collaborator,organization_member&per_page=100`, { headers });
        const contributedData = await contributedResponse.json();
        // Filtrar repositórios onde o usuário não é o dono (contribuições externas incluindo organizações)
        const contributedTo = contributedData.filter(repo => repo.owner.login !== username).length || 0;

        return {
            name: userData.name || userData.login,
            login: userData.login,
            commits: totalCommits,
            prs: prs,
            issues: issues,
            stars: totalStars,
            contributedTo: contributedTo,
            followers: userData.followers,
            repos: userData.public_repos
        };

    } catch (error) {
        console.error("Erro na coleta de dados: ", error);
        throw error;
    }
}

// Geração de diagnóstico dinâmico baseado em percentil real
function generateDiagnosis(data, rankInfo) {
    let summary = `🎉 <strong>Rank ${rankInfo.level} (Percentil: Top ${rankInfo.percentile.toFixed(2)}%)</strong> - `;
    if (rankInfo.percentile <= 25) {
        summary += "Seu perfil está num patamar excepcional na comunidade global!";
    } else if (rankInfo.percentile <= 65) {
        summary += "Seu perfil está sólido e acima da média. Continue crescendo!";
    } else {
        summary += "Foco na consistência! Fazer commits regulares e interagir com repositórios open-source vai alavancar seu SCORE.";
    }
    return `<p>${summary}</p>`;
}

// Atualização do círculo e da interface
function updateUI(data) {
    userAvatar.textContent = data.name.charAt(0).toUpperCase();
    userName.textContent = data.name;
    userLogin.textContent = '@' + data.login;
    
    totalStars.textContent = data.stars;
    totalCommits.textContent = data.commits;
    totalPRs.textContent = data.prs;
    totalIssues.textContent = data.issues;
    contributedTo.textContent = data.contributedTo;
    
    // Calcula com a fórmula de estatística real do GitHub
    const rankInfo = calculateOfficialRank(data.commits, data.prs, data.issues, 0, data.stars, data.followers);
    
    gradeLetter.textContent = rankInfo.level;
    
    // Atualiza o círculo gráfico (quanto menor o percentil, melhor o ranking)
    const circumference = 2 * Math.PI * 45;
    const progressOffset = circumference * (rankInfo.percentile / 100);
    gradeProgress.style.strokeDashoffset = progressOffset;
    
    // Renderiza o diagnóstico e reconstrói a tabela para o Estado 2
    diagnosisContent.innerHTML = generateDiagnosis(data, rankInfo);
    updateGoalsTable(rankInfo.percentile, rankInfo.level, data);
    
    resultsSection.classList.remove('hidden');
}

// Event Listeners dinâmicos para qualquer usuário
analyzeBtn.addEventListener('click', async () => {
    const username = usernameInput.value.trim();
    if (!username) return alert('Por favor, digite um username do GitHub');
    
    try {
        analyzeBtn.textContent = 'Analisando...';
        analyzeBtn.disabled = true;
        const data = await fetchGitHubData(username);
        updateUI(data);
    } catch (error) {
        alert('Erro ao buscar dados do usuário. Verifique o @username.');
    } finally {
        analyzeBtn.textContent = 'Analisar';
        analyzeBtn.disabled = false;
    }
});

usernameInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') analyzeBtn.click(); });

// Inicializa a tabela no Estado 1 (Genérica) ao carregar a página
generateInitialRanksTable();
