function addNewFavoriteToUI(favorite) {
    const favoritesContainer = document.querySelector('.favorites-container');
    const newFavoriteBox = document.createElement('div');
    newFavoriteBox.classList.add('favorite-box');
    newFavoriteBox.innerHTML = `
        <img src="${favorite.images}" alt="Image">
        <div class="favorite-title">${favorite.title}</div>
        <div class="favorite-price">${favorite.date}</div>
        <button class="favorite-delete-btn" onclick="removeFavorite(${favorite.id})">Remove from Favorites</button>
    `;
    favoritesContainer.appendChild(newFavoriteBox);
}

function getFavorites(limit) {
    fetch(`http://localhost:3000/favorites?_limit=${limit}`)
        .then(response => response.json())
        .then(favorites => {
            favorites.forEach(favorite => {
                addNewFavoriteToUI(favorite);
            });
        });
}

function removeFavorite(id) {
    axios.delete(`http://localhost:3000/favorites/${id}`)
        .then(() => {
            window.location.reload();
        });
}

document.addEventListener('DOMContentLoaded', () => {

    const limit = 5;
    getFavorites(limit);
});