<script>
  import Typewriter from "typewriter-effect/dist/core";
  import { onMount, onDestroy } from "svelte";
  let clearTyper;

  // onMount(() => {
  //   var TxtType = function(el, toRotate, period) {
  //     this.toRotate = toRotate;
  //     this.el = el;
  //     this.loopNum = 0;
  //     this.period = parseInt(period, 10) || 2000;
  //     this.txt = "";
  //     this.tick();
  //     this.isDeleting = false;
  //   };

  //   TxtType.prototype.tick = function() {
  //     var i = this.loopNum % this.toRotate.length;
  //     var fullTxt = this.toRotate[i];

  //     if (this.isDeleting) {
  //       this.txt = fullTxt.substring(0, this.txt.length - 1);
  //     } else {
  //       this.txt = fullTxt.substring(0, this.txt.length + 1);
  //     }

  //     this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  //     var that = this;
  //     var delta = 200 - Math.random() * 100;

  //     if (this.isDeleting) {
  //       delta /= 2;
  //     }

  //     if (!this.isDeleting && this.txt === fullTxt) {
  //       delta = this.period;
  //       this.isDeleting = true;
  //     } else if (this.isDeleting && this.txt === "") {
  //       this.isDeleting = false;
  //       this.loopNum++;
  //       delta = 500;
  //     }

  //     setTimeout(function() {
  //       that.tick();
  //     }, delta);
  //   };

  // (function() {
  //   var elements = document.getElementsByClassName("typewrite");
  //   for (var i = 0; i < elements.length; i++) {
  //     var toRotate = elements[i].getAttribute("data-type");
  //     var period = elements[i].getAttribute("data-period");
  //     if (toRotate) {
  //       new TxtType(elements[i], JSON.parse(toRotate), period);
  //     }
  //   }
  // INJECT CSS
  //     var css = document.createElement("style");
  //     css.type = "text/css";
  //     css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  //     document.body.appendChild(css);
  //   })();
  // });
</script>

<style>
  #welcome-section {
    padding-top: 16px;
    padding-bottom: 32px;
  }

  .landing-img-container {
    padding: 128px 64px;
  }

  .secondary-text {
    font-size: 1.2rem;
  }

  .primary-text {
    font-size: 1.6rem;
    font-weight: 100;
  }

  #welcome-text {
    padding: 64px 32px;
  }

  .custom-container {
    margin: auto;
  }

  .welcome-title {
    font-size: 3.6rem;
  }

  .blue-text-cust {
    color: #0a5cff;
  }

  .blue-bg-cust {
    background-color: #0a5cff;
  }

  .bg-ptrn {
    background: url(/bgptrn.svg) center center/cover no-repeat;
  }

  @media (max-width: 600px) {
    .welcome-title {
      font-size: 3rem;
    }

    .primary-text {
      font-size: 1rem;
    }
  }
</style>

<section id="welcome-section" class="row custom-container">
  <div class="col l5 hide-on-med-and-down landing-img-container">
    <img width="100%;" src="./landing.svg" alt="Abstract dsc art" />
  </div>
  <article id="welcome-text" class="col l7 valign-wrapper bg-ptrn">
    <div class="row white">
      <img
        class="responsive-img col s8 m6"
        src="./dsc-welcome.png"
        alt="Developers students club logo" />
      <h2
        style="margin-bottom: 8px"
        class="col s12 heading welcome-title white grey-text text-darken-2 ">
        Welcome to DSC NMAMIT
      </h2>

      <p
        style="margin: 16px auto 36px auto"
        class="white primary-text col s12 grey-text text-darken-1">
        Empowering students to Impact communities through developer skills!
      </p>
      <p
        style="margin-bottom: 32px;"
        class="col white hide-on-small-only s12 secondary-text flow-text
        grey-text text-darken-1">
        Developer Student Clubs are university based community groups for
        students interested in Google developer technologies. Students from all
        undergraduate or graduate programs with an interest in growing as a
        developer are welcome. By joining a DSC, students grow their knowledge
        in a peer-to-peer learning environment and build solutions for local
        businesses and their community.
      </p>
      <div class="col s12">
        <a
          href="#/events"
          style="text-transform:none;"
          class="btn waves-effect waves-light blue-bg-cust ">
          <i class="large material-icons right">arrow_forward</i>
          Flagship events
        </a>
        <a
          href="#/team"
          style="text-transform:none;"
          class="btn waves-effect waves-light white blue-text-cust ">
          <i class="large material-icons right">people</i>
          Our team
        </a>
      </div>
    </div>
  </article>
  <div
    class="anim-down"
    style="display:flex;justify-content:center;width:100%;">
    <a href="#about-cards" class="btn-floating blue center-align">
      <i class="material-icons">arrow_downward</i>
    </a>
  </div>
</section>
