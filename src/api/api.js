const BASE_URL = "https://jsonplaceholder.typicode.com";

export async function fetchUsers() {
  const response = await fetch(`${BASE_URL}/users`);
  return response.json();
}

export async function fetchPostsByUser(userId) {
  const response = await fetch(`${BASE_URL}/posts?userId=${userId}`);
  return response.json();
}

export async function fetchCommentsByPost(postId) {
  const response = await fetch(`${BASE_URL}/comments?postId=${postId}`);
  return response.json();
}

export async function sendReport(data) {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return response.json();
}