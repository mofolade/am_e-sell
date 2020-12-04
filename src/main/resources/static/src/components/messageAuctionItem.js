import messageItem from './messageItem.js'

export default {
    components: {
        messageItem
    },
    template: `
        <li class="d-flex">
            <div class="d-flex auction-message-box">
                <div class="message-auction-picture"  v-bind:class="auctionInformationVisible ? 'isVisble' : 'notVisible'">
                    <router-link v-bind:to="'/auction/'+auction.id">
                        <div class="auction-card-little-picture">
                        <img v-bind:src=auction.default_image style="width: 100%;height: 5vw;object-fit: contain;">
                        </div>
                    </router-link>
                </div>
                <div class="auction-message-box">
                    <div v-bind:class="auctionInformationVisible ? 'isVisble' : 'notVisible'">
                        <router-link v-bind:to="'/list?id='+auction.category_id">
                        <button class="category-item">
                            <div class="d-flex flex-row align-items-center">
                                <div class="icon-container">
                                    <img v-bind:src=auction.category_image_path style="width: 20px;">
                                </div>
                                {{auction.category_name}}
                            </div>
                        </button>
                        </router-link>                    
                        <b>{{ auction.name }}</b>
                    </div>
                    <p  v-bind:class="messageBtnVisible ? 'isVisble' : 'notVisible'">
                        <button class="collapsible" data-toggle="collapse" v-bind:data-target="'#collapse'+auction.id" aria-expanded="false" aria-controls="collapseExample">
                            Meddelande
                        </button>
                    </p>
                    <div class="collapse-content" v-bind:id="'collapse'+auction.id">
                        <ul class="message-list">
                        <messageItem 
                              v-for="message of messages"
                              :message="message"
                              :auction_id="auction.id"
                              :auction_owner_id = "auction.owner_user_id"
                              :owner_picture_url="auction.owner_picture_url"
                              :answers="answers(message.id)"
                              :key="message.id"
                          />
                        </ul>
                    </div>
                </div>
            </div>            
        </li>
    `,
    data() {
        return {
            messageBtnVisible: false
        }
    },
    props: ['auction','auctionInformationVisible'],
    computed: {
        time() {
            return new Date(this.message.timestamp).toLocaleString()
        },
        messages(){
            let self = this;
            let auction_id = this.auction.id
            let allMessages = this.$store.state.messages
            let messageByAuctionId = allMessages.filter(message => message.auction_id == auction_id && message.message_id == null);
            if(messageByAuctionId['length'] > 0){
                this.messageBtnVisible=true;
            }
            return messageByAuctionId;
        },
    },
    methods:{        
        answers(message_id){
            let allMessages = this.$store.state.messages
            let answerByMessageId = allMessages.filter(message => message.message_id == message_id);
            return answerByMessageId;
        }
    }
}