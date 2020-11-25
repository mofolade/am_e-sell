
export default {
  components: {
  },
  template: `
    <div class="auction-container">
      <div class="auction-column">
        <div class="auction-card-big">
          <ul class="flex-container">
            <li class="flex-item">
              <div class="auction-gallery">
                <div class="auction-big-image">
                  <img src="../uploads/5bc7c1fa-04b1-44e7-bdf8-60f0a608e8a4.jpg" alt="">
                </div>
                <div>Gallery</div>
              </div>
            </li>
            <li class="flex-item">
              <div class="auction-card-container">
                <h2>{{name}}</h2> 
                <section>
                  <div class="price-wrapper">
                  <span class="price">
                    <span class="price-label">Pris:</span>
                    <span class="price-value" itemprop="price" content=current_price>{{start_price}}</span>
                    <span class="price-unit" itemprop="priceCurrency" content="Ft">Kr</span>
                  </span>
                  </div>
                </section>
                <p class="auction-card-category">kategori</p> 
                <p>{{description}}</p>
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
  `,
  data() {
    return {
        name: '',
        category_id: '',
        owner_uder_id: 0,
        start_date: 0,
        stop_date: 0,
        start_price: 0,
        description: '',
        current_price: 0 ,
        final_price: 0 ,
        bidden_user_id: 0,
        images: [],
        auction_id: 0,
    }
  },
  async mounted() {
    
    let auction_id = this.$route.params.id
    console.log(auction_id)

    let auction = await fetch(`/rest/auction/`+ auction_id);
    auction = await auction.json();
    console.log(auction)
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

  },
  }