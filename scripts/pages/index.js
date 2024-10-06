// Sélectionner l'élément contenant la section des photographes
const photographerSection = document.querySelector('.photographer_section');

// Fonction pour charger les données des photographes
async function loadPhotographers() {
    try {
        // Récupérer les données du fichier JSON
        const response = await fetch('data/photographers.json');
        const data = await response.json();

        // Appeler la fonction pour afficher les photographes
        displayPhotographers(data.photographers);
    } catch (error) {
        console.error('Erreur lors du chargement des photographes:', error);
    }
}

// Fonction pour afficher les photographes
function displayPhotographers(photographers) {
    // Vérifier si l'élément existe avant de continuer
    if (!photographerSection) {
        console.error("L'élément 'photographer_section' est introuvable.");
        return;
    }

    // Vider la section avant d'ajouter de nouveaux photographes
    photographerSection.innerHTML = '';

    // Parcourir chaque photographe et créer une carte
    photographers.forEach(photographer => {
        const card = document.createElement('article');
        card.classList.add('photographer-card');
        card.setAttribute('aria-labelledby', `photographer-${photographer.id}`);

        // Créer le contenu de la carte
        const cardContent = `
            <a href="photographer.html?id=${photographer.id}" aria-label="Voir le profil de ${photographer.name}">
                <img src="Sample Photos/Photographers ID Photos/${photographer.portrait}" alt="Portrait de ${photographer.name}" class="photographer-portrait" />
                <h2 id="photographer-${photographer.id}">${photographer.name}</h2>
                <p class="tagline">${photographer.tagline}</p>
                <p class="location">${photographer.city}, ${photographer.country}</p>
                <p class="price">${photographer.price}€/jour</p>
            </a>
        `;

        // Ajouter le contenu à la carte
        card.innerHTML = cardContent;

        // Ajouter la carte à la section des photographes
        photographerSection.appendChild(card);
    });
}

// Appeler la fonction pour charger les photographes au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    loadPhotographers();
});

// N'oubliez pas d'appeler cette fonction avec vos données



