import messageItem2 from './messageItem2.js'

export default {
    components: {
        messageItem2
    },
    template: `
        <div class="messages-box">
            <ul>
                <messageItem2 
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