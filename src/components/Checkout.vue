<template>
  <div>
    <div class="main-container" v-if="!this.paid">
  
      <div class="top-container">

        <div class="language-container">
          <img class="swedish-icon language-icon" src="sweden.png" height="30" width="auto" v-on:click="selectLang('sv')">
          <img class="english-icon language-icon" src="united-kingdom.png" height="30" width="auto" v-on:click="selectLang('en')">
        </div>

        <button v-on:click="cancelOrder()">Cancel</button>
      </div>


      <div class="shopping-cart-container">

        <div v-for="menuItem of this.shoppingCart.menuItems">

          <div v-for="ingredient of menuItem.getPrintableIngredientList()" class="stylemenu">
            <h3> {{ingredient.count}} {{ingredient.ingredient_en}} </h3>
    
          </div>

          <hr>
        </div>

      </div>


      <div class="controls-container">
        <button class="control-buttons" v-on:click="goBack()">Go back</button>
        <button class="control-buttons" v-on:click="goToPaymentPage()">Pay</button>

      </div>




      
    </div>

    <div class="thank-you-container" v-if="this.paid">
      Thank you for your order!
      <!-- {{uiLabels.thanks}} -->
    </div>

  </div>
</template>

<script>
import { ShoppingCart } from '../ShoppingCart';
export default {
  name: 'Checkout',
  props: {
    lang: String,
    shoppingCart: ShoppingCart,
    uiLabels: Object
  },
    data: function () {
    return {
      paid: false
    };
  },
  methods: {
    goBack: function() {
        this.$emit('goBack');
    },

    goToPaymentPage: function() {
      this.paid = true;
    },

    cancelOrder: function() {
      this.$emit("cancelOrder");
    }
  }
}
</script>
<style scoped>
.main-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
}

.top-container {
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

.cancel-order-button {
  margin-left: auto;
}

.thank-you-container {
  height: 100vh;
  display: flex;
}

.shopping-cart-container {
  flex: 1;
}

.controls-container {
  height: 80px;
  display: flex;
  justify-content: space-evenly;
}

.control-buttons {
  font-size: 1.2em;
}

.stylemenu {
  
}
  
</style>