<script>
  import { onMount, onDestroy } from "svelte";
  import Profile from "../../Classes/Profile/Profile";
  import { auth } from "../../stores/auth";

  let name;
  let position;
  let linkedin;
  let twitter;
  let uploadData = false;
  let imageFile;
  let imageURL;
  let imageRef;

  let select;
  let selectInstances;

  let loadingProfile = true;
  let progress = 0;

  function progressCallback(percentage) {
    progress = percentage;
  }

  function handleSubmit() {
    uploadData = true;
    let details = { name, position, linkedin, twitter, imageURL, imageRef };
    if (imageFile) details.imageFile = imageFile;
    Profile.authUpdateProfile(
      details,
      $auth.user.userID,
      $auth.user.profileID,
      progressCallback
    )
      .then(metadata => {
        if (Array.isArray(metadata)) [imageURL, imageRef] = metadata;
        uploadData = false;
        M.Modal.getInstance(document.getElementById("update-profile")).close();
        M.toast({ html: "Profile successfully updated" });

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

  onMount(() => {
    select = document.querySelectorAll("select");
    selectInstances = M.FormSelect.init(select);

    M.updateTextFields();

    Profile.getAdminProfile($auth.user.profileID).then(profile => {
      ({ name, position, linkedin, twitter, imageURL, imageRef } = profile);
    });
  });

  onDestroy(() => {
    select = null;
    selectInstances = null;
  });
</script>

<section id="update-profile" class="modal">

  <form
    on:submit|preventDefault={handleSubmit}
    class="modal-content"
    action="POST">
    <div style="padding: 16px 32px;">
      <h2 style="font-size: 2rem" class="heading">Update your profile</h2>
      <div class="input-field">
        <input
          placeholder="Enter your name"
          class="validate"
          type="text"
          id="name"
          bind:value={name}
          required />
        <label for="name">Name</label>
      </div>
      <div class="row">

        <div class="col m6 input-field">
          <select
            class="validate"
            bind:value={position}
            name="position"
            id="position"
            required>
            <option value="" disabled selected>Choose your position</option>
            <option value="Lead">Lead</option>
            <option value="ML lead">ML lead</option>
            <option value="Android Lead">Android Lead</option>
            <option value="Web lead">Web lead</option>
            <option value="Web co-lead">Web co-lead</option>
            <option value="Design co-lead">Design co-lead</option>
            <option value="Android co-lead">Android co-lead</option>
            <option value="ML co-lead">ML co-lead</option>
          </select>
          <label>Position</label>
        </div>

      </div>
      <div class="row">
        <div class="input-field col m12">
          <input
            class="validate"
            type="text"
            placeholder="Your Twitter URL"
            id="twitter"
            bind:value={twitter}
            required />
          <label for="twitter">Twitter</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col m12">
          <input
            class="validate"
            placeholder="Your linkedin URL"
            type="text"
            id="linkedin"
            bind:value={linkedin}
            required />
          <label for="linkedin">Linkedin</label>
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
            placeholder="Update your profile image" />

        </div>
      </div>
      <p>Previous image</p>
      <img src={imageURL} alt="Profile avatar" width="50px" />
    </div>

    <div class="modal-footer">
      <button
        type="submit"
        style="text-transform: none;"
        class="btn large blue white-text right">
        {#if uploadData}
          <i class="material-icons right">more_horiz</i>
          Uploading {progress + '%'}
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
