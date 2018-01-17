<template>
    <v-app :dark="theme.dark">
        <left-drawer :drawers="drawers" :theme="theme" :user="currentUser"></left-drawer>
        <main-toolbar :title="title" :drawers="drawers" :user="currentUser"></main-toolbar>
        <main>
            <v-content>
                    <v-slide-x-transition mode="out-in">
                        <router-view></router-view>
                    </v-slide-x-transition>
            </v-content>
        </main>
        <v-footer fixed class="hidden-sm-and-down">
            <v-layout row>
                <v-flex xs6 class="px-2">laravel-vuetify-starter</v-flex>
                <v-flex xs6 text-xs-right class="px-2"> &copy; 2017-{{ moment().year() }} </v-flex>
            </v-layout>
        </v-footer>
    </v-app>
</template>
<script>

    import MainToolbar from './MainToolbar.vue';
    import LeftDrawer from './LeftDrawer.vue';

    export default {
        components: {
            'left-drawer': LeftDrawer,
            'main-toolbar' : MainToolbar,
        },
        data () {
            return {
                currentUser: null,
                drawers: {
                    left: false,
                    right: false,
                },
                footer: {
                    fixed: true
                },
                title: '',
            }
        },
        computed: {
            theme() {
                return {
                    dark: this.$store.getters.nightmode
                }
            }

        },
        methods: {
            setTitle () {
                if (typeof this.$route.meta.title === 'string') {
                    console.log(this.$route.meta.title);
                    this.title = this.$route.meta.title
                }
            },
        },
        watch: {
            '$route' () {
                this.setTitle()
            }
        },
        mounted() {
            window.events.$on('set-theme-to-dark', data => {
                console.log(data);
               this.theme.dark = data.dark;
            });

            this.setTitle();
            let routes = this.$router.options.routes;
            this.currentUser = window.user;
        }
    }
</script>
