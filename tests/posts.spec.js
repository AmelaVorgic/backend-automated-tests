// tests/posts.spec.js
const { test, expect } = require('@playwright/test');
const { getPosts, createPost, updatePost, deletePost, getPostById, getPostsByUserId } = require('../object-models/postsAPI');

test.describe('JSONPlaceholder /posts API tests', () => {
  test('GET /posts should return a list of posts', async ({ request }) => {
    const response = await getPosts(request);
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);

    const firstPost = data[0];
    expect(firstPost).toHaveProperty('id');
    expect(firstPost).toHaveProperty('title');
    expect(firstPost).toHaveProperty('body');
    expect(firstPost).toHaveProperty('userId');
  });

  test('GET /posts should respond with JSON', async ({ request }) => {
    const response = await getPosts(request);
    expect(response.headers()['content-type']).toContain('application/json');
  });

  test('GET /posts/1 should return a single post with all expected properties', async ({ request }) => {
    const getAll = await getPosts(request);
    const allPosts = await getAll.json();
    const postId = allPosts[0].id;
    const response = await request.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    expect(response.ok()).toBeTruthy();
    const post = await response.json();
    expect(post).toHaveProperty('id', postId);
    expect(post).toHaveProperty('title');
    expect(post).toHaveProperty('body');
    expect(post).toHaveProperty('userId');
  });

  test('GET /posts/999999 should return 404 for non-existent post', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/999999');
    expect(response.status()).toBe(404);
  });

  test('GET /posts?userId=1 should return only posts by userId 1', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts?userId=1');
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data.length).toBeGreaterThan(0);
    data.forEach(post => expect(post.userId).toBe(1));
  });

  test('POST /posts should create a post', async ({ request }) => {
    const postData = {
      title: 'test title',
      body: 'test content',
      userId: 1
    };
    const response = await createPost(request, postData);
    expect(response.ok()).toBeTruthy();
    const result = await response.json();
    expect(result).toMatchObject(postData);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('title', 'test title');
    expect(result).toHaveProperty('body', 'test content');
  });

  test('POST /posts with missing title should still create post', async ({ request }) => {
    const postData = {
      body: 'body only',
      userId: 2
    };
    const response = await createPost(request, postData);
    expect(response.ok()).toBeTruthy();
    const result = await response.json();
    expect(result).toHaveProperty('body', 'body only');
    expect(result).toHaveProperty('userId', 2);
  });

  test('PUT /posts/1 should update a post', async ({ request }) => {
    const updateData = {
      id: 1,
      title: 'updated title',
      body: 'updated content',
      userId: 1
    };
    const response = await updatePost(request, 1, updateData);
    expect(response.ok()).toBeTruthy();
    const result = await response.json();
    expect(result).toMatchObject(updateData);
  });

  test('DELETE /posts/1 should return empty object', async ({ request }) => {
    const response = await deletePost(request, 1);
    expect(response.ok()).toBeTruthy();
    const result = await response.json();
    expect(result).toEqual({});
  });

  test('POST then DELETE should allow creation and deletion of a post', async ({ request }) => {
    const postData = { title: 'title', body: 'body', userId: 7 };
    const postResponse = await createPost(request, postData);
    expect(postResponse.ok()).toBeTruthy();
    const created = await postResponse.json();
    expect(created).toMatchObject(postData);
    expect(created).toHaveProperty('id');

    const deletedResponse = await deletePost(request, created.id);
    expect(deletedResponse.ok()).toBeTruthy();
    const deletedResult = await deletedResponse.json();
    expect(deletedResult).toEqual({});
  });
});