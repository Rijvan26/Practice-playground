gsap.to('.box', {
    y:100,
    x:100,
    duration:2,
    delay:1,
    backgroundColor: 'blue',
    borderRadius: '50%'

})

gsap.from('.box2', {
    x:-200,
    y: -50,
    duration:1,
    delay:0.3,
})