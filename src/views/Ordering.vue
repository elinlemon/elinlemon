<template>
  <div class="backdrop">
    <!-- Welcome view -->

    <div class="welcome-container" v-if="this.shoppingCart.orderLocation === undefined">
      <div class="top-container-1">
        <img class="swedish-icon language-icon" src="sweden.png" height="80" width="auto" v-on:click="selectLang('sv')">
        <img class="english-icon language-icon" src="united-kingdom.png" height="80" width="auto" v-on:click="selectLang('en')">
      </div>

      <div class="labels-container">
        <h1 class="welcome-label">{{uiLabels.welcome}}</h1>
        <img class="welcome-image" src="frontpage3.0.png">
      </div>

      <div class="order-option-container">
        <button class = "location-button" v-on:click="setLocation('eatIn')">{{uiLabels.eatIn}}</button>
        <button class = "location-button" v-on:click="setLocation('takeout')">{{uiLabels.eatOut}}</button>
      </div>
    </div>

    <!-- Main view -->
    <div class="top-container-2" v-if="this.shoppingCart.orderLocation !== undefined">
        <div class="language-container">
          <img class="swedish-icon language-icon" src="sweden.png" height="80" width="auto" v-on:click="selectLang('sv')">
          <img class="english-icon language-icon" src="united-kingdom.png" height="80" width="auto" v-on:click="selectLang('en')">

        </div>
        <button class="cancel-order-button" v-on:click="cancelOrder()">{{ uiLabels.cancelOrder }}</button>
    </div>

    <div class="ordering-container" v-if="this.shoppingCart.orderLocation !== undefined && state === 'ordering'">
      <div class="main-container">
        <!-- Is conected to the final_page -->

        <div class="category-buttons-container">
          <button v-bind:class="{active:active[3], categorybutton:true}" v-on:click="setCurrentCategory(4)">{{uiLabels.bread}}</button>
          <button v-bind:class="{active:active[0], categorybutton:true}" v-on:click="setCurrentCategory(1)">{{uiLabels.protein}}</button>
          <button v-bind:class="{active:active[1], categorybutton:true}" v-on:click="setCurrentCategory(2)">{{uiLabels.toppings}}</button>
          <button v-bind:class="{active:active[2], categorybutton:true}" v-on:click="setCurrentCategory(3)">{{uiLabels.dressing}}</button>
          <button v-bind:class="{active:active[4], categorybutton:true}" v-on:click="setCurrentCategory(5)">{{uiLabels.sides}}</button>
          <button v-bind:class="{active:active[5], categorybutton:true}" v-on:click="setCurrentCategory(6)">{{uiLabels.drinks}}</button>
        </div>

        <!--Contacting component bread with the right category-->
        <!-- Is conected to the final_page -->
        <div class="category-container">
          <IngredientCategory class="ingredient-category" :currentMenuItem ="currentMenuItem" :ui-labels="uiLabels" :lang="lang" :ingredients="ingredients" :categoryNumber="currentCategory" v-on:ingredientAdded="ingredientAdded" v-on:ingredientRemoved="ingredientRemoved"/>
        </div>

        <div class="your-order-container">
          <div class="ordered-items-container">

            <div class="top-line-container">
              <h2>{{uiLabels.yourOrder}}</h2>
            </div>

            <div class="added-items-container">

              <div class="previous-order-items-container">

                <!-- Everything that is already in the shopping card (= previous orders) are displayed here -->
                <div v-for="menuItem in this.shoppingCart.menuItems" v-bind:key="menuItem.id">

                  <div class="menu-item-container">
                    <h4>{{uiLabels.meal}} {{menuItem.id}}</h4>

                    <div class="menu-item-controls">
                      <img class="remove-buttons" title="Edit" src="edit.png" height="20" width="auto" v-on:click="editOrder(menuItem)">
                      <img class="remove-buttons" title="Delete" src="delete-symbol.png" height="20" width="auto" v-on:click="removeOrder(menuItem)">
                    </div>
                  </div>

                  <div v-for="ingredient in menuItem.getPrintableIngredientList()" v-bind:key="ingredient.id">
                    <span v-if="getLang() === 'en'">{{ingredient.count}} {{ingredient.ingredient_en}}</span>
                    <span v-if="getLang() === 'sv'">{{ingredient.count}} {{ingredient.ingredient_sv}}</span>
                  </div>

                  <hr>
                </div>

              </div>

              <!-- The current menu item and all of its ingredients are displayed here -->
              <div class="current-order-items-container">

                <div class="menu-item-container" v-if="!this.currentMenuItem.isEmpty()">
                  <h4>{{uiLabels.currentOrder}}</h4>

                  <div class="menu-item-controls">
                    <img class="remove-buttons" title="Delete" src="delete-symbol.png" height="20" width="auto" v-on:click="removeCurrentOrder()">
                  </div>
                </div>

                <div v-for="ingredient in this.currentMenuItem.getPrintableIngredientList()" v-bind:key="ingredient.id">
                  <button class="plusAndMinusButton" v-on:click="ingredientRemoved(ingredient)">-</button>
                  <span>{{ingredient.count}}</span>
                  <button class="plusAndMinusButton" v-on:click="ingredientAdded(ingredient)">+</button>
                  <span v-if="getLang() === 'en'">{{ingredient.ingredient_en}}</span>
                  <span v-if="getLang() === 'sv'">{{ingredient.ingredient_sv}}</span>
                </div>
              </div>

            </div>
          </div>

          <div>
            <h4 class="total-price-label">{{uiLabels.totalPrice}}: {{ totalPrice }} kr</h4>
          </div>

          <!-- Is conected to the final_page -->
          <div class="checkout-controls-container">
            <button class="neworder-buttons" v-on:click="addNewOrder()" :disabled="!newOrderPossible()">{{uiLabels.newOrder}}</button>
            <button class="checkout-buttons" v-on:click="goToCheckout()" :disabled="!checkoutPossible()">{{uiLabels.placeOrder}} </button>
          </div>

        </div>
      </div>
    </div>

    <Checkout v-if="state === 'checkout'" :ui-labels="uiLabels" :lang="lang" :shoppingCart="this.shoppingCart" :location="this.shoppingCart.orderLocation"
              class="checkout-container"
              @goBack="goBackFromCheckout()"
              @cancelOrder="cancelOrder()"
              @orderPlaced="notifyBackend()"
              @editOrder="editOrderFromCheckout"></Checkout>

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
      active:[false,false, false, true, false, false],
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

    checkoutPossible: function() {
      return !this.currentMenuItem.isEmpty() || !this.shoppingCart.isEmpty();
    },

    newOrderPossible: function() {
      return !this.currentMenuItem.isEmpty();
    },

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
      this.active = [false, false, false, true, false, false];
    },

    removeOrder: function(menuItem) {
      this.shoppingCart.removeMenuItem(menuItem);
    },

    removeCurrentOrder: function() {
      this.currentMenuItem = new MenuItem();
    },

    setLocation: function(location) {
      this.shoppingCart.orderLocation = location;

      this.price = 0;
      // Is connected to the final_page
    },

    setCurrentCategory: function(category) {
      this.currentCategory = category;
      this.active=[false,false,false,false,false,false];
      this.active[category-1]=true;


    },

    cancelOrder: function () {
      this.state = "ordering";
      this.currentCategory = 4;
      this.active = [false,false, false, true, false, false];

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
      this.active = [false,false, false, true, false, false];
    },

    editOrder: function(menuItem) {
      // save current order if not empty
      if (!this.currentMenuItem.isEmpty()) {
        this.shoppingCart.addMenuItem(this.currentMenuItem);
      }

      // take to be edited menu item out of the shopping cart
      this.shoppingCart.removeMenuItem(menuItem);
      this.currentMenuItem = menuItem;
    },

    editOrderFromCheckout: function(menuItem) {
      this.state = "ordering";
      this.editOrder(menuItem);
    }
  }
};



