<template>
  <div>
    <!-- need to decide where the number 'counter' should be displayed -->
    <div class = "symbol-wrapper" >
      <h1>{{uiLabels["choose_"+categoryNumber]}}</h1>
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
            categoryNumber: Number,
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
    margin-top: 10px;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    border: 1px solid;
    font-family: "Courier New";
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
    flex-direction: row;
    justify-content: space-between;
    width: 500px;

  }
  .symbol{
    display: flex;
    flex-direction: column;
    width: 70px;
    font-family: "Courier New";
    font-size: 0.65em;
    justify-content: center;
    justify-items: center;
    align-items: center;
  }
  img{
width: 35px;
    height: 35px;
    justify-items: center;
  }

  @media (max-width: 420px) {
    .wrapper {
      grid-template-columns: 1fr;
    }

  }

</style>
