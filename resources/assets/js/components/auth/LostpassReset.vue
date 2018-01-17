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
                            {{ $t('auth.title_lostpass_reset_password') }}
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
                        <v-text-field
                                v-model="password"
                                prepend-icon="vpn_key"
                                type="password"
                                name="password"
                                :label="$t('profile.password')"
                                :error-messages="errors.collect('password')"
                                v-validate="'required|min:6|confirmed:password_confirmation'"
                                data-vv-name="password"
                                required
                        ></v-text-field>
                        <v-text-field
                                prepend-icon="vpn_key"
                                type="password"
                                name="password_confirmation"
                                v-model="password_confirmation"
                                :label="$t('profile.password_confirmation')"
                                :error-messages="errors.collect('password_confirmation')"
                                v-validate="'required|min:6'"
                                data-vv-name="password_confirmation"
                                required
                        ></v-text-field>

                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="submit">
                            {{ $t('buttons.set_password') }}
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
        props: ['token','version'],
        components: {
            'languageSelector' : require('./../base/LanguageSelector.vue')
        },
        data() {
            return {
               email: '',
               password: '',
               password_confirmation: ''
            }
        },
        methods: {
            submit () {
                this.$validator.validateAll().then((result) => {
                    console.log(result);
                    if (result) {
                        axios.post('/password/reset', {
                            email: this.email,
                            password: this.password,
                            password_confirmation: this.password_confirmation,
                            token: this.token

                        }).then( res => {
                            window.location = '/';
                        }).catch( err => {
                            this.errors.add('email', this.$t('password.user'));
                        });
                    }
                });
            },
        },
        mounted() {

        },
    }
</script>