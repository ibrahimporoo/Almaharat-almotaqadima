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