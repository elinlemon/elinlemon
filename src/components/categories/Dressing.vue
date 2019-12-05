<template>

  <div>
    <h1>Pick your dressing</h1>
    <IngredientGrid :ingredients="this.relevantIngredients"></IngredientGrid>
  </div>

</template>
<script>
import IngredientCategory from "./IngredientCategory.js";
import IngredientGrid from "../IngredientGrid";

const CATEGORY = 3;

export default {
  name: 'Dressing',
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