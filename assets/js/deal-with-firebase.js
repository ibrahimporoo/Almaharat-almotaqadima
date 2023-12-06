import { initializeApp } from 'firebase/app';
import {
	getFirestore, collection, getDocs,
	addDoc, updateDoc, doc,
	serverTimestamp
} from 'firebase/firestore';
import {
	getStorage, ref, uploadBytesResumable, getDownloadURL
} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBbOaoeJVj77APBZVQ5rkoGqxbRgmgiA4c",
  authDomain: "almaharat-almotakadma.firebaseapp.com",
  projectId: "almaharat-almotakadma",
  storageBucket: "almaharat-almotakadma.appspot.com",
  messagingSenderId: "688274689543",
  appId: "1:688274689543:web:ce54876a5a1010fd0024a2",
  measurementId: "G-283QCP12BS"
};

// init services
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore();

const colRef = collection(db, 'estates');
let allEstatesCount = 0;

getDocs(colRef)
  .then(snapshot => {
		let allEstates = [];
    snapshot.docs.forEach(doc => {
      allEstates.push({ ...doc.data(), id: doc.id })
    })
		allEstatesCount = allEstates.length;
  })
  .catch(err => {
    console.log(err.message);
  });

const addingEstateForm = document.querySelector('#adding-estate-form'),
submitBtn = document.querySelector('#submit-btn'),
sweetAlert = document.querySelector('#alert'),
closeAlert = document.querySelector('#close-alert');

addingEstateForm.addEventListener('submit', async (e) => {

	e.preventDefault();

	if(isValid()) {

		const downloadURLs = [];

		reloadButton(submitBtn);
	
		for (const file of files) {
			const compressedImageFile = await compressFileIfNeeded(file);
			const storageRef = ref(storage, `images/${file.name}`);
			const snapshot = await uploadBytesResumable(storageRef, compressedImageFile);
			const downloadURL = await getDownloadURL(snapshot.ref);
			downloadURLs.push(downloadURL);
		};

		await addDoc(colRef, {
			name: addingEstateForm.full_name.value,
			title: addingEstateForm.title.value,
			desc: addingEstateForm.desc.value,
			category: addingEstateForm.category.value,
			type: addingEstateForm.type.value,
			rooms_count: addingEstateForm.rooms_count.value,
			bathrooms_count: addingEstateForm.bathrooms_count.value,
			living_rooms: addingEstateForm.living_rooms.value,
			the_area: addingEstateForm.the_area.value,
			floors_count: addingEstateForm.floors_count.value,
			price_of_buying: addingEstateForm.price_of_buying.value,
			images_urls: downloadURLs.length > 0 ? downloadURLs : [],
			address: addingEstateForm.address.value,
			tel_number: addingEstateForm.tel_number.value,
			mail: addingEstateForm.mail.value,
			advertising_number: addingEstateForm.advertising_number.value,
			order: allEstatesCount + 1,
			appear: true,
			is_special: false,
			createdAt: serverTimestamp()
		}).then(() => {
			submitBtn.classList.remove('reload');
			submitBtn.innerHTML = 'إرسال';
			clearInterval(btnReloadingInterval);
			sweetAlert.classList.add('on');
			addingEstateForm.reset();
		});

	}

});

/* Form Validation */
function isValid() {
	let valid = true;
	const currentInputs = Array.from(addingEstateForm.querySelectorAll('input:not(.unrequired), select, textarea:not(.unrequired)'));
	for(let i = 0;i < currentInputs.length; i++) {
		// If There is any empty Input make it invalid
		if (currentInputs[i].value.length) {
			currentInputs[i].classList.remove("invalid");
		} else {
			valid = false;
			currentInputs[i].classList.add("invalid");
		}
	};
	if(files.length > 0) {
		document.querySelector('.images-files').classList.remove('invalid')
	} else {
		valid = false;
		document.querySelector('.images-files').classList.add('invalid')
	}
	return valid;
};

let btnReloadingInterval;
function reloadButton(btn) {
	btn.classList.add('reload');
	// btn.innerHTML = '<span class="spinner"></span> قيد الارسال';
	btn.innerHTML = 'قيد الارسال';
	let count = 1;
	btnReloadingInterval = setInterval(() => {
		btn.innerHTML += '.';
		if(count >= 4) {
			count = 1;
			// btn.innerHTML = '<span class="spinner"></span> قيد الارسال';
			btn.innerHTML = 'قيد الارسال';
		}
		count++;
	}, 1000);
};

/* Immediatly dealing with inputs */
let files = [],
imagesFiles = document.querySelector('.images-files'),
uploadedImages = document.querySelector('.uploaded-images'),
inputImages = document.querySelector('input[name="images_file"]');

imagesFiles.addEventListener('click', _ => {
	inputImages.click();
});

inputImages.addEventListener('change', _ => {
	let file = inputImages.files;

	for(let i = 0; i < file.length; i++) {
		if( files.every(e => e.name !== file[i].name) )
		files.push(file[i])
	};

	showImages();

});

const delImage = (index) => {
	files.splice(index, 1);
	showImages();
};

const showImages = () => {
	let imageTemplate = '';
	files.forEach((file, i) => {
		imageTemplate += `
			<div class="image">
				<img src="${URL.createObjectURL(file)}" alt="image">
				<span class="del-image" data-i="${i}"><i class="fa-solid fa-xmark"></i></span>
			</div>
		`;
	})
	uploadedImages.innerHTML = imageTemplate;
};

window.onclick = (e) => {
	if(e.target.matches('.del-image')) {
		delImage(e.target.dataset.i);
	};
};

/* Compressing Files if needed */
async function compressFileIfNeeded(file) {
	return new Promise(async (resolve, reject) => {
		if (file.size > 500000 && file.type.startsWith("image/")) {
			const imageURL = URL.createObjectURL(file);
			const image = new Image();
			image.src = imageURL;
			image.onload = () => {
				const canvas = document.createElement('canvas');
				const ctx = canvas.getContext('2d');
				const maxSize = 1000;
				const ratio = Math.min(maxSize / image.width, maxSize / image.height);
				canvas.width = image.width * ratio;
				canvas.height = image.height * ratio;
				ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
				// canvas.toBlob((compressedBlob) => {
				// 	resolve(new File([compressedBlob], file.name, { type: file.type }));
				// }, file.type, 0.7);
				canvas.toBlob((compressedBlob) => {
          const compressedFile = new File([compressedBlob], `${file.name.replace(/\.[^/.]+$/, "")}.webp`, { type: 'image/webp' });
          resolve(compressedFile);
        }, 'image/webp', 0.7);
			};
		} else {
			resolve(file);
		}
	});
};

/* Hide Alert when Click Outside */
closeAlert.addEventListener('click', _ => {
	sweetAlert.classList.remove('on');
});