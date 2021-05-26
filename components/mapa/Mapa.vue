<template>
  <CargarMapa
    :configMapa="configMapa"
    apiKey="AIzaSyByx2dcqeelRkZaplDpImZ6Mnoo9x6b3as"
  >
 
    <template slot-scope="{ google, map }">
      <Marcadores
        v-for="marker in markers"
        :key="marker.id"
        :marker="marker"
        :google="google"
        :map="map"
      />
    </template>
 
  </CargarMapa>
 
</template>

<script>
 
  import CargarMapa from '@/components/mapa/CargarMapa'
  import Marcadores from '@/components/mapa/Marcadores'
  import { configMapa } from '@/constants/configMapa'
 
  export default {
    components: {
      CargarMapa,
      Marcadores
    },
 
    data() {
      return {
        markers: [
          {
            id: "0",
            position: { lat: 9.440000, lng: -64.459999 },
            title: "Anaco le ville",
            // icon: "icon.png"
          },
          {
            id: "1",
            position: { lat: -12.025827, lng: -77.2679817 },
            title: "Lima - Perú"
          }
        ]
      };
    },
 
    computed: {
      configMapa() {
        return {
          ...configMapa,
          center: this.mapCenter
        };
      },
 
      mapCenter() {
        return this.markers[0].position;
      }
    }
  };
  
</script>