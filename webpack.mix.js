let mix = require('laravel-mix');
mix
    .copyDirectory('resources/assets/images', 'public/images')
    .js('resources/assets/js/app.js', 'public/js')
    .extract([
        'vue',
        'vuex',
        'vuetify',
        'vue-router',
        'vuex-i18n',
        'vee-validate',
        'axios',
        'moment',

    ])
    .stylus('resources/assets/stylus/app.styl', 'public/css');


if (mix.inProduction()) {
    mix.version();
} else {
    mix.sourceMaps()
        .browserSync({
            proxy: 'http://laravuetify.lh',
            open: false
        });
}