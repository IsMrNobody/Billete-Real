export const state = () => ({
    pedidos: []
})

export const mutations = {
    datosRef(state, ref) {
        state.pedidos = ref
    }
}

export const actions = {
    sendRef({ commit }, ref) {
        commit('datosRef', ref)
    }
}
