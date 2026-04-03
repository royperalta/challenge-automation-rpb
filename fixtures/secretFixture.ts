import { test as base, expect } from '@playwright/test';
export { expect };

import { encryptSHA256 } from '../utils/crypto';

type MyFixtures = {
  secret: string;
};

export const test = base.extend<MyFixtures>({

  secret: [async ({ }, use) => {
    const env = process.env.ENV;
    const secret = env === 'QA' ? process.env.SECRET_QA : process.env.SECRET_CERT;

    if (!secret) {
      throw new Error(`❌ ¡Falta la clave secreta para el ambiente '${env || 'por defecto'}' en el archivo .env!`);
    }

    const encrypted = encryptSHA256(secret);
    console.log('🔐 Clave secreta encriptada:', encrypted);

    await use(encrypted);
  }, { auto: true }],
});
