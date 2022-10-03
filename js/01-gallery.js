import { galleryItems } from "./gallery-items.js";

// Change code below this line

const galleryContainer = document.querySelector(".gallery");

// Create gallery
const imgMarkup = createGalleryMarkup(galleryItems);
galleryContainer.innerHTML = imgMarkup;

galleryContainer.addEventListener("click", onOpenModalImg);



function onOpenModalImg(event) {
  event.preventDefault();
  const currentImg = event.target;

  if (currentImg.nodeName !== "IMG") {
    return;
  }

  const url = onGetOriginalUrl(currentImg);

  generateModalImg(url);

}

// Get original url
function onGetOriginalUrl(currentImg) {
  return currentImg.dataset.source;
}

function generateModalImg(imgUrl) {
  const instance = basicLightbox.create(
    `
        <img
        src="${imgUrl}"
        heigth = "800"
        width = "600"
        />
    `
  );

    instance.show();

    galleryContainer.addEventListener("keydown", (event) => {
        if (event.code !== "Escape") {
          return;
        }

        instance.close();
    });
}


function createGalleryMarkup(gallery) {
  return gallery
    .map(({ preview, original, description }) => {
      return `
            <div class="gallery__item">
                <a class="gallery__link" href="${original}">
                    <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                    />
                </a>
            </div>
            `;
    })
    .join("");
}
