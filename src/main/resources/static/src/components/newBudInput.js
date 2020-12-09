import { sendMessage } from '../socket.js'

export default {
    template: `
        <form @submit.prevent="newBid">
            <div class="alert" id="errorMsg">
                <span class="closebtn" @click="closeAlert()">×</span>
                <span>Budet måste vara högre än nyvarande pris.</span>
            </div>
            <div class="bid-input">
                <input type="number" id="budInput" class="form-control" v-model="bid" name="bid" autocomplete="off" value="">
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
    props: ['auction_id','start_price','last_bid'],
    methods: {
        async newBid() {
            if(this.$store.state.user.id == null){
                window.location.href = '/loginForm';
            }
            else{
                let self = this;
                if(self.start_price >= this.bid || self.last_bid >= this.bid){
                    document.getElementById('errorMsg').style.display='block';
                }
                else{
                    let bid = {
                        auction_id: this.auction_id,
                        bidder_user_id: this.$store.state.user.id,
                        bid: this.bid,
                        creation_date: Date.now()
                    }
                    // clear input
                    this.bid = ''
                    // send bid with websocket
                    sendMessage(bid,'bid')
                }
            }
        },
        closeAlert(){
            document.getElementById('errorMsg').style.display='none';
        }
    }
}