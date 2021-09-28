export const state = () => ({
    info: []
})

export const mutations = {
    setInfo(state, info) {
        state.info = info
    }
}

export const actions = {
    sendinfo({ commit }, info) {
        commit('setInfo', info)
    }
}