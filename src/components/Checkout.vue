<template>
  <div class="root-container">
    <div class="main-container" v-if="!this.paid">


      <div class="shopping-cart-container">

        <div v-for="menuItem of this.shoppingCart.menuItems" v-bind:key="menuItem.id" class="stylemenu">

          <div>

            <div class="menu-item-header">
              <span>{{uiLabels.meal}} {{menuItem.id}}</span>

              <div class="buttons-container">
                <img class="remove-buttons delete-button" title="Delete" src="delete-symbol.png" height = 20 width=20 v-on:click="removeOrder(menuItem)">
                <img class="remove-buttons" title="Edit" src="edit.png" height = 20 width=20 v-on:click="editOrder(menuItem)"></div>
              </div>
            </div>
            <div v-for="ingredient of menuItem.getPrintableIngredientList()" v-bind:key="ingredient.id">
              <h4> {{ingredient.count}} x {{ingredient.selling_price}}:-
                <span v-if = "lang ==='en'"> {{ingredient.ingredient_en}} </span>
                <span v-if = "lang ==='sv'"> {{ingredient.ingredient_sv}} </span>
              </h4>
            </div>
          </div>
        </div>

      <div class="receipt" id="pressedPayButton" style="display:none;">
       <h5>{{uiLabels.thanks}} </h5>
        <h6> {{uiLabels.orderConsists}}: {{orderNumber.join(", ")}}<br>
          {{uiLabels.totalPrice}}: {{this.shoppingCart.totalPrice }}:- <br>
          {{uiLabels.location}}:
         <span v-if = "location === 'eatIn'"> {{uiLabels.eatIn}} </span>
         <span v-if = "location === 'takeout'"> {{uiLabels.eatOut}} </span>
       </h6>
        <button class="receipt-buttons" v-on:click="backToStartPage()">{{uiLabels.backToStartPage}}</button>
      </div>
    </div>

    <div class="bottom-container">
      <div id="price-style" >{{uiLabels.totalPrice}}: {{ this.shoppingCart.totalPrice }}:-</div>

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
    uiLabels: Object,
    location: String
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

    goToPaymentPage: function() {
     // this.paid = true;

     // not sure if this is the way we're supposed to send the info, but otherwise the backend crashes
     this.shoppingCart.menuItems.forEach(menuItem => {
       this.$store.state.socket.emit('order', {order: menuItem});
       document.getElementById("pressedPayButton").style.display = "block";
      });
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
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: scroll;
}
.remove-buttons {
  opacity: 0.4;
}
.remove-buttons:hover {
  opacity: 1;
  cursor: pointer;
}

.delete-button {
  padding-right: 1.5em;
}

.cancel-order-button {
  margin-left: auto;
}


.shopping-cart-container {
  display: flex;
  justify-content: center;
  overflow-x: scroll;
  padding: 2.5em;
}


.controls-container {
  height: 80px;
  display: flex;
  justify-content: space-evenly;
  margin-top: 50px;
}

.control-buttons {
  font-size: 1.2em;
  min-width: 100px;
  background-color: #ffad33;
  color: white;
  border: 1px solid;
  border-radius: 20px;
  font-family: "Courier New";
  font-style: normal;
  font-weight: 400;
}

.control-buttons:hover {
  cursor: pointer;
}

.stylemenu {
  padding: 10px;
  margin-left: 1em;
  display: flex;
  height: 22em;
  width: 235px;
  flex-direction: column;
  background-color: white;
  overflow-y: auto;
  box-shadow: 1px 1px 30px grey;
  font-family: "Courier New";
  font-style: normal;
  font-weight: 400;
}

#price-style {
    font-size: 2.0em;
    text-transform: uppercase;
    text-align: center;
    font-family: "Courier New";
    color: #ffad33;
    font-style: normal;
    font-weight: bold;
    line-height: 20px;
    -webkit-text-fill-color: #ffad33; /* Will override color (regardless of order) */
    -webkit-text-stroke-width: 0.5px;
    -webkit-text-stroke-color: black;
}

.receipt {
  font-size: 3em;
  font-family: "Courier New";
  font-style: normal;
  font-weight: 400;
  background-color: white;
  text-align: center;
  border: solid;
  border-radius: 9px;
  position: fixed;
  top: 58%;
  left: 50%;
  transform: translate(-50%, -50%);
  }

  .receipt-buttons {
    border-radius: 8px;
    height: 40px;
    margin-bottom: 30px;
    background-color: #ffad33;
    font-family: "Courier New";
    font-style: normal;
    font-weight: 400;
    font-weight: bold;
    font-size: 0.5em;
  }

  .receipt-buttons:hover{
    cursor:pointer;
    opacity: 60%;
  }

  h4 {
    font-family: "Courier New";
    font-style: normal;
    font-weight: 400;
  }

  .menu-item-header {
    display: flex;
  }

  .buttons-container {
    margin-left: auto;
  }

  @media(max-width: 420px) {

    .shopping-cart-container {
      flex-direction: column;
    }

    .stylemenu {
      margin-left: 0;
    }

    .controls-container {
      margin-top: 1em;
      margin-bottom: 1em;
    }

    #pressedPayButton {
      width: 98%;
    }

  }
</style>
