import { sendMessage } from '../socket.js'

export default {
    template: `
        <form action="" class="chat-form-container" @submit.prevent="newMessage">
            <textarea  v-model="messageText" placeholder="Skriv meddelande.." name="msg" required></textarea>
            <input type="hidden" v-model="sender_user_id">
            <input type="hidden" v-model="owner_user_id">
            <input type="hidden" v-model="this.auction_id">
            <button type="submit" class="btn" v-on:click="newMessage()">Skicka</button>
            <button type="button" class="btn cancel" v-on:click="closeForm()">Stäng</button>
        </form>
    `,
    data() {
        return {
            messageText: '',
            sender_user_id: 0
        }
    },
    props: ['auction_id','owner_user_id'],
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
            let message = {
                sender_user_id: this.senderUserId,
                recipient_user_id: this.owner_user_id,
                content: this.messageText,
                auction_id : this.auction_id,
                timestamp: Date.now()
            }

            // clear input
            this.messageText = ''

            // send message with websocket
            sendMessage(message)

            // await fetch('/rest/messages', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json'},
            //     body: JSON.stringify(message)
            // })
            
        }
    }
}