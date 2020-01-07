<template>

	<!-- <div> -->

	<div class="style-done-item">
		<h4>
		{{order.type}} {{uiLabels.order}} {{orderId}}:
		</h4>

		<dt v-for="(ing, key2) in groupIngredients(order.ingredients)" :key="key2">
			{{ ing.count + " x " + ing.ing["ingredient_" + lang] }}
		</dt>
	</div>


	<!-- </div> -->

</template>
<script>

export default {
  name: 'OrderItem',
  props: {
    uiLabels: Object,
    order: Object,
    orderId: String,
    lang: String
  },
	methods: {
		groupIngredients(ingredients) {
			let grouped = []
			for (let i = 0; i < ingredients.length; i += 1) {
				let newIngredient = true
				for (let j = 0; j < grouped.length; j += 1) {
					if (ingredients[i].ingredient_id === grouped[j].ing.ingredient_id) {
						grouped[j].count += 1;
						newIngredient = false;
						break;
					}
				}
				if (newIngredient)
					grouped.push({ing: ingredients[i], count: 1})
			}
			return grouped;
		}
	}
}
</script>
<style scoped>
	h4 {
		padding-left: 2em;
	}
	li {
		padding-left: 0.15em;
	}

	.style-done-item{
		background-color: beige;
		color: black;
		border-radius: 5px;
	}	

	
</style>