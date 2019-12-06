<template>

  <div>
    <IngredientGrid :ingredients="relevantIngredients" :lang="lang" v-on:ingredientAdded="ingredientAdded">
    </IngredientGrid>
  </div>

</template>
<script>

    import IngredientGrid from "../IngredientGrid";


export default {
  name: 'Bread',
  //mixins: [CategoryMixin],
  components: {
    IngredientGrid
  },
  props: {
    item: Object,
    ingredients: Array,
      categoryNumber: Number,
      uiLabels: Object,
      lang: String
  },
  data: function () {
    return {
      counter: 0,
    };
  },
    computed: {
        // from all ingredients, get only the ones that match our categoryNumber
        relevantIngredients: function() {
            return this.ingredients.filter(i => i.category === this.categoryNumber); //we want to write this.categorynumber instead of 6, but is undefined
        }
    },
  methods: {
    ingredientAdded: function(ingredient) {
      console.log(ingredient);
    },

    ingredientRemoved: function(ingredient) {
        console.log(ingredient);
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