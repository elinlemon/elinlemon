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
      <div class="top-container-2" v-if="location !== undefined">

        <div class="language-container">
          <img class="swedish-icon language-icon" src="sweden.png" height="30" width="auto" v-on:click="selectLang('sv')">
          <img class="english-icon language-icon" src="united-kingdom.png" height="30" width="auto" v-on:click="selectLang('en')">
        </div>

        <button v-on:click="cancelOrder()">{{ uiLabels.cancelOrder }}</button>
      </div>
    <div class="ordering-container" v-if="location !== undefined && state === 'ordering'">
      <div class="main-container" >
                <!-- Is conected to the final_page -->
        <div class="category-buttons-container">
          <button class="category-button" v-on:click="setCurrentCategory(4)">{{uiLabels.bread}}</button>
          <button class="category-button" v-on:click="setCurrentCategory(1)">{{uiLabels.protein}}</button>
          <button class="category-button" v-on:click="setCurrentCategory(2)">{{uiLabels.toppings}}</button>
          <button class="category-button" v-on:click="setCurrentCategory(3)">{{uiLabels.dressing}}</button>
          <button class="category-button" v-on:click="setCurrentCategory(5)">{{uiLabels.sides}}</button>
          <button class="category-button" v-on:click="setCurrentCategory(6)">{{uiLabels.drinks}}</button>
        </div>

        <!--Contacting component bread with the right category-->
        <!-- Is conected to the final_page -->
        <div class="category-container">
          <IngredientCategory :ui-labels="uiLabels" :lang="lang" :ingredients="ingredients" :categoryNumber="currentCategory" v-on:ingredientAdded="ingredientAdded" v-on:ingredientRemoved="ingredientRemoved"/>
        </div>

        <div class="your-order-container">
          <div class="ordered-items-container">

            <div class="top-line-container">
              <span>{{uiLabels.yourOrder}}</span>
            </div>

            <div class="added-items-container">

              <div class="previous-order-items-container">

                <!-- Everything that is already in the shopping card (= previous orders) are displayed here -->
                <div v-for="menuItem in this.shoppingCart.menuItems">
                  <h5>{{uiLabels.order}} {{menuItem.id}}
                  <img class="remove-buttons" src="delete-symbol.png" height= 20 widht = auto v-on:click="removeOrder(menuItem)">
                  <img class="remove-buttons" src="edit.png" height = 20 width="auto" v-on:click="editOrder(menuItem)"></h5>


                  <div v-for="ingredient in menuItem.getPrintableIngredientList()">
                    <!-- TODO: account for language change here -->

                    <span v-if="getLang() === 'en'">{{ingredient.count}} {{ingredient.ingredient_en}}</span>
                    <span v-if="getLang() === 'sv'">{{ingredient.count}} {{ingredient.ingredient_sv}}</span>
                  </div>

                  <hr>
                </div>

              </div>

              <!-- The current menu item and all of its ingredients are displayed here -->
              <div class="current-order-items-container" v-for="ingredient in this.currentMenuItem.getPrintableIngredientList()">
                <span v-if="getLang() === 'en'">{{ingredient.count}} {{ingredient.ingredient_en}}</span>
                <span v-if="getLang() === 'sv'">{{ingredient.count}} {{ingredient.ingredient_sv}}</span>
              </div>

            </div>
          </div>

          <div>
            <span>Tot: {{ totalPrice }} kr</span>
          </div>

          <!-- Is conected to the final_page -->
          <div class="checkout-controls-container">
            <button class="checkout-buttons" v-on:click="goToCheckout()">{{uiLabels.placeOrder}} </button>
            <button class="checkout-buttons" v-on:click="addNewOrder()">{{uiLabels.newOrder}}</button>
          </div>

        </div>
      </div>
    </div>

    <Checkout v-if="state === 'checkout'" :lang="lang" :shoppingCart="this.shoppingCart"
              @goBack="goBackFromCheckout()" @cancelOrder="cancelOrder()" @orderPlaced="notifyBackend()"></Checkout>

  </div>
</template>
<script>
//import methods and data that are shared between ordering and kitchen views
import Ingredient from "@/components/Ingredient.vue";
import OrderItem from "@/components/OrderItem.vue";
import IngredientCategory from "@/components/categories/IngredientCategory.vue";
import Checkout from "@/components/Checkout.vue";
//import methods and data that are shared between ordering and kitchen views
import sharedVueStuff from "@/components/sharedVueStuff.js";

import { ShoppingCart, MenuItem } from "../ShoppingCart";

/* instead of defining a Vue instance, export default allows the only
necessary Vue instance (found in main.js) to import your data and methods */
export default {
  name: "Ordering",
  components: {
    Ingredient,
    OrderItem,
    IngredientCategory,
    Checkout
  },
  mixins: [sharedVueStuff], // include stuff that is used in both
  // the ordering system and the kitchen
  data: function() {
    //Not that data is a function!
    return {
      location: undefined,
      price: 0,
      orderNumber: 0,
      currentCategory: 4,   // == bread default
      state: "ordering",    // can be "ordering", "checkout" and "payment"
      ingredients: this.ingredients,

      // a shopping cart is a list of individual orders
      shoppingCart: new ShoppingCart(),
      currentMenuItem: new MenuItem()
    };
  },

  computed: {
    totalPrice: function() {
      // we only place the currentMenuItem into the shoppingCart at checkout or when clicking "new order"
      // this is why we need to dynamically compute the total price here
      return this.shoppingCart.totalPrice + this.currentMenuItem.totalPrice;
    }
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
      this.currentMenuItem.addIngredient(ingredient)
    },

    ingredientRemoved: function(ingredient) {
      this.currentMenuItem.removeIngredient(ingredient);
    },

    addNewOrder: function() {
      this.currentMenuItem.ingredients.forEach(i => delete i.count);
      this.shoppingCart.addMenuItem(this.currentMenuItem);
      this.currentMenuItem = new MenuItem();
      this.currentCategory = 4;
    },

    removeOrder: function(menuItem) {
      this.shoppingCart.removeMenuItem(menuItem);
    },

    setLocation: function(location) {
      this.location = location;
      this.uniqueIng = {};
      this.price = 0;
      // Is connected to the final_page
    },

    setCurrentCategory: function(category) {
      this.currentCategory = category;
    },

    cancelOrder: function () {
      this.state = "ordering"
      this.location = undefined;
      this.currentCategory = 4;

      this.shoppingCart = new ShoppingCart();
      this.currentMenuItem = new MenuItem();
    },

    notifyBackend: function() {
      // reset the view
      this.cancelOrder();
    },

    goToCheckout: function() {
      if (!this.currentMenuItem.isEmpty()) {
          this.shoppingCart.addMenuItem(this.currentMenuItem);
      }

      this.currentMenuItem = new MenuItem();
      this.state = "checkout";
    },

    goBackFromCheckout: function() {
      this.state = "ordering";
    },

    editOrder: function(menuItem) {
      // save current order if not empty
      if (!this.currentMenuItem.isEmpty()) {
        this.shoppingCart.addMenuItem(this.currentMenuItem);
      }

      this.currentMenuItem = menuItem;
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
  .remove-buttons:hover {
    opacity: 40%;
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
    padding: 10px;
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
  .checkout-controls-container {
    display: flex;
    justify-content: space-between;
    margin-top: 1em;
  }
  .checkout-buttons {
    font-size: 1em;
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
