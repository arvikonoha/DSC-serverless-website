<script>
  import UpdateEventModal from "../../../../UpdateEventModal/UpdateEventModal.svelte";
  import DeleteEventModal from "./DeleteEventModal/DeleteEventModal.svelte";
  import EventDescModal from "./EventDescModal/EventDescModal.svelte";
  import { auth } from "../../../../../stores/auth";
  import { onMount, onDestroy } from "svelte";

  export let event;

  function formatDate(ipDate) {
    return new Date(ipDate)
      .toUTCString()
      .slice(0, 12)
      .trim();
  }

  let modals;
  let modalInstances;

  onMount(() => {
    modals = document.querySelectorAll(".modal");
    modalInstances = M.Modal.init(modals);
  });

  onDestroy(() => {
    modals = null;
    modalInstances = null;
  });
</script>

<style>
  .card {
    display: inline-block;
    width: 256px;
    min-height: 230px;
    margin: 8px;
  }

  /* .card-image {
    height: 210px;
    background-color: rgba(0, 0, 0, 0.2);
    overflow: hidden;
  } */

  .card-title {
    margin-bottom: 8px;
    margin-top: 0;
    font-size: 2em;
  }

  .card-secondary-title {
    font-size: 1em;
  }

  .card-date {
    font-size: 1.2em;
    padding: 4px 0;
  }

  .modify-icons {
    position: absolute;
    bottom: 8px;
    right: 8px;
  }

  @media (max-width: 1000px) {
    .modify-icons {
      bottom: -16px;
    }
  }

  /* .card-image img {
    object-fit: contain !important;
    width: auto;
    height: 100%;
  } */

  @media (max-width: 600px) {
    .card {
      width: 140px;
      min-height: 150px;
    }

    .card-content {
      padding: 16px !important;
    }

    /* .card-image {
      height: 128px;
    }

    .card-image img {
      object-fit: contain !important;
      width: 100%;
      height: auto;
    } */

    .card-title {
      margin-bottom: 2px;
      font-size: 1.2em !important;
      line-height: 1em !important;
    }

    .card-secondary-title {
      font-size: 0.8em !important;
    }

    .card-tag {
      font-size: 0.6em !important;
    }

    .card-ternary-title {
      font-size: 0.6em !important;
    }

    .card-date {
      font-size: 0.6em;
      padding: 2px 0;
    }
  }
</style>

<div class="card" style="position:relative;">

  <div class="card-content">
    <p class="grey-text card-tag text-darken-1">{event.category}</p>
    <h3 class="card-title heading grey-text text-darken-4 ">{event.title}</h3>
    <p
      style="margin-bottom: 4px;"
      class="heading card-secondary-title grey-text text-darken-2">
      For {event.level} audience
    </p>
    <p class="grey-text text-darken-1 card-ternary-title">{event.location}</p>
    <p class="heading grey-text text-darken-4 card-date">
      {formatDate(event.startdate)}
      {event.endDate ? `- ${formatDate(event.enddate)}` : ''}
    </p>
  </div>

  <div class="modify-icons">
    {#if $auth.user && $auth.user.isAdmin}
      <a
        class="modal-trigger btn-small btn-floating green"
        href="#update-event-{event.eventID}">
        <i class="material-icons">edit</i>
      </a>
      <a class="modal-trigger btn-small btn-floating red" href="#delete-event-{event.eventID}">
        <i class="material-icons">delete</i>
      </a>
    {/if}
    <a class="modal-trigger btn-small btn-floating blue" href="#event-desc-{event.eventID}">
      <i class="material-icons right">info</i>
    </a>

  </div>

  <UpdateEventModal {...event} />
  <DeleteEventModal imageRef={event.imageRef} eventID={event.eventID} />
  <EventDescModal
    eventId={event.eventID}
    description={event.description}
    title={event.title}
    level={event.level}
    imageURL={event.imageURL}
    domain={event.domain} />
</div>
