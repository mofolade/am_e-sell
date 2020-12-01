export default {
  template: `
    <div class="login-container">
    <form  @submit.prevent="addUser">
        <div class="row">
          <h2 style="text-align:center">Bli medlem</h2>

          <div class="login-col">
              <input type="text" v-model="email" name="email" placeholder="Email" required>
              <input type="text" v-model="name" name="name" placeholder="Användare" required>
              <input type="password" v-model="password" name="password" placeholder="Lösenord" required>
              <input type="text" v-model="organizeNumber" name="organizeNumber" placeholder="Organisationsnummer" required>
              
              <div class="img-upload-container">
                <div class="file-upload-form">
                  <div class="file-upload">
                    <label>Välj en JPEG-fil att ladda upp.</label>
                    <input type="file" class="file-btn" @change.prevent="listUploads" ref="file-input" accept="image/jpeg">
                    <input type="button" class="clear-btn" @click.prevent="resetFileField" value="rensa">
                    </div>
                    <ul v-show="showUploads" class="card-list">
                      <li v-for="(file, index) in files" :key="index" class="img-card" v-bind:ref="'card-'+index" v-bind:id="'card-'+index">
                          <div class="upload-overlay">Uploading..</div>
                          <div class="checkbox-wrap">
                          <div class="checkbox-wrap-inner">  
                              <input type="checkbox" v-bind:id="'checkbox-'+index" :v-model="checkboxes[index]" checked>
                              <label v-bind:for="'checkbox-'+index"></label>
                              <span class="checkbox-sub-label">Upload</span>
                          </div>
                          </div>
                          <span class="thumb">
                          <img v-bind:src="imageUrlArray | getIndexedImage(index)">
                          </span>
                          <div class="details">
                          <h1>Item {{ index | addOne }}</h1>
                          <h2>File name: {{ file.name }}</h2>
                          <h3>File size: {{ file.size | formatBytes }}</h3>
                          </div>
                          <div class="remove-card">
                          <button type="button" class="remove-card-btn" @click.prevent="deleteItem" v-bind:value="index"> Remove</button></div>
                      </li>
                    </ul>
                  </div>    
              </div>

              <input type="submit" value="Skapa nytt konto">
          </div>
        
        </div>
    </form>
    </div>
  `,
  data() {
      return {
          name: '',
          email: '',
          password: '',
          organizeNumber: '',
          files: [],
          pictureUrl: '',
          showUploads: false,
          checkboxes: [],
          imageUrlArray: []
      }
  },
  components: {
      'vue-upload-multiple-image': () => import('../components/vue-upload-multiple-image.js')
  },
  methods: {
    listUploads(e) {
      this.showUploads = true;
      let files = e.srcElement.files;

      if(files) {
        this.files = files;
      }
      
      let self = this;
                  
      for (var index = 0; index < files.length; index++) {
        // generate a new FileReader object
        var reader = new FileReader();

        reader.onload = function(event) {
          const imageUrl = event.target.result;
          const thumb = document.querySelectorAll('.thumb')[index];
          self.imageUrlArray.push(imageUrl);
        }

        reader.readAsDataURL(files[index]);
      }
  },
  deleteItem: function(e) {
      let parentCard = e.srcElement.parentNode.parentNode;
      
      parentCard.classList.toggle('hidden');
      setTimeout(() => {
        parentCard.style.display = 'none';
      }, 1000);
  },
    async addUser(e) {
      let cardArray = [];
      const formData = new FormData();
      let fileCount = this.files.length;

      var user_images='';
 
      if (!fileCount) return;

      Array.from(Array(this.files.length).keys())
      .map(x => {
          formData.append("files", this.files[x], this.files[x].name);
          user_images = user_images+this.files[x].name+' ';
      });

      let image_upload_response = await fetch('/rest/newfile/uploadfiles', {
          method: 'POST',
          body: formData
      }).catch(console.warn)
      image_upload_response = await image_upload_response.json()

      for(let i = 0; i < fileCount; i++) {
        cardArray.push(`card-${i}`);
      }
      
      let cardIdsArray = [];
      
      cardArray.forEach((ref) => {

        let currentCard = document.getElementById(this.$refs[ref][0].id);
        cardIdsArray.push(currentCard);
      });
      
      cardIdsArray.forEach((id) => {
        const uploadFlag = id.querySelectorAll('[type="checkbox"]:checked');

        // if this card has upload flag, upload
        if(uploadFlag) {
          id.classList.toggle('is-uploading');

          setTimeout(() => {
            id.classList.toggle('hidden');

            setTimeout(() => {
              id.style.display = 'none';
            }, 1000);
          }, 1000);
        }
      });

      this.files = []; 
      for(var i = 0; i < image_upload_response.length; i++) {
        var picture_url = image_upload_response[i];
      }
      
      const user = {
          email:this.email,
          name:this.name, 
          password:this.password,
          picture_url,
          organize_number:this.organizeNumber 
      }
      try {
          console.log('new user')
          console.log(user)
          const  response = await fetch('/rest/users', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(user)
          })

          let new_user_response = await response.json()
          console.log(new_user_response.id)

          return response;

      } catch (error) {
          throw error;
      }
    }
  },  
  filters: {    
    addOne(val) {
      let output = Number(val);
      output += 1;
      return output;
    },        
    getIndexedImage(val, index) {
      return val[index];
    },        
    formatBytes(a, b) {
      if (0 == a) return "0 Bytes";
      var c = 1024,
          d = b || 2,
          e = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
          f = Math.floor(Math.log(a) / Math.log(c));
      return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f]
    }
  }
}