function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,

    // for tablet smooth
    tablet: { smooth: true },

    // for mobile
    smartphone: { smooth: true },
  });
  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  ScrollTrigger.refresh();
}

// using gsap library for animation
//for revision read the documentation for gsap

function loadingAnimation() {
  var tl = gsap.timeline();//for maintaining the order
  tl.from("#page1", {
    opacity: 0,
    duration: 0.2,
    delay: 0.2,
  });
  tl.from("#page1", {
    transform: "scaleX(0.7) scaleY(0.2) translateY(80%)",
    borderRadius: "150px",
    duration: 2,
    ease: "expo.out",
  });
  tl.from("nav", {
    opacity: 0,
    delay: -0.2,
  });
  tl.from("#page1 h1, #page1 p, #page1 div", {
    opacity: 0,
    duration: 0.5,
    stagger: 0.2,
  });
}

loadingAnimation();

function navAnimation() {
  var nav = document.querySelector("nav");

  nav.addEventListener("mouseenter", function () {
    let tl = gsap.timeline(); //synchronize the code line by line

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

function page2Animation() {
  var rightElems = document.querySelectorAll(".right-elem");

  rightElems.forEach(function (elem) {
    elem.addEventListener("mouseenter", function () {
      // console.log(elem.childNodes); // try this
      gsap.to(elem.childNodes[3], {
        //we are doing 3rd index cause image is there is 3rd index
        opacity: 1,
        scale: 1,
      });
    });
    elem.addEventListener("mouseleave", function () {
      gsap.to(elem.childNodes[3], {
        opacity: 0,
        scale: 0,
      });
    });
    elem.addEventListener("mousemove", function (dets) {
      // console.log(dets); // details on mouse events
      gsap.to(elem.childNodes[3], {
        x: dets.x - elem.getBoundingClientRect().x - 90, //with getBoundingClientRect we get the exact position of the pointer
        y: dets.y - elem.getBoundingClientRect().y - 215,
      });
    });
  });
}

page2Animation();

function page3VideoAnimation() {
  var page3Center = document.querySelector(".page3-center");
  var video = document.querySelector("#page3 video");

  page3Center.addEventListener("click", function () {
    video.play();
    gsap.to(video, {
      transform: "scaleX(1) scaleY(1)", //full scale - screen
      opacity: 1,
      borderRadius: 0,
    });
  });
  video.addEventListener("click", function () {
    video.load(); //runs again instead of play from last run
    gsap.to(video, {
      transform: "scaleX(0.7) scaleY(0)",
      opacity: 0,
      borderRadius: "30px",
    });
  });

  //page 4
  var sections = document.querySelectorAll(".sec-right");

  sections.forEach(function (elem) {
    elem.addEventListener("mouseenter", function () {
      elem.childNodes[3].style.opacity = 1;
      elem.childNodes[3].play();
    });
    elem.addEventListener("mouseleave", function () {
      elem.childNodes[3].style.opacity = 0;
      elem.childNodes[3].load();
    });
  });
}

page3VideoAnimation();

// Page 6 animation for multiple sections with scroll-triggered animations
function page6animation() {
  // Sections to animate
  const sections = [
    { sectionId: "#btm6-part2", translateDataAttr: "data-translate" },
    { sectionId: "#btm6-part3", translateDataAttr: "data-translate" },
    { sectionId: "#btm6-part4", translateDataAttr: "data-translate" },
  ];

  // Function to handle the scroll-based animation
  function handleScroll() {
    sections.forEach(({ sectionId, translateDataAttr }) => {
      const section = document.querySelector(sectionId);
      const elements = section.querySelectorAll("h4");
      const sectionRect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Define start and end points for animation trigger based on the viewport height
      const start = 0.1 * windowHeight;  // Start animation when 10% of the section is in view
      const end = 0.6 * windowHeight;    // End animation when 60% of the section is in view

      // Only animate when section is in the defined scroll range
      if (sectionRect.top < end && sectionRect.bottom > start) {
        // Calculate the progress as the section scrolls through the viewport
        const progress = Math.min(
          Math.max((end - sectionRect.top) / (end - start), 0),
          1
        );

        // Animate each h4 element in the section
        elements.forEach((el) => {
          const maxTranslateX = parseFloat(el.getAttribute(translateDataAttr));
          const translateX = maxTranslateX * progress;  // Calculate the translated value

          // Apply the transformation to each h4 element
          gsap.to(el, {
            transform: `translateX(${translateX}%)`,  // Apply the calculated translation
            ease: "power3.out",                       // Smooth easing
            duration: 0.5,                            // Duration for smoothness
          });
        });
      }
    });
  }

  // Listen for scroll events and update animation
  window.addEventListener("scroll", handleScroll);

  // Initial call to handle the animation on page load
  handleScroll();
}

// Initialize page 6 animation
page6animation();


locomotiveAnimation();