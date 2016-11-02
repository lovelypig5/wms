import en from './en';
import zh from './zh';
import i18n from 'vue-i18n';

Vue.use(i18n, {
    lang: Vue.config.lang,
    locales: {
        en: en,
        zh: zh
    }
});

export default {};
