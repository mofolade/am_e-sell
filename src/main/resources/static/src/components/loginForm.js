export default {
  template: `
    <div class="login-container">
      <div class="row">
        <h2 style="text-align:center">Logga in</h2>
        <div class="login-col">
          <div class="alert" id="errorMsg">
              <span class="closebtn" @click="closeAlert()">×</span>
              <span id="error-msg-text"></span>
          </div>
          <form @submit.prevent="signInManually">
              <input type="text" v-model="email" name="email" placeholder="Email" required>
              <input type="password" v-model="password" name="password" placeholder="Lösenord" required>
              <button data-test-submit-button="" data-bid-submit-button="" class="bid-btn btn btn-lg btn-fluid mb-4 " type="submit"> 
              Logga in
              </button>
          </form>
          <div class="hl">
            <span class="hl-innertext">eller</span>
          </div>

          <button  @click="signInButton" class="google btn"><i class="fa fa-google fa-fw">
          </i> Logga in med Google
          </button>
        </div>
      </div>
    </div>
  `,
  data() {
      return {
          auth2: null,
          current_user: null,
          email: '',
          password: ''
      }
  },
  computed: {
     user(){
        this.current_user = this.$store.state.user;
     }
  },
  methods: {
      logoutButton() {
          fetch('/logout')
          this.$store.commit('setUser', null)
      },
      signInButton() {
          this.auth2.grantOfflineAccess().then(this.signInCallback);
      },
      closeAlert(){
          document.getElementById('errorMsg').style.display='none';
      },
      async signInManually(){
        //securityLogin
        console.log('signinmanually')
        var email = this.email;
        var password = this.password;
        password = encodeURIComponent(password);
        let req='';

        const login = {
          email, 
          password
        }
        try {
          const user = {
            email:this.email, 
            password:this.password
          }
          let response = await fetch("/loginuser", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
          });
          if(response.url.includes('error')) {
            document.getElementById('error-msg-text').innerHTML='Fel email eller lösenord!';            
            document.getElementById('errorMsg').style.display='block';
            console.log('Fel email eller lösenord!')
          }else{
            let res = await fetch('/auth/user')

            if(res.ok) {
              let user = await fetch('/whoami')
              user = await user.json()

              if(user['status']==404){
                document.getElementById('error-msg-text').innerHTML='Fel email eller lösenord!';            
                document.getElementById('errorMsg').style.display='block';
              }else if(user['id'] > 0){
                this.$store.commit('setUser', user)
                window.location.href = '/';
              }
            }
          }
        } catch (error) {
          document.getElementById('error-msg-text').innerHTML='Fel email eller lösenord!';            
          document.getElementById('errorMsg').style.display='block';
          throw error;
        }
      },
      async signInCallback(authResult) {
          console.log('authResult', authResult);
        
          if (authResult['code']) {        
            // Hide the sign-in button now that the user is authorized        
            // Send the code to the server
            let result = await fetch('/storeauthcode', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/octet-stream; charset=utf-8',
                'X-Requested-With': 'XMLHttpRequest',
              },
              body: authResult['code']
            });

            // 200
            if(result.ok) {
              let user = await fetch('/whoami')
              user = await user.json()
              if(user['status']==404){
                document.getElementById('error-msg-text').innerHTML='Fel email eller lösenord!';            
                document.getElementById('errorMsg').style.display='block';
              }
              else if(user['id'] > 0){
                this.$store.commit('setUser', user)
                window.location.href = '/';
              }
            }

          } else {
            // There was an error.
            document.getElementById('error-msg-text').innerHTML='Google-autentiseringsfel';            
            document.getElementById('errorMsg').style.display='block';
            console.error('Google auth error');
          }
        }
  },
  created() {
      const CLIENT_ID = "743084776020-tfjb9peu4bqcgg5p1c0ialehvfmruivo.apps.googleusercontent.com";

      gapi.load('auth2', () => {
          this.auth2 = gapi.auth2.init({
            client_id: CLIENT_ID,
            // scope: "https://www.googleapis.com/auth/calendar.events"
          });
        });
  }
}