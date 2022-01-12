<script>
  import { onMount, onDestroy } from "svelte";
  import { auth } from "../../stores/auth";
  import Event from "../../Classes/Event/Event";
  import MarkDownContainer from "../MarkDownContainer/MarkDownContainer.svelte";

  export let title;
  export let startdate;
  export let enddate;
  export let location;
  export let completed = false;
  let imageFile;
  export let description = "";
  export let domain;
  export let category;
  export let level;
  export let imageRef;
  export let imageURL;
  export let eventID;

  let uploadData = false;

  let datepickers;
  let datepickerInstances;

  let select;
  let selectInstances;

  let collapsibles;
  let collapsibleInstances;

  let progress = 0;

  onMount(() => {
    datepickers = document.querySelectorAll(".datepicker");
    datepickerInstances = M.Datepicker.init(datepickers);

    select = document.querySelectorAll("select");
    selectInstances = M.FormSelect.init(select);

    M.updateTextFields();

    collapsibles = document.querySelector(".collapsible");
    collapsibleInstances = M.Collapsible.init(collapsibles);
  });

  onDestroy(() => {
    datepickers = null;
    datepickerInstances = null;

    select = null;
    selectInstances = null;

    collapsibles = null;
    collapsibleInstances = null;
  });

  function progressCallback(percentage) {
    progress = percentage + "%";
  }

  function handleSubmit() {
    uploadData = true;
    Event.updateAuthEvent(
      {
        title,
        startdate,
        enddate: enddate || "",
        location,
        completed,
        imageFile,
        description,
        level,
        domain,
        category,
        imageRef,
        eventID,
        imageURL
      },
      $auth.user.userID,
      progressCallback
    )
      .then(results => {
        if (Array.isArray(results)) [imageURL, imageRef] = results;
        uploadData = false;
        M.Modal.getInstance(document.getElementById("update-event")).close();
        M.toast({ html: "Event successfully updated" });

        uploadData = false;
      })
      .catch(err => {
        console.log(err);
        M.toast({ html: "Something went wrong" });
      });
  }

  function grabFile(event) {
    imageFile = event.target.files[0];
  }

  function changeStartDate(event) {
    startdate = event.target.value;
  }

  function changeEndDate(event) {
    enddate = event.target.value;
  }
</script>

<section id="update-event" class="modal">
  <form
    on:submit|preventDefault={handleSubmit}
    class="modal-content"
    action="POST">
    <div style="padding: 16px 32px;">
      <h2 style="font-size: 2rem" class="heading">Update event details</h2>
      <div class="input-field">
        <input type="text" id="title" bind:value={title} required />
        <label for="title">Title</label>
      </div>
      <div class="row">
        <div class="col m6 input-field">
          <select bind:value={domain} name="domain" id="domain" required>
            <option value="" disabled selected>Choose the domain</option>
            <option value="Web">Web</option>
            <option value="Machine learning">Machine learning</option>
            <option value="Android">Android</option>
            <option value="Cloud computing">Cloud computing</option>
            <option value="Other">Other</option>
          </select>
          <label>Domain</label>
        </div>
        <div class="col m6 input-field">
          <select bind:value={category} name="category" id="category" required>
            <option value="" disabled selected>Choose the category</option>
            <option value="Workshop">Workshop</option>
            <option value="Webinar">Webinar</option>
            <option value="Talk">Talk</option>
            <option value="Contest">Contest</option>
          </select>
          <label>Category</label>
        </div>
        <div class="col m6 input-field">
          <select bind:value={level} name="level" id="level" required>
            <option value="" disabled selected>Choose the level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
          <label>Level</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col m6">
          <input type="text" id="location" bind:value={location} required />
          <label for="location">Location</label>
        </div>
        <div class="input-field col m6">
          <p>
            <label>
              <input type="checkbox" bind:checked={completed} />
              <span>
                Event completed?
                <br />
                (check if completed)
              </span>
            </label>
          </p>
        </div>
        <div class="col s6 input-field">
          <input
            type="text"
            id="startdate"
            class="datepicker"
            bind:value={startdate}
            on:change={changeStartDate}
            required />
          <label for="startdate">Start date</label>
        </div>
        <div class="col s6 input-field">
          <input
            type="text"
            id="enddate"
            class="datepicker"
            bind:value={enddate}
            on:change={changeEndDate} />
          <label for="enddate">End date (optional)</label>
        </div>
      </div>
      <div class="file-field input-field">
        <div style="text-transform: none;" class="btn blue heading">
          <span>Upload</span>
          <input type="file" on:change|preventDefault={grabFile} />
        </div>
        <div class="file-path-wrapper">
          <input
            class="file-path validate"
            id="imagefile"
            type="text"
            placeholder="Upload an image for the event" />

        </div>
        <p>Previous image</p>
        <img src={imageURL} alt="Profile avatar" width="50px" />
      </div>
      <div class="input-field">
        <textarea
          class="materialize-textarea"
          name="description"
          id="description"
          bind:value={description}
          rows="50"
          required />
        <label for="description">Description</label>
      </div>
      <ul class="collapsible">
        <li>
          <div class="collapsible-header">Preview description</div>
          <div class="collapsible-body">
            <MarkDownContainer content={description} />
          </div>
        </li>

      </ul>
    </div>

    <div class="modal-footer">
      <button
        type="submit"
        style="text-transform: none;"
        class="btn large blue white-text right">
        {#if uploadData}
          <i class="material-icons right">more_horiz</i>
          Uploading {progress}
        {:else}
          <i class="material-icons right">check</i>
          Submit
        {/if}
      </button>
      <button
        type="reset"
        style="text-transform: none;"
        class="grey-text text-darken-2 btn-flat large right modal-close">
        Cancel
      </button>
    </div>
  </form>

</section>
