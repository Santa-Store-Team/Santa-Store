document.addEventListener("DOMContentLoaded", () => {
    const apiEndpoint = "https://ecommerce-api-opal.vercel.app/products"; 

    fetch(apiEndpoint)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((products) => {
            console.log(products); 

            const productContainers = document.querySelectorAll(".product");

            productContainers.forEach((productContainer, index) => {
                const product = products[index];

                if (product) {
                    const imgElement = productContainer.querySelector("img");
                    
                    
                    imgElement.src = product.image;
                    imgElement.alt = product.name;

                    
                    const price = product.price && product.price.$numberDecimal
                        ? parseFloat(product.price.$numberDecimal).toFixed(2)  
                        : 'Priset är inte tillgängligt';

                    
                    const detailsHTML = `
                        <h2>Produkt Namn: ${product.name}</h2>
                        <p>Pris: ${price} SEK</p>
                        <div class="product-details" style="display: none;">
                            <p>Beskrivning: ${product.description}</p>
                            <p>Kategori: ${product.categories}</p>
                        </div>
                    `;
                    productContainer.insertAdjacentHTML("beforeend", detailsHTML);

                    
                    const moreInfoButton = document.createElement("button");
                    moreInfoButton.textContent = "Se Mer"; 
                    moreInfoButton.className = "extraButton"; 

                    
                    const button = document.createElement("button");
                    button.textContent = "Lägg till i korg";
                    button.className = "add-to-cart";
                  

                    productContainer.appendChild(moreInfoButton);
                    productContainer.appendChild(button);

                    
                    moreInfoButton.addEventListener("click", () => {
                        const productDetails = productContainer.querySelector(".product-details");

                        
                        if (productDetails.style.display === "none") {
                            productDetails.style.display = "block"; 
                            moreInfoButton.textContent = "Se mindre"; 
                        } else {
                            productDetails.style.display = "none"; 
                            moreInfoButton.textContent = "Se Mer"; 
                        }
                    });
                } else {
                    console.warn(`Ingen produktdata för behållaren vid index ${index}`);
                }
            });
            
        })
        .catch((error) => {
            console.error("Fel vid hämtning av produkter:", error);
        });
});
