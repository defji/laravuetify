<template>
<v-app toolbar>
        <v-layout fill-height row align-center justify-center class="loginbg" style="background-image: url('/images/bgcovers/materialbg.png')">
            <v-toolbar fixed class="transparent elevation-0 ">
                <h1 class="white--text">laravel-vuetify-starter</h1>
                <v-spacer></v-spacer>
                <language-selector></language-selector>
            </v-toolbar>

            <v-flex xs12 sm6>
                <form>
                    <v-card  elevation-12 xs12 md12 fill-height >
                        <v-card-title primary-title class="headline">
                            {{ $t('auth.title_lostpass_email_password') }}
                        </v-card-title>
                    <v-card-text>
                        <v-text-field
                                v-model="email"
                                prepend-icon="email"
                                :label="$t('profile.email')"
                                :error-messages="errors.collect('email')"
                                v-validate="'required|email'"
                                data-vv-name="email"
                                required
                        ></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="submit" :loading="loading">
                            {{ $t('buttons.reset_password') }}
                        </v-btn>
                    </v-card-actions>
                </v-card>
                </form>
            </v-flex>
        </v-layout>
        <div class="version"> {{ version }}</div>
</v-app>
</template>
<style>
</style>
<script>
    export default {
        $validates: true,
        components: {
            'languageSelector' : require('./../base/LanguageSelector.vue')
        },
        props: ['version'],
        data() {
            return {
               loading: false,
               email: ''
            }
        },
        methods: {
            submit () {
                this.$validator.validateAll().then((result) => {
                    this.loading = true;
                    if (result) {
                        axios.post('/password/email', { email: this.email }).then( res => {
                            flash(this.$t('password.sent'));
                            this.loading = false;
                        }).catch( err => {
                            this.errors.add('email', this.$t('password.user'));
                            this.loading = false;
                        });
                    }
                });
            },
        },
        mounted() {
        },
    }
</script>