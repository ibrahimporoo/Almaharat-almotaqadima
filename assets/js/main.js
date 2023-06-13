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

// Swiper js library
let swiper = new Swiper(".our-files", {
	slidesPerView: 1,
	spaceBetween: 30,
	loop: true,
	centeredSlides: true,
	autoplay: {
		delay: 5500,
	},
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},
	navigation: {
		nextEl: ".button-next",
		prevEl: ".button-prev",
	},
});

new Swiper('.clients-slider', {
	speed: 400,
	loop: true,
	autoplay: {
		delay: 5000,
		disableOnInteraction: false
	},
	slidesPerView: 'auto',
	pagination: {
		el: '.swiper-pagination',
		type: 'bullets',
		clickable: true
	},
	breakpoints: {
		320: {
			slidesPerView: 2,
			spaceBetween: 40
		},
		480: {
			slidesPerView: 3,
			spaceBetween: 60
		},
		640: {
			slidesPerView: 4,
			spaceBetween: 80
		},
		992: {
			slidesPerView: 6,
			spaceBetween: 120
		}
	}
});
// var swiper = new Swiper(".our-files", {
// 	spaceBetween: 20,
// 	centeredSlides: true,
// 	autoplay: {
// 		delay: 200,
// 		disableOnInteraction: false
// 	},
// 	breakpoints: {
// 		0: {
// 			slidesPerView: 0,
// 		},
// 		500: {
// 			slidesPerView: 2,
// 		},
// 		768: {
// 			slidesPerView: 2,
// 		},
// 		1020: {
// 			slidesPerView: 3,
// 		}
// 	}
// });