document.addEventListener('DOMContentLoaded', function() {
    const title = localStorage.getItem('movieTitle');
    const desc = localStorage.getItem('movieDesc');
    const imgSrc = localStorage.getItem('movieImg');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const username = localStorage.getItem('user');

    if (title && desc && imgSrc) {
        document.getElementById('movieTitle').innerText = title;
        document.getElementById('movieDesc').innerText = desc;
        document.getElementById('movieImg').src = imgSrc;
        document.getElementById('popupTitle').innerText = title;
        document.getElementById('popupImg').src = imgSrc;
        
        fetchReviews(title);
    } else {
        window.location.href = 'index.html';
    }

    const sendReviewButton = document.getElementById('sendReviewButton');
    if (isLoggedIn) {
        sendReviewButton.style.display = 'block';
    } else {
        sendReviewButton.style.display = 'none';
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
        const user = username;
        const movieTitle = title;

        if (reviewText && publisher && rottenLink && user) {
            showLoader();

            fetch('http://127.0.0.1:5000/predict', {
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
            })
            .finally(() => {
                hideLoader();
            });
        } else {
            alert('Please fill in all fields.');
        }
    });

    function fetchReviews(movieTitle) {
        fetch('http://127.0.0.1:5000/get-reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ movie_title: movieTitle })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.reviews) {
                displayReviews(data.reviews);
            } else {
                alert('Failed to fetch reviews: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while fetching the reviews.');
        });
    }

    function displayReviews(reviews) {
        const reviewsContainer = document.getElementById('reviewsContainer');
        reviewsContainer.innerHTML = ''; // Clear previous reviews

        reviews.forEach(review => {
            const reviewElement = document.createElement('div');
            reviewElement.classList.add('review-card');

            const userElement = document.createElement('h3');
            userElement.innerText = review.user;

            const reviewTextElement = document.createElement('p');
            reviewTextElement.innerText = review.review;

            const reviewTypeElement = document.createElement('div');
            reviewTypeElement.classList.add('review-type');
            reviewTypeElement.innerText = review.review_type;

            reviewElement.appendChild(userElement);
            reviewElement.appendChild(reviewTextElement);
            reviewElement.appendChild(reviewTypeElement);

            reviewsContainer.appendChild(reviewElement);
        });
    }

    var select = function(s) {
        return document.querySelector(s);
      },
      selectAll = function(s) {
        return document.querySelectorAll(s);
      },
      animationWindow = select('#animationWindow'),
      animData = {
        wrapper: animationWindow,
        animType: 'svg',
        loop: true,
        prerender: true,
        autoplay: true,
        path: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/35984/play_fill_loader.json',
        rendererSettings: {}
      }, anim;
    
    anim = bodymovin.loadAnimation(animData);
    anim.setSpeed(1);
    
    function showLoader() {
        animationWindow.style.display = 'flex';
    }
    
    function hideLoader() {
        animationWindow.style.display = 'none';
    }
});
