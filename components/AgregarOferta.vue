<template>
<v-col>
      <span class="green--text">Agregar Venta ></span>
        <v-container>
          <v-row class="d-flex d-sm-none">
            <Lista />
          </v-row>
          <v-form
                v-model="valid"
                @submit.prevent="addPost">
            <v-row>
              <v-col cols sm="3">
                <v-select
                  :items="monedas"
                  v-model="dataBase.coins"
                  :rules="billetesRules"
                  label="Moneda"
                ></v-select>
              </v-col>

              <v-col cols sm="3">
                <v-select
                  :items="ciudadSelect"
                  v-model="dataBase.ciudad"
                  :rules="billetesRules"
                  label="ciudad"
                ></v-select>
              </v-col>

              <v-col cols sm="3">
                <v-text-field
                  v-model="dataBase.amount"
                  :rules="passRules"
                  type="number"
                  label="Monto"
                ></v-text-field>
              </v-col>

              <v-col cols sm="3">
                <v-text-field
                  v-model="dataBase.billetes"
                  type="number"
                  label="Billetes"
                  :rules="billetesRules"

                ></v-text-field>
              </v-col>

              <v-col cols="8" sm="3">
                <v-switch
                  v-model="switch1"
                  prepend-icon="mdi-car"
                  dense
                >
                </v-switch>
              </v-col>

              <v-col cols="4">
                <v-checkbox
                    v-model="valid"
                    :required="valid"
                    :rules="[v => !!v || 'Aceptar condiciones!']"
                    label="Todos los campos son requeridos"
                  ></v-checkbox>
              </v-col>
              <v-col class="my-auto" align="center">
                  <v-btn type="submit" :disabled="!valid" outlined x-large color="yellow">Enviar</v-btn>
              </v-col>
            </v-row>
          </v-form>
          <v-row class="d-none d-sm-flex">
            <Lista />
          </v-row>
        </v-container>
  </v-col>
</template>

<script>
import Swal from 'sweetalert2'
import { db } from '@/plugins/firebase'
const datosRef = db.ref('post')

import Lista from '~/components/Lista.vue'
  export default {
    components: {
    Lista
    },
    firebase: {
      post: datosRef
    },
    data: () => ({
      valid: false,
      switch1: false,
      dataBase: {
        billetes: '',
        coins: '',
        amount: '',
        ciudad: ''
      },
      billetesRules: [
        value => !!value || 'Required.',
        // v => !!v || 'Numero es requerido',
        // v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      passRules: [
        v => !!v || 'Name is required',
        v => v.length <= 3 || 'Name must be less than 11 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ]
    }),
    computed: {
        monedas() {
            return this.$store.state.rates.tiposDeMonedas
        },
        ciudadSelect() {
            return this.$store.state.rates.ciudad
        },
        datos() {
            return this.$store.state.rates.data
        },
        tasas() {
        return this.$store.state.rates.tasas
        },
        selectr() {
        return this.$store.state.rates.tasaSelected
        },
        datselec() {
          return this.tasas[`${this.selectr}`]
        },
        pedidos() {
          return this.$store.state.pedidos
        }
    },
    methods: {
      // data enviada a firebase >>>
        addPost() {
          try {
            datosRef.push([this.dataBase, this.datselec, this.switch1])
              Swal.fire({
                position: 'top',
                icon: 'success',
                iconColor: 'orange',
                title: 'billete publicado',
                showConfirmButton: false,
                toast: true,
                background: '#171819',
                timer: 1500,
              })
          } catch (error) {
               console.log(error.message); 
          }
          console.log(this.datosRef);
          this.dataBase.billetes = '',
          this.dataBase.coins = '',
          this.dataBase.amount = '',
          this.dataBase.ciudad = '',
          this.switch1 = false
        },

        // data enviada al store <<<>>>

        // enviarData() {
        //     const data = {
        //         monedas: this.dataBase.coins,
        //         ciudad: this.dataBase.ciudad,
        //         billetes: this.dataBase.billetes,
        //         amount: this.dataBase.amount,
        //         tasaMul: this.dataBase.amount * this.tasas[0].tasa,
        //         tasaMul2: this.dataBase.amount * this.tasas[1].tasa,
        //         icon: this.datselec,
        //         delivery: this.switch1
        //     }
        //     this.$store.dispatch('rates/sendData', data),
        //     this.amount = '',
        //     this.coins = '',
        //     this.name = ''
        //     console.log(this.datos);
        // }
    }
  }
</script>
