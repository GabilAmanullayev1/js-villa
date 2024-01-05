let menu = document.querySelector('.nav-menu');
let modal = document.querySelector('#modal-container');
let close = document.querySelector('.close');

menu.addEventListener('click', function () {
    modal.style.display = "flex";
    setTimeout(function () {
        modal.style.opacity = "1";
    }, 10);
});

close.addEventListener('click', function () {
    modal.style.opacity = "0";
    setTimeout(function () {
        modal.style.display = "none";
    }, 300);
});
document.addEventListener("DOMContentLoaded", function () {
    const backToTopButton = document.getElementById('backToTop');


    window.addEventListener('scroll', function () {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', function () {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });
});
let arr = []
let page = 1
let recBoxs = document.querySelector('.recent-boxs')
let loadElement = document.querySelector('.load-more')
let search = document.querySelector('.search-input')
let searchBtn = document.querySelector('.search-btn')
function getDataJson() {
    fetch(`http://localhost:3000/services?_page=${page}&_limit=3`)
        .then(response => response.json())
        .then(data => {
            arr.push(data);
            data.forEach(element => {
                recBoxs.innerHTML += `
        <div class="recent-box">
            <i onclick="addFavorite(${element.id})" class="fa-regular fa-heart" ></i>
            <div class="recent-image"><img src="${element.images}" alt="Image"></div>
            <div class="rec-box-p">${element.date}</div>
            <div class="rec-box-h2">${element.title}</div>
            <div class = "rec-box-btns">
             <button class="delete" onclick="boxsDelete(${element.id})">
             <i class="fa-solid fa-trash"></i></button>
             <button class = "update"><a href = "./update.html?id=${element.id}" target = "_blank"><i class="fa-solid fa-pencil"></i></a></button>
             <button class = "cart"><a href = "./details.html?id=${element.id}"><i class="fa-solid fa-cart-shopping"></i></a></button>
            </div>
        </div>
            `
            });
            return arr.flat();
        })
        .catch(error => console.error('Error fetching data:', error));
}
function boxsDelete(id) {
    axios.delete(`http://localhost:3000/services/${id}`)
    window.location.reload();
}
loadElement.addEventListener('click', () => {
    page++
    getDataJson()
})
function addFavorite(id) {
    axios.get(`http://localhost:3000/favorites?serviceId=${id}`)
        .then(response => {
            axios.get(`http://localhost:3000/services/${id}`)
                .then(response => {
                    axios.post("http://localhost:3000/favorites", response.data);
                });

        });
}
getDataJson()
searchBtn.addEventListener('click', function () {
    recBoxs.innerHTML = '';

    const searchTerm = search.value.trim();

    fetch(`http://localhost:3000/services?title_like=${searchTerm}`)
        .then(response => response.json())
        .then(data => {
            arr.push(data);
            data.forEach(element => {
                recBoxs.innerHTML += `
                <div class="recent-box">
                <i onclick="addFavorite(${element.id})" class="fa-regular fa-heart" ></i>
                <div class="recent-image"><img src="${element.images}" alt="Image"></div>
                <div class="rec-box-p">${element.date}</div>
                <div class="rec-box-h2">${element.title}</div>
                <div class = "rec-box-btns">
                 <button class="delete" onclick="boxsDelete(${element.id})">
                 <i class="fa-solid fa-trash"></i></button>
                 <button class = "update"><a href = "./update.html?id=${element.id}" target = "_blank"><i class="fa-solid fa-pencil"></i></a></button>
                 <button class = "cart"><a href = "./details.html?id=${element.id}"><i class="fa-solid fa-cart-shopping"></i></a></button>
                </div>
            </div>
                `;
            });
            search.value=''
            return arr.flat();
        })
        .catch(error => console.error('Error fetching data:', error));
});
