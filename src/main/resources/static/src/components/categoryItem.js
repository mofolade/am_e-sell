export default {
    template: `
        <router-link v-bind:to="'/list?id='+category.id">
            <button class="category-item">
                <div class="d-flex flex-row align-items-center">
                    <div class="icon-container">
                        <img v-bind:src=category.image_path style="width: 20px;">
                    </div>
                    {{category.name}}
                </div>
            </button>
        </router-link>
    `,
    props: ['category']
}