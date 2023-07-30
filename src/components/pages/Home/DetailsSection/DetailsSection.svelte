<style>
  #membership {
    padding: 16px;
    background-color: #051e34;
  }

  h1,
  h2 {
    font-weight: bold;
  }

  .members {
    padding: 8px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .members:not(:last-child) {
    border-bottom: 1px solid #ffffff2c;
  }

  .members:nth-child(even) {
    flex-wrap: wrap-reverse;
  }

  .members img {
    width: 244px;
  }

  .members h1 {
    font-size: 1.6rem;
    color: #ffffff;
    margin-bottom: 4px;
  }

  .members .sub-title {
    margin-bottom: 8px;
    font-size: 0.6rem;
    color: #ffffffd8;
  }

  .members .description {
    padding: 32px 8px;
    font-size: 1rem;
    line-height: 2rem;
    color: #ffffffd8;
  }

  .member-card {
    text-align: center;
    padding: 16px 8px;
    flex: 1 0 50%;
  }

  .members:nth-child(even) .member-card {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  .member-card .member-card-sub {
    padding: 0 16px;
    display: flex;
    flex-direction: column;

    flex: 1 0 100%;
    color: #fff;
  }

  .member-card .member-card-sub:nth-child(even) {
    align-items: center;
  }

  .member-card .member-card-sub h2 {
    text-align: left;
    font-size: 1.2rem;
    margin: 8px 0 16px 0;
  }

  .member-card .member-card-sub div:not(:last-child) ul {
    margin-bottom: 64px;
  }

  .member-card .member-card-sub ul li {
    list-style: none;
    padding: 12px 8px;
    display: flex;
    font-size: 1rem;
    align-items: center;
  }

  .member-card .member-card-sub ul li i {
    font-size: 1.6rem;
    margin: 0 16px;
  }

  @media (min-width: 1000px) {
    .member-card .member-card-sub {
      flex: 1 0 33%;
    }

    .members {
      padding: 8px 32px;
    }

    .members img {
      min-width: 480px;
    }

    .members:nth-child(even) img {
      min-width: 360px;
    }

    .member-card {
      padding: 16px 64px;
    }

    .members .sub-title {
      font-size: 1.2rem;
    }

    .members .description {
      padding: 16px 0px;
      font-size: 1rem;
      line-height: 1.6rem;
      color: #fff;
    }
  }

  @media (min-width: 1200px) {
    .member-card {
      text-align: left;
    }
  }

  .cust-chip {
    padding: 4px;
    background-color: #3c4456;
    font-size: 0.8rem;
    display: inline-block;
    margin: 2px;
    color: #757b88;
    border-radius: 50px;
  }

  @media (min-width: 1000px) {
    .cust-chip {
      font-size: 0.8rem;
      margin: 4px;
    }
  }

  .cust-chip-main {
    color: #fff;
    font-weight: bold;
  }

  .cust-chip-main:nth-child(3) {
    background-color: #4285f4;
  }

  .cust-chip-main:nth-child(7) {
    background-color: #ea4335;
  }

  .cust-chip-main:nth-child(10) {
    background-color: #0f9d58;
  }
</style>

<section id="membership">
  <section class="members">
    <img src="./members.svg" alt="" />
    <section class="member-card">
      <h1>Members</h1>
      <p class="sub-title">Some of the perks of being a member</p>
      <span class="cust-chip cust-chip-main">
        attend workshops
        <i class="fas fa-dot-circle" />
      </span>
      <span class="cust-chip">
        have fun
        <i class="fas fa-dot-circle" />
      </span>
      <span class="cust-chip">
        be awesome
        <i class="fas fa-dot-circle" />
      </span>
      <span class="cust-chip">
        get certified
        <i class="fas fa-dot-circle" />
      </span>
      <span class="cust-chip cust-chip-main">
        build projects
        <i class="fas fa-dot-circle" />
      </span>

      <span class="cust-chip">
        make friends
        <i class="fas fa-dot-circle" />
      </span>

      <span class="cust-chip">
        gain skills
        <i class="fas fa-dot-circle" />
      </span>

      <span class="cust-chip cust-chip-main">
        solve problems
        <i class="fas fa-dot-circle" />
      </span>
      <p class="description">
        We provide memberships to selected students who apply for the same. We
        are looking for students with genuine passion to regularly learn and
        grow. We are looking forward to help you to grow by offering workshops,
        seminars and projects to help local communities.
      </p>
    </section>
  </section>
  <section class="members">
    <section class="member-card">
      <section class="member-card-sub">
        <h1>Core members</h1>
        <p class="sub-title">If you want to contribute more</p>

        <p class="description">
          Core team of DSC NMAMIT will plan, manage and run DSC activities in
          the campus. We have both Technical team and Non-technical team.
          Technical team will mainly focus on delivering workshops/conducting
          events, meanwhile non-technical team will help in non-technical
          activities related to the DSC events.
        </p>
      </section>
      <section class="member-card-sub">
        <div>
          <h2>Technical core</h2>
          <ul>
            <li>
              <i class="fab fa-android" />
              Android development
            </li>
            <li>
              <i class="fas fa-cloud" />
              Cloud computing
            </li>
            <li>
              <i class="fas fa-brain" />
              Machine learning
            </li>
            <li>
              <i class="fas fa-code" />
              Web development
            </li>
          </ul>
        </div>
        <div>
          <h2>Non-technical core</h2>
          <ul>
            <li>
              <i class="fab fa-adobe" />
              Graphics designing
            </li>
            <li>
              <i class="fas fa-pen-fancy" />
              Content writing
            </li>
            <li>
              <i class="fas fa-calendar-week" />
              Event management
            </li>
            <li>
              <i class="fas fa-video" />
              Video coverage
            </li>
          </ul>
        </div>
      </section>
    </section>
    <img src="./core_team.svg" alt="" />
  </section>
</section>
