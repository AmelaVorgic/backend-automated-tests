const { test, expect } = require('@playwright/test');

test.describe('JSONPlaceholder API tests', () => {
  const BASE_URL = 'https://jsonplaceholder.typicode.com';

  test('GET /posts should return list of posts', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/posts`);
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

  test('POST /posts should create a post', async ({ request }) => {
    const postData = {
      title: 'test title',
      body: 'test content',
      userId: 1
    };
    const response = await request.post(`${BASE_URL}/posts`, { data: postData });
    expect(response.ok()).toBeTruthy();
    const result = await response.json();
    expect(result).toMatchObject(postData);
    expect(result).toHaveProperty('id');
  });
});