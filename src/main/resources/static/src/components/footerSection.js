export default {
    template: `
        <footer class="footer">
            <div class="footer-container">
                <div class="flex">
                    <router-link to="/about"><h5 class="white-text mt30">
                    Kontakta oss</h5></router-link>
                    <ul class="mt30">
                        <li>
                            +46 555 555 555
                        </li>
                        <li>
                            Lund, Storgatan 80.
                        </li>
                        <li>
                            info@auctionist.se
                        </li>
                    </ul>
                </div>
                <div class="flex">
                    <h5 class="white-text mt30">Kontakt & Hjälp</h5>
                    <ul  class="mt30">
                        <li>
                            <router-link to="/about"><a class="grey-text text-lighten-3" href="#!">Kontakta oss</a></router-link>
                        </li>
                        <li>
                            <router-link to="/about"><a class="grey-text text-lighten-3" href="#!">Om oss</a></router-link>
                        </li>
                        <li>
                            Vanliga frågor & svar
                        </li>
                    </ul>
                </div>                
                <div class="flex">
                    <h5 class="white-text mt30">Sociala medier</h5>
                    <ul class="mt30">
                        <li>
                            <a class="grey-text text-lighten-3" href="#!">Facebook</a>
                        </li>
                        <li>
                            <a class="grey-text text-lighten-3" href="#!">Instagram</a>
                        </li>
                        <li>
                            <a class="grey-text text-lighten-3" href="#!">Twitter</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="footer-copyright">
                <div class="container">© 2020 Copyright Text</div>
            </div>
        </footer>
    `
}