<template>
  <div>
    <!-- need to decide where the number 'counter' should be displayed -->

    <!-- <div class="wrapper">
        {{item["ingredient_"+ lang]}}, {{item.selling_price}}:-, {{item.stock}} pcs
    </div>-->

    <div class="wrapper">
      <div v-for="ingredient in this.ingredients" v-bind:key="ingredient.id" class="ingredItem">
        {{ingredient.ingredient_en}}
        <dt>
          <button class="wrapperButton" v-on:click="increaseCounter">+</button>
          <button class="wrapperButton" v-on:click="decreaseCounter">-</button>
        </dt>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IngredientGrid",
  props: {
    item: Object,
    lang: String,
    ingredients: Array
  },
  data: function() {
    return {
      counter: 0
    };
  },
  methods: {
    increaseCounter: function() {
      this.counter += 1;
      // need to emit this somehow with a message
    },
    decreaseCounter: function() {
      this.counter -= 1;
      // need to emit this somehow with a message
    }
  }
};
</script>

<style scoped>
.wrapper {
  display: grid;
  grid-gap: 1em;
  grid-template-columns: repeat(auto-fit, calc(9em + 15px));
  overflow: auto;
}

.wrapperButton {
  height: 20px;
  width: 20px;
  background-color: blueviolet;
}
</style>