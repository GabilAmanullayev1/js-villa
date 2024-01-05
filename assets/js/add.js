const modalImage = document.querySelector('.modalImage');
const imageInput = document.getElementById('imageInput');
const categoryInput = document.getElementById('category');
const descriptionInput = document.getElementById('description');
const submitBtn = document.getElementById('submit');

submitBtn.addEventListener('click', () => {
    const file = imageInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
            const imageSrc = e.target.result;
            modalImage.src = imageSrc;

            const category = categoryInput.value;
            const descriptionValue = descriptionInput.value;
            const newElement = {
                images: imageSrc,
                title: category,
                date: descriptionValue,
            };

            axios.post('http://localhost:3000/services', newElement)
                .then(response => {
                    console.log('Element added:', response.data);
                })
                .catch(error => {
                    console.error('Error adding element:', error);
                });
        };

        reader.readAsDataURL(file);
    }
});