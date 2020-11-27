import searchBar from '../components/searchBar.js'
import categoryButtons from '../components/categoryButtons.js'
import newBudInput from '../components/newBudInput.js'

export default {
  components: {
    searchBar,
    categoryButtons,
    newBudInput
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
                  <div class="d-flex justify-content-space-around mb15">
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
                    <section>
                      <div class="price-wrapper">
                        <span class="price">
                          <span class="price-label">Pris:</span>
                          <span class="price-value" itemprop="price" content=current_price>{{auction.start_price}}</span>
                          <span class="price-unit" itemprop="priceCurrency" content="Ft">Kr</span>
                        </span>
                      </div>
                    </section>
                  </div>
                  <section class="bid-section">
                    <newBudInput />
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
                  <div class="contact-block">
                    <div class="contact-block-row-desktop">
                      <span class="mdi mdi-message-text-outline contact-block-row-icon-desktop"></span>
                      <span class="contact-block-row-label closed ng-binding ng-scope">
                      <button class="open-button" v-on:click="openForm()">Chat</button>
                      <div class="chat-popup" id="myChatBoxForm">
                        <form action="" class="chat-form-container">
                          <textarea placeholder="Skriv meddelande.." name="msg" required></textarea>
                          <button type="submit" class="btn">Skicka</button>
                          <button type="button" class="btn cancel" v-on:click="closeForm()">Stäng</button>
                        </form>
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
      this.default_image = images[1];
      this.images=images;
    }else{
      this.default_image = images;
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
    }
  },
  }