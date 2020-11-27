import messageItem from './messageItem.js'

export default {
    components: {
        messageItem,
        messages: []
    },
    template: `
        <li class="d-flex">
            <div class="d-flex auction-message-box">
                <div class="message-auction-picture">
                    <router-link v-bind:to="'/auction/'+auction.id">
                        <div class="auction-card-little-picture">
                        <img v-bind:src=auction.default_image style="width: 100%;height: 5vw;object-fit: contain;">
                        </div>
                    </router-link>
                </div>
                <div class="auction-message-box">
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
                    <p>
                        <button class="collapsible" data-toggle="collapse" v-bind:data-target="'#collapse'+auction.id" aria-expanded="false" aria-controls="collapseExample">
                            Meddelande
                        </button>
                    </p>
                    <div class="collapse-content" v-bind:id="'collapse'+auction.id">
                        <ul>
                        <messageItem 
                            v-for="message of messages" 
                            :message="message"
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
            messages: []
        }
    },
    props: ['auction'],
    computed: {
        time() {
            return new Date(this.message.timestamp).toLocaleString()
        },
    },
    async mounted() {        
        let messages = await fetch(`/rest/auctionmessagesbyauctionid/`+ this.auction.id+`/`+ this.$store.state.user.id);
        messages = await messages.json();
        this.messages = messages;
    },
}