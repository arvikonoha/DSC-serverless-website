<script>
  import SortNFilter from "./SortNFilter/SortNFilter.svelte";
  import TitleSearch from "./TitleSearch/TitleSearch.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let query;

  function completedChange() {
    dispatch("query", {
      type: "filter",
      field: "completed",
      value: !query.filter.completed
    });
  }
</script>

<style>
  .flex {
    display: flex;
    flex-wrap: wrap;
  }

  .handle-searchbar {
    position: sticky;
    top: 32px;
    height: 64px;
    z-index: 3;
  }

  @media (max-width: 600px) {
    .handle-searchbar {
      height: 108px;
    }

    .container {
      width: 95% !important;
    }

    span {
      margin: 16px;
    }
  }
</style>

<section class="container" on:query>
  <div style="margin-bottom:4px;" class="row flex handle-searchbar" on:query>
    <TitleSearch title={query.filter.title} on:query />
    <SortNFilter
      domain={query.filter.domain}
      category={query.filter.category}
      level={query.filter.level}
      sort={query.sort.sort}
      on:query />
  </div>
  <div class="right-align" on:query>
    <p style="margin:24px 4px" on:query>
      <label on:query>
        <input type="checkbox" on:change={completedChange} />
        <span>Include completed events</span>
      </label>
    </p>
  </div>
</section>
