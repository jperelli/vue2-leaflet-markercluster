<template>
  <div style="display: none;">
    <slot v-if="ready"></slot>
  </div>
</template>

<script>
import L from 'leaflet'
import 'leaflet.markercluster'

import { findRealParent, propsBinder } from 'vue2-leaflet'

const props = {
  options: {
    type: Object,
    default() { return {}; },
  },
  bulk: {
    type: Boolean,
    default() { return false; },
  },
};

export default {
  props,
  data() {
    return {
      ready: false,
    };
  },
  mounted() {
    this.mapObject = L.markerClusterGroup(this.options);
    L.DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, props);
    this.ready = true;
    this.parentContainer = findRealParent(this.$parent);
    this.parentContainer.addLayer(this);
    this.childrenLayers = []
  },
  beforeDestroy() {
    this.parentContainer.removeLayer(this);
  },
  methods: {
    addLayer(layer, alreadyAdded) {
      if (!alreadyAdded) {
        if (!this.bulk) {
          this.mapObject.addLayer(layer.mapObject);
        }
        else {
          this.childrenLayers.push(layer.mapObject)
          if (this.$children.length == this.childrenLayers.length) {
            this.mapObject.addLayers(this.childrenLayers);
            this.childrenLayers = [];
            console.log('mounted all')
          }
        }
      }
    },
    removeLayer(layer, alreadyRemoved) {
      if (!alreadyRemoved) {
        this.mapObject.removeLayer(layer.mapObject);
      }
    },
  },
};
</script>
