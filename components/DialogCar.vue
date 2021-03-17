<template>
  <v-row justify="end">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="300px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          outlined
          color="yellow"
          small
          dark
          @click="monto"
          v-bind="attrs"
          v-on="on"
        >
          Ofertar
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <!-- <v-avatar size="28">
            <img src="/icon.png" alt="">
          </v-avatar> -->
          <span class="headline">@username</span>
        </v-card-title>
        <v-card-text>
          <v-row
            align="center"
            class="mx-0"
          >
            <v-rating
              :value="3.5"
              color="amber"
              dense
              half-increments
              readonly
              size="14"
            ></v-rating>

            <div class="grey--text ml-4">
              3.5 ({{ counter }})Ofertas
            </div>
          </v-row>

          <div class="subtitle-2 mt-4">
            <span>{{ pedidos[0].amount}} $ - {{ pedidos[0].ciudad }}</span>
            <span>• {{ pedidos[1].nombre }}</span>
          </div>

          <!-- <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div> -->
        </v-card-text>
        <v-divider class="mx-4"></v-divider>

        <v-card-title>Tasas a ofertar</v-card-title>

        <v-card-text>
          <v-chip-group
            v-model="selection"
            mandatory
            active-class="teal darken-4 white--text"
            column
          >
            <v-chip
              v-for="(item, i) in tasas"
              :key="i"
              @click="tasaMul"
            >
              {{ item.nombre }}
            </v-chip>

          </v-chip-group>
          <div class="subtitle-1 green--text">
            $ • {{ tasaid.tasa }}
          </div>
          <span>Total > {{ multipli }} </span>
        </v-card-text>
        <v-card-actions>
          <v-btn
            text
            color="grey"
            @click="dialog = false"
          >
            Cerrar
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            outlined
            color="yellow"
            @click="sendOferta"
          >
            Enviar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  import _ from 'lodash'
  import { db } from '@/plugins/firebase'
  const datosRef = db.ref('orderHistory')
  
  export default {
    props: {
      pedidos: {
        type: Array,
        default: () => ({})
      }
    },
    firebase: {
      order: datosRef
    },
    data: () => ({
      dialog: false,
      selection: 0,
      counter: 0
    }),
    computed: {
      tasas() {
        return this.$store.state.rates.tasas
      },
      tasaid() {
        return this.tasas[this.selection]
      },
      multipli() {
        const mul = this.pedidos[0].amount * this.tasaid.tasa
        return mul
      },
      info() {
        return this.$store.state.pedidos.order
      },
      datos() {
        const data = {
          tasaMul: this.multipli,
          tasaId: this.tasaid,
          ...this.pedidos,
          cancel:  false,
          check: false,
          confirm: false
        }
        return data
      }
    },
    methods: {
      tasaMul() {
        console.log(this.multipli, this.tasaid);
      },
      monto() {
        console.log(this.pedidos);
      },
      sendOferta() {
        this.counter ++
      datosRef.push(this.datos)
      // this.$store.dispatch('pedidos/setOfer', data)
      this.$router.push('/Perfil')
      console.log(this.info)
        // this.dialog = false
    }
  }
}
</script>