import VueRouter from 'vue-router';

let routes = [
    {
        path: '/',
        component: require('./components/home'),
        name: 'home',
        meta: {
            title: "Home",
            icon: "homer",
            menu: true,
        }
    },
];

export default new VueRouter({
    routes: routes,
    linkActiveClass: 'active'
})