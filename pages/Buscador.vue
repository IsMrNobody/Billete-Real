<template>
    <div>
        <v-container>
            <v-row>
                <v-col class="pl-4" align="center">
                    <v-text-field @keyup="clear()" v-model="token" label="buscar"></v-text-field>
                    <v-text-field @keyup="addMulti4()" v-model="montoDolar" label="token"></v-text-field>
                    <v-text-field @keyup="addMulti3()" v-model="montoToken" label="dolar"></v-text-field>
                    <v-btn @click="buscartoken()">Buscar</v-btn>
                    <v-btn @click="enviarinfo3()">Enviar</v-btn>
                </v-col>
                <v-col class="pl-4" align="center">
                    <!-- <v-text-field @keyup="clear()" v-model="token" label="buscar"></v-text-field> -->
                    <v-text-field @keyup="addMulti6()" v-model="valorCompra" label="valor de compra"></v-text-field>
                    <v-text-field @keyup="addMulti6()" v-model="multitoken" label="token"></v-text-field>
                    <v-text-field @keyup="addMulti5()" v-model="montoToken" label="dolar"></v-text-field>
                    <!-- <v-btn @click="buscartoken()">Buscar</v-btn> -->
                    <v-btn @click="enviarinfo2()">Enviar</v-btn>
                </v-col>
            </v-row>
            
            <!-- <h2>{{busqueda}}</h2> -->
            <v-row>
                <v-col>
                    <v-row class="colorbuscar">
                        <v-container>
                            <v-row class="pa-3" justify="space-around">
                                <v-col>
                                    <h3>{{ tokeinfo.name }}</h3>
                                    <span class="text-uppercase">{{ tokeinfo.symbol }}</span>
                                </v-col>
                                <v-col>
                                    <!-- <span>$ {{montoActual}}</span> -->
                                </v-col>
                                <v-col>
                                    <!-- <span class="ml-4">$ {{montoActual * montoDolar}}</span> -->
                                </v-col>
                                <v-col>
                                    <span> {{montoDolar}}</span>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-row>
                </v-col>
            </v-row>
                <v-spacer></v-spacer>
                <!-- ///////////// -->
                <v-row v-for="(coin, i) in tokenSaves" :key="i" class="black mt-5" @click="dataBill(coin)">
                    <v-col>
                        <h4>{{coin.symbol}}</h4>
                        <h3>{{coin.name}}</h3>
                        <div>
                          <span 
                            v-if="token === coin.id && dataRegistrada"
                            :class="[(tokeinfo.market_data.current_price.usd - dataRegistrada.valorDeCompra) < 0 ? 'red--text' : 'green--text']"
                          >
                            {{(tokeinfo.market_data.current_price.usd - dataRegistrada.valorDeCompra).toFixed(2)}}
                          </span>
                        </div>
                    </v-col>
                    <v-col>
                        <h4>Valor</h4>
                        <span class="yellow--text">{{coin.current_price}} $</span>
                        <div>
                            <span
                            v-if="token === coin.id && dataRegistrada"
                                :class="[tokeinfo.market_data.current_price.usd < coin.current_price ? 'red--text' : 'green--text']">
                                {{ tokeinfo.market_data.current_price.usd }} $
                            </span>
                        </div>
                         <!-- <span>{{Math.floor(coins[0].current_price - dataRegistrada.valorDeCompra)}}</span> -->
                    </v-col>
                    <v-col>
                        <h4>Inversion</h4>
                        <span class="red--text">$ {{coin.montoMoneda}}</span>
                        <div>
                            <span
                                v-if="token === coin.id && dataRegistrada"
                                :class="[multiplo < coin.montoMoneda ? 'red--text' : 'green--text']">
                                $ {{multiplo.toFixed(3)}}
                            </span>
                        </div>
                    </v-col>
                    <v-col>
                        <h4>Monto en token</h4>
                        <span class="blue--text"> {{coin.montoUSD}}</span>
                        <!-- <span>{{(coins[0].current_price - dataRegistrada.valorDeCompra).toFixed(3)}}</span> -->
                    </v-col>
                    <v-col v-if="token === coin.id && dataRegistrada">
                        <h4>Margen</h4>
                        <h3>-</h3>
                        <!-- <span>{{coins[0].current_price - dataRegistrada.valorDeCompra}}</span> -->
                        <span
                            :class="[multiplo - coin.montoMoneda < 0 ? 'red--text' : 'green--text']">
                            {{(multiplo - coin.montoMoneda).toFixed(4)}} $
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
const datosRefe = db.ref('tokeinfo')
export default {
    firebase: {
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
        token: 'bitcoin',
        montoToken: null,
        montoDolar: null,
        tokex: '',
        valorCompra: '',
        multitoken: ''
    }),
    computed: {
        tasa4() {
           return this.$store.state.rates.tasa4
        },
        infoCard() {
            return this.$store.state.coins.info
        },
        tokeinfo() {
            return this.$store.state.coins.toke
        },
        montoActual() {
            return this.tokex.market_data.current_price.usd
        },
        multiplo() {
            return this.tokeinfo.market_data.current_price.usd * this.montoTarj
        },
        totalMargen() {
            const data = this.infoCard
            return data
        },
        tokenSaves() {
            return this.$store.state.coins.tokenbusq
        }
    },
    created() {
        // this.token = 'bitcoin'
        console.log(this.tasa4)
        this.$store.dispatch('rates/getTasaDeCambio4')
        this.buscartoken()
        this.coins = this.tasa3
        this.actualizarlista()
        const starC = firebase.database().ref(datosRefe);
          starC.on('value', (snapshot) => {
            const data = snapshot.val();
            this.$store.dispatch('coins/sendinfo2', data)
            // console.log(data)
          });
    },
    methods: {
        clear() {
            this.montoDolar = '',
            this.montoToken = ''
        },
        async buscartoken() {
            const token = await axios.get('https://api.coingecko.com/api/v3/coins/' + `${this.token}`)
            this.tokex = token.data
            // console.log(this.tokex);
            this.$store.dispatch('coins/busqToken', token)
        },
        actualizarlista() {
            this.$store.dispatch('rates/getTasaDeCambio3')
        },
        enviarinfo3() {
            const data = {
                id: this.tokeinfo.id,
                name: this.tokeinfo.name,
                symbol: this.tokeinfo.symbol,
                current_price: this.tokeinfo.market_data.current_price.usd,
                montoUSD: this.montoDolar,
                montoMoneda: this.montoToken
                }
            try {
                datosRefe.push(data)
                // console.log(data)
            } catch (error) {
                console.log(error.message); 
            }
            this.buscartoken()
            this.token = ''
            this.montoDolar = '',
            this.montoToken = ''
        },
        enviarinfo2() {
            const data = {
                id: this.tokeinfo.id,
                name: this.tokeinfo.name,
                symbol: this.tokeinfo.symbol,
                current_price: this.valorCompra,
                montoUSD: this.multitoken,
                montoMoneda: this.montoToken
                }
            try {
                datosRefe.push(data)
                // console.log(data)
            } catch (error) {
                console.log(error.message); 
            }
            this.buscartoken()
            this.token = ''
            this.montoDolar = '',
            this.montoToken = ''
        },
        addMulti() {
            this.comprado = this.compradousd / this.coins[0].current_price
        },
        addMulti2() {
            this.compradousd = this.comprado * this.coins[0].current_price
        },
        addMulti3() {
            this.montoDolar = this.montoToken / this.tokeinfo.market_data.current_price.usd
        },
        addMulti4() {
            this.montoToken = this.montoDolar * this.tokeinfo.market_data.current_price.usd
        },
        addMulti5() {
            this.multitoken = this.montoToken / this.valorCompra
        },
        addMulti6() {
            this.montoToken = this.valorCompra * this.multitoken
        },
        deleted(i) {
            datosRefe.child(i).remove()
        },
        dataBill(i) {
            // this.$store.dispatch('rates/getTasaDeCambio3')
            this.token = ''
            const datos = {
                name: i.name,
                montoM: i.montoMoneda,
                montoUSD: i.montoUSD,
                valorDeCompra: i.current_price,
                id: i.id
            }
            this.dataRegistrada = datos
            this.token = datos.id
            this.buscartoken()
            this.montoTarj = datos.montoUSD
            // console.log(this.dataRegistrada)
        }
    }
}
</script>

<style scoped>
.colorbuscar {
    background-color: rgba(0, 0, 0, 0.5);
}
</style>