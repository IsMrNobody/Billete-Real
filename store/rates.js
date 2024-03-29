import { traerTasa, traerTasa2, traerTasa3, traerTasa4 } from '~/plugins/yadio-api'

export const state = () => ({
    itemSelect: '',
    tasaSelected: [],
    data: [],
    totalTasa: '',
    tiposDeMonedas: ['USD', 'BTC'],
    ciudad: ['Anaco', 'Tigre'],
    tasa3: [],
    tasa4: [],
    tasas: [
        {
            nombre: 'dolartoday',
            icon: 'https://firebasestorage.googleapis.com/v0/b/ssr-webicultores.appspot.com/o/recursos%2Fdolartoday-logo.png?alt=media&token=d181c4a6-25f8-4042-b6f9-18d9da1a12fc',
            tasa: {}
        },
        {
            nombre: 'yadio',
            icon: 'https://firebasestorage.googleapis.com/v0/b/ssr-webicultores.appspot.com/o/recursos%2Fyadio-logo.png?alt=media&token=edb4af18-fa98-4ead-9f35-3795ea5a188b',
            tasa: {}
        }
    ]
})

export const mutations = {
    setTasaDeCambio(state, tasa) {
        state.tasas[1].tasa = tasa
    },
    setTasaDeCambio2(state, tasa2) {
        state.tasas[0].tasa = tasa2
    },
    setTasaDeCambio3(state, tasa3) {
        state.tasa3 = tasa3
    },
    setTasaDeCambio4(state, tasa4) {
        state.tasa4 = tasa4
    },
    // duda >>> ...state <<<
    addData(state, item) {
        state.data = [...state.data, item]
    },
    deletePedido(state, i) {
       state.data.reverse(i, 1).splice(i, 1)
    },
    setTotal(state, total) {
        state.totalTasa = total
    },
    addTasaSelect(state, item) {
        state.tasaSelected = item
    },
    addSelecti(state, item) {
        state.itemSelect = item.icon
    },
}

export const actions = {
    enviarTotal({ commit }, total) {
        commit('setTotal', total)
    },
    async getTasaDeCambio({ commit }) {
        try {
          const tasa = await traerTasa()
          commit('setTasaDeCambio', tasa)
        } catch (error) {
          error(message)
        }
    },
    async getTasaDeCambio2({ commit }) {
        try {
          const tasa2 = await traerTasa2()
          commit('setTasaDeCambio2', tasa2)
        } catch (error) {
          error(message)
        }
    },
    async getTasaDeCambio3({ commit }) {
        try {
          const tasa3 = await traerTasa3()
          commit('setTasaDeCambio3', tasa3)
        //   console.log(tasa3)
        } catch (error) {
          error(message)
        }
    },
    async getTasaDeCambio4({ commit }) {
        try {
          const tasa4 = await traerTasa4()
          commit('setTasaDeCambio4', tasa4)
        } catch (error) {
          error(message)
        }
    },
    sendData({ commit }, item) {
        commit('addData', item)
    },
    removePedido({ commit }, i) {
        commit('deletePedido', i)
    },
    addTasa({ commit }, item) {
        commit('addTasaSelect', item)
    },
    addSelec({ commit }, item) {
        commit('addSelecti', item)
    }
}