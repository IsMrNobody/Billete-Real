export const state = () => ({
    pedidos: [],
    order: []
})

export const mutations = {
    datosRef(state, ref) {
        state.pedidos = ref
    },
    setOfer(state, order) {
        state.order = order
    }
}

export const actions = {
    sendRef({ commit }, ref) {
        commit('datosRef', ref)
    },
    setOfer({ commit }, order) {
        commit('setOfer', order)
    }
}
