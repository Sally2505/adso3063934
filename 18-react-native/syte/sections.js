const appWidth = 412;
const appHeight = 917;

function keepAndroidCompactSize() {
    const scale = Math.min(
        window.innerWidth / appWidth,
        window.innerHeight / appHeight,
        1
    );

    document.documentElement.style.setProperty("--app-scale", scale);
}

keepAndroidCompactSize();
window.addEventListener("resize", keepAndroidCompactSize);

const screen = document.querySelector(".screen");
const smallLogo = document.querySelector(".small-logo");
const sidebarLogo = document.querySelector(".sidebar-logo");
const sidebarShade = document.querySelector(".sidebar-shade");
const sidebarLinks = document.querySelectorAll(".sidebar-option");

if (smallLogo) {
    smallLogo.addEventListener("click", () => {
        screen.classList.toggle("sidebar-open");
    });
}

if (sidebarLogo) {
    sidebarLogo.addEventListener("click", () => {
        screen.classList.remove("sidebar-open");
    });
}

if (sidebarShade) {
    sidebarShade.addEventListener("click", () => {
        screen.classList.remove("sidebar-open");
    });
}

sidebarLinks.forEach((link) => {
    link.addEventListener("click", () => {
        screen.classList.remove("sidebar-open");
    });
});
