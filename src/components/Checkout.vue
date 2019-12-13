<template>
  <div>
    <div class="main-container" v-if="!this.paid">


      <div class="shopping-cart-container">

        <div v-for="menuItem of this.shoppingCart.menuItems" class="stylemenu">
          <div> Order: {{menuItem.id}}
          <img class="remove-buttons" src="delete-symbol.png" height = 20 width=20 v-on:click="removeOrder(menuItem)">
          <img class="remove-buttons" src="edit.png" height = 20 width=20 v-on:click="editOrder(menuItem)"></div>

          <div v-for="ingredient of menuItem.getPrintableIngredientList()">
              <h3> {{ingredient.count}} x {{ingredient.selling_price}}:-
                <span v-if = "lang ==='en'"> {{ingredient.ingredient_en}} </span>
            <span v-if = "lang ==='sv'"> {{ingredient.ingredient_sv}} </span>
             </h3>
          </div>
        </div>
      </div>

      </div>
      <div>Tot: {{ this.shoppingCart.totalPrice }}:- </div>
      <div class="reciet" id="pressedPayButton" style="display:none;">
       <h4>Thank you for your order! <br>
         Your order number: {{counter}}
       </h4>
        <button class="reciet-buttons" v-on:click="backToStartPage()">Go to start page</button>
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

</template>

<script>
import { ShoppingCart, MenuItem } from '../ShoppingCart';

export default {
  name: 'Checkout',
  props: {
    lang: String,
    shoppingCart: ShoppingCart,
    menuItem: MenuItem,
    uiLabels: Object
  },
    data: function () {
    return {
      paid: false,
      counter: 0
    };
  },
  methods: {
    goBack: function() {
        this.$emit('goBack');
    },

    goToPaymentPage: function(shoppingCart) {
     // this.paid = true;

        // not sure if this is the way we're supposed to send the info, but otherwise the backend crashes
        this.shoppingCart.menuItems.forEach(menuItem => {
        this.$store.state.socket.emit('order', {order: menuItem});

          this.counter +=1;
          document.getElementById("pressedPayButton").style.display = "block";


      });

        // tell the Ordering view to reset and go back to the language selection
        //this.$emit('orderPlaced', shoppingCart);
    },

    backToStartPage: function(shoppingCart) {
      this.paid = true;
      this.$emit('orderPlaced', shoppingCart);

    },

    /*Does not work :-)*/
    removeOrder: function(menuItem) {
      this.shoppingCart.removeMenuItem(menuItem)
    },

    editOrder: function(menuItem) {

    },

    cancelOrder: function() {
      this.$emit('cancelOrder');
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
.remove-buttons:hover {
  opacity: 40%;
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
  height: 20em;
  flex-direction: column;
  width: auto;
}

</style>
