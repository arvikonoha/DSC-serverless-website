<script>
  import { auth } from "../../../../../../stores/auth";
  import Event from "../../../../../../Classes/Event/Event";

  export let eventID;
  export let imageRef;

  function handleDelete() {
    Event.deleteAuthEvent($auth.user.userID, eventID, imageRef)
      .then(() => {
        M.toast({ html: `Event successfully deleted` });
      })
      .catch(err => {
        console.log(err);
        M.toast({ html: `Something went wrong` });
      });
  }
</script>

<section id="delete-event-{eventID}" style="max-width: 540px;" class="modal">
  <div style="padding:32px;">

    <h2 class="heading" style="font-size:1.6rem;">
      Are you sure you want to delete this event
    </h2>
    <div class="right" style="padding:32px;">
      <button on:click={handleDelete} class="btn red modal-close">
        Delete
      </button>
      <button class="btn-flat red-text waves-red modal-close">Cancel</button>
    </div>
  </div>
</section>
