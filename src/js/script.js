const root = document.documentElement;
const minWidth = 1300;
const iconMenu = document.getElementById("menu-icon");
const iconXmark = document.getElementById("xmark-icon");

function hideShowMenu() {
	const width = root.style.getPropertyValue("--nav-width");
	if (width == "0px") {
		root.style.setProperty("--nav-width", "180px");
		iconMenu.classList.add("hidden");
		iconXmark.classList.remove("hidden");
	} else {
		root.style.setProperty("--nav-width", "0px");
		iconMenu.classList.remove("hidden");
		iconXmark.classList.add("hidden");
	}
}

function checkScreenWidth() {
	const screenWidth = window.innerWidth;

	if (screenWidth < minWidth) {
		hideShowMenu();
	}
}

document.addEventListener("DOMContentLoaded", checkScreenWidth);
window.addEventListener("resize", checkScreenWidth);
document.getElementById("menu-button").addEventListener("click", hideShowMenu);
