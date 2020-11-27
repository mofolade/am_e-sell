//import { sendBid } from '../socket.js'

export default {
    template: `
        <form @submit.prevent="newBid">
            <div class="bid-input">
                <input type="number" class="form-control" v-model="bid" name="bid" autocomplete="off" value="">
                <h4 style="top: 0px; right: 0px;">kr</h4>
            </div>
            <button data-test-submit-button="" data-bid-submit-button="" class="btn btn-lg btn-success btn-fluid mb-4 " type="submit"> 
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
                user_id: this.$store.state.user.id,
                new_bid: this.bid
            }

            // clear input
            this.bid = ''

            // send bid with websocket
            //sendBid(bid)
            
        }
    }
}