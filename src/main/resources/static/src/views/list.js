import signInButton from '../components/loginForm.js'
import searchBar from '../components/searchBar.js'
import categoryButtons from '../components/categoryButtons.js'
import auctionItem from '../components/auctionItem.js'

export default {
  components: {
    signInButton,
    searchBar,
    categoryButtons,
    auctionItem
  },
    template: `
      <div class="content">
        <div id="search-categories-container">
          <searchBar />
          <categoryButtons />
          
        </div>
        <h2>Kategori</h2>
        <div class="d-flex flex-row align-items-center" id="auction-cover">
            <auctionItem 
                v-for="auction of auctions" 
                :auction="auction"
                :key="auction.id"
            />
        </div>
      </div>
    `,
    data () {
      return {
        auctions: [],
        error: null
      }
    },
    created () {
      // fetch the data when the view is created and the data is
      // already being observed
      this.getAuctionsByCategoryId()
    },
    watch: {
      // call again the method if the route changes
      '$route': 'getAuctionsByCategoryId'
    },
    methods: {
      async getAuctionsByCategoryId() {
      
        let category_id = this.$route.params.id

        let auctions = await fetch(`/rest/auctionsbycategoryid/`+ category_id);
        auctions = await auctions.json();
        this.auctions = auctions;
        console.log(auctions)
      },
    }
  }