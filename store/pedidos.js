export const state = () => ({
    pedidos: {},
    order: [],
    history: ''
})

export const mutations = {
    datosRef(state, ref) {
        state.pedidos = ref
    },
    setOfer(state, order) {
        state.order = order
    },
    setOrder(state, data) {
        state.history = data
    }
}

export const actions = {
    sendRef({ commit }, ref) {
        commit('datosRef', ref)
    },
    setOfer({ commit }, order) {
        commit('setOfer', order)
    },
    orderHistory({ commit }, data) {
        commit('setOrder', data)
    }
}
