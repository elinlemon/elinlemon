<template>
  <div>
      hello from Protein in
  </div>
</template>
<script>
const CATEGORY_NUMBER = 1;

export default {
  name: 'Protein',
  props: {
    item: Object,
    lang: String
  },
    data: function () {
    return {
      categoryNumber: 1
    };
  },
  methods: {
  }
}
</script>

<style scoped>

</style>