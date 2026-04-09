import { calculateMetrics } from "../src/services/metrics.js";

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    console.error(`❌ ${message} | esperado: ${expected}, recebido: ${actual}`);
  } else {
    console.log(`✅ ${message}`);
  }
}

//Mock
const posts = [
  { id: 1, body: "abc" },
  { id: 2, body: "abcdef" },
  { id: 3, body: "abcdefghij" }
];

const commentsMap = {
  1: [{}, {}],
  2: [{}],
  3: [{}, {}, {}]
};

const result1 = calculateMetrics(posts, commentsMap, 0, 1);

assertEqual(result1.totalPosts, 3, "Total de posts");
assertEqual(Math.round(result1.avgChars), 6, "Média de caracteres");
assertEqual(Math.round(result1.avgComments), 2, "Média de comentários");
assertEqual(result1.status, "Ativo", "Status ativo");

const result2 = calculateMetrics(posts, commentsMap, 5, 1);

assertEqual(result2.totalPosts, 2, "Filtro de caracteres aplicado");

const result3 = calculateMetrics(posts, commentsMap, 0, 5);

assertEqual(result3.status, "Inativo", "Status inativo");

const result4 = calculateMetrics(posts, commentsMap, 50, 1);

assertEqual(result4.totalPosts, 0, "Sem posts após filtro");
assertEqual(result4.avgChars, 0, "Média de caracteres = 0");
assertEqual(result4.avgComments, 0, "Média de comentários = 0");

console.log("🏁 Testes finalizados");