<template>
  <div>
    <!-- need to decide where the number 'counter' should be displayed -->
    <div class= "header-wrapper">
      <h1>{{uiLabels["choose_"+categoryNumber]}}</h1>
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
    <div class="wrapper">

      <div v-for="ingredient in this.ingredients" v-bind:key="ingredient.id" class="ingredItem">


          <div class="allergy-icons-container">
            <div v-if = "ingredient.milk_free"> <img class="allergy-icons-pic" src="milk-free-symbol.png"> </div>
            <div v-if = "ingredient.gluten_free"> <img class="allergy-icons-pic" src="gluten-free-symbol.png"> </div>
            <div v-if = "ingredient.vegan"> <img class="allergy-icons-pic" src="vegan-symbol.png"> </div>
          </div>
        <div class = "ingredient-text">
          {{ingredient["ingredient_" + lang ]}}
          <br/>
          {{ingredient.selling_price}}:-
        </div>


        <div v-if="ingredient.stock_quantity > 0">
        <div class="ingredient-controls">
          <button class="wrapperButton" v-on:click="removeIngredient(ingredient)">-</button>
          <div v-for="currentIngredient in currentMenuItem.getPrintableIngredientList()" v-bind:key="ingredient.id">
              <div class="wrapperCounter" v-if = "ingredient.ingredient_en == currentIngredient.ingredient_en ">
                {{currentIngredient.count}}
              </div>
            </div>
          <button class="wrapperButton" v-on:click="addIngredient(ingredient)">+</button>
        </div>
      </div>

        <div v-if="ingredient.stock_quantity == 0" class="stock-info">
          {{uiLabels.outOfStock}}
        </div>
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
                counter: 0,
                active: false,
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
            },
            colourIngredItem: function(){
              this.active=true;

            }
        }
    };
</script>

<style scoped>

  h1 {
    font-family: "Courier New";
  }

  .wrapper {
    display: grid;
    grid-gap: 1em;
    grid-template-columns: repeat(auto-fill, calc(9em + 50px));
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
    border-radius: 10px;
  }
  .ingredient-text{
    display: flex;
    justify-content: center;
    font-weight: bold;
    align-self: center;
  }
  .stock-info{
    display: flex;
    justify-content: center;
    align-self: center;
  }
  .active {
    background-color: lightgrey;
  }

  .ingredient-controls {
    display: flex;
    width: 172px;
    justify-content: space-between;
    flex-direction: row;
    padding-top: 15px;
  }
  .wrapperButton {
    display: flex;
    height: 25px;
    width: 40px;
    cursor: pointer;
    justify-content: center;
  }
  .wrapperCounter{
    display: flex;
    width: 92px;
    font-size: large;
    justify-content: center;
  }

  .allergy-icons-container {
    display: flex;
    justify-content: center;
    height: 25px;
  }

  .allergy-icons-pic {
    height: 20px;
    width: auto;
  }
  .header-wrapper{
    flex-direction: row;
    display: flex;
    justify-content: space-between;
    width: 625px;
  }
  .symbol-wrapper{
    display: flex;
    justify-content: right;
  }
  .symbol{
    display: flex;
    flex-direction: column;
    width: 70px;
    align-content: center;
    font-family: "Courier New";
    font-size: 0.65em;
    justify-content: center;
    align-items: center;
  }
  img{
    width: 35px;
    height: 35px;
    justify-items: center;
  }


  @media (max-width: 500px) {
    .wrapper {
      grid-template-columns: repeat(auto-fit,calc(9em + 50px));
    }

  }

</style>
