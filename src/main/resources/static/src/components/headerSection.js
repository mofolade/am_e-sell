import searchBar from '../components/searchBar.js'
import categoryButtons from '../components/categoryButtons.js'

export default {
  components: {
    searchBar,
    categoryButtons,
  },
    template: `
    <header class="bg">
        <nav class="navbar">
          <router-link to="/">Auctionista</router-link>          
          <div id="navbar-r">
              <router-link to="/about">Om oss</router-link>
                <router-link v-if="!$store.state.user" to="/signUp">Bli medlem</router-link>              
                <router-link v-if="!$store.state.user" to="/loginForm" id="sign-in-link">Logga in</router-link>

                <router-link v-if="$store.state.user" to="/mypage" id="profil-link" class="notification">Profil
                  <span class="badge">3</span>
                </router-link>
                
                <a href  v-if="$store.state.user" id="logout-link"  @click="logoutButton">Logga ut</a>
            </div>          
        </nav>        
        <div id="search-categories-container">
          <searchBar />
          <categoryButtons />          
        </div>
    </header>
    `,
    data() {
      return {
          visibleCheck: false,
      }
    },
    methods: {
      logoutButton() {
        fetch('/logout')
        this.$store.commit('setUser', null)
        window.location.href = '/';
      }
    }
}