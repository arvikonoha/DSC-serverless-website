<script>
  import { onMount, onDestroy } from "svelte";

  export let member;
  let copyText = "";

  function handleClick(event) {
    let link = event.target.closest("a");

    copyText = link.href;
    document.execCommand("copy");
  }

  function handleCopy(event) {
    event.clipboardData.setData("text/plain", copyText);
    event.preventDefault();

    M.toast({ html: "Link copied to the clipboard" });
  }

  onMount(() => {
    document.addEventListener("copy", handleCopy);
  });

  onDestroy(() => {
    document.removeEventListener("copy", handleCopy);
  });
</script>

<style>
  .card {
    width: 150px;
    min-height: 216px;
  }

  .card-role {
    margin: 0;
    font-size: 0.8rem;
  }

  .card-title {
    font-size: 1rem;
    line-height: 1rem;
    margin: 0 4px !important;
    padding: 0px 4px;
  }

  .social-icon {
    padding: 4px;
    font-size: 1rem;
    color: #292436;
  }

  @media (min-width: 550px) {
    .card {
      width: 184px;
    }

    .card-role {
      font-size: 1rem;
    }

    .card-title {
      font-size: 1.2rem;
    }
  }
</style>

<div style="padding:4px;display:inline-block;">
  <div data-aos="zoom-in" class="card">
    <div style="padding:4px 8px" class="right-align">
      <p class="grey-text text-darken-1 heading card-role">{member.position}</p>
    </div>
    <div style="padding: 8px 24px;" class="card-image center-align">
      <img
        style="display:inline-block;height:
        96px;width:96px;object-fit:cover;border-radius: 50%"
        src={member.imageURL}
        alt="" />
    </div>
    <div style="padding: 0;height: 48px;" class="card-content">
      <h3 class="card-title grey-text text-darken-3 heading">{member.name}</h3>
      <div style="padding:0 16px;" class="center-align">
        {#if member.twitter}
          <a class="social-icon" href={member.twitter} target="_blank">
            <i class="fab fa-twitter blue-text" />
          </a>
        {/if}
        <a class="social-icon" href="mailto:{member.gmail}">
          <i class="fab fa-google blue-text" />
        </a>
        {#if member.linkedin}
          <a class="social-icon" target="_blank" href={member.linkedin}>
            <i class="fab fa-linkedin blue-text" />
          </a>
        {/if}
      </div>
    </div>

  </div>
</div>
