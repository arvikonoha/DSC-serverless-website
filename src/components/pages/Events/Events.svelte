<script>
  import { onMount, afterUpdate, onDestroy } from "svelte";
  import { util } from "../../../Classes/Util/Util";
  import "materialize-css";
  import SearchBar from "./SearchBar/SearchBar.svelte";
  import EventsDisplay from "./EventsDisplay/EventsDisplay.svelte";
  import FooterContact from "../../FooterContact/FooterContact.svelte";

  let query = {
    filter: {
      domain: "All",
      category: "All",
      level: "All",
      title: "",
      completed: false
    },
    sort: {
      sort: "Newest first"
    }
  };

  let events = [];
  let eventsCopy = [];
  let loading = true;

  let collapsibleInstance;
  function handleQuery(event) {
    loading = true;
    collapsibleInstance.close();
    setTimeout(() => {
      loading = false;
    });
    let { type, field, value } = event.detail;
    query = { ...query, [type]: { ...query[type], [field]: value } };
  }

  onMount(async () => {
    loading = true;

    util.database.ref("/events").on("value", snapshot => {
      let result = snapshot.val();

      let temp = [];

      if (result === null) temp = [];
      else {
        for (let key of Object.keys(result))
          temp.push({ ...result[key], eventID: key });
        loading = false;

        events = temp;
      }
    });
  });
  afterUpdate(() => {
    M.Collapsible.init(document.querySelectorAll(".collapsible"));
    collapsibleInstance = M.Collapsible.getInstance(
      document.querySelector(".collapsible")
    );
  });

  onDestroy(() => {
    collapsibleInstance = null;
  });
</script>

<style>
  h2 {
    font-size: 2rem !important;
  }

  p {
    font-size: 1.2rem !important;
  }

  #events {
    display: flex;
    flex-direction: column;
  }

  .content {
    flex: 1 0 auto;
    min-height: 100vh;
  }
</style>

<section id="events">
  <div class="content">
    <section class="container">
      <h2
        style="font-size:2.4rem;margin-bottom: 8px;"
        class="heading grey-text text-darken-3">
        Our flagship events
      </h2>
      <p
        class="grey-text text-darken-1"
        style="font-size:1.4rem;margin-top: 4px;">
        Workshops, seminars, talks and much more!
      </p>
    </section>
    <SearchBar {query} on:query={handleQuery} />
    <EventsDisplay {loading} {query} {events} />
  </div>
  <FooterContact />
</section>
