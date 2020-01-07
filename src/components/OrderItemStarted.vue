<template>
    <div class="style-started-item">
        <OrderItem
                :ui-labels="uiLabels"
                :lang="lang"
                :order-id="orderId"
                :order="order">
        </OrderItem>
        <br>
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
        components: {OrderItem, OrderItemToPrepare},
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

    .style-started-item {
        background-color: beige;
        color: #fff;
        border-radius: 5px;

        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }

    button:hover {
        cursor: pointer;
    }

    button {
        margin: auto 10px 10px 10px;
    }
</style>