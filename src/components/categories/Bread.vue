<template>
  <div v-if="relevantIngredients !== undefined">
      <p>Choose your bread {{this.lang}}</p>
      <p>this category contains {{this.relevantIngredients.length}} items</p>

      <IngredientGrid :ingredients="this.relevantIngredients"></IngredientGrid>

      <!-- <label>
      <button v-on:click="incrementCounter">{{ counter }}</button>
      {{item["ingredient_"+ lang]}}, {{item.selling_price}}:-, {{item.stock}} pcs
    </label> -->
  </div>

  
</template>
<script>

import IngredientGrid from "../IngredientGrid";

const CATEGORY_NUMBER = 4;

export default {
  name: 'Bread',
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
      relevantIngredients: this.getRelevantIngredients()
    };
  },
  methods: {
    // from all ingredients, get only the ones that match our categoryNumber
    getRelevantIngredients: function() {
      return this.ingredients.filter(i => i.category === CATEGORY_NUMBER);
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