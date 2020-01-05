<template>
    <div id="orders" class ="backgroundpicture">

        <div v-for = "ingredient in this.ingredients" v-bind:key="ingredient.id">
            

        </div>

    </div>
</template>

<script>
    import sharedVueStuff from '@/components/sharedVueStuff.js'

    export default {
        name: "Stock",
        mixins: [sharedVueStuff], // include stuff that is used in both
        //the ordering system and the kitchen

        data: function () {
            //Not that data is a function!
            return {
                ingredients: this.ingredients
            };
        }
    }
</script>

<style scoped>

    .backgroundpicture{
        background-image: url("/background.png");
        background-size: 500px;
        background-attachment: fixed;
        background-repeat: repeat;
        position: relative;
        min-height: 100%;
    }

</style>