export default {
    template: `
        <li>
                <div class="message-avatar">
                    <img v-bind:src="getUserPictureUrl(message.sender_user_id)" v-bind:title="getUserName(message.sender_user_id)">
                </div>
                <div style="display: flex; align-items: center;"><i class="fas fa-arrow-right"></i></div>
                <div class="message-avatar">
                    <img v-bind:src="getUserPictureUrl(message.recipient_user_id)" v-bind:title="getUserName(message.recipient_user_id)">
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
        getUserPictureUrl(user_id){
            let self = this;
            let allUsers = this.$store.state.allUsers;

            let user = allUsers.filter(user => user.id == user_id);
            return user[0]['picture_url'];

            /*if(sender_user_id == this.auction_owner_id){
                return this.owner_picture_url;
            }
            if(current_user !== null){
                return current_user.picture_url
            }*/
        },
        getUserName(user_id){
            let self = this;
            let allUsers = this.$store.state.allUsers;

            let user = allUsers.filter(user => user.id == user_id);
            return user[0]['name'];

            /*if(sender_user_id == this.auction_owner_id){
                return this.owner_picture_url;
            }
            if(current_user !== null){
                return current_user.picture_url
            }*/
        }
    }
}