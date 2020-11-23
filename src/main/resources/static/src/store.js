import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js'
import Vuex from 'https://cdn.jsdelivr.net/npm/vuex@3.1.2/dist/vuex.esm.browser.js'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    //messages: [],
    categories: [],
    //user: null
  },
  mutations: {
    /*setUser(state, user) {
      state.user = user
    },*/
    /*setMessages(state, messages) {
        state.messages = messages
    },*/
    setCategories(state, categories) {
        state.categories = categories
    },
    /*prependMessage(state, message) {
        state.messages.unshift(message)
    }*/
  },
  actions: {
    /*async fetchAllMessages(store) {
        let messages = await fetch('/rest/messages')
        messages = await messages.json()

        messages.sort((m1, m2) => m1.timestamp > m2.timestamp ? -1 : 1)

        console.log(messages);

        store.commit('setMessages', messages)
    },*/
    async fetchAllCategories(store) {
      let categories = await fetch('/rest/categories')
      categories = await categories.json()

      console.log(categories);
      store.commit('setCategories', categories)
  }
  }
})