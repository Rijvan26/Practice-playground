$(document).ready(function (){
    $('.fa-bars').click(function() {
        $(this).toggleClass(' fa-bars fa-times')
        $('.navbar').toggleClass('nav-toggle')
    })

    $(window).on('scroll load', function() {
        $('.fa-bars').removeClass('fa-times');
        $('.navbar').removeClass('nav-taggle')

        if ($(window).scrollTop() > 30) {
            $('header').addClass('header:active')
        }else {
            $('header').removeClass('header:active')

        }
    })
})

// gsap.from('.home h1', {
//     scale:0,
//     opacity:0,
//     duration:1,
//     delay:1

// })

gsap.from('header', {
    y:150,
})
gsap.from('.box', {
    // y:200,
    x:450,
    duration:1,
    stagger:1,
})

gsap.from (' .logo', {
    x:10,
    duration:2,
    delay:3,
    stagger:1,
    opacity:0,

})

gsap.from (' .navbar li', {
    x:10,
    duration:1,
    delay:1,
    stagger:.5,
    opacity:0,

})

// gsap.registerPlugin(ScrollTrigger)

gsap.fromTo(
  ' .about-top',
  { x:50, y:150, scale:0 },
  {
    x:0,
    y:0,
    scale:1,
    delay:1,
    duration:1,
    scrollTrigger:{
      trigger:'#about',
      scroller:'body',
      markers:true,
      start:'top 10%',
      end:'top 30%',
      scrub:2,
      pin:true
    }
  }
)

gsap.from(
  '#about .row ',
  {
    x:50,
    y:0,
    scale:1,
    delay:1,
    duration:1,
    scrollTrigger:{
      trigger:'#about',
      scroller:'body',
      markers:true,
      start:'top 10%',
      end:'top 30%',
      scrub:2,
      pin:true
    }
  })

  gsap.from(
  '.content ',
  {
    x:-200,
    y:0,
    scale:1,
    delay:3,
    duration:1,
    scrollTrigger:{
      trigger:'#about',
      scroller:'body',
      markers:true,
      start:'top 10%',
      end:'top 30%',
      scrub:2,
      pin:true
    }
  })