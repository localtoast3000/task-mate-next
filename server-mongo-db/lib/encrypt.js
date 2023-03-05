import crypto from 'crypto';

const iv = crypto.randomBytes(16);

export function encrypt(data) {
  if (typeof data !== 'string') {
    data = JSON.stringify(data);
  }
  const encryptalgo = crypto.createCipheriv(
    process.env.ENCRYPTION_ALGO,
    process.env.CYPHER_KEY,
    iv
  );
  let encrypted = encryptalgo.update(data, 'utf8', 'hex');
  encrypted += encryptalgo.final('hex');
  return encrypted;
}

export function decrypt(encrypted) {
  const decryptalgo = crypto.createDecipheriv(
    process.env.ENCRYPTION_ALGO,
    process.env.CYPHER_KEY,
    iv
  );
  let decrypted = decryptalgo.update(encrypted, 'utf8', 'hex');
  decrypted += decryptalgo.final('utf8');
  return decrypted;
}
