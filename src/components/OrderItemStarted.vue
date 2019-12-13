<template>
    <div class="style">
    <OrderItem
            :ui-labels="uiLabels"
            :lang="lang"
            :order-id="orderId"
            :order="order">
    </OrderItem>
    <button v-on:click="orderDone">
        {{uiLabels.ready}}
    </button>
    </div>
</template>

<script>
    import OrderItem from '@/components/OrderItem.vue'
    import OrderItemToPrepare from '@/components/OrderItemToPrepare.vue'

    export default {
        name: 'OrderItemStarted',
        components: { OrderItem, OrderItemToPrepare },
        props: {
            uiLabels: Object,
            order: Object,
            orderId: String,
            lang: String,
        },
        methods: {
            orderDone: function () {
                // sending 'done' message to parent component or view so that it
                // can catch it with v-on:done in the component declaration
                this.$emit('done');
            }
    }
    }
</script>

<style scoped>
    .style{
        width: 170px;
        height: 210px;
        margin: 10px;
        float: left;
    }

</style>