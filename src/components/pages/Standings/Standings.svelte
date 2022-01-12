<script>
  import { onMount } from "svelte";
  onMount(() => {
    let collapsible = document.querySelectorAll(".collapsible");
    let instance = M.Collapsible.init(collapsible);
  });
</script>

<section id="standings" class="container">
  <h2 style="font-size: 2.4rem;" class="heading grey-text text-darken-3">
    Standings
  </h2>
  <p style="font-size: 1.2rem;" class=" grey-text text-darken-2">
    Submit projects, attend workshops involve in all sorts of DSC activities to
    gain points and win exciting prices
  </p>
  <ul class="collection with-header">
    <li
      style="padding:10px 4px;margin:0;"
      class="collection-header heading row">
      <span class="col s2">Pos</span>
      <span class="col s6">Name</span>
      <span style="padding:0;" class="col s2">Badge</span>
      <span class="col s2">Score</span>
    </li>
    <li style="padding:0px;margin:0;" class="collection-item ">
      <ul style="box-shadow:none;margin:0;" class="collapsible">
        <li>
          <div style="padding:0px 4px;margin:0;" class="collapsible-header row">
            <p class="col s2">1</p>
            <p class="col s6">Aravinda B R</p>
            <p class="col s2">
              <span
                style="font-size: .8rem;width: 1.6rem;height: 1.6rem;display:
                block;border-radius: 50%;padding-top: .2rem;"
                class="heading grey white-text center-align">
                N
              </span>
            </p>
            <p class="col s2">10</p>
          </div>
          <div style="box-shadow:none;" class="collapsible-body">
            <h2
              style="font-size: 1.4rem;margin-top:0;"
              class="heading grey-text text-darken-4">
              Summary
            </h2>
            <div style="margin:0px;" class="row">
              <h3
                style="font-size: 1rem;margin: 4px 0"
                class="grey-text text-darken-2 col s8">
                Workshops attended
              </h3>
              <p style="margin: 4px 0" class="col s4 right-align">69 x 10</p>
            </div>
            <div style="margin:0px;" class="row">
              <h3
                style="font-size: 1rem;margin: 4px 0"
                class="grey-text text-darken-2 col s10 heading">
                Total
              </h3>
              <p style="margin: 4px 0" class="col s2 heading right-align">
                690
              </p>
            </div>
          </div>
        </li>
      </ul>
    </li>
  </ul>
</section>
