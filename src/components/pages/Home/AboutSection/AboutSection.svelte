<style>
  /* @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap"); */
  * {
    /* font-family: "Poppins", sans-serif; */
    padding: 0;
    margin: 0;
  }

  #about-cards {
    background-color: #f6f6f6;
    display: flex;
    flex-direction: column;
    padding: 16px;
    min-height: 540px;
    box-shadow: 1px -1px 4px 1px rgba(0, 0, 0, 0.1);
  }

  #about-cards > h1 {
    padding: 0;
    font-size: 3rem !important;
    font-weight: bold;
  }

  .about-card {
    border-top: 1px solid #0000006c;
    padding: 8px;
    margin: 32px 0;
  }

  .about-card h1 {
    font-size: 1.4rem;
    margin-bottom: 16px;
    color: crimson;
    font-weight: bold;
  }

  .about-card-emp {
    font-size: 1.8rem;
    display: block;
    font-weight: bold;
    margin-bottom: 32px;
  }

  @media (min-width: 720px) {
    #about-cards {
      flex-direction: row;
      flex-wrap: wrap;
      min-height: 880px;
    }

    #about-cards > h1 {
      line-height: 5rem;
      padding: 0 12vw;
      font-size: 4rem !important;
      align-self: center;
      flex: 1 0 25%;
    }

    #about-cards p {
      font-size: 1.2rem;
    }

    .about-cards {
      display: flex;
      flex-wrap: wrap;
      flex: 1 0 50%;
      align-self: center;
      justify-content: flex-end;
    }

    .about-card {
      flex: 1 0 30%;
      margin: 16px 32px;
      padding: 16px 16px;
    }
  }
</style>

<!-- <style>
  #about-section {
    display: flex;
    padding: 0 16px;
    padding-top: 64px;
    padding-bottom: 54px;
    flex-direction: column;
    justify-content: center;
    background-color: #86baf9;
  }

  h3 {
    font-size: 3rem;
    -webkit-text-fill-color: white; /* Will override color (regardless of order) */
    -webkit-text-stroke-width: 2px;
    margin-bottom: 64px;
  }

  article:nth-child(1) h3,
  article:nth-child(1) p {
    color: #0a5cff;
    -webkit-text-stroke-color: #0a5cff;
  }

  article:nth-child(2) h3,
  article:nth-child(2) p {
    color: #d92717;
    -webkit-text-stroke-color: #d92717;
  }

  article:nth-child(3) h3,
  article:nth-child(3) p {
    color: #0c884c;
    -webkit-text-stroke-color: #0c884c;
  }

  .flex {
    display: flex;
    align-content: center;
    flex-wrap: wrap;
  }

  .about-article h3,
  .about-article i {
    font-size: 2.4rem;
    margin-bottom: 1.6rem;
  }

  .about-article p {
    font-size: 1rem;
    padding: 8px;
  }

  @media (max-width: 900px) {
    .about-article p {
      text-align: left !important;
    }
  }

  @media (max-width: 600px) {
    .about-article h3,
    .about-article i {
      font-size: 2.4rem;
      margin-bottom: 2rem;
    }

    .about-article p {
      font-size: 1rem;
      padding-left: 3.4rem;
      text-align: left;
    }
  }
</style> -->
<section id="about-cards" class=" grey-text text-darken-3">
  <h1>
    About
    <br />
    developer clubs
  </h1>
  <section class="about-cards">
    <section class="about-card">
      <h1>Connect</h1>
      <p>
        <span class="about-card-emp">
          Meet students on campus interested in developer technologies.
        </span>
        All are welcome, including those with diverse backgrounds and different
        majors.
      </p>
    </section>

    <section class="about-card">
      <h1 style="color: #0a5cff">Learn</h1>
      <p>
        <span class="about-card-emp">
          Learn about a wide range of technical topics .
        </span>
        New skills are gained through hands-on workshops, in-person training and
        project building activities.
      </p>
    </section>

    <section class="about-card">
      <h1 style="color: #0c8b73">Grow</h1>
      <p>
        <span class="about-card-emp">
          Apply your new learnings and connections
        </span>
        Build great solutions for local problems. Advance your skills, career
        and network. Give back to your community by helping others learn as
        well.
      </p>
    </section>
  </section>
</section>
<!-- 
<section id="about-section">
  <section>

    <div class="row flex container">
      <article class="about-article col m12 l4 card" data-aos="flip-right">
        <h3 class="heading grey-text text-darken-3">
          <i class="center-align material-icons medium left">
            lightbulb_outline
          </i>
          Connect
        </h3>
        <p>
          Meet other students on campus interested in developer technologies.
          All are welcome, including those with diverse backgrounds and
          different majors.
        </p>
      </article>
      <article class="about-article col m12 l4 card" data-aos="flip-right">
        <h3 class="heading">
          <i class="center-align material-icons medium left">assessment</i>
          Learn
        </h3>
        <p>
          Learn about a wide range of technical topics where new skills are
          gained through hands-on workshops, in-person training and project
          building activities.
        </p>
      </article>
      <article class="about-article col m12 l4 card" data-aos="flip-right">
        <h3 class="heading">
          <i class="center-align material-icons medium left">code</i>
          Grow
        </h3>
        <p>
          Apply your new learnings and connections to build great solutions for
          local problems. Advance your skills, career and network. Give back to
          your community by helping others learn as well.
        </p>
      </article>
    </div>

  </section>

</section> -->
