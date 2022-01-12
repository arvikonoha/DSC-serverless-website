<script>
  import MarkDownContainer from "../../../../../MarkDownContainer/MarkDownContainer.svelte";

  export let title;
  export let domain;
  export let description;
  export let level;
  export let imageURL;
</script>

<style>
  .heading-1 {
    color: #000000d2;
    font-size: 2rem;
  }

  .category,
  .level {
    display: inline-block;
    font-weight: bold;
    border-radius: 5px;
    background-color: #ec4337b7;
    color: #fff;
    padding: 8px;
    font-size: 0.8rem;
  }

  .level {
    background-color: #1c143fb7;
  }
  .hdcr {
    display: inline-block;
    height: 0.4rem;
    background-color: #000000d2;
  }

  .dot {
    width: 0.4rem;
  }

  .line {
    width: 4rem;
  }

  .event-desc-content {
    padding: 8px;
  }

  @media (min-width: 1000px) {
    .event-desc-content {
      padding: 32px;
    }
  }
</style>

<section id="event-desc" class="modal">
  <img
    src={imageURL}
    height="184px"
    width="100%"
    class="responsive"
    style="object-fit: cover;"
    alt="" />
  <div class="event-desc-content">

    <header>
      <h1 class="heading-1 heading">
        {title}
        <span class="hdcr dot" />
        <br />
        <span class="hdcr line" />
      </h1>
      <p class="category">{domain}</p>
      <p class="level">{level}</p>
    </header>
    <section id="event-description">
      <MarkDownContainer content={description} />
    </section>
  </div>
</section>
