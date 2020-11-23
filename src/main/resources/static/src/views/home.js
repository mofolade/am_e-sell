import signInButton from '../components/loginForm.js'
import categoryButtons from '../components/categoryButtons.js'
import auctionCards from '../components/auctionCards.js'

export default {
  components: {
    signInButton,
    categoryButtons,
    auctionCards
  },
    template: `
      <div class="content">
        <div id="search-categories-container">
          <div id="search-cover">
            <form method="get" action="">
              <div class="tb">
                <div class="td"><input type="text" placeholder="Search" required></div>
                <div class="td" id="s-cover">
                  <button type="submit" class="search-button">
                    <div id="s-circle"></div>
                    <span></span>
                  </button>
                </div>
              </div>
            </form>
          </div>

          <categoryButtons />
          
        </div>
        <div>
          <auctionCards />
        </div>
      </div>
    `
  }