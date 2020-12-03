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
                    <div class="auction-card-cat-name mb5">
                        <router-link v-bind:to="'/list/'+auction.category_id">
                            <button class="category-item">
                                <div class="icon-container-little">
                                <img v-bind:src=auction.category_image_path style="width: 20px;" 
                                     v-bind:alt=auction.category_name />
                                </div>
                            </button>
                        </router-link>
                        <router-link v-bind:to="'/auction/'+auction.id">
                            <span class="mb15"><b>{{auction.name}}</b></span>
                        </router-link>
                    </div>
                    <div class="end-date-box mb5">
                        <span>Slutar:</span>                            
                        <span class="countdown-box" v-bind:id="'countdown'+auction.id">{{countDown(auction.stop_date,auction.id)}}{{stopDateTime}}</span>
                    </div>
                    <div class="auction-little-box-category">
                        <div class="price-box">
                            <span class="price-label">Pris:</span>
                            <span class="price" v-if="lastbid">{{lastbid}}</span>
                            <span class="price" v-else >{{auction.start_price}}</span>
                            <span class="price-unit" itemprop="priceCurrency" content="Kr">Kr</span>
                            <span class="userbud" v-if="checkUserBid(lastbid,userbid)">({{checkUserBid(lastbid,userbid)}})</span>
                        </div>
                        <div v-bind:style="status(auction.stop_date)">
                            <span v-bind:class="visibleCheck ? 'isVisble' : 'notVisible'">
                                <router-link v-bind:to="'/auction/'+auction.id">
                                    <button data-bid-submit-button="" class="bid-little-btn" type="submit"> 
                                        Lägg bud
                                    </button>
                                </router-link>
                            </span>
                            <span  v-bind:class="visibleCheck ? 'notVisible' : 'isVisble'">
                                <button v-on:click="redirectLoginForm()" data-bid-submit-button="" class="bid-little-btn" type="submit"> 
                                    Lägg bud
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            visibleCheck: false,
            GlobalVar: 0,
        }
    },
    props: ['auction','lastbid','userbid'],    
    async mounted() {   
        let self = this;
        //new bid input visible or not visible
        if(this.$store.state.user !== null){
            if(this.$store.state.user.id !== self.auction.owner_user_id){
                this.visibleCheck = true;
            }else{
                this.visibleCheck = false;
            }
        }
        else{
            this.visibleCheck = false;
        }        

    },
    computed:{
        stopDateTime() {
            return new Date(this.auction.stop_date).toLocaleDateString();
        },
    },
    methods:{
        status(stop_date){
            var current_date = new Date(); // Your timezone!
            var current_timestamp = current_date.getTime();
            if(stop_date <= current_timestamp){
                return "display:none;";
            }else{
                return "display:block;";
            }
        },
        redirectLoginForm(){
            window.location.href = '/loginForm';
        },
        countDown(stop_date,auction_id){
            var countDownDate = new Date(stop_date).getTime();
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
            // If the count down is over, write some text 
            if (distance < 0) {
                clearInterval(this.GlobalVar);
                if(document.getElementById("countdown"+auction_id)){
                    document.getElementById("countdown"+auction_id).innerHTML = "Avslutad";
                }
            }else if(days < 1){
                if(document.getElementById("countdown"+auction_id)){
                    document.getElementById("countdown"+auction_id).innerHTML = hours + " h "+ minutes + " m " + seconds + "s ";
                }
            }
          }, 1000);
        },
        checkUserBid(lastbid,userbid){
            if(userbid && lastbid && (lastbid !== userbid)){
                return "ditt bud: "+userbid;
            }
        }
    },
    beforeDestroy () {
        this.GlobalVar=null;
        clearInterval(this.GlobalVar)
    }
}