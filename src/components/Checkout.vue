<template>
  <div class="main-container">
    
    <center><h1>Checkout</h1></center>

    <button v-on:click="goBack()">Go back</button>
    
    <!-- {{uiLabels.pay}} -->
    <button v-on:click="goToPaymentPage()">Pay</button>

  </div>
</template>

<script>
export default {
  name: 'Checkout',
  props: {
    lang: String,
    shoppingBasket: Array
  },
    data: function () {
    return {
    };
  },
  methods: {
    goBack: function() {
        this.$emit('goBack');
    }
  }
}
</script>
<style scoped>
.main-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
}
  
</style>