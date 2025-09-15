document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const mainNav = document.getElementById("main-nav");
  const navLinks = mainNav ? mainNav.querySelectorAll("a") : [];

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      mainNav.classList.toggle("active");
    });

    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("active");
      });
    });

    if (window.innerWidth >= 993) {
      mainNav.classList.remove("active");
    }
  }
});

window.addEventListener("resize", () => {
  const mainNav = document.getElementById("main-nav");
  if (mainNav && window.innerWidth >= 993) {
    mainNav.classList.remove("active");
  }
});

const slider = document.getElementById("slider");
const dotsContainer = document.getElementById("dots");
const slides = slider ? slider.querySelectorAll("a") : [];

let currentIndex = 0;
const postersPerSlide = 7;
const slideCount = slides.length ? Math.ceil(slides.length / postersPerSlide) : 0;
let slideWidth = slides.length ? slides[0].offsetWidth * postersPerSlide + 20 * (postersPerSlide - 1) : 0;

if (dotsContainer && slideCount > 0) {
  dotsContainer.innerHTML = "";
  const dots = Array.from({ length: slideCount }, (_, i) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.addEventListener("click", () => scrollToSlide(i));
    dotsContainer.appendChild(dot);
    return dot;
  });

  function scrollToSlide(index) {
    slider.style.transform = `translateX(-${slideWidth * index}px)`;
    currentIndex = index;
    updateDots();
  }

  function updateDots() {
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
    });
  }

  window.addEventListener("load", () => {
    slideWidth = slides[0].offsetWidth * postersPerSlide + 20 * (postersPerSlide - 1);
    scrollToSlide(0);
  });

  window.addEventListener("resize", () => {
    slideWidth = slides[0].offsetWidth * postersPerSlide + 20 * (postersPerSlide - 1);
    scrollToSlide(currentIndex);
  });

  setInterval(() => {
    let nextIndex = currentIndex + 1;
    if (nextIndex >= slideCount) nextIndex = 0;
    scrollToSlide(nextIndex);
  }, 3000);
}

const sliders = document.querySelectorAll(".slider");
sliders.forEach(sliderEl => {
  const track = sliderEl.querySelector(".slider-track");
  let scrollAmount = 0;

  setInterval(() => {
    scrollAmount += 1;
    if (scrollAmount >= track.scrollWidth - sliderEl.clientWidth) {
      scrollAmount = 0;
    }
    sliderEl.scrollTo({
      left: scrollAmount,
      behavior: "smooth"
    });
  }, 20);
});

function navigateToPage() {
  const dropdown = document.getElementById("myDropdown");
  const selectedValue = dropdown.value;
  if (selectedValue) {
    window.location.href = selectedValue;
  }
}

const availableDates = {
  "2025-08-08": "superman1.html",
  "2025-08-10": "squidgame.html",
  "2025-08-14": "alice.html"
};

const calendarHeader = document.getElementById("calendar-header");
const calendarDays = document.getElementById("calendar-days");
const calendarDates = document.getElementById("calendar-dates");

const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const daysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function renderCalendar(month, year) {
  calendarHeader.innerHTML = `
    <button onclick="changeMonth(-1)">←</button>
    ${monthNames[month]} ${year}
    <button onclick="changeMonth(1)">→</button>
  `;

  calendarDays.innerHTML = "";
  for (let d of daysShort) {
    const dayEl = document.createElement("div");
    dayEl.className = "calendar-day";
    dayEl.textContent = d;
    calendarDays.appendChild(dayEl);
  }

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayStr = today.toISOString().split("T")[0];

  calendarDates.innerHTML = "";

  for (let i = 0; i < firstDay; i++) {
    calendarDates.appendChild(document.createElement("div"));
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dateStr = date.toISOString().split("T")[0];
    const cell = document.createElement("div");

    cell.className = "calendar-date";
    cell.textContent = day;

    if (dateStr === todayStr) {
      cell.classList.add("today");
    }

    if (availableDates[dateStr]) {
      cell.classList.add("available");
      cell.onclick = () => {
        window.location.href = availableDates[dateStr];
      };
    } else {
      cell.classList.add("disabled");
    }

    calendarDates.appendChild(cell);
  }
}

function changeMonth(direction) {
  currentMonth += direction;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  } else if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar(currentMonth, currentYear);
}

renderCalendar(currentMonth, currentYear);

function goToSeating(button) {
  const date = document.getElementById("dateDropdown").value;
  const format = document.getElementById("formatDropdown").value;
  const movieTitle = button.getAttribute("data-movie");
  const moviePoster = button.getAttribute("data-poster");

  if (!date || !format) {
    alert("Please select both date and viewing format.");
    return;
  }

  // Encode components to be URL-safe
  const encodedDate = encodeURIComponent(date);
  const encodedFormat = encodeURIComponent(format);
  const encodedTitle = encodeURIComponent(movieTitle);
  const encodedPoster = encodeURIComponent(moviePoster);

  window.location.href = `seating.html?date=${encodedDate}&format=${encodedFormat}&movie=${encodedTitle}&poster=${encodedPoster}`;
}

function searchMovie() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase().trim();
    if (!searchInput) {
        alert("Please enter a movie title to search.");
        return;
    }

    const movies = {
        // Now Showing
        "superman": "superman.html",
        "squid game 3": "squid.html",
        "us": "us.html",
        "jurassic world rebirth": "jurasic.html",
        "all of us are dead": "dead.html",
        "alice in borderland": "aib.html",
        "mission impossible: the final reckoning": "mission.html",
        "kpop demon hunters": "kpop.html",
        "how to train your dragon": "dragon.html",
        "karate kid: legends": "karate.html",
        // Advance Ticket Selling
        "spider-man brand new day": "spider.html",
        "demon slayer infinity castle": "demon.html"
    };

    if (movies[searchInput]) {
        window.location.href = movies[searchInput];
    } else {
        alert(`Movie "${document.getElementById('searchInput').value}" not found.`);
    }
}
