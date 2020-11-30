export default {
    template: `
        <router-link v-bind:to="'/list/'+category.id">
            <div class="category-item">
                <a class="category-item-btn">
                    <div class="icon-container">
                        <img v-bind:src=category.image_path style="width: 20px;">
                    </div>
                    {{category.name}}
                </a>
            </div>
        </router-link>
    `,
    props: ['category']
}