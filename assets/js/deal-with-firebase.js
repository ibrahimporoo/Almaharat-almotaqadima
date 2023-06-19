let files = [],
imagesFiles = document.querySelector('.images-files'),
uploadedImages = document.querySelector('.uploaded-images'),
inputImages = document.querySelector('input[name="images"]');



imagesFiles.addEventListener('click', _ => {
	inputImages.click();
	console.log('clicked');
})

inputImages.addEventListener('change', _ => {
	let file = inputImages.files;

	for(let i = 0; i < file.length; i++) {
		if( files.every(e => e.name !== file[i].name) )
		files.push(file[i])
	}

	showImages();

});

const delImage = (index) => {
	files.splice(index, 1);
	showImages();
}

const showImages = () => {
	let imageTemplate = '';
	files.forEach((file, i) => {
		imageTemplate += `
			<div class="image">
				<img src="${URL.createObjectURL(file)}" alt="image">
				<span onclick="delImage(${i})"><i class="fa-solid fa-xmark"></i></span>
			</div>
		`;
	})
	uploadedImages.innerHTML = imageTemplate;
	console.log(files)
}