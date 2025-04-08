import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import './style.css';

let cropper;
const imageUpload = document.getElementById('imageUpload');
const imagePreview = document.getElementById('imagePreview');
const cropperContainer = document.getElementById('cropperContainer');
const downloadButton = document.getElementById('downloadButton');


imageUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (file && file.size <= 300 * 1024) {
        const reader = new FileReader();

        reader.onload = (e) => {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
            cropperContainer.innerHTML = '';
            cropperContainer.appendChild(imagePreview);

            cropper = new Cropper(imagePreview, {
                aspectRatio: 1,
                viewMode: 1,
                crop(event) {
                    //console.log(event.detail.x);
                    //console.log(event.detail.y);
                    //console.log(event.detail.width);
                    //console.log(event.detail.height);
                    //console.log(event.detail.rotate);
                    //console.log(event.detail.scaleX);
                    //console.log(event.detail.scaleY);
                },
            });

            downloadButton.style.display = 'block';
        };

        reader.readAsDataURL(file);
    } else {
        alert('Файл слишком большой (максимум 300 Кб).');
        imageUpload.value = '';
    }
});


downloadButton.addEventListener('click', () => {
    if (cropper) {
        cropper.getCroppedCanvas().toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'cropped_image.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        });
    }
});

