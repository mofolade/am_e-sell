import messageAuctionItem from './messageAuctionItem.js'

export default {
    components: {
        messageAuctionItem,
        current_user: null
    },
    template: `
        <div>
            <div class="message-wrapper-title">Meddelande</div>
            <div class="messages-box">
                <ul>
                <messageAuctionItem 
                    v-for="auction of auctions" 
                    :auction="auction"
                    :key="auction.id"
                />
                </ul>
            </div>
        </div>
    `,
    data() {
        return {
            auctions: []
        }
    },
    computed: {
        user() {
            return this.$store.state.user
        },
        auctionsByUserId() {
            return this.$store.state.auctions
        }
    },
    async mounted() {        
        let auctions = await fetch(`/rest/auctionsmessagesbyuserid/`+ this.$store.state.user.id);
        auctions = await auctions.json();
        this.auctions = auctions;
    },
    methods: {
        
    }
}
