export default {
    template: `
        <li>
                <div class="message-avatar">
                    <img src="/src/assets/eva.jpg" alt="">
                </div>
                <div class="message-body">
                    <div class="message-body-heading">
                        <div>{{ time }}</div>
                    </div>
                    <div class="message-body-content">
                        <div style="width: 80%;">{{ message.content }}</div>                
                        <router-link v-bind:to="'/auction/'+message.id">
                            <div class="auction-card-little-picture">
                                <img v-bind:src=message.default_image style="width: 100%;height: 5vw;object-fit: contain;">
                            </div>
                        </router-link>
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