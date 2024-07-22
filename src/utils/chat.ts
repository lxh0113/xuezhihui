import { getSignature } from './ai.js'

(async () => {
    const signature = await getSignature(Date.now() / 1000);
    console.log('Signature:', signature);
  })();
