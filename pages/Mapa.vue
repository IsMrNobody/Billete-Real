<template>
  <div class="mapa">
     <!-- <Mapa class="mapa" /> -->
     <!-- <Mapa3 /> -->
     <Mapa3b />
     <div class="text-center">
         <h3>Distancia:</h3>
        <p>{{ metros }}m</p>
     </div>
  </div>
</template>

<script>
// import Mapa from '@/components/mapa/Mapa'
// import Mapa3 from '@/components/mapa3/Mapa3'
import Mapa3b from '@/components/mapa3/Mapa3b'
export default {
    components: {
        // Mapa,
        // Mapa3,
        Mapa3b
    },
    computed: {
        metros() {
            return this.$store.state.distance.metros
        }
    }
}
</script>

<style>
.mapa {
    height: 600px;
}
</style>