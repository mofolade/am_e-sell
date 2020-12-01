export default {
  template: `
    <div class="login-container">
      <div class="row">
        <h2 style="text-align:center">Logga in</h2>
        <div class="login-col">
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
            console.log('Fel email eller lösenord!')
          }else{
            let res = await fetch('/auth/user')
            try {
              res = await res.json()
              setUser(res)
            } catch {
              console.log('Not authenticated');
            }
            window.location.href = '/'; 
          }

        } catch (error) {
          throw error;
        }
        window.location.href = '/'; 
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
                this.$store.commit('setUser', user)
                window.location.href = '/';
            }

          } else {
            // There was an error.
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