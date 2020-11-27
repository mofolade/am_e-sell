import { sendMessage } from '../socket.js'

export default {
    template: `
        <form @submit.prevent="newMessage">
            <input v-model="messageText" placeholder="type new message..">
            <input type="hidden" v-model="sender_user_id">
            <input type="hidden" v-model="owner_user_id">
            <input type="hidden" v-model="auction_id">
            <button>📩</button>
        </form>
    `,
    data() {
        return {
            messageText: '',
            auction_id: 0,
            sender_user_id: 0,
            owner_user_id: 0
        }
    },
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
                user_id: this.owner_user_id,
                content: this.messageText,
                auction_id : this.auctionId
                // timestamp: Date.now()
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