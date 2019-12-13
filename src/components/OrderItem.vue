<template>
	<div class = "order-style">
		{{order.type}} {{uiLabels.order}} {{orderId}}:
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
	.order-style{
		width: 170px;
		height: 210px;
		margin: 10px;
		float: left;

	}
	
</style>