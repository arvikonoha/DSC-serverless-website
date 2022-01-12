<script>
  import { onDestroy, onMount } from "svelte";
  import { maps } from "../../../../stores/maps/index.js";
  let map;
  let domLoaded = false;

  $: if ($maps.isReady && domLoaded) {
    map = new window.Microsoft.Maps.Map("#bing-map", {
      center: new window.Microsoft.Maps.Location(13.183139, 74.933949),
      zoom: 10,
      disableScrollWheelZoom: true
    });

    let pin = new window.Microsoft.Maps.Pushpin(map.getCenter(), {
      icon: "pushpinder.png",
      anchor: new Microsoft.Maps.Point(12, 39)
    });

    //Add the pushpin to the map
    map.entities.push(pin);
  } else {
    if (window.Microsoft && domLoaded) {
      map = new window.Microsoft.Maps.Map("#bing-map", {
        center: new window.Microsoft.Maps.Location(13.183139, 74.933949),
        zoom: 20,
        disableScrollWheelZoom: true
      });

      let pin = new window.Microsoft.Maps.Pushpin(map.getCenter(), {
        icon: "pushpinder.png",
        anchor: new Microsoft.Maps.Point(12, 39)
      });

      //Add the pushpin to the map
      map.entities.push(pin);
    }
  }

  onMount(() => {
    domLoaded = true;
  });

  onDestroy(() => {
    map = null;
    maps.mapNotReady();
  });
</script>

<style>
  #map-section {
    position: relative;
  }

  .map-view {
    height: 600px;
    width: 100%;
    position: relative;
  }

  .custom-tag {
    z-index: 997;
    position: absolute;
    top: 16px;
    left: 16px;
    padding: 16px;
  }
</style>

<section id="map-section">
  <div class="card custom-tag">
    <p
      style="font-size:1.2rem; margin: 4px 0"
      class="heading grey-text text-darken-4">
      DSC NMAMIT
    </p>
    <p style="margin: 4px 0" class="grey-text text-darken-3">
      NMAM Institute of Technology Campus
    </p>
  </div>
  <section id="bing-map" class="map-view" />
</section>
