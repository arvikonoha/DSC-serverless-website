<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let option;
  export let selected;
  export let type;
  export let field;

  let isSelected;
  $: {
    isSelected = selected;
  }

  function handleClick(event) {
    let {
      target: { textContent: value }
    } = event;

    if (selected !== value) {
      let data = { type, field, value };
      dispatch("query", data);
    }
  }
</script>

<style>
  .chip {
    cursor: pointer;
  }
</style>

<div
  class={option === selected ? 'chip heading grey lighten-1' : 'chip '}
  on:click={handleClick}>
  {option}
</div>
