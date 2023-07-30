<style>
  #footer-section {
    margin: 0;
    background-color: #fafafa;
    min-height: 640px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  @media (max-width: 1000px) {
    #footer-section {
      padding-bottom: 64px;
    }
  }

  .input-field {
    margin-bottom: 8px;
  }

  .card {
    margin: 0;
  }

  /* label focus color */
  .input-field input:focus + label {
    color: #37474f;
  }
  /* label underline focus color */
  .input-field input:focus,
  .input-field input,
  .input-field textarea {
    border-bottom: 1px solid #37474f;
    box-shadow: 0 1px 0 0 #37474f;
  }

  .input-field input::placeholder {
    color: #37474f;
  }
</style>

<section id="footer-section" class="card lighten-5 ">
  <div style="margin:0;" class="row">
    <article
      style="padding-left:64px;padding:right:64px;padding-top:64px;"
      class="col s12 offset-l2 l3 m6 container">
      <p
        style="font-size: 3.2rem;margin: 4px;"
        class="heading blue-grey-text text-darken-3">
        Opinion ?
      </p>
      <p
        style="font-size: 3.2rem;margin: 8px;"
        class="heading blue-grey-text text-darken-3">
        Feedback ?
      </p>
      <p
        style="font-size: 3.2rem;margin: 8px;"
        class="heading blue-grey-text text-darken-3">
        Critisism ?
      </p>
      <p
        style="font-size: 1.4rem;margin: 16px 8px;"
        class="heading blue-grey-text text-darken-3 ">
        Let us know
        <i class="fas fa-arrow-right" />
      </p>
    </article>
    <article style="padding:32px 64px" class="col m6 s12">
      <h2 class="heading blue-grey-text text-darken-3">Feedback form</h2>
      <form action="POST" class="row">
        <div class="input-field col s12">
          <input class="blue-grey-text text-darken-3" type="text" id="name" />
          <label class="blue-grey-text text-darken-3" for="name">
            Name (optional)
          </label>
        </div>
        <div class="input-field col s12">
          <input class="blue-grey-text text-darken-3" type="email" id="email" />
          <label class="blue-grey-text text-darken-3" for="email">
            Email (optional)
          </label>
        </div>
        <div class="input-field blue-grey-text text-darken-3 col s12">
          <textarea
            class="materialize-textarea"
            name="message"
            id="message"
            rows="50" />
          <label class="blue-grey-text text-darken-3" for="message">
            Message
          </label>
        </div>
        <button
          style="text-transform:none;font-family:'Google sans';"
          class="btn right blue-grey-text text-darken-3 white heading">
          <i class="material-icons medium right">check</i>
          Submit
        </button>
      </form>
    </article>
  </div>
</section>
