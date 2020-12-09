import { sendMessage } from '../socket.js'

export default {
    template: `
        <form action="" class="chat-form-container" @submit.prevent="newMessage()">
            <textarea  v-model="messageText" placeholder="Skriv meddelande.." name="msg"></textarea>
            <input type="hidden" v-model="sender_user_id">
            <input type="hidden" v-model="owner_user_id">
            <input type="hidden" v-model="this.auction_id">            
            <input type="hidden" v-model="message_id">
            <button type="submit" class="btn">Skicka</button>
        </form>
    `,
    data() {
        return {
            messageText: '',
            sender_user_id: 0
        }
    },
    props: ['auction_id','owner_user_id','recipient_user_id','message_id'],
    computed: {
        senderUserId: {
            get() {
                return this.$store.state.user.id
            },
            set(val) {
                this.messageSenderUserId = val
            }
        }
    },
    methods: {
        async newMessage() {
            let recipientUserId=this.owner_user_id;
            if(this.recipient_user_id){
                recipientUserId=this.recipient_user_id;
            }else{
                recipientUserId = this.owner_user_id;
            }
            let message = {
                sender_user_id: this.senderUserId,
                recipient_user_id: recipientUserId,
                content: this.messageText,
                auction_id : this.auction_id,
                message_id : this.message_id,
                timestamp: Date.now()
            }

            this.messageText = ''
            // send message with websocket
            sendMessage(message,'message')
        },
    }
}