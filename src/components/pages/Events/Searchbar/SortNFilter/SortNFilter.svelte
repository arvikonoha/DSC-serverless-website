<script>
  import { onMount, createEventDispatcher } from "svelte";

  import SortSelector from "./SortSelector/SortSelector.svelte";

  const dispatch = createEventDispatcher();
  const domains = [
    "All",
    "Web",
    "Machine learning",
    "Android",
    "Cloud Computing",
    "Other"
  ];
  const categories = ["All", "Workshop", "Webinar", "Talk", "Contest"];
  const levels = ["All", "Beginner", "Intermediate", "Advanced"];
  const sorting = ["Newest first", "Oldest first"];

  export let domain;
  export let category;
  export let level;
  export let sort;
</script>

<style>
  .collapsible {
    box-shadow: none;
    border: none;
  }

  .collapsible-header {
    border: none;
  }

  .collapsible {
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  }
</style>

<ul
  style="margin:0; height: 60px;padding: 0 16px;"
  class="collapsible s12 col m6">
  <li on:query>
    <div class="collapsible-header ">
      <i class="material-icons">sort</i>
      Filtering and Sorting
    </div>
    <div class="collapsible-body card">
      <div class="row">
        <SortSelector
          {...{ options: domains, selected: domain, type: 'filter', field: 'domain' }}
          on:query />
        <SortSelector
          {...{ options: categories, selected: category, type: 'filter', field: 'category' }}
          on:query />
      </div>
      <div class="row" on:query>
        <SortSelector
          {...{ options: levels, selected: level, type: 'filter', field: 'level' }}
          on:query />
        <SortSelector
          {...{ options: sorting, selected: sort, type: 'sort', field: 'sort' }}
          on:query />
      </div>
    </div>
  </li>
</ul>
