<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-card color="black" flat width="380">
        <h2 class="text-center mt-5">Ingresar Usuario</h2>
        <v-card-text class="text-center">
          <v-container>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              @submit.prevent="send"
            >
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="email"
                    label="Email"
                    type="email"
                    filled
                    prepend-inner-icon="mdi-email"
                    color="red"
                    clearable
                    hint="Tu correo electronico"
                    required
                  />
                  <v-text-field
                    v-model="password"
                    label="Clave"
                    type="password"
                    filled
                    prepend-inner-icon="mdi-key-variant"
                    color="red"
                    hint="Tu clave"
                    required
                    clearable
                    @keydown.enter="ingresar"
                  />
                </v-col>
              </v-row>
            </v-form>
          </v-container>
          <small>Todos los campos son requeridos para ingresar</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            type="submit"
            color="red"
            text
            ripple
            @click.exact="send"
            ><v-icon left>mdi-silverware</v-icon>
            Ingresar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
export default {
  data: () => ({
    dialog: false,
    valid: false,
    password: '',
    email: '',
    emailRules: [
      (v) => !!v || 'El email es necesario para enviar una remesa',
      (v) => /.+@.+/.test(v) || 'El email debe ser valido'
    ]
  }),
  created() {
    this.obeservador()
  },
  methods: {
    send() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
        this.email = '',
        this.password = ''
        this.$router.push('/')
        console.log(user);
        })
        .catch(error => (this.error = error))
      },
      obeservador() {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            console.log('existe user');
            // ...
          } else {
            console.log('no existe');
            // User is signed out
            // ...
          }
        });
      }
  }
}
</script>

<style scoped></style>
