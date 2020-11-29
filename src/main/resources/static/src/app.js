import footerSection from './components/footerSection.js'
import headerSection from './components/headerSection.js'

export default {
  components: {
    headerSection,
    footerSection
  },
  data() {
    return {
        user: []
    }
  },
  mounted(){
      this.user = this.$store.state.user;
  },
  methods: {
  },
    template: `
      <div id="app">
        <main>
          <headerSection :user="user" />
            <div id="wrapper">
              <router-view />
            </div>
          <footerSection />
        </main>
      </div>
    `,
    async created() {
      this.$store.dispatch('fetchUser')
      this.$store.dispatch('fetchAllCategories')
      this.$store.dispatch('fetchAllMessages')
      this.$store.dispatch('fetchAllBids')
      this.$store.dispatch('fetchAllMessagesByUserId')
    },
    mounted(){

    }
  }