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
import { calculateRank } from "../../src/calculateRank.js";
import { it } from "@jest/globals";
import { runAndLogStats } from "./utils.js";

it("calculateRank - C (base)", async () => {
  await runAndLogStats("calculateRank - C (base)", () => {
    calculateRank({
      commits: 0,
      contributedToNotOwnerRepositories: 0,
      contributedToOwnRepositories: 0,
      createdRepositories: 0,
      directStars: 0,
      followers: 0,
      indirectStars: 0,
      issues: 0,
      pullRequests: 0,
      pullRequestsToAnotherRepositories: 0,
      commitsToMyRepositories: 0,
      commitsToAnotherRepositories: 0,
      contributedTo: 0,
    });
  });
});

it("calculateRank - Mauricio (dados reais)", async () => {
  await runAndLogStats("calculateRank - Mauricio (dados reais)", () => {
    const result = calculateRank({
      commits: 2,
      contributedToNotOwnerRepositories: 1,
      contributedToOwnRepositories: 1,
      createdRepositories: 1,
      directStars: 4,
      followers: 1,
      indirectStars: 1,
      issues: 1,
      pullRequests: 3,
      pullRequestsToAnotherRepositories: 1,
      commitsToMyRepositories: 2,
      commitsToAnotherRepositories: 2,
      contributedTo: 1,
    });
    console.log("Resultado:", result);
  });
});

it("calculateRank - C+ (baixo)", async () => {
  await runAndLogStats("calculateRank - C+ (baixo)", () => {
    calculateRank({
      commits: 100,
      contributedToNotOwnerRepositories: 10,
      contributedToOwnRepositories: 5,
      createdRepositories: 2,
      directStars: 50,
      followers: 10,
      indirectStars: 20,
      issues: 10,
      pullRequests: 20,
      pullRequestsToAnotherRepositories: 5,
      commitsToMyRepositories: 50,
      commitsToAnotherRepositories: 30,
      contributedTo: 5,
    });
  });
});

it("calculateRank - B- (médio-baixo)", async () => {
  await runAndLogStats("calculateRank - B- (médio-baixo)", () => {
    calculateRank({
      commits: 200,
      contributedToNotOwnerRepositories: 20,
      contributedToOwnRepositories: 10,
      createdRepositories: 4,
      directStars: 100,
      followers: 20,
      indirectStars: 40,
      issues: 20,
      pullRequests: 40,
      pullRequestsToAnotherRepositories: 10,
      commitsToMyRepositories: 100,
      commitsToAnotherRepositories: 60,
      contributedTo: 10,
    });
  });
});

it("calculateRank - B (médio)", async () => {
  await runAndLogStats("calculateRank - B (médio)", () => {
    calculateRank({
      commits: 500,
      contributedToNotOwnerRepositories: 50,
      contributedToOwnRepositories: 25,
      createdRepositories: 10,
      directStars: 250,
      followers: 50,
      indirectStars: 100,
      issues: 50,
      pullRequests: 100,
      pullRequestsToAnotherRepositories: 25,
      commitsToMyRepositories: 250,
      commitsToAnotherRepositories: 150,
      contributedTo: 25,
    });
  });
});

it("calculateRank - B+ (médio-alto)", async () => {
  await runAndLogStats("calculateRank - B+ (médio-alto)", () => {
    calculateRank({
      commits: 1000,
      contributedToNotOwnerRepositories: 100,
      contributedToOwnRepositories: 50,
      createdRepositories: 20,
      directStars: 500,
      followers: 100,
      indirectStars: 200,
      issues: 100,
      pullRequests: 200,
      pullRequestsToAnotherRepositories: 50,
      commitsToMyRepositories: 500,
      commitsToAnotherRepositories: 300,
      contributedTo: 50,
    });
  });
});

it("calculateRank - A- (alto)", async () => {
  await runAndLogStats("calculateRank - A- (alto)", () => {
    calculateRank({
      commits: 2000,
      contributedToNotOwnerRepositories: 200,
      contributedToOwnRepositories: 100,
      createdRepositories: 40,
      directStars: 1000,
      followers: 200,
      indirectStars: 400,
      issues: 200,
      pullRequests: 400,
      pullRequestsToAnotherRepositories: 100,
      commitsToMyRepositories: 1000,
      commitsToAnotherRepositories: 600,
      contributedTo: 100,
    });
  });
});

it("calculateRank - A (muito alto)", async () => {
  await runAndLogStats("calculateRank - A (muito alto)", () => {
    calculateRank({
      commits: 5000,
      contributedToNotOwnerRepositories: 500,
      contributedToOwnRepositories: 250,
      createdRepositories: 100,
      directStars: 2500,
      followers: 500,
      indirectStars: 1000,
      issues: 500,
      pullRequests: 1000,
      pullRequestsToAnotherRepositories: 250,
      commitsToMyRepositories: 2500,
      commitsToAnotherRepositories: 1500,
      contributedTo: 250,
    });
  });
});

it("calculateRank - A+ (elite)", async () => {
  await runAndLogStats("calculateRank - A+ (elite)", () => {
    calculateRank({
      commits: 10000,
      contributedToNotOwnerRepositories: 1000,
      contributedToOwnRepositories: 500,
      createdRepositories: 200,
      directStars: 5000,
      followers: 1000,
      indirectStars: 2000,
      issues: 1000,
      pullRequests: 2000,
      pullRequestsToAnotherRepositories: 500,
      commitsToMyRepositories: 5000,
      commitsToAnotherRepositories: 3000,
      contributedTo: 500,
    });
  });
});

it("calculateRank - S (máximo)", async () => {
  await runAndLogStats("calculateRank - S (máximo)", () => {
    calculateRank({
      commits: 20000,
      contributedToNotOwnerRepositories: 2000,
      contributedToOwnRepositories: 1000,
      createdRepositories: 400,
      directStars: 10000,
      followers: 2000,
      indirectStars: 4000,
      issues: 2000,
      pullRequests: 4000,
      pullRequestsToAnotherRepositories: 1000,
      commitsToMyRepositories: 10000,
      commitsToAnotherRepositories: 6000,
      contributedTo: 1000,
    });
  });
});

it("calculateRank - S+ (Elite Superior)", async () => {
  await runAndLogStats("calculateRank - S+ (Elite Superior)", () => {
    calculateRank({
      commits: 30000,
      contributedToNotOwnerRepositories: 3000,
      contributedToOwnRepositories: 1500,
      createdRepositories: 600,
      directStars: 15000,
      followers: 3000,
      indirectStars: 6000,
      issues: 3000,
      pullRequests: 6000,
      pullRequestsToAnotherRepositories: 1500,
      commitsToMyRepositories: 15000,
      commitsToAnotherRepositories: 9000,
      contributedTo: 1500,
    });
  });
});

it("calculateRank - S++ (Elite Máxima)", async () => {
  await runAndLogStats("calculateRank - S++ (Elite Máxima)", () => {
    calculateRank({
      commits: 50000,
      contributedToNotOwnerRepositories: 5000,
      contributedToOwnRepositories: 2500,
      createdRepositories: 1000,
      directStars: 25000,
      followers: 5000,
      indirectStars: 10000,
      issues: 5000,
      pullRequests: 10000,
      pullRequestsToAnotherRepositories: 2500,
      commitsToMyRepositories: 25000,
      commitsToAnotherRepositories: 15000,
      contributedTo: 2500,
    });
  });
});
