import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
const state = { state: 0, user: null, data: null, house_list: [], _house_list: [], targetHouse: null, page_data: [], location: 'aaa', myhouse: [] }
const getters = {
    get_state(state, str) {
        return (state.state = str)
    },
    get_house_list(state) {
        return state.house_list
    },
    get_user(state, str) {
        return (state.user = str)
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
    set_page_data(state, data) {
        state.page_data = data
    },
    set_user_list(state, data) {
        state.data = data
    },
    set_state(state) {
        state.state == 1 ? (state.state = 0) : (state.state = 1)
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
    set_user(state, str) {
        state.user = str;
    },
    set_location(state, str) {
        state.location = str;

    },
    set_myhouse(state) {
        if (state.user == null) {
            return
        }
        state.myhouse = []
        for (var i in state.house_list) {
            if (state.house_list[i].landlord == state.user.user) {
                state.myhouse.push(state.house_list[i])
            }
        }
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
            commit("set_myhouse")
        });
    },
    request_myhouse({ commit }) {
        axios({
            methods: 'get',
            url: '/house_list'
        }).then(
            commit("set_myhouse")
        )
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