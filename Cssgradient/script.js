const main = document.querySelector('main')
const para = document.querySelector('#para')
const btn = document.querySelector('#changebtn')
const btn2 = document.querySelector('#changebtn2')

function myhexValue ()  {
   const data = '0123456789abcdef'
   let color = '#'
   for(let i = 0; i < 6; i++) {
color =  color + data[Math.floor(Math.random()*16)]
   
   }
   return color
}

const rgb1 = () => {
   const rgb1val =  myhexValue()
   const rgb2val =  myhexValue()

    btn.innerHTML = rgb1val
main.style.background = `linear-gradient(to right , ${rgb1val} ,${rgb2val}) `

}
const rgb2 = () => {
   const rgb1val =  myhexValue()
   const rgb2val =  myhexValue()
    btn2.innerHTML = rgb2val
main.style.background = `linear-gradient(to right , ${rgb1val} ,${rgb2val})`


}

btn.addEventListener("click", rgb1)
btn2.addEventListener("click", rgb2)
