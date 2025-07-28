const root = document.documentElement;

document.getElementById("menu-button").addEventListener("click", function () {
	const width = root.style.getPropertyValue("--nav-width");

	if (width == "0px") {
		root.style.setProperty("--nav-width", "180px");
	} else {
		root.style.setProperty("--nav-width", "0px");
	}
});
