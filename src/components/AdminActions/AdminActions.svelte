<script>
  import { onMount, onDestroy } from "svelte";
  let floatingButtons;
  let floatingButtonInstances;

  let toolTips;
  let toolTipsInstances;

  let modals;
  let modalInstances;
  onMount(() => {
    floatingButtons = document.querySelectorAll(".fixed-action-btn");
    floatingButtonInstances = M.FloatingActionButton.init(floatingButtons);

    toolTips = document.querySelectorAll(".tooltipped");
    toolTipsInstances = M.Tooltip.init(toolTips);

    modals = document.querySelectorAll(".modal");
    modalInstances = M.Modal.init(modals);
  });

  onDestroy(() => {
    floatingButtons = null;
    floatingButtonInstances = null;

    toolTips = null;
    toolTipsInstances = null;

    modals = null;
    modalInstances = null;
  });
</script>

<style>
  @media (max-width: 1000px) {
    .fixed-action-btn {
      top: 64px;
    }
  }
</style>

<div class="fixed-action-btn">
  <button class="btn-floating btn-large blue">
    <i class="large material-icons">mode_edit</i>
  </button>
  <ul>
    <li>
      <a
        class="btn-floating tooltipped red modal-trigger"
        data-position="left"
        href="#add-admin"
        data-tooltip="Add an admin">
        <i class="material-icons">verified_user</i>
      </a>
    </li>
    <li>
      <a
        class="btn-floating tooltipped green modal-trigger"
        data-position="left"
        href="#add-event"
        data-tooltip="Add an event">
        <i class="material-icons">code</i>
      </a>
    </li>
    <li>
      <a
        class="btn-floating tooltipped blue modal-trigger"
        data-position="left"
        href="#update-profile"
        data-tooltip="Update profile">
        <i class="material-icons">account_circle</i>
      </a>
    </li>
  </ul>
</div>
