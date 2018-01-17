<template>
    <div>

        <v-btn v-show="mode=='button'" color="primary" dense @click.native.stop="logout">{{ $t('menus.logout') }}</v-btn>
        <v-list-tile v-show="mode=='list'" @click.native="logout">
            <v-list-tile-action>
                <v-icon>exit_to_app</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                {{ $t("menus.logout") }}
            </v-list-tile-content>
        </v-list-tile>
    </div>

</template>
<style>
</style>
<script>
    export default {
        props: ['mode'],
        methods: {
            logout() {
                question(this.$t('messages.quit_confirm'), this.$t('buttons.yes'), this.$t('buttons.cancel'), () => {
                    setTimeout(() => {
                        axios.post("/logout")
                            .catch(error => {
                                if (error.response.status === 401) {
                                    window.location.href = '/';
                                }
                            });
                    }, 200);
                });
            },
        }
    }
</script>