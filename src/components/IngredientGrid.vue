<template>
  <div>
    <!-- need to decide where the number 'counter' should be displayed -->

    <div class="wrapper">
      <div v-for="ingredient in this.ingredients" v-bind:key="ingredient.id" class="ingredItem">
        <center>
          {{ingredient["ingredient_" + lang ]}},{{ ingredient.selling_price}}:-
        </center>
        
        <dt class="ingredient-controls">
          <button class="wrapperButton" v-on:click="addIngredient(ingredient)">+</button>
          <button class="wrapperButton" v-on:click="removeIngredient(ingredient)">-</button>
        </dt>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IngredientGrid",
  props: {
    item: Object,
    lang: String,
    ingredients: Array
  },
  data: function() {
    return {
      counter: 0
    };
  },
  methods: {
    addIngredient: function(ingredient) {
      this.counter += 1;
      this.$emit('ingredientAdded', ingredient);
    },
    removeIngredient: function(ingredient) {
      this.counter -= 1;
      this.$emit('ingredientRemoved', ingredient);
    }
  }
};
</script>

<style scoped>
.wrapper {
  display: grid;
  grid-gap: 1em;
  grid-template-columns: repeat(auto-fit, calc(9em + 12px));
  overflow: auto;
}

.ingredItem {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.ingredient-controls {
  display: flex;
  justify-content: center;
}
.wrapperButton {
  height: 20px;
  width: 20px;
  background-color: blueviolet;
}
</style>