import signInButton from '../components/loginForm.js'
import searchBar from '../components/searchBar.js'
import categoryButtons from '../components/categoryButtons.js'

export default {
  components: {
    signInButton,
    searchBar,
    categoryButtons
  },
    template: `
      <div class="content">
        <div id="search-categories-container">
            <searchBar />

            <categoryButtons />
          
        </div>
        <h2>Search</h2>
      </div>
    `
  }