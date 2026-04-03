import { test, expect } from '../../fixtures/secretFixture';

test('Prueba POST', async ({ request }) => {
  const res = await request.post(
    'https://jsonplaceholder.typicode.com/posts',
    {
      data: {
        title: 'test',
        body: 'test',
        userId: 1,
      },
    }
  );

  // Validaciones
  expect(res.status()).toBe(201);

  const body = await res.json();
  expect(body.id).toBeDefined();
  expect(body.title).toBe('test');
  expect(body.body).toBe('test');
  expect(body.userId).toBe(1);

  console.log('🕒 Fin del test:', new Date().toLocaleString());
});
