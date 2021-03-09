<template>
  <v-card class="overflow-y-auto transparent" flat max-height="600">
    <v-card
        v-for="(item, i) in pedidos"
        :key="i"
        class="mx-auto ma-4 text-center"
         :class="{'green' : cardState}"
        max-width="344"
        outlined
    >
        <v-list-item three-line>
          <v-list-item-content>
              <v-row justify="space-between" class="mx-4">

                <!-- icon cantidad de billetes en efectivo -->
                <v-list-item-icon>
                  <v-tooltip left v-if="item[0].billetes" color="green">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="green"
                      x-small
                      plain
                      text
                      v-bind="attrs"
                      v-on="on"
                    >
                      {{ item[0].billetes}}
                      <v-icon
                        dark
                        right
                      >
                        mdi-cash-multiple
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>Nº billetes</span>
                </v-tooltip>

                <!-- icon car-delivery -->
                <v-tooltip bottom v-if="item[2]" color="blue">
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      color="blue"
                      dark
                      v-bind="attrs"
                      v-on="on"
                    >
                      mdi-car-outline
                    </v-icon>
                  </template>
                  <span>Delivery</span>
                </v-tooltip>
                </v-list-item-icon>
                <v-spacer></v-spacer>

                <!-- logo de la tasa -->
                <v-list-item-icon>
                  <v-tooltip right v-if="item[1]" color="blue">
                  <template v-slot:activator="{ on, attrs }">
                    <v-img
                      width="10"
                      :src="item[1].icon"
                      v-bind="attrs"
                      v-on="on"
                    >
                    </v-img>
                  </template>
                  <span>{{ `${item[1].nombre}`}}</span>
                </v-tooltip>
                </v-list-item-icon>
              </v-row>

              <!-- Monto y ciudad -->
              <v-list-item-subtitle class="headline mb-1 green--text">
                {{ item[0].amount }} $ {{ item[0].coins }}
              </v-list-item-subtitle>
              <v-list-item-title class="headline mb-1">
                {{ item[0].ciudad }}
              </v-list-item-title>
              
              <!-- RAITING  -->
                <v-rating
                  v-model="rating"
                  background-color="orange lighten-3"
                  color="orange"
                  small
                ></v-rating>
                <span>* Tasa {{ tasas[0].nombre }}: {{ tasas[0].tasa * item[0].amount  }}</span>
                <span>* Tasa {{ tasas[1].nombre }}: {{ tasas[1].tasa * item[0].amount }}</span>
              <v-btn
                  outlined
                  color="yellow"
                  @click="removePost(item)"
              >
                  Comprar
              </v-btn>
          </v-list-item-content>
        </v-list-item>
    </v-card>
  </v-card>
</template>

<script>
import firebase from 'firebase/app'
import { db } from '@/plugins/firebase'
const datosRef = db.ref('post')
  export default {
      data: () => ({
          cardState: false,
          rating: 4,
      }),
      created() {
        const starCountRef = firebase.database().ref(datosRef);
          starCountRef.on('value', (snapshot) => {
            const data = snapshot.val();
            this.$store.dispatch('pedidos/sendRef', data)
          });
          console.log(this.pedidos);
      },
       firebase: {
        post: datosRef
      },
      computed: {
        datos() {
        return this.$store.state.rates.data
        },
        datosOrder(i) {
          return this.datos.slice(i).reverse(i)
        },
        tasas() {
        return this.$store.state.rates.tasas
        },
        pedidos() {
          return this.$store.state.pedidos.pedidos
        }
      },
      methods: {
        removePost(i) {
          datosRef.child(i['.key']).remove(i)
        },
          removeItem(i) {
            this.$store.dispatch('rates/removePedido', i),
            console.log(this.datos);
            console.log(this.datosIcon);
        }
      }
}
</script>
