<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-card flat width="380">
        <h2 class="text-center mt-5">Crear Usuario</h2>
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
                    v-model="datosUser.nombre"
                    label="Nombre"
                    type="text"
                    filled
                    prepend-inner-icon="mdi-key-variant"
                    color="red"
                    hint="Ingresa tu nombre"
                    required
                    clearable
                  />
                  <v-text-field
                    v-model="datosUser.email"
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
                    v-model="datosUser.telefono"
                    label="Telefono"
                    type="text"
                    filled
                    prepend-inner-icon="mdi-key-variant"
                    color="red"
                    hint="Ingresa tu numero de telefono"
                    required
                    clearable
                  />
                   <v-text-field
                    v-model="datosUser.ciudad"
                    label="Ciudad"
                    type="text"
                    filled
                    prepend-inner-icon="mdi-key-variant"
                    color="red"
                    hint="Ingresa tu numero de telefono"
                    required
                    clearable
                  />
                  <v-text-field
                    v-model="datosUser.password"
                    label="Clave"
                    type="password"
                    filled
                    prepend-inner-icon="mdi-key-variant"
                    color="red"
                    hint="Tu clave"
                    required
                    clearable
                    @keydown.enter="registrar"
                  />
                </v-col>
              </v-row>
            </v-form>
          </v-container>
          <small>Todos los campos son requeridos para ingresar</small>
        </v-card-text>
        <v-card-actions>
          <v-btn
            type="submit"
            color="orange"
            class="mx-auto"
            text
            ripple
            @click.exact="registrar"
            >
          <!-- <v-icon left>mdi-silverware</v-icon> -->
            Registrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import { db } from '@/plugins/firebase'
const datosRef = db.ref('usuarios')
export default {
  data: () => ({
    dialog: false,
    valid: false,
    datosUser: {
      ciudad: '',
      telefono: '',
      nombre: '',
      email: '',
    },
    password: '',
    emailRules: [
      (v) => !!v || 'El email es necesario para enviar una remesa',
      (v) => /.+@.+/.test(v) || 'El email debe ser valido'
    ]
  }),
  firebase: {
    post: datosRef
  },
  methods: {
    registrar() {
      try {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.datosUser.email, this.password)
          .then(user => {
          datosRef.push(this.datosUser)
          this.email = '',
          this.password = ''
          this.$router.push('/')
          console.log(user);
          })
      } catch (error) {
        error => (this.error = error)
      }
    }
  }
}
</script>

<style scoped></style>
