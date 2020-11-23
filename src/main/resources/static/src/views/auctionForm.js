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

                <div class="image-upload-container">
                    <div id="label"> Ladda upp bilder </div>
                    <div class="img-input-group">
                        <div class="custom-file">
                            <Input
                            class="custom-file-input"
                            type="file" 
                            name="files"
                            id="files" 
                            accept=".png,.jpg,.jpeg,.gif,.bmp,.jfif" 
                            multiple
                            onChange="" />
                            <label class="custom-file-label">
                            Max 1 MB filstorlek
                            </label>
                        </div>
                    </div>
                    <div></div>
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
            description: '',
        }
    },
    methods: {
        async addAuction() {
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
                return await response.json();
            } catch (error) {
                throw error;
            }
        }
    }
  }