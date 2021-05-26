<template>
  <MglMap
    :accessToken="mapboxAccessToken"
    :mapStyle.sync="mapStyle"
    :center="coordinates"
    :zoom="12"
  >
    <MglNavigationControl position="top-right"/>
    <MglGeolocateControl position="top-right" />
    <!-- <MglMarker :coordinates="coordinates" color="blue" /> -->
    <MglMarker :coordinates="coordinates2" color="red" />
    <MglMarker :coordinates="coordinates">
      <!-- <v-icon slot="marker">mdi-fire</v-icon> -->
        <MglPopup :coordinates="coordinates" anchor="top">
           <VCard> <div>Hello, I'm popup!</div> </VCard>
        </MglPopup>
    </MglMarker>
  </MglMap>
</template>

<script>
import mapboxgl from "mapbox-gl";
import { MglGeojsonLayer, MglMap, MglMarker, MglNavigationControl, MglGeolocateControl, MglPopup } from "vue-mapbox";
import 'mapbox-gl/dist/mapbox-gl.css';

export default {
  components: {
    MglMap,
    MglMarker,
    MglNavigationControl,
    MglGeolocateControl,
    MglPopup,
    MglGeojsonLayer
  },
  data() {
    return {
      mapboxAccessToken: 'pk.eyJ1Ijoiam9zZW1pbGxhbiIsImEiOiJja2FlbHRzaDQwMjFsMndub2kyb3V1cngyIn0.7GdKSjK9jTIcA3is072-Lg',
      mapStyle: "mapbox://styles/josemillan/ckag0pl3w08e51is6gpvgvlpp",
      coordinates: [-64.47991924518927, 9.45610890636727, 5],
      coordinates2: [-64.48458992452852, 9.425308367427673, 5],
      dataa: ''
    };
  },
  mounted() {
      this.info()
  },
  methods: {
      info() {
          const casa = new mapboxgl.LngLat(-64.47991924518927, 9.45610890636727, 5);
          const cancha = new mapboxgl.LngLat(-64.48458992452852, 9.425308367427673, 5);
          const metros = casa.distanceTo(cancha)
          this.dataa = Math.round(metros)
          this.$store.dispatch('distance/medirDistancia', this.dataa)
          console.log(this.dataa);
      }
  }
};
</script>