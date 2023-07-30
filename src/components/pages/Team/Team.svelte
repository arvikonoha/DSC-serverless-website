<script>
  import { onMount } from "svelte";
  import TeamMembers from "./TeamMembers/TeamMembers.svelte";
  import FooterContact from "../../FooterContact/FooterContact.svelte";
  import { fbInstance } from "../../../stores/fbinstance/index";

  let members = [];
  let memberOrder = {
    Lead: 0,
    "ML lead": 1,
    "Android lead": 1,
    "Web lead": 1,
    "Design lead": 2,
    "Core Member": 2
  };
  // {name,position,imageURL,twitter,linkedin,gmail}
  let loadingTeam = true;

  onMount(() => {
    loadingTeam = true;
    $fbInstance.getTeam().then(teams => {
      for (let member of Object.values(teams)) members.push(member);
      members = members.sort(
        (a, b) => memberOrder[a.position] - memberOrder[b.position]
      );

      loadingTeam = false;
    });
  });
</script>

<style>
  #our-team {
    display: flex;
    flex-direction: column;
  }

  .content {
    flex: 1 0 auto;
    min-height: 100vh;
  }
</style>

<section id="our-team">
  <div class="content">
    <div class="container">
      <h3
        style="font-size: 1.8rem; margin-top:
        48px;margin-bottom:0;display:inline-block;"
        class="grey-text text-darken-3 heading">
        Our team
        <span
          style="width: 100px;height:2px;display: inline-block;"
          class="decor-bar grey darken-3" />
      </h3>
    </div>

    {#if loadingTeam}
      <div
        style="height: 600px;padding-top: 15%;"
        class="container center-align">
        <img width="50px" src="./loading.gif" alt="Loading gif" />
        <p style="margin: 4px;">Loading...</p>
      </div>
    {:else}
      <TeamMembers {members} />
    {/if}
  </div>

  <FooterContact />
</section>
