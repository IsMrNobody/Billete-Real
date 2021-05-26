export const state = () => ({
    metros: ''
})

export const mutations = {
    setDistance(state, m) {
        state.metros = m
    }
}

export const actions = {
    medirDistancia({ commit }, m) {
        commit('setDistance', m)
    }
}