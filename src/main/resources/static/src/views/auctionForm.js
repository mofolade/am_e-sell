export default {
    template: `
      <div class="new-auction-container">
        <form @submit.prevent="addAuction">
            <div class="row">
                <h2 style="text-align:center">Ny auktion</h2>
  
                <div class="login-col">
                    <label>Produkt namn</label>
                    <input v-model="name"  type="text" name="name" maxlength="160" required>
                    
                    <label>Kategori</label>
                    <select id="category" v-model="category_id" name="category">
                        <option value="1">Kläder</option>
                        <option value="2">Hem & Hushåll</option>
                        <option value="3">Hobby</option>
                        <option value="4">Datorer</option>
                        <option value="5">Böcker</option>
                        <option value="6">Leksaker</option>
                        <option value="7">Foto & Kameror</option>
                        <option value="8">Hemelektronik</option>
                    </select>

                    <label>Start datum</label>
                    <input type="datetime-local" v-model="start_date" name="start_date" required>

                    <label>Stop datum</label>
                    <input type="datetime-local" v-model="stop_date" name="stop_date" required>

                    <label>Beskrivning</label>
                    <input type="text" v-model="description" name="description" maxlength="300" required>

                    <label>Pris</label>
                    <input type="text" v-model="price" name="price" required>
                    <div class="img-upload-container">
                        <div class="file-upload-form">
                            <div class="file-upload">
                            <label>Välj en eller flera JPEG-filer att ladda upp.</label>
                            <input type="file" class="file-btn" multiple @change.prevent="listUploads" ref="file-input" accept="image/jpeg">
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
                        <!--       </transition-group> -->
                            </ul>
                        </div>    
                    </div>
                    <input type="submit" value="Skapa ny auktion">
                </div>            
            </div>
         </form>
      </div>
    `,
    data() {
        return {
            name: '',
            category_id: '',
            start_date: 0,
            stop_date: 0,
            price: 0,
            image_index: 0 ,
            images: [],
            dataImages: [],
            description: '',
            files: [],
            showUploads: false,
            removeCard: [],
            imageUrlArray: [],
            itemToDelete: '',
            checkboxes: [],
        }
    },
    components: {
        'vue-upload-multiple-image': () => import('../components/vue-upload-multiple-image.js')
     },
    methods: {
        uploadImageSuccess(e,t,n){
            console.log("data: ",e,t,n);
        },
        async fileList(e) {
            // handle file changes
            const formData = new FormData();
            var files = e.target.files || e.dataTransfer.files;
            console.log(files)

            var photos='';
            if (!files.length) return;

            // append the files to FormData
            Array.from(Array(files.length).keys())
            .map(x => {
                formData.append("files", files[x], files[x].name);
                photos = photos+files[x].name+' ';
            });

            let response = await fetch('/rest/newauction/uploadfiles', {
                method: 'POST',
                body: formData
            }).catch(console.warn)

            response = await response.json()
            console.log(response);
        },
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
            let currentFiles = this.files;
            let target = toString(e.srcElement.value);
            let parentCard = e.srcElement.parentNode.parentNode;
            
            parentCard.classList.toggle('hidden');
            setTimeout(() => {
              parentCard.style.display = 'none';
            }, 1000);
        },
        async addAuction(e) {
            let cardArray = [];
            const formData = new FormData();
            let fileCount = this.files.length;

            var auction_images='';
            
            if (!fileCount) return;

            // append the files to FormData
            Array.from(Array(this.files.length).keys())
            .map(x => {
                formData.append("files", this.files[x], this.files[x].name);
                auction_images = auction_images+this.files[x].name+' ';
            });

            let image_upload_response = await fetch('/rest/newauction/uploadfiles', {
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
              // check if card is ticked for upload
              // if checkbox for this card is checked, set flag
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

            var name = this.name;
            var category_id = this.category_id;
            var user_id = 2;
            var start_price = this.price;
            var description = this.description;
            var current_price = 0;
            var final_price = 0;
            var bidder_user = 0;
            var timestamp= Math.round(+new Date()/1000);
            var stadate = new Date(this.start_date);
            var start_date = stadate.getTime();
            var stodate = new Date(this.stop_date);
            var stop_date = stodate.getTime();
            var images = this.images;

            const auction = {
                name, 
                category_id,
                user_id,
                start_date,
                stop_date,
                start_price,
                description,
                current_price,
                final_price,
                bidder_user,
                timestamp        
            }
            try {
                console.log('new auction')
                console.log(auction)
                const  response = await fetch('/rest/auctions', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(auction)
                })

                let new_auction_response = await response.json()
                console.log(new_auction_response.id)
                if(new_auction_response.id){
                    let auction_id = new_auction_response.id;

                    for(var i = 0; i < image_upload_response.length; i++) {
                        var img_path = image_upload_response[i];
          
                        const img = {
                            auction_id, 
                            image_path: img_path
                        }

                        let auction_img_res = await fetch('/rest/auctionimages', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(img)
                        })
                        auction_img_res = await auction_img_res.json()
                    }
                }

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
          // console.log(`This: ${val}`);
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