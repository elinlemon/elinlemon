<template>
  <div>
      hello from Dressing in {{lang}}
  </div>
</template>
<script>
export default {
  name: 'Dressing',
  props: {
    item: Object,
    lang: String
  },
    data: function () {
    return {
      counter: 0
    };
  },
  methods: {
  }
}
</script>
<style scoped>
  
</style>