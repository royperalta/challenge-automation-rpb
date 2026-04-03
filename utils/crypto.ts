import crypto from 'crypto';

export function encryptSHA256(text: string): string {
  return crypto.createHash('sha256').update(text).digest('hex');
}
