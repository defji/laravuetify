import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export const store = new Vuex.Store({
    state: {
        nightmode: false,
    },
    getters: {
    },
    mutations: {
    },
    plugins: [createPersistedState()]
});