<template>
  <!-- Note in this component that it is using another component -->
<div class="style-prepare-item">
  <OrderItem
    :ui-labels="uiLabels"
    :lang="lang"
    :order-id="orderId"
    :order="order">
  </OrderItem>
  <br>
  <button v-on:click="orderStarted">
    {{uiLabels.started}}
  </button>
</div>
</template>
<script>
import OrderItem from '@/components/OrderItem.vue'

export default {
  name: 'OrderItemToPrepare',
  components: { OrderItem },
  props: {
    uiLabels: Object,
    order: Object,
    orderId: String,
    lang: String,
  },
  methods: {
    /*
    orderDone: function () {
      // sending 'done' message to parent component or view so that it
      // can catch it with v-on:done in the component declaration
      this.$emit('done');
    }, */
    orderStarted: function() {
      this.$emit('orderStarted');
    }
  }
}
</script>
<style scoped>

  .style-prepare-item {
    background-color: beige;
    color: black;
    border-radius: 5px;
  }

  button:hover{
    cursor: pointer;
  }

  button {
    margin-left: 50px;
  }
</style>