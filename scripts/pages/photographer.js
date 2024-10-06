async function fetchPhotographers() {
    const response = await fetch('data/photographers.json');
    const data = await response.json();
    return data.photographers || [];
}

async function fetchMedia() {
    const response = await fetch('data/photographers.json');
    const data = await response.json();
    return data.media || [];
}

async function displayPhotographer(photographerId) {
    const photographers = await fetchPhotographers();
    const media = await fetchMedia();
    const photographer = photographers.find(p => p.id === photographerId);

    if (!photographer) {
        console.error("Photographe non trouvé");
        return;
    }

    const photographerHeader = document.querySelector('.photograph-header');
    photographerHeader.innerHTML = `
        <div class="header-content">
            <div class="photographer-info">
                <h2 class="photographer-name">${photographer.name}</h2>
                <p class="location">London, UK</p>
                <p class="photographer-tagline">${photographer.tagline}</p>
            </div>
            <button id="contact-button" class="contact_button">Contactez-moi</button>
        </div>
    `;

    const portraitImg = document.createElement('img');
    portraitImg.className = 'photographer-portrait';
    portraitImg.src = `Sample Photos/Photographers ID Photos/${photographer.portrait}`;
    portraitImg.alt = `Portrait de ${photographer.name}`;
    photographerHeader.appendChild(portraitImg);

    const mainElement = document.getElementById('main');
    const mediaContainer = document.createElement('div');
    mediaContainer.classList.add('media_section');
    mainElement.appendChild(mediaContainer);

    const photographerMedia = media.filter(m => m.photographerId === photographerId);
    photographerMedia.forEach(mediaItem => {
        const mediaElement = document.createElement('div');
        mediaElement.classList.add('media-item');
        mediaElement.innerHTML = `
            <div class="media-content">
                ${mediaItem.image ? 
                `<img class="media" src="Sample Photos/Mimi/${mediaItem.image}" alt="${mediaItem.title}" data-src="Sample Photos/Mimi/${mediaItem.image}">` : 
                `<video class="media" src="Sample Photos/Mimi/${mediaItem.video}" controls></video>`}
                <div class="media-title">${mediaItem.title}</div>
                <div class="media-likes">${mediaItem.likes} <i class="fas fa-heart"></i></div>
            </div>
        `;
        mediaContainer.appendChild(mediaElement);
    });

    const contactButton = document.getElementById('contact-button');
    const modal = document.getElementById('contact_modal');
    const closeButton = document.createElement('img');
    closeButton.src = "assets/icons/close.svg";
    closeButton.classList.add('close');

   
    const mediaElements = document.querySelectorAll('.media-item .media');
    mediaElements.forEach((mediaElement, index) => {
        mediaElement.addEventListener('click', () => {
            openLightbox(index);
        });
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            modal.setAttribute('aria-hidden', 'true');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const photographerId = 243;
    displayPhotographer(photographerId);
});


let currentIndex = 0;

function openLightbox(index) {
    currentIndex = index;

    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-label', 'Lightbox');

    const lightboxContent = document.createElement('div');
    lightboxContent.className = 'lightbox-content';

    const lightboxImage = document.createElement('img');
    lightboxImage.className = 'lightbox-image';
    lightboxImage.src = document.querySelectorAll('.media-item .media')[currentIndex].getAttribute('data-src');

    lightboxContent.appendChild(lightboxImage);

    
    const leftArrow = document.createElement('button');
    leftArrow.className = 'arrow left-arrow';
    leftArrow.innerHTML = '<img src="assets/icons/arrow-prev.svg" alt="Flèche gauche" />'; // Image de flèche gauche
    leftArrow.onclick = () => changeMedia(-1);

    const rightArrow = document.createElement('button');
    rightArrow.className = 'arrow right-arrow';
    rightArrow.innerHTML = '<img src="assets/icons/arrow-next.svg" alt="Flèche droite" />'; // Image de flèche droite
    rightArrow.onclick = () => changeMedia(1);

   
    const closeBtn = document.createElement('img');
    closeBtn.src = "assets/icons/close.svg";
    closeBtn.className = 'close red-icon'; 
    closeBtn.alt = 'Fermer la Lightbox'; 
    closeBtn.onclick = () => {
        document.body.removeChild(lightbox);
    };


    lightbox.appendChild(lightboxContent);
    lightbox.appendChild(leftArrow); 
    lightbox.appendChild(rightArrow); 
    lightbox.appendChild(closeBtn);
    document.body.appendChild(lightbox);

   
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            document.body.removeChild(lightbox);
        } else if (event.key === 'ArrowRight') {
            changeMedia(1);
        } else if (event.key === 'ArrowLeft') {
            changeMedia(-1);
        }
    });

    lightboxImage.onload = function() {
        lightboxContent.appendChild(lightboxImage);
    };
}

function changeMedia(direction) {
    const mediaElements = document.querySelectorAll('.media-item .media');
    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = mediaElements.length - 1; 
    } else if (currentIndex >= mediaElements.length) {
        currentIndex = 0; 
    }

    const lightboxImage = document.querySelector('.lightbox-image');
    lightboxImage.src = mediaElements[currentIndex].getAttribute('data-src');
}