</script>
<style scoped>
  .backdrop {
    height: 100%;
    background-image: linear-gradient(to top, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 1)), url("/background.png");
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    background-color: white;
  }
  h5 {
    margin: 0;
  }

  .welcome-container {
    display: flex;
    flex-direction: column;
    font-family: "Courier New";
    font-style: normal;
    font-weight: 400;
    height: 100%;
  }
  .labels-container {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .welcome-label {
    display: inline;
  }
  .welcome-image {
    width: 90%;
    max-width: 600px;
  }

  .remove-buttons {
    opacity: 0.4;
    cursor: pointer;
  }
  .remove-buttons:hover {
    opacity: 1;
  }

  /* first screen */
  .top-container-1 {
    display: flex;
    justify-content: end;
    margin-top: 20px;
    /* margin-right: 1em; */
  }

  /* second screen */
  .top-container-2 {
    display: flex;
    justify-content: end;
    /* justify-content: center; */

    padding-bottom: 1em;
    justify-content: space-between;
    /* padding-right: 4em; */
  }

  .cancel-order-button {
    /* mobile: to 0 */
    margin-right: 16px;
    margin-top: 20px;
    font-size: 1em;
    font-family: "Courier New";
    font-style: normal;
    font-weight: 400;
    border-radius: 20px;
    height: 50px;
    width: auto;
    display: flex;
    justify-content: right;
    background-color: #ffad33;
    color: white;
  }

  .cancel-order-button:hover {
    opacity: 70%;
  }

  .language-container {
    flex: 1;
    display: flex;
    justify-content: left;

    /* padding-left: 5px; */
    /* padding-right: 5px; */

    /* mobile: set to 0 */
    padding-top: 16px;
    padding-left: 16px;
  }
  .swedish-icon {
    padding-right: 0.5em;
  }
  .language-icon {
    opacity: 1;
  }

  .language-icon:hover {
    opacity: 0.9;
  }

  .order-option-container {
    flex: 1;
    display: flex;
    justify-content: space-around;
    padding-top: 10em;
  }
  .location-button{
    border-radius: 10px;
    max-height: 100px;
    width: 30%;
    max-width: 280px;
    font-size: 30px;
    font-family: "Courier New";
    font-style: normal;
    font-weight: 400;
    background-color: #ffad33;
  }

  .location-button:hover {
    opacity: 85%;
    cursor: pointer;
  }

  .ordering-container {
    flex-direction: column;
  }

  .main-container {
    padding-top: 1em;
    margin-bottom: 16px;
    display: flex;
  }

  .category-container {
    flex: 1;
    background-color: white;
    display: flex;
    box-shadow: 1px 1px 30px grey;
    border-radius: 30px;
  }

  .ingredient-category {
    width: 100%;
    padding: 0 16px 16px 16px;
  }

  .category-buttons-container {
    max-width: 400px;
    padding-right: 1em;
    padding-left: 1em;
    display: flex;
    flex-direction: column;
  }

  .categorybutton {
    font-size: 1.2em;
    border-radius: 20px;
    height: 80px;
    margin-bottom: 10px;
    font-family: "Courier New";
    font-style: normal;
    font-weight: 400;
    width: 180px;
  }

  .active, .categorybutton:hover {
  background-color: #ffad33;
  color: white;
}


  .your-order-container {
    flex: 0.1;
    min-width: 300px;
    margin: 0 auto 0 16px;
    padding-bottom: 16px;
    margin-right: 16px;
    display: flex;
    flex-direction: column;
    box-shadow: 1px 1px 30px grey;
    font-family: "Courier New";
    font-style: normal;
    font-weight: 400;
    background-color: #ffd699;
    border-radius: 30px;
  }

  .current-order-items-container{
    background-color: white;
  }

  .menu-item-container {
    display: flex;
    padding-right: 2px;
  }

  .menu-item-controls {
    margin-left: auto;
  }

  .ordered-items-container {
    flex: 1;
    overflow-y: scroll;
  }

  .top-line-container {
    text-align: center;
    justify-content: space-between;

  }
  .added-items-container {
    padding-top: 1em;
  }
  .checkout-controls-container {
    display: flex;
    justify-content: space-between;
    padding: 0 8px 0 8px;
  }
  .total-price-label {
    padding: 0 8px 0 8px;
  }
  .checkout-buttons {
    font-size: 1em;
    border-radius: 10px;
    height: 45px;
    width: auto;
    font-family: "Courier New";
    background-color: #ffad33;
    font-style: normal;
    font-weight: 400;
    color: white;
  }

  .checkout-buttons:hover{
    opacity: 60%;
  }

  .neworder-buttons{
    font-size: 1em;
    border-radius: 10px;
    height: 45px;
    width: auto;
    font-family: "Courier New";
    font-style: normal;
    font-weight: 400;
  }

  .neworder-buttons:hover{
    opacity: 60%;
  }

  .plusAndMinusButton{
    padding: 0;
    border: none;
    width: 15px;
    margin-right: 5px;
    margin-left: 5px;
    font-size: large;
    background-color: white;
  }


  .your-order-container-totprice{
    padding-top : 20px;
    display: flex;
    justify-content: center;
  }

  button:hover {
    cursor: pointer;
  }

  @media(max-width: 420px) {
    .top-container-1 {
      /* center language selection + add margin */
      justify-content: center;
      margin-bottom: 10%;
    }

    .category-container {
      grid-template-columns: 1fr;
    }

    .ordering-container {
      flex-direction: column;
      margin-bottom: 0;
    }

    .your-order-container {
      margin: 16px 0 16px 0;
    }

    .category-buttons-container {
      align-items: center;
    }

    .checkout-container {
      height: 100%;
    }
  }

</style>
