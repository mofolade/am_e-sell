import newBudInput from '../components/newBudInput.js'
import newMessageInput from '../components/newMessageInput.js'
import messageItem from '../components/messageItem.js'
import auctionGallery from '../components/auctionGallery.js'
import messageAuctionItem from '../components/messageAuctionItem.js'

export default {
  components: {
    newBudInput,
    newMessageInput,
    messageItem,
    auctionGallery,
    messageAuctionItem
  },
  template: `
      <div class="auction-container">
        <div class="auction-column">
          <div class="auction-card-big">
            <ul class="flex-container">
              <auctionGallery
                :default_image ="auction.default_image"
                :images="images"
              />
              <li class="flex-item">
                <div class="auction-card-container">
                  <h2>{{auction.name}}</h2>
                  <div class="auction-cat-pris-date-info-box">
                    <router-link v-bind:to="'/list/'+auction.category_id">
                      <button class="category-item">
                          <div class="d-flex flex-row align-items-center">
                              <div class="icon-container">
                                  <img v-bind:src=auction.category_image_path style="width: 20px;">
                              </div>
                              {{auction.category_name}}
                          </div>
                      </button>
                    </router-link>
                    <section>
                      <div class="price-wrapper">
                        <span class="">
                          <span class="price-label">Pris:</span>
                          <span class="price-value" itemprop="price" content=current_price>{{lastBid()}}</span>
                          <span class="price-unit" itemprop="priceCurrency" content="Kr">Kr</span>
                        </span>
                        <span class="startprice">
                          <span class="price-label">(Utropspris:</span>
                          <span content=start_price>{{auction.start_price}}</span>
                          <span class="price-unit" content="Kr">Kr)</span>
                        </span>
                      </div>
                    </section>                      
                    <section>
                      <label>Slutar:</label>
                      <div class="countdown-box" v-bind:id="'countdown'+auction.id">{{countDownAuction()}}{{stopDateTime}}</div>
                    </section>
                  </div>
                  <section class="bid-section" v-bind:class="bidVisibleCheck ? 'isVisble' : 'notVisible'">
                    <newBudInput 
                      :auction_id="auction.id"
                      :start_price="auction.start_price"
                      :last_bid="lastBid()"
                    />
                  </section>
                  <span  v-bind:class="this.loginVisibleCheck ? 'isVisble' : 'notVisible'">
                      <button v-on:click="redirectLoginForm()" data-bid-submit-button="" class="bid-btn btn btn-lg btn-fluid mb-4 " type="submit"> 
                          Lägg bud
                      </button>
                  </span>
                  <div class="description-box">
                    <b>Beskrivning</b>
                    <p>{{auction.description}}</p>
                  </div>
                </div>
                <div class="contact-block" v-bind:class="ownerMessageListVisibleCheck ? 'notVisible' : 'isVisble'">
                  <div class="contact-block-row-desktop">
                    <span class="mdi mdi-message-text-outline contact-block-row-icon-desktop"></span>
                    <span class="contact-block-row-label closed ng-binding ng-scope">
                      <button class="open-button" v-on:click="openForm(auction.id)">Chat för säljaren</button>
                      <button style="display:none;" id="chatCloseBtn" type="button" class="btn cancel" v-on:click="closeForm(auction.id)">Stäng</button>
                      <div class="chat-popup" v-bind:id="'myChatBoxForm'+auction.id">
                        <newMessageInput :auction_id="auction.id" :owner_user_id="auction.owner_user_id" />
                        <div class="messages-box-little">
                          <ul>
                          <messageItem 
                              v-for="message of messages"
                              :message="message"
                              :auction_owner_id = "auction.owner_user_id"
                              :owner_picture_url="auction.owner_picture_url"
                              :answers="answers(message.id)"
                              :key="message.id"
                          />
                          </ul>
                        </div>
                      </div>
                    </span>
                  </div>
                </div>
                <!-- Owner message list -->
                <div v-if="ownerMessageListVisibleCheck == true">
                  <div class="messages-box">
                    <ul>
                    <messageAuctionItem
                        :auction="auction"
                        :auctionInformationVisible="false"
                    />
                    </ul>
                  </div>
                </div>
              </li>
              <li class="flex-item">
                <div class="chat-box" style="margin: 0px 15px; min-width: 300px;">
                  <h2 class="title">Om säljaren</h2>
                  <div class="auction-avatar-box ng-isolate-scope" data-advertiser="adReplyTemps.advertiser">
                    <div class="message-avatar">
                      <img  v-bind:src=auction.owner_picture_url  alt="">
                    </div>
                    <div class="user-info">
                      <div class="name">{{auction.owner_user_name}}</a></div>
                    </div>
                  </div>
                  
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
  `,
  data() {
    return {
        auction: [],
        images: [],
        auction_id: 0,
        chatVisibleCheck: false,
        bidVisibleCheck: false,
        loginVisibleCheck: false,
        ownerMessageListVisibleCheck: false,
        GlobalVar: 0
    }
  },
  computed: {
    stopDateTime() {
      return new Date(this.auction.stop_date).toLocaleString()
    },
    messages(){
      let auction_id = this.$route.params.id
      let allMessages = this.$store.state.messages
      let messageByAuctionId = allMessages.filter(message => message.auction_id == auction_id && message.message_id == null);
      return messageByAuctionId;
    }
  },
  async mounted() {    
    let auction_id = this.$route.params.id
    let auction = await fetch(`/rest/auctioninfo/`+ auction_id);
    auction = await auction.json();
    this.auction = auction;
    this.name=auction.name;
    let images = auction.images.split(',');
    var comma_index = 0;
    comma_index = auction.images.indexOf(",");

    if(comma_index > 0){
      this.images=images;
    }
    //new bid input and chat visible or not visible
    if(this.$store.state.currentUserId > 0){
      if(this.$store.state.user['id'] !== auction.owner_user_id){
        this.bidVisibleCheck = true;
      }else{        
        this.ownerMessageListVisibleCheck = true;
        this.bidVisibleCheck = false;
      }
      this.chatVisibleCheck = true;
    }
    else{
        this.loginVisibleCheck = true;
        this.bidVisibleCheck = false;
    }
  },
  methods: {
    redirectLoginForm(){
        window.location.href = '/loginForm';
    },
    async openForm(auction_id) {
      if(this.$store.state.user.id == null){
        window.location.href = '/loginForm';
      }else{
        document.getElementById("myChatBoxForm"+auction_id).style.display = "block";
        document.getElementById("chatCloseBtn").style.display = "block";
      }
    },
    countDownAuction(){
      let self = this;
      var countDownDate = new Date(self.auction.stop_date).getTime();

      // Update the count down every 1 second
      this.GlobalVar = setInterval(function() {
        // Get today's date and time
        var now = new Date().getTime();          
        // Find the distance between now and the count down date
        var distance = countDownDate - now;          
        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);        

        if (distance < 0) {
          clearInterval(this.GlobalVar);
          document.getElementById("countdown"+self.auction.id).innerHTML = "Avslutad";
        }else if(days < 1){
          document.getElementById("countdown"+self.auction.id).innerHTML = hours + "h "
          + minutes + "m " + seconds + "s ";          
        }        
      }, 1000);
    },
    lastBid(){
      this.bids = this.$store.state.bids;
      let bidsByAuctionId = this.$store.state.bids.filter(bid => bid.auction_id == this.$route.params.id);
      bidsByAuctionId.sort((m1, m2) => m1.creation_date > m2.creation_date ? -1 : 1)
      if(bidsByAuctionId[0]){
          return (bidsByAuctionId[0]['bid']);
      }
      else {
        return this.auction.start_price;
      }
    },  
    closeForm(auction_id){
      console.log(auction_id)
      document.getElementById("myChatBoxForm"+auction_id).style.display = "none";
      document.getElementById("chatCloseBtn").style.display = "none";
    },
    answers(message_id){
      let allMessages = this.$store.state.messages
      let answerByMessageId = allMessages.filter(message => message.message_id == message_id);
      return answerByMessageId;
    }
  },
  beforeDestroy () {
      clearInterval(this.GlobalVar)
  }
}