let menu = document.querySelector('.nav-menu');
let modal = document.querySelector('#modal-container');
let close = document.querySelector('.close');

menu.addEventListener('click', function() {
    modal.style.display = "flex";
});

close.addEventListener('click', function() {
    modal.style.display = "none";
});
