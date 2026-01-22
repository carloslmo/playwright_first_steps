import { test, expect } from '@playwright/test';

const secciones = [
  { nombre: 'Cursos', url: '/cursos', tituloEsperado: 'Cursos' },
  { nombre: 'Udemy', url: '/udemy', tituloEsperado: 'Udemy' },
  { nombre: 'Recursos', url: '/recursos', tituloEsperado: 'Recursos' },
  { nombre: 'Blog', url: '/login', tituloEsperado: 'Acceder a Free Range Testers' }
];

test.describe('Navegación en www.freerangetesters.com', () => {

  for (const seccion of secciones) {

    test(`Validar redirección a la sección "${seccion.nombre}"`, async ({ page }) => {

      test.info().annotations.push({
        type: 'User story 23333',
        description: 'Una descripción de las anotaciones para los reportes de Playwright.'
      });

      await test.step('Estando yo en la web principal', async () => {
        await page.goto('https://www.freerangetesters.com');
        await expect(page).toHaveTitle('Free Range Testers');
      });

      await test.step(`Cuando hago click en "${seccion.nombre}"`, async () => {
        await page
          .locator('#page_header')
          .getByRole('link', { name: seccion.nombre, exact: true })
          .click();

        await page.waitForURL(`**${seccion.url}`);
      });

      await test.step(
        `Soy redirigido a la sección con título "${seccion.tituloEsperado}"`,
        async () => {
          await expect(page).toHaveTitle(seccion.tituloEsperado);
        }
      );

    });
  }

  test('Puedo seleccionar y deseleccionar un checkbox en el @Sandbox', async ({ page }) => {
    await test.step('Estando yo en la web principal', async () => {
      await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
      await expect(page).toHaveTitle('Automation Sandbox');
    });

    await test.step('Puedo seleccionar el checkbox para Pasta', async () => {

      await page.getByRole('checkbox', { name: 'Pasta 🍝' }).check();
      await expect(page.getByRole('checkbox', { name: 'Pasta 🍝' }), 'El checkbox estaba seleccionado').toBeChecked();

    });

    await test.step('Puedo deseleccionar el checkbox para Pasta', async () => {
      await page.getByRole('checkbox', { name: 'Pasta 🍝' }).uncheck();
      await expect(page.getByRole('checkbox', { name: 'Pasta 🍝' }), 'El checkbox no estaba seleccionado').not.toBeChecked();

    });

  })

  test('Click en Boton ID Dinamico', async ({ page }) => {
    await test.step('Estando yo en la web principal', async () => {
      await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
      await expect(page).toHaveTitle('Automation Sandbox');
    });

    await test.step('Puedo hacer click en el boton con ID Dinamico', async () => {

      const botonIDDinamico = page.getByRole('button', { name: 'Hacé click para generar un ID' });

      await botonIDDinamico.click({ force: true });
      await expect(page.getByText('OMG, aparezco después de 3')).toBeVisible();
    });

  })

  test('Lleno un campo de texto en Automation @Sandbox', async ({ page }) => {
    await test.step('Estando yo en la web principal', async () => {
      await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
      await expect(page).toHaveTitle('Automation Sandbox');
    });

    await test.step('Puedo ingresar texto ene l campo Un Aburrido Texto', async () => {

      await page.getByRole('textbox', { name: 'Un aburrido texto' }).fill('Prueba de texto')
    });

  })

  test('Los items del dropdown son los esperados', async ({ page }) => {
    await test.step('Estando yo en la web principal', async () => {
      await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
      await expect(page).toHaveTitle('Automation Sandbox');
    });

    await test.step('Valido que la lista del dropdown contiene los deportes esperados', async () => {

      const deportes = ['Fútbol', 'Tennis', 'Basketball']
      for (let opcion of deportes) {
        const element = await page.$(`select#formBasicSelect > option:is(:text("${opcion}"))`);
        if (element) {
          console.log(`La opcion '${opcion}' esta presente`);
        } else {
          throw new Error(`La opcion '${opcion}' no esta presente.`)
        }
      }

    });

  })

  test('Valida la columna Nombres de la tabla estatica', async ({ page }) => {
    await test.step('Estando yo en la web principal', async () => {
      await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
      await expect(page).toHaveTitle('Automation Sandbox');
    });

    await test.step('Puedo validar los elementos para la columna Nombre de la tabla estatica', async () => {
      const valoresColumnaNombres = await page.$$eval('h2:has-text("Tabla estática") + table tbody tr td:nth-child(2)', elements => elements.map(element => element.textContent));
      const nombresEsperados = ['Messi', 'Ronaldo', 'Mbappe'];
      await test.info().attach('screenshot', {
        body: await page.screenshot(),
        contentType: 'image/png',
      })
      expect(valoresColumnaNombres).toEqual(nombresEsperados);
    });

  })

  test('Valido que todos los valores cambian en la tabla dinamica luego de un reload', async ({ page }) => {
    await test.step('Estando yo en la web principal', async () => {
      await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
      await expect(page).toHaveTitle('Automation Sandbox');
    });

    await test.step('Valido que todos los valores cambian en la tabla dinamica luego de un reload', async () => {
      const valoresTablaDinamica = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', elements => elements.map(element => element.textContent));
      console.log(valoresTablaDinamica);
      await test.info().attach('screenshot', {
        body: await page.screenshot(),
        contentType: 'image/png',
      })

      await page.reload();
      const valoresPostReload = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', elements => elements.map(element => element.textContent));
      console.log(valoresPostReload);
      await test.info().attach('screenshot', {
        body: await page.screenshot(),
        contentType: 'image/png',
      })

      expect(valoresTablaDinamica).not.toEqual(valoresPostReload);
    });

  })

  test('Validando dentro de un popup', async ({ page }) => {
    await test.step('Estando yo en la web principal', async () => {
      await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
      await expect(page).toHaveTitle('Automation Sandbox');
    });

    await test.step('Validando dentro de un popup', async () => {

      await page.getByRole('button', { name: 'Mostrar popup' }).click();
    });

    await test.step('Puedo validar un elemento dentro del popup', async () => {

      await expect(page.getByText('¿Viste? ¡Apareció un Pop-up!')).toHaveText('¿Viste? ¡Apareció un Pop-up!');
      await page.getByRole('button', { name: 'Cerrar' }).click();
    });

  })

  test('Validando un radio button', async ({ page }) => {
    await test.step('Estando yo en la web principal', async () => {
      await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
      await expect(page).toHaveTitle('Automation Sandbox');
    });

    await test.step('Validando un radio button', async () => {
      await page.getByRole('radio', { name: 'Si' }).check();
      await page.getByRole('radio', { name: 'No' }).check();
    });

  })

});