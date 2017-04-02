# vue2-leaflet-markercluster

This is a [markercluster plugin](https://github.com/Leaflet/Leaflet.markercluster) extension for [vue2-leaflet package](https://github.com/KoRiGaN/Vue2Leaflet)

## Install

    npm install --save vue2-leaflet-markercluster

## Usage

### on &lt;template&gt; add

something like this

    <v-map :zoom=10 :center="initialLocation">
      <v-icondefault :image-path="'/statics/leafletImages/'"></v-icondefault>
      <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
      <v-marker-cluster>
        <v-marker v-for="c in cases" v-if="c.location !== null" :lat-lng="c.latlng">
          <v-popup :content="c.tooltipContent"></v-popup>
        </v-marker>
      </v-marker-cluster>
    </v-map>

### on &lt;script&gt; add

#### option 1

In the same template file, at `<script>` part, this will make the component available only to the template in this file

    import Vue2LeafletMarkercluster from 'vue2-leaflet-markercluster'
    ...
    export default {
      ...
      components: {
        'v-marker-cluster': Vue2LeafletMarkerCluster
        ...
      },
      ...
    }

#### option 2

At main Vue configuration, this will make the component available to all templates in your app

    import Vue from 'vue'
    import Vue2LeafletMarkercluster from 'vue2-leaflet-markercluster'
    ...
    Vue.component('v-marker-cluster', Vue2LeafletMarkerCluster)

### on &lt;style&gt; add

    @import "~leaflet.markercluster/dist/MarkerCluster.css";
    @import "~leaflet.markercluster/dist/MarkerCluster.Default.css";

## Sample app

There is a working example in file `src/dev.vue`. You can run that demo with this:

    npm install
    npm run dev

## Author

[Julián Perelli](https://jperelli.com.ar/)

## License

MIT
