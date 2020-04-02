import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
const state = { data: null, house_list: [], _house_list: [], targetHouse: null, page_data: [], location: 'aaa' }
const getters = {
    get_house_list(state) {
        return state.house_list
    }
}

const mutations = {
    reset_house_list(state) {
        state.house_list = state._house_list

    },
    set_house_list(state, data) {
        state.house_list = data
    },
    set__house_list(state) {
        state._house_list = state.house_list
    },
    set_page_data(state, data) {
        state.page_data = data
    },
    set_targetHouse(state, str) {
        state.targetHouse = str;
        var length = state.house_list.length;
        for (let i = 0; i < length; i++) {
            if (state.house_list[i].id == str) {
                state.targetHouse = state.house_list[i]
            }
        }
    },
    set_location(state, str) {
        state.location = str;

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
            commit("set_page_data", results.data.slice(0, 10))
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
        commit("set_page_data", data.slice(0, 10))
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
        commit("set_page_data", data.slice(0, 10))
    },
    turn_page({ state, commit }, currentPage) {
        commit("set_page_data", state.house_list.slice(10 * (currentPage - 1), 10 * currentPage))
    },
    change_location({ state, commit }, newlocation) {
        commit("set_location", newlocation)
    }
}

export default new Vuex.Store({
    state, getters, mutations, actions
})