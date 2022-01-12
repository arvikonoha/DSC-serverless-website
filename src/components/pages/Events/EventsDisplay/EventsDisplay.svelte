<script>
  import { onMount, afterUpdate } from "svelte";
  import EventCard from "./EventCard/EventCard.svelte";
  export let events;
  export let query;
  export let loading;

  let eventsLocal;

  $: {
    let temp = events;
    eventsLocal = temp;
    for (let field in query.filter) {
      if (query.filter[field] !== "All")
        temp = temp.filter(event =>
          (event[field] + "")
            .toLowerCase()
            .includes((query.filter[field] + "").toLowerCase())
        );
    }

    if (query.sort.sort === "Newest first")
      temp = temp.sort((a, b) => new Date(b.startdate) - new Date(a.startdate));
    else
      temp = temp.sort((a, b) => new Date(a.startdate) - new Date(b.startdate));
    eventsLocal = temp;
  }
</script>

<style>
  .flex {
    display: flex;
    flex-wrap: wrap;
  }

  @media (max-width: 600px) {
    .container {
      width: 100% !important;
      padding: 0 16px;
    }
  }
</style>

<section style="padding-bottom: 64px;" id="events-display" class="container">
  {#if !loading && eventsLocal && eventsLocal.length > 0}
    <div class="flex">
      {#each eventsLocal as event}
        <EventCard {event} />
      {/each}
    </div>
  {/if}
  {#if eventsLocal.length === 0 && !loading}
    <div
      style="height: 600px;padding-top: 48px;"
      class="container center-align">
      <div class="grey-text text-darken-1">
        <i style="font-size: 64px" class="fas fa-heart-broken" />
        <br />
        <p style="font-size:14px;margin-top: 8px;">
          Sorry no results found.
          <br />
          Search somthing else
        </p>
      </div>
    </div>
  {/if}
  {#if loading}
    <div
      style="height: 600px;padding-top: 48px;"
      class="container center-align">
      <img width="50px" src="./loading.gif" alt="Loading gif" />
      <p style="margin: 4px;">Loading...</p>
    </div>
  {/if}
</section>
