export default {
    template: `
        <div class="auction-card">
            <div class="auction-item-container">
                <div class="auction-card-little-picture">
                    <router-link v-bind:to="'/auction/'+auction.id">
                        <img v-bind:src=auction.default_image style="width: 100%;height: 12vw;object-fit: contain;">
                    </router-link>
                </div>
                <div class="d-flex flex-direction-column justify-content-space-around">
                    <div class="auction-card-cat-name mb15">
                        <router-link v-bind:to="'/list/'+auction.category_id">
                            <button class="category-item">
                                <div class="icon-container-little">
                                <img v-bind:src=auction.category_image_path style="width: 20px;">
                                </div>
                            </button>
                        </router-link>
                        <router-link v-bind:to="'/auction/'+auction.id">
                            <span class="mb15"><b>{{auction.name}}</b></span>
                        </router-link>
                    </div>
                    <div class="auction-little-box-category">
                        <div>
                            <span class="price-label">Pris:</span>
                            <span>{{auction.current_price}}</span>
                            <span class="price-unit" itemprop="priceCurrency" content="Kr">Kr</span>
                        </div>
                        <span  v-bind:class="visibleCheck ? 'isVisble' : 'notVisible'">
                            <router-link v-bind:to="'/auction/'+auction.id">
                                <button data-bid-submit-button="" class="bid-little-btn" type="submit"> 
                                    Lägg bud
                                </button>
                            </router-link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            visibleCheck: false
        }
    },
    props: ['auction'],    
    async mounted() {    
        let self = this;
        
        //new bid input visible or not visible
        if(this.$store.state.user.id !== self.auction.owner_user_id){
        this.visibleCheck = true;
        }else{
        this.visibleCheck = false;
        }

    }
}