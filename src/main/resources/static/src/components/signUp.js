export default {
  template: `
    <div class="login-container">
    <form action="/action_page.php">
        <div class="row">
          <h2 style="text-align:center">Bli medlem</h2>

          <div class="login-col">
              <input type="text" name="email" placeholder="Email" required>
              <input type="text" name="username" placeholder="Användare" required>
              <input type="password" name="password" placeholder="Lösenord" required>
              <input type="text" name="organizeNumber" placeholder="Organisationsnummer" required>
              <div class="image-upload-container">
                  <div id="label"> Ladda upp profilbild </div>
                  <div class="img-input-group">
                      <div class="custom-file">
                          <Input
                          class="custom-file-input"
                          type="file" 
                          name="files"
                          id="files" 
                          accept=".png,.jpg,.jpeg,.gif,.bmp,.jfif" 
                          onChange="" />
                          <label class="custom-file-label">
                          Max 1 MB filstorlek
                          </label>
                      </div>
                  </div>
                  <div></div>
              </div>
              <input type="submit" value="Skapa nytt konto">
          </div>
        
        </div>
    </form>
    </div>
    <button v-else @click="logoutButton">Logout</button>
  `,
}