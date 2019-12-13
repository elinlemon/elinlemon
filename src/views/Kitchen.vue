<template>
  <div id="orders">
  <div id="orders-to-prepare">
  <h1>{{ uiLabels.ordersInQueue }}</h1>
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
      <h1>{{ uiLabels.started }}</h1>
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
  <h1>{{ uiLabels.ordersFinished }}</h1>
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
    font-size: 1.4em;
  }

  #orders-to-prepare{
    border: dashed;
    height: 450px;
    widht: 100%;
  }

  #orders-started {
    border: dashed;
    height: 450px;
    widht: 100%;

  }

  #orders-done{
    border: dashed;
    widht: 100%;
    height: 450px;
  }
</style>
