const main = document.querySelector('main')
const para = document.querySelector('#para')
const btn = document.querySelector('#changebtn')
const btn2 = document.querySelector('#changebtn2')
const copytext = document.querySelector('#copypara')
let rgb1 = '#000'
let rgb2 = "#fff"


function myhexValue ()  {
   const data = '0123456789abcdef'
   let color = '#'
   for(let i = 0; i < 6; i++) {
color =  color + data[Math.floor(Math.random()*16)]
   
   }
   return color
}

const btnhandler1 = () => {
    rgb1 =  myhexValue()

    btn.innerHTML = rgb1
main.style.background = `linear-gradient(to right , ${rgb1} ,${rgb2}) `
copytext.innerHTML = `background: linear-gradient(to right , ${rgb1} ,${rgb2})`

}
const btnhandler2 = () => {
   rgb2 = myhexValue()
    btn2.innerHTML = rgb2
main.style.background = `linear-gradient(to right , ${rgb1} ,${rgb2})`
copytext.innerHTML = `background: linear-gradient(to right , ${rgb1} ,${rgb2})`

}

copytext.addEventListener("click", () => {
   navigator.clipboard.writeText(copytext.innerText)
})

btn.addEventListener("click", btnhandler1)
btn2.addEventListener("click", btnhandler2)
