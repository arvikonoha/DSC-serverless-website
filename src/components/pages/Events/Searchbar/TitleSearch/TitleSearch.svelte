<script>
  import { createEventDispatcher, onMount } from "svelte";
  const dispatch = createEventDispatcher();
  export let title;

  function handleChange() {
    dispatch("query", { type: "filter", field: "title", value: title });
  }

  onMount(() => {
    M.updateTextFields();
  });
</script>

<form class="col m6 s12" on:submit|preventDefault on:query>
  <div class="input-field white">
    <i class="material-icons prefix">search</i>
    <input
      placeholder="Search by title"
      id="title-search"
      type="text"
      bind:value={title}
      on:input={handleChange} />
    <label for="title-search">Search</label>
  </div>
</form>
