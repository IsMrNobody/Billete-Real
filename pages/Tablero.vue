<template>
    <div>
        <v-container>
            <v-col class="pl-4" align="center">
                <v-text-field @keyup="search()" v-model="busqueda" label="coins"></v-text-field>
                <v-text-field @keyup="addMulti2()" v-model="comprado" label="monto"></v-text-field>
                <v-text-field @keyup="addMulti()" v-model="compradousd" label="usd"></v-text-field>
                <v-btn @click="enviarinfo()">Enviar</v-btn>
            </v-col>
            
            <!-- <h2>{{busqueda}}</h2> -->
                <v-row v-for="(coin, index) in coins" :key="index">
                    <!-- <span class="ml-4">$ {{coin.current_price * comprado}}</span> -->
                    <!-- <span class="ml-4">$ {{coin.current_price * compradousd}}</span> -->
                    <v-container v-show="busqueda">
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
                <!-- ///////////// -->
                <v-row v-for="(coin, i) in infoCard" :key="i" class="black mt-5" @click="dataBill(coin)">
                    <v-col>
                        <h4>{{coin[0].coin[0].symbol}}</h4>
                        <h3>{{coin[0].coin[0].name}}</h3>
                    </v-col>
                    <v-col>
                        <h4>Valor</h4>
                        <h3 class="yellow--text">$ {{coin[0].coin[0].current_price}}</h3>
                        <span
                         v-if="busqueda === coin[0].coin[0].name"
                         :class="[coins[0].current_price < coin[0].coin[0].current_price ? 'red--text' : 'green--text']">{{ coins[0].current_price }}</span>
                    </v-col>
                    <v-col>
                        <h4>Monto en token</h4>
                        <h3 class="blue--text"> {{coin[0].montoMoneda}}</h3>
                        <!-- <span>{{coin[0].coin[0].last_updated}}</span> -->
                        <!-- <span>{{((coins[0].current_price * coin[0].montoMoneda) - coin[0].montoUSD) - coin[0].coin[0].current_price}}</span> -->
                    </v-col>
                    <v-col>
                        <h4>Total</h4>
                        <h3>$ {{coin[0].montoUSD}}</h3>
                        <span
                            v-if="busqueda === coin[0].coin[0].name"
                            :class="[coins[0].current_price * coin[0].montoMoneda < coin[0].montoUSD ? 'red--text' : 'green--text']">{{coins[0].current_price * coin[0].montoMoneda}}
                        </span>
                    </v-col>
                    <v-col>
                        <h4>Margen</h4>
                        <h3 v-if="busqueda === coin[0].coin[0].name">-</h3>
                        <span 
                            v-if="busqueda === coin[0].coin[0].name"
                            :class="[(coins[0].current_price * coin[0].montoMoneda) - coin[0].montoUSD < 0 ? 'red--text' : 'green--text']">{{(coins[0].current_price * coin[0].montoMoneda) - coin[0].montoUSD}}
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
import firebase from 'firebase/app'
import { db } from '@/plugins/firebase'
const datosRef = db.ref('billeteTemp')
// const datosRefe = db.ref('coingek')
export default {
    firebase: {
      post: datosRef
    },
    data: () => ({
        coins: [],
        coinex: [],
        billeteCoin: [],
        comprado: '',
        compradousd: '',
        busqueda: ''
    }),
    computed: {
        tasa3() {
           return this.$store.state.rates.tasa3
        },
        infoCard() {
            return this.$store.state.coins.info
        },
        multiplo() {
            return this.coins
        },
        totalMargen() {
            const data = this.infoCard
            return data
        }
    },
    created() {
        this.coins = this.tasa3
        const starCountRef = firebase.database().ref(datosRef);
          starCountRef.on('value', (snapshot) => {
            const data = snapshot.val();
            this.$store.dispatch('coins/sendinfo', {...data})
            // console.log(this.infoCard)
          });
    },
    methods: {
        search() {
            // console.log(this.coins)
            this.comprado = ''
            this.compradousd = ''
            this.coins = this.tasa3.filter(coin => coin.name.toLowerCase().includes(this.busqueda.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(this.busqueda.toLowerCase()))
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
            // console.log(this.tasa3)
            this.compradousd = this.comprado * this.coins[0].current_price
        },
        deleted(i) {
            datosRef.child(i).remove()
        },
        dataBill(i) {
            const data = i[0].coin[0].name
            this.busqueda = data
            this.search()
            console.log(data)
            console.log(this.multiplo)
        }
    }
}
</script>