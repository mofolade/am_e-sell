import messageListGroupByAuction from '../components/messageListGroupByAuction.js'

export default {
  components: {
    messageListGroupByAuction
  },
    template: `
      <div class="content">
        <div class="about-section">
          <h2>Profil</h2>
        </div>
        <div id="mypage-container">
          <div class="profile">
            <img v-bind:src=user.picture_url alt="" class="profile_image">
            <div class="profile_name">{{user.name}}</div>
            <div class="profile_email"> {{user.email}} </div>
            <label>Organize nummer</label>
            <div class="profile_orgnm"> {{user.organize_number}} </div>
            <router-link v-bind:to="'/newauction'">
                <div class="btn">
                Nytt auktion
                </div>
            </router-link>
          </div>
          <div class="messages-container">
            <div class="d-flex flex-direction-column">
              <div class="chat_container">
                  <messageListGroupByAuction 
                    :user=this.$store.state.user
                  />
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
  computed: {
    user() {
      if(this.$store.state.user !== null){
        return this.$store.state.user
      }
      else{
        window.location.href = '/';
      }
    }
  }
  }