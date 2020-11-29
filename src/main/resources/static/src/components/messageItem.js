export default {
    template: `
        <li>
                <div class="message-avatar">
                    <img v-bind:src="getUserPictureUrl(message.sender_user_id)">
                </div>
                <div class="message-body">
                    <div class="message-body-heading">
                        <div>{{ time }}</div>
                    </div>
                    <div>
                        {{ message.content }}
                    </div>
                </div>
        </li>
    `,
    props: ['message','owner_picture_url','auction_owner_id'],
    computed: {
        time() {
            return new Date(this.message.timestamp).toLocaleString()
        },
        getPictureUrl(){
            return this.senderPictureUrl;
        }
    },
    methods:{
        getUserPictureUrl(sender_user_id){
            let self = this;
            let current_user = this.$store.state.user;

            if(sender_user_id == this.auction_owner_id){
                return this.owner_picture_url;
            }
            if(current_user !== null){
                return current_user.picture_url
            }
        }
    }
}