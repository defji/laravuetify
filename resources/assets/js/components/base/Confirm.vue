<template>
    <v-dialog v-model="show" persistent transition="dialog-bottom-transition" max-width="500px">
        <v-card xs12 md12 lg12>
            <v-card-title>{{ question }}</v-card-title>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click.native="noAction" flat>{{ noLabel }}</v-btn>
                <v-btn @click.native="yesAction" flat primary>{{ yesLabel }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
    export default {
        data() {
           return {
               show: false,
               question: '',
               yesLabel: 'Yes',
               noLabel: 'Cancel',
           }
        },
        methods: {
          yesAction() {
              this.show = false;
              if (this.yesCallback instanceof Function) {
                  this.yesCallback();
              }
          },
          noAction() {
              this.show = false;
              if (this.noCallback instanceof Function) {
                  this.noCallback();
              }
          },
          showConfirm(message) {
              this.show = true;
              this.question = message.question;
              this.yesLabel = message.yesLabel;
              this.noLabel = message.noLabel;
              this.yesCallback = message.yesCallback;
              this.noCallback = message.noCallback;
          }
        },
        created() {
            window.events.$on('question', message => {
                this.showConfirm(message);
            })
        }
    }
    window.question = function(question, yesLabel, noLabel, yesCallback, noCallback) {
        window.events.$emit('question', {
            question: question,
            yesLabel: yesLabel,
            noLabel,
            yesCallback: yesCallback,
            noCallback: noCallback
        });
    }
</script>
