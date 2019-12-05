<template>

  <div>
    <h1>Pick your bread</h1>
    <IngredientGrid :ingredients="this.relevantIngredients" 
                    v-on:ingredientAdded="ingredientAdded(ingredientId)"
                    v-on:ingredientRemoved="ingredientRemoved(ingredientId)">
    </IngredientGrid>
  </div>

</template>
<script>

import CategoryMixin from "./CategoryMixin.js";
import IngredientGrid from "../IngredientGrid";

const CATEGORY = 4;

export default {
  name: 'Bread',
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
  },
  methods: {
    ingredientAdded: function(ingredientId) {
      console.log("increment");
    },

    ingredientRemoved: function(ingredientId) {

    },

    incrementCounter: function() {
      this.counter += 1;
      // sending 'increment' message to parent component or view so that it
      // can catch it with v-on:increment in the component declaration
      this.$emit('increment');
    }
  }
}
</script>
<style scoped>
  
</style>