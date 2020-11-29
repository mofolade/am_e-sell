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
        /*auctions() {
            return this.$store.state.auctions
        }*/
    },
    async mounted(){
      let auctions = await fetch('/rest/auctionsinfo')
      auctions = await auctions.json()
      this.auctions = auctions;

      console.log(auctions);
    },

}