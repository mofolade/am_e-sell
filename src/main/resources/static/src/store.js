import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js'
import Vuex from 'https://cdn.jsdelivr.net/npm/vuex@3.1.2/dist/vuex.esm.browser.js'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    messages: [],
    messagesByUserId: [],
    categories: [],
    auctions: [],
    user: null
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setMessages(state, messages) {
        state.messages = messages
    },
    setMessagesByUserId(state, messages){
      state.messagesByUserId = messages
    },
    setCategories(state, categories) {
      state.categories = categories
    },
    setAuctions(state, auctions){
      state.auctions = auctions
    },
    prependMessage(state, message) {
        state.messages.unshift(message)
    }
  },
  actions: {
    async fetchUser(store){
      let user = await fetch('/whoami')
      user = await user.json()
      console.log(user);
      store.commit('setUser', user)
    },
    async fetchAllMessages(store) {
        let messages = await fetch('/rest/messages')
        messages = await messages.json()

        messages.sort((m1, m2) => m1.timestamp > m2.timestamp ? -1 : 1)

        //console.log(messages);

        store.commit('setMessages', messages)
    },
    async fetchAllMessagesByUserId(store) {
        let user = await fetch('/whoami')
        user = await user.json()
        //console.log(user.id)
        //let messages = await fetch(`/rest/auctionmessagesbyuserid/`+ user.id);
        let messages = await fetch('/rest/messagesbyuserid/'+ user.id);
        messages = await messages.json();
        messages.sort((m1, m2) => m1.timestamp > m2.timestamp ? -1 : 1)
        //console.log(messages)
        //this.messages = messages;
        store.commit('setMessagesByUserId', messages)
    },
    async fetchAllCategories(store) {
      let categories = await fetch('/rest/categories')
      categories = await categories.json()

      //console.log(categories);
      store.commit('setCategories', categories)
    },
    async fetchAllAuctions(store) {
      let auctions = await fetch('/rest/auctionsinfo')
      auctions = await auctions.json()

      console.log(auctions);
      store.commit('setAuctions', auctions)
    }
  }
})