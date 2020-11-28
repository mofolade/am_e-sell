export default {
    template: `
        <div class="message-item">
            time: {{ time }} <br>
            <strong>{{ message.sender_user_id }}</strong>: {{ message.content }}
        </div>
    `,
    props: ['message'],
    computed: {
        time() {
            return new Date(this.message.timestamp).toLocaleString()
        }
    }
}