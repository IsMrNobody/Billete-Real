export const state = () => ({
    info: [],
    toke: [],
    tokenbusq: []
})

export const mutations = {
    setInfo(state, info) {
        state.info = info
    },
    setInfos(state, infos) {
        state.tokenbusq = infos
    },
    setToken(state, tok) {
        state.toke = tok.data
    }
}

export const actions = {
    sendinfo({ commit }, info) {
        commit('setInfo', info)
    },
    sendinfo2({ commit }, infos) {
        commit('setInfos', infos)
    },
    busqToken({ commit }, tok) {
        commit('setToken', tok)
    }
}