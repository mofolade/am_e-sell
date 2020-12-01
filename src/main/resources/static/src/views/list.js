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
        <div class="status-link-box">
          <a href="" type="button" v-on:click.prevent="setStatus(1)">Pågående</a>
          <a href="" type="button"  v-on:click.prevent="setStatus(0)">Såld</a>
        </div>
        <div class="d-flex flex-row align-items-center" id="auction-cover">
            <auctionItem 
                v-for="auction of auctions" 
                :auction="auction"
                :lastbid = "lastBid(auction.id)"
                :key="auction.id"
            />
        </div>
      </div>
    `,
    data () {
      return {
        all_auctions: [],
        auctions: [],
        error: null,
        category_name: '',
        status_id:1
      }
    },
    created () {
      this.getAuctionsByCategoryId()
    },
    watch: {
      '$route': 'getAuctionsByCategoryId'
    },
    beforeUpdate() {      
      let currentCategory = this.$store.state.categories.filter(category => category.id == this.$route.params.id);
      if(currentCategory){
        this.category_name = currentCategory[0]['name'];
      }
    },
    methods: {
      lastBid(auction_id){
          this.bids = this.$store.state.bids;
          let bidsByAuctionId = this.$store.state.bids.filter(bid => bid.auction_id == auction_id);
          bidsByAuctionId.sort((m1, m2) => m1.creation_date > m2.creation_date ? -1 : 1)
          if(bidsByAuctionId[0]){
              return (bidsByAuctionId[0]['bid']);
          }
      },
      async getAuctionsByCategoryId() {      
        let category_id = this.$route.params.id         
        let auctions = await fetch(`/rest/auctionsbycategoryid/`+ category_id);
        var current_date = new Date(); // Your timezone!
        var current_timestamp = current_date.getTime();
        auctions = await auctions.json();        
        this.all_auctions = auctions;
        //pågående
        auctions = auctions.filter(auction => auction.stop_date > current_timestamp);
        this.auctions = auctions;
      },
      setStatus(status_id){
        this.status_id = status_id;
        let auctions=this.all_auctions
        var current_date = new Date(); // Your timezone!
        var current_timestamp = current_date.getTime();
        if(this.status_id == 1){ //pågående
          auctions = auctions.filter(auction => auction.stop_date > current_timestamp);
        }else if(this.status_id == 0){ // såld
          auctions = auctions.filter(auction => auction.stop_date <= current_timestamp);
        }
        this.auctions = auctions;
      }
    }
  }