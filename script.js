// using gsap library for animation 
//for revision read the documentation for gsap
function navAnimation() {
  var nav = document.querySelector("nav");

  nav.addEventListener("mouseenter", function () {
    let tl = gsap.timeline();//synchronize the code line by line

    tl.to("#nav-bottom", {
      height: "22vh",
      duration: 0.3,
    });
    tl.to(".nav-part2 h5", {
      display: "block",
      duration: 0.1,
    });
    tl.to(".nav-part2 h5 span", {
      y: 0,
      stagger: {
        amount: 0.3,
      },
    });
  });
  nav.addEventListener("mouseleave", function () {
    let tl = gsap.timeline();
    tl.to(".nav-part2 h5 span", {
      y: 25,
      stagger: {
        amount: 0.2,
      },
    });
    tl.to(".nav-part2 h5", {
      display: "none",
      duration: 0.1,
    });
    tl.to("#nav-bottom", {
      height: 0,
      duration: 0.2,
    });
  });
}

navAnimation();