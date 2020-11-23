export default {
    template: `
        <button class="category-item">
        {{ category.id }} : {{ category.name }}
        </button>
    `,
    props: ['category']
}