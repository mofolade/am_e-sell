export default {
    components: {
    },
    template: `
        <div class="profile">
            <img v-bind:src=user.picture_url alt="" class="profile_image">
            <div class="profile_name">{{user.name}}</div>
            <div class="profile_email"> {{user.email}} </div>
            <label>Organize nummer</label>
            <div class="profile_orgnm"> {{user.organize_number}} </div>
            <router-link v-bind:to="'/newauction'">
                <div class="btn">
                Nytt auktion
                </div>
            </router-link>
            <router-link v-bind:to="'/mybids'">
                <div class="btn">
                Mina bud
                </div>
            </router-link>
            <router-link v-bind:to="'/myauctions'">
                <div class="btn">
                Mina auktioner
                </div>
            </router-link>
        </div>
    `,
    props: ['user'],
    computed: {
    }
  }