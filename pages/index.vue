<template>
  <v-row justify="center">
    <v-col cols sm="7">
      <AgregarOferta />
    </v-col>
    <v-col>
      <Pedidos />
    </v-col>
    <!-- <Lista /> -->
  </v-row>
</template>

<script>
// import Lista from '~/components/Lista.vue'
import Pedidos from '@/components/orders/Pedidos'
import AgregarOferta from '@/components/AgregarOferta'

export default {
  components: {
    // Lista,
    Pedidos,
    AgregarOferta
  }
}
</script>

<style scoped>
  .mapa { 
    height: 425px;
  }
</style>
