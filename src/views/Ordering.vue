<template>
  <div>
    <!-- Welcome view -->

    <div class="welcome-container" v-if="location === undefined">


      <div class="top-container-1">
        <img class="swedish-icon language-icon" src="sweden.png" height="80" width="auto" v-on:click="selectLang('sv')">
        <img class="english-icon language-icon" src="united-kingdom.png" height="80" width="auto" v-on:click="selectLang('en')">
      </div>

      <center><h1>{{uiLabels.welcome}}</h1></center>

      <div class="order-option-container">
        <button v-on:click="setLocation('eatIn')">{{uiLabels.eatIn}}</button>
        <button v-on:click="setLocation('takeout')">{{uiLabels.eatOut}}</button>
      </div>
    </div>


    <!-- Main view -->
    <div class="ordering-container" v-else>

      <div class="top-container-2">

        <div class="language-container">
          <img class="swedish-icon language-icon" src="sweden.png" height="30" width="auto" v-on:click="selectLang('sv')">
          <img class="english-icon language-icon" src="united-kingdom.png" height="30" width="auto" v-on:click="selectLang('en')">
        </div>

        <button class="cancel-order-button" v-on:click="cancelOrder()">{{ uiLabels.cancelOrder }}</button>
      </div>

      <div class="main-container" >
                <!-- Is conected to the final_page -->
        <div class="category-buttons-container" v-show="showmenue">
          <button class="category-button" v-on:click="setCurrentCategory(4)">{{uiLabels.bread}}</button>
          <button class="category-button" v-on:click="setCurrentCategory(1)">{{uiLabels.protein}}</button>
          <button class="category-button" v-on:click="setCurrentCategory(2)">{{uiLabels.toppings}}</button>
          <button class="category-button" v-on:click="setCurrentCategory(3)">{{uiLabels.dressing}}</button>
          <button class="category-button" v-on:click="setCurrentCategory(5)">{{uiLabels.sides}}</button>
          <button class="category-button" v-on:click="setCurrentCategory(6)">{{uiLabels.drinks}}</button>
        </div>

        <!--Contacting component bread with the right category-->
        <!-- Is conected to the final_page -->
        <div class="category-container" v-show="showmenue">
          <IngredientCategory :ui-labels="uiLabels" :lang="lang" :ingredients="ingredients" :categoryNumber="currentCategory" v-on:ingredientAdded="ingredientAdded" v-on:ingredientRemoved="ingredientRemoved"/>
        </div>

        <div class="your-order-container" v-show="showNothing" >
          <div class="ordered-items-container">

            <div class="top-line-container">
              <span>{{uiLabels.yourOrder}}</span>
              <button v-on:click="addNewOrder()">{{uiLabels.newOrder}}</button>
            </div>

            <div class="added-items-container">

              <div class="previous-order-items-container">

                <div v-for="item in this.allOrders">
                  <div v-for="(key,value) in item">
                  <strong> {{uiLabels.order}}</strong>
                  <dt>{{key}}{{value}}</dt>



                  <!-- this.allOrders needs to be made unique exactly like for the current order items
                  <span v-for="key in item.ingredients">
                    <dt>{{key}}</dt>
                  </span>-->
                </div>
                </div>
              </div>

              <div class="current-order-items-container">
                <strong>{{uiLabels.current_order}}</strong>
                <span v-for="(key, value) in uniqueIng">
                  <dt>{{key}} {{value}}</dt>
                </span>
              </div>

            </div>
          </div>

          <div>
            <span>Tot: {{ price}} kr</span>
          </div>

<!-- Is conected to the final_page -->
          <div v-if ="showmenue ===true">
          <button class="place-order-button" v-on:click="final_page()">{{uiLabels.placeOrder}} </button>
        </div>
        </div>
      </div>
    </div>
    <!-- Payment page -->
        <div class="final-order" v-show="showAll">
          <button class="Pay" v-on:click="pay_page()">{{uiLabels.pay}} </button>

      </div>
  </div>
</template>
<script>
//import methods and data that are shared between ordering and kitchen views
import Ingredient from "@/components/Ingredient.vue";
import OrderItem from "@/components/OrderItem.vue";
import IngredientCategory from "@/components/categories/IngredientCategory.vue";
//import methods and data that are shared between ordering and kitchen views
import sharedVueStuff from "@/components/sharedVueStuff.js";

