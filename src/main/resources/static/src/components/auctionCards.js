import auctionItem from './auctionItem.js'

export default {
    components: {
        auctionItem
    },
    template: `
        <div>
            <div class="status-link-box">
                <a href="" type="button" v-on:click.prevent="setStatus(1)">Pågående</a>
                <a href="" type="button"  v-on:click.prevent="setStatus(0)">Såld</a>
            </div>
            <div id="auction-cover">
                <auctionItem 
                    v-for="auction of auctions" 
                    :auction="auction"
                    :lastbid = "lastBid(auction.id)"
                    :userbid = "userBid(auction.id)"
                    :key="auction.id"
                />
            </div>
        </div>
    `,
    data() {
        return {
            all_auctions: [],
            user_id: null,
            status_id:1,
        }
    },    
    computed: {
        auctions(){
            let user = this.$store.state.user;
            if(user){
                this.user_id = user['id'];
            }
            let bids = this.$store.state.bids;
            let auctions = this.$store.state.auctions;

            if(auctions){            
                var current_date = new Date(); // Your timezone!
                var current_timestamp = current_date.getTime();
                this.all_auctions = auctions;
                if(this.status_id == 1){ //pågående
                    auctions = auctions.filter(auction => auction.stop_date > current_timestamp);
                }else if(this.status_id == 0){ // såld
                    auctions = auctions.filter(auction => auction.stop_date <= current_timestamp);
                }
            }
            return(auctions);
        },
    },
    methods:{
        lastBid(auction_id){
            let bidsByAuctionId = this.$store.state.bids.filter(bid => bid.auction_id == auction_id);
            bidsByAuctionId.sort((m1, m2) => m1.creation_date > m2.creation_date ? -1 : 1)
            if(bidsByAuctionId[0]){
                return (bidsByAuctionId[0]['bid']);
            }
        },
        userBid(auction_id){
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