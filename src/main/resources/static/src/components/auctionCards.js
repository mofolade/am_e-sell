import auctionItem from './auctionItem.js'

export default {
    components: {
        auctionItem
    },
    template: `
        <div id="auction-cover">
            <auctionItem 
                v-for="auction of auctions" 
                :auction="auction"
                :lastbid = "lastBid(auction.id)"
                :key="auction.id"
            />
        </div>
    `,
    data() {
        return {
            auctions: []
        }
    },
    computed: {
    },
    async mounted(){
      let auctions = await fetch('/rest/auctionsinfo')
      auctions = await auctions.json()
      this.auctions = auctions;
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