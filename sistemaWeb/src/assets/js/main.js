$(".button-collapse").sideNav();
window.onscroll = function () {
    if (pageYOffset >= 200) {
        document.getElementById('backToTop').style.visibility = "visible";
    } else {
        document.getElementById('backToTop').style.visibility = "hidden";
    }
};