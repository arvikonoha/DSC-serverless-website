<script>
  import { onMount } from "svelte";
  import { isAdmin } from "../../utils";
  import { auth } from "../../stores/auth/index.js";
  import AdminUser from "../../Classes/User/AdminUser/AdminUser";
  import { fbInstance } from "../../stores/fbinstance/index.js";

  let email;
  let uploadAdmin = false;

  async function handleSubmit() {
    if ($auth.user.isAdmin) {
      uploadAdmin = true;
      try {
        let adminEmail = await $auth.user.appointAnAdmin(email);
        if (adminEmail) {
          M.toast({ html: `${adminEmail} successfully added as an admin` });
          M.Modal.getInstance(document.getElementById("add-admin")).close();
          uploadAdmin = false;
        }
      } catch (err) {
        console.log(err);
        M.toast({ html: err.message });
        uploadAdmin = false;
      }
    } else {
      M.toast({ html: `You are not authorized to add admins` });
      uploadAdmin = false;
    }
  }
</script>

<section id="add-admin" class="modal">
  <form
    on:submit|preventDefault={handleSubmit}
    class="modal-content"
    action="POST">
    <h2 style="font-size: 2rem" class="heading">Add a new admin</h2>
    <div class="input-field">
      <input type="text" id="email" bind:value={email} required />
      <label for="email">Email of the new admin</label>
    </div>
    <div class="modal-footer">
      <button
        style="text-transform: none;"
        class="btn large blue white-text right">
        {#if uploadAdmin}
          <i class="material-icons right">more_horiz</i>
          Uploading
        {:else}
          <i class="material-icons right">check</i>
          Submit
        {/if}
      </button>

      <button
        style="text-transform: none;"
        class="grey-text text-darken-2 btn-flat large right modal-close">
        Cancel
      </button>
    </div>
  </form>

</section>
