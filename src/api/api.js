const BASE_URL = "https://jsonplaceholder.typicode.com";

export async function fetchUsers() {
  try {
    const response = await fetch(`${BASE_URL}/users`);
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return [];
  }
}

export async function fetchPostsByUser(userId) {
  try {
    const response = await fetch(`${BASE_URL}/posts?userId=${userId}`);
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
    return [];
  }
}

export async function fetchCommentsByPost(postId) {
  try {
    const response = await fetch(`${BASE_URL}/comments?postId=${postId}`);
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar comentários:", error);
    return [];
  }
}

export async function sendReport(data) {
  try {
    const response = await fetch(`${BASE_URL}/reports`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    });

    return await response.json();
  } catch (error) {
    console.error("Erro ao enviar relatório:", error);
  }
}