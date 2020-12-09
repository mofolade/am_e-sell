export default {
    template: `
        <div id="search-cover">
            <form @submit.prevent="parseSearchString">
                <div class="tb">
                    <div class="td">
                        <input type="text" name="text" v-model="text" placeholder="Search" required>
                    </div>
                    <div class="td" id="s-cover">
                        <button type="submit" class="search-button">
                            <div id="s-circle"></div>
                            <span></span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    `,
    name: 'SearchForm',
    data() {
      return {
        text: ''
      };
    },
    methods: {
      parseSearchString(e) {
        // Trim search string
        let trimmedSearchString = this.text.trim();
        trimmedSearchString = trimmedSearchString.replace(/[\u00A0-\u9999<>\&]/g, function(i) {
          return '&#'+i.charCodeAt(0)+';';
        });
        window.location.href = '/search/'+trimmedSearchString;
      }
        
    }
}