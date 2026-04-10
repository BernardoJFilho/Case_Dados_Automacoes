import {
  fetchUsers,
  fetchPostsByUser,
  fetchCommentsByPost,
  sendReport
} from "./api/api.js";

import { calculateMetrics } from "./services/metrics.js";
import { renderResults } from "./ui/render.js";
import { debounce } from "./utils/debounce.js";
import { getCache, setCache } from "./utils/cache.js";

const userSelect = document.getElementById("userSelect");
const minCharsInput = document.getElementById("minChars");
const minPostsInput = document.getElementById("minPosts");
const resultsDiv = document.getElementById("results");
const generateBtn = document.getElementById("generateReport");

let users = [];
let posts = [];
let commentsMap = {};

document.addEventListener("DOMContentLoaded", init);

async function init() {
  try {
    users = await fetchUsers();
    populateUsers(users);
  } catch (error) {
    console.error("Erro ao carregar usuários:", error);
  }
}

function populateUsers(users) {
  users.forEach(user => {
    const option = document.createElement("option");
    option.value = user.id;
    option.textContent = user.name;
    userSelect.appendChild(option);
  });
}

userSelect.addEventListener("change", async (e) => {
  const userId = e.target.value;
  if (!userId) return;

  try {
    const cachedPosts = getCache(`posts_${userId}`);

    if (cachedPosts) {
      posts = cachedPosts;
    } else {
      posts = await fetchPostsByUser(userId);
      setCache(`posts_${userId}`, posts);
    }

    const promises = posts.map(post => {
      const cachedComments = getCache(`comments_${post.id}`);

      if (cachedComments) {
        return Promise.resolve(cachedComments);
      }

      return fetchCommentsByPost(post.id).then(data => {
        setCache(`comments_${post.id}`, data);
        return data;
      });
    });

    const allComments = await Promise.all(promises);

    commentsMap = {};
    posts.forEach((post, index) => {
      commentsMap[post.id] = allComments[index];
    });

    updateMetrics();

  } catch (error) {
    console.error("Erro ao carregar dados do usuário:", error);
  }
});

function updateMetrics() {
  console.log("updateMetrics");
  const metrics = calculateMetrics(
    posts,
    commentsMap,
    Number(minCharsInput.value) || 0,
    Number(minPostsInput.value) || 0
  );

  renderResults(resultsDiv, metrics);
}

const debouncedUpdate = debounce(updateMetrics, 300);

minCharsInput.addEventListener("input", debouncedUpdate);
minPostsInput.addEventListener("input", debouncedUpdate);

generateBtn.addEventListener("click", async () => {
  const selectedUser = users.find(u => u.id == userSelect.value);
  if (!selectedUser) return;

  const metrics = calculateMetrics(
    posts,
    commentsMap,
    Number(minCharsInput.value) || 0,
    Number(minPostsInput.value) || 0
  );

  const report = {
    id: selectedUser.id,
    nome: selectedUser.name,
    ...metrics
  };

  const csv = `
id,nome,posts,media_chars,media_comments,status
${report.id},${report.nome},${report.totalPosts},${report.avgChars},${report.avgComments},${report.status}
`;

  const blob = new Blob([csv], { type: "text/csv" });
  const link = document.createElement("a");

  link.href = URL.createObjectURL(blob);
  link.download = "relatorio.csv";
  link.click();

  try {
    await sendReport(report);
    console.log("Relatório enviado com sucesso");
  } catch (error) {
    console.error("Erro ao enviar relatório:", error);
  }
});