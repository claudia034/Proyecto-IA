document.addEventListener('DOMContentLoaded', function() {
    const title = localStorage.getItem('movieTitle');
    const desc = localStorage.getItem('movieDesc');
    const imgSrc = localStorage.getItem('movieImg');

    if (title && desc && imgSrc) {
        document.getElementById('movieTitle').innerText = title;
        document.getElementById('movieDesc').innerText = desc;
        document.getElementById('movieImg').src = imgSrc;
        document.getElementById('popupTitle').innerText = title;
    } else {
        window.location.href = 'index.html';
    }

    document.getElementById('sendReviewButton').addEventListener('click', function() {
        document.getElementById('popup').style.display = 'flex';
    });

    document.getElementById('closeButton').addEventListener('click', function() {
        document.getElementById('popup').style.display = 'none';
    });

    document.getElementById('submitReviewButton').addEventListener('click', function() {
        const reviewText = document.getElementById('reviewText').value;
        const publisher = document.getElementById('publisher').value;
        const rottenLink = document.getElementById('rottenLink').value;
        const user = document.getElementById('user').value;
        const movieTitle = title;

        if (reviewText && publisher && rottenLink && user) {
            fetch('http://127.0.0.1:5000/predict', { // Asegúrate de que esta URL sea correcta
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    review: reviewText,
                    publisher: publisher,
                    rotten_link: rottenLink,
                    user: user,
                    movie_title: movieTitle
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                if (data.classification) {
                    alert('Review submitted successfully! Classification: ' + data.classification);
                } else {
                    alert('Failed to submit review: ' + data.message);
                }
                document.getElementById('popup').style.display = 'none';
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while submitting the review.');
            });
        } else {
            alert('Please fill in all fields.');
        }
    });
});
