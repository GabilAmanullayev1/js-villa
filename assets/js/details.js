let id = new URLSearchParams(window.location.search).get('id');
const body = document.querySelector('body');

fetch("http://localhost:3000/services/" + id)
    .then((response) => response.json())
    .then((data) => {
        body.innerHTML = `
            <div class="sec2-box">
                <img src="${data.images}" alt="Image">
                <div class="sec2-box-p1">${data.title}</div>
                <div class="sec2-box-h2">${data.date}</div>
            </div>
        `;

        const style = document.createElement('style');
        style.textContent = `
            body {
                font-family: 'Arial', sans-serif;
                background-color: #f0f0f0;
            }

            .container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 20px;
            }

            .sec2-box {
                background-color: #fff;
                padding: 20px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                margin: 20px 0;
            }

            .sec2-box img {
                max-width: 100%;
                height: auto;
                margin-bottom: 10px;
            }

            .sec2-box-p1 {
                font-size: 18px;
                font-weight: bold;
            }

            .sec2-box-h2 {
                font-size: 24px;
                color: #007bff;
            }

            .sec2-box-p2 {
                font-size: 16px;
                color: #555;
            }
        `;
        document.head.appendChild(style);
    });