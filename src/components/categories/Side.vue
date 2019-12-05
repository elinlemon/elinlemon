<template>

   <div>
    <h1>Pick your side</h1>
    <IngredientGrid :ingredients="this.relevantIngredients"></IngredientGrid>
  </div>

</template>
<script>
    import IngredientCategory from "./IngredientCategory.js";
import IngredientGrid from "../IngredientGrid";

const CATEGORY = 5;

export default {
  name: 'Side',
  mixins: [IngredientCategory],
  components: {
    IngredientGrid
  },
  props: {
    item: Object,
    lang: String,
    ingredients: Array
  },
  data: function () {
    return {
      counter: 0,
      relevantIngredients: this.getRelevantIngredients(CATEGORY, this.ingredients)
    };
  }
}
</script>
<style scoped>
  
</style>