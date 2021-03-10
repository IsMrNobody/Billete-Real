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
                    v-model="nombre"
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
                    v-model="telefono"
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
                    v-model="ciudad"
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
                    v-model="password"
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
          <!-- <v-spacer></v-spacer> -->
          <v-btn
            type="submit"
            color="red"
            text
            ripple
            @click.exact="registrar"
            ><v-icon left>mdi-silverware</v-icon>
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
export default {
  data: () => ({
    dialog: false,
    valid: false,
    password: '',
    email: '',
    ciudad: '',
    telefono: '',
    nombre: '',
    emailRules: [
      (v) => !!v || 'El email es necesario para enviar una remesa',
      (v) => /.+@.+/.test(v) || 'El email debe ser valido'
    ]
  }),
  methods: {
    registrar() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(user => {
        this.email = '',
        this.password = ''
        this.$router.push('/')
        console.log(user);
        })
        .catch(error => (this.error = error))
      }
  }
}
</script>

<style scoped></style>
