<template>
  <v-card
    :loading="loading"
    class="mx-auto"
    max-width="374"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-row>
        <v-col class="ma-1 ml-4">
            <!-- <v-card-title>{{dataRe.name}}</v-card-title> -->
            <!-- <v-card-subtitle>{{dataRe.symbol}}</v-card-subtitle> -->

            <v-row>
                <v-col>
                    <v-avatar size="80">
                        <v-img
                        @click="info()"
                        height="auto"
                        :src="dataRe.logo"
                        ></v-img>
                    </v-avatar>
                  <v-card-title>{{dataRe.name}}</v-card-title>
                    <v-card-subtitle>{{dataRe.symbol}}</v-card-subtitle>
                </v-col>
            </v-row>
                <v-chip>{{dataRe.montoUSD}}</v-chip>
            <v-row>
            </v-row>
        </v-col>
        <v-col class="mr-2" justify="end" align="end">
            <div>
                <p class="text-subtitle-1 yellow--text">{{dataRe.montoM}} $</p>
                <h4
                  :class="[current < dataRe.valorDeCompra ? 'red--text' : 'green--text']"  
                >{{(dataRe.montoUSD * current).toFixed(4)}} $</h4>
                <h1
                    :class="[(dataRe.montoUSD * current) - dataRe.montoM < 0 ? 'red--text' : 'green--text']"
                    >{{((dataRe.montoUSD * current) - dataRe.montoM).toFixed(2)}} $
                </h1>
                <!-- <p>{{iconF}}</p> -->
                <v-icon size="80" color="green" v-if="iconF">mdi-trending-up</v-icon>
                <v-icon size="80" color="red" v-else>mdi-trending-down</v-icon>
            </div>
        </v-col>
    </v-row>

    <v-card-text>
      <!-- <v-row
        align="center"
        class="mx-0"
      >
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ms-4">
          4.5 (413)
        </div>
      </v-row> -->

      <!-- <div class="text-subtitle-1">
        {{tokeinfo.symbol}}
      </div> -->

      <!-- <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div> -->
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-row>
        <v-col>
             <v-list-item>
                <v-list-item-content>
                <v-list-item-title>Valor Inicial</v-list-item-title>
                <v-list-item-subtitle class="yellow--text">{{dataRe.valorDeCompra}} $</v-list-item-subtitle>
                <v-list-item-subtitle>{{dataRe.fecha}}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-list-item-content>
                <v-list-item-title>Valor Actual</v-list-item-title>
                <v-list-item-subtitle class="blue--text">{{current}} $</v-list-item-subtitle>
                <v-list-item-subtitle>{{dataRe.fecha}}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-list-item-content>
                <v-list-item-title>Diferencia</v-list-item-title>
                <v-list-item-subtitle
                    :class="[current - dataRe.valorDeCompra < 0 ? 'red--text' : 'green--text']">
                    {{current - dataRe.valorDeCompra}} $</v-list-item-subtitle>
                <!-- <v-list-item-subtitle>{{dataRe.fecha}}</v-list-item-subtitle> -->
                </v-list-item-content>
            </v-list-item>
        </v-col>
    </v-row>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      loading: false,
      selection: 1,
    }),
    props: {
        dataRe: {
            type: Object,
            default: () => ({})
        },
        current: {
            type: Number,
            default: () => ({}) 
        },
        iconF: {
            type: Boolean,
            default: () => ({}) 
        }
    },
    created() {
        // console.log(this.tokeinfo)
    },
    computed: {
        tokenSaves() {
            return this.$store.state.coins.tokenbusq
        }
    },

    methods: {
        info() {
            console.log(this.dataRe)
        },
      reserve () {
        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
      }
    },
  }
</script>
