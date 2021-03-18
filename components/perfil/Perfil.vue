<template>
  <v-container>
    <v-row justify="space-around">
      <v-card width="400">
        <v-img
          height="200px"
          class="black"
        >
          <v-app-bar
            flat
            color="rgba(0, 0, 0, 0)"
          >
            <!-- <v-app-bar-nav-icon color="white"></v-app-bar-nav-icon>

            <v-toolbar-title class="title white--text pl-0">
              Messages
            </v-toolbar-title> -->

            <v-spacer></v-spacer>

            <v-btn
              color="white"
              icon
            >
              <v-icon color="red">mdi-dots-vertical</v-icon>
            </v-btn>
          </v-app-bar>

          <v-card-title class="white--text mt-8">
            <v-avatar size="56" @click="play">
              <img
                class="blue"
                src="/icon.png"
              >
            </v-avatar>
            <p class="ml-3">
              @Myprofile
            <span class="text-caption">Email.user</span>
            </p>
          </v-card-title>
        </v-img>

        <v-card-text>
          <div class="font-weight-bold ml-8 mb-2">
            Ordenes de compra
          </div>

          <v-timeline
            align-top
            dense
          >
            <v-timeline-item
              v-for="(info, i) in pedidos"
              :key="i"
              color="transparent"
              small
            >
              <v-tooltip
                top
                color="orange"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    x-small
                    v-bind="attrs"
                    v-on="on"
                    class="pos"
                  >
                    <!-- <v-icon color="grey lighten-1">
                      mdi-cart
                    </v-icon> -->
                    <v-img width="20" :src="info[1].icon" class=""></v-img>
                  </v-btn>
                </template>
                <span>{{ info[1].nombre }}</span>
              </v-tooltip>
              <div>
                <div class="font-weight-normal ml-3">
                  <strong class="orange--text">
                    {{ info[0].amount }} $ </strong>
                    - {{ info[0].coins }} -
                  <strong
                    class="blue--text"
                    v-if="(!info.cancel && !info.confirm)"
                  >
                    Esperando...
                  </strong>
                    <!-- CANCEL -->
                    <v-tooltip
                      top
                      color="blue"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                          @click="cancel(i)"
                          v-if="(!info.cancel && !info.confirm)"
                          v-bind="attrs"
                          v-on="on"
                          color="blue lighten-1">
                          mdi-alpha-x-circle-outline
                        </v-icon>
                      </template>
                      <span>Cancelar</span>
                    </v-tooltip>
                    <!-- CHECK -->
                    <v-tooltip
                      right
                      color="green"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon 
                          v-show="info.confirm"
                          v-bind="attrs"
                          v-on="on"
                          color="green lighten-1">
                          mdi-shield-check-outline
                        </v-icon>
                      </template>
                      <span>Aceptada</span>
                    </v-tooltip>
                    <!-- ELIMINAR -->
                    <v-tooltip
                      right
                      color="red"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon 
                          v-if="(info.cancel)"
                          v-bind="attrs"
                          v-on="on"
                          @click="remove(i)"
                          color="red">
                          mdi-trash-can
                        </v-icon>
                      </template>
                      <span class="text-caption">Eliminar</span>
                    </v-tooltip>
                    <!-- <v-icon
                    color="red"
                    @click="remove(i)"
                    v-if="(info.cancel)"
                    >
                      mdi-trash-can
                    </v-icon> -->
                </div>
                <div class="ml-3">
                  <span class="orange--text">Total: </span>
                  {{ info.tasaMul }} VES
                  <span>{{ info.date }}</span>
                </div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import _ from 'lodash'
import firebase from 'firebase/app'
import { db } from '@/plugins/firebase'
const datosRef = db.ref('orderHistory')

  export default {
    data: () => ({
      estado: 'En proceso'
    }),
    created() {
      const starCountRef = firebase.database().ref(datosRef);
        starCountRef.on('value', (snapshot) => {
          const data = snapshot.val();
          // updateStarCount(postElement, data);
          this.$store.dispatch('pedidos/orderHistory', data)
      });
    },
    firebase: {
      post: datosRef
    },
    computed: {
    // info() {
    //     return this.$store.state.pedidos.order
    //   },
      pedidos() {
        return this.$store.state.pedidos.history
    }
    },
    methods: {
        play() {
            console.log(this.pedidos);
        },
        remove(key) {
          datosRef.child(key).remove()
        },
        cancel(key) {
          // console.log(this.pedidos);
          datosRef.child(key).update({ cancel: true })
        }
    }
}
</script>

<style scoped>
.pos {
  position: absolute;
  margin-left: -58px;
  margin-top: 2px;
  z-index: 20;
}
</style>
