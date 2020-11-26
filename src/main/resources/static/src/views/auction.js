
import signInButton from '../components/loginForm.js'
import searchBar from '../components/searchBar.js'
import categoryButtons from '../components/categoryButtons.js'

export default {
  components: {
    signInButton,
    searchBar,
    categoryButtons,
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
                    <img v-bind:src="default_image" alt="">
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
                  <h2>{{name}}</h2>
                  <div class="d-flex justify-content-space-around mb15">
                    <router-link v-bind:to="'/list?id='+category_id">
                      <button class="category-item">
                          <div class="d-flex flex-row align-items-center">
                              <div class="icon-container">
                                  <img v-bind:src=category_image_path style="width: 20px;">
                              </div>
                              {{category_name}}
                          </div>
                      </button>
                    </router-link>
                    <section>
                      <div class="price-wrapper">
                        <span class="price">
                          <span class="price-label">Pris:</span>
                          <span class="price-value" itemprop="price" content=current_price>{{start_price}}</span>
                          <span class="price-unit" itemprop="priceCurrency" content="Ft">Kr</span>
                        </span>
                      </div>
                    </section>
                  </div>
                  <section class="bid-section">
                    <form>
                      <div class="bid-input">
                        <input type="number" class="form-control" v-model="newbid" name="newbid" autocomplete="off" pattern="[0-9]*" inputmode="numeric" value="">
                        <h4 style="top: 0px; right: 0px;">kr</h4>
                      </div>
                      <button data-test-submit-button="" data-bid-submit-button="" class="btn btn-lg btn-success btn-fluid mb-4 " type="submit"> 
                        Lägg bud
                      </button>
                    </form>
                  </section>
                  <div class="description-box">
                    <b>Beskrivning</b>
                    <p>{{description}}</p>
                  </div>
                </div>

              </li>
              <li class="flex-item">
                <div class="chat-box">
                  <h3 class="title">Om säljaren</h3>
                  <div class="auction-avatar-box ng-isolate-scope" data-advertiser="adReplyTemps.advertiser">
                    <a class="auction-avatar-img" style="background-image: url(&quot;/src/assets/default_avatar.png&quot;);"></a>
                    <div class="user-info">
                      <div class="name">Bidden user name</a></div>
                    </div>
                  </div>
                  <div class="contact-block">
                    <div class="contact-block-row-desktop">
                      <span class="mdi mdi-message-text-outline contact-block-row-icon-desktop"></span>
                      <span class="contact-block-row-label closed ng-binding ng-scope">
                        Chat
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
        name: '',
        category_id: 0,
        category_name: '',
        category_image_path: '',
        owner_uder_id: 0,
        start_date: 0,
        stop_date: 0,
        start_price: 0,
        description: '',
        current_price: 0 ,
        final_price: 0 ,
        bidden_user_id: 0,
        default_image: '',
        images: [],
        auction_id: 0,
        newbid: 0,
    }
  },
  async mounted() {
    
    let auction_id = this.$route.params.id

    let auction = await fetch(`/rest/auctioninfo/`+ auction_id);
    auction = await auction.json();

    this.name=auction.name;
    this.category_id=auction.category_id;
    this.owner_uder_id=auction.owner_uder_id;
    this.start_date=auction.start_date;
    this.stop_date=auction.stop_date;
    this.start_price=auction.start_price;
    this.description=auction.description;
    this.current_price=auction.current_price;
    this.final_price=auction.final_price;
    this.bidden_user_id=auction.bidden_user_id;
    this.category_name=auction.category_name;
    this.category_image_path = auction.category_image_path;
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
    }
  },
  }