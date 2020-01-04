<template>
  <div>
    <div class="main-container" v-if="!this.paid">


      <div class="shopping-cart-container">

        <div v-for="menuItem of this.shoppingCart.menuItems" v-bind:key="menuItem.id" class="stylemenu">
          <div> {{uiLabels.order}}: {{menuItem.id}}
          <img class="remove-buttons" title="Delete" src="delete-symbol.png" height = 20 width=20 v-on:click="removeOrder(menuItem)">
            <img class="remove-buttons" title="Edit" src="edit.png" height = 20 width=20 v-on:click="editOrder(menuItem)"></div>
          <div v-for="ingredient of menuItem.getPrintableIngredientList()" v-bind:key="ingredient.id">
              <h4> {{ingredient.count}} x {{ingredient.selling_price}}:-
                <span v-if = "lang ==='en'"> {{ingredient.ingredient_en}} </span>
            <span v-if = "lang ==='sv'"> {{ingredient.ingredient_sv}} </span>
             </h4>
          </div>
        </div>
      </div>
      <div id="price-style" >{{uiLabels.totalPrice}}: {{ this.shoppingCart.totalPrice }}:-</div>

      <div class="receipt" id="pressedPayButton" style="display:none;">
       <h4>{{uiLabels.thanks}} <br>
         {{uiLabels.orderConsists}}: {{orderNumber}}
       </h4>
        <button class="receipt-buttons" v-on:click="backToStartPage()">{{uiLabels.backToStartPage}}</button>
      </div>


      <div class="controls-container">
        <button class="control-buttons" v-on:click="goBack()">{{uiLabels.goback}}</button>
        <button class="control-buttons" v-on:click="goToPaymentPage()">{{uiLabels.pay}}</button>

      </div>


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
      orderNumber: []
    };
  },
  //listening to orderNumber  from kitchen, printing in checkout after pay-button is pushed
  created: function () {
    this.$store.state.socket.on('orderNumber', function (orderNumber) {

      this.orderNumber.splice(0,0,orderNumber);
    }.bind(this));
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


          document.getElementById("pressedPayButton").style.display = "block";


      });

        // tell the Ordering view to reset and go back to the language selection
        //this.$emit('orderPlaced', shoppingCart);
    },

    backToStartPage: function(shoppingCart) {
      this.paid = true;
      this.$emit('orderPlaced', shoppingCart);

    },

    removeOrder: function(menuItem) {
      this.shoppingCart.removeMenuItem(menuItem)
    },

    editOrder: function(menuItem) {
      this.$emit('editOrder', menuItem);
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
.remove-buttons {
  opacity: 0.4;
}
.remove-buttons:hover {
  opacity: 1;
  cursor: pointer;
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


.shopping-cart-container {
  display: flex;
  flex: 2;
  max-height: 27em;

}


.controls-container {
  height: 80px;
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 3em;
}

.control-buttons {
  font-size: 1.2em;
  width: 103px;
  background-color: white;
  margin-top: 1em;
  border: 1px solid;
  border-radius: 20px;
  font-family: "Courier New";
}

.control-buttons:hover {
  opacity: 50%;
  cursor: pointer;
}

.stylemenu {
  padding: 10px;
  margin-left: 1em;
  display: flex;
  height: 25em;
  width: 235px;
  flex-direction: column;
  background-color: white;
  overflow-y: auto;
  box-shadow: 1px 1px 30px grey;
  font-family: "Courier New";
}

#price-style {
  font-size: 1.7em;
  text-transform: uppercase;
  text-align: center;
  font-family: "Courier New";
  font-weight: bold;
  line-height: 20px;
  padding-top: 6px;
  padding-left: 6px;
  padding-bottom: 6px;
  padding-right: 6px;
  align: center;
  font-size: 1.2em;
  width:103px;
  background-color:white;
  margin-top:1em;
  border: 1px solid;
  border-radius:20px;
  margin-left: 600px;
}

.receipt {
  font-size: 3em;
  font-family: "Courier New";
  background-color: white;
  text-align: center;
  border: solid;
  border-radius: 9px;
  position: fixed;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  }

  .receipt-buttons {
    border-radius: 8px;
    height: 32px;
    margin-bottom: 4px;
    font-family: "Courier New";
  }

  .receipt-buttons:hover{
    cursor:pointer;
    opacity: 60%;
  }

  h4 {
    font-family: "Courier New";
  }

</style>
