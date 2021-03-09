<template>
    <v-row>
        <v-col v-for="(pedido, i) in datos" :key="i">
            <Pedidos :pedido="pedido" />
        </v-col>
    </v-row>
</template>

<script>
export default {
    computed: {
        datos() {
        return this.$store.state.rates.data
        },
    }
}
</script>