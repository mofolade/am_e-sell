import messageItem from './messageItem.js'

export default {
    components: {
        messageItem
    },
    template: `
        <div>
        <div class="messages-box">
            <ul>
                <messageItem 
                    v-for="message of messages" 
                    :message="message"
                    :key="message.id"
                />
            </ul>
        </div>
    `,
    computed: {
        messages() {
            return this.$store.state.messages
        }
    }
}