<template>
    <div>
        <v-snackbar
                bottom
                right
                v-model="show"
                :color="context"
                :timeout="8000"
        >{{ body }}
            <v-btn flat @click.native="show = false">{{ $t('buttons.close') }}</v-btn>
        </v-snackbar>
    </div>
</template>
<style scoped>
div {
    font-family: Roboto;
}
</style>

<script>
    export default {
        props: ['message'],
        data() {
           return {
               show: false,
               body: '',
               context: ''
           }
        },
        methods: {
          flash(message) {
              this.body = message.body;
              this.context = message.context;
              this.show = true;
          }
        },
        mounted() {
            window.events.$on('flash', message => {
                this.flash(message);
            });
            window.flash = function(body,context = 'info') {
                window.events.$emit('flash', { body: body, context: context } );
            };
        }
    }

</script>
