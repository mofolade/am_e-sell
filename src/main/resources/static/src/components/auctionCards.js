import auctionItem from './auctionItem.js'

export default {
    components: {
        auctionItem
    },
    template: `
        <div class="d-flex flex-row align-items-center" id="auction-cover">
            <auctionItem 
                v-for="auction of auctions" 
                :auction="auction"
                :key="auction.id"
            />
        </div>
    `,
    computed: {
        auctions() {
            return this.$store.state.auctions
        }
    }
}