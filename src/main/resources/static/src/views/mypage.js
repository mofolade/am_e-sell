export default {
    template: `
      <div>
        <h2 style="text-align:center">Profil</h2>
        <div id="mypage-container">
          <div class="profile">
            <img src="./src/assets/eva.jpg" alt="" class="profile_image">
            <div class="profile_name">Name</div>
            <div class="profile_email"> Email </div>
            <div class="profile_orgnm"> Organize number </div>
          </div>
          <div>list</div>
        </div>
      </div>
    `,
  data() {
    return {
      current_user: [],
    }
  },
  }