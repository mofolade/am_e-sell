import signInButton from '../components/loginForm.js'
import categoryButtons from '../components/categoryButtons.js'

export default {
  components: {
    signInButton,
    categoryButtons
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
        <h2>Kategori</h2>
      </div>
    `,
    data () {
      return {
        auctions: {},
        error: null
      }
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