
export default {
  components: {
  },
  template: `
    <div class="content">{{ $route.params.id }}
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
        auction_id: 0,
    }
  },
  async mounted() {
    
    let auction_id = this.$route.params.id
    console.log(auction_id)

    let auction = await fetch(`/rest/auctioninfo/${auction_id}`);
    console.log(auction)

  },
  }