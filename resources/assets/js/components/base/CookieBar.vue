<template>
    <v-bottom-sheet v-model="opened" persistent>
        <v-card>
                <v-card-actions class="px-3">
                    {{ $t('cookies.cookiebar_text') }}
                    <router-link to="help">{{ $t('cookies.learn_more') }}</router-link>
                    <v-spacer></v-spacer>
                   <v-btn color="primary" @click.native="accept">{{ $t('cookies.accept') }}</v-btn>
                </v-card-actions>
        </v-card>
    </v-bottom-sheet>
</template>
<script>
    export default {
        data() {
            return {
                opened: false
            }
        },
        methods: {
            accept() {
                this.opened = false;
                localStorage.setItem('cookies-accepted',true);
            }
        },
        mounted() {
            this.opened = (localStorage.getItem('cookies-accepted')) ? false : true;
        }
    }
</script>