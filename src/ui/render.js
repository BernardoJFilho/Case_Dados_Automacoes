export function renderResults(element, metrics) {
  element.innerHTML = `
    <p>Total de posts: ${metrics.totalPosts}</p>
    <p>Média de caracteres: ${metrics.avgChars.toFixed(2)}</p>
    <p>Média de comentários: ${metrics.avgComments.toFixed(2)}</p>
    <p>Status: ${metrics.status}</p>
  `;
}