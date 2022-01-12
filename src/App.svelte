<script>
  import * as firebase from "firebase/app";
  import User from "./Classes/User/User";
  import { onMount, onDestroy, beforeUpdate } from "svelte";
  import { auth } from "./stores/auth/index.js";
  import AdminUser from "./Classes/User/AdminUser/AdminUser.js";
  import Router from "svelte-spa-router";
  import Home from "./components/pages/Home/Home.svelte";
  import Events from "./components/pages/Events/Events.svelte";
  import Team from "./components/pages/Team/Team.svelte";
  import Navbar from "./components/UI/Navbar/Navbar.svelte";
  import Sidenav from "./components/UI/Sidenav/Sidenav.svelte";
  import BackgroundPattern from "./components/UI/BackgroundPattern/BackgroundPattern.svelte";
  import SocialMediaLinks from "./components/SocialMediaLinks/SocialMediaLinks.svelte";
  import AdminActions from "./components/AdminActions/AdminActions.svelte";
  import AddAdminModal from "./components/AddAdminModal/AddAdminModal.svelte";
  import AddEventModal from "./components/AddEventModal/AddEventModal.svelte";
  import UpdateProfile from "./components/UpdateProfile/UpdateProfile.svelte";

  import Standings from "./components/pages/Standings/Standings.svelte";
  import BottomNav from "./components/BottomNav/BottomNav.svelte";
  import { welcomeAnim } from "./gsapAnimation.js";
  import AOS from "aos";

  let links = [
    { href: "/", text: "Home" },
    { href: "/team", text: "Our team" },
    { href: "/events", text: "Events" }
    // { href: "/standings", text: "Standings" }
  ];

  let routes = {
    "/": Home,
    "/team": Team,
    "/events": Events
    // "/standings": Standings
  };
  let sideNavigations;
  let navInstances;

  let floatingButtons;
  let floatingButtonInstances;

  let toolTips;
  let toolTipsInstances;

  let modals;
  let modalInstances;

  let flickity;

  onMount(async () => {
    welcomeAnim();

    firebase.auth().onAuthStateChanged(async userCred => {
      if (userCred) {
        let { displayName, uid, email } = userCred;

        let user = await User.registerOrGetUser(uid, {
          email,
          displayName
        });

        if (user.isAdmin) auth.authorize(new AdminUser(user));
        else auth.authorize(user);
      }
    });

    sideNavigations = document.querySelectorAll(".sidenav");
    navInstances = M.Sidenav.init(sideNavigations);

    floatingButtons = document.querySelectorAll(".fixed-action-btn");
    floatingButtonInstances = M.FloatingActionButton.init(floatingButtons);

    toolTips = document.querySelectorAll(".tooltipped");
    toolTipsInstances = M.Tooltip.init(toolTips);

    modals = document.querySelectorAll(".modal");
    modalInstances = M.Modal.init(modals);
  });

  onDestroy(() => {
    sideNavigations = null;
    navInstances = null;

    floatingButtons = null;
    floatingButtonInstances = null;

    toolTips = null;
    toolTipsInstances = null;

    modals = null;
    modalInstances = null;
  });
</script>

<svelte:head>

  <script
    src="https://kit.fontawesome.com/4eec0e39bb.js"
    crossorigin="anonymous">

  </script>
</svelte:head>

<main>
  <Navbar {links} title="DSC NMAMIT" />
  <Sidenav {links} />
  {#if $auth.user && $auth.user.isAdmin}
    <!-- <AdminActions /> -->
    <AddAdminModal />
    <AddEventModal isUpdate={false} />
    <UpdateProfile />
  {/if}
  <BackgroundPattern />
  <!-- <SocialMediaLinks /> -->
  <Router {routes} />
  <BottomNav />
</main>
