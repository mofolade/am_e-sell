import footerSection from './components/footerSection.js'
import headerSection from './components/headerSection.js'

export default {
  components: {
    headerSection,
    footerSection
  },
  methods: {
  },
    template: `
      <div id="app">
        <headerSection />
        <main id="wrapper">
          <router-view />
        </main>
        <footerSection />
      </div>
    `,
    async created() {
      this.$store.dispatch('fetchAllCategories')  
      
    }
  }