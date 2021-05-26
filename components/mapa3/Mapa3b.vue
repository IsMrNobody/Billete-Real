<template>
    <div>
        <input
          type="text"
          name="location"
          :value="location.coordinates"
          disabled
        />
        <div id="map"></div>
    </div>
</template>

<script>
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = 'pk.eyJ1Ijoiam9zZW1pbGxhbiIsImEiOiJja2FlbHRzaDQwMjFsMndub2kyb3V1cngyIn0.7GdKSjK9jTIcA3is072-Lg';
export default {
  data() {
    return {
      mapboxAccessToken: 'pk.eyJ1Ijoiam9zZW1pbGxhbiIsImEiOiJja2FlbHRzaDQwMjFsMndub2kyb3V1cngyIn0.7GdKSjK9jTIcA3is072-Lg',
      mapStyle: "mapbox://styles/josemillan/ckag0pl3w08e51is6gpvgvlpp",
      coordinates: [-64.47991924518927, 9.45610890636727, 5],
      coordinates2: [-64.48458992452852, 9.425308367427673, 5],
      distance: '',
      map: null,
      location: {
        type: "Point",
        coordinates: []
      }
    }
  },
  mounted() {
      this.initMap()
  },
  computed: {
    pop() {
      const popup = new mapboxgl.Popup({ offset: 25 }).setText(
        'Construction on the Washington Monument began in 1848.'
        );
        return popup
    }
  },
  methods: {
      initMap() {
            // Create map object
            this.map = new mapboxgl.Map({
                container: "map",
                style: "mapbox://styles/josemillan/ckag0pl3w08e51is6gpvgvlpp",
                center: this.coordinates2,
                zoom: 14,
                pitch: 45
            })
            this.map.on("click", (e) => {
            this.setLocationCoordinates(e.lngLat);
            this.map.flyTo({ center: this.coordinates, zoom: 13 });
            // this.removeMapMarkers();
            // this.addMapMarker(e.lngLat)
            this.map.addSource('route', {
              'type': 'geojson',
              'data': {
              'type': 'Feature',
              'properties': {},
              'geometry': {
              'type': 'LineString',
              'coordinates': [
              [-64.47991924518927, 9.45610890636727, 5],
              [-64.48, 9.4551],
              [-64.4804, 9.4528],
              [-64.4793, 9.4503],
              [-64.4792, 9.4316],
              [-64.4827, 9.4316],
              [-64.4829, 9.4264],
              [-64.483, 9.425,],
              [-64.4845, 9.4252],
              [-64.48458992452852, 9.425308367427673, 5]
              ]
              }
              }
              });
              this.map.addLayer({
              'id': 'route',
              'type': 'line',
              'source': 'route',
              'layout': {
              // 'line-join': 'miter',
              // 'line-cap': 'butt'
              },
              'paint': {
              'line-color': 'orange',
              'line-width': 7
              }
              });
			});
            this.addMapMarker(this.coordinates)
            this.addMapMarker(this.coordinates2)
            // distancia entre dos puntos
            const casa = new mapboxgl.LngLat(-64.47991924518927, 9.45610890636727, 5);
            const cancha = new mapboxgl.LngLat(-64.48458992452852, 9.425308367427673, 5);
            const metros = casa.distanceTo(cancha)
            this.distance = Math.round(metros)
            this.$store.dispatch('distance/medirDistancia', this.distance)
            console.log(this.distance);
    },
    setLocationCoordinates(lngLat) {
			// Note I round to 4dp here. 0.0001 is equal to ~ 10 meters.
			// You can use more decimals if you need to though.
			this.location.coordinates = [
				Math.round(lngLat.lng * 10000) / 10000,
				Math.round(lngLat.lat * 10000) / 10000,
			];
		},
    addMapMarker(lngLat) {
		// you can set a colour here to match your website's palette.
		new mapboxgl.Marker({ color: "red" })
			.setLngLat(lngLat)
      .setPopup(this.pop)
			.addTo(this.map);
	},
  removeMapMarkers() {
		const oldMarker = document.querySelector(".mapboxgl-marker");
		if (oldMarker) {
			oldMarker.parentElement.removeChild(oldMarker);
		}
	},
  }
};
</script>

<style>
#map {
    width: 100%;
    height: 500px;
}
</style>
