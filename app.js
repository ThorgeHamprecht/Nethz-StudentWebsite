const menu = document.querySelector("#mobile-menu")
const menuLinks = document.querySelector(".navbar__menu")
const logo = document.querySelector("#navbar__logo")

menu.addEventListener("click", function () {
    menu.classList.toggle("is-active")
    menuLinks.classList.toggle("active")
});



