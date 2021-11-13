<template>
    <div>
        <v-container>
            <v-row>
                <v-row>
                    <v-col align="center" cols>
                        <v-text-field
                            :append-outer-icon="'mdi-magnify'"
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
                    <v-col cols sm="6">
                        <CardCoin :dataRe="dataRegistrada" :tokex="tokex" :current="currentP" :iconF="iconFlecha" />
                    </v-col>
                </v-row>
                <v-dialog
                    max-width="374"
                    overlay-opacity="0.7"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-row class="ma-1 text-center">
                            <v-col v-for="(coine, c) in tokenSaves" :key="c">
                                <v-avatar
                                    @click="dataBill(coine)"
                                    v-bind="attrs"
                                    v-on="on">
                                    <img :src="coine.logo" alt="">
                                </v-avatar>
                                <p>{{coine.symbol}}</p>
                                <!-- <p>{{c}}</p> -->
                            </v-col>
                        </v-row>
                    </template>
                    <template>
                        <CardCoin :dataRe="dataRegistrada" :tokex="tokex" :current="currentP" :iconF="iconFlecha" />
                        <v-btn>Eliminar</v-btn>
                    </template>
                </v-dialog>
            </v-row>
            
            <!-- <h2>{{busqueda}}</h2> -->
            <v-spacer></v-spacer>
            <!-- ///////////// -->
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
        token: '',
        montoToken: null,
        montoDolar: null,
        tokex: '',
        valorCompra: '',
        multitoken: '',
        tokenBus: [],
        currentP: 0,
        iconFlecha: null
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
        },
        tokid() {
            return this.tokenSaves['-Mo11CFviqFhWVDT3ucz']
        }
    },
    created() {
        this.token = 'bitcoin'
        this.$store.dispatch('rates/getTasaDeCambio4')
        setTimeout(() => {
            this.dataBill(this.tokid)
            // this.enviarinfo2()
            console.log(this.tokid)
        }, 3000)
        setInterval(() => {
            this.buscartoken()
            console.log(this.valorCompra)
            localStorage.valorA = this.currentP
        }, 5000)
        setInterval(() => {
            localStorage.valorC = this.valorCompra
            console.log(localStorage.valorC)
        }, 30000)

        setInterval(() => {
            if (localStorage.valorA  > localStorage.valorC) {
                this.iconFlecha = true
            } else {
                this.iconFlecha = false
            }
            console.log(this.iconFlecha)
        }, 28000)
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
        // tokenids() {
        //     this.tokenSaves.forEach((element, index) => {
        //         console.log(index)
        //     })
        // },
        buscarTokin() {
            this.tokenBus = this.tokenSaves.filter(coin => coin.name.includes(this.tokenBus))
            console.log(this.tokenBus)
        },
        clear() {
            this.montoDolar = '',
            this.montoToken = ''
        },
        async buscartoken() {
            const token = await axios.get('https://api.coingecko.com/api/v3/coins/' + `${this.token}`)
            this.tokex = token.data
            this.currentP = token.data.market_data.current_price.usd
            this.valorCompra = this.currentP
            // console.log(this.tokex)
            const tokedat = token.data
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
            this.multitoken = '',
            console.log(this.tokid)
        }
    }
}
</script>

<style scoped>
.colorbuscar {
    background-color: rgba(0, 0, 0, 0.5);
}
</style>