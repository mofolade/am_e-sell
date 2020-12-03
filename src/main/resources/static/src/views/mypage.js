import messageListGroupByAuction from '../components/messageListGroupByAuction.js'
import myProfilBox from '../components/myProfilBox.js'

export default {
  components: {
    messageListGroupByAuction,
    myProfilBox
  },
    template: `
      <div class="content">
        <div class="about-section">
          <h2>Profil</h2>
        </div>
        <div id="mypage-container">
          <myProfilBox 
            :user=this.$store.state.user
          />
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