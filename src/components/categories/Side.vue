<template>
  <div>
      hello from side in {{lang}}
  </div>
</template>
<script>
const CATEGORY_NUMBER = 5;

export default {
  name: 'Side',
  props: {
    item: Object,
    lang: String
  },
    data: function () {
    return {
      categoryNumber: 5
    };
  },
  methods: {
  }
}
</script>
<style scoped>
  
</style>