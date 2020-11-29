import categoryButtons from '../components/categoryButtons.js'
import auctionItem from '../components/auctionItem.js'

export default {
  components: {
    auctionItem
  },
    template: `
      <div id="list-wrapper">
        <div class="category-list-section">
          <h2>{{this.category_name}}</h2>
        </div>
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
        error: null,
        category_name: ''
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
    beforeUpdate() {      
      let currentCategory = this.$store.state.categories.filter(category => category.id == this.$route.params.id);
      if(currentCategory){
        this.category_name = currentCategory[0]['name'];
      }
    },
    methods: {
      async getAuctionsByCategoryId() {
      
        let category_id = this.$route.params.id
         
        let auctions = await fetch(`/rest/auctionsbycategoryid/`+ category_id);
        auctions = await auctions.json();
        this.auctions = auctions;
      },
    }
  }