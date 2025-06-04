const { BASE_URL } = require('./config');

async function getPosts(request) {
  return await request.get(`${BASE_URL}/posts`);
}

async function createPost(request, postData) {
  return await request.post(`${BASE_URL}/posts`, { data: postData });
}

async function updatePost(request, id, updateData) {
  return await request.put(`${BASE_URL}/posts/${id}`, { data: updateData });
}

async function deletePost(request, id) {
  return await request.delete(`${BASE_URL}/posts/${id}`);
}

async function getPostById(request, id) {
    return await request.get(`${BASE_URL}/posts/${id}`);
  }
  async function getPostsByUserId(request, userId) {
    return await request.get(`${BASE_URL}/posts?userId=${userId}`);
  }

module.exports = {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  getPostById, 
  getPostsByUserId
};