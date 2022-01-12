import gsap from "gsap";

export function welcomeAnim() {
  let tl = gsap.timeline();

  tl.timeScale(0.5);

  tl.from(".anim-down", {
    ease: "power1.out",
    y: -20,
    opacity: 0,
    stagger: 0.1,
  }).from(".anim-up", {
    ease: "power3.out",
    y: 10,
    opacity: 0,
    stagger: 0.1,
  });
}
