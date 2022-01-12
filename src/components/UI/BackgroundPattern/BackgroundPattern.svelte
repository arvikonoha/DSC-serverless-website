<style>
  .bg-pattern {
    z-index: -5;
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: #00000000;
  }

  .bg-pattern .bar:nth-child(1) {
    z-index: -10;
    position: absolute;
    left: 15%;
    height: 100%;
    width: 3px;
    background-color: #0000000e;
  }

  .bg-pattern .bar:nth-child(2) {
    z-index: -10;
    position: absolute;
    top: 0;
    left: 37.5%;
    height: 100%;
    width: 3px;
    background-color: #0000000e;
  }

  .bg-pattern .bar:nth-child(4) {
    z-index: -10;
    position: absolute;
    top: 0;
    left: 62.5%;
    height: 100%;
    width: 3px;
    background-color: #0000000e;
  }

  .bg-pattern .bar:nth-child(6) {
    z-index: -10;
    position: absolute;
    top: 0;
    left: 85%;
    height: 100%;
    width: 3px;
    background-color: #0000000e;
  }

  .code-bg:nth-child(3) {
    top: -10%;
    position: relative;
    bottom: -10%;
    height: 40%;
    width: 24%;
    margin: auto;
    background: linear-gradient(#ffffffb0, #ffffffc9),
      url(./code-bg.png) center center/cover;
  }

  .code-bg:nth-child(5) {
    position: relative;
    bottom: -20%;
    height: 40%;
    width: 22%;
    margin-left: 63%;
    background: linear-gradient(#ffffffb0, #ffffffea),
      url(./code-bg.png) center center/cover;
  }

  @media (max-width: 900px) {
    .bg-pattern .bar:nth-child(1) {
      left: 8%;
    }

    .bg-pattern .bar:nth-child(2) {
      left: 22%;
    }

    .code-bg:nth-child(3) {
      top: 90%;
      height: 22%;
      width: 55%;
      left: 0%;
    }

    .code-bg:nth-child(5) {
      top: -30%;
      margin: auto;
      height: 22%;
      width: 55%;
      left: 0%;
    }

    .bg-pattern .bar:nth-child(4) {
      left: 78%;
    }

    .bg-pattern .bar:nth-child(6) {
      left: 92%;
    }
  }
</style>

<div class="bg-pattern">
  <div class="bar" />
  <div class="bar" />
  <div class="code-bg anim-down" />
  <div class="bar" />
  <div class="code-bg anim-up" />
  <div class="bar" />
</div>
