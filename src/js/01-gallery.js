// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

console.log(galleryItems);

const container = document.querySelector(".gallery");
console.log(galleryItems);
console.log(container);

function createMarkup(arr) {
  const res = arr
    .map(
      ({ preview, original, description }) =>
        `<li class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>`
    )
    .join("");

  return res;
};
container.style.listStyle = "none";      
container.insertAdjacentHTML("beforeend", createMarkup(galleryItems));

// add SimpleLightbox
let lightbox = new SimpleLightbox('.gallery a', { 
    captionsData: 'alt',
  captionDelay: '250',
});
