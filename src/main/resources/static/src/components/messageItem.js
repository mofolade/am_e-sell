export default {
    template: `
        <li>
                <div class="message-avatar">
                    <img src="/src/assets/eva.jpg" alt="">
                </div>
                <div class="message-body">
                    <div class="message-body-heading">
                        <div>{{ time }}</div>
                        <div>
                            <router-link v-bind:to="'/auction/'+message.auction_id">
                                {{ message.auction_id }}
                                
                            </router-link>
                        </div>
                    </div>
                    <p>
                    {{ message.content }}
                    </p>
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