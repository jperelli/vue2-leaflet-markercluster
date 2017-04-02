import Vue from 'vue'
import Vue2LeafletMarkercluster from 'src/vue2-leaflet-markercluster'

describe('vue2-leaflet-markercluster.vue', () => {
  it('should render contents', () => {
    var vm = new Vue({
      el: document.createElement('div'),
      render: h => h(Vue2LeafletMarkercluster)
    })
    expect(vm.$el).to.be.ok
  })
})
