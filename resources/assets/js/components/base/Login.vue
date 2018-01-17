<template>
    <v-app toolbar>
        <v-layout fill-height row align-center justify-center class="loginbg" :style="bgimg">
            <v-toolbar fixed class="transparent elevation-0 ">
                <h1 class="white--text">laravel-vuetify-starter</h1>
                <v-spacer></v-spacer>
                <language-selector></language-selector>
            </v-toolbar>
                <form>
                <v-card  elevation-12 xs12 md12 fill-height class="loginCard">
                    <v-card-title primary-title class="headline">
                        {{ $t('login.login') }}
                    </v-card-title>
                    <v-card-text>
                        <v-container fluid>
                            <v-layout column>
                                    <v-flex xs12>
                                                <v-text-field v-model="loginDetails.email"
                                                              prepend-icon="person"
                                                              :autocomplete="false"
                                                              :error-messages="errors.collect('email')"
                                                              v-validate="'required|email'"
                                                              data-vv-name="email"
                                                              required
                                                >
                                                </v-text-field>
                                    </v-flex>
                                    <v-flex xs12>
                                                <v-text-field v-model="loginDetails.password"
                                                              :autocompelete="false"
                                                              type="password"
                                                              prepend-icon="lock"
                                                              :error-messages="errors.collect('password')"
                                                              v-validate="'required|min:6'"
                                                              data-vv-name="password"
                                                              required
                                                >
                                                </v-text-field>
                            </v-flex>
                            </v-layout>

                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-flex xs12 md6 lg6>
                            <v-checkbox v-model="loginDetails.remember":label="$t('login.remember_me')" light></v-checkbox>
                        </v-flex>
                        <v-flex xs12 md6 lg6 text-xs-center text-md-right>
                            <v-btn type="button" color="primary" @click.native="loginPost" :loading="loading">
                                {{ $t('login.login') }}
                            </v-btn>
                        </v-flex>
                    </v-card-actions>
                    <v-card-text class="text-xs-right">

                        <a href="/password/reset">{{ $t('login.lost_password_link_text') }}</a>
                    </v-card-text>
                </v-card>
                </form>
        </v-layout>
        <div class="version"> {{ version }}</div>
    </v-app>
</template>

<style lang="scss" scoped>
html {
    overflow: hidden
}

@media screen and (min-width: 1000px) {
    .loginbg {
        height: 100vh !important;
        align-items: center;
        justify-content: center;
        background-size: cover;
        transition: background-image 1s ease-in-out;
        -moz-transition: background-image 1s ease-in-out;
        -webkit-transition: background-image 1s ease-in-out;
        animation: fadein 2s;


    }
    @keyframes fadein {
        from { opacity: 0; }
        to   { opacity: 1; }
    }

    .loginCard {
        /*min-width: 400px !important;*/
        /*max-width: 500px !important;*/
        width: 500px;
    }
}

@media screen and (max-width: 768px) {
    .loginbg {
        margin-top: 70px !important;
        height: 100vh !important;
        align-items: center;
        justify-content: center;
        background-size: cover;
    }
    .loginCard {
        width: 100vw;
        height: 100vh !important;
    }
}



.login-title {
    color: white;
    position: absolute;
    left: 1ch;
    top: 1ch;
    font-family: 'Roboto Slab', serif;

}

</style>

<script>
    export default {
        $validates: true,
        components: {
            'languageSelector' : require('./LanguageSelector.vue')
        },
        data(){
            return{
                loading: false,
                version: window.version,
                loginDetails:{
                    email:'',
                    password:'',
                    remember: true
                },
                bgimg: "background-image: url('/images/bgcovers/materialbg.png')",
                loading: false,
                errorsEmail: false,
                errorsPassword: false,
                emailError: [],
                passwordError: [],
                nincsError: true,
            }
        },
        methods:{
            loginPost(){
                this.$validator.validateAll().then((result) => {
                    this.loading = true;
                    axios.post('/login', this.loginDetails)
                        .then(response => {
                            if(response.status == 200) {
                                window.location = '/';
                            }
                        })
                        .catch(error => {
                            var response = error.response
                            console.log(response);
                            this.loading = false;
                            this.errors.add('email',response.data.errors.email);
                            this.errors.add('password',response.data.errors.password);
                        });
                }).catch(err => {
                    console.log(err);
                });
            }
        },
        mounted() {
            localStorage.setItem('vuex',null);
        }
    }
</script>
