// const { encode } = require('base-64');
// const { Buffer } = require('buffer');

import { encode } from 'base-64';
import { Buffer } from 'buffer';

export async function getSignature(ts) {

  let appId='061a30a7'
  let secret='MmQ2OWM5OTlhNGVlOTUwODc1MTRjZmQz'

  try {
    const auth = await md5(`${appId}${ts}`);
    return await hmacSHA1Encrypt(auth, secret);
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function hmacSHA1Encrypt(encryptText, encryptKey) {
  const encoder = new TextEncoder();
  const data = encoder.encode(encryptKey);
  const key = await crypto.subtle.importKey(
    'raw',
    data,
    { name: 'HMAC', hash: { name: 'SHA-1' } },
    false,
    ['sign']
  );

  const text = encoder.encode(encryptText);
  const signature = await crypto.subtle.sign('HMAC', key, text);
  return encode(new Uint8Array(signature));
}

function md5(cipherText) {
  return new Promise((resolve, reject) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(cipherText);
    crypto.subtle.digest('MD5', data)
      .then((hashBuffer) => {
        const hashArray = Array.from(new Uint8Array(hashBuffer)); // Convert buffer to byte array
        const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join(''); // Convert byte array to hex string
        resolve(hashHex);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Example usage:
(async () => {
  const signature = await getSignature(Date.now() / 1000);
  console.log('Signature:', signature);
})();