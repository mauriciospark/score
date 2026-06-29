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
import { calculateRank } from "../../src/calculateRank.js";
import { it } from "@jest/globals";
import { runAndLogStats } from "./utils.js";

it("calculateRank - C (mais baixa)", async () => {
  await runAndLogStats("calculateRank - C (mais baixa)", () => {
    calculateRank({
      all_commits: false,
      commits: 10,
      prs: 5,
      issues: 2,
      reviews: 0,
      repos: 1,
      stars: 0,
      followers: 1,
    });
  });
});

it("calculateRank - B-", async () => {
  await runAndLogStats("calculateRank - B-", () => {
    calculateRank({
      all_commits: false,
      commits: 100,
      prs: 30,
      issues: 15,
      reviews: 5,
      repos: 5,
      stars: 20,
      followers: 10,
    });
  });
});

it("calculateRank - B", async () => {
  await runAndLogStats("calculateRank - B", () => {
    calculateRank({
      all_commits: false,
      commits: 200,
      prs: 50,
      issues: 25,
      reviews: 10,
      repos: 10,
      stars: 50,
      followers: 20,
    });
  });
});

it("calculateRank - A", async () => {
  await runAndLogStats("calculateRank - A", () => {
    calculateRank({
      all_commits: false,
      commits: 500,
      prs: 100,
      issues: 50,
      reviews: 20,
      repos: 20,
      stars: 200,
      followers: 50,
    });
  });
});

it("calculateRank - A+", async () => {
  await runAndLogStats("calculateRank - A+", () => {
    calculateRank({
      all_commits: false,
      commits: 1000,
      prs: 200,
      issues: 100,
      reviews: 50,
      repos: 30,
      stars: 500,
      followers: 100,
    });
  });
});

it("calculateRank - S (Elite)", async () => {
  await runAndLogStats("calculateRank - S (Elite)", () => {
    calculateRank({
      all_commits: false,
      commits: 5000,
      prs: 1000,
      issues: 500,
      reviews: 200,
      repos: 100,
      stars: 10000,
      followers: 1000,
    });
  });
});

it("calculateRank - S++ (Elite Máxima - mais alta)", async () => {
  await runAndLogStats("calculateRank - S++ (Elite Máxima - mais alta)", () => {
    calculateRank({
      all_commits: false,
      commits: 20000,
      prs: 5000,
      issues: 2000,
      reviews: 1000,
      repos: 500,
      stars: 100000,
      followers: 10000,
    });
  });
});
