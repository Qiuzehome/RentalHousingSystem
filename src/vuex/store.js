import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
const state = { state: 0, user: null, data: null, house_list: [], _house_list: [], targetHouse: null }
const getters = {
    get_state(state, str) {
        return (state.state = str)
    },
    get_house_list(state) {
        return state.house_list
    },
    get_user(state, str) {
        return (state.user = str)
    },
    get_house_list(state) {
        return state.house_list;
    }
}

const mutations = {
    set_state(state, prop, data) {
        state[prop] = data
    },
    reset_house_list(state) {
        state.house_list = state._house_list
    },
    set_house_list(state, data) {
        state.house_list = data
    },
    set__house_list(state) {
        state._house_list = state.house_list
    },
    set_user_list(state, data) {
        state.data = data
    },
    set_state(state) {
        state.state == 1 ? (state.state = 0) : (state.state = 1)
    },
    set_targetHouse(state, str) {
        state.targetHouse = str;
    },
    set_user(state, str) {
        state.user = str;
    }
}

const actions = {
    request_house_list({ commit }) {
        axios({
            methods: "get",
            url: "/house_list"
        }).then(results => {
            commit('set_house_list', results.data)
            commit("set__house_list")
        });
    },
    request_user_list({ commit }) {
        axios({
            methods: "get",
            url: "/"
        }).then(results => {
            commit("set_user_list", results.data);
        });
    },
    filterMsg({ state, commit }, { minPrice, maxPrice, minRoom, maxRoom }) {
        commit("reset_house_list")
        var data = [];
        var length = state.house_list.length;
        for (let i = 0; i < length; i++) {
            if (
                minPrice < state.house_list[i].price &&
                state.house_list[i].price <= maxPrice &&
                minRoom < state.house_list[i].room.split("/")[0] &&
                state.house_list[i].room.split("/")[0] <= maxRoom
            ) {
                data.push(state.house_list[i]);
            }
        }
        commit("set_house_list", data)
    },
    keyword({ state, commit }, val) {
        commit("reset_house_list")
        let length = state.house_list.length;
        var data = [];
        for (let i = 0; i < length; i++) {
            if (state.house_list[i].tittle.includes(val)) {
                data.push(state.house_list[i]);
            }
        }
        commit("set_house_list", data)
    }
}

export default new Vuex.Store({
    state, getters, mutations, actions
})