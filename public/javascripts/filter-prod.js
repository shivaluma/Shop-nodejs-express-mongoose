var producttype = document.querySelectorAll(
    '.tt-list-row li, tt-options-swatch'
);
function removeActive() {
    for (var i = 0; i < producttype.length; i++) {
        producttype[i].classList.remove('active');
    }
}

for (var i = 0; i < producttype.length; i++) {
    producttype[i].onclick = function() {
        this.classList.toggle('active');
    };
}
