import { test, expect } from '../../fixtures/secretFixture';
import { readExcel } from '../../utils/excel';
import fs from 'fs';

const data = readExcel('Datos-pruebas.xlsx');

data.forEach((row: any) => {
  test(`Wiki ${row.name}`, async ({ page }) => {
    await page.goto(`https://en.wikipedia.org/wiki/${row.name}`);

    // 4. Validar título de la página
    await expect(page).toHaveTitle(new RegExp(row.name, 'i'));

    const imgLocator = page.locator('.infobox img').first();
    const src = await imgLocator.getAttribute('src');
    expect(src, 'Se debe encontrar la URL de la imagen').not.toBeNull();


    // 5. Loguear quién realizó el dibujo
    const captionLocator = page.locator('.infobox-caption');
    const captionText = await captionLocator.innerText();
    console.log(`El Artista (${row.name}):`, captionText);

    // 6. Descargar la imagen y guardarla
    const response = await page.request.get(`https:${src}`);
    expect(response.ok()).toBeTruthy(); // Validación de que la descarga fue correcta

    const buffer = await response.body();
    fs.mkdirSync('images', { recursive: true });
    fs.writeFileSync(`images/${row.name}.jpg`, buffer);

    // a. Valide el tamaño del archivo < 500000 bytes
    expect(buffer.length, 'El tamaño de la imagen debe ser menor a 500KB').toBeLessThan(500000);

    // 7. Loguear fecha y hora de finalización
    console.log(`🕒 Fin del test (${row.name}):`, new Date().toLocaleString());
  });
});
