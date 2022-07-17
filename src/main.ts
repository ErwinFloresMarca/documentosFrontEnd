// i18n
import { createI18n } from 'vue-i18n';
import messages from '@intlify/vite-plugin-vue-i18n/messages';
import { DateTime } from 'luxon';

// vue router
import router from '@/router/index';
// pinia
import store from '@/store';
import App from './App.vue';

import 'virtual:windi.css';
// Devtools: https://windicss.org/integrations/vite.html#design-in-devtools
import 'virtual:windi-devtools';
import '@/assets/styles/index.scss';
import 'element-plus/theme-chalk/display.css';

import roles from '@/directives/roles';

const i18n = createI18n({
  locale: 'es',
  messages,
});

const app = createApp(App);

declare module 'vue' {
  interface ComponentCustomProperties {
    $luxonDateTime: typeof DateTime;
  }
}

app.directive('roles', roles);

app.config.globalProperties.$luxonDateTime = DateTime;

app.use(router).use(store);

app.use(i18n);

app.mount('#app');
