import categoryItem from './categoryItem.js'

export default {
    components: {
        categoryItem
    },
    template: `
        <div id="categories-cover">
            <categoryItem 
                v-for="category of categories" 
                :category="category"
                :key="category.id"
            />
        </div>
    `,
    computed: {
        categories() {
            return this.$store.state.categories
        }
    }
}