import { test, expect } from '@playwright/test';
import dotenv from "dotenv"
dotenv.config();

const PATH_URL = process.env.BASE_URL_API_GITHUB;
const AUTH = `Bearer ` + process.env.API_TOKEN + ``;
const REPO = 'playwright_first_steps';
const USER = 'carloslmo';

/*
*** Esto es para ejecutar antes de iniciar el test seleccionado, que en este caso se crea un repositorio.
***
const REPO2 = 'UDEMY_CLASS_DEMO';

test.beforeAll(async ({ request }) => {
  const response = await request.post(`` + PATH_URL + `/user/repos`, {
    data: {
      name: REPO2
    }
  });
  expect(response.ok()).toBeTruthy();
})
*/

test('Se puede crear un Issue en el repositorio de GitHub', async ({ request }) => {

  const newIssue = await request.post(`` + PATH_URL + `/repos/${USER}/${REPO}/issues`, {
    data: {
      title: '[Bug] Reporte 1',
      body: 'Descripcion del bug',
    },
    headers: {
      Authorization: AUTH,
      Accept: 'application/vnd.github+json'
    },
  });
  console.log(newIssue);
  expect(newIssue.status()).toBe(201);

  const issues = await request.get(`` + PATH_URL + `/repos/${USER}/${REPO}/issues`);
  expect(issues.ok()).toBeTruthy();
  expect(await issues.json()).toContainEqual(expect.objectContaining({
    title: '[Bug] Reporte 1',
    body: 'Descripcion del bug',
  }))

  console.log('STATUS:', issues.status());
  console.log('HEADERS:', issues.headers());
  console.log('BODY:', await issues.json());

});

/*
*** 
*** Esto se usa para borrar el repositorio despues de la ejecucion.
***
test.afterAll(async ({ request }) => {
  const response = await request.delete(`` + PATH_URL + `/repos/${USER}/${REPO}`);
  expect(response.ok()).toBeTruthy();
})
*/