document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("trailerModal");
  const openBtn = document.getElementById("openTrailer");
  const closeBtn = document.querySelector(".close");
  const iframe = document.getElementById("trailerVideo");

  openBtn.addEventListener("click", function (e) {
    e.preventDefault();
    modal.style.display = "block";
  });

  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
    stopVideo();
  });

  window.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
      stopVideo();
    }
  });

  function stopVideo() {
    iframe.src = iframe.src;
  }
});
