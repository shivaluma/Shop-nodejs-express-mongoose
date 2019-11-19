var type = document.querySelectorAll('#product-type li');
var price = document.querySelectorAll('#product-price li');
var label = document.querySelectorAll('#product-label li');
var size = document.querySelectorAll('#product-size li');

function removeActive(option) {
    if (option == 'type') {
        for (var i = 0; i < type.length; i++) {
            type[i].classList.remove('active');
        }
    }
    if (option == 'size') {
        for (var i = 0; i < size.length; i++) {
            size[i].classList.remove('active');
        }
    }
    if (option == 'price') {
        for (var i = 0; i < price.length; i++) {
            price[i].classList.remove('active');
        }
    }
    if (option == 'label') {
        for (var i = 0; i < label.length; i++) {
            label[i].classList.remove('active');
        }
    }
}

for (var i = 0; i < type.length; i++) {
    type[i].onclick = function() {
        removeActive('type');
        this.classList.add('active');
    };
}
for (var i = 0; i < size.length; i++) {
    size[i].onclick = function() {
        removeActive('size');
        this.classList.add('active');
    };
}
for (var i = 0; i < label.length; i++) {
    label[i].onclick = function() {
        removeActive('label');
        this.classList.add('active');
    };
}
for (var i = 0; i < price.length; i++) {
    price[i].onclick = function() {
        removeActive('price');
        this.classList.add('active');
    };
}

var state = {
    type: '',
    size: '',
    price: '',
    label: ''
};

function getState() {
    state.type = document.querySelector('#product-type .active');
    state.size = document.querySelector('#product-size .active');
    state.price = document.querySelector('#product-price .active');
    state.label = document.querySelector('#product-label .active');
    return state;
}

export { getState };
