const flowerContainer = document.getElementById("flowerContainer");
const searchInput = document.getElementById("searchInput");

let flowers = [];

// Load flowers from JSON
fetch("data/flowers.json")
    .then(response => response.json())
    .then(data => {
        flowers = data;
        displayFlowers(flowers);
    })
    .catch(error => {
        console.error("Error loading flowers:", error);

        flowerContainer.innerHTML = `
            <h2 class="error">
                Unable to load flowers 🌸
            </h2>
        `;
    });

// Display flower cards
function displayFlowers(flowerList) {

    flowerContainer.innerHTML = "";

    if (flowerList.length === 0) {

        flowerContainer.innerHTML = `
            <h2 class="no-result">
                No flowers found 🌸
            </h2>
        `;

        return;
    }

    flowerList.forEach(flower => {

        const card = document.createElement("div");

        card.className = "flower-card";

        card.innerHTML = `

            <img src="${flower.image}" alt="${flower.name}">

            <div class="card-content">

                <h3>${flower.name}</h3>

                <p class="scientific">
                    ${flower.scientificName}
                </p>

                <p class="description">
                    ${flower.description.substring(0,90)}...
                </p>

                <button class="read-btn">
                    Read More →
                </button>

            </div>

        `;

        card.addEventListener("click", () => {

            window.location.href = `flower.html?id=${flower.id}`;

        });

        flowerContainer.appendChild(card);

    });

}

// Live Search
searchInput.addEventListener("input", () => {

    const search = searchInput.value.toLowerCase().trim();

    const filtered = flowers.filter(flower =>

        flower.name.toLowerCase().includes(search) ||

        flower.scientificName.toLowerCase().includes(search)

    );

    displayFlowers(filtered);

});

// Scroll to top whenever Home reloads
window.onload = () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

};