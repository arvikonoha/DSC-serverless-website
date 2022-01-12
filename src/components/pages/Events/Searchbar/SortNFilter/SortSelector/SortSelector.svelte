<script>
  import Chip from "./Chip.svelte";
  export let options;
  export let selected;
  export let type;
  export let field;
</script>

<div class="col s12 m6">
  <h3
    style="font-size:1.4rem;margin-top:8px;"
    class="heading grey-text text-darken-4">
    {field[0].toUpperCase() + field.slice(1)}
  </h3>
  {#each options as option}
    <Chip {option} {selected} {type} {field} on:query />
  {/each}
</div>
