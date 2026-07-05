// flower.js

window.scrollTo(0, 0);

const container = document.getElementById("flowerDetails");

// Get flower id from URL
const params = new URLSearchParams(window.location.search);
const flowerId = params.get("id");

// Load JSON
fetch("data/flowers.json")
    .then(response => response.json())
    .then(flowers => {

        const flower = flowers.find(f => f.id === flowerId);

        if (!flower) {
            container.innerHTML = `
                <div class="not-found">
                    <h2>Flower Not Found 🌸</h2>
                    <a href="index.html">← Back to Home</a>
                </div>
            `;
            return;
        }

        document.title = flower.name + " | FloraVerse India";

        container.innerHTML = `
            <div class="flower-page">

                <img src="${flower.image}" alt="${flower.name}" class="flower-image">

                <div class="flower-info">

                    <h1>${flower.name}</h1>

                    <p><strong>Scientific Name:</strong> ${flower.scientificName}</p>

                    <p><strong>Family:</strong> ${flower.family}</p>

                    <p><strong>State:</strong> ${flower.state}</p>

                    <p><strong>Blooming Season:</strong> ${flower.bloomingSeason}</p>

                    <p><strong>Habitat:</strong> ${flower.habitat}</p>

                    <p><strong>Medicinal Uses:</strong> ${flower.medicinalUses}</p>

                    <p><strong>Symbolism:</strong> ${flower.symbolism}</p>

                    <p><strong>Description:</strong></p>

                    <p>${flower.description}</p>

                    <h3>Interesting Facts</h3>

                    <ul>
                        ${flower.facts.map(fact => `<li>${fact}</li>`).join("")}
                    </ul>

                    <br>

                    <a href="index.html" class="back-btn">
                        ← Back to Home
                    </a>

                </div>

            </div>
        `;

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    })
    .catch(() => {

        container.innerHTML = `
            <h2>Unable to load flower information.</h2>
            <a href="index.html">Back to Home</a>
        `;

    });