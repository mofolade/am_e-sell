import signInButton from '../components/loginForm.js'
import auctionCards from '../components/auctionCards.js'
import messageList from '../components/messageList.js'
import newMessageInput from '../components/newMessageInput.js'

export default {
  components: {
    signInButton,
    auctionCards,
    newMessageInput,
    messageList
  },
    template: `
      <div class="content">
        <div>
          <auctionCards />
        </div>
      </div>
    `,
    /*
        <newMessageInput :auction_id="37" :owner_user_id="46" />
        <messageList />
     */
  }