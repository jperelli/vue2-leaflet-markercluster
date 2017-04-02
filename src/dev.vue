<template>
  <div id="app" class="component">
    <v-map :zoom=10 :center="initialLocation">
      <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
      <v-markercluster>
        <v-marker v-for="latlng in latlngs" :lat-lng="latlng">
        </v-marker>
      </v-markercluster>
    </v-map>
  </div>
</template>

<script>
import L from 'leaflet'
import Vue2Leaflet from 'vue2-leaflet'
import Vue2LeafletMarkercluster from './vue2-leaflet-markercluster'

export default {
  name: 'app',
  components: {
    'v-map': Vue2Leaflet.Map,
    'v-tilelayer': Vue2Leaflet.TileLayer,
    'v-marker': Vue2Leaflet.Marker,
    'v-markercluster': Vue2LeafletMarkercluster
  },
  data () {
    return {
      initialLocation: L.latLng(-34.9205, -57.953646),
      latlngs: [
        L.latLng(-34.9105, -57.953646),
        L.latLng(-34.9205, -57.963646),
        L.latLng(-34.9305, -57.973646),
        L.latLng(-34.9105, -57.953646),
        L.latLng(-34.9205, -57.954646),
        L.latLng(-34.9305, -57.955646)
      ]
    }
  }
}
</script>

<style>
  @import "~leaflet/dist/leaflet.css";
  @import "~leaflet.markercluster/dist/MarkerCluster.css";
  @import "~leaflet.markercluster/dist/MarkerCluster.Default.css";
  html, body, #app {
    height: 100%
  }
</style>
