import 'font-awesome/css/font-awesome.css';
import 'taggle/assets/css/taggle.css';
import 'select2/dist/css/select2.min.css';
import 'normalize.css/normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-theme.min.css';
import 'bootstrap';
import './less/main.less';
import App from './js/app.vue';
import Validator from './js/validator';
import Router from './js/router';
import i18n from './js/i18n';
import './js/filters';

if (process.env.NODE_ENV == "development") {
    Vue.config.debug = true;
}

Router.start(App, 'app');
Validator.init();