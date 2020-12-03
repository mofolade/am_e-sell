import auctionItem from '../components/auctionItem.js'
import myProfilBox from '../components/myProfilBox.js'

export default {
  components: {
    auctionItem,
    myProfilBox
  },
    template: `
      <div class="content">
        <div class="about-section">
          <h2>Mina bud</h2>
        </div>
        <div id="myauction-container">
          <myProfilBox 
            :user=this.$store.state.user
          />
          <div>
            <div class="status-link-box">
              <a href="" type="button" v-on:click.prevent="setStatus(1)">Pågående</a>
              <a href="" type="button"  v-on:click.prevent="setStatus(0)">Såld</a>
            </div>
            <div class="d-flex flex-row align-items-center" id="auction-cover">
                <auctionItem 
                    v-for="auction of auctions" 
                    :auction="auction"
                    :lastbid = "lastBid(auction.id)"
                    :userbid = "userBid(auction.id)"
                    :key="auction.id"
                />
            </div>
          </div>
        </div>
      </div>
    `,
    data () {
      return {
        all_auctions: [],
        error: null,
        category_name: '',
        status_id:1,
        bids:[],
        user_id: null
      }
    },
    computed: {
        auctions(status_id){
            let user = this.$store.state.user;
            let bids = this.$store.state.bids;
            let auctions = this.$store.state.auctions;
            if(user && bids && auctions){
                let bids = this.$store.state.bids;
                this.user_id = user['id'];
                let auctionsByUserId = bids.filter(bid => bid.bidder_user_id == user['id']);

                const filteredArr = auctionsByUserId.reduce((acc, current) => {
                    const x = acc.find(item => item.auction_id === current.auction_id);
                    if (!x) {
                      return acc.concat([current]);
                    } else {
                      return acc;
                    }
                  }, []);

                let userAuctions=[];
                let count=0;
                for (var key in filteredArr) {
                    var auctionObject = filteredArr[key];
                    let auction = auctions.filter(auction => auction.id === auctionObject['auction_id']);
                    userAuctions[count]=auction[0];
                    count=count+1;
                }
                this.all_auctions=userAuctions;
                var current_date = new Date(); // Your timezone!
                var current_timestamp = current_date.getTime();
                if(this.status_id == 1){ //pågående
                    userAuctions = userAuctions.filter(auction => auction.stop_date > current_timestamp);
                }else if(this.status_id == 0){ // såld
                    userAuctions = userAuctions.filter(auction => auction.stop_date <= current_timestamp);
                }
                return(userAuctions);
            }
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
        },
        userBid(auction_id){
            this.bids = this.$store.state.bids;
            let bidsByAuctionId = this.$store.state.bids.filter(bid => bid.auction_id == auction_id && bid.bidder_user_id == this.user_id);
            bidsByAuctionId.sort((m1, m2) => m1.creation_date > m2.creation_date ? -1 : 1)
            if(bidsByAuctionId[0]){
                return (bidsByAuctionId[0]['bid']);
            }
        },
        setStatus(status_id){
          this.status_id = status_id;
        },
        
    }
}