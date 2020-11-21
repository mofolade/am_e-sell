export default {
    template: `
        <button v-if="!$store.state.user" @click="signInButton">Sign in with Google</button>
        <button v-else @click="logoutButton">Logout</button>
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