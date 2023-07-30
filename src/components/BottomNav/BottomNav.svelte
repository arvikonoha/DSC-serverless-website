<style>
  #bottom-nav {
    box-shadow: 1px -1px 4px 0.1px rgba(0, 0, 0, 0.2);
    position: fixed;
    background-color: #fff;
    bottom: 0;
    left: 0;
    width: 100%;
  }

  #bottom-nav .nav-list {
    display: flex;
    justify-content: center;
  }

  #bottom-nav .nav-list li {
    padding: 8px;
    list-style: none;
    flex: 1 0 auto;
    text-align: center;
    color: #00000091;
  }

  #bottom-nav .nav-list li a {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    font-size: 0.8rem;
    color: #00000091;
  }

  #bottom-nav .nav-list li a i {
    font-size: 1.4rem;
  }

  @media (min-width: 1000px) {
    #bottom-nav {
      display: none;
    }
  }
</style>

<section id="bottom-nav" aria-hidden="true">
  <ul class="nav-list">
    <li>
      <a href="#/">
        <i class="fas fa-home" />
        home
      </a>
    </li>
    <li>
      <a href="#/events">
        <i class="fas fa-calendar-week" />
        events
      </a>
    </li>
    <li>
      <a href="#/team">
        <i class="fas fa-user-friends" />
        our team
      </a>
    </li>
  </ul>
</section>
