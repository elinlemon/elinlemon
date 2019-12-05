<template>

  <div>
    <h1>Pick your topping</h1>
    <IngredientGrid :ingredients="this.relevantIngredients"></IngredientGrid>
  </div>

</template>
<script>
import CategoryMixin from "./CategoryMixin.js";
import IngredientGrid from "../IngredientGrid";

const CATEGORY = 2;

export default {
  name: 'Topping',
  mixins: [CategoryMixin],
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