<template>
    <v-toolbar fixed color="primary" dark app>
        <v-toolbar-side-icon class="" @click.stop="toggleDrawer('left')"></v-toolbar-side-icon>
        <v-slide-x-transition mode="out-in">
        <v-flex fill-width :key="title">
                <v-toolbar-title>{{ $t(title) }}</v-toolbar-title>
        </v-flex>
        </v-slide-x-transition>

        <v-spacer></v-spacer>

        <v-menu :offset-y="true" :left="true" :position-y="120" :bottom="true" class="hidden-md-and-down">
            <v-btn icon slot="activator">
                <v-icon>account_circle</v-icon>
            </v-btn>
                <v-list>
                    <v-list-tile avatar>
                        <v-list-tile-avatar>
                            <v-icon x-large>account_circle</v-icon>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title v-text="user ? user.name : ''"></v-list-tile-title>
                            <v-list-tile-sub-title v-text="user ? user.email : ''"></v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                        <logout-button mode="button"></logout-button>
                    </v-list-tile>
                </v-list>
        </v-menu>
    </v-toolbar>
</template>
<script>
    import LogoutButton from './LogoutButton.vue';
    export default {
        components: {
            LogoutButton,
        },
        data() {
          return {
              logoutDialog: false,
          }
        },
        computed: {
            selectedVehiclesCount() {
                return this.$store.getters.selected_plates.length;
            }
        },
        props: ['title','drawers','user'],
        methods: {
            logout() {
                question(this.$t('messages.quit_confirm'), this.$t('buttons.yes'), this.$t('buttons.cancel'), () => {
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
            toggleDrawer(which) {
                this.drawers[which] = !this.drawers[which];
                setTimeout(() => {
                    window.events.$emit('resize');
                    window.events.$emit('drawers-changed', this.drawers);
                },201);
            },
        }
    }
</script>