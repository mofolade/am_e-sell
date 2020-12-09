export default {
    template: `
        <li class="flex-item">
            <div class="auction-gallery">
                <div id="expandedImg" class="auction-big-image">
                <img v-bind:src="default_image" alt="">
                </div>
                <div class="gallery-row">
                <div class="gallery-column" v-for="image of images" :key="image.image_path">
                    <img v-bind:src=image style="width:100%" v-on:click="myGalleryFunction(image)">
                </div>
                </div>
            </div>
            </li>
    `,
    props: ['default_image','images'],
    methods: {
        myGalleryFunction(image){
            var expandImg = document.getElementById("expandedImg");
            document.getElementById("expandedImg").innerHTML='<img src="'+image+'" alt="">';
        },
    }
}