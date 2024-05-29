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
});
