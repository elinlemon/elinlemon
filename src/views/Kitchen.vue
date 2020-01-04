<template>
  <div id="orders" class ="backgroundpicture">

      <div id="orders-to-prepare">
        <h1>{{ uiLabels.ordersInQueue }}:</h1>
        <OrderItemToPrepare
                v-for="(order, key) in orders"
                v-if="order.status !== 'done' && order.status !== 'started'"
                v-on:orderStarted="markStarted(key)"
                :order-id="key"
                :order="order"
                :ui-labels="uiLabels"
                :lang="lang"
                :key="key">
        </OrderItemToPrepare>
      </div>



      <div id="orders-started">
        <h1>{{ uiLabels.startedOrders}}:</h1>
        <OrderItemStarted
                v-for="(order, key) in orders"
                v-if="order.status !== 'done' && order.status === 'started'"
                v-on:done="markDone(key)"
                :order-id="key"
                :order="order"
                :ui-labels="uiLabels"
                :lang="lang"
                :key="key">
        </OrderItemStarted>
      </div>


      <div id="orders-done">
        <h1>{{ uiLabels.ordersFinished }}:</h1>
        <OrderItem
                v-for="(order, key) in orders"
                v-if="order.status === 'done'"
                :order-id="key"
                :order="order"
                :lang="lang"
                :ui-labels="uiLabels"
                :key="key">
        </OrderItem>
      </div>
  </div>
</template>

<script>
import OrderItem from '@/components/OrderItem.vue'
import OrderItemToPrepare from '@/components/OrderItemToPrepare.vue'
import OrderItemStarted from '@/components/OrderItemStarted.vue'
//import methods and data that are shared between ordering and kitchen views
import sharedVueStuff from '@/components/sharedVueStuff.js'
export default {
  name: 'Ordering',
  components: {
    OrderItem,
    OrderItemToPrepare,
    OrderItemStarted
  },
  mixins: [sharedVueStuff], // include stuff that is used in both
                            //the ordering system and the kitchen
  data: function(){
    return {
      chosenIngredients: [],
      price: 0
    }
  },
  methods: {
    markDone: function (orderid) {
      this.$store.state.socket.emit("orderDone", orderid);
    },
    markStarted: function(orderid) {
      this.$store.state.socket.emit("orderStarted", orderid);
    }
  }
}
</script>
<style scoped>

  h1 {
    text-transform: uppercase;
    font-family: "Courier New";
    font-size: 1.6em;
  }


    /* A lot of repeating code here, but didn't work when I put everything under the orders-ID */


  .backgroundpicture{
      background-image: url("/background.png");
      background-size: 500px;
      background-attachment: fixed;
      background-repeat: repeat;
      position: relative;
  }

  #orders-to-prepare{
    height: 40vh;
    width: 100%;
    display: grid;
    grid-gap: 6px;
    padding: 6px;
    grid-template-columns: repeat(auto-fill,minmax(160px,1fr));
    grid-auto-flow: column;
    grid-auto-columns: minmax(160px,1fr);
    overflow-x:auto;
    overflow-y: scroll;
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
      width:500px;
      background-color:white;
      margin-top:1em;
      border: 1px solid;
      border-radius:20px;
      margin-left: 10px;
  }

  #orders-started {
    height: 40vh;
    width: 100%;
    display: grid;
    grid-gap: 6px;
    padding: 6px;
    grid-template-columns: repeat(auto-fill,minmax(160px,1fr));
    grid-auto-flow: column;
    grid-auto-columns: minmax(160px,1fr);
    overflow-x:auto;
    overflow-y: scroll;
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
      width:500px;
      background-color:white;
      margin-top:1em;
      border: 1px solid;
      border-radius:20px;
      margin-left: 10px;
  }

  #orders-done{
    height: 40vh;
    width: 100%;
    display: grid;
    grid-gap: 6px;
    padding: 6px;
    grid-template-columns: repeat(auto-fill,minmax(160px,1fr));
    grid-auto-flow: column;
    grid-auto-columns: minmax(160px,1fr);
    overflow-x:auto;
    overflow-y: scroll;
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
      width:500px;
      background-color:white;
      margin-top:1em;
      border: 1px solid;
      border-radius:20px;
      margin-left: 10px;
  }
</style>
