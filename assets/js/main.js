const slides = document.querySelectorAll('.hero .slide');

const nextSlide = () => {
	const showedSlide = document.querySelector('.hero .slide.show');
	showedSlide.classList.remove('show');
	if(showedSlide.nextElementSibling.classList.contains('slide')) {
		showedSlide.nextElementSibling.classList.add('show');
	} else {
		slides[0].classList.add('show')
	}
	setTimeout(() => showedSlide.classList.remove('show'));
}

setInterval(nextSlide, 5000);

/* Slider */

/* Coding For Slides in the Landing */
// const slides = document.querySelectorAll('.slider .slide');
/*
const next = document.querySelector('#next');
const prev = document.querySelector('#prev');
const intervalTime = 5000;
let auto = false;
let slideInterval;

const nextSlide = () => {
	// Get Current Element
	const current = document.querySelector('.slider .slide.current');
	// Remove Current Element
	current.classList.remove('current');
	// Check if there is Next Element
	if(current.nextElementSibling.classList.contains('slide')) {
		current.nextElementSibling.classList.add('current');
	} else {
		slides[0].classList.add('current');
	};
	setTimeout(() => current.classList.remove('current'));
};

const prevSlide = () => {
	// Get Current Element
	const current = document.querySelector('.slider .slide.current');
	// Remove Current Element
	current.classList.remove('current');
	// Check if there is Prev Element
	if(current.previousElementSibling) {
		// Add current to the prev element
		current.previousElementSibling.classList.add('current');
	} else {
		// Add current to the last element
		slides[slides.length - 1].classList.add('current');
	};
	setTimeout(() => current.classList.remove('current'));
};

next.addEventListener('click', () => {
	nextSlide();
	if(auto) {
		// Reset Interval
		clearInterval(slideInterval);
		slideInterval = setInterval(nextSlide, intervalTime);
	};
});

prev.addEventListener('click', () => {
	prevSlide();
	if(auto) {
		// Reset Interval
		clearInterval(slideInterval);
		slideInterval = setInterval(nextSlide, intervalTime);
	};
});

if(auto) {
	// Run next Slide at interval time
	slideInterval = setInterval(nextSlide, intervalTime);
}

*/