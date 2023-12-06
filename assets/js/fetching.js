
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where, orderBy, startAfter, limit } from 'firebase/firestore';

// test Firebase...
const firebaseConfig = {
  apiKey: "AIzaSyBbOaoeJVj77APBZVQ5rkoGqxbRgmgiA4c",
  authDomain: "almaharat-almotakadma.firebaseapp.com",
  projectId: "almaharat-almotakadma",
  storageBucket: "almaharat-almotakadma.appspot.com",
  messagingSenderId: "688274689543",
  appId: "1:688274689543:web:ce54876a5a1010fd0024a2",
  measurementId: "G-283QCP12BS"
};
const app = initializeApp(firebaseConfig);
// Create a reference to your Firestore collection
const db = getFirestore(app);
const collectionRef = collection(db, 'estates');

// const container = document.querySelector('.real-estates .rooms');
const container = document.querySelector('#real-estates');
console.log(container)

// Query the first page of docs
let latestDoc = null;
let cardsCount = 6;

// For template
const displayNext = async () => {

	let ref = query(collectionRef,
		where('appear', '==', true)
	);

	cardsCount = 9;

	const data = await getDocs(ref);

	container.innerHTML = '';

	data.docs.forEach(doc => {
		const realEstate = doc.data();
		realEstate.id = doc.id;

		// Format Money
		// <h4 class="price">${formattedPrice} ر.س</h4>
		const options = {
			style: 'currency',
			currency: 'SAR',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		};

		const formattedPrice = Number(realEstate.price_of_buying).toLocaleString('ar-SA', options);

		container.innerHTML += `
			<div class="room-box">
				<div class="img-holder mb-2 position-relative">
					<img class="w-100" src="${realEstate.images_urls}" alt="${realEstate.title}">
					<span class="position-absolute bottom-0 end-0 m-2 px-2 pb-1 type">${realEstate.type}</span>
					${realEstate.is_special && `<span class="position-absolute top-0 end-0 m-2 px-2 pb-1 special">مميز</span>`}
				</div>
				<div class="room-info px-3 py-2">
					<h5 class="title">${realEstate.title}</h5>
					<span class="fw-light d-block mb-2">
						<i class="fa-solid fa-location-dot ms-1 location-icon"></i>
						${realEstate.address}
					</span>
					<ul class="d-flex align-items-center justify-content-between mb-3">
						<li class="d-flex align-items-center gap-1">
							<img class="icon" src="assets/imgs/bed-icon.png" alt="">
							<span class="num">${realEstate.rooms_count}</span>
						</li>
						<li class="d-flex align-items-center gap-1">
							<img class="icon" src="assets/imgs/bathing-icon.png" alt="">
							<span class="num">${realEstate.bathrooms_count}</span>
						</li>
						<li class="d-flex align-items-center gap-1">
							<img class="icon" src="assets/imgs/ruler-icon.png" alt="">
							<span class="num">${realEstate.the_area} م<sup>2</sup></span>
						</li>
						<li class="d-flex align-items-center gap-1">
							<img class="icon" src="assets/imgs/building-floors-icon.png" alt="">
							<span class="num">${realEstate.floors_count}</span>
						</li>
					</ul>
					<div class="end-info pt-3 pb-2 d-flex align-items-center justify-content-between">
						<h4 class="price">${formattedPrice}</h4>
						<div class="contact d-flex align-items-center justify-content-between gap-2">
							<a href="https://wa.me/+966544244514?text=%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%A3%D9%86%20%D8%A3%D8%B9%D8%B1%D9%81%20%D8%AA%D9%81%D8%A7%D8%B5%D9%8A%D9%84%20%D8%A7%D9%84%D8%B9%D9%82%D8%A7%D8%B1%20%D8%B1%D9%82%D9%85%20${realEstate.order}" target="_blank" class="whatsapp d-flex align-items-center justify-content-center">
								<i class="fa-brands fa-whatsapp"></i>
							</a>
							<a href="tel:+966544244514" target="_blank" class="phone d-flex align-items-center justify-content-center">
								<i class="fa-solid fa-phone-volume"></i>
							</a>
						</div>
					</div>
					<a href="/single-estate.html?id=${realEstate.id}" target="_blank" class="view-btn d-block mt-3">اقرأ المزيد ...</a>
				</div>
			</div>
		`;
		// <a href="" class="view-btn d-block mt-3">اقرأ المزيد ...</a>
});

};

displayNext();
