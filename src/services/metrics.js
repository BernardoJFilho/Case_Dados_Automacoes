export function calculateMetrics(posts, commentsMap, minChars, minPosts) {
  const filteredPosts = posts.filter(
    post => post.body.length >= minChars
  );

  const totalPosts = filteredPosts.length;

  const totalChars = filteredPosts.reduce(
    (acc, post) => acc + post.body.length,
    0
  );

  const totalComments = filteredPosts.reduce((acc, post) => {
    const comments = commentsMap[post.id] || [];
    return acc + comments.length;
  }, 0);

  const avgChars = totalPosts ? totalChars / totalPosts : 0;
  const avgComments = totalPosts ? totalComments / totalPosts : 0;

  const status = totalPosts >= minPosts ? "Ativo" : "Inativo";

  return {
    totalPosts,
    avgChars,
    avgComments,
    status
  };
}