<template>
  <div>
    <!-- need to decide where the number 'counter' should be displayed -->

    <!-- <div class="wrapper">
        {{item["ingredient_"+ lang]}}, {{item.selling_price}}:-, {{item.stock}} pcs
    </div>-->

    <div class="wrapper">
      <div v-for="ingredient in this.ingredients" v-bind:key="ingredient.id" class="ingredItem">
        {{ingredient["ingredient_" + lang ]}},{{ ingredient.selling_price}}:-
        <dt>
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
  grid-template-columns: repeat(auto-fit, calc(9em + 15px));
  overflow: auto;
}

.wrapperButton {
  height: 20px;
  width: 20px;
  background-color: blueviolet;
}
</style>