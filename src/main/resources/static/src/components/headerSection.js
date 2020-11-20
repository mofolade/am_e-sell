export default {
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
          <div class="dropdown">
            <button class="dropbtn" id="show-menu-button" @click="showNavMenu()">☰ 
              <i class="fa fa-caret-down"></i>
            </button>
            <button class="dropbtn" id="close-menu-button" @click="closeNavMenu()">X
              <i class="fa fa-caret-down"></i>
            </button>
            <div id="myDropdown">
              <a href="#" class="border-bottom">Sista chansen</a>
              <a href="#" class="border-bottom">Pågående</a>
              <a href="#" class="border-bottom">Såld</a>
            </div>
          </div> 
        </nav>
    </header>
    `,
    methods: {
      showNavMenu() {
        document.getElementById("myDropdown").style.visibility = "visible";
        document.getElementById("show-menu-button").style.visibility = "hidden";
        document.getElementById("show-menu-button").style.display = "none";
        document.getElementById("close-menu-button").style.display = "block";
        document.getElementById("close-menu-button").style.visibility = "visible";
      },
      closeNavMenu() {
        document.getElementById("myDropdown").style.visibility = "hidden";
        document.getElementById("show-menu-button").style.display = "block";
        document.getElementById("show-menu-button").style.visibility = "visible";
        document.getElementById("close-menu-button").style.visibility = "hidden";
        document.getElementById("close-menu-button").style.display = "none";
      }
    }
}