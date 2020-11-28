import searchBar from '../components/searchBar.js'
import categoryButtons from '../components/categoryButtons.js'
import newBudInput from '../components/newBudInput.js'
import newMessageInput from '../components/newMessageInput.js'
import messageItem from '../components/messageItem.js'

export default {
  components: {
    searchBar,
    categoryButtons,
    newBudInput,
    newMessageInput,
    messageItem
  },
  template: `
    <div>
      <div id="search-categories-container">
        <searchBar />
        <categoryButtons />
        
      </div>
      <div class="auction-container">
        <div class="auction-column">
          <div class="auction-card-big">
            <ul class="flex-container">
              <li class="flex-item">
                <div class="auction-gallery">
                  <div id="expandedImg" class="auction-big-image">
                    <img v-bind:src="auction.default_image" alt="">
                  </div>
                  <div class="gallery-row">
                    <div class="gallery-column" v-for="image of images" :key="image.image_path">
                      <img v-bind:src=image style="width:100%" v-on:click="myGalleryFunction(image)">
                    </div>
                  </div>
                </div>
              </li>
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
                          <span class="price-value" itemprop="price" content=current_price>{{auction.current_price}}</span>
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
                      {{stopDateTime}}
                      <div id="countdown"></div>
                    </section>
                  </div>
                  <section class="bid-section" v-bind:class="visibleCheck ? 'isVisble' : 'notVisible'">
                    <newBudInput 
                      :auction_id="auction.id"
                    />
                  </section>
                  <div class="description-box">
                    <b>Beskrivning</b>
                    <p>{{auction.description}}</p>
                  </div>
                </div>

              </li>
              <li class="flex-item">
                <div class="chat-box">
                  <h2 class="title">Om säljaren</h2>
                  <div class="auction-avatar-box ng-isolate-scope" data-advertiser="adReplyTemps.advertiser">
                    <div class="message-avatar">
                      <img  v-bind:src=auction.owner_picture_url  alt="">
                    </div>
                    <div class="user-info">
                      <div class="name">{{auction.owner_user_name}}</a></div>
                    </div>
                  </div>
                  <div class="contact-block" v-bind:class="visibleCheck ? 'isVisble' : 'notVisible'">
                    <div class="contact-block-row-desktop">
                      <span class="mdi mdi-message-text-outline contact-block-row-icon-desktop"></span>
                      <span class="contact-block-row-label closed ng-binding ng-scope">
                      <button class="open-button" v-on:click="openForm()">Chat</button>
                      <div class="chat-popup" id="myChatBoxForm">
                        <newMessageInput :auction_id="auction.id" :owner_user_id="auction.owner_user_id" />
                        <div class="messages-box-little">
                          <ul>
                          <messageItem 
                              v-for="message of messages"
                              :message="message"
                              :auction_owner_id = "auction.owner_user_id"
                              :owner_picture_url="auction.owner_picture_url"
                              :key="message.id"
                          />
                          </ul>
                      </div>
                      </div>
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>      
  </div>
  `,
  data() {
    return {
        auction: [],
        images: [],
        auction_id: 0,
        visibleCheck: false
    }
  },
  created() {
    this.countDown();
  },
  computed: {
    user() {
        return this.$store.state.user
    },
    stopDateTime() {
      return new Date(this.auction.stop_date).toLocaleString()
    },
    messages(){
      let auction_id = this.$route.params.id
      let allMessages = this.$store.state.messages
      let messageByAuctionId = allMessages.filter(function (message) {  
          return message.auction_id == auction_id
      });
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
    //new bid input visible or not visible
    if(this.$store.state.user.id !== auction.owner_user_id){
      this.visibleCheck = true;
    }else{
      this.visibleCheck = false;
    }

  },
  methods: {
    myGalleryFunction(image){
      var expandImg = document.getElementById("expandedImg");
      document.getElementById("expandedImg").innerHTML='<img src="'+image+'" alt="">';
    },
    openForm() {
      document.getElementById("myChatBoxForm").style.display = "block";
    },    
    closeForm() {
      document.getElementById("myChatBoxForm").style.display = "none";
    },
    countDown(stop_date){
      console.log(stop_date)
      var countDownDate = new Date("Jan 5, 2021 15:37:25").getTime();

      // Update the count down every 1 second
      var x = setInterval(function() {

        // Get today's date and time
        var now = new Date().getTime();
          
        // Find the distance between now and the count down date
        var distance = countDownDate - now;
          
        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
          
        // Output the result in an element with id="demo"
        document.getElementById("countdown").innerHTML = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";
          
        // If the count down is over, write some text 
        if (distance < 0) {
          clearInterval(x);
          document.getElementById("countdown").innerHTML = "EXPIRED";
        }
      }, 1000);
    }
  },
  }