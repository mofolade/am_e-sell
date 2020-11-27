
import searchBar from '../components/searchBar.js'
import categoryButtons from '../components/categoryButtons.js'
import messageListGroupByAuction from '../components/messageListGroupByAuction.js'


export default {
  components: {
    searchBar,
    categoryButtons,
    messageListGroupByAuction
  },
    template: `
      <div class="content">
        <div id="search-categories-container">
          <searchBar />

          <categoryButtons />
          
        </div>
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
          </div>
          <div class="messages-container">
            <div class="d-flex flex-direction-column">
              <div class="chat_container">
                  <messageListGroupByAuction />
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