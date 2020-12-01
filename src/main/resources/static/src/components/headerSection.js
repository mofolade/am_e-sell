import searchBar from '../components/searchBar.js'
import categoryButtons from '../components/categoryButtons.js'

export default {
  components: {
    searchBar,
    categoryButtons,
  },
    template: `
    <header class="bg">
    
      <!--picture id="headerpic">
        <source media="(max-width: 576px)" srcset="/src/assets/headerpic_576.jpg">
        <source media="(max-width: 768px)" srcset="/src/assets/headerpic_768.jpg">
        <source media="(max-width: 992px)" srcset="/src/assets/headerpic_992.jpg">
        <source media="(max-width: 1200px)" srcset="/src/assets/headerpic_1200.jpg">
        <source media="(max-width: 1366px)" srcset="/src/assets/headerpic_1366.jpg">
        <source media="(max-width: 1440px)" srcset="/src/assets/headerpic_1440.jpg">
        <source media="(max-width: 1680px)" srcset="/src/assets/headerpic_1680.jpg">
        <source media="(min-width: 1681px)" srcset="/src/assets/headerpic.jpg">
        <img src="/src/assets/headerpic.jpg">
      </-picture-->     
        <nav class="navbar">
          <router-link to="/">Auctionista</router-link>          
          <div id="navbar-r">
              <router-link to="/about">Om oss</router-link>
                <router-link v-if="!$store.state.user" to="/signUp">Bli medlem</router-link>              
                <router-link v-if="!$store.state.user" to="/loginForm" id="sign-in-link">Logga in</router-link>

                <router-link v-if="$store.state.user" to="/mypage" id="profil-link">Profil</router-link>
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