import signInButton from '../components/loginForm.js'

export default {
  components: {
    signInButton
  },
    template: `
      <div class="content">
        <div id="cover">
          <form method="get" action="">
            <div class="tb">
              <div class="td"><input type="text" placeholder="Search" required></div>
              <div class="td" id="s-cover">
                <button type="submit" class="search-button">
                  <div id="s-circle"></div>
                  <span></span>
                </button>
              </div>
            </div>
          </form>
        </div>
        <h2>Home Page</h2>
      </div>
    `
  }