import {
  fetchUsers,
  fetchPostsByUser,
  fetchCommentsByPost,
  sendReport
} from "./api/api.js";

const userSelect = document.getElementById("userSelect");
const minCharsInput = document.getElementById("minChars");
const minPostsInput = document.getElementById("minPosts");
const resultsDiv = document.getElementById("results");
const generateBtn = document.getElementById("generateReport");

let users = [];
let posts = [];
let commentsMap = {};
let metrics = {};

document.addEventListener("DOMContentLoaded", async () => {
  users = await fetchUsers();
  // console.log("Usuários da API:", users);
  // console.log("Quantidade no select:", userSelect.options.length);

  users.forEach(user => {
    const option = document.createElement("option");
    option.value = user.id;
    option.textContent = user.name;
    userSelect.appendChild(option);
  });
});

userSelect.addEventListener("change", async (e) => {
  const userId = e.target.value;
  if (!userId) return;

  
  posts = await fetchPostsByUser(userId);
  
  const promises = posts.map(post => fetchCommentsByPost(post.id));
  const allComments = await Promise.all(promises);
  
  commentsMap = {};
  posts.forEach((post, index) => {
    commentsMap[post.id] = allComments[index];
  });
  // console.log("User selecionado:", userId);

  // console.log("Posts:", posts);
  // console.log("CommentsMap:", commentsMap);
  calculateMetrics();
});

minCharsInput.addEventListener("input", calculateMetrics);
minPostsInput.addEventListener("input", calculateMetrics);

function calculateMetrics() {
  let minChars = Number(minCharsInput.value) || 0;
  let minPosts = Number(minPostsInput.value) || 0;

  let filteredPosts = posts.filter(p => p.body.length >= minChars);

  let totalPosts = filteredPosts.length;

  let totalChars = filteredPosts.reduce((acc, p) => acc + p.body.length, 0);

  let totalComments = filteredPosts.reduce((acc, p) => {
    return acc + (commentsMap[p.id]?.length || 0);
  }, 0);

  let avgChars = totalPosts ? totalChars / totalPosts : 0;
  let avgComments = totalPosts ? totalComments / totalPosts : 0;

  let status = totalPosts >= minPosts ? "Ativo" : "Inativo";

  metrics = {
    totalPosts,
    avgChars,
    avgComments,
    status
  };

  render();
}

function render() {
  resultsDiv.innerHTML = `
    <p>Total de posts: ${metrics.totalPosts}</p>
    <p>Média de caracteres: ${metrics.avgChars.toFixed(2)}</p>
    <p>Média de comentários: ${metrics.avgComments.toFixed(2)}</p>
    <p>Status: ${metrics.status}</p>
  `;
}

generateBtn.addEventListener("click", async () => {
  const selectedUser = users.find(u => u.id == userSelect.value);

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

  await sendReport(report);
});