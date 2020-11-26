export default {
  template: `
    <div class="login-container">
    <form action="">
        <div class="row">
        <h2 style="text-align:center">Logga in</h2>

        <div v-if="!$store.state.user" class="login-col">
            <div class="hide-md-lg">
            <p>Or sign in manually:</p>
            </div>

            <input type="text" name="username" placeholder="Användare" required>
            <input type="password" name="password" placeholder="Lösenord" required>
            <input type="submit" value="Logga in">

            <div class="hl">
              <span class="hl-innertext">eller</span>
            </div>

            <button  @click="signInButton" class="google btn"><i class="fa fa-google fa-fw">
            </i> Logga in med Google
            </button>
        </div>
        
        </div>
    </form>
    </div>
  `,
  data() {
      return {
          auth2: null
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