export default {
  methods: {
    getRelevantIngredients: function(category, allIngredients) {
      return allIngredients.filter(i => i.category === category);
    }
  }
}
