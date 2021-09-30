<template>
    <div>
        <v-container>
            <v-row>
                <v-col class="pl-4" align="center">
                    <v-text-field @keyup="search()" v-model="busqueda" label="coins"></v-text-field>
                    <v-text-field @keyup="addMulti2()" v-model="comprado" label="token"></v-text-field>
                    <v-text-field @keyup="addMulti()" v-model="compradousd" label="usd"></v-text-field>
                    <v-btn @click="enviarinfo()">Enviar</v-btn>
                    <!-- <v-btn @click="actualizarlista()">act</v-btn> -->
                </v-col>
            </v-row>
            
            <!-- <h2>{{busqueda}}</h2> -->
            <v-row>
                    <v-col>
                        <v-row v-for="(coin, index) in coins" :key="index" class="black">
                            <!-- <span class="ml-4">$ {{coin.current_price * comprado}}</span> -->
                            <!-- <span class="ml-4">$ {{coin.current_price * compradousd}}</span> -->
                            <v-container v-show="tablero">
                                <v-row class="pa-3" justify="space-around">
                                    <v-col>
                                        <h3>{{ coin.name }}</h3>
                                        <span class="text-uppercase">{{ coin.symbol }}</span>
                                        <!-- <span class="ml-4">${{coin.market_data.current_price.usd}}</span> -->
                                    </v-col>
                                    <v-col>
                                        <span class="">$ {{coin.current_price}}</span>
                                    </v-col>
                                    <v-col>
                                        <span class="ml-4">$ {{coin.current_price * comprado}}</span>
                                    </v-col>
                                    <v-col>
                                        <span class="">$ {{comprado}}</span>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-row>
                    </v-col>
            </v-row>
                <v-spacer></v-spacer>
                <!-- ///////////// -->
                <v-row v-for="(coin, i) in infoCard" :key="i" class="black mt-5" @click="dataBill(coin)">
                    <v-col>
                        <h4>{{coin[0].coin[0].symbol}}</h4>
                        <h3>{{coin[0].coin[0].name}}</h3>
                        <div>
                          <span 
                            v-if="busqueda === coin[0].coin[0].name"
                            :class="[(coins[0].current_price - dataRegistrada.valorDeCompra) < 0 ? 'red--text' : 'green--text']"
                          >
                            {{(coins[0].current_price - dataRegistrada.valorDeCompra).toFixed(2)}}
                          </span>
                        </div>
                    </v-col>
                    <v-col>
                        <h4>Valor</h4>
                        <span class="yellow--text">{{coin[0].coin[0].current_price.toFixed(2)}} $</span>
                        <div>
                            <span
                                v-if="busqueda === coin[0].coin[0].name"
                                :class="[coins[0].current_price < coin[0].coin[0].current_price ? 'red--text' : 'green--text']">
                                {{ coins[0].current_price.toFixed(2) }} $
                            </span>
                        </div>
                         <!-- <span>{{Math.floor(coins[0].current_price - dataRegistrada.valorDeCompra)}}</span> -->
                    </v-col>
                    <v-col>
                        <h4>Inversion</h4>
                        <span class="red--text">$ {{coin[0].montoUSD}}</span>
                        <div>
                            <span
                                v-if="busqueda === coin[0].coin[0].name"
                                :class="[multiplo < coin[0].montoUSD ? 'red--text' : 'green--text']">
                                $ {{multiplo.toFixed(3)}}
                            </span>
                        </div>
                    </v-col>
                    <v-col>
                        <h4>Monto en token</h4>
                        <span class="blue--text"> {{coin[0].montoMoneda}}</span>
                        <!-- <span>{{(coins[0].current_price - dataRegistrada.valorDeCompra).toFixed(3)}}</span> -->
                    </v-col>
                    <v-col v-if="busqueda === coin[0].coin[0].name">
                        <h4>Margen</h4>
                        <h3>-</h3>
                        <!-- <span>{{coins[0].current_price - dataRegistrada.valorDeCompra}}</span> -->
                        <span 
                            v-if="busqueda === coin[0].coin[0].name"
                            :class="[multiplo - coin[0].montoUSD < 0 ? 'red--text' : 'green--text']">
                            {{(multiplo - coin[0].montoUSD).toFixed(4)}} $
                        </span>
                    </v-col>
                    <v-col>
                        <v-icon color="red" @click="deleted(i)">mdi-delete</v-icon>
                    </v-col>
                </v-row>
        </v-container>
    </div>
</template>

<script>
import axios from 'axios'
import firebase from 'firebase/app'
import { db } from '@/plugins/firebase'
const datosRef = db.ref('billeteTemp')
const datosRefe = db.ref('tokeinfo')
export default {
    firebase: {
      post: datosRef,
      post: datosRefe
    },
    data: () => ({
        coins: [],
        coinex: [],
        billeteCoin: [],
        comprado: '',
        compradousd: '',
        busqueda: '',
        montoTarj: '',
        dataRegistrada: '',
        tablero: false,
        token: '',
        montoToken: '',
        montoDolar: ''
    }),
    computed: {
        tasa3() {
           return this.$store.state.rates.tasa3
        },
        infoCard() {
            return this.$store.state.coins.info
        },
        multiplo() {
            return this.coins[0].current_price * this.montoTarj
        },
        totalMargen() {
            const data = this.infoCard
            return data
        },
        tokenIndiv() {
            return this.$store.state.coins.tokenbusq
        }
    },
    created() {
        this.coins = this.tasa3
        this.actualizarlista()
        const starCountRef = firebase.database().ref(datosRef);
          starCountRef.on('value', (snapshot) => {
            const data = snapshot.val();
            this.$store.dispatch('coins/sendinfo', {...data})
            // console.log(this.infoCard)
          });
        const starC = firebase.database().ref(datosRefe);
          starC.on('value', (snapshot) => {
            const data = snapshot.val();
            this.$store.dispatch('coins/sendinfo2', data)
            console.log(data)
          });
    },
    methods: {
        actualizarlista() {
            this.$store.dispatch('rates/getTasaDeCambio3')
        },
        search() {
            // console.log(this.coins)
            this.tablero = true
            this.comprado = ''
            this.compradousd = ''
            this.coins = this.tasa3.filter(coin => coin.name.toLowerCase().includes(this.busqueda.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(this.busqueda.toLowerCase()))
            // this.busqueda = this.dataRegistrada.name
        },
        enviarinfo() {
            const data = {
                coin: this.coins,
                montoUSD: this.compradousd,
                montoMoneda: this.comprado
                }
            // this.$store.dispatch('coins/sendinfo', data)
            try {
                datosRef.push([data])
            } catch (error) {
                console.log(error.message); 
            }
            // console.log(this.tasa3)
        },
        addMulti() {
            // console.log(this.coins)
            this.comprado = this.compradousd / this.coins[0].current_price
        },
        addMulti2() {
            this.compradousd = this.comprado * this.coins[0].current_price
        },
        deleted(i) {
            datosRef.child(i).remove()
        },
        dataBill(i) {
            this.$store.dispatch('rates/getTasaDeCambio3')
            const datos = {
                name: i[0].coin[0].name,
                montoM: i[0].montoMoneda,
                montoUSD: i[0].montoUSD,
                valorDeCompra: i[0].coin[0].current_price
            }
            this.dataRegistrada = datos
            this.busqueda = datos.name
            this.search()
            this.montoTarj = datos.montoM
            console.log(datos)
        }
    }
}
</script>