import messageListGroupByAuction from '../components/messageListGroupByAuction.js'
import messageList from '../components/messageList.js'


export default {
  components: {
    messageListGroupByAuction
  },
    template: `
      <div>
        <h2 style="text-align:center">Profil</h2>
        <div id="mypage-container">
          <div class="profile">
            <img v-bind:src=user.picture_url alt="" class="profile_image">
            <div class="profile_name">{{user.name}}</div>
            <div class="profile_email"> {{user.email}} </div>
            <label>Organize nummer</label>
            <div class="profile_orgnm"> {{user.organize_number}} </div>
          </div>
          <div class="messages-container">
            <div class="d-flex flex-direction-column">
              <div class="col-md-8">
                <div class="chat_container">
                    <messageListGroupByAuction />
                </div>
              </div>
            </div>
</div>
        </div>
      </div>
    `,
  computed: {
    user() {
        return this.$store.state.user
    }
}
  }