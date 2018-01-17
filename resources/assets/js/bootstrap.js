import 'babel-polyfill';
import lodash from 'lodash';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import axios from 'axios';
import moment from 'moment';
import VeeValidate from 'vee-validate';
import hu from 'vee-validate/dist/locale/hu';
import de from 'vee-validate/dist/locale/de';

window._ = lodash;
window.Vue = Vue;
window.axios = axios;
window.moment = moment;

Vue.use(Vuetify, {
    theme: {
    // "primary": "#C62828",
    // "accent": "#D84315",
    // "secondary": "#FF8F00",
    // "error": "#F44336",
    // "warning": "#ffeb3b",
    // "info": "#2196F3",
    // "success": "#4CAF50"
    }
});


Vue.use(VueRouter);
//Vue.use(Vuetify);
Vue.use(VeeValidate, {
    locale: document.documentElement.lang,
    dictionary: {
        hu: { messages: hu.messages, attributes: hu.attributes },
        de: { messages: de.messages, attributes: de.attributes }
    }
});




// try {
//     window.$ = window.jQuery = require('jquery');
// } catch (e) {}
//
//window.axios.defaults.headers.common['X-CSRF-TOKEN'] = window.Laravel.csrfToken;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

var token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}
