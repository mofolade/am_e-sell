import messageAuctionItem from './messageAuctionItem.js'

export default {
    components: {
        messageAuctionItem,
        current_user: null
    },
    template: `
        <div>
            <div class="message-wrapper-title">Mina meddelanden</div>
            <div class="messages-box">
                <ul>
                <messageAuctionItem
                    v-for="auction of auctions" 
                    :auction="auction"
                    :key="auction.id"
                    :auctionInformationVisible="true"
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
    /*methods: {
        async auctions(user){
            let auctions = await fetch(`/rest/auctionsmessagesbyuserid/`+ user.id);
            auctions = await auctions.json();
            return auctions;
        }
    },*/
    async mounted() {
        let user = await fetch('/whoami')
        user = await user.json()
        if(user.status !== 404){
            let auctions = await fetch(`/rest/auctionsmessagesbyuserid/`+ user.id);
            auctions = await auctions.json();
            auctions.sort((m1, m2) => m1.stop_date > m2.stop_date ? -1 : 1)
            this.auctions = auctions;
        }                   
        
    },
}
