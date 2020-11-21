import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js'
import Vuex from 'https://cdn.jsdelivr.net/npm/vuex@3.1.2/dist/vuex.esm.browser.js'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    messages: [],
    user: null
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setMessages(state, messages) {
        state.messages = messages
    },
    prependMessage(state, message) {
        state.messages.unshift(message)
    }
  },
  actions: {
    async fetchAllMessages(store) {
        let messages = await fetch('/rest/messages')
        messages = await messages.json()

        messages.sort((m1, m2) => m1.timestamp > m2.timestamp ? -1 : 1)

        console.log(messages);

        store.commit('setMessages', messages)
    }
  }
})