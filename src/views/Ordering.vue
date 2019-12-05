<template>
  <!-- Main template div -->
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
    <div class="main-container" v-if="location !== undefined">

      <div class="category-buttons-container">
        <button v-on:click="setCurrentCategory(4)">{{uiLabels.bread}}</button>
        <button v-on:click="setCurrentCategory(1)">{{uiLabels.protein}}</button>
        <button v-on:click="setCurrentCategory(2)">{{uiLabels.toppings}}</button>
        <button v-on:click="setCurrentCategory(3)">{{uiLabels.dressing}}</button>
        <button v-on:click="setCurrentCategory(5)">{{uiLabels.sides}}</button>
        <button v-on:click="setCurrentCategory(6)">{{uiLabels.drinks}}</button>
      </div>

      <!--Conacting component bread with the right categorynumber-->
      <div class="category-container">
        <Bread lang="en" :ingredients="this.ingredients" v-bind:categorynumber = this.categorynumber></Bread>
      </div>

      <div class="your-order-section">
        {{uiLabels.yourOrder}}
        <button>{{uiLabels.newOrder}}</button>
      </div>

      <div class="place-order">
        <button>{{uiLabels.placeOrder}}</button>
      </div>
    </div>
  </div>
</template>
<script>
//import the components that are used in the template, the name that you
//use for importing will be used in the template above and also below in
//components
import Ingredient from "@/components/Ingredient.vue";
import OrderItem from "@/components/OrderItem.vue";
// import Bread from "@/components/categories/Bread.vue";
// import Protein from "@/components/categories/Protein.vue";
// import Topping from "@/components/categories/Topping.vue";
// import Dressing from "@/components/categories/Dressing.vue";
// import Side from "@/components/categories/Side.vue";
// import Drink from "@/components/categories/Drink.vue";

//import methods and data that are shared between ordering and kitchen views
import sharedVueStuff from "@/components/sharedVueStuff.js";

/* instead of defining a Vue instance, export default allows the only 
necessary Vue instance (found in main.js) to import your data and methods */
export default {
  name: "Ordering",
  components: {
    Ingredient,
    OrderItem
    // Bread,
    // Protein
    // Topping,
    // Dressing,
    // Side,
    // Drink
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
      currentCategory: "bread",
      ingredients: this.ingredients,
      categorynumber: this.categorynumber
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
      this.categorynumber = category;
    }
  }
};
</script>
<style scoped>
.welcome-container {
  display: flex;
  flex-direction: column;
}
.order-option-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.main-container {
  display: flex;
}
.category-container {
  flex: 0.8;
}
.category-buttons-container {
  flex: 0.2;
  padding-right: 3em;
  display: flex;
  flex-direction: column;
}

.your-order-section {
  border: 3px dashed;
  position: right;
}
.place-order {
  position: right;
  margin-top: 100px;
}
</style>