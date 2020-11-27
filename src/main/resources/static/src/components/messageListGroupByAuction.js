import messageItem from './messageItem.js'

export default {
    components: {
        messageItem,
        current_user: null,
        messages: []
    },
    template: `
        <div>
            <span>Meddelande</span>
            <div class="messages-box">
                <ul>
                <messageItem 
                    v-for="message of messages" 
                    :message="message"
                    :key="message.id"
                />
                </ul>
            </div>
        </div>
    `,
    computed: {
        user() {
            return this.$store.state.user
        },
        messages() {
            return this.$store.state.messages.filter(message => message.sender_user_id === this.$store.state.user.id)
        }
    },
    methods: {
        
    }
}
