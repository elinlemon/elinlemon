<template>
  <div v-if="relevantIngredients !== undefined">
      <h1>{{uiLabels.chooseBread}}</h1>
    {{this.categorynumber}}
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

export default {
  name: 'Bread',
  components: {
    IngredientGrid
  },
  props: {
    item: Object,
    lang: String,
    ingredients: Array,
    categorynumber: Number

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
        console.log(this.categorynumber) //this i undefined
      return this.ingredients.filter(i => i.category === 4); //we want to write this.categorynumber instead of 6, but is undefined

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