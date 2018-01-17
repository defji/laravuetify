<template>
    <v-container>
        <v-card>
            <v-card-title>
                hello world
            </v-card-title>

        </v-card>

    </v-container>
</template>
<script>
    export default {
        components: {
        },

        data() {
          return {

          }
        },
        mounted() {
            flash('Hello from component!');
        }

    }
</script>