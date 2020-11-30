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
           auctions:[]
        }
    },
    props: ['user'],
    computed: {
    },
    async mounted() { 
        let user = await fetch('/whoami')
        user = await user.json()
        if(user.status !== 404){
            let auctions = await fetch(`/rest/auctionsmessagesbyuserid/`+ user.id);
            auctions = await auctions.json();
            this.auctions = auctions;
        }                   
        
    },
}
