import auctionItem from '../components/auctionItem.js'

export default {
  components: {
    auctionItem
  },
    template: `
      <div id="search-wrapper">
        <div class="category-list-section">
          <h2>"{{this.$route.params.text}}" i alla kategorier</h2>
        </div>
        <div id="auction-cover">
            <auctionItem 
                v-for="auction of auctions" 
                :auction="auction"
                :lastbid = "lastBid(auction.id)"
                :key="auction.id"
            />
        </div>
      </div>
    `,
    data() {
        return {
            auctions: []
        }
    },
    async mounted() {    
      let search_text = this.$route.params.text
      search_text = search_text.toUpperCase();

      let auctions = await fetch(`/rest/auctionsinfo/search/`+ search_text);
      auctions = await auctions.json();
      this.auctions = auctions;

      //new bid input and chat visible or not visible
      if(this.$store.state.user !== null){
        if(this.$store.state.user.id !== auction.owner_user_id){
          this.visibleCheck = true;
        }else{
          this.visibleCheck = false;
        }
      }
      else{
          this.visibleCheck = false;
      }    
    },
    methods:{
        lastBid(auction_id){
            this.bids = this.$store.state.bids;
            let bidsByAuctionId = this.$store.state.bids.filter(bid => bid.auction_id == auction_id);
            bidsByAuctionId.sort((m1, m2) => m1.creation_date > m2.creation_date ? -1 : 1)
            if(bidsByAuctionId[0]){
                return (bidsByAuctionId[0]['bid']);
            }
        }
    }
  }