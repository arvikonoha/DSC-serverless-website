<script>
  import { onDestroy } from "svelte";
  import { isAdmin } from "../../../utils/index.js";
  import { auth } from "../../../stores/auth/index.js";
  import { fbInstance } from "../../../stores/fbinstance/index.js";
  import { util } from "../../../Classes/Util/Util";
  import Auth from "../../../Classes/Auth/Auth";
  import Preloader from "../Preloader/Preloader.svelte";

  export let links;
  let isSigningIn = false;

  async function handleSignIn() {
    try {
      isSigningIn = true;
      let {
        user,
        token,
        email,
        isMember,
        isAdmin,
        uid
      } = await Auth.signUpPopUp();

      M.toast({
        html: `Hello ${user.displayName}, you've successfully logged in`
      });
      if (email) {
        const sidenav = document.querySelector(".sidenav");
        window.M.Sidenav.getInstance(sidenav).close();
        isSigningIn = false;
        auth.authorize(user);
      }
    } catch (error) {
      isSigningIn = false;
      console.log(error);
    }
  }
  function handleSignOut() {
    const sidenav = document.querySelector(".sidenav");
    auth.logout();
    util.signOut();
    window.M.Sidenav.getInstance(sidenav).close();
  }

  let modals;
  let modalInstances;

  onDestroy(() => {
    modals = null;
    modalInstances = null;
  });

  $: {
    if ($auth.user && $auth.user.isAdmin) {
      modals = document.querySelectorAll(".modal");
      modalInstances = M.Modal.init(modals);
    }
  }
</script>

<ul
  id="slide-out"
  tabindex="0"
  on:keyup={event => {
    if (event.keyCode === 13) {
      const sidenav = document.querySelector('.sidenav');
      window.M.Sidenav.getInstance(sidenav).open();
    }
  }}
  aria-label="side navigation"
  class="sidenav">
  {#each links as link}
    <li>
      <a
        on:click={() => {
          const sidenav = document.querySelector('.sidenav');
          window.M.Sidenav.getInstance(sidenav).close();
        }}
        class="waves-effect"
        href={'#' + link.href}>
        {link.text}
      </a>
    </li>
  {/each}
  {#if !$auth.isAuth}
    <li>
      <a
        on:click|preventDefault={handleSignIn}
        class="waves-effect"
        href="#login">
        Sign in
      </a>
    </li>
  {:else}
    {#if $auth.user && $auth.user.isAdmin}
      <li>
        <a class="waves-effect modal-trigger" href="#add-admin">Add admin</a>
      </li>
      <li>
        <a class="waves-effect modal-trigger" href="#add-event">Add event</a>
      </li>
      <li>
        <a class="waves-effect modal-trigger" href="#update-profile">
          Update profile
        </a>
      </li>
    {/if}

    <li>
      <button
        style="background-color: transparent;border: none;padding:0 32px;"
        class="waves-effect"
        on:click={handleSignOut}>
        Sign out
      </button>
    </li>
  {/if}

</ul>
