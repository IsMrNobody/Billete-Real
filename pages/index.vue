<template>
  <v-row justify="center">
    <v-col cols sm="7">
      <AgregarOferta />
      <v-row justify="space-around" class="mt-4">
        <nuxt-link to="/mapa">
          <v-btn>Mapa</v-btn>
        </nuxt-link>
        <nuxt-link to="/perfil">
          <v-btn>perfil</v-btn>
        </nuxt-link>
        <nuxt-link to="/tablero">
          <v-btn>table</v-btn>
        </nuxt-link>
      </v-row>
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
