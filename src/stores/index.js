import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showModal: false,

    users: [],

    user: {}
  },

  getters: {
    SHOW_MODAL: state => { return state.showModal },

    USERS: state => { return state.users },

    USER: state => { return state.user },

    ALL_USERS: state => {
      let all_users = []
      let getAllUsers = users => {
        for(let user of users) {
          all_users.push({ id: user.id, name: user.name, phone: user.phone, subordinates: user.subordinates })
          if (user.subordinates) {
            if (user.subordinates.length === 1) {
              all_users.push(user.subordinates[0])
            } else {
              for (let subordinate of user.subordinates) { getAllUsers(subordinate) }
            }
          }
        }
        return all_users
      }
      return getAllUsers(state.users)
    }
  },

  mutations: {
    toggleModal(state) { state.showModal = !state.showModal },

    setUsers(state, val) { state.users = val },

    setUser(state, val) { state.user = val }
  },

  actions: {
    getUsers({ state, commit }) {
      if (state.users.length) { return }
      if (localStorage.users) {
        let all_users = JSON.parse(localStorage.getItem("users"))
        commit("setUsers", all_users)
      }
    },

    getUser({ state, commit }) {
      if (state.user) { return }
      if (localStorage.user) {
        commit("setUser", localStorage.user)
        commit("toggleModal")
      }
    },

    createUser({ state, getters, commit, dispatch }) {
      let user =  { id: getters['ALL_USERS'].length + 1, name: state.user.name, phone: state.user.phone }
      if (state.user.chief_id) {
        let chief = getters["ALL_USERS"].find(user => user.id === state.user.chief_id)
        chief.subordinates ? chief.subordinates.push(user) : chief.subordinates = new Array(user)
        let users = JSON.parse(localStorage.getItem("users"))
        const updateUsers = users => {
          users.map(user => {
            if (user.id !== chief.id && user.subordinates) {
              updateUsers(user.subordinates)
            } else {
              return chief
            }
          })
        }
        let updated_users = updateUsers(users)
        localStorage.setItem("users", JSON.stringify(updated_users))
        commit("setUsers", updated_users)
      } else {
        if (localStorage.users) {
          let users = JSON.parse(localStorage.getItem("users"))
          users.push(user)
          localStorage.setItem("users", JSON.stringify(users))
          commit("setUsers", users)
        } else {
          let user_alone = new Array(user)
          localStorage.setItem("users", JSON.stringify(user_alone))
          commit("setUsers", user_alone)
        }
      }
      dispatch("closeModal")
    },

    closeModal({ commit }) {
      commit("setUser", {})
      commit("toggleModal")
    }
  }
})
