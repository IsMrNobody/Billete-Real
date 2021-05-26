<template>
  <v-card class="overflow-y-auto transparent" flat max-height="600">
    <v-card
        v-for="(item, i) in pedidos"
        :key="i"
        class="my-5 bg mx-auto"
        :class="{'green' : cardState}"
        max-width="344"
        outlined
    >
        <div class="bl"></div>
        <v-list-item three-line>
          <v-list-item-content>
              <v-row justify="space-between" class="pr-4 ml-1">

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
                <!-- <v-spacer></v-spacer> -->

                <!-- logo de la tasa -->
                <v-list-item-icon class="mr-3">
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
              <!-- <div class="text-center">
                <v-icon text x-small color="red" @click="removeItem(i)">Eliminar</v-icon>
              </div> -->

              <!-- Monto y ciudad -->
              <v-list-item-subtitle class="headline green--text">
                {{ item[0].amount }} $ {{ item[0].coins }}
              </v-list-item-subtitle>
              <v-list-item-title class="headline">
                {{ item[0].ciudad }}
                <!-- <v-btn fab x-small icon color="red" @click="removeItem(i)">X</v-btn> -->
              </v-list-item-title>
              
              <v-col>
                <DialogCar :pedidos="item" />
              </v-col>
          </v-list-item-content>
        </v-list-item>
    </v-card>
  </v-card>
</template>

<script>
import DialogCar from '@/components/DialogCar'
import firebase from 'firebase/app'
import { db } from '@/plugins/firebase'
const datosRef = db.ref('post')
  export default {
    computed: {
      DialogCar
    },
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
          // console.log(this.pedidos);
      },
       firebase: {
        post: datosRef
      },
      computed: {
        datos() {
        return this.$store.state.rates.data
        },
        // datosOrder(i) {
        //   return this.datos.slice(i).reverse(i)
        // },
        tasas() {
        return this.$store.state.rates.tasas
        },
        pedidos() {
          return this.$store.state.pedidos.pedidos
        }
      },
      methods: {
          removeItem(key) {
            datosRef.child(key).remove()
        },
      }
}
</script>

<style lang="scss" scoped>
.bg {
  // background-color: rgba(1, 12, 5, 0.4);
  background: linear-gradient(to top right, #031603 20%, #19310e,);
  // border: solid rgb(99, 255, 99) 0.4px;
}
.bl {
  // border: solid black 0.4px;
  background-color: rgb(18, 22, 13);
  border-radius: 20px;
  position: absolute;
  padding-left: 240px;
  height: 46px;
  width: 100%;
}
</style>