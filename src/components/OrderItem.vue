<template>
	<div class = "style-done-item">
		<h4>
		{{order.type}} {{uiLabels.order}} {{orderId}}:
		</h4>

		<li v-for="ingredient in order.ingredients">
			{{ingredient["ingredient_"+lang]}}
		</li>
	</div>

</template>
<script>
export default {
  name: 'OrderItem',
  props: {
    uiLabels: Object,
    order: Object,
    orderId: String,
    lang: String
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