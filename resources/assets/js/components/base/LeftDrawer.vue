<template>
<v-navigation-drawer
        app
        temporary
        disable-route-watcher
        v-model="drawers.left"
        >
    <v-list class="py-0 hidden-md-and-down" dense>
        <v-list-tile class="py-3 transparent">
            <v-list-tile-content>
                <v-list-tile-title>laravel-vuetify-starter</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
                <v-btn icon @click.native.stop="drawers.left = false">
                    <v-icon>chevron_left</v-icon>
                </v-btn>
            </v-list-tile-action>
        </v-list-tile>
    </v-list>
    <v-card class="elevation-0 hidden-lg-and-up">
        <v-card-media
                class="white--text"
                src="/images/bgcovers/materialbg.png"
        >
            <v-flex class="transparent">
                <v-list class="transparent white--text" dark>
                    <v-list-tile class="py-3 px-1 transparent">
                        <v-list-tile-content>
                            <v-list-tile-title>Logo</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-btn icon @click.native.stop="drawers.left = false">
                                <v-icon class="white--text">chevron_left</v-icon>
                            </v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                    <v-list-tile avatar>
                        <v-list-tile-avatar dark>
                            <v-icon x-large class="white--text">account_circle</v-icon>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title v-text="user ? user.name : ''"></v-list-tile-title>
                            <v-list-tile-sub-title v-text="user ? user.email : ''">
                            </v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-btn icon @click.native.stop="toggleUserMenu">
                                <v-icon class="white--text" v-text="dropIcon"></v-icon>
                            </v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>
            </v-flex>
        </v-card-media>
    </v-card>
        <v-list class="pt-0" dense v-show="!usermenu">
            <v-divider></v-divider>
            <v-list-tile v-for="(item, key) in items" :key="item.name" :to="item.path" :exact="true" v-show="item.meta.menu" @click.native.stop="drawers.left = false">
                <v-list-tile-action>
                    <v-icon>{{ item.meta.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    {{ $t(item.meta.title) }}
                </v-list-tile-content>
            </v-list-tile>
        </v-list>

        <v-container style="padding: 0; position: absolute; bottom: 0 !important;">
        <v-divider></v-divider>
        <v-list class="pt-0" dense>
            <v-list-tile v-for="(item, key) in items" :key="item.name" :to="item.path" :exact="true" v-show="item.meta.bottommenu" @click.native.stop="drawers.left = false">
                <v-list-tile-action>
                    <v-icon>{{ item.meta.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    {{ $t(item.meta.title) }}
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
        </v-container>



    <v-list class="pt-0" dense v-show="usermenu">
        <v-divider></v-divider>
        <v-list-tile v-for="(item, key) in items" :key="item.name" :to="item.path" :exact="true" v-show="item.meta.usermenu" @click.native.stop="drawers.left = false">
            <v-list-tile-action>
                <v-icon>{{ item.meta.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                {{ $t(item.meta.title) }}
            </v-list-tile-content>
        </v-list-tile>
        <logout-button mode="list"></logout-button>
    </v-list>
</v-navigation-drawer>
</template>
<script>
    import LogoutButton from './LogoutButton.vue';

    export default {
        components: {
            LogoutButton,
        },

        data() {
            return {
                mini: false,
                usermenu: false,
                dropIcon: 'arrow_drop_down'
            }
        },
        props: ['drawers','theme','user'],
        watch: {

        },
        methods: {
            toggleUserMenu() {
                this.usermenu = !this.usermenu;
                this.dropIcon = (this.usermenu) ? 'arrow_drop_down' : 'arrow_drop_up';
            },
            logout() {
                question('Are you sure want to quit?', "Yes", "Cancel", () => {
                    setTimeout( () => {
                        axios.post("/logout")
                            .catch(error => {
                                if(error.response.status === 401) {
                                    window.location.href='/';
                                }
                            });
                    },200);
                });
            },

        },
        computed: {
            items() {
                return this.$router.options.routes;
            }
        },
    }
</script>