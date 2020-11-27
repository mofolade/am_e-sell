export default {
    template: `
        <li>
                <div class="message-avatar">
                    <img  v-bind:src=message.sender_picture_url  alt="">
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
    props: ['message'],
    computed: {
        time() {
            return new Date(this.message.timestamp).toLocaleString()
        }
    }
}