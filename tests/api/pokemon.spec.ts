import { test, expect } from '../../fixtures/secretFixture';
import { readExcel } from '../../utils/excel';

const data = readExcel('Datos-pruebas.xlsx');

data.forEach((row: any) => {
  ['id', 'name'].forEach((field) => {
    const value = row[field];
    
    test(`Pokémon por ${field.toUpperCase()}: ${value}`, async ({ request }) => {
      const startTime = Date.now();
      const res = await request.get(`https://pokeapi.co/api/v2/pokemon/${value}`);
      const duration = Date.now() - startTime;

      // Validaciones
      expect(res.status()).toBe(200);
      expect(duration, 'El tiempo de respuesta debe ser menor a 10 segundos').toBeLessThan(10000);
      
      const body = await res.json();
      expect(body.name).toBeDefined();

      console.log(`🕒 Fin del test (${field}: ${value}):`, new Date().toLocaleString());
    });
  });
});
