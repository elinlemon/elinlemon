<template>
  <div>
      hello from Toppings in {{lang}}
  </div>
</template>
<script>
const CATEGORY_NUMBER = 2;

export default {
  name: 'Toppings',
  props: {
    item: Object,
    lang: String
  },
    data: function () {
    return {
      categoryNumber: 2
    };
  },
  methods: {
  }
}
</script>
<style scoped>
  
</style>