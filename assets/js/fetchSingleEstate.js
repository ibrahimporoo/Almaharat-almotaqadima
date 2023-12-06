import { initializeApp } from 'firebase/app';
import {
	getFirestore, doc, getDoc
} from 'firebase/firestore';
// Almaharat Firebase...
const firebaseConfig = {
  apiKey: "AIzaSyBbOaoeJVj77APBZVQ5rkoGqxbRgmgiA4c",
  authDomain: "almaharat-almotakadma.firebaseapp.com",
  projectId: "almaharat-almotakadma",
  storageBucket: "almaharat-almotakadma.appspot.com",
  messagingSenderId: "688274689543",
  appId: "1:688274689543:web:ce54876a5a1010fd0024a2",
  measurementId: "G-283QCP12BS"
};

initializeApp(firebaseConfig);
const db = getFirestore();

const urlKeysValues = window.location.search;
const urlParams = new URLSearchParams(urlKeysValues);
const estateID = urlParams.get('id');
/* Select HTML Content Elements */
const estatesGallery = document.querySelector('.estates-gallery');
const title = estatesGallery.querySelector('.title > h3');
const topSwiper = estatesGallery.querySelector('.topSwiper');
const bottomSwiper = estatesGallery.querySelector('.bottomSwiper');
const description = estatesGallery.querySelector('.description');
const quickDetails = document.querySelector('.quick-details');

/* Select HTML Content Elements */

async function fetchSingleEstate() {
	const docRef = doc(db, 'estates', estateID);
	const docSnap = await getDoc(docRef);
	const estate = docSnap.data();

  console.log(estate)

  title.textContent = estate.title;
  
  topSwiper.innerHTML = `
  <div class="swiper-wrapper">
    ${
      estate.images_urls.map(imgUrl => {
        return (
          `
          <div class="swiper-slide">
            <img src=${imgUrl} />
          </div>
          `
        )
      }).join('')
    }
  </div>
  <button class="next-btn">
    <i class="fa-solid fa-chevron-left"></i>
  </button>
  <button class=" prev-btn">
    <i class="fa-solid fa-chevron-right"></i>
  </button>
  `;

  bottomSwiper.innerHTML = `
  <div class="swiper-wrapper">
    ${
      estate.images_urls.map(imgUrl => {
        return (
          `
          <div class="swiper-slide">
            <img src=${imgUrl} />
          </div>
          `
        )
      }).join('')
    }
  </div>
  `
  // Swiper
  const swiper = new Swiper(".bottomSwiper", {
    loop: true,
    spaceBetween: 15,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
  });

  const swiper2 = new Swiper(".topSwiper", {
    loop: true,
    spaceBetween: 10,
    navigation: {
      nextEl: ".next-btn",
      prevEl: ".prev-btn",
      // nextEl: ".swiper-button-next",
      // prevEl: ".swiper-button-prev",
    },
    thumbs: {
      swiper: swiper,
    },
  });

  description.innerHTML = `
    <ul class="d-flex align-items-center justify-content-between px-0 gap-2">
      <li class="d-flex flex-column align-items-center gap-1">
        <div class="d-flex align-items-center gap-1">
          <img class="icon" src="assets/imgs/bed-icon.png" alt="">
          <span class="num bed">${ estate.rooms_count }</span>
        </div>
        <h6>غرف نوم</h6>
      </li>
      <li class="d-flex flex-column align-items-center gap-1">
        <div class="d-flex align-items-center gap-1">
          <img class="icon" src="assets/imgs/bathing-icon.png" alt="">
          <span class="num">${ estate.bathrooms_count }</span>
        </div>
        <h6>دورات المياة</h6>
      </li>
      <li class="d-flex flex-column align-items-center gap-1">
        <div class="d-flex align-items-center gap-1">
          <img class="icon" src="assets/imgs/ruler-icon.png" alt="">
          <span class="num">${ estate.the_area } م<sup>2</sup></span>
        </div>
        <h6>مساحة الأرض</h6>
      </li>
    </ul>
    <ul class="d-flex align-items-center justify-content-between px-0 mt-2 gap-2">
      <li class="d-flex flex-column align-items-center gap-1">
        <div class="d-flex align-items-center gap-1">
          <img class="icon" src="assets/imgs/building-floors-icon.png" alt="">
          <span class="num">${ estate.floors_count }</span>
        </div>
        <h6>عدد الطوابق</h6>
      </li>
    </ul>
  `;

  quickDetails.innerHTML = `
    <h4 class="price mb-2">${ estate.price_of_buying } ر.س.</h4>
    <p class="pt-3">
      الرقم المرجعي <span>${ estate.order }</span>
    </p>
    <p class="">
      رقم الإعلان	<span>${ estate.advertising_number }</span>
    </p>
    <div class="contacts-btn mt-4 d-flex align-items-center justify-content-center gap-1">
      <a href="https://wa.me/${ estate.tel_number.replace(" ", "") }" terget="_blank" class="whatsapp p-2 d-flex align-items-center justify-content-center gap-2">
        <i class="fa-brands fa-whatsapp"></i>
        محادثة واتس أب
      </a>
      <a href="tel:${ estate.tel_number }" target="_blank" class="phone p-2 d-flex align-items-center justify-content-center gap-2 w-50">
        <i class="fa-solid fa-phone-volume"></i>
        اتصل بنا
      </a>
    </div>
  `
}

fetchSingleEstate();


