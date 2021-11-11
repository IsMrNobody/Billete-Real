<template>
    <div>
        <v-container>
            <v-row>
                <v-col>
                    <v-row class="colorbuscar">
                        <v-container>
                            <v-row class="pa-3" justify="space-around">
                                <v-col>
                                    <h3>{{ tokex.name }}</h3>
                                    <span class="text-uppercase">{{ tokex.symbol }}</span>
                                </v-col>
                                <v-col>
                                    <span>$ {{currentP}}</span>
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
            <v-row>
                <v-col>
                    <v-row>
                        <v-col align="center">
                            <v-text-field
                                :append-icon="'mdi-fire'"
                                @click:append-outer="buscartoken()"
                                outlined
                                @keyup.enter="buscartoken()" v-model="token" label="buscar">
                            </v-text-field>
                            <!-- <v-text-field @keyup="clear()" v-model="token" label="buscar"></v-text-field> -->
                            <v-text-field @keyup="addMulti6()" v-model="valorCompra" label="valor de compra"></v-text-field>
                            <v-text-field @keyup="addMulti6()" v-model="multitoken" label="token"></v-text-field>
                            <v-text-field @keyup="addMulti5()" v-model="montoToken" label="dolar"></v-text-field>
                            <!-- <v-btn @click="buscartoken()">Buscar</v-btn> -->
                            <v-btn @click="enviarinfo2()">Enviar</v-btn>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col>
                    <CardCoin :dataRe="dataRegistrada" :tokex="tokex" :current="currentP" />
                </v-col>
                <v-row class="ma-1 text-center">
                    <v-col v-for="(coine, c) in tokenSaves" :key="c">
                        <v-avatar @click="dataBill(coine)">
                            <img :src="coine.logo" alt="">
                        </v-avatar>
                        <p>{{coine.symbol}}</p>
                        <!-- <p>{{c}}</p> -->
                    </v-col>
                </v-row>
            </v-row>
            
            <!-- <h2>{{busqueda}}</h2> -->
            <v-spacer></v-spacer>
            <!-- ///////////// -->
            <v-row v-for="(coin, i) in tokenSaves" :key="i" class="black mt-5" @click="dataBill(coin)">
                <v-col cols="1">
                    <img :src="coin.logo" alt="">
                </v-col>
                <v-col>
                    <h4>{{coin.symbol}}</h4>
                    <h3>{{coin.name}}</h3>
                    <div>
                        <span 
                        v-if="token === coin.id && dataRegistrada"
                        :class="[(tokex.market_data.current_price.usd - dataRegistrada.valorDeCompra) < 0 ? 'red--text' : 'green--text']"
                        >
                        {{(tokex.market_data.current_price.usd - dataRegistrada.valorDeCompra).toFixed(2)}}
                        </span>
                    </div>
                </v-col>
                <v-col>
                    <h4>Valor</h4>
                    <span class="yellow--text">{{coin.current_price}} $</span>
                    <div>
                        <span
                        v-if="token === coin.id && dataRegistrada"
                            :class="[tokex.market_data.current_price.usd < coin.current_price ? 'red--text' : 'green--text']">
                            {{ tokex.market_data.current_price.usd }} $
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
                    <p>{{coin.fecha}}</p>
                    <!-- <span>{{(coins[0].current_price - dataRegistrada.valorDeCompra).toFixed(3)}}</span> -->
                </v-col>
                <v-col v-if="token === coin.id && dataRegistrada">
                    <h4>Margen</h4>
                    <!-- <span>-</span> -->
                    <!-- <span>{{coins[0].current_price - dataRegistrada.valorDeCompra}}</span> -->
                    <span
                        :class="[multiplo - coin.montoMoneda < 0 ? 'red--text' : 'green--text']">
                        {{(multiplo - coin.montoMoneda).toFixed(4)}} $
                    </span>
                    <div>
                        <span>{{dataRegistrada.fecha}}</span>
                        <span v-show="(coin.buyDay - dataRegistrada.currentDay) > 0" class="blue--text">>> {{coin.buyDay - dataRegistrada.currentDay}}</span>
                    </div>
                </v-col>
                <v-col cols="1">
                    <!-- <span>{{coin.buyDay - dataRegistrada.currentDay}}</span> -->
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
import CardCoin from '@/components/buscador/CardCoin'
export default {
    firebase: {
      post: datosRefe
    },
    components: {
        CardCoin
    },
    data: () => ({
        coins: [],
        coinex: [],
        billeteCoin: [],
        comprado: '',
        compradousd: '',
        busqueda: '',
        montoTarj: '',
        dataRegistrada: {},
        tablero: false,
        token: 'bitcoin',
        montoToken: null,
        montoDolar: null,
        tokex: '',
        valorCompra: '',
        multitoken: '',
        tokenBus: [],
        currentP: 0
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
            return this.tokex.market_data.current_price.usd * this.montoTarj
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
        this.$store.dispatch('rates/getTasaDeCambio4')
        this.buscartoken()
        this.coins = this.tasa3
        this.actualizarlista()
        console.log(this.tokenSaves)
        const starC = firebase.database().ref(datosRefe);
          starC.on('value', (snapshot) => {
            const data = snapshot.val();
            this.$store.dispatch('coins/sendinfo2', data)
            // console.log(data)
          });
    },
    methods: {
        buscarTokin() {
            this.tokenBus = this.tokenSaves.filter(coin => coin.name.includes(this.tokenBus))
        },
        clear() {
            this.montoDolar = '',
            this.montoToken = ''
        },
        async buscartoken() {
            const token = await axios.get('https://api.coingecko.com/api/v3/coins/' + `${this.token}`)
            this.tokex = token.data
            this.currentP = token.data.market_data.current_price.usd
            const tokedat = token.data
            this.valorCompra = this.currentP
            // console.log(this.tokex)
            this.$store.dispatch('coins/busqToken', tokedat)
        },
        actualizarlista() {
            this.$store.dispatch('rates/getTasaDeCambio3')
        },
        enviarinfo3() {
            const fecha = new Date()
            const data = {
                id: this.tokex.id,
                date: this.tokex.last_updated,
                fecha: fecha.toLocaleDateString(),
                buyDay: fecha.getDate(),
                logo: this.tokex.image.small,
                name: this.tokex.name,
                symbol: this.tokex.symbol,
                currentprice: this.tokex.market_data.current_price.usd,
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
            const fecha = new Date()
            const data = {
                fecha: fecha.toLocaleDateString(),
                buyDay: fecha.getDate(),
                id: this.tokex.id,
                name: this.tokex.name,
                logo: this.tokex.image.small,
                symbol: this.tokex.symbol,
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
            this.montoDolar = this.montoToken / this.tokex.market_data.current_price.usd
        },
        addMulti4() {
            this.montoToken = this.montoDolar * this.tokex.market_data.current_price.usd
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
            const fecha = new Date()
            this.token = ''
            const datos = {
                name: i.name,
                montoM: i.montoMoneda,
                montoUSD: i.montoUSD,
                valorDeCompra: i.current_price,
                id: i.id,
                fecha: fecha.toLocaleDateString(),
                currentDay: fecha.getDate(),
                logo: i.logo,
                symbol: i.symbol
            }
            this.dataRegistrada = datos
            this.token = datos.id
            this.buscartoken()
            this.montoTarj = datos.montoUSD
            this.montoToken = '',
            this.multitoken = ''
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