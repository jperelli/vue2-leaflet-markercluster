<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import L from 'leaflet'
import 'leaflet.markercluster'


export default {
  props: [ 'options' ],
  watch: {
    options: function() {
      this._remove()
      this._add()
    }
  },
  mounted () {
    this._add()
  },
  beforeDestroy () {
    this._remove()
  },
  methods: {
    deferredMountedTo (parent) {
      this.parent = parent
      for (var i = 0; i < this.$children.length; i++) {
        this.$children[i].deferredMountedTo(this.markerCluster)
      }
      this.markerCluster.addTo(parent);
      [
        'clusterclick',
        'clustermouseover',
        'clustermouseout',
        'animationend',
        'spiderfied',
        'unspiderfied'
      ].forEach(eName =>
        this.markerCluster.on(
          eName,
          e => this.$emit('l-' + eName, e)
        )
      )
    },
    _remove () {
      this.parent.removeLayer(this.markerCluster)
    },
    _add () {
      this.markerCluster = L.markerClusterGroup(this.options)
      if (this.$parent._isMounted) {
        this.deferredMountedTo(this.$parent.mapObject)
      }
    },
  }
}
</script>
