import newMessageInput from '../components/newMessageInput.js'
import { sendMessage } from '../socket.js'

export default {
    components: {
        newMessageInput
    },
    template: `
    <div>
        <li class="message-list-item">
            <div class="message-avatar">
                <img v-bind:src="getUserPictureUrl(message.sender_user_id)" v-bind:title="getUserName(message.sender_user_id)">
            </div>
            <div class="message-body">
                <div class="message-body-heading">
                    <div>{{ time(message.timestamp) }}</div>
                </div>
                <div>
                    {{ message.content }}
                </div>
            </div>
            <div class="contact-block-row-desktop" v-if="message.sender_user_id !== auction_owner_id && currentUserId == auction_owner_id">
                <span class="mdi mdi-message-text-outline contact-block-row-icon-desktop"></span>    
                <span class="contact-block-row-label closed ng-binding ng-scope">
                    <button v-bind:id="'ownerAnswerBtn'+auction_id+message.id" 
                    class="open-button" 
                    v-on:click="openForm(auction_id,message.id)"
                    v-if="isAnswer() == 0"                     
                    >Svar</button>                      
                    <button style="display:none;" v-bind:id="'ownerBoxFormClose'+auction_id+message.id" type="button" class="btn cancel" 
                    v-on:click="closeForm(auction_id,message.id)">Stäng</button>
                    <div class="chat-popup" v-bind:id="'ownerBoxForm'+auction_id+message.id">
                        <form action="" class="chat-form-container" @submit.prevent="newMessage(auction_id+''+message.id)">
                            <textarea  v-model="messageText" placeholder="Skriv meddelande.." name="msg" required></textarea>
                            <button type="submit" class="btn">Skicka</button>
                        </form>
                    </div>
                </span>
            </div>                
        </li>
        <ul class="ml15" id="answerUl">
            <li class="answer-list">
                <div class="d-flex flex-direction-row"
                    v-for="answer of answers"
                    :key="answer.id"
                    style="padding: 15px 20px;"
                >
                    <div class="message-avatar">
                        <img v-bind:src="getUserPictureUrl(answer.sender_user_id)" v-bind:title="getUserName(answer.sender_user_id)">
                    </div>
                    <div class="message-body">
                        <div class="message-body-heading">
                            <div>{{ time(answer.timestamp) }}</div>
                        </div>
                        <div>
                            {{ answer.content }}
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>    
        
    `,
    props: ['message','owner_picture_url','auction_owner_id','auction_id','answers'],
    data() {
        return {
            messageText: '',
            sender_user_id: 0
        }
    },
    computed: {
        getPictureUrl(){
            return this.senderPictureUrl;
        },
        currentUserId(){
            let current_user_id = this.$store.state.currentUserId;
            if(current_user_id > 0){
                return current_user_id;
            }
        },
        senderUserId: {
            get() {
                return this.$store.state.user.id
            },
            set(val) {
                this.messageSenderUserId = val
            }
        }
    },
    methods:{    
        time(msg_timestamp) {
            return new Date(msg_timestamp).toLocaleString()
        },        
        openForm(auction_id,message_id) {
            if(this.$store.state.user.id == null){
            window.location.href = '/loginForm';
            }else{
            document.getElementById("ownerBoxForm"+auction_id+message_id).style.display = "block";
            document.getElementById("ownerBoxFormClose"+auction_id+message_id).style.display = "block";
            }
        }, 
        closeForm(auction_id,message_id){
            document.getElementById("ownerBoxForm"+auction_id+message_id).style.display = "none";
            document.getElementById("ownerBoxFormClose"+auction_id+message_id).style.display = "none";
        },
        getUserPictureUrl(user_id){
            let self = this;
            let allUsers = this.$store.state.allUsers;

            let user = allUsers.filter(user => user.id == user_id);
            return user[0]['picture_url'];
        },
        getUserName(user_id){
            let self = this;
            let allUsers = this.$store.state.allUsers;

            let user = allUsers.filter(user => user.id == user_id);
            return user[0]['name'];

            /*if(sender_user_id == this.auction_owner_id){
                return this.owner_picture_url;
            }
            if(current_user !== null){
                return current_user.picture_url
            }*/
        },
        answerCount(answers){
            if(answers){
                console.log(answer)
            }
        },
        isAnswer(){
            let self = this;
            let answers = this.answers;
            return answers['length']
        },
        async newMessage(elementId) {
            let recipientUserId=0;
            if(this.message.sender_user_id){
                recipientUserId=this.message.sender_user_id;
            }else{
                recipientUserId = this.auction_owner_id;
            }
            let message = {
                sender_user_id: this.senderUserId,
                recipient_user_id: recipientUserId,
                content: this.messageText,
                auction_id : this.auction_id,
                message_id : this.message.id,
                timestamp: Date.now()
            }

            document.getElementById("ownerBoxFormClose"+elementId).style.display = "none";
            document.getElementById("ownerBoxForm"+elementId).style.display = "none";
            document.getElementById("ownerAnswerBtn"+elementId).style.display = "none";
            this.messageText = ''
            // send message with websocket
            sendMessage(message,'message')
        }
    }
}