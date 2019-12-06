<template>
  <div>
    <!-- Welcome view -->
    <div class="welcome-container" v-if="location === undefined">
      <button v-on:click="switchLang()">{{ uiLabels.language }}</button>

      <h1>{{uiLabels.welcome}}</h1>

      <div class="order-option-container">
        <button v-on:click="setLocation('eatIn')">{{uiLabels.eatIn}}</button>
        <button v-on:click="setLocation('takeout')">{{uiLabels.eatOut}}</button>
      </div>
    </div>

    <!-- Main view -->
    <div class="ordering-container" v-else>
      <button v-on:click="switchLang()">{{ uiLabels.language }}</button>
      <button v-on:click="backtostartpage()">{{ uiLabels.cancelOrder }}</button>

      <!--Contacting component bread with the right category-->
      <div class="category-container">
        <Bread :ui-labels="uiLabels" :lang="lang" :ingredients="ingredients" :categoryNumber="currentCategory"/>
      </div>


      <div class="main-container">
        <div class="category-buttons-container">
          <button v-on:click="setCurrentCategory(4)">{{uiLabels.bread}}</button>
          <button v-on:click="setCurrentCategory(1)">{{uiLabels.protein}}</button>
          <button v-on:click="setCurrentCategory(2)">{{uiLabels.toppings}}</button>
          <button v-on:click="setCurrentCategory(3)">{{uiLabels.dressing}}</button>
          <button v-on:click="setCurrentCategory(5)">{{uiLabels.sides}}</button>
          <button v-on:click="setCurrentCategory(6)">{{uiLabels.drinks}}</button>
        </div>


        <div class="your-order-container">
          <div class="ordered-items-container">
            <span>{{uiLabels.yourOrder}}</span>
            <button>{{uiLabels.newOrder}}</button>
            <span>{{chosenIngredients.map(item => item["ingredient_" + lang]).join(', ')}},{{ price}}</span>
          </div>

          <div class="place-order-container">
            <button>{{uiLabels.placeOrder}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>


    //import methods and data that are shared between ordering and kitchen views


import Ingredient from "@/components/Ingredient.vue";
import OrderItem from "@/components/OrderItem.vue";
import Bread from "@/components/categories/Bread.vue";
//import methods and data that are shared between ordering and kitchen views
import sharedVueStuff from "@/components/sharedVueStuff.js";

/* instead of defining a Vue instance, export default allows the only
necessary Vue instance (found in main.js) to import your data and methods */
export default {
  name: "Ordering",
  components: {
    Ingredient,
    OrderItem,
    Bread,

  },
  mixins: [sharedVueStuff], // include stuff that is used in both
  // the ordering system and the kitchen
  data: function() {
    //Not that data is a function!
    return {
      location: undefined,
      chosenIngredients: [],
      price: 0,
      orderNumber: "",
      currentCategory: 4,   // == bread default
      ingredients: this.ingredients
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
    addToOrder: function(item) {
      this.chosenIngredients.push(item);
      this.price += +item.selling_price;
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
    },

    setCurrentCategory: function(category) {
      this.currentCategory = category;
    },

    backtostartpage: function () {
      this.location = undefined;
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

  .order-option-container {
    display: flex;
    flex-direction: row;
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
    flex: 0.9;
    display: flex;
  }

  .category-container {
    flex: 0.8;
  }

  .category-buttons-container {
    flex: 0.2;
    max-width: 300px;
    padding-right: 3em;
    display: flex;
    flex-direction: column;
  }

  .your-order-container {

    border: 3px dashed;
    position: right;
    display: flex;
    flex-direction: column;
  }

  .ordered-items-container {
    flex: 0.5;
  }

  .place-order-container {
    /* position: right; */
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
