const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Unsplash API
const count = 15;
const apiKey = 'Y3O1fCcGKFBdajIjaD_hLXBEpWsnGn-h1XTxl9furGk';
const orientation = 'landscape';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images ere loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        console.log('ready =', ready);
    }
}

// Helper Function to set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements for Links and Photos, Add to DOM
function displayPhotos(photosArray) {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages);
    // Run function for each object in PhotosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })
        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded)
        // Put <img> inside <a>, then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        const photosArray = await response.json();
        displayPhotos(photosArray);
    } catch (error) {
        // Catch error here
        console.log("Fetch error");
        console.error(error);
    }
}

// Check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    };
});

// On load
getPhotos();