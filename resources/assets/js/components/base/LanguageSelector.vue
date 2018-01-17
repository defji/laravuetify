<template>
    <v-tooltip left>
    <v-menu offset-y :left="true" slot="activator">
        <v-btn primary dark slot="activator" icon>
            <v-icon>language</v-icon>
        </v-btn>
        <v-list>
            <v-list-tile v-for="(lang, key) in langs" :key="key" @click="setLang(key)" avatar>
                    <v-list-tile-title>{{ lang }}</v-list-tile-title>
            </v-list-tile>
        </v-list>
    </v-menu>
        <span>
            {{ $t('login.select_lang') }}
        </span>
    </v-tooltip>
</template>
<script>
    export default {
        data() {
            return {
                langs: window.locales
            }
        },
        methods: {
            setLang(key) {
                axios.get('/locale/'+key).then( resp => {
                    Vue.i18n.set(key);
                    Validator.localize(key);
                });
            }
        },
    }
</script>