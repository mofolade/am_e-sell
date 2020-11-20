import footerSection from './components/footerSection.js'
import headerSection from './components/headerSection.js'

export default {
  components: {
    headerSection,
    footerSection
  },
  methods: {
    showNavMenu: function() {
      document.getElementById("close-menu-button").style.visibility = "visible";
      document.getElementById("mySidenav").style.width = "200px";
      document.getElementById("show-menu-button").style.display = "none";
    },
    closeNavMenu: function() {
      document.getElementById("mySidenav").style.width = "0px";
      document.getElementById("show-menu-button").style.display = "block";
      document.getElementById("close-menu-button").style.visibility = "hidden";
    },
  },
    template: `
      <div id="app">
        <headerSection />
        <main id="wrapper">
          <router-view />
        </main>
        <footerSection />
      </div>
    `
  }