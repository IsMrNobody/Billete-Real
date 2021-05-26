<template>
    <div>
        <v-btn @click="verMarker">ver marker</v-btn>
        <v-btn @click="trazo">ver trazo</v-btn>
    <GmapMap
        :center="center"
        :zoom="14"
        map-type-id="terrain"
        style="width: 500px; height: 800px"
         :options="{
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: true,
            disableDefaultUi: false
            }"
    >
    <GmapMarker
        :key="index"
        v-for="(m, index) in marcadores"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center=m.position"
    />
    <gmap-polygon :paths="paths"></gmap-polygon>
    </GmapMap>
    </div>
</template>

<script>
import maps from '@/plugins/google-maps'

const casa = { lat: 9.425323222584291, lng: -64.48461807773421 }
const cancha = { lat: 9.456016049470024, lng: -64.47827335300975}

export default {
    name: maps,
    data() {
        return {
            marcadores: [],
            center: casa,
            paths: []
        }
    },
    methods: {
        verMarker() {
            this.marcadores = [
             {
                position: casa
             },
             {
                position: cancha
             }
            ]
            console.log(this.marcadores)
        },
        trazo() {
            this.paths = [casa, cancha]
        }
    }
}
</script>