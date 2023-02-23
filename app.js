const menu = document.querySelector("#mobile-menu");
const menuLinks = document.querySelector(".navbar__menu");
const mainContainer = document.querySelector(".main");

var theme = "dark";

window.onload = function () {
    if (theme === "dark") {
        mainContainer.toggle("dark");
    }
    else {
        mainContainer.toggle("light");
    }


}

menu.addEventListener("click", function () {
    menu.classList.toggle("is-active")
    menuLinks.classList.toggle("active")
});



