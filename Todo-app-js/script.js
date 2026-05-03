const form = document.querySelector("form")
const input = document.getElementById("taskinput")
const submitbtn = document.querySelector("button")
const mainul = document.querySelector("ul")

let localtodos = JSON.parse(localStorage.getItem("yttodo")) || []

const showTodo = () => {
    mainul.innerHTML = ''

    localtodos.forEach(element => {

        const localmain = document.createElement("li")

        localmain.innerHTML = `

                <p>${element}</p>
                <button class="deletebtn">delete</button>
        `

        mainul.append(localmain)
    })
}

showTodo()


function addTask(e) {

    e.preventDefault()   // form reload stop

    const value = input.value.trim()

    if (!value) return

    const maindiv = document.createElement("li")
     maindiv.classList.add("maindiv")
    maindiv.innerHTML = `
               <div class="taskinputdiv">
                     <input type="checkbox">
            <p>${value}</p>
                </div>
            <button class="deletebtn">Delete</button>
    `

    
    mainul.append(maindiv)

    localtodos.push(value)

    localStorage.setItem("yttodo", JSON.stringify(localtodos))

    input.value = ""
}


// form submit event
form.addEventListener("submit", addTask)


// delete logic
mainul.addEventListener("click", (e) => {

    if (e.target.classList.contains("deletebtn")) {

        const li = e.target.parentElement
        const index = [...mainul.children].indexOf(li)

        localtodos.splice(index, 1)

        localStorage.setItem("yttodo", JSON.stringify(localtodos))

        showTodo()
    }
})