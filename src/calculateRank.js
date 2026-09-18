/*
  ============================================================================
  PROPRIETÁRIO: Mauricio Spark
  MARCA:        Spark Mauricio
  PROJETO:      Score
  VERSÃO:       v1.0.2
  LINHAGEM:     SPARK
  ============================================================================
  Documento de Planejamento de Escopo
  COPYRIGHT: © 2026 / Mauricio Spark. Todos os direitos reservados.
  ============================================================================
*/

const RANK_POINTS = {
  Commits: 1,
  ContributedToNotOwnerRepositories: 10,
  ContributedToOwnRepositories: 1,
  CreatedRepositories: 1,
  DirectStars: 3.5,
  Followers: 1,
  IndirectStars: 1,
  Issues: 1,
  PullRequests: 1,
  PullRequestsToAnotherRepositories: 5,
  CommitsToMyRepositories: 1,
  CommitsToAnotherRepositories: 10,
  ContributedTo: 1,
};

const RANK_DEGREE = [
  { Rank: "S++", Points: 300000 },
  { Rank: "S+", Points: 150000 },
  { Rank: "S", Points: 100000 },
  { Rank: "A+", Points: 50000 },
  { Rank: "A", Points: 20000 },
  { Rank: "A-", Points: 10000 },
  { Rank: "B+", Points: 5000 },
  { Rank: "B", Points: 2000 },
  { Rank: "B-", Points: 1000 },
  { Rank: "C+", Points: 500 },
  { Rank: "C", Points: 0 },
];

/**
 * Calculates the users rank based on points system.
 *
 * @param {object} params Parameters on which the user's rank depends.
 * @param {number} params.commits Number of commits.
 * @param {number} params.contributedToNotOwnerRepositories Number of repos contributed to not owned.
 * @param {number} params.contributedToOwnRepositories Number of repos contributed to owned.
 * @param {number} params.createdRepositories Number of created repositories.
 * @param {number} params.directStars Number of direct stars.
 * @param {number} params.followers Number of followers.
 * @param {number} params.indirectStars Number of indirect stars.
 * @param {number} params.issues Number of issues.
 * @param {number} params.pullRequests Number of pull requests.
 * @param {number} params.pullRequestsToAnotherRepositories Number of PRs to other repos.
 * @param {number} params.commitsToMyRepositories Number of commits to own repos.
 * @param {number} params.commitsToAnotherRepositories Number of commits to other repos.
 * @param {number} params.contributedTo Number of contributions.
 * @returns {{ level: string, points: number }} The users rank.
 */
function calculateRank({
  commits = 0,
  contributedToNotOwnerRepositories = 0,
  contributedToOwnRepositories = 0,
  createdRepositories = 0,
  directStars = 0,
  followers = 0,
  indirectStars = 0,
  issues = 0,
  pullRequests = 0,
  pullRequestsToAnotherRepositories = 0,
  commitsToMyRepositories = 0,
  commitsToAnotherRepositories = 0,
  contributedTo = 0,
}) {
  const totalPoints =
    commits * RANK_POINTS.Commits +
    contributedToNotOwnerRepositories *
      RANK_POINTS.ContributedToNotOwnerRepositories +
    contributedToOwnRepositories * RANK_POINTS.ContributedToOwnRepositories +
    createdRepositories * RANK_POINTS.CreatedRepositories +
    directStars * RANK_POINTS.DirectStars +
    followers * RANK_POINTS.Followers +
    indirectStars * RANK_POINTS.IndirectStars +
    issues * RANK_POINTS.Issues +
    pullRequests * RANK_POINTS.PullRequests +
    pullRequestsToAnotherRepositories *
      RANK_POINTS.PullRequestsToAnotherRepositories +
    commitsToMyRepositories * RANK_POINTS.CommitsToMyRepositories +
    commitsToAnotherRepositories * RANK_POINTS.CommitsToAnotherRepositories +
    contributedTo * RANK_POINTS.ContributedTo;

  // Find the highest rank that the user qualifies for
  let level = "C";
  for (const rank of RANK_DEGREE) {
    if (totalPoints >= rank.Points) {
      level = rank.Rank;
      break;
    }
  }

  return { level, points: totalPoints };
}

export { calculateRank };
export default calculateRank;
