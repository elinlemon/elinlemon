<template>

  <div class = "ingredientHeader">



    <IngredientGrid :category-number="categoryNumber" :currentMenuItem ="currentMenuItem" :ingredients="relevantIngredients" :ui-labels="uiLabels" :lang="lang" v-on:ingredientAdded="ingredientAdded" v-on:ingredientRemoved="ingredientRemoved">
    </IngredientGrid>
  </div>

</template>
<script>

    import IngredientGrid from "../IngredientGrid";



export default {
  name: 'IngredientCategory',
  //mixins: [CategoryMixin],
  components: {
    IngredientGrid
  },
  props: {
    item: Object,
    ingredients: Array,
      categoryNumber: Number,
      uiLabels: Object,
      currentMenuItem: Object,
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
      this.$emit('ingredientAdded', ingredient);
    },

    ingredientRemoved: function(ingredient) {
      this.$emit('ingredientRemoved', ingredient);
    },

    /*incrementCounter: function() {
      this.counter += 1;
      // sending 'increment' message to parent component or view so that it
      // can catch it with v-on:increment in the component declaration
      this.$emit('increment');
    }*/
  }
}
</script>
<style scoped>

  h1 {
    text-align: center;
    padding-right: 8em;
    font-family: "Courier New";
  }

  
</style>