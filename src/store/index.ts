import { createPinia } from 'pinia';
import { storePlugin } from 'pinia-plugin-store';
import Utf8 from 'crypto-js/enc-utf8';
import Base64 from 'crypto-js/enc-base64';

import { STORE_KEY } from './auth';

const store = createPinia();

function encrypt(value: string): string {
  return Base64.stringify(Utf8.parse(value));
}

function decrypt(value: string): string {
  return Base64.parse(value).toString(Utf8);
}

const plugin = storePlugin({
  stores: [STORE_KEY],
  // use alone storage
  // stores: [{name:'theme_store',storage: localStorage}]
  storage: localStorage, // default storage
  encrypt,
  decrypt,
});

store.use(plugin);

export default store;
