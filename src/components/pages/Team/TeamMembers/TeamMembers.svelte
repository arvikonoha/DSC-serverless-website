<script>
  import TeamCard from "./TeamCard/TeamCard.svelte";

  export let members;
</script>

<style>
  .bg-ptrn {
    background: url(/bgptrn.svg) center center/cover no-repeat;
  }
</style>

<div class="container center-align">
  <div style="padding:16px; margin:0; font-size: 1.2em">
    <p class="white grey-text text-darken-2 left-align">
      We are motivated group of individuals here to solve any query regarding
      workshops, projects or any other developer activities. We will make sure
      to give you updates on all the major Google events happening accross the
      developer student clubs.
    </p>
  </div>
  <div class="bg-ptrn" style="padding: 64px 0;">
    {#each members as member (member.name)}
      <TeamCard {member} />
    {/each}
  </div>

</div>
