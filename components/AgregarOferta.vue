<template>
<v-col>
      <span class="green--text">Agregar Venta ></span>
        <v-container>
          <v-row class="d-flex d-sm-none">
            <Lista />
          </v-row>
          <v-row>
            <v-col cols sm="3">
              <v-select
              :items="monedas"
              v-model="dataBase.coins"
              label="Moneda"
              ></v-select>
              </v-col>

            <v-col cols sm="3">
              <v-select
              :items="ciudadSelect"
              v-model="dataBase.ciudad"
              label="ciudad"
              ></v-select>
            </v-col>

            <v-col cols sm="3">
            <v-text-field
                  v-model="dataBase.amount"
                  type="number"
                  label="Monto"
            ></v-text-field>
            </v-col>
            <v-col cols sm="3">
              <v-text-field
                    v-model="dataBase.billetes"
                    @keyup.enter="enviarData"
                    type="number"
                    label="Billetes"
              ></v-text-field>
            </v-col>

            <v-col cols="7" sm="4">
              <v-switch
                v-model="switch1"
                label="Delivery"
                append-icon="mdi-car"
                dense
              >
              </v-switch>
            </v-col>

            <v-col align="center" class="my-auto" cols sm="3">
                  <v-btn @click="addPost" text color="yellow">Enviar</v-btn>
            </v-col>
          </v-row>
          <v-row class="d-none d-sm-flex">
            <Lista />
          </v-row>
        </v-container>
  </v-col>
</template>

<script>
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
      switch1: false,
      dataBase: {
        billetes: '',
        coins: '',
        amount: '',
        ciudad: ''
      },
      valid: false,
      nameRules: [
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
          datosRef.push([this.dataBase, this.datselec, this.switch1])
          console.log(this.pedidos);
          this.dataBase.billetes = '',
          this.dataBase.coins = '',
          this.dataBase.amount = '',
          this.dataBase.ciudad = ''
          // datosRef.push(this.datselec)
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
