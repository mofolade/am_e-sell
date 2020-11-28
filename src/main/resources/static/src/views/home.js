import signInButton from '../components/loginForm.js'
import searchBar from '../components/searchBar.js'
import categoryButtons from '../components/categoryButtons.js'
import auctionCards from '../components/auctionCards.js'
import messageList from '../components/messageList.js'
import newMessageInput from '../components/newMessageInput.js'

export default {
  components: {
    signInButton,
    searchBar,
    categoryButtons,
    auctionCards,
    newMessageInput,
    messageList
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
        <newMessageInput :auction_id="37" :owner_user_id="46" />
        <messageList />
      </div>
    `
  }