/* instead of defining a Vue instance, export default allows the only
necessary Vue instance (found in main.js) to import your data and methods */
export default {
  name: "Ordering",
  components: {
    Ingredient,
    OrderItem,
    IngredientCategory
  },
  mixins: [sharedVueStuff], // include stuff that is used in both
  // the ordering system and the kitchen
  data: function() {
    //Not that data is a function!
    return {
      location: undefined,
      chosenIngredients: [],
      uniqueIng: {},
      price: 0,
      orderNumber: 0,
      currentCategory: 4,   // == bread default
      ingredients: this.ingredients,
      allOrders: [],    // to store individual orders after clicking "add new order"
      showmenue: false, //Is conected to the final_page
        showAll: false,
        showNothing: true
    };
  },
  created: function() {
    this.$store.state.socket.on(
      "orderNumber",
      function(data) {
        this.orderNumber = data;
      }.bind(this)
    );
  },
  methods: {
    ingredientAdded: function(ingredient) {
      this.chosenIngredients.push(ingredient['ingredient_' + this.lang]);
      this.price += +ingredient.selling_price;
      this.countUniqueIngredients();
    },
    ingredientRemoved: function(ingredient) {
      for( var i = 0; i <this.chosenIngredients.length; i++){
        if (this.chosenIngredients[i] === ingredient['ingredient_' + this.lang]) {
          this.chosenIngredients.splice(i,1);
          this.price += -ingredient.selling_price;
          this.countUniqueIngredients();
            break;
        }
        }
    },
    countUniqueIngredients: function () {
      this.uniqueIng = this.chosenIngredients.reduce(function(acc, curr){
        if(typeof acc[curr] == 'undefined') {
          acc[curr] = 1; }
        else { acc[curr] += 1;
        }
        return acc;
      }, {})
    },

    addNewOrder: function() {
      this.allOrders[this.orderNumber] = [this.uniqueIng];
      this.orderNumber +=1;
      this.chosenIngredients = [];
      this.uniqueIng = {};
      this.currentCategory = 4;
      this.showmenue = true;
    },

    placeOrder: function() {
      var i,
        //Wrap the order in an object
        order = {
          ingredients: this.chosenIngredients,
          price: this.price
        };
      // make use of socket.io's magic to send the stuff to the kitchen via the server (app.js)
      this.$store.state.socket.emit("order", { order: order });
      //set all counters to 0. Notice the use of $refs
      for (i = 0; i < this.$refs.ingredient.length; i += 1) {
        this.$refs.ingredient[i].resetCounter();
      }
      this.price = 0;
      this.chosenIngredients = [];
    },

    setLocation: function(location) {
      this.location = location;
      this.uniqueIng = {};
      this.price = 0;
               // Is conected to the final_page 
      this.showmenue = true;
    },

    setCurrentCategory: function(category) {
      this.currentCategory = category;
    },

    cancelOrder: function () {
      this.location = undefined;
      this.currentCategory = 4;
      this.allOrders = [];
      this.uniqueIng = {};
      this.chosenIngredients = [];
      this.price = 0;
      this.showNothing = true;

    },
    // I am not sure this is te best solution so i have commeted all places that effects this solution
    final_page: function () {
    this.showmenue = false;
    this.showAll = true;

    },

    pay_page: function (){
        this.showmenue = false;
        this.showAll = false;
        this.showNothing = false;


    }
  }
};






</script>
<style scoped>
  .root-container {
    height: 100%;
  }

  .welcome-container {
    display: flex;
    flex-direction: column;
  }

  /* first screen */
  .top-container-1 {
    display: flex;
    padding-bottom: 1em;
    justify-content: center;
    margin-top: 20px;
  }

  /* second screen */
  .top-container-2 {
    display: flex;
    /* justify-content: center; */
    padding-bottom: 1em;
    justify-content: space-between;
  }

  .language-container {
    flex: 1;
    display: flex;
    justify-content: center;
  }

  .swedish-icon {
    padding-right: 0.5em;
  }

  .language-icon {
    opacity: 0.7;
  }

  .language-icon:hover {
    opacity: 1;

  }

  .order-option-container {
    display: flex;
    justify-content: space-around;
  }

  .ordering-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .header-container {
    flex: 0.1;
    max-height: 80px;
    align-self: center;
  }

  .main-container {
    padding-top: 3em;
    flex: 0.9;
    display: flex;
  }

  .category-container {
    flex: 0.8;
  }

  .category-buttons-container {
    flex: 0.2;
    justify-content: space-evenly;
    max-width: 300px;
    padding-right: 3em;
    padding-left: 2em;
    padding-top: 5em;
    display: flex;
    flex-direction: column;
  }

  .category-button {
    font-size: 1.2em;
  }

  .your-order-container {
    border: 3px dashed;
    display: flex;
    flex-direction: column;
    min-height: 20em;
    min-width: 10em;
  }

  .ordered-items-container {
    flex: 1;
  }

  .top-line-container {
    display: flex;
    justify-content: space-between;
  }
  .added-items-container {
    padding-top: 1em;
  }
  .place-order-button {
    margin-top: 1em;
  }

  button:hover {
    cursor: pointer;
  }

/*
  @media (max-width: 420px) {
    .wrapper {
      grid-template-columns: 1fr;
    }
    .ingredient {
      width: calc(100% - 2em);
    }
  }*/

</style>
