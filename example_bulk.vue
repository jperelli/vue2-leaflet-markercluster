<template>
  <v-map :zoom=10 :center="initialLocation">
    <v-icondefault></v-icondefault>
    <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
    <v-marker-cluster :bulk="true" :options="clusterOptions" @l-clusterclick="click()">
      <v-marker v-for="l in locations" :lat-lng="l.latlng" :icon="icon">
      </v-marker>
    </v-marker-cluster>
  </v-map>
</template>

<script>
  import Vue2Leaflet from 'vue2-leaflet/src/main'
  import Vue2LeafletMarkercluster from './Vue2LeafletMarkercluster'
  import iconUrl from 'leaflet/dist/images/marker-icon.png'
  import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

  function rand(n) {
    let max = n + 30
    let min = n - 30
    return Math.random() * (max - min) + min;
  }

  export default {
    components: {
      'v-map': Vue2Leaflet.Map,
      'v-tilelayer': Vue2Leaflet.TileLayer,
      'v-icondefault': Vue2Leaflet.IconDefault,
      'v-marker': Vue2Leaflet.Marker,
      'v-popup': Vue2Leaflet.Popup,
      'v-marker-cluster': Vue2LeafletMarkercluster
    },
    methods: {
      click: function (e) {
        alert("clusterclick")
      }
    },
    data () {
      let locations = []
      for (let i = 0; i < 30000; i++) {
        locations.push({
          latlng: window.L.latLng(rand(-34.9205), rand(-57.953646)),
          text: 'Hola ' + i
        })
      }
      let icon = window.L.icon(Object.assign({},
        window.L.Icon.Default.prototype.options,
        {iconUrl, shadowUrl}
      ))
      return {
        locations,
        icon,
        // IMPORTANT, set chunkLoading to speedup load when using bulk
        clusterOptions: { chunkedLoading: true },
        initialLocation: window.L.latLng(-34.9205, -57.953646)
      }
    }
  }
</script>

<style>
  @import "~leaflet/dist/leaflet.css";
  html, body {
    height: 100%
  }
  @import "~leaflet.markercluster/dist/MarkerCluster.css";
  @import "~leaflet.markercluster/dist/MarkerCluster.Default.css";
</style>