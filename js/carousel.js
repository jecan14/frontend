document.addEventListener('DOMContentLoaded', function () {
    const carouselContainer = document.getElementById('dynamicCarousel');
    const modal = document.getElementById('carouselTrailerModal');
    const modalClose = document.getElementById('carouselModalClose');
    const videoFrame = document.getElementById('carouselVideoFrame');

    // Fetch movie data and build the carousel
    fetch('../js/movies.json')
        .then(response => response.json())
        .then(movies => {
            movies.forEach(movie => {
                const carouselItem = document.createElement('div');
                carouselItem.className = 'carousel-item';
                carouselItem.innerHTML = `
                    <img src="${movie.poster}" alt="${movie.title}" data-trailer-id="${movie.trailerId}" data-page-url="${movie.pageUrl}">
                    <div class="play-icon">
                        <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
                    </div>
                `;
                carouselContainer.appendChild(carouselItem);
            });

            // Initialize Slick Carousel after items are added
            $(carouselContainer).slick({
                dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: 5,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 3000,
                centerMode: true,
                centerPadding: '40px',
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2,
                            centerMode: false,
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            centerMode: false,
                        }
                    }
                ]
            });

            // Add click event listener for opening the modal
            carouselContainer.addEventListener('click', function(e) {
                if (e.target.tagName === 'IMG') {
                    const trailerId = e.target.getAttribute('data-trailer-id');
                    if (trailerId) {
                        videoFrame.src = `https://www.youtube.com/embed/${trailerId}?autoplay=1`;
                        modal.style.display = 'flex';
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching movie data:', error));

    // Function to close the modal and stop the video
    function closeModal() {
        modal.style.display = 'none';
        videoFrame.src = '';
    }

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => (e.target === modal) && closeModal());
});