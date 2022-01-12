<style>
  .disp-flex {
    display: flex;
  }

  .fix-left {
    z-index: 9999;
    position: fixed;
    bottom: 40%;
    transform: rotate(-90deg);
    left: -2rem;
  }

  .social-icons {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3rem;
    width: 3rem;
    padding: 1.6rem;
    margin: 0 4px;
    font-size: 1rem;
    border-radius: 50%;
    background-color: transparent;
  }

  @media (max-width: 1200px) {
    .social-icons {
      height: 2rem;
      width: 2rem;
      padding: 0.1rem;
    }

    .fix-left {
      left: -6rem;
    }
  }

  .social-icons.mail {
    color: #fff;
    background-color: #cc4015bb;
    border: none;
  }

  .social-icons.fb {
    color: #fff;
    background-color: #155eccbb;
    border: none;
  }

  .social-icons.ig {
    color: #fff;
    background-color: #cc155bbb;
    border: none;
  }

  .invisible-label {
    display: none;
  }
</style>

<section id="scoial-media-links" class="pd-1 fix-left anim-right">
  <h2 style="font-size: 1.6rem;" class="heading">Contact us on</h2>
  <div class="disp-flex">
    <a
      aria-label="Email"
      class="social-icons mail"
      href="mailto:dscnmamsupport@googlegroups.com">
      <i aria-hidden="true" class="fas fa-envelope" />
      <span class="invisible-label">Mail</span>
    </a>
    <a
      aria-label="Instagram"
      class="social-icons ig"
      href="https://www.instagram.com/dscnmamit/">
      <i aria-hidden="true" class="fab fa-instagram" />
      <span class="invisible-label">Instagram</span>
    </a>
    <a
      aria-label="Facebook"
      class="social-icons fb"
      href="https://www.facebook.com/dscnmamit/">
      <i aria-hidden="true" class="fab fa-facebook" />
      <span class="invisible-label">Facebook</span>
    </a>
  </div>
</section>
