export default {
    template: `
      <div class="new-auction-container">
      <form action="/action_page.php">
          <div class="row">
            <h2 style="text-align:center">Ny auktion</h2>
  
            <div class="login-col">
                <label>Produkt namn</label>
                <input type="text" name="name" placeholder="Namn" maxlength="160" required>
                
                <label>Kategori</label>
                <select id="category" name="category">
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
                <input type="datetime-local" name="start_date" placeholder="YYYY-MM-DD hh24:mm" required>

                <label>Stop datum</label>
                <input type="datetime-local" name="stop_date" placeholder="YYYY-MM-DD hh24:mm" required>

                <label>Beskrivning</label>
                <input type="text" name="description" placeholder="Beskrivning" maxlength="300" required>

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
  }