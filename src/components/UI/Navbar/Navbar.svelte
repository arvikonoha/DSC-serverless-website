<script>
  import { onDestroy } from "svelte";
  import { isAdmin } from "../../../utils/index.js";
  import { auth } from "../../../stores/auth/index.js";
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
        isSigningIn = false;
        auth.authorize(user);
      }
    } catch (error) {
      isSigningIn = false;
      console.log(error);
    }
  }
  function handleSignOut() {
    auth.logout();
    util.signOut();
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

<style>
  .brand-logo {
    font-size: 24px;
  }

  .resp-logo {
    height: 24px;
  }

  @media (min-width: 1000px) {
    .resp-logo {
      height: 36px;
    }
  }
</style>

<nav style="position:sticky;top:0;z-index:998;">
  <div class="nav-wrapper row white">
    <div class="col s12">
      <a href="/" class="brand-logo">
        <img
          class="resp-logo"
          style="margin-right:8px;margin-top:16px"
          src="./dsclogo.svg"
          alt="" />

      </a>
      <ul id="nav-mobile" class="hide-on-med-and-down right">
        {#each links as link}
          <li>

            <a class="grey-text text-darken-2" href={'#' + link.href}>
              {link.text}
            </a>
          </li>
        {/each}
        {#if !$auth.isAuth}
          <li>
            <a
              on:click|preventDefault={handleSignIn}
              class="grey-text text-darken-2"
              href="#login">
              Sign in
            </a>
          </li>
          {#if isSigningIn}
            <li>
              <Preloader title="Sigining in" />
            </li>
          {/if}
        {:else}
          {#if $auth.user && $auth.user.isAdmin}
            <li>
              <a
                style="background-color: transparent;border: none;"
                class="grey-text text-darken-2 modal-trigger"
                href="#add-event">
                Add event
              </a>
            </li>
            <li>
              <a
                style="background-color: transparent;border: none;"
                class="grey-text text-darken-2 modal-trigger"
                href="#add-admin">
                Add admin
              </a>
            </li>
            <li>
              <a
                style="background-color: transparent;border: none;"
                class="grey-text text-darken-2 modal-trigger"
                href="#update-profile">
                Update profile
              </a>
            </li>
          {/if}
          <li>
            <a
              style="background-color: transparent;border: none;"
              class="grey-text text-darken-2"
              on:click|preventDefault={handleSignOut}
              href="#logout">
              Sign out
            </a>
          </li>
        {/if}

      </ul>
      <a
        href="/"
        data-target="slide-out"
        class="sidenav-trigger grey-text text-darken-3">
        <i class="material-icons">menu</i>
      </a>
    </div>
  </div>
</nav>
