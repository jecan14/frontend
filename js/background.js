document.addEventListener('DOMContentLoaded', function () {
    const backgroundContainer = document.getElementById('dynamicBackground');

    // IMPORTANT: Add your background image filenames here
    const images = [
        '../poster/backgrounds/bg1.jpg',
        '../poster/backgrounds/bg2.jpg',
        '../poster/backgrounds/bg3.jpg'
        // Add more image paths as needed
    ];

    let currentIndex = 0;

    function changeBackground() {
        // Update the background image
        backgroundContainer.style.backgroundImage = `url('${images[currentIndex]}')`;

        // Move to the next image, looping back to the start if necessary
        currentIndex = (currentIndex + 1) % images.length;
    }

    // Change the background immediately on load
    changeBackground();
    // Set an interval to change the background every 7 seconds (7000 milliseconds)
    setInterval(changeBackground, 7000);
});