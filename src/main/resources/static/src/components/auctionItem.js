export default {
    template: `
        <router-link v-bind:to="'/auction/'+auction.id">
            <div class="auction-card">
                <!--img v-bind:src="auction.image_path" alt="" style="width:100%"-->
                <div class="auction-item-container">
                    <h4><b>{{auction.name}}</b></h4>
                    <p>{{auction.start_price}} kr</p>
                </div>
            </div>
        </router-link>
    `,
    props: ['auction']
}