import { sendBid } from '../socketbid.js'

export default {
    template: `
        <form @submit.prevent="newBid">
            <div class="bid-input">
                <input type="number" class="form-control" v-model="bid" name="bid" autocomplete="off" value="">
                <input type="hidden" v-model="auction_id">
                <h4 style="top: 0px; right: 0px;">kr</h4>
            </div>
            <button data-test-submit-button="" data-bid-submit-button="" class="bid-btn btn btn-lg btn-fluid mb-4 " type="submit"> 
            Lägg bud
            </button>
        </form>
    `,
    data() {
        return {
            bid: null
        }
    },
    computed: {
    },
    props: ['auction_id'],
    methods: {
        async newBid() {
            let bid = {
                auction_id: this.auction_id,
                bidder_user_id: this.$store.state.user.id,
                bid: this.bid,
                creation_date: Date.now()
            }

            // clear input
            this.bid = ''

            // send bid with websocket
            sendBid(bid)
            
        }
    }
}