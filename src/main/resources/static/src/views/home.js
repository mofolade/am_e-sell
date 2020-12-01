import signInButton from '../components/loginForm.js'
import auctionCards from '../components/auctionCards.js'

export default {
  components: {
    signInButton,
    auctionCards
  },
    template: `
      <div class="content">
        <div>
          <auctionCards />
        </div>
      </div>
    `,
  }