import signInButton from '../components/loginForm.js'
import searchBar from '../components/searchBar.js'
import categoryButtons from '../components/categoryButtons.js'
import auctionCards from '../components/auctionCards.js'
export default {
  components: {
    signInButton,
    searchBar,
    categoryButtons,
    auctionCards
  },
    template: `
      <div class="content">
        <div id="search-categories-container">
          <searchBar />

          <categoryButtons />
          
        </div>
        <div>
          <auctionCards />
        </div>
      </div>
    `
  }