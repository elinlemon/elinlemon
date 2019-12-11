<template>
  <div>
    <div class="main-container" v-if="!this.paid">


      <div class="shopping-cart-container">

        <div v-for="menuItem of this.shoppingCart.menuItems" class="stylemenu">

          <div v-for="ingredient of menuItem.getPrintableIngredientList()">
              <h3> {{ingredient.count}}
            <span v-if = "lang ==='en'"> {{ingredient.ingredient_en}} </span>
            <span v-if = "lang ==='sv'"> {{ingredient.ingredient_sv}} </span>
            {{ingredient.selling_price}}:- </h3>
          </div>
          <h4> Tot: {{menuItem.totalPrice}}:- </h4>
        </div>

      </div>

      <div class="controls-container">
        <button class="control-buttons" v-on:click="goBack()">Go back</button>
        <button class="control-buttons" v-on:click="goToPaymentPage()">Pay</button>

      </div>

      <div class="thank-you-container" v-if="this.paid">
        Thank you for your order!
        <!-- {{uiLabels.thanks}} -->
      </div>

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

    goToPaymentPage: function(shoppingCart) {
      this.paid = true;
      this.$emit('placedOrder', shoppingCart);
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
  display: flex;
  flex: 2;
}


.controls-container {
  height: 80px;
  display: flex;
  justify-content: space-evenly;
}

.control-buttons {
  font-size: 1.2em;
  margin-top: 1em;
}

.stylemenu {
  padding: 10px;
  border: 3px dashed;
  display: flex;
  flex-direction: column;
  height: 20em;
  width: 10em;
}

</style>
