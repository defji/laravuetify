/**
 *  app.js entry point.
 *  @author dfj;
 */

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(function(reg){
        }).catch(function(err) {
        console.log("service worker didn't registered:", err)
    });
}






import './bootstrap';
import { store } from './store';
import router from './routes';


/**
 *  locale settings
 */
import vuexI18n from 'vuex-i18n';
Vue.use(vuexI18n.plugin, store);
import locales from './vue-i18n-locales.generated';

_.keys(locales).forEach( key => {
    Vue.i18n.add(key, locales[key]);
});
Vue.i18n.set(document.documentElement.lang);
moment.locale(document.documentElement.lang);

router.beforeEach((to, from, next) => {
    let original_title = document.title;
    document.title = (window.user) ? Vue.i18n.translate(to.meta.title)+ ' | '+ original_title  : original_title;
    next();
});

Vue.component('app', require('./components/base/App.vue'));
Vue.component('login', require('./components/base/Login.vue'));
Vue.component('flash', require('./components/base/Flash.vue'));
Vue.component('question', require('./components/base/Confirm.vue'));
Vue.component('e404', require('./components/e404.vue'));
Vue.component('e503', require('./components/e503.vue'));
Vue.component('e500', require('./components/e500.vue'));
Vue.component('lostpass-email', require('./components/auth/LostpassEmail.vue'));
Vue.component('lostpass-reset', require('./components/auth/LostpassReset.vue'));
const EventBus = new Vue();
window.events = new Vue();

Object.defineProperties(Vue.prototype, {
    $bus: {
        get: function () {
            return EventBus
        }
    },
});



Vue.mixin({
    methods: {
        moment: window.moment
    }
});
const app = new Vue({
    el: '#app',
    store: store,
    router,
});

