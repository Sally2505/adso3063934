const view = document.querySelectorAll("main")
let currentView = 0 //[0-4]

// Botones y Anchors
const btnLogin = document.querySelector('.btnLogin')
const btnLogout = document.querySelector('.btnLogout')
const btnAdd = document.querySelector('.btnAdd')
const btnBacks = document.querySelectorAll('.btnBack')
const btnShows = document.querySelectorAll('.btnShow')
const btnEdits = document.querySelectorAll('.btnEdit')
const btnCancels = document.querySelectorAll('.btnCancel')

// Login
btnLogin.addEventListener("click", () => {
    currentView = 1
    showView()
})

// Logout
btnLogout.addEventListener("click", () => {
    currentView = 0
    showView()
})

// Add Pet
btnAdd.addEventListener("click", () => {
    currentView = 2
    showView()
})

// Back (pueden ser varios)
btnBacks.forEach(element => {
    element.addEventListener("click", () => {
        currentView = 1
        showView()
    })
})

// Show Pet (pueden ser varios)
btnShows.forEach(element => {
    element.addEventListener("click", () => {
        currentView = 3
        showView()
    })
})

// Edit Pet (pueden ser varios)
btnEdits.forEach(element => {
    element.addEventListener("click", () => {
        currentView = 4
        showView()
    })
})

// Cancel (pueden ser varios)
btnCancels.forEach(element => {
    element.addEventListener("click", () => {
        currentView = 1
        showView()
    })
})

function showView() {
    view.forEach(element => {
        element.classList.remove('animateView')
        element.style.display = "none"
    })

    view[currentView].classList.add('animateView')
    view[currentView].style.display = "block"
}
showView()