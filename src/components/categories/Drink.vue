<template>
  <div>
      <!-- hello from Drink in {{lang}} -->
  </div>
</template>
<script>

const CATEGORY_NUMBER = 6;

export default {
  name: 'Drink',
  props: {
    item: Object,
    lang: String
  },
    data: function () {
    return {
      categoryNumber: 6
    };
  },
  methods: {
  }
}
</script>
<style scoped>
  
</style>