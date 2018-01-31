<template>
  <v-map :zoom=10 :center="initialLocation">
    <v-icondefault></v-icondefault>
    <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
    <v-marker-cluster :options="clusterOptions" @l-clusterclick="click()">
      <v-marker v-for="l in locations" :lat-lng="l.latlng" :icon="icon">
        <v-popup :content="l.text"></v-popup>
      </v-marker>
    </v-marker-cluster>
  </v-map>
</template>

<script>
  import Vue2Leaflet from 'vue2-leaflet'
  import Vue2LeafletMarkercluster from './Vue2LeafletMarkercluster'
  import iconUrl from 'leaflet/dist/images/marker-icon.png'
  import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

  function rand(n) {
    let max = n + 0.1
    let min = n - 0.1
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
      for (let i = 0; i < 100; i++) {
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
        clusterOptions: {},
        initialLocation: window.L.latLng(-34.9205, -57.953646)
      }
    },
    mounted() {
      setTimeout(() => {
        console.log('done')
        this.$nextTick(() =>{
          this.clusterOptions = { disableClusteringAtZoom: 11 }
        });
      }, 5000);
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