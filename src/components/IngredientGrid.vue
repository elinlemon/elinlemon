<template>
  <div>
    <!-- need to decide where the number 'counter' should be displayed -->

    <div class="wrapper">
      <div v-for="ingredient in this.ingredients" v-bind:key="ingredient.id" class="ingredItem">

        <center>

          <div class="allergy-icons-container">
            <div v-if = "ingredient.milk_free"> <img class="allergy-icons-pic" src="milk-free-symbol.png"> </div>
            <div v-if = "ingredient.gluten_free"> <img class="allergy-icons-pic" src="gluten-free-symbol.png"> </div>
            <div v-if = "ingredient.vegan"> <img class="allergy-icons-pic" src="vegan-symbol.png"> </div>
          </div>

          {{ingredient["ingredient_" + lang ]}}
          <br/>
          {{ ingredient.selling_price}}:-
        </center>

        <dt class="ingredient-controls">
          <button class="wrapperButton" v-on:click="removeIngredient(ingredient)">-</button>
          <div v-for="currentIngredient in currentMenuItem.getPrintableIngredientList()" v-bind:key="ingredient.id">
              <div class="wrapperCounter" v-if = "ingredient.ingredient_en == currentIngredient.ingredient_en ">
                {{currentIngredient.count}}
              </div>
            </div>
          <button class="wrapperButton" v-on:click="addIngredient(ingredient)">+</button>
        </dt>
      </div>
    </div>
    <div class = "symbol-wrapper" >
      <div class = "symbol">
        <img width="50px" height="50px" src="milk-free-symbol.png">
        <div>{{uiLabels.milkfree}}</div>
      </div>
      <div class = "symbol">
        <img width="50px" height="50px" src="gluten-free-symbol.png">
        <div>{{uiLabels.glutenfree}}</div>
      </div>
      <div class = "symbol">
        <img width="50px" height="50px" src="vegan-symbol.png">
        <div>{{uiLabels.vegan}}</div>
      </div>
    </div>
  </div>
</template>

import { ShoppingCart, MenuItem } from "../ShoppingCart";
<script>
    export default {
        name: "IngredientGrid",
        props: {
            item: Object,
            uiLabels: Object,
            lang: String,
            ingredients: Array,
             currentMenuItem: Object
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
    padding: 10px;
    border: 1px solid;
    font-size: large;
  }

  .ingredient-controls {
    display: flex;
    justify-content: space-between;

  }
  .wrapperButton {
    height: 25px;
    width: 40px;
    cursor: pointer;
  }
  .wrapperCounter{
    displaY: flex;
    width: 54px;
    justify-content: center;
    font-size: larger;
  }

  .allergy-icons-container {
    display: flex;
    justify-content: end;
    height: 20px;
  }

  .allergy-icons-pic {
    height: 15px;
    width: auto;

  }
  .symbol-wrapper{
    display: flex;
    margin-top: 50px;
    margin-left: 50px;
    flex-direction: row;
    justify-content: space-between;
    width: 250px;

  }
  .symbol{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 70px;
    align-content: center;
    font-family: "Courier New";
    font-size: 0.95em;

  }

  @media (max-width: 420px) {
    .wrapper {
      grid-template-columns: 1fr;
    }

  }

</style>
