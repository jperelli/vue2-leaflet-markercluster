<template>
  <div style="display: none;">
    <slot v-if="ready"></slot>
  </div>
</template>

<script>
import { MarkerClusterGroup } from 'leaflet.markercluster'
import { findRealParent, propsBinder } from 'vue2-leaflet'
import { DomEvent } from 'leaflet'

const props = {
  options: {
    type: Object,
    default() { return {}; },
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
    this.mapObject = new MarkerClusterGroup(this.options);
    DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, props);
    this.ready = true;
    this.parentContainer = findRealParent(this.$parent);
    this.parentContainer.addLayer(this);
    this.$nextTick(() => {
      this.$emit('ready', this.mapObject);
    });
  },
  beforeDestroy() {
    this.parentContainer.removeLayer(this);
  },
  methods: {
    addLayer(layer, alreadyAdded) {
      if (!alreadyAdded) {
        this.mapObject.addLayer(layer.mapObject);
      }
    },
    removeLayer(layer, alreadyRemoved) {
      if (!alreadyRemoved) {
        this.mapObject.removeLayer(layer.mapObject);
      }
    }
  }
};
</script>
