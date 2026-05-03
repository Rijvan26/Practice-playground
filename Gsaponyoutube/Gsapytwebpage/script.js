// function page1anima () {
//     var tl = gsap.timeline()

// gsap.from('.logo', {
//     y:-100,
//     duration:1,
//     delay:.5,
//     opacity:1,

// })

// tl.from('.navlinks li  ', {
//     y:-100,
//     duration:1,
//     opacity:1,
//     delay:.5,
//     stagger:0.15,

// })

// gsap.from('.navlinks button', {
//     duration:.5,
//     delay:1.8,
//     opacity:0.5,
//     scale:0,

// })

// gsap.from('.maintext h1', {
//     x:-500,
//     duration:1,
//     delay:.8,
//     opacity:1,

// })

// gsap.from('.maintext p', {
//     x:-500,
//     duration:1.2,
//     delay:1,
//     opacity:0,

// })

// .from('.maintext button', {
//     duration:1,
//     y:30,
//     // opacity:0,
// })


// tl.from('.mainimg img ', {
//     opacity:0,
//     duration:1,
//     delay:1,

// })

// tl.from('.brandlogos img ', {
//     x:100,
//     duration:1,
//     opacity:0,
//     delay:1.2,
//     stagger:0.15,

// })
// }
function page1anima() {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.from('.logo', { y: -100, opacity: 0, duration: 0.6 })

    .from('.navlinks li', {
      y: -100,
      opacity: 0,
      stagger: 0.15,
      duration: 0.6
    }, "-=0.3")

    .from('.navlinks button', {
      scale: 0,
      opacity: 0,
      duration: 0.4
    }, "-=0.4")

    .from('.maintext h1', {
      x: -200,
      opacity: 0,
      duration: 0.8
    }, "-=0.2")

    .from('.maintext p', {
      x: -200,
      opacity: 0,
      duration: 0.8
    }, "-=0.5")

    .from('.maintext button', {
      y: -30,
      duration: 0.5
    }, "-=0.4")

    .from('.mainimg img', {
      opacity: 0,
      x: 100,
      duration: 1
    }, "-=0.8")

    .from('.brandlogos img', {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.5
    }, "-=0.5");
}

page1anima();

// page1anima()

function page2anima() {
    gsap.registerPlugin(ScrollTrigger);

var tl2 = gsap.timeline({
    scrollTrigger:{
        trigger:".section2",
        scroller:"body",
        start:"top 50%",
        end:"top -50%",
        scrub:2,

    }
})

tl2.from(".servicestext", {
    y:30,
    opacity:0,
})

tl2.from(".servicediv.line1.left", {
    x:-400,
    opacity:0,
    duration:1
},"sathmefix")


tl2.from(".servicediv.line1.right", {
    x:400,
    opacity:0,
    duration:1
},"sathmefix")

tl2.from(".servicediv.line2.left", {
    x:-400,
    opacity:0,
    duration:1
},"sathmefix2")


tl2.from(".servicediv.line2.right", {
    x:400,
    opacity:0,
    duration:1
},"sathmefix2")

tl2.from(".servicediv.line3.left", {
    x:-400,
    opacity:0,
    duration:1.1
},"sathmefix3")


tl2.from(".servicediv.line3.right", {
    x:400,
    opacity:0,
    duration:1.1
},"sathmefix3")
}

page2anima()


function page3anima() {
    var tl3 = gsap.timeline({
    scrollTrigger:{
        trigger:".section3",
        scroller:"body",
        start:"top 60%",
        end:"top -10%",
        scrub:2,

    }
})

tl3.from(".sec3left", {
  x: -200,
  opacity: 0,
  duration: 1
})

tl3.from(".sec3left h1", {
    y:20,
    opacity:0,

},.5)

tl3.from(".sec3left p", {
    y:30,
    opacity:0,

},.7)

tl3.from(".sec3left button", {
    y:40,
    opacity:0,
    duration:.5,

},.8)
tl3.from(".sec3right img", {
  opacity: 0,
  duration: 1
}, .4);

}

page3anima()

function page4anima() {
    var tl4 = gsap.timeline({
    scrollTrigger:{
        trigger:".section4",
        scroller:"body",
        start:"top 50%",
        end:"top -10%",
        scrub:2,

    }
})

tl4.from(".sec4top", {
    y:30,
    opacity:0,
})

tl4.from(".sec4bottombox1", {
    x:300,
    opacity:0,
    duration:.5,
    stagger:0.15,
},.4)
}

page4anima()

function page5anima() {
    var tl5 = gsap.timeline({
    scrollTrigger:{
        trigger:".section5",
        scroller:"body",
        start:"top 50%",
        end:"top -10%",
        scrub:2,

    }
})

tl5.from(".sec5top", {
    y:30,
    opacity:0,
    duration:.7,
})

tl5.from(".sec5card.card1", {
    opacity:0,
    x:110,
    y:5,
    duration:1,
    stagger:0.25,
})
}
page5anima()

function page6anima (){
    var tl6 = gsap.timeline({
    scrollTrigger:{
        trigger:".section6",
        scroller:"body",
        start:"top 50%",
        end:"top -10%",
        scrub:2,

    }
})

tl6.from(".sec6top", {
    y:30,
    opacity:0,
    duration:.7,
})


gsap.from(".section6", {
  scrollTrigger: {
    trigger: ".section6",
    start: "top 70%",
  },
  y: 80,
  opacity: 0,
  duration: 1
});

gsap.from(".sec6selectors > div", {
  scrollTrigger: {
    trigger: ".section6",
    start: "top 60%",
  },
  x: -50,
  opacity: 0,
  stagger: 0.2,
  duration: 0.8
});

gsap.from(".nameinput", {
  scrollTrigger: {
    trigger: ".section6",
    start: "top 60%",
  },
  y: 40,
  opacity: 0,
  stagger: 0.15,
  duration: 0.8
});

gsap.from(".sec6bottomright img", {
  scrollTrigger: {
    trigger: ".section6",
    start: "top 65%",
  },
  x: 120,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out"
});

gsap.to(".sec6sendbtn", {
  scale: 1.05,
  paused: true,
  duration: 0.2
});

const btn = document.querySelector(".sec6sendbtn");

btn.addEventListener("mouseenter", () => {
  gsap.to(btn, { scale: 1.05 });
});
btn.addEventListener("mouseleave", () => {
  gsap.to(btn, { scale: 1 });
});

}

page6anima